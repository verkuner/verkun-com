import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 饮食热量识别 App",
  description: "拍照识别菜品与分量，AI 自动计算热量与营养素，并与 VK 智能戒指的消耗数据联动，实时掌握能量收支。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
