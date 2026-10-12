"use client";

import Link from "next/link";
import { l, useLang } from "@/lib/i18n";
import { yourHealth } from "@/lib/nav";
import AppDashboardPhone from "@/components/AppDashboardPhone";
import RingVisual from "@/components/RingVisual";
import RadarCard from "@/components/HealthRadar";
import ScoreBoard, { CaloriePair } from "@/components/ScoreBoard";
import DevicesShowcase from "@/components/DevicesShowcase";
import ContactSection from "@/components/ContactSection";
import AppDownload from "@/components/AppDownload";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

function RadarSummary() {
  const { tr } = useLang();
  return (
    <section className="hero-glow relative overflow-hidden border-t border-line py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal in-view">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-teal-deep">
            <span className="relative h-2 w-2 rounded-full bg-teal text-teal vk-pulse" />
            {tr(l("凡鲲 App · 全新上线", "VERKUN App · now live"))}
          </span>
          <h2 className="mt-6 text-[2.4rem] font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
            {tr(l("用真实体征，", "Manage your health"))}
            <br />
            <span className="bg-gradient-to-r from-teal-deep via-teal to-sky bg-clip-text text-transparent">
              {tr(l("管理你的健康", "with your real vitals"))}
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {tr(
              l(
                "凡鲲 App 汇聚智能设备 24 小时记录的心率、血氧、睡眠、压力与活动，再加上 AI 拍照识别饮食热量，把你身体的真实信号，变成每天可执行的健康行动。",
                "The VERKUN app brings together the heart rate, SpO₂, sleep, stress and activity your device records around the clock — plus AI photo-based calorie tracking — and turns your body's real signals into health actions you can take every day."
              )
            )}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/health-radar#download"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-7 py-3.5 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(15,181,166,0.8)] transition-colors hover:bg-teal-deep"
            >
              {tr(l("下载 App", "Get the App"))}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link
              href="/health-radar"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 font-semibold text-ink transition-colors hover:border-teal"
            >
              {tr(l("认识健康雷达", "Meet Health Radar"))}
            </Link>
          </div>
          <ul className="mt-10 flex max-w-xl flex-wrap gap-x-6 gap-y-3 text-sm text-ink/75">
            {[l("真实体征 · 24h 记录", "Real vitals, 24/7"), l("个性化健康建议", "Personal guidance"), l("数据加密存储", "Encrypted data")].map((t) => (
              <li key={t.en} className="flex items-center gap-1.5 whitespace-nowrap">
                <Icon name="check" className="h-4 w-4 shrink-0 text-teal" />
                {tr(t)}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto flex w-full max-w-[460px] justify-center lg:justify-end">
          <div className="absolute inset-x-6 top-10 bottom-10 rounded-full bg-gradient-to-br from-teal-soft via-white to-sky-soft blur-2xl" />
          <AppDashboardPhone className="relative" />
          {/* the device that feeds the app */}
          <div
            className="reveal in-view absolute -left-6 bottom-6 hidden items-center lg:-left-14 gap-3 rounded-3xl border border-line bg-white/95 p-3 pr-5 shadow-xl backdrop-blur sm:flex"
            style={{ animationDelay: "400ms" }}
          >
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-canvas">
              <RingVisual finish="black" shadow={false} className="animate-vk-float h-14" />
            </span>
            <span>
              <span className="block text-[11px] text-muted">{tr(l("数据来源", "Data source"))}</span>
              <span className="block text-sm font-bold">VK100</span>
              <span className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-mint">
                <span className="relative h-1.5 w-1.5 rounded-full bg-mint text-mint vk-pulse" />
                {tr(l("实时同步中", "Syncing live"))}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChapterHead({
  index,
  dark = false,
  first = false,
  children,
}: {
  index: number;
  dark?: boolean;
  first?: boolean;
  children?: React.ReactNode;
}) {
  const { tr } = useLang();
  const c = yourHealth[index];
  return (
    <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className={`eyebrow ${dark ? "!text-teal" : ""}`}>
          {tr(l("你的健康", "Your Health"))} · 0{index + 1}
        </p>
        {first ? (
          <h1 className="mt-4 text-[2.6rem] font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">{tr(c.title)}</h1>
        ) : (
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">{tr(c.title)}</h2>
        )}
        {children && <div className={`mt-4 text-lg ${dark ? "text-white/60" : "text-muted"}`}>{children}</div>}
      </div>
      <Link
        href={c.href}
        className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
          dark ? "bg-white/10 text-white hover:bg-teal" : "bg-ink text-white hover:bg-teal-deep"
        }`}
      >
        {tr(l("了解更多", "Learn more"))}
        <Icon name="arrow" className="h-4 w-4" />
      </Link>
    </Reveal>
  );
}

function WearChapter() {
  const { tr } = useLang();
  const points = [
    { icon: "heart", t: l("轻至 3 克，全天佩戴", "Just 3 g, worn all day"), d: l("无屏幕、无打扰，睡觉时也几乎感觉不到。", "No screen, no buzzing — you'll barely notice it, even asleep.") },
    { icon: "run", t: l("工作、运动、游泳都能戴", "Work, train, swim"), d: l("钛合金机身，5ATM 防水，陪你去任何地方。", "Titanium build and 5ATM water resistance go wherever you do.") },
    { icon: "battery", t: l("告别每日充电", "No daily charging"), d: l("续航 7 天起，搭配充电仓最长约 60 天。", "From 7 days per charge, up to ~60 days with the case.") },
  ];
  return (
    <section className="hero-glow pt-28 pb-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterHead index={0} first>
          {tr(
            l(
              "一枚智能戒指，陪你度过每个 24 小时——工作、运动、入睡，安静地记录身体的每一个真实信号。",
              "A smart ring for every 24 hours — through work, workouts and sleep, quietly recording every real signal your body sends."
            )
          )}
        </ChapterHead>
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
            <div className="absolute inset-[6%] rounded-[40%] bg-gradient-to-br from-heart-soft via-canvas to-teal-soft" />
            <RingVisual finish="black" className="animate-vk-float absolute left-[12%] top-[10%] w-[46%] drop-shadow-2xl" />
            <RingVisual finish="gold" sensor={false} className="animate-vk-float-b absolute right-[10%] top-[18%] w-[36%] drop-shadow-xl" />
            <RingVisual finish="silver" sensor={false} className="animate-vk-float-b absolute bottom-[2%] left-[40%] w-[30%] drop-shadow-xl" />
          </Reveal>
          <ul className="space-y-4">
            {points.map((p, i) => (
              <li key={p.t.en}>
                <Reveal delay={i * 100} className="card flex gap-4 p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-heart-soft text-heart">
                    <Icon name={p.icon} className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block text-lg font-bold">{tr(p.t)}</span>
                    <span className="mt-1 block text-sm text-muted">{tr(p.d)}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function UnderstandChapter() {
  const { tr } = useLang();
  return (
    <section className="relative overflow-hidden bg-graphite py-24 text-white">
      <div className="dot-grid absolute inset-0 opacity-50" />
      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-teal/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterHead index={1} dark>
          {tr(
            l(
              "不必看懂复杂数据。体能、睡眠、活动、心率四个分数，加上活动消耗和食物摄入两个热量数字，让你每天一眼读懂身体状况，知道今天该怎么调整。",
              "No complicated data. Four scores — Readiness, Sleep, Activity and Heart — plus calories burned and calories eaten show you how your body is doing each day, and what to adjust."
            )
          )}
        </ChapterHead>
        <div className="mt-12 space-y-4">
          <ScoreBoard dark />
          <CaloriePair dark />
        </div>
        <p className="mt-6 text-xs text-white/35">{tr(l("* 分数为示意。", "* Scores shown are illustrative."))}</p>
      </div>
    </section>
  );
}

function RadarChapter() {
  const { tr } = useLang();
  const features = [
    { icon: "heart", tone: "bg-heart-soft text-heart", href: "/health-radar#vitals", t: l("今日概览", "Today at a glance"), d: l("体能、睡眠、活动、心率四个分数，打开就能看懂。", "Readiness, Sleep, Activity and Heart scores — clear the moment you open it.") },
    { icon: "sleep", tone: "bg-sky-soft text-sky", href: "/health-radar#sleep", t: l("睡眠与恢复", "Sleep & recovery"), d: l("睡得好不好、恢复得够不够，每天告诉你。", "How well you slept and recovered, every day.") },
    { icon: "camera", tone: "bg-amber-soft text-amber", href: "/health-radar#nutrition", t: l("AI 饮食热量识别", "AI calorie recognition"), d: l("拍照识别菜品与分量，自动计算热量与营养素。", "Snap a photo — dishes, portions, calories and macros, done.") },
    { icon: "target", tone: "bg-teal-soft text-teal-deep", href: "/health-radar#energy", t: l("能量收支", "Energy balance"), d: l("设备测消耗、App 记摄入，实时掌握每日能量缺口。", "Device-measured burn vs. logged intake, live.") },
    { icon: "spark", tone: "bg-mint-soft text-mint", href: "/health-radar#reports", t: l("AI 健康建议与报告", "AI guidance & reports"), d: l("每日建议与周报，帮你把目标变成习惯。", "Daily tips and weekly reports that turn goals into habits.") },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <ChapterHead index={2}>
        {tr(
          l(
            "健康雷达是凡鲲 App 的核心：体能、睡眠、活动、心率四个分数，加上活动消耗与食物摄入，放进同一张雷达图——哪里好、哪里需要加强，一眼就能看出来。",
            "Health Radar is the heart of the VERKUN app: Readiness, Sleep, Activity and Heart, plus calories burned and eaten, on one radar chart — see at a glance what's strong and what needs work."
          )
        )}
      </ChapterHead>
      <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1fr_auto]">
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f.t.en} delay={(i % 2) * 100} className={i === features.length - 1 ? "sm:col-span-2" : ""}>
              <Link href={f.href} className="card group flex h-full gap-4 p-5 transition-transform hover:-translate-y-0.5">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${f.tone}`}>
                  <Icon name={f.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-bold">{tr(f.t)}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{tr(f.d)}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <RadarCard className="w-full max-w-md" />
        </Reveal>
      </div>
    </section>
  );
}

function Devices() {
  const { tr } = useLang();
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{tr(l("智能设备", "Devices"))}</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{tr(l("选择你的数据来源", "Choose your data source"))}</h2>
            <p className="mt-3 text-muted">
              {tr(l("佩戴任意一款 VERKUN 智能设备，即可解锁凡鲲 App 的全部功能。", "Wear any VERKUN device to unlock every feature of the VERKUN app."))}
            </p>
          </div>
          <Link href="/devices" className="inline-flex shrink-0 items-center gap-2 font-semibold text-teal-deep hover:underline">
            {tr(l("全部设备与对比", "All devices & comparison"))}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </Reveal>
        <div className="mt-10">
          <DevicesShowcase />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <WearChapter />
      <UnderstandChapter />
      <RadarChapter />
      <RadarSummary />
      <Devices />
      <div className="py-24">
        <AppDownload />
      </div>
      <ContactSection />
    </>
  );
}
