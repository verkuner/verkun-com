"use client";

import { l, useLang } from "@/lib/i18n";
import PhoneDemo from "@/components/PhoneDemo";
import AppDownload from "@/components/AppDownload";
import VitalsBoard from "@/components/VitalsBoard";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

const features = [
  { icon: "bowl", tone: "bg-mint-soft text-mint", t: l("中式菜肴深度优化", "Tuned for Chinese cuisine"), d: l("覆盖家常菜、面点、快餐与外卖常见菜品，一餐多菜同时识别。", "Home cooking, noodles, fast food and takeaway favourites — several dishes per photo.") },
  { icon: "target", tone: "bg-sky-soft text-sky", t: l("智能分量估算", "Smart portion estimates"), d: l("参照碗盘与餐具尺寸估算克重，结果可一键微调。", "Estimates grams using bowls and utensils as reference — adjust in one tap.") },
  { icon: "chart", tone: "bg-amber-soft text-amber", t: l("营养素拆解", "Macro breakdown"), d: l("热量、蛋白质、碳水、脂肪一目了然，并记入饮食日志。", "Calories, protein, carbs and fat at a glance, logged to your diary.") },
  { icon: "sync", tone: "bg-teal-soft text-teal-deep", t: l("与戒指数据联动", "Linked to your ring"), d: l("结合戒指测得的基础代谢与活动消耗，实时计算能量收支。", "Combines ring-measured basal and active burn into a live energy balance.") },
  { icon: "spark", tone: "bg-heart-soft text-heart", t: l("AI 饮食建议", "AI meal guidance"), d: l("根据目标（减脂、增肌、控糖）给出下一餐搭配建议。", "Next-meal suggestions tailored to your goal — cut, build or steady blood sugar.") },
  { icon: "shield", tone: "bg-sky-soft text-sky", t: l("隐私安全", "Private by design"), d: l("健康数据加密传输与存储，不经你同意绝不共享。", "Health data encrypted in transit and at rest — never shared without your consent.") },
];

export default function AppPage() {
  const { tr } = useLang();
  return (
    <>
      <section className="hero-glow pt-28 pb-20 sm:pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_auto]">
          <div className="reveal in-view">
            <p className="eyebrow">VERKUN Health App</p>
            <h1 className="mt-5 text-[2.5rem] font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
              {tr(l("吃进去的每一口，", "Every bite,"))}
              <br />
              <span className="text-mint">{tr(l("AI 都替你算清楚", "counted by AI"))}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {tr(
                l(
                  "拍照即识别菜品与分量，自动计算热量与营养素；再结合 VK 戒指的消耗数据，告诉你今天还能吃什么、该怎么吃。",
                  "Snap a photo to identify dishes and portions, with calories and macros calculated automatically. Add your VK ring's burn data and the app tells you what — and how — to eat next."
                )
              )}
            </p>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
              {[
                { v: l("≈1 秒", "≈1 s"), k: l("识别速度", "To result") },
                { v: l("4 项", "4"), k: l("核心营养素", "Core nutrients") },
                { v: l("一餐多菜", "Multi-dish"), k: l("同时识别", "Per photo") },
              ].map((s) => (
                <div key={s.k.en} className="card p-4 text-center">
                  <p className="text-lg font-extrabold leading-tight sm:text-xl">{tr(s.v)}</p>
                  <p className="mt-1 text-xs text-muted">{tr(s.k)}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">{tr(l("👉 点选右侧菜品，体验 AI 识餐演示", "👉 Pick a dish to try the AI scan demo"))}</p>
          </div>
          <PhoneDemo />
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{tr(l("功能亮点", "Features"))}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {tr(l("不止识别热量，更懂你的饮食", "More than calories — it understands how you eat"))}
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.t.en} delay={(i % 3) * 100}>
              <div className="card h-full p-7">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${f.tone}`}>
                  <Icon name={f.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{tr(f.t)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tr(f.d)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-graphite py-24 text-white">
        <div className="dot-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow !text-teal">{tr(l("健康数据看板", "Health dashboard"))}</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              {tr(l("连接 VK 戒指，看见完整的自己", "Pair a VK ring and see the whole picture"))}
            </h2>
            <p className="mt-4 text-white/60">
              {tr(l("心率、血氧、睡眠、压力与活动，与饮食数据汇聚在同一个看板。", "Heart rate, SpO₂, sleep, stress and activity — together with your meals, on one dashboard."))}
            </p>
          </Reveal>
          <div className="mt-12">
            <VitalsBoard />
          </div>
          <p className="mt-6 text-xs text-white/35">{tr(l("* 界面数据为示意。", "* Figures shown are illustrative."))}</p>
        </div>
      </section>

      <div className="py-24">
        <AppDownload />
      </div>

      <section className="mx-auto max-w-3xl px-5 pb-24 text-center sm:px-8">
        <Icon name="shield" className="mx-auto h-8 w-8 text-teal" />
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {tr(
            l(
              "AI 热量识别结果为基于图像的估算，可能与实际存在偏差，建议作为饮食管理参考。如有特殊饮食或疾病管理需求，请遵循医生或注册营养师的指导。",
              "AI calorie results are image-based estimates and may differ from actual values — use them as a guide. For special diets or medical conditions, follow the advice of your doctor or a registered dietitian."
            )
          )}
        </p>
      </section>
    </>
  );
}
