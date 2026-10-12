"use client";

import Link from "next/link";
import { l, useLang } from "@/lib/i18n";
import VitalsBoard from "@/components/VitalsBoard";
import HealthLoop from "@/components/HealthLoop";
import ChapterNav from "@/components/ChapterNav";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

const vitals = [
  {
    icon: "heart",
    tone: "bg-heart-soft text-heart",
    name: l("心率与静息心率", "Heart rate & resting HR"),
    what: l("心脏每分钟跳动的次数。静息心率在安静状态下测得。", "How many times your heart beats per minute; resting HR is measured while you're still."),
    why: l("静息心率的长期变化，能反映体能、恢复与生活作息的变化。", "Long-term shifts in resting HR reflect changes in fitness, recovery and routine."),
  },
  {
    icon: "o2",
    tone: "bg-teal-soft text-teal-deep",
    name: l("血氧饱和度", "Blood oxygen (SpO₂)"),
    what: l("血液中携带氧气的比例，戒指在夜间持续记录。", "The share of your blood carrying oxygen, recorded by the ring overnight."),
    why: l("了解睡眠期间的血氧水平，是观察睡眠质量的一个角度。", "Seeing your levels during sleep is one more lens on how well you rest."),
  },
  {
    icon: "sleep",
    tone: "bg-sky-soft text-sky",
    name: l("睡眠分期", "Sleep stages"),
    what: l("把一夜睡眠分为清醒、REM、浅睡与深睡。", "Your night split into awake, REM, light and deep sleep."),
    why: l("睡多久之外，睡得深不深、规律不规律同样重要。", "Beyond how long — how deep and how regular you sleep matters too."),
  },
  {
    icon: "stress",
    tone: "bg-mint-soft text-mint",
    name: l("心率变异性 HRV", "Heart rate variability (HRV)"),
    what: l("相邻心跳之间时间间隔的细微变化。", "The tiny variations in time between heartbeats."),
    why: l("HRV 常被用来观察压力与恢复状态：相对自身基线偏高，通常意味着恢复较好。", "Often used to read stress and recovery — higher than your own baseline usually means you've recovered well."),
  },
  {
    icon: "temp",
    tone: "bg-amber-soft text-amber",
    name: l("皮肤温度变化", "Skin temperature trend"),
    what: l("夜间指部皮肤温度相对你个人基线的变化。", "How your overnight finger temperature shifts against your baseline."),
    why: l("温度趋势可以帮助你察觉作息、环境或身体状态的变化。", "Trends help you notice changes in routine, environment or how you feel."),
  },
  {
    icon: "run",
    tone: "bg-heart-soft text-heart",
    name: l("活动与能量消耗", "Activity & energy burn"),
    what: l("步数、运动时长与身体消耗的能量。", "Steps, workout time and the energy your body burns."),
    why: l("配合健康雷达的饮食记录，看清每天的能量收支。", "Paired with Health Radar's food log, it shows your daily energy balance."),
  },
];

// 30 nights of HRV (ms) against a personal baseline band. Illustrative.
const HRV30 = [52, 55, 50, 48, 53, 56, 58, 54, 51, 47, 45, 49, 53, 55, 57, 56, 52, 50, 54, 58, 60, 57, 55, 53, 51, 54, 57, 59, 58, 61];
const BAND = { lo: 49, hi: 57 };

function BaselineChart() {
  const w = 600;
  const h = 180;
  const min = 40;
  const max = 66;
  const y = (v: number) => h - ((v - min) / (max - min)) * h;
  const x = (i: number) => (i / (HRV30.length - 1)) * w;
  const path = HRV30.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const last = HRV30.length - 1;
  return (
    <svg viewBox={`0 0 ${w} ${h + 10}`} className="h-56 w-full" preserveAspectRatio="none" aria-hidden>
      <rect x="0" y={y(BAND.hi)} width={w} height={y(BAND.lo) - y(BAND.hi)} fill="#0fb5a6" fillOpacity="0.12" />
      <line x1="0" x2={w} y1={y(BAND.hi)} y2={y(BAND.hi)} stroke="#0fb5a6" strokeOpacity="0.4" strokeDasharray="4 6" />
      <line x1="0" x2={w} y1={y(BAND.lo)} y2={y(BAND.lo)} stroke="#0fb5a6" strokeOpacity="0.4" strokeDasharray="4 6" />
      <path d={path} fill="none" stroke="#2f80ed" strokeWidth="2.5" strokeLinejoin="round" />
      {HRV30.map((v, i) =>
        v < BAND.lo ? <circle key={i} cx={x(i)} cy={y(v)} r="5" fill="#f5a524" /> : null
      )}
      <circle cx={x(last)} cy={y(HRV30[last])} r="7" fill="#2f80ed" stroke="#fff" strokeWidth="3" />
    </svg>
  );
}

