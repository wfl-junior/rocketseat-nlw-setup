import { View } from "react-native";
import { Skeleton } from "~/components/Skeleton";

interface HabitsListSkeletonProps {}

export const HabitsListSkeleton: React.FC<HabitsListSkeletonProps> = () => (
  <View className="gap-3">
    <View className="flex-row items-center">
      <Skeleton className="w-8 aspect-square rounded-lg" />
      <Skeleton className="w-3/4 h-6 rounded ml-3" />
    </View>

    <View className="flex-row items-center">
      <Skeleton className="w-8 aspect-square rounded-lg" />
      <Skeleton className="w-2/4 h-6 rounded ml-3" />
    </View>

    <View className="flex-row items-center">
      <Skeleton className="w-8 aspect-square rounded-lg" />
      <Skeleton className="w-1/4 h-6 rounded ml-3" />
    </View>
  </View>
);
