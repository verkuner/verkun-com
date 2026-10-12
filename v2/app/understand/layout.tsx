import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "读懂身体，掌控健康",
  description: "体能、睡眠、活动、心率四个分数，加上活动消耗与食物摄入两个热量数字，按你自己的常态，每天一眼读懂身体状况。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
