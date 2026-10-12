"use client";

import Link from "next/link";
import { useState } from "react";
import { l, useLang } from "@/lib/i18n";
import { categories, devices, finishes, type Device } from "@/lib/devices";
import RingVisual from "./RingVisual";
import Icon from "./Icon";
import Reveal from "./Reveal";

const SIZES = [7, 8, 9, 10, 11, 12, 13];

export default function DeviceDetail({ ring }: { ring: Device }) {
  const { tr } = useLang();
  const [finish, setFinish] = useState(ring.finishes[0]);
  const [size, setSize] = useState<number | null>(null);
  const other = devices.find((d) => d.slug !== ring.slug && d.category === ring.category);
  const category = categories.find((c) => c.key === ring.category)!;

  return (
    <>
      {/* hero */}
      <section className="hero-glow pt-28 pb-16 sm:pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div className="relative order-2 mx-auto aspect-square w-full max-w-[500px] lg:order-1">
            <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-white via-teal-soft to-sky-soft" />
            <div className="absolute inset-[8%] rounded-full border border-teal/20" />
            <RingVisual key={finish} finish={finish} className="reveal in-view animate-vk-float absolute inset-[16%] drop-shadow-2xl" />
          </div>

          <div className="reveal in-view order-1 lg:order-2">
            <nav className="flex items-center gap-2 text-sm text-muted" aria-label="breadcrumb">
              <Link href="/devices" className="hover:text-teal-deep">{tr(l("智能设备", "Devices"))}</Link>
              <span>/</span>
              <span>{tr(category.name)}</span>
              <span>/</span>
              <span className="font-semibold text-ink">{ring.name}</span>
            </nav>
            <span className="mt-6 block w-fit rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-teal-deep">{tr(ring.badge)}</span>
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-7xl">{ring.name}</h1>
            <p className="mt-3 text-xl font-semibold text-ink/80">{tr(ring.tagline)}</p>
            <p className="mt-5 max-w-xl leading-relaxed text-muted">{tr(ring.summary)}</p>

            <div className="mt-8">
              <p className="text-sm font-semibold">
                {tr(l("配色", "Finish"))} · <span className="text-muted">{tr(finishes[finish].name)}</span>
              </p>
              <div className="mt-3 flex gap-3">
                {ring.finishes.map((k) => {
                  const [a, b] = finishes[k].stops;
                  return (
                    <button
                      key={k}
                      onClick={() => setFinish(k)}
                      aria-label={tr(finishes[k].name)}
                      aria-pressed={finish === k}
                      className={`h-10 w-10 rounded-full p-1 transition-all ${finish === k ? "ring-2 ring-teal ring-offset-2 ring-offset-canvas" : "ring-1 ring-line"}`}
                    >
                      <span className="block h-full w-full rounded-full" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold">
                {tr(l("尺码", "Size"))} <span className="font-normal text-muted">(US)</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-10 w-12 rounded-xl border text-sm font-semibold transition-colors ${
                      size === s ? "border-teal bg-teal text-white" : "border-line bg-white hover:border-teal/50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted">
                {tr(l("不确定尺码？可预约免费试戴尺码套装。", "Not sure? Request a free sizing kit."))}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-7 py-3.5 font-semibold text-white transition-colors hover:bg-teal-deep"
              >
                {tr(l("预约购买", "Reserve now"))}
                {size && <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">US {size}</span>}
              </Link>
              <Link href="/devices#compare" className="rounded-full border border-line bg-white px-7 py-3.5 text-center font-semibold hover:border-teal">
                {tr(l("对比 VK100 与 VK35 Pro", "Compare VK100 & VK35 Pro"))}
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-3 gap-4 px-5 sm:px-8">
          {ring.keySpecs.map((s) => (
            <div key={s.label.en} className="card p-5 text-center">
              <p className="text-2xl font-extrabold tabular-nums sm:text-3xl">{tr(s.value)}</p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{tr(s.label)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* highlights */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{tr(l("核心功能", "Highlights"))}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {tr(l(`${ring.name} 为你持续关注`, `What ${ring.name} keeps an eye on`))}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ring.highlights.map((h, i) => (
            <Reveal key={h.title.en} delay={i * 90}>
              <div className="card h-full p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-soft text-teal-deep">
                  <Icon name={h.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{tr(h.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tr(h.desc)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-6 flex flex-col items-start gap-5 rounded-3xl bg-mint-soft p-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-mint">
                <Icon name="camera" className="h-6 w-6" />
              </span>
              <div>
                <p className="font-bold">{tr(l("搭配 AI 饮食热量识别", "Pairs with AI calorie recognition"))}</p>
                <p className="mt-1 text-sm text-ink/70">
                  {tr(l("戒指记录消耗，App 拍照记录摄入，自动计算每日能量收支。", "The ring logs your burn, the app logs your meals — daily energy balance, calculated for you."))}
                </p>
              </div>
            </div>
            <Link href="/health-radar" className="shrink-0 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-teal-deep">
              {tr(l("了解 App", "See the app"))}
            </Link>
          </div>
        </Reveal>
      </section>

      {/* specs + box */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <div className="card p-7 sm:p-10">
              <h2 className="text-2xl font-extrabold">{tr(l("技术规格", "Tech specs"))}</h2>
              <dl className="mt-6 divide-y divide-line">
                {ring.specs.map((s) => (
                  <div key={s.label.en} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="text-sm font-semibold text-muted">{tr(s.label)}</dt>
                    <dd className="text-sm">{tr(s.value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
          <div className="space-y-6">
            <Reveal delay={100}>
              <div className="card p-7">
                <h2 className="text-xl font-extrabold">{tr(l("包装清单", "In the box"))}</h2>
                <ul className="mt-5 space-y-3">
                  {ring.inBox.map((item) => (
                    <li key={item.en} className="flex items-center gap-3 text-sm">
                      <Icon name="check" className="h-4 w-4 text-teal" />
                      {tr(item)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            {other && (
            <Reveal delay={180}>
              <Link href={`/devices/${other.slug}`} className="card group block overflow-hidden p-7 transition-colors hover:border-teal/40">
                <p className="text-xs font-semibold text-muted">{tr(l("同系列", "Also in the family"))}</p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-2xl font-extrabold">{other.name}</p>
                    <p className="mt-1 text-sm text-muted">{tr(other.badge)}</p>
                  </div>
                  <RingVisual finish={other.finishes[0]} shadow={false} sensor={false} className="h-24 transition-transform duration-500 group-hover:-rotate-12" />
                </div>
              </Link>
            </Reveal>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
