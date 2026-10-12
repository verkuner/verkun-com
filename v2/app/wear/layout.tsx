import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "戴上，更好的生活",
  description: "VERKUN 智能戒指轻至 3 克、无屏幕无打扰，从清晨到深夜陪伴你，记录身体的每一个真实信号。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
