import { View } from "react-native";
import { daySize } from "./HabitDay";
import { Skeleton } from "./Skeleton";

const minimumSummaryDatesSize = 12 * 7; // 12 weeks

const amountOfDaysToFill = Array.from(
  { length: minimumSummaryDatesSize },
  (_, index) => index + 1,
);

interface SummaryTableSkeletonProps {}

export const SummaryTableSkeleton: React.FC<SummaryTableSkeletonProps> = () => (
  <View className="flex-row flex-wrap">
    {amountOfDaysToFill.map(number => (
      <Skeleton
        key={number}
        style={{ width: daySize, height: daySize }}
        className="rounded-lg m-1"
      />
    ))}
  </View>
);
