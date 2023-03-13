import * as Popover from "@radix-ui/react-popover";
import classNames from "classnames";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import { clamp } from "~/utils/clamp";
import { Button } from "./Button";
import { HabitsList } from "./HabitsList";
import { HabitsListSkeleton } from "./HabitsListSkeleton";
import { ProgressBar } from "./ProgressBar";

interface HabitDayProps {
  amount?: number;
  completed?: number;
  date: Date;
}

export const HabitDay: React.FC<HabitDayProps> = ({
  amount = 0,
  completed = 0,
  date,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const completedPercentage =
    amount > 0 ? clamp(0, Math.round((completed / amount) * 100), 100) : 0;

  const parsedDate = dayjs(date);
  const isToday = dayjs().isSame(date, "day");
  const dayOfTheWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  return (
    <Popover.Root onOpenChange={setIsPopoverOpen}>
      <Popover.Trigger
        className={classNames(
          "aspect-square w-9 sm:w-10 border-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-violet-500",
          {
            "bg-violet-500 border-violet-400": completedPercentage >= 80,
            "bg-violet-600 border-violet-500":
              completedPercentage >= 60 && completedPercentage < 80,
            "bg-violet-700 border-violet-600":
              completedPercentage >= 40 && completedPercentage < 60,
            "bg-violet-800 border-violet-700":
              completedPercentage >= 20 && completedPercentage < 40,
            "bg-violet-900 border-violet-800":
              completedPercentage > 0 && completedPercentage < 20,
            "bg-zinc-900": completedPercentage === 0,
            "border-zinc-800": completedPercentage === 0 && !isToday,
            "border-violet-600": completedPercentage === 0 && isToday,
          },
        )}
      />

      <AnimatePresence>
        {isPopoverOpen && (
          <Popover.Portal forceMount>
            <Popover.Content forceMount asChild>
              <motion.div
                className="min-w-[20rem] max-w-[100vw] rounded-2xl p-6 bg-zinc-900 flex flex-col shadow-lg shadow-violet-800/5"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                transition={{ ease: "easeInOut" }}
              >
                <Popover.Arrow className="fill-zinc-900 h-2 w-4" />

                <span className="font-semibold text-zinc-400 text-sm sm:text-base">
                  {dayOfTheWeek}
                </span>

                <span className="mt-1 font-extrabold leading-tight text-2xl sm:text-3xl">
                  {dayAndMonth}
                </span>

                <ProgressBar
                  progress={completedPercentage}
                  label="Progresso de hábitos completados neste dia"
                />

                <div className="mt-6">
                  <QueryErrorResetBoundary>
                    {({ reset }) => (
                      <ErrorBoundary
                        onReset={reset}
                        fallbackRender={({ resetErrorBoundary }) => (
                          <div className="flex flex-col gap-2 items-center">
                            <span className="text-red-500 text-sm font-medium">
                              Ocorreu um erro inesperado 😰
                            </span>

                            <Button
                              onClick={() => resetErrorBoundary()}
                              className="text-xs focus-visible:ring-offset-zinc-900"
                            >
                              Tentar novamente
                            </Button>
                          </div>
                        )}
                      >
                        <Suspense fallback={<HabitsListSkeleton />}>
                          <HabitsList date={date} />
                        </Suspense>
                      </ErrorBoundary>
                    )}
                  </QueryErrorResetBoundary>
                </div>
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
};
