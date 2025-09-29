// src/components/BillList.tsx
"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import BillCard from "./BillCard";
import BillSkeleton from "./BillSkeleton";

type Bill = {
  id: number;
  bill_number: string;
  title: string;
  ai_summary?: string;
  status: number;
  last_updated: string;
};

type BillsResponse = {
  total: number;
  limit: number;
  offset: number;
  next_offset?: number;
  prev_offset?: number;
  bills: Bill[];
};

export default function BillList({ stateCode }: { stateCode: string }) {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const limit = 20;

  // Fetch bills
  const fetchBills = async (offsetValue = 0) => {
    try {
      setLoading(true);
      const res = await axiosClient.get<BillsResponse>(
        `bills/state/${stateCode}?limit=${limit}&offset=${offsetValue}`
      );
      if (offsetValue === 0) {
        setBills(res.data.bills);
      } else {
        setBills((prev) => [...prev, ...res.data.bills]);
      }
      setOffset(offsetValue);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching bills:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills(0);
  }, [stateCode]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-primary mb-2">
        {stateCode} Bills ({total})
      </h2>

      {/* Bills */}
      {bills.map((bill) => (
        <BillCard key={bill.id} {...bill} />
      ))}

      {/* Load More */}
      {bills.length < total && (
        <button
          disabled={loading}
          onClick={() => fetchBills(offset + limit)}
          className="mt-4 px-4 py-2 rounded bg-accent text-white hover:bg-accent/90 disabled:opacity-50"
        >
          {loading
            ? loading &&
              bills.length === 0 && (
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <BillSkeleton key={i} />
                  ))}
                </div>
              )
            : "Load More"}
        </button>
      )}
    </div>
  );
}
