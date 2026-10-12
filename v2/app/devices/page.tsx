"use client";

import Link from "next/link";
import { l, useLang } from "@/lib/i18n";
import DevicesShowcase from "@/components/DevicesShowcase";
import CompareTable from "@/components/CompareTable";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { useHashScroll } from "@/lib/useHashScroll";

export default function DevicesPage() {
  const { tr } = useLang();
  useHashScroll();
  return (
    <>
      <section className="hero-glow pt-28 pb-16 sm:pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">{tr(l("智能设备", "Devices"))}</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
              {tr(l("你的真实体征，", "Your real vitals,"))}
              <br />
              <span className="text-teal-deep">{tr(l("从这里开始采集", "captured from here"))}</span>
            </h1>
            <p className="mt-5 text-lg text-muted">
              {tr(
                l(
                  "VERKUN 智能设备全天候记录心率、血氧、睡眠、体温与活动，自动同步到健康雷达 App，成为你健康管理的数据来源。",
                  "VERKUN devices record heart rate, SpO₂, sleep, temperature and activity around the clock and sync automatically to the Health Radar app — the data source for managing your health."
                )
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link href="#compare" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-white hover:bg-teal-deep">
                {tr(l("设备对比", "Compare devices"))}
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/health-radar" className="rounded-full border border-line bg-white px-5 py-2.5 font-semibold hover:border-teal">
                {tr(l("了解 App 功能", "See what the app does"))}
              </Link>
            </div>
          </Reveal>

          <div className="mt-14">
            <DevicesShowcase />
          </div>
        </div>
      </section>

      <section id="compare" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 sm:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">{tr(l("设备对比", "Compare"))}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {tr(l("哪一枚戒指更适合你？", "Which ring suits you?"))}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            {tr(
              l(
                "VK100 轻盈日常，VK35 Pro 续航更长、功能更全。两者都完整支持健康雷达 App 的全部功能。",
                "VK100 is light and everyday; VK35 Pro adds battery and features. Both unlock every feature of the Health Radar app."
              )
            )}
          </p>
        </Reveal>
        <div className="mt-10">
          <CompareTable />
        </div>
      </section>

    </>
  );
}
