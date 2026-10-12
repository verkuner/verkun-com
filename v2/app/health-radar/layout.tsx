import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "认识健康雷达",
  description: "健康雷达：你的健康管理 App。体能、睡眠、活动、心率四个分数，活动消耗与食物摄入热量（AI 拍照识别），以及个性化健康建议，用真实体征数据管理你的健康。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
