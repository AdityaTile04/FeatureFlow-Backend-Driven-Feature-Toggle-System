import { Skeleton } from "./ui/skeleton";

const FeatureFlagSkeleton = () => {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      <Skeleton className="h-6 w-10 rounded-full" />
    </div>
  );
};

export default FeatureFlagSkeleton;
