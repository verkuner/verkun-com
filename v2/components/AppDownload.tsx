"use client";

import { l, useLang } from "@/lib/i18n";
import Icon from "./Icon";
import Reveal from "./Reveal";

// Store links aren't live yet — swap these for the real listings at launch.
const stores = [
  { icon: "apple", top: l("即将登陆", "Coming soon on"), name: "App Store", href: "#" },
  { icon: "android", top: l("即将登陆", "Coming soon on"), name: l("安卓应用商店", "Android stores"), href: "#" },
];

export default function AppDownload() {
  const { tr } = useLang();
  return (
    <section id="download" className="mx-auto max-w-7xl scroll-mt-24 px-5 sm:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-teal-deep via-teal to-sky px-8 py-14 text-white sm:px-14">
          <div className="dot-grid absolute inset-0 opacity-40" />
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[40px] border-white/10" />
          <div className="absolute -bottom-32 right-40 h-64 w-64 rounded-full border-[30px] border-white/10" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">{tr(l("凡鲲 App", "VERKUN App"))}</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {tr(l("一个 App，管理你的全部健康数据", "One app for all of your health data"))}
              </h2>
              <p className="mt-3 max-w-xl text-white/80">
                {tr(
                  l(
                    "连接 VK 智能戒指，查看睡眠、心率与活动报告；拍照记录每一餐，AI 自动计算热量与营养。",
                    "Pair your VK ring for sleep, heart and activity reports — and snap every meal for automatic AI calorie and nutrient tracking."
                  )
                )}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {stores.map((s) => (
                  <a
                    key={s.icon}
                    href={s.href}
                    aria-disabled
                    onClick={(e) => e.preventDefault()}
                    className="flex cursor-default items-center gap-3 rounded-2xl bg-ink/90 px-5 py-3 transition-colors hover:bg-ink"
                  >
                    <Icon name={s.icon} className="h-7 w-7" />
                    <span className="text-left leading-tight">
                      <span className="block text-[10px] text-white/60">{tr(s.top)}</span>
                      <span className="block text-sm font-bold">{typeof s.name === "string" ? s.name : tr(s.name)}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden items-center gap-4 rounded-3xl bg-white/12 p-4 backdrop-blur lg:flex">
              <div className="flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-white/50 text-center text-xs leading-tight text-white/80">
                <span>{tr(l("扫码下载", "QR code"))}</span>
                <span>{tr(l("即将开放", "coming soon"))}</span>
              </div>
              <ul className="space-y-2 pr-2 text-sm text-white/85">
                {[l("iOS 14+ / Android 8+", "iOS 14+ / Android 8+"), l("中文 / English", "Chinese / English"), l("免费下载", "Free download")].map((t) => (
                  <li key={t.en} className="flex items-center gap-2">
                    <Icon name="check" className="h-4 w-4" />
                    {tr(t)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
