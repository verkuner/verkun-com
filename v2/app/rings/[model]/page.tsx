import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RingDetail from "@/components/RingDetail";
import { getRing, rings } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return rings.map((r) => ({ model: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ model: string }> }): Promise<Metadata> {
  const ring = getRing((await params).model);
  if (!ring) return {};
  return {
    title: `${ring.name} ${ring.badge.zh}`,
    description: ring.summary.zh,
  };
}

export default async function RingPage({ params }: { params: Promise<{ model: string }> }) {
  const ring = getRing((await params).model);
  if (!ring) notFound();
  return <RingDetail ring={ring} />;
}
