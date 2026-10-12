"use client";

import Link from "next/link";
import { l, useLang } from "@/lib/i18n";
import { CaloriePair, ScoreGauge, calories, scores, type Score } from "@/components/ScoreBoard";
import HealthLoop from "@/components/HealthLoop";
import AppDashboardPhone from "@/components/AppDashboardPhone";
import ChapterNav from "@/components/ChapterNav";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

const DAYS = [l("一", "M"), l("二", "T"), l("三", "W"), l("四", "T"), l("五", "F"), l("六", "S"), l("日", "S")];

function ScoreCard({ s, delay }: { s: Score; delay: number }) {
  const { tr } = useLang();
  const delta = s.value - s.week[0];
  return (
    <Reveal delay={delay}>
      <article className="card h-full p-7 sm:p-8">
        <div className="flex items-center gap-5">
          <ScoreGauge value={s.value} color={s.color} size={104} stroke={10} labelClass="text-3xl" />
          <div>
            <p className="flex items-center gap-2 text-2xl font-extrabold">
              <span className={`grid h-8 w-8 place-items-center rounded-xl ${s.tone}`}>
                <Icon name={s.icon} className="h-4 w-4" />
              </span>
              {tr(s.name)}
            </p>
            <p className="mt-1 font-semibold" style={{ color: s.color }}>
              {tr(s.status)}
            </p>
          </div>
        </div>

        <p className="mt-6 leading-relaxed text-ink/80">{tr(s.what)}</p>

        <div className="mt-5 flex items-start gap-2 rounded-2xl bg-canvas p-4 text-sm">
          <Icon name="target" className="mt-0.5 h-4 w-4 shrink-0 text-teal-deep" />
          <span>
            <span className="font-semibold">{tr(l("今天这样做：", "Today: "))}</span>
            {tr(s.tip)}
          </span>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>{tr(l("近 7 天", "Last 7 days"))}</span>
            <span className={delta >= 0 ? "font-semibold text-mint" : "font-semibold text-amber"}>
              {delta >= 0 ? "↑" : "↓"} {Math.abs(delta)} {tr(l("分", "pts"))}
            </span>
          </div>
          <div className="mt-2 flex h-20 gap-2">
            {s.week.map((v, i) => (
              <div key={i} className="flex h-full flex-1 flex-col items-center gap-1">
                <div className="relative w-full flex-1">
                  <div
                    className="absolute inset-x-0 bottom-0 rounded-md"
                    style={{ height: `${v}%`, background: s.color, opacity: i === s.week.length - 1 ? 1 : 0.35 }}
                  />
                </div>
                <span className="text-[10px] text-muted">{tr(DAYS[i])}</span>
              </div>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function UnderstandPage() {
  const { tr } = useLang();
  return (
    <>
      <section className="hero-glow pt-28 pb-20 sm:pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal in-view">
            <p className="eyebrow">{tr(l("你的健康 · 02", "Your Health · 02"))}</p>
            <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.08] tracking-tight sm:text-7xl">
              {tr(l("读懂身体，", "Understand your body."))}
              <br />
              <span className="bg-gradient-to-r from-sky via-teal to-teal-deep bg-clip-text text-transparent">
                {tr(l("掌控健康。", "Own your health."))}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {tr(
                l(
                  "不必看懂一堆专业数据。健康雷达把戒指全天记录的身体信号，提炼成体能、睡眠、活动、心率四个分数，再加上活动消耗和食物摄入两个热量数字——每天看一眼，就知道身体状况如何、今天该怎么调整。",
                  "No need to decode a wall of data. Health Radar turns what your ring records into four scores — Energy, Sleep, Activity and Heart — plus two calorie figures: what you burned and what you ate. One glance tells you how your body is doing and what to adjust today."
                )
              )}
            </p>
          </div>

          <Reveal className="card mx-auto w-full max-w-md p-7">
            <div className="flex items-center justify-between">
              <p className="font-bold">{tr(l("今日身体状况", "Today's body check"))}</p>
              <span className="rounded-full bg-mint-soft px-3 py-1 text-xs font-semibold text-mint">{tr(l("整体良好", "Looking good"))}</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6">
              {scores.map((s) => (
                <div key={s.key} className="flex flex-col items-center">
                  <ScoreGauge value={s.value} color={s.color} size={112} stroke={10} labelClass="text-3xl" />
                  <p className="mt-3 font-bold">{tr(s.name)}</p>
                  <p className="text-xs font-semibold" style={{ color: s.color }}>
                    {tr(s.status)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-line pt-5">
              {calories.map((c) => (
                <div key={c.key} className="rounded-2xl bg-canvas p-3">
                  <p className="flex items-center gap-1.5 text-xs text-muted">
                    <Icon name={c.icon} className="h-3.5 w-3.5" />
                    {tr(c.name)}
                  </p>
                  <p className="mt-1 text-xl font-extrabold tabular-nums" style={{ color: c.color }}>
                    {c.value.toLocaleString()} <span className="text-xs font-semibold text-muted">kcal</span>
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* the four scores */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{tr(l("四个分数", "Four scores"))}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {tr(l("四个分数，读懂你的身体", "Four scores that explain your body"))}
          </h2>
          <p className="mt-4 text-muted">
            {tr(
              l(
                "每个分数满分 100，越高代表状态越好。分数背后是什么数据，交给健康雷达；你只需要知道结果，以及接下来怎么做。",
                "Each score runs to 100 — higher is better. Health Radar handles the data behind it; you just get the result and what to do next."
              )
            )}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {scores.map((s, i) => (
            <ScoreCard key={s.key} s={s} delay={(i % 2) * 100} />
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">{tr(l("* 分数为示意。", "* Scores shown are illustrative."))}</p>
      </section>

      {/* calories burned & eaten */}
      <section className="border-t border-line bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="eyebrow">{tr(l("两个热量", "Two calorie figures"))}</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {tr(l("动了多少，吃了多少，", "What you burned, what you ate —"))}
                <br />
                {tr(l("一目了然", "at a glance"))}
              </h2>
            </div>
            <p className="text-muted lg:pb-1">
              {tr(
                l(
                  "活动消耗由戒指自动记录，食物摄入靠拍照 AI 识别。两个数字放在一起，你就知道今天吃得是否合适、还需要动多少。",
                  "Your ring records the calories you burn; AI photo recognition counts the calories you eat. Side by side, they tell you whether today's eating fits and how much more to move."
                )
              )}
            </p>
          </Reveal>
          <div className="mt-12">
            <CaloriePair detailed />
          </div>
          <Reveal className="mt-6">
            <Link href="/health-radar#nutrition" className="inline-flex items-center gap-2 font-semibold text-teal-deep hover:underline">
              {tr(l("看看 AI 如何识别食物热量", "See how AI recognises food calories"))}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* compare with yourself */}
      <section className="border-t border-line py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">{tr(l("和自己比", "Compared with you"))}</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {tr(l("分数，是按你自己的身体算的", "Scores are measured against your own body"))}
            </h2>
            <p className="mt-5 text-muted">
              {tr(
                l(
                  "每个人的身体都不一样。健康雷达会先熟悉你一段时间的常态，再根据你自己的变化打分——所以分数反映的是你本人状态的起伏，而不是和别人比较。",
                  "Every body is different. Health Radar first learns what's normal for you, then scores how you change — so the numbers reflect your own ups and downs, not a comparison with anyone else."
                )
              )}
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: "sync", t: l("戴上就开始了解你", "Learns you as you wear it"), d: l("佩戴几天后，分数会越来越贴合你的身体。", "After a few days of wear, scores fit your body more and more closely.") },
              { icon: "chart", t: l("看趋势，不纠结一天", "Trends over single days"), d: l("偶尔一天分数低很正常，持续的变化才值得留意。", "One low day is normal — it's the steady changes worth noticing.") },
              { icon: "spark", t: l("分数配上建议", "Every score comes with advice"), d: l("每个分数都附带一条简单、可执行的建议。", "Each score comes with one simple thing you can do.") },
            ].map((x, i) => (
              <Reveal key={x.t.en} delay={i * 90}>
                <div className="card h-full p-6">
                  <Icon name={x.icon} className="h-6 w-6 text-teal-deep" />
                  <p className="mt-4 font-bold">{tr(x.t)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{tr(x.d)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HealthLoop />

      {/* every morning in the app */}
      <section className="relative overflow-hidden bg-graphite py-24 text-white">
        <div className="dot-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="eyebrow !text-teal">{tr(l("每天早上", "Every morning"))}</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              {tr(l("打开健康雷达，", "Open Health Radar,"))}
              <br />
              {tr(l("今天的状态一目了然", "see today at a glance"))}
            </h2>
            <p className="mt-5 max-w-xl text-white/60">
              {tr(
                l(
                  "起床后看一眼：体能够不够、昨晚睡得好不好、今天要动多少、心率是否平稳；白天再看看消耗和摄入的热量，安排好这一天。",
                  "One look when you wake up: how much energy you have, how you slept, how much to move and whether your heart is steady. Through the day, check calories burned and eaten to plan the rest."
                )
              )}
            </p>
            <Link href="/health-radar" className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal-deep">
              {tr(l("认识健康雷达", "Meet Health Radar"))}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <AppDashboardPhone className="mx-auto" />
          </Reveal>
        </div>
      </section>

      <div className="pt-24">
        <ChapterNav current="/understand" />
      </div>
    </>
  );
}
