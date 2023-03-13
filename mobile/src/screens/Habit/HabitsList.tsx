import { CanceledError } from "axios";
import dayjs from "dayjs";
import { useRef } from "react";
import { Alert, Text, View } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { Checkbox } from "~/components/Checkbox";
import { SummaryItem } from "~/components/SummaryTable";
import { api } from "~/lib/axios";
import { sleep } from "~/utils/sleep";

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
  date: string;
}

export const HabitsList: React.FC<HabitsListProps> = ({ date }) => {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<
    Record<Habit["id"], AbortController | undefined>
  >({});

  const dateString = dayjs(date).startOf("day").toISOString();
  const queryKey = ["days", dateString];
  const { data: habitsInfo } = useQuery<HabitsInfo>(
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
          Alert.alert("Hábitos", "Não foi possível fazer toggle do hábito.");
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
    <View className="gap-3">
      {habitsInfo?.possibleHabits.length === 0 && (
        <Text className="text-zinc-400 text-center text-sm">
          Não há hábitos para este dia.
        </Text>
      )}

      {habitsInfo?.possibleHabits.map(habit => (
        <Checkbox
          key={habit.id}
          isBold
          title={habit.title}
          disabled={isDateInPast}
          onPress={handleToggleHabit(habit.id)}
          isChecked={habitsInfo.completedHabits.includes(habit.id)}
        />
      ))}
    </View>
  );
};
