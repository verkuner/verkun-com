"use client";

import Link from "next/link";
import { l, useLang } from "@/lib/i18n";
import { devices, finishes } from "@/lib/devices";
import RingVisual from "@/components/RingVisual";
import ChapterNav from "@/components/ChapterNav";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { useHashScroll } from "@/lib/useHashScroll";

const day = [
  {
    time: "07:00",
    icon: "sleep",
    tone: "bg-sky-soft text-sky",
    t: l("醒来，先看昨晚睡得怎样", "Wake up to last night's sleep"),
    ring: l("整晚记录睡眠分期、心率与血氧", "Recorded sleep stages, heart rate and SpO₂ all night"),
    app: l("睡眠评分 88 · 深睡 1h 36m", "Sleep score 88 · deep 1h 36m"),
  },
  {
    time: "10:30",
    icon: "stress",
    tone: "bg-mint-soft text-mint",
    t: l("忙碌的上午，留意压力", "A busy morning — mind your stress"),
    ring: l("通过 HRV 感知身体的紧张与放松", "Senses tension and calm through HRV"),
    app: l("压力偏高，建议 3 分钟呼吸放松", "Stress rising — try a 3-minute breathing break"),
  },
  {
    time: "12:30",
    icon: "bowl",
    tone: "bg-amber-soft text-amber",
    t: l("午餐，拍一张就好", "Lunch — just snap a photo"),
    ring: l("记录全天活动与能量消耗", "Tracks your activity and energy burn all day"),
    app: l("AI 识别：宫保鸡丁 410 kcal", "AI: Kung Pao Chicken, 410 kcal"),
  },
  {
    time: "18:30",
    icon: "run",
    tone: "bg-heart-soft text-heart",
    t: l("下班后，动起来", "After work, get moving"),
    ring: l("自动识别跑步、骑行与游泳", "Auto-detects running, cycling and swimming"),
    app: l("跑步 32 分钟 · 平均心率 142", "32-min run · avg HR 142"),
  },
  {
    time: "23:00",
    icon: "target",
    tone: "bg-teal-soft text-teal-deep",
    t: l("入睡前，回顾今天", "Before bed, look back on today"),
    ring: l("佩戴入睡，几乎感觉不到它", "Sleep in it — you'll barely notice"),
    app: l("今日能量缺口 −650 kcal · 目标达成", "−650 kcal today · goal reached"),
  },
];

const traits = [
  { v: l("3 g", "3 g"), k: l("轻到忘记它的存在", "So light you forget it") },
  { v: l("钛合金", "Titanium"), k: l("坚固、亲肤、耐磨", "Strong, skin-friendly, durable") },
  { v: l("5ATM", "5ATM"), k: l("洗手、淋浴、游泳都能戴", "Wear it to wash, shower and swim") },
  { v: l("7–60 天", "7–60 days"), k: l("续航，告别每日充电", "Battery — no daily charging") },
];

