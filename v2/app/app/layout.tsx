import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VERKUN Health App 功能",
  description: "VERKUN Health App：体征看板、睡眠与恢复、AI 饮食热量识别、能量收支与个性化健康建议，用真实体征数据管理你的健康。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
