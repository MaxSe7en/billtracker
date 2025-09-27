"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";

type Bill = {
  id: number;
  bill_number: string;
  title: string;
  description: string;
  url: string;
  status: number;
  last_action: string | null;
  last_action_date: string | null;
};

export default function StateClient({ code }: { code: string }) {
  const [bills, setBills] = useState<Bill[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    if (!code) return;

    const fetchBills = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(
          `bills/state/${code}?limit=${limit}&offset=${offset}`
        );
        setBills(res.data.bills);
        setTotal(res.data.total);
      } catch (err) {
        console.error("Error fetching bills:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [code, offset]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground">
        Loading bills for {code}...
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left: Bills */}
      <section className="p-4 border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {code} Bills ({total})
        </h2>
        <ul className="space-y-4">
          {bills.map((bill) => (
            <li
              key={bill.id}
              className="p-4 rounded-lg shadow bg-card dark:bg-darkCard text-foreground"
            >
              <h3 className="font-semibold">
                {bill.bill_number}: {bill.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {bill.description}
              </p>
              <p className="text-xs mt-2">
                <span className="font-semibold">Last Action:</span>{" "}
                {bill.last_action ?? "—"} (
                {bill.last_action_date
                  ? new Date(bill.last_action_date).toLocaleDateString()
                  : "No date"}
                )
              </p>
              <a
                href={bill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-3 py-1 rounded bg-accent text-white"
              >
                View on LegiScan
              </a>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={offset === 0}
            onClick={() => setOffset((o) => Math.max(0, o - limit))}
            className="px-3 py-1 rounded bg-secondary text-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Showing {offset + 1}–{Math.min(offset + limit, total)} of {total}
          </span>
          <button
            disabled={offset + limit >= total}
            onClick={() => setOffset((o) => o + limit)}
            className="px-3 py-1 rounded bg-secondary text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>

      {/* Right: Community placeholder */}
      <section className="p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{code} Community</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Reddit-style posts & discussions for {code} will go here.
        </p>
      </section>
    </div>
  );
}
