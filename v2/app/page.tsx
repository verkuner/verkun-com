"use client";

import Link from "next/link";
import { l, useLang } from "@/lib/i18n";
import AppDashboardPhone from "@/components/AppDashboardPhone";
import RingVisual from "@/components/RingVisual";
import PhoneDemo from "@/components/PhoneDemo";
import VitalsBoard from "@/components/VitalsBoard";
import EnergyBalance from "@/components/EnergyBalance";
import DevicesShowcase from "@/components/DevicesShowcase";
import HealthDeviceNote from "@/components/HealthDeviceNote";
import ContactSection from "@/components/ContactSection";
import AppDownload from "@/components/AppDownload";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

function Hero() {
  const { tr } = useLang();
  return (
    <section className="hero-glow relative overflow-hidden pt-28 pb-20 sm:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal in-view">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-teal-deep">
            <span className="relative h-2 w-2 rounded-full bg-teal text-teal vk-pulse" />
            {tr(l("VERKUN Health App · 全新上线", "VERKUN Health App · now live"))}
          </span>
          <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.2rem]">
            {tr(l("用真实体征，", "Manage your health"))}
            <br />
            <span className="bg-gradient-to-r from-teal-deep via-teal to-sky bg-clip-text text-transparent">
              {tr(l("管理你的健康", "with your real vitals"))}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {tr(
              l(
                "VERKUN Health App 汇聚智能设备 24 小时记录的心率、血氧、睡眠、压力与活动，再加上 AI 拍照识别饮食热量，把你身体的真实信号，变成每天可执行的健康行动。",
                "VERKUN Health brings together the heart rate, SpO₂, sleep, stress and activity your device records around the clock — plus AI photo-based calorie tracking — and turns your body's real signals into health actions you can take every day."
              )
            )}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/app#download"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-7 py-3.5 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(15,181,166,0.8)] transition-colors hover:bg-teal-deep"
            >
              {tr(l("下载 App", "Get the App"))}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 font-semibold text-ink transition-colors hover:border-teal"
            >
              {tr(l("了解 App 功能", "Explore the app"))}
            </Link>
          </div>
          <ul className="mt-10 flex max-w-xl flex-wrap gap-x-6 gap-y-3 text-sm text-ink/75">
            {[l("真实体征 · 24h 记录", "Real vitals, 24/7"), l("AI 饮食热量识别", "AI calorie recognition"), l("个性化健康建议", "Personal guidance"), l("数据加密存储", "Encrypted data")].map((t) => (
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

function Loop() {
  const { tr } = useLang();
  const steps = [
    {
      icon: "heart",
      tone: "bg-heart-soft text-heart",
      k: l("采集", "Capture"),
      t: l("设备记录真实体征", "Devices record real vitals"),
      d: l("佩戴 VERKUN 智能设备，全天候、无感地记录心率、血氧、睡眠、体温与活动。", "Wear a VERKUN device to record heart rate, SpO₂, sleep, temperature and activity — all day, effortlessly."),
    },
    {
      icon: "chart",
      tone: "bg-sky-soft text-sky",
      k: l("理解", "Understand"),
      t: l("App 读懂你的数据", "The app makes sense of it"),
      d: l("建立你的个人基线，识别趋势与变化，生成睡眠、恢复与活动评分。", "It learns your personal baseline, spots trends and changes, and scores your sleep, recovery and activity."),
    },
    {
      icon: "target",
      tone: "bg-mint-soft text-mint",
      k: l("行动", "Act"),
      t: l("给出可执行的建议", "You get clear next steps"),
      d: l("结合饮食与能量收支，告诉你今天该怎么睡、怎么吃、怎么动。", "Combined with your meals and energy balance, it tells you how to sleep, eat and move today."),
    },
  ];
  return (
    <section className="border-y border-line bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{tr(l("健康管理闭环", "How it works"))}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {tr(l("从真实信号，到真实改变", "From real signals to real change"))}
          </h2>
        </Reveal>
        <div className="relative mt-14">
          <div className="absolute left-[16%] right-[16%] top-8 hidden border-t-2 border-dashed border-teal/25 md:block" />
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
            {steps.map((s, i) => (
              <li key={s.k.en}>
                <Reveal delay={i * 120} className="text-center">
                  <span className={`mx-auto grid h-16 w-16 place-items-center rounded-3xl ${s.tone} ring-8 ring-white`}>
                    <Icon name={s.icon} className="h-7 w-7" />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-muted">
                    0{i + 1} · {tr(s.k)}
                  </p>
                  <p className="mt-2 text-xl font-bold">{tr(s.t)}</p>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{tr(s.d)}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const { tr } = useLang();
  const items = [
    { icon: "heart", tone: "bg-heart-soft text-heart", href: "/app#vitals", t: l("体征看板", "Vitals dashboard"), d: l("心率、血氧、HRV、体温一屏总览，日 / 周 / 月趋势随时回看。", "Heart rate, SpO₂, HRV and temperature at a glance, with daily, weekly and monthly trends.") },
    { icon: "sleep", tone: "bg-sky-soft text-sky", href: "/app#sleep", t: l("睡眠分析", "Sleep analysis"), d: l("深睡、浅睡、REM 分期与睡眠评分，找出影响睡眠的习惯。", "Deep, light and REM stages plus a sleep score — find the habits that affect your rest.") },
    { icon: "stress", tone: "bg-mint-soft text-mint", href: "/app#sleep", t: l("压力与恢复", "Stress & recovery"), d: l("基于 HRV 评估每日恢复状态，合理安排训练与休息。", "Daily recovery scored from HRV so you can balance training and rest.") },
    { icon: "camera", tone: "bg-amber-soft text-amber", href: "/app#nutrition", t: l("AI 饮食识别", "AI nutrition"), d: l("拍照识别菜品与分量，自动计算热量与营养素。", "Snap a photo to identify dishes and portions; calories and macros are calculated for you.") },
    { icon: "target", tone: "bg-teal-soft text-teal-deep", href: "/app#energy", t: l("能量收支", "Energy balance"), d: l("设备测消耗、App 记摄入，实时掌握每日能量缺口。", "Your device measures burn, the app logs intake — see your daily balance live.") },
    { icon: "spark", tone: "bg-sky-soft text-sky", href: "/app#reports", t: l("AI 健康建议", "AI guidance"), d: l("综合全部数据，生成每日建议与周报，帮你坚持下去。", "Everything combined into daily tips and weekly reports that help you stick with it.") },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="eyebrow">{tr(l("App 核心功能", "What the app does"))}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {tr(l("一个 App，", "One app for"))}
            <br />
            {tr(l("看懂你的全部健康数据", "your whole health picture"))}
          </h2>
        </div>
        <p className="text-muted lg:pb-2">
          {tr(
            l(
              "不只是记录数字。VERKUN Health 把分散的体征、睡眠、运动和饮食数据放在一起分析，告诉你它们之间的关系，以及下一步该做什么。",
              "It's more than numbers. VERKUN Health analyses vitals, sleep, activity and food together, shows how they connect, and tells you what to do next."
            )
          )}
        </p>
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f, i) => (
          <Reveal key={f.t.en} delay={(i % 3) * 100}>
            <Link href={f.href} className="card group flex h-full flex-col p-7 transition-transform hover:-translate-y-1">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${f.tone}`}>
                <Icon name={f.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{tr(f.t)}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tr(f.d)}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal-deep opacity-70 transition-opacity group-hover:opacity-100">
                {tr(l("了解更多", "Learn more"))}
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Vitals() {
  const { tr } = useLang();
  return (
    <section className="relative overflow-hidden bg-graphite py-24 text-white">
      <div className="dot-grid absolute inset-0 opacity-50" />
      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-teal/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow !text-teal">{tr(l("真实体征", "Real vitals"))}</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              {tr(l("每一个数字，", "Every number comes"))}
              <br />
              {tr(l("都来自你真实的身体", "from your real body"))}
            </h2>
          </div>
          <p className="text-white/60 lg:pb-2">
            {tr(
              l(
                "不靠估算、不靠问卷。App 中的数据由你佩戴的智能设备连续记录，以你自己的历史数据为基线，变化一目了然。",
                "No guesswork, no questionnaires. The data in the app is recorded continuously by the device you wear and compared with your own history, so changes stand out."
              )
            )}
          </p>
        </Reveal>
        <div className="mt-12">
          <VitalsBoard />
        </div>
        <p className="mt-6 text-xs text-white/35">{tr(l("* 界面数据为示意。", "* Figures shown are illustrative."))}</p>
      </div>
    </section>
  );
}

function Nutrition() {
  const { tr } = useLang();
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto]">
        <Reveal>
          <p className="eyebrow">{tr(l("AI 饮食热量识别", "AI calorie recognition"))}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {tr(l("拍一拍，", "Snap it."))}
            <br />
            <span className="text-mint">{tr(l("热量一目了然", "Know every calorie."))}</span>
          </h2>
          <p className="mt-5 max-w-xl text-muted">
            {tr(
              l(
                "不用称重、不用手动搜索。针对中式菜肴优化的 AI 模型识别菜品、估算份量，自动记入饮食日志，并和设备测得的消耗一起计算能量收支。",
                "No scales, no database searches. Our AI — tuned for Chinese cuisine — recognises dishes, estimates portions, logs them for you, and weighs them against the burn your device measures."
              )
            )}
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              l("一餐多菜同时识别，结果可一键微调", "Several dishes per photo, adjustable in one tap"),
              l("热量、蛋白质、碳水、脂肪全面拆解", "Calories, protein, carbs and fat broken down"),
              l("根据当日消耗，给出下一餐建议", "Next-meal advice based on today's burn"),
            ].map((t) => (
              <li key={t.en} className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-mint-soft text-mint">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {tr(t)}
              </li>
            ))}
          </ul>
          <Link href="/app#nutrition" className="mt-8 inline-flex items-center gap-2 font-semibold text-teal-deep hover:underline">
            {tr(l("了解 AI 饮食识别", "More on AI nutrition"))}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </Reveal>
        <Reveal delay={150}>
          <PhoneDemo />
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
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {tr(l("选择你的数据来源", "Choose your data source"))}
            </h2>
            <p className="mt-3 text-muted">
              {tr(l("佩戴任意一款 VERKUN 智能设备，即可解锁 App 的全部体征功能。", "Wear any VERKUN device to unlock every vitals feature in the app."))}
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
      <Hero />
      <Loop />
      <Features />
      <Vitals />
      <Nutrition />
      <EnergyBalance />
      <Devices />
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <HealthDeviceNote />
      </section>
      <AppDownload />
      <ContactSection />
    </>
  );
}
