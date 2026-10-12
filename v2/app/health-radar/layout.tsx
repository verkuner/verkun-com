import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "认识健康雷达",
  description: "健康雷达是凡鲲 App 的核心功能：把体能、睡眠、活动、心率四个分数与活动消耗、食物摄入热量放进一张雷达图，一眼看懂你的健康状况。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
