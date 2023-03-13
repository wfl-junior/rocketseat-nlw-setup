import { Fragment } from "react";
import { Skeleton } from "./Skeleton";

const minimumSummaryDatesSize = 18 * 7; // 18 weeks

const amountOfDaysToFill = Array.from(
  { length: minimumSummaryDatesSize },
  (_, index) => index + 1,
);

interface SummaryTableHabitsSkeletonProps {}

export const SummaryTableHabitsSkeleton: React.FC<
  SummaryTableHabitsSkeletonProps
> = () => (
  <Fragment>
    {amountOfDaysToFill.map(number => (
      <Skeleton key={number} className="aspect-square w-9 sm:w-10 rounded-lg" />
    ))}
  </Fragment>
);
