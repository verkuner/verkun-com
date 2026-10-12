import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "智能设备", template: "%s | VERKUN 凡鲲" },
  description: "VERKUN 智能健康设备：VK100、VK35 Pro 智能戒指，24 小时采集真实体征数据，为健康雷达 App 提供数据来源。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