export default function UnderstandPage() {
  const { tr } = useLang();
  return (
    <>
      <section className="hero-glow pt-28 pb-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal in-view max-w-4xl">
            <p className="eyebrow">{tr(l("你的健康 · 02", "Your Health · 02"))}</p>
            <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.08] tracking-tight sm:text-7xl">
              {tr(l("读懂身体，", "Understand your body."))}
              <br />
              <span className="bg-gradient-to-r from-sky via-teal to-teal-deep bg-clip-text text-transparent">
                {tr(l("掌控健康。", "Own your health."))}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {tr(
                l(
                  "健康不是一种笼统的感觉，而是一组看得见的真实信号。了解每个指标的含义、你自己的基线和它的变化，你才能真正为自己的健康做决定。",
                  "Health isn't a vague feeling — it's a set of real signals you can see. Know what each one means, what's normal for you and how it's changing, and you can make your own decisions about your health."
                )
              )}
            </p>
          </div>
        </div>
      </section>

      {/* what each vital means */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{tr(l("认识你的体征", "Know your vitals"))}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {tr(l("每个数字，都在讲述你的身体", "Every number tells you something"))}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vitals.map((v, i) => (
            <Reveal key={v.name.en} delay={(i % 3) * 90}>
              <div className="card h-full p-7">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${v.tone}`}>
                  <Icon name={v.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{tr(v.name)}</h3>
                <dl className="mt-3 space-y-3 text-sm leading-relaxed">
                  <div>
                    <dt className="text-xs font-semibold text-muted">{tr(l("它是什么", "What it is"))}</dt>
                    <dd className="mt-0.5 text-ink/80">{tr(v.what)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-muted">{tr(l("为什么值得关注", "Why it matters"))}</dt>
                    <dd className="mt-0.5 text-ink/80">{tr(v.why)}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* personal baseline */}
      <section className="border-y border-line bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">{tr(l("个人基线", "Your baseline"))}</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {tr(l("和自己比，", "Compare yourself"))}
              <br />
              {tr(l("而不是和别人比", "with yourself — not others"))}
            </h2>
            <p className="mt-5 text-muted">
              {tr(
                l(
                  "每个人的身体都不一样。健康雷达用你最近几周的数据建立个人基线，当某个指标偏离你的常态时，你会第一时间看到——这比任何“标准值”都更有意义。",
                  "Every body is different. Health Radar builds your personal baseline from recent weeks, so when a signal drifts from your normal you see it straight away — far more meaningful than any one-size-fits-all number."
                )
              )}
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {[
                { c: "bg-teal/25", t: l("你的常态范围", "Your normal range") },
                { c: "bg-sky", t: l("近 30 天 HRV", "HRV, last 30 days") },
                { c: "bg-amber", t: l("低于常态的日子", "Days below your normal") },
              ].map((x) => (
                <li key={x.t.en} className="flex items-center gap-2 text-muted">
                  <span className={`h-3 w-3 rounded-full ${x.c}`} />
                  {tr(x.t)}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="card p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="font-bold">{tr(l("HRV · 近 30 天", "HRV · last 30 days"))}</p>
                <span className="rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-teal-deep">
                  {tr(l(`常态 ${BAND.lo}–${BAND.hi} ms`, `Normal ${BAND.lo}–${BAND.hi} ms`))}
                </span>
              </div>
              <div className="mt-6">
                <BaselineChart />
              </div>
              <p className="mt-4 rounded-2xl bg-canvas p-4 text-sm text-ink/75">
                {tr(
                  l(
                    "第 10–12 天 HRV 低于你的常态，那几天睡眠也偏少；之后随着作息恢复，HRV 回到并超过常态范围。",
                    "Days 10–12 dipped below your normal alongside short nights; as your routine recovered, HRV returned to — and rose above — your usual range."
                  )
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <HealthLoop />

      <section className="relative overflow-hidden bg-graphite py-24 text-white">
        <div className="dot-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow !text-teal">{tr(l("此刻的你", "You, right now"))}</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              {tr(l("所有信号，汇成一张全景图", "All your signals, one clear picture"))}
            </h2>
            <p className="mt-4 text-white/60">
              {tr(l("在健康雷达中，这些体征随时可查，并按日、周、月呈现趋势。", "In Health Radar these vitals are always at hand, with daily, weekly and monthly trends."))}
            </p>
          </Reveal>
          <div className="mt-12">
            <VitalsBoard />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-white/35">{tr(l("* 界面数据为示意。", "* Figures shown are illustrative."))}</p>
            <Link href="/health-radar" className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal-deep">
              {tr(l("认识健康雷达", "Meet Health Radar"))}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <ChapterNav current="/understand" />
    </>
  );
}
