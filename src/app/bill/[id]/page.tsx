import { Metadata } from "next";
import axiosClient from "@/lib/axiosClient";
import BillDetail from "@/components/BillDetail";

type Bill = {
  id: number;
  bill_number: string;
  title: string;
  description: string;
  ai_summary?: string;
  ai_impacts?: any[];
  ai_pro_con?: any[];
  status: number;
  last_updated: string;
  url: string;
  state_link: string;
  sponsors?: any[];
  history?: any[];
  texts?: any[];
  calendar?: any[];
};

async function fetchBill(id: string): Promise<Bill> {
  const res = await axiosClient.get<Bill>(`bills/${id}`);
  return res.data;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const bill = await fetchBill(params.id);
  // console.log("Generating metadata for bill:", bill.bill_number);
  return {
    title: `${bill.bill_number} - ${bill.title} | BillTracker`,
    description: bill.ai_summary || bill.description,
  };
}

export default async function BillPage({ params }: { params: { id: string } }) {
  const bill = await fetchBill(params.id);
    console.log("Bill data:", bill);
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-darkBackground p-4">
      <BillDetail bill={bill} />
    </div>
  );
}
