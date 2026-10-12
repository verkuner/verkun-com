"use client";

import Link from "next/link";
import { l, useLang } from "@/lib/i18n";
import { rings } from "@/lib/products";
import RingVisual from "@/components/RingVisual";
import PhoneDemo from "@/components/PhoneDemo";
import VitalsBoard from "@/components/VitalsBoard";
import ContactSection from "@/components/ContactSection";
import AppDownload from "@/components/AppDownload";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

const capabilities = [
  l("24h 心率", "24/7 heart rate"),
  l("血氧饱和度", "Blood oxygen"),
  l("睡眠分期", "Sleep staging"),
  l("HRV 压力评估", "HRV stress"),
  l("皮肤温度趋势", "Skin temperature"),
  l("运动自动识别", "Auto activity"),
  l("AI 食物识别", "AI food recognition"),
  l("热量与营养素", "Calories & macros"),
  l("能量收支平衡", "Energy balance"),
];

function Hero() {
  const { tr } = useLang();
  const chips = [
    { pos: "left-0 top-8 sm:-left-4", icon: "heart", tone: "bg-heart-soft text-heart", k: l("心率", "Heart rate"), v: "62 bpm" },
    { pos: "right-0 top-24 sm:-right-2", icon: "o2", tone: "bg-teal-soft text-teal-deep", k: l("血氧", "SpO₂"), v: "98%" },
    { pos: "left-2 bottom-20 sm:-left-6", icon: "sleep", tone: "bg-sky-soft text-sky", k: l("睡眠", "Sleep"), v: "7h 42m" },
    { pos: "right-2 bottom-6", icon: "bowl", tone: "bg-mint-soft text-mint", k: l("今日摄入", "Intake today"), v: "1,480 kcal" },
  ];

  return (
    <section className="hero-glow relative overflow-hidden pt-28 pb-16 sm:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="reveal in-view">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-teal-deep">
            <span className="relative h-2 w-2 rounded-full bg-teal text-teal vk-pulse" />
            {tr(l("全新 VK 系列智能戒指 · AI 饮食 App 同步上线", "New VK smart rings · AI nutrition app, now live"))}
          </span>
          <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.3rem]">
            {tr(l("戴在指尖的", "Health intelligence,"))}
            <br />
            <span className="bg-gradient-to-r from-teal-deep via-teal to-sky bg-clip-text text-transparent">
              {tr(l("健康智能", "at your fingertip"))}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {tr(
              l(
                "VK 系列智能戒指 24 小时读懂你的身体；拍一张餐食照片，AI 即刻算出热量与营养。摄入与消耗，一目了然。",
                "VK smart rings read your body around the clock. Snap a photo of your meal and AI instantly works out calories and nutrients. Energy in, energy out — at a glance."
              )
            )}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/rings/vk100"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-7 py-3.5 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(15,181,166,0.8)] transition-colors hover:bg-teal-deep"
            >
              {tr(l("探索 VK 智能戒指", "Explore VK rings"))}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 font-semibold text-ink transition-colors hover:border-teal"
            >
              <Icon name="camera" className="h-4 w-4 text-teal-deep" />
              {tr(l("体验 AI 识餐", "Try AI meal scan"))}
            </Link>
          </div>
          <ul className="mt-10 flex max-w-xl flex-wrap gap-x-6 gap-y-3 text-sm text-ink/75">
            {[l("医疗级传感器", "Medical-grade sensors"), l("5ATM 防水", "5ATM water-proof"), l("最长 60 天续航", "Up to 60-day battery"), l("数据加密存储", "Encrypted data")].map((t) => (
              <li key={t.en} className="flex items-center gap-1.5 whitespace-nowrap">
                <Icon name="check" className="h-4 w-4 shrink-0 text-teal" />
                {tr(t)}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-teal-soft via-white to-sky-soft" />
          <div className="absolute inset-[12%] rounded-full border border-teal/20" />
          <div className="absolute inset-[2%] rounded-full border border-dashed border-teal/20" />
          <RingVisual finish="black" className="animate-vk-float absolute left-[14%] top-[14%] w-[52%] drop-shadow-2xl" />
          <RingVisual finish="gold" className="animate-vk-float-b absolute right-[10%] bottom-[12%] w-[42%] drop-shadow-xl" sensor={false} />
          {chips.map((c, i) => (
            <div
              key={c.k.en}
              className={`reveal in-view absolute ${c.pos} flex items-center gap-2.5 rounded-2xl border border-line bg-white/90 py-2 pl-2 pr-4 shadow-lg backdrop-blur`}
              style={{ animationDelay: `${300 + i * 150}ms` }}
            >
              <span className={`grid h-9 w-9 place-items-center rounded-xl ${c.tone}`}>
                <Icon name={c.icon} className="h-4.5 w-4.5" />
              </span>
              <span>
                <span className="block text-[11px] text-muted">{tr(c.k)}</span>
                <span className="block text-sm font-bold tabular-nums">{c.v}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const { tr } = useLang();
  const items = [...capabilities, ...capabilities];
  return (
    <div className="border-y border-line bg-white py-4">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-vk-marquee flex w-max gap-10">
          {items.map((c, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap text-sm font-semibold text-ink/55">
              {tr(c)}
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Products() {
  const { tr } = useLang();
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{tr(l("VK 智能戒指系列", "The VK ring family"))}</p>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
          {tr(l("两款戒指，一种更轻的健康方式", "Two rings. One lighter way to stay healthy."))}
        </h2>
        <p className="mt-4 text-muted">
          {tr(l("无屏幕、无打扰，全天佩戴也几乎感觉不到它的存在。", "No screen, no buzzing — so light you'll forget it's there."))}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {rings.map((r, i) => (
          <Reveal key={r.slug} delay={i * 120}>
            <article className="card group relative flex h-full flex-col overflow-hidden p-8 sm:p-10">
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-teal-deep">{tr(r.badge)}</span>
                  <h3 className="mt-4 text-4xl font-extrabold tracking-tight">{r.name}</h3>
                  <p className="mt-2 max-w-sm text-muted">{tr(r.tagline)}</p>
                </div>
              </div>

              <div className="relative my-6 flex h-64 items-center justify-center">
                <div className="absolute h-56 w-56 rounded-full bg-gradient-to-br from-canvas to-teal-soft transition-transform duration-700 group-hover:scale-110" />
                <RingVisual finish={r.finishes[i === 0 ? 0 : 1]} className="relative h-64 transition-transform duration-700 group-hover:-rotate-6" />
              </div>

              <div className="grid grid-cols-3 divide-x divide-line rounded-2xl bg-canvas py-4 text-center">
                {r.keySpecs.map((s) => (
                  <div key={s.label.en}>
                    <p className="text-xl font-extrabold tabular-nums">{tr(s.value)}</p>
                    <p className="mt-0.5 text-xs text-muted">{tr(s.label)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/rings/${r.slug}`} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-deep">
                  {tr(l("了解详情", "Learn more"))}
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link href="/compare" className="rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-teal">
                  {tr(l("产品对比", "Compare"))}
                </Link>
              </div>
            </article>
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
            <p className="eyebrow !text-teal">{tr(l("全天候健康监测", "Around-the-clock monitoring"))}</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              {tr(l("你的身体，", "Your body,"))}
              <br />
              {tr(l("24 小时被温柔读懂", "gently understood 24/7"))}
            </h2>
          </div>
          <p className="text-white/60 lg:pb-2">
            {tr(
              l(
                "指根动脉血流丰富、佩戴稳定，光学信号比手腕更清晰。VK 戒指持续采集心率、血氧、体温与运动数据，在 App 中生成可读、可行动的健康报告。",
                "The finger's rich arterial flow and snug fit give cleaner optical signals than the wrist. VK rings continuously capture heart rate, SpO₂, temperature and movement, turning them into readable, actionable reports in the app."
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

function AiCalories() {
  const { tr } = useLang();
  const steps = [
    { icon: "camera", t: l("拍一张照片", "Snap a photo"), d: l("对准餐盘拍照，支持一餐多道菜。", "Point at your plate — multiple dishes per meal supported.") },
    { icon: "spark", t: l("AI 识别菜品与分量", "AI identifies dish & portion"), d: l("视觉大模型识别菜品，并结合餐具参照估算份量。", "A vision model recognises each dish and estimates portion size from tableware cues.") },
    { icon: "chart", t: l("热量与营养素拆解", "Calories & macros"), d: l("给出热量、蛋白质、碳水与脂肪，自动记入饮食日志。", "Get calories, protein, carbs and fat, logged to your food diary automatically.") },
    { icon: "target", t: l("个性化饮食建议", "Personal guidance"), d: l("结合戒指测得的消耗与目标，给出下一餐建议。", "Combined with ring-measured burn and your goals, get advice for the next meal.") },
  ];
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
                "不用称重、不用手动搜索。针对中式菜肴深度优化的 AI 模型，一秒识别菜品、估算份量，告诉你这一餐吃进了什么。",
                "No scales, no searching databases. Our AI — deeply tuned for Chinese cuisine — recognises dishes and estimates portions in about a second, so you know exactly what's on your plate."
              )
            )}
          </p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s.t.en} className="card p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-mint-soft text-mint">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold text-muted">0{i + 1}</span>
                </div>
                <p className="mt-4 font-bold">{tr(s.t)}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{tr(s.d)}</p>
              </li>
            ))}
          </ol>
          <Link href="/app" className="mt-8 inline-flex items-center gap-2 font-semibold text-teal-deep hover:underline">
            {tr(l("了解 AI 饮食 App", "Explore the AI nutrition app"))}
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

function EnergyBalance() {
  const { tr } = useLang();
  const intake = 1480;
  const bmr = 1618;
  const active = 512;
  const burn = bmr + active;
  const net = intake - burn;
  const max = burn;
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
      <div className="card overflow-hidden p-8 sm:p-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">{tr(l("能量闭环", "Closed-loop energy"))}</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {tr(l("戒指算消耗，App 算摄入", "The ring measures burn. The app measures intake."))}
            </h2>
            <p className="mt-4 text-muted">
              {tr(
                l(
                  "两端数据自动汇合，实时呈现今日能量收支。无论减脂、增肌还是维持体重，都能清楚知道下一步该怎么做。",
                  "Both sides meet automatically to show today's energy balance in real time — whether you're cutting, building or maintaining, you'll know the next step."
                )
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              {[
                { icon: "sync", t: l("蓝牙自动同步", "Auto Bluetooth sync") },
                { icon: "shield", t: l("数据加密，仅你可见", "Encrypted, private to you") },
                { icon: "target", t: l("目标智能调整", "Adaptive goals") },
              ].map((x) => (
                <span key={x.t.en} className="flex items-center gap-2 rounded-full bg-canvas px-4 py-2 font-medium text-ink/75">
                  <Icon name={x.icon} className="h-4 w-4 text-teal-deep" />
                  {tr(x.t)}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl bg-canvas p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{tr(l("今日能量收支", "Today's energy balance"))}</p>
                <span className="rounded-full bg-white px-3 py-1 text-xs text-muted">{tr(l("截至 18:30", "As of 18:30"))}</span>
              </div>

              {[
                { label: l("摄入（App · AI 识餐）", "Intake (App · AI scan)"), v: intake, color: "bg-mint", parts: null },
                {
                  label: l("消耗（VK 戒指）", "Burn (VK ring)"),
                  v: burn,
                  color: "",
                  parts: [
                    { v: bmr, color: "bg-sky", label: l("基础代谢", "Basal") },
                    { v: active, color: "bg-heart", label: l("活动", "Active") },
                  ],
                },
              ].map((row) => (
                <div key={row.label.en} className="mt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">{tr(row.label)}</span>
                    <span className="font-bold tabular-nums">{row.v.toLocaleString()} kcal</span>
                  </div>
                  <div className="mt-2 flex h-4 overflow-hidden rounded-full bg-white">
                    {row.parts ? (
                      row.parts.map((p) => <div key={p.label.en} className={`h-full ${p.color}`} style={{ width: `${(p.v / max) * 100}%` }} />)
                    ) : (
                      <div className={`h-full rounded-full ${row.color}`} style={{ width: `${(row.v / max) * 100}%` }} />
                    )}
                  </div>
                  {row.parts && (
                    <div className="mt-2 flex gap-4 text-[11px] text-muted">
                      {row.parts.map((p) => (
                        <span key={p.label.en} className="flex items-center gap-1.5">
                          <span className={`h-2 w-2 rounded-full ${p.color}`} />
                          {tr(p.label)} {p.v.toLocaleString()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-white p-5">
                <div>
                  <p className="text-xs text-muted">{tr(l("能量缺口", "Energy deficit"))}</p>
                  <p className="whitespace-nowrap text-2xl font-extrabold tabular-nums text-teal-deep sm:text-3xl">{net.toLocaleString()} <span className="text-base">kcal</span></p>
                </div>
                <p className="max-w-[12rem] text-right text-xs leading-relaxed text-muted">
                  {tr(l("处于健康减脂区间，晚餐建议控制在 500 kcal 以内。", "In a healthy fat-loss range — aim to keep dinner under 500 kcal."))}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Products />
      <Vitals />
      <AiCalories />
      <EnergyBalance />
      <AppDownload />
      <ContactSection />
    </>
  );
}
