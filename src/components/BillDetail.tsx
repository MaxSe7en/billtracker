"use client";

import Link from "next/link";

type BillDetailProps = {
  bill: {
    id: number;
    bill_number: string;
    title: string;
    description: string;
    ai_summary?: string;
    ai_impacts?: any[];
    ai_pro_con?: any[];
    status: number;
    status_date: string;
    last_updated: string;
    url: string;
    state_link: string;
  };
};

const statusMap: Record<number, { label: string; color: string }> = {
  0: { label: "Unknown", color: "bg-gray-400 text-white" },
  1: { label: "Active", color: "bg-green-600 text-white" },
  2: { label: "Passed", color: "bg-blue-600 text-white" },
  3: { label: "Failed", color: "bg-red-600 text-white" },
};

export default function BillDetail({ bill }: BillDetailProps) {
  const statusInfo = statusMap[bill.status] || statusMap[0];

  return (
    <article className="space-y-6">
      {/* Hero */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {bill.bill_number}: {bill.title}
          </h1>
          <span
            className={`text-xs px-3 py-1 rounded-full ${statusInfo.color}`}
          >
            {statusInfo.label}
          </span>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Last updated: {new Date(bill.last_updated).toLocaleDateString()}
        </p>
        <div className="mt-3 flex gap-2">
          <Link
            href={bill.url}
            target="_blank"
            className="px-3 py-1 rounded bg-accent text-white hover:bg-accent/90"
          >
            View on LegiScan
          </Link>
          {bill.state_link && (
            <Link
              href={bill.state_link}
              target="_blank"
              className="px-3 py-1 rounded bg-primary text-white hover:bg-primary/90"
            >
              View State Site
            </Link>
          )}
        </div>
      </header>

      {/* AI Summary */}
      {bill.ai_summary && (
        <section>
          <h2 className="text-lg font-semibold mb-2">AI Summary</h2>
          <p className="text-neutral-700 dark:text-neutral-300">
            {bill.ai_summary}
          </p>
        </section>
      )}

      {/* AI Impacts */}
      {bill.ai_impacts && bill.ai_impacts.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-2">Impacts</h2>
          <ul className="list-disc pl-5 space-y-1">
            {bill.ai_impacts.map((impact, idx) => (
              <li key={idx} className="text-neutral-700 dark:text-neutral-300">
                {JSON.stringify(impact)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* AI Pro / Con */}
      {bill.ai_pro_con && bill.ai_pro_con.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-2">Arguments</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card dark:bg-darkCard p-3 rounded shadow">
              <h3 className="font-semibold mb-2 text-green-600">Pro</h3>
              {bill.ai_pro_con.map((p, i) => (
                <p key={i} className="text-sm mb-1">
                  {JSON.stringify(p)}
                </p>
              ))}
            </div>
            <div className="bg-card dark:bg-darkCard p-3 rounded shadow">
              <h3 className="font-semibold mb-2 text-red-600">Con</h3>
              {bill.ai_pro_con.map((c, i) => (
                <p key={i} className="text-sm mb-1">
                  {JSON.stringify(c)}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
