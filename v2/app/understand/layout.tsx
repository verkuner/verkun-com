import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "读懂身体，掌控健康",
  description: "了解心率、血氧、睡眠、HRV、皮肤温度与活动等体征的含义，以你自己的个人基线看懂身体的变化。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
