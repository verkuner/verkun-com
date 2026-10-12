"use client";

import { l, useLang } from "@/lib/i18n";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function HealthLoop() {
  const { tr } = useLang();
  const steps = [
    {
      icon: "heart",
      tone: "bg-heart-soft text-heart",
      k: l("采集", "Capture"),
      t: l("戒指记录身体信号", "Your ring records your body"),
      d: l("佩戴 VERKUN 智能设备，全天候、无感地记录你的身体信号，睡觉时也不例外。", "Wear a VERKUN device and it quietly records your body's signals all day — even while you sleep."),
    },
    {
      icon: "chart",
      tone: "bg-sky-soft text-sky",
      k: l("理解", "Understand"),
      t: l("凡鲲 App 给出四个分数", "The VERKUN app gives you four scores"),
      d: l("按你自己的常态，算出体能、睡眠、活动、心率四个分数，一看就懂。", "Measured against your own normal: Readiness, Sleep, Activity and Heart — clear at a glance."),
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
