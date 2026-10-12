"use client";

import { l, useLang } from "@/lib/i18n";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function EnergyBalance() {
  const { tr } = useLang();
  const intake = 1480;
  const bmr = 1618;
  const active = 512;
  const burn = bmr + active;
  const net = intake - burn;
  const max = burn;
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
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
