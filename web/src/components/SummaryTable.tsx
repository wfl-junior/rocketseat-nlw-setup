import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import { Button } from "./Button";
import { SummaryTableHabits } from "./SummaryTableHabits";
import { SummaryTableHabitsSkeleton } from "./SummaryTableHabitsSkeleton";

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export interface SummaryItem {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

interface SummaryTableProps {}

export const SummaryTable: React.FC<SummaryTableProps> = () => (
  <div className="w-full flex gap-3">
    <div className="grid grid-rows-7 grid-flow-row gap-3">
      {weekDays.map(weekDay => (
        <div
          key={weekDay}
          className="text-zinc-400 text-lg sm:text-xl w-9 sm:w-10 aspect-square flex items-center justify-center font-bold"
        >
          {weekDay}
        </div>
      ))}
    </div>

    <div className="grid grid-rows-7 grid-flow-col gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-violet-500 pb-3 scrollbar-thumb-rounded-md">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div className="flex flex-col gap-4 items-center">
                <span className="text-red-500 sm:text-lg font-medium">
                  Ocorreu um erro inesperado 😰
                </span>

                <Button
                  onClick={() => resetErrorBoundary()}
                  className="focus-visible:ring-offset-background"
                >
                  Tentar novamente
                </Button>
              </div>
            )}
          >
            <Suspense fallback={<SummaryTableHabitsSkeleton />}>
              <SummaryTableHabits />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  </div>
);
