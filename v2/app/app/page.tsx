"use client";

import Link from "next/link";
import { l, useLang, type L } from "@/lib/i18n";
import AppDashboardPhone from "@/components/AppDashboardPhone";
import PhoneDemo from "@/components/PhoneDemo";
import AppDownload from "@/components/AppDownload";
import VitalsBoard from "@/components/VitalsBoard";
import EnergyBalance from "@/components/EnergyBalance";
import HealthDeviceNote from "@/components/HealthDeviceNote";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { useHashScroll } from "@/lib/useHashScroll";

const sections = [
  { id: "vitals", label: l("体征看板", "Vitals") },
  { id: "sleep", label: l("睡眠与恢复", "Sleep & recovery") },
  { id: "nutrition", label: l("AI 饮食识别", "AI nutrition") },
  { id: "energy", label: l("能量收支", "Energy balance") },
  { id: "reports", label: l("建议与报告", "Guidance & reports") },
];

function SectionHead({ eyebrow, title, desc, dark = false }: { eyebrow: L; title: L; desc: L; dark?: boolean }) {
  const { tr } = useLang();
  return (
    <Reveal className="max-w-2xl">
      <p className={`eyebrow ${dark ? "!text-teal" : ""}`}>{tr(eyebrow)}</p>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{tr(title)}</h2>
      <p className={`mt-4 ${dark ? "text-white/60" : "text-muted"}`}>{tr(desc)}</p>
    </Reveal>
  );
}

// 7 nights: hours slept / HRV (ms). Illustrative.
const WEEK = [
  { d: l("一", "M"), h: 6.8, hrv: 49 },
  { d: l("二", "T"), h: 7.2, hrv: 52 },
  { d: l("三", "W"), h: 6.1, hrv: 44 },
  { d: l("四", "T"), h: 7.6, hrv: 55 },
  { d: l("五", "F"), h: 7.0, hrv: 51 },
  { d: l("六", "S"), h: 8.1, hrv: 60 },
  { d: l("日", "S"), h: 7.7, hrv: 58 },
];
const HRV_BASELINE = 52;

