import type { Metadata } from "next";
import StateClient from "./StateClient";

export async function generateMetadata({
  params,
}: {
  params: { code: string };
}): Promise<Metadata> {
  const stateName = params.code.toUpperCase();

  return {
    title: `${stateName} Bills & Community – BillTracker`,
    description: `Track active bills, politicians, and join the community discussions for ${stateName}.`,
    openGraph: {
      title: `${stateName} Bills & Community – BillTracker`,
      description: `Stay informed about ${stateName} laws and join local political discussions.`,
    },
  };
}

export default function StatePage({ params }: { params: { code: string } }) {
  return <StateClient code={params.code} />;
}
