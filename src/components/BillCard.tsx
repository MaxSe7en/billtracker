// src/components/BillCard.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type BillCardProps = {
  id: number;
  bill_number: string;
  title: string;
  ai_summary?: string;
  status: number;
  last_updated: string;
};

const statusMap: Record<number, { label: string; color: string }> = {
  0: { label: "Unknown", color: "bg-gray-400 text-white" },
  1: { label: "Active", color: "bg-green-600 text-white" },
  2: { label: "Passed", color: "bg-blue-600 text-white" },
  3: { label: "Failed", color: "bg-red-600 text-white" },
};

export default function BillCard({
  id,
  bill_number,
  title,
  ai_summary,
  status,
  last_updated,
}: BillCardProps) {
  const statusInfo = statusMap[status] || statusMap[0];
  const truncatedSummary =
    ai_summary && ai_summary.length > 200
      ? ai_summary.substring(0, 200) + "..."
      : ai_summary;

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="p-4 rounded-lg shadow bg-card dark:bg-darkCard text-foreground hover:shadow-md transition cursor-pointer"
    >
      {/* Top Row: Bill number + status */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg">{bill_number}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${statusInfo.color}`}
        >
          {statusInfo.label}
        </span>
      </div>

      {/* Title */}
      <h4 className="font-semibold mb-2 line-clamp-2">{title}</h4>

      {/* AI Summary */}
      {truncatedSummary && (
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-2">
          {truncatedSummary}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <span>Updated: {new Date(last_updated).toLocaleDateString()}</span>
        <Link
          href={`/bill/${id}`}
          className="text-accent font-medium hover:underline"
        >
          View details →
        </Link>
      </div>
    </motion.article>
  );
}
