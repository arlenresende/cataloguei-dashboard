
export function SkeletonCard() {
  return (
    <div className="border-gray-200 dark:border-gray-800">
      <div className="pb-2">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
      <div>
        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    </div>
  );
}
