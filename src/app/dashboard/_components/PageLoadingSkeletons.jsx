import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageLoadingSkeletons({ blocks = 5, tableRows = 4 }) {
  return (
    <div className="p-6 space-y-8 animate-pulse">
      {/* Header section */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-1/2 bg-gray-200" />
        <Skeleton className="h-4 w-1/3 bg-gray-200" />
      </div>

      {/* Content blocks */}
      {Array.from({ length: blocks }).map((_, idx) => (
        <div key={idx} className="flex gap-4">
          {/* Avatar skeleton */}
          <Skeleton className="h-14 w-14 rounded-full flex-shrink-0 bg-gray-200" />
          {/* Text block */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4 bg-gray-200" />
            <Skeleton className="h-4 w-2/3 bg-gray-200" />
            <Skeleton className="h-4 w-1/2 bg-gray-200" />
          </div>
        </div>
      ))}

      {/* Table or card-like block */}
      <div className="space-y-4 mt-8">
        <Skeleton className="h-6 w-1/3 bg-gray-200" />
        {Array.from({ length: tableRows }).map((_, idx) => (
          <div key={idx} className="flex gap-4 items-center">
            <Skeleton className="h-4 w-1/6 bg-gray-200" />
            <Skeleton className="h-4 w-1/4 bg-gray-200" />
            <Skeleton className="h-4 w-1/2 bg-gray-200" />
            <Skeleton className="h-4 w-1/5 bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