export default function WearPage() {
  const { tr } = useLang();
  useHashScroll();
  return (
    <>
      <section className="hero-glow overflow-hidden pt-28 pb-20 sm:pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div className="reveal in-view">
            <p className="eyebrow">{tr(l("你的健康 · 01", "Your Health · 01"))}</p>
            <h1 className="mt-5 text-[2.7rem] font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
              {tr(l("戴上，", "Wear your"))}
              <br />
              <span className="bg-gradient-to-r from-heart via-[#ff8a65] to-amber bg-clip-text text-transparent">
                {tr(l("更好的生活", "best life"))}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {tr(
                l(
                  "一枚轻至 3 克的钛合金智能戒指，没有屏幕，也没有打扰。从清晨到深夜，它安静地陪着你工作、运动、入睡，记录身体的每一个真实信号。",
                  "A titanium smart ring as light as 3 g — no screen, no interruptions. From morning to night it quietly goes with you to work, workouts and bed, recording every real signal your body sends."
                )
              )}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/devices" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-7 py-3.5 font-semibold text-white hover:bg-teal-deep">
                {tr(l("选择你的戒指", "Choose your ring"))}
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="#day" className="whitespace-nowrap rounded-full border border-line bg-white px-7 py-3.5 text-center font-semibold hover:border-teal">
                {tr(l("看看戴着它的一天", "A day with your ring"))}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-heart-soft via-white to-teal-soft" />
            <div className="absolute inset-[3%] rounded-full border border-dashed border-heart/20" />
            <RingVisual finish="gold" sensor={false} className="animate-vk-float-b absolute right-[6%] top-[8%] w-[38%] drop-shadow-xl" />
            <RingVisual finish="black" className="animate-vk-float absolute left-[18%] top-[22%] w-[50%] drop-shadow-2xl" />
            <RingVisual finish="silver" sensor={false} className="animate-vk-float-b absolute bottom-[6%] right-[14%] w-[34%] drop-shadow-xl" />
          </div>
        </div>
      </section>

      {/* a day with the ring */}
      <section id="day" className="scroll-mt-24 border-y border-line bg-white py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="eyebrow">{tr(l("戴着它的一天", "A day with your ring"))}</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              {tr(l("它不改变你的生活，", "It doesn't change your life —"))}
              <br />
              {tr(l("只是让你更懂它", "it helps you understand it"))}
            </h2>
          </Reveal>

          <ol className="relative mt-16 space-y-6 before:absolute before:left-[27px] before:top-2 before:bottom-2 before:w-0.5 before:bg-line sm:before:left-[39px]">
            {day.map((m, i) => (
              <li key={m.time}>
                <Reveal delay={i * 80} className="relative flex gap-5 sm:gap-8">
                  <span className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl ring-8 ring-white sm:h-20 sm:w-20 sm:rounded-3xl ${m.tone}`}>
                    <Icon name={m.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
                  </span>
                  <div className="card flex-1 p-5 sm:p-6">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="text-sm font-bold tabular-nums text-teal-deep">{m.time}</span>
                      <h3 className="text-lg font-bold">{tr(m.t)}</h3>
                    </div>
                    <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                      <p className="flex gap-2 text-muted">
                        <span className="shrink-0 rounded-md bg-canvas px-1.5 py-0.5 text-[11px] font-semibold text-ink/70">{tr(l("戒指", "Ring"))}</span>
                        {tr(m.ring)}
                      </p>
                      <p className="flex gap-2 text-muted">
                        <span className="shrink-0 rounded-md bg-teal-soft px-1.5 py-0.5 text-[11px] font-semibold text-teal-deep">App</span>
                        {tr(m.app)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center text-xs text-muted">{tr(l("* 数据为示意。", "* Figures shown are illustrative."))}</p>
        </div>
      </section>

      {/* made to be worn */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{tr(l("为全天佩戴而生", "Made to be worn"))}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {tr(l("舒适，才能坚持", "Comfort is what makes it stick"))}
          </h2>
          <p className="mt-4 text-muted">
            {tr(
              l(
                "健康管理靠的是长期坚持。所以我们把戒指做得足够轻、足够耐用，让你愿意一直戴着它。",
                "Health is a long game. So we made the ring light and tough enough that you'll want to keep it on."
              )
            )}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {traits.map((t, i) => (
            <Reveal key={t.k.en} delay={i * 90}>
              <div className="card h-full p-7">
                <p className="text-3xl font-extrabold tracking-tight text-teal-deep">{tr(t.v)}</p>
                <p className="mt-2 text-sm text-muted">{tr(t.k)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="card mt-6 flex flex-col items-center gap-8 overflow-hidden p-8 sm:p-10 lg:flex-row">
            <div className="flex-1">
              <h3 className="text-2xl font-extrabold">{tr(l("配得上你的每一种风格", "A finish for every style"))}</h3>
              <p className="mt-2 text-muted">
                {tr(l("曜石黑、钛银、香槟金，通勤、运动、约会都合适。", "Obsidian Black, Titanium Silver and Champagne Gold — for the commute, the gym or a night out."))}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {devices.map((d) => (
                  <Link key={d.slug} href={`/devices/${d.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:border-teal">
                    {d.name}
                    <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-4">
              {Object.values(finishes).map((f) => (
                <div key={f.key} className="text-center">
                  <RingVisual finish={f.key} shadow={false} sensor={false} className="h-28 sm:h-32" />
                  <p className="mt-2 text-xs text-muted">{tr(f.name)}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <ChapterNav current="/wear" />
    </>
  );
}
