"use client";

import { l, useLang } from "@/lib/i18n";
import Icon from "./Icon";
import PhoneFrame from "./PhoneFrame";
import { ScoreGauge, calories, scores } from "./ScoreBoard";

function Spark({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map((v, i) => `${i ? "L" : "M"}${(i / (points.length - 1)) * 48},${16 - ((v - min) / (max - min || 1)) * 14}`)
    .join(" ");
  return (
    <svg viewBox="0 0 48 18" className="h-4 w-12" aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** VERKUN app "Today" screen: the Readiness score up top, then Sleep, Activity and Heart. */
export default function AppDashboardPhone({ className = "" }: { className?: string }) {
  const { tr } = useLang();
  const [energy, ...rest] = scores;

  return (
    <PhoneFrame className={className}>
      <div className="px-5 pt-2 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-muted">{tr(l("10月12日 周一", "Mon, Oct 12"))}</p>
            <p className="text-base font-bold">{tr(l("早上好 👋", "Good morning 👋"))}</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-teal-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            VK100 {tr(l("已同步", "synced"))}
          </span>
        </div>
      </div>

      {/* Energy */}
      <div className="mx-4 flex items-center gap-4 rounded-3xl bg-white p-4">
        <ScoreGauge value={energy.value} color={energy.color} size={84} stroke={8} labelClass="text-2xl" />
        <div>
          <p className="text-[11px] text-muted">{tr(l("今日体能", "Today's readiness"))}</p>
          <p className="text-base font-extrabold" style={{ color: energy.color }}>
            {tr(energy.status)}
          </p>
          <p className="mt-1 text-[11px] leading-snug text-ink/70">{tr(energy.tip)}</p>
        </div>
      </div>

      {/* Sleep / Activity / Heart */}
      <div className="mx-4 mt-2 rounded-3xl bg-white px-4 py-1.5">
        {rest.map((s) => (
          <div key={s.key} className="flex items-center gap-3 border-b border-line py-2.5 last:border-b-0">
            <ScoreGauge value={s.value} color={s.color} size={38} stroke={4} labelClass="text-[11px]" />
            <span className="flex-1">
              <span className="block text-xs font-bold">{tr(s.name)}</span>
              <span className="block text-[10px] font-semibold" style={{ color: s.color }}>
                {tr(s.status)}
              </span>
            </span>
            <Spark points={s.week} color={s.color} />
          </div>
        ))}
      </div>

      {/* calories burned / eaten */}
      <div className="mx-4 mt-2 grid grid-cols-2 gap-2">
        {calories.map((c) => (
          <div key={c.key} className="rounded-2xl bg-white p-2.5">
            <p className="flex items-center gap-1 text-[10px] text-muted">
              <Icon name={c.icon} className="h-3 w-3" />
              {tr(c.name)}
            </p>
            <p className="text-base font-extrabold tabular-nums" style={{ color: c.color }}>
              {c.value.toLocaleString()}
              <span className="ml-0.5 text-[10px] font-semibold text-muted">kcal</span>
            </p>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-canvas">
              <div className="h-full rounded-full" style={{ width: `${(c.value / c.goal) * 100}%`, background: c.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* AI suggestion */}
      <div className="mx-4 mt-2 flex gap-2 rounded-2xl bg-teal-soft p-3">
        <Icon name="spark" className="h-4 w-4 shrink-0 text-teal-deep" />
        <p className="text-[11px] leading-snug text-teal-deep">
          {tr(
            l(
              "昨晚睡得很好，体能充沛。今天适合 30 分钟有氧；再走 2,000 步就能完成活动目标，晚餐建议 500 kcal 以内。",
              "You slept well and you're ready to go. Good day for 30 min of cardio; 2,000 more steps hits your activity goal — keep dinner under 500 kcal."
            )
          )}
        </p>
      </div>

      {/* tab bar */}
      <div className="mt-3 grid grid-cols-4 border-t border-line bg-white px-2 pt-2 pb-4 text-center text-[10px]">
        {[
          { icon: "target", k: l("今日", "Today"), on: true },
          { icon: "bowl", k: l("饮食", "Meals") },
          { icon: "chart", k: l("趋势", "Trends") },
          { icon: "sync", k: l("设备", "Devices") },
        ].map((t) => (
          <span key={t.k.en} className={`flex flex-col items-center gap-0.5 ${t.on ? "font-semibold text-teal-deep" : "text-muted"}`}>
            <Icon name={t.icon} className="h-4 w-4" />
            {tr(t.k)}
          </span>
        ))}
      </div>
    </PhoneFrame>
  );
}
