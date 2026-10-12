import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "北京凡鲲智能科技有限公司 | AI 驱动的智能未来",
  description:
    "北京凡鲲智能科技有限公司专注于人工智能、机器学习与大模型技术，为企业提供智能化解决方案，赋能千行百业的数字化转型。",
  keywords: [
    "北京凡鲲",
    "凡鲲智能",
    "人工智能",
    "AI",
    "大模型",
    "机器学习",
    "智能科技",
  ],
  openGraph: {
    title: "北京凡鲲智能科技有限公司",
    description: "AI 驱动的智能未来 — 让人工智能真正创造价值。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="aurora" />
        <div className="grid-overlay" />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
