import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DeviceDetail from "@/components/DeviceDetail";
import { devices, getDevice } from "@/lib/devices";

export const dynamicParams = false;

export function generateStaticParams() {
  return devices.map((d) => ({ model: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ model: string }> }): Promise<Metadata> {
  const device = getDevice((await params).model);
  if (!device) return {};
  return { title: `${device.name} ${device.badge.zh}`, description: device.summary.zh };
}

export default async function DevicePage({ params }: { params: Promise<{ model: string }> }) {
  const device = getDevice((await params).model);
  if (!device) notFound();
  return <DeviceDetail ring={device} />;
}
