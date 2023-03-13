import { Skeleton } from "./Skeleton";

interface HabitsListSkeletonProps {}

export const HabitsListSkeleton: React.FC<HabitsListSkeletonProps> = () => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <Skeleton className="w-8 aspect-square rounded-lg" />
      <Skeleton className="w-3/4 h-7 rounded" />
    </div>

    <div className="flex items-center gap-3">
      <Skeleton className="w-8 aspect-square rounded-lg" />
      <Skeleton className="w-2/4 h-7 rounded" />
    </div>

    <div className="flex items-center gap-3">
      <Skeleton className="w-8 aspect-square rounded-lg" />
      <Skeleton className="w-1/4 h-7 rounded" />
    </div>
  </div>
);
