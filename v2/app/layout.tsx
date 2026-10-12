import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://verkun.com"),
  title: {
    default: "VERKUN 凡鲲 | 用真实体征，管理你的健康",
    template: "%s | VERKUN 凡鲲",
  },
  description:
    "健康雷达 App 汇聚智能设备 24 小时记录的心率、血氧、睡眠、HRV 与活动数据，结合 AI 拍照识别饮食热量，用真实体征管理你的健康。",
  keywords: ["健康管理 App", "真实体征", "AI 热量识别", "食物卡路里", "智能戒指", "VK100", "VK35 Pro", "睡眠分析", "凡鲲", "Verkun"],
  openGraph: {
    title: "VERKUN 凡鲲 — 用真实体征，管理你的健康",
    description: "健康雷达 App + 智能设备：真实体征数据、AI 饮食热量识别与个性化健康建议。",
    type: "website",
    url: "https://verkun.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#f2f7f8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <LangProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
