import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://verkun.com"),
  title: {
    default: "VERKUN 凡鲲 | 智能戒指 · AI 饮食热量识别",
    template: "%s | VERKUN 凡鲲",
  },
  description:
    "VERKUN 凡鲲智能戒指 VK100 / VK35 Pro：24 小时心率、血氧、睡眠与压力监测；搭配 AI 拍照识别食物热量 App，完整掌握能量摄入与消耗。",
  keywords: ["智能戒指", "VK100", "VK35 Pro", "AI 热量识别", "食物卡路里", "健康监测", "睡眠监测", "凡鲲", "Verkun"],
  openGraph: {
    title: "VERKUN 凡鲲 — 戴在指尖的健康智能",
    description: "智能戒指 + AI 饮食热量识别，健康管理轻到无感、准到可信。",
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
