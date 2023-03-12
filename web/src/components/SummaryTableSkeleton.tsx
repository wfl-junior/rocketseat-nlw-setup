import { Skeleton } from "./Skeleton";

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const minimumSummaryDatesSize = 18 * 7; // 18 weeks

const amountOfDaysToFill = Array.from(
  { length: minimumSummaryDatesSize },
  (_, index) => index + 1,
);

interface SummaryTableSkeletonProps {}

export const SummaryTableSkeleton: React.FC<SummaryTableSkeletonProps> = () => (
  <div className="w-full flex gap-3">
    <div className="grid grid-rows-7 grid-flow-row gap-3">
      {weekDays.map(weekDay => (
        <div
          key={weekDay}
          className="text-zinc-400 text-xl w-10 aspect-square flex items-center justify-center font-bold"
        >
          {weekDay}
        </div>
      ))}
    </div>

    <div className="grid grid-rows-7 grid-flow-col gap-3">
      {amountOfDaysToFill.map(number => (
        <Skeleton key={number} className="aspect-square w-10 rounded-lg" />
      ))}
    </div>
  </div>
);
