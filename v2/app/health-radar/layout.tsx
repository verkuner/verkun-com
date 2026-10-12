import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "认识健康雷达",
  description: "健康雷达：你的健康管理 App。体征看板、睡眠与恢复、能量收支与个性化健康建议，并内置 AI 饮食热量识别，用真实体征数据管理你的健康。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
