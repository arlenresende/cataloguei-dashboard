
import { Loader2 } from 'lucide-react';
import { SkeletonCard } from './SkeletonCard';


export function DashboardLoading() {
  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-72 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <div className="border-gray-200 dark:border-gray-800">
        <div className="h-72 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    </div>
  );
}