function SleepRecovery() {
  const { tr } = useLang();
  return (
    <section id="sleep" className="mx-auto max-w-7xl scroll-mt-32 px-5 py-24 sm:px-8">
      <SectionHead
        eyebrow={l("睡眠与恢复", "Sleep & recovery")}
        title={l("睡得好不好、恢复得够不够，数据说了算", "Know how you slept — and whether you've recovered")}
        desc={l(
          "App 根据设备记录的睡眠分期、心率与 HRV，给出睡眠评分和每日恢复状态，并以你自己的基线为参照。",
          "From the sleep stages, heart rate and HRV your device records, the app scores your sleep and daily recovery — measured against your own baseline."
        )}
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="card h-full p-7">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 font-bold">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-soft text-sky">
                  <Icon name="sleep" className="h-4.5 w-4.5" />
                </span>
                {tr(l("睡眠时长 · 近 7 天", "Sleep · last 7 nights"))}
              </p>
              <span className="text-sm text-muted">{tr(l("平均 7h 13m", "Avg 7h 13m"))}</span>
            </div>
            <div className="mt-8 flex h-48 gap-3">
              {WEEK.map((w, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center gap-2">
                  <div className="relative w-full flex-1">
                    <div className="absolute inset-x-0 bottom-0 rounded-t-lg bg-gradient-to-t from-sky to-[#7cc4ff]" style={{ height: `${(w.h / 9) * 100}%` }}>
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[11px] font-semibold tabular-nums text-muted">{w.h}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted">{tr(w.d)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { v: "88", k: l("睡眠评分", "Sleep score") },
                { v: "21%", k: l("深睡占比", "Deep sleep") },
                { v: "23:40", k: l("平均入睡", "Avg bedtime") },
              ].map((s) => (
                <div key={s.k.en} className="rounded-2xl bg-canvas py-3">
                  <p className="text-lg font-extrabold tabular-nums">{s.v}</p>
                  <p className="text-[11px] text-muted">{tr(s.k)}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="card h-full p-7">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 font-bold">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint-soft text-mint">
                  <Icon name="stress" className="h-4.5 w-4.5" />
                </span>
                {tr(l("HRV 与恢复 · 近 7 天", "HRV & recovery · 7 days"))}
              </p>
              <span className="text-sm text-muted">{tr(l(`基线 ${HRV_BASELINE} ms`, `Baseline ${HRV_BASELINE} ms`))}</span>
            </div>
            <div className="mt-8 flex h-48 gap-3">
              {WEEK.map((w, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center gap-2">
                  <div className="relative w-full flex-1">
                    <div
                      className={`absolute inset-x-0 bottom-0 rounded-t-lg ${w.hrv >= HRV_BASELINE ? "bg-mint" : "bg-amber"}`}
                      style={{ height: `${(w.hrv / 70) * 100}%` }}
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[11px] font-semibold tabular-nums text-muted">{w.hrv}</span>
                    </div>
                    <div className="absolute -inset-x-1.5 border-t-2 border-dashed border-ink/25" style={{ bottom: `${(HRV_BASELINE / 70) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted">{tr(w.d)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3 rounded-2xl bg-mint-soft p-4">
              <Icon name="spark" className="h-5 w-5 shrink-0 text-mint" />
              <p className="text-sm leading-relaxed text-ink/75">
                {tr(
                  l(
                    "周三 HRV 低于基线、睡眠不足 6.5 小时，恢复偏弱；周末作息规律后明显回升。保持 23:30 前入睡，有助于维持良好恢复。",
                    "On Wednesday HRV dipped below baseline after under 6.5 h of sleep; it rebounded with a regular weekend routine. Lights-out before 23:30 helps keep recovery strong."
                  )
                )}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Reports() {
  const { tr } = useLang();
  const cards = [
    {
      icon: "spark",
      tone: "bg-teal-soft text-teal-deep",
      t: l("每日 AI 健康建议", "Daily AI guidance"),
      d: l("每天早上结合睡眠、恢复与昨日饮食，给出今天的运动强度与饮食建议。", "Every morning, sleep, recovery and yesterday's meals become today's activity and eating advice."),
    },
    {
      icon: "chart",
      tone: "bg-sky-soft text-sky",
      t: l("健康周报 / 月报", "Weekly & monthly reports"),
      d: l("自动汇总体征、睡眠、活动与饮食趋势，看见习惯带来的变化。", "Vitals, sleep, activity and nutrition trends summarised automatically, so you see what your habits change."),
    },
    {
      icon: "target",
      tone: "bg-mint-soft text-mint",
      t: l("目标与提醒", "Goals & reminders"),
      d: l("设定睡眠、步数与饮食目标，适时提醒久坐、作息与记录饮食。", "Set sleep, step and nutrition goals, with timely nudges to move, wind down and log meals."),
    },
    {
      icon: "shield",
      tone: "bg-heart-soft text-heart",
      t: l("隐私与数据安全", "Privacy & security"),
      d: l("健康数据加密传输与存储，可随时导出或删除，未经同意绝不共享。", "Health data is encrypted in transit and at rest, can be exported or deleted anytime, and is never shared without consent."),
    },
  ];
  return (
    <section id="reports" className="mx-auto max-w-7xl scroll-mt-32 px-5 py-24 sm:px-8">
      <SectionHead
        eyebrow={l("建议与报告", "Guidance & reports")}
        title={l("让数据变成习惯", "Turn data into habits")}
        desc={l(
          "知道数字只是开始。VERKUN Health 用建议、报告和提醒，帮你把健康目标落实到每一天。",
          "Knowing the numbers is just the start. VERKUN Health uses guidance, reports and reminders to turn goals into daily habits."
        )}
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <Reveal key={c.t.en} delay={i * 90}>
            <div className="card h-full p-6">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${c.tone}`}>
                <Icon name={c.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-bold">{tr(c.t)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tr(c.d)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function AppPage() {
  const { tr } = useLang();
  useHashScroll();
  return (
    <>
      <section className="hero-glow pt-28 pb-16 sm:pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_auto]">
          <div className="reveal in-view">
            <p className="eyebrow">VERKUN Health App</p>
            <h1 className="mt-5 text-[2.5rem] font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
              {tr(l("你的健康，", "Your health,"))}
              <br />
              <span className="text-teal-deep">{tr(l("有真实数据可依", "backed by real data"))}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {tr(
                l(
                  "连接 VERKUN 智能设备，App 持续接收你的心率、血氧、睡眠、HRV 与活动数据；拍照记录饮食，AI 计算热量与营养。所有数据汇聚成一张清晰的健康全景图，并告诉你下一步怎么做。",
                  "Pair a VERKUN device and the app continuously receives your heart rate, SpO₂, sleep, HRV and activity; snap your meals and AI works out calories and nutrients. It all comes together in one clear picture of your health — with your next step."
                )
              )}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#download" className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-7 py-3.5 font-semibold text-white hover:bg-teal-deep">
                {tr(l("下载 App", "Get the App"))}
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/devices" className="rounded-full border border-line bg-white px-7 py-3.5 text-center font-semibold hover:border-teal">
                {tr(l("查看支持的设备", "Supported devices"))}
              </Link>
            </div>
          </div>
          <AppDashboardPhone className="mx-auto" />
        </div>
      </section>

      {/* in-page feature nav */}
      <div className="sticky top-16 z-40 border-y border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 sm:px-8">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink/70 transition-colors hover:border-teal hover:text-teal-deep">
              {tr(s.label)}
            </a>
          ))}
        </div>
      </div>

      <section id="vitals" className="relative scroll-mt-32 overflow-hidden bg-graphite py-24 text-white">
        <div className="dot-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead
            dark
            eyebrow={l("体征看板", "Vitals dashboard")}
            title={l("真实体征，一屏看全", "All your real vitals on one screen")}
            desc={l(
              "心率、血氧、睡眠、HRV、皮肤温度与活动，由设备全天候记录，按日、周、月查看趋势。",
              "Heart rate, SpO₂, sleep, HRV, skin temperature and activity, recorded around the clock by your device — view trends by day, week or month."
            )}
          />
          <div className="mt-12">
            <VitalsBoard />
          </div>
          <p className="mt-6 text-xs text-white/35">{tr(l("* 界面数据为示意。", "* Figures shown are illustrative."))}</p>
        </div>
      </section>

      <SleepRecovery />

      <section id="nutrition" className="scroll-mt-32 border-y border-line bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionHead
              eyebrow={l("AI 饮食热量识别", "AI calorie recognition")}
              title={l("吃进去的每一口，AI 帮你算清楚", "Every bite, counted by AI")}
              desc={l(
                "拍照即可识别菜品与分量，自动计算热量与蛋白质、碳水、脂肪，记入饮食日志。针对中式菜肴优化，一餐多菜也能同时识别。",
                "Snap a photo to identify dishes and portions; calories, protein, carbs and fat are logged automatically. Tuned for Chinese cuisine, with several dishes per photo."
              )}
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { icon: "bowl", t: l("家常菜、面点、外卖都能识别", "Home cooking, noodles, takeaway") },
                { icon: "target", t: l("参照餐具估算分量，可一键微调", "Portions from tableware cues, adjustable") },
                { icon: "chart", t: l("热量与三大营养素拆解", "Calories plus three macros") },
                { icon: "sync", t: l("与设备消耗数据联动", "Linked to your device's burn data") },
              ].map((x) => (
                <li key={x.t.en} className="flex items-center gap-3 rounded-2xl bg-canvas p-3 text-sm">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-mint">
                    <Icon name={x.icon} className="h-4.5 w-4.5" />
                  </span>
                  {tr(x.t)}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">{tr(l("👉 点选菜品，体验 AI 识餐演示", "👉 Pick a dish to try the AI scan demo"))}</p>
          </div>
          <PhoneDemo />
        </div>
      </section>

      <div id="energy" className="scroll-mt-32 pt-12">
        <EnergyBalance />
      </div>

      <Reports />

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <HealthDeviceNote />
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-muted">
          {tr(
            l(
              "AI 热量识别结果为基于图像的估算，可能与实际存在偏差，建议作为饮食管理参考。如有特殊饮食需求，请遵循医生或注册营养师的指导。",
              "AI calorie results are image-based estimates and may differ from actual values — use them as a guide. For special dietary needs, follow the advice of your doctor or a registered dietitian."
            )
          )}
        </p>
      </section>

      <div className="pb-24">
        <AppDownload />
      </div>
    </>
  );
}
