// src/components/BillSkeleton.tsx
"use client";

export default function BillSkeleton() {
  return (
    <div className="p-4 rounded-lg shadow bg-card dark:bg-darkCard animate-pulse">
      {/* Bill number + status */}
      <div className="flex items-center justify-between mb-2">
        <div className="h-5 w-16 bg-neutral-300 dark:bg-neutral-700 rounded" />
        <div className="h-5 w-12 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
      </div>

      {/* Title */}
      <div className="h-4 w-3/4 bg-neutral-300 dark:bg-neutral-700 rounded mb-2" />
      <div className="h-4 w-1/2 bg-neutral-300 dark:bg-neutral-700 rounded mb-4" />

      {/* Summary */}
      <div className="h-3 w-full bg-neutral-300 dark:bg-neutral-700 rounded mb-2" />
      <div className="h-3 w-5/6 bg-neutral-300 dark:bg-neutral-700 rounded mb-2" />
      <div className="h-3 w-2/3 bg-neutral-300 dark:bg-neutral-700 rounded mb-4" />

      {/* Footer */}
      <div className="flex justify-between">
        <div className="h-3 w-20 bg-neutral-300 dark:bg-neutral-700 rounded" />
        <div className="h-3 w-16 bg-neutral-300 dark:bg-neutral-700 rounded" />
      </div>
    </div>
  );
}
