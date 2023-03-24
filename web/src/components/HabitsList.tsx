import { CanceledError } from "axios";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { CircleNotch } from "phosphor-react";
import { useRef } from "react";
import { useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { api } from "~/lib/axios";
import { sleep } from "~/utils/sleep";
import { Checkbox } from "./Checkbox";
import type { SummaryItem } from "./SummaryTable";

interface Habit {
  id: string;
  title: string;
  createdAt: string;
}

interface HabitsInfo {
  possibleHabits: Habit[];
  completedHabits: string[];
}

interface HabitsListProps {
  date: Date;
}

export const HabitsList: React.FC<HabitsListProps> = ({ date }) => {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<
    Record<Habit["id"], AbortController | undefined>
  >({});

  const dateString = dayjs(date).startOf("day").toISOString();
  const queryKey = ["days", dateString];
  const { data: habitsInfo, isFetching } = useQuery<HabitsInfo>(
    queryKey,
    async ({ signal }) => {
      const [{ data }] = await Promise.all([
        api.get<HabitsInfo>("/days", {
          signal,
          params: {
            date: dateString,
          },
        }),
        sleep(1000),
      ]);

      return {
        possibleHabits: data.possibleHabits,
        completedHabits: data.completedHabits,
      };
    },
    { suspense: true },
  );

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  function handleToggleHabit(id: Habit["id"]) {
    return async () => {
      abortControllerRef.current[id]?.abort();
      abortControllerRef.current[id] = new AbortController();

      // optimistic ui
      const isSelected = habitsInfo?.completedHabits.includes(id);
      queryClient.setQueryData<HabitsInfo | undefined>(queryKey, info => {
        if (!info) return;

        return {
          possibleHabits: info.possibleHabits,
          completedHabits: isSelected
            ? info.completedHabits.filter(habitId => habitId !== id)
            : [...info.completedHabits, id],
        };
      });

      const summaryQueryKey = ["summary"];

      queryClient.setQueryData<SummaryItem[] | undefined>(
        summaryQueryKey,
        summary => {
          if (!summary) return;

          return summary.map(item => {
            if (dayjs(item.date).isSame(date, "day")) {
              return {
                ...item,
                completed: isSelected ? item.completed - 1 : item.completed + 1,
              };
            }

            return item;
          });
        },
      );

      try {
        await api.patch(`/habits/${id}/toggle`, undefined, {
          signal: abortControllerRef.current[id]?.signal,
        });
      } catch (error) {
        if (!(error instanceof CanceledError)) {
          toast("Não foi possível fazer toggle do hábito.", { type: "error" });
        }

        // reseta optismitic ui se der erro
        queryClient.setQueryData<HabitsInfo | undefined>(queryKey, info => {
          if (!info) return;

          return {
            possibleHabits: info.possibleHabits,
            completedHabits: isSelected
              ? [...info.completedHabits, id]
              : info.completedHabits.filter(habitId => habitId !== id),
          };
        });

        queryClient.setQueryData<SummaryItem[] | undefined>(
          summaryQueryKey,
          summary => {
            if (!summary) return;

            return summary.map(item => {
              if (dayjs(item.date).isSame(date, "day")) {
                return {
                  ...item,
                  completed: isSelected
                    ? item.completed + 1
                    : item.completed - 1,
                };
              }

              return item;
            });
          },
        );
      }
    };
  }

  return (
    <div className="flex flex-col gap-3">
      {habitsInfo?.possibleHabits.length === 0 && (
        <span className="text-zinc-400 text-center text-sm">
          Não há hábitos para este dia.
        </span>
      )}

      <AnimatePresence>
        {habitsInfo?.possibleHabits.map((habit, index) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.3, delay: index * 0.15, ease: "easeOut" }}
          >
            <Checkbox
              disabled={isDateInPast}
              onCheckedChange={handleToggleHabit(habit.id)}
              checked={habitsInfo.completedHabits.includes(habit.id)}
            >
              <span className="font-semibold text-lg sm:text-xl leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 transition-all group-disabled:cursor-not-allowed group-disabled:text-zinc-500 group-hover:enabled:text-zinc-400">
                {habit.title}
              </span>
            </Checkbox>
          </motion.div>
        ))}
      </AnimatePresence>

      {isFetching && (
        <div className="flex items-center gap-2 text-violet-400 mt-2">
          <CircleNotch size={20} className="animate-spin" />
          <span className="font-medium text-sm">Revalidando...</span>
        </div>
      )}
    </div>
  );
};
