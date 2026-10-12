"use client";

import { l, useLang } from "@/lib/i18n";
import Icon from "./Icon";
import PhoneFrame from "./PhoneFrame";

function ScoreRing({ value }: { value: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 76 76" className="h-[76px] w-[76px] -rotate-90" aria-hidden>
      <circle cx="38" cy="38" r={r} fill="none" stroke="#e6eff1" strokeWidth="7" />
      <circle
        cx="38"
        cy="38"
        r={r}
        fill="none"
        stroke="url(#score)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={`${(c * value) / 100} ${c}`}
      />
      <defs>
        <linearGradient id="score" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0fb5a6" />
          <stop offset="1" stopColor="#2f80ed" />
        </linearGradient>
      </defs>
    </svg>
  );
}

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

export default function AppDashboardPhone({ className = "" }: { className?: string }) {
  const { tr } = useLang();

  const vitals = [
    { icon: "heart", tone: "bg-heart-soft text-heart", k: l("静息心率", "Resting HR"), v: "62", u: "bpm", c: "#ff5d6c", p: [66, 64, 65, 63, 62, 63, 62] },
    { icon: "o2", tone: "bg-teal-soft text-teal-deep", k: l("夜间血氧", "Night SpO₂"), v: "98", u: "%", c: "#0fb5a6", p: [97, 98, 97, 98, 98, 97, 98] },
    { icon: "stress", tone: "bg-mint-soft text-mint", k: l("HRV", "HRV"), v: "58", u: "ms", c: "#22b573", p: [49, 52, 55, 51, 56, 57, 58] },
    { icon: "temp", tone: "bg-amber-soft text-amber", k: l("皮肤温度", "Skin temp"), v: "+0.2", u: "°C", c: "#f5a524", p: [0.1, 0, 0.2, 0.1, 0.3, 0.1, 0.2] },
  ];

  const sub = [
    { k: l("睡眠", "Sleep"), v: 88, c: "bg-sky" },
    { k: l("恢复", "Recovery"), v: 76, c: "bg-mint" },
    { k: l("活动", "Activity"), v: 84, c: "bg-heart" },
  ];

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

      {/* health score */}
      <div className="mx-4 rounded-3xl bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <ScoreRing value={82} />
            <span className="absolute inset-0 grid place-items-center text-xl font-extrabold">82</span>
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-muted">{tr(l("今日身体状态", "Today's readiness"))}</p>
            <p className="text-sm font-bold text-teal-deep">{tr(l("良好 · 适合中等强度运动", "Good · ready for moderate effort"))}</p>
            <div className="mt-2 space-y-1">
              {sub.map((s) => (
                <div key={s.k.en} className="flex items-center gap-2 text-[10px]">
                  <span className="w-7 text-muted">{tr(s.k)}</span>
                  <span className="h-1 flex-1 overflow-hidden rounded-full bg-canvas">
                    <span className={`block h-full rounded-full ${s.c}`} style={{ width: `${s.v}%` }} />
                  </span>
                  <span className="w-5 text-right font-semibold tabular-nums">{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* vitals */}
      <div className="mx-4 mt-2 rounded-3xl bg-white px-4 py-2">
        {vitals.map((v) => (
          <div key={v.k.en} className="flex items-center gap-3 border-b border-line py-2 last:border-b-0">
            <span className={`grid h-7 w-7 place-items-center rounded-xl ${v.tone}`}>
              <Icon name={v.icon} className="h-3.5 w-3.5" />
            </span>
            <span className="flex-1 text-[11px] text-muted">{tr(v.k)}</span>
            <Spark points={v.p} color={v.c} />
            <span className="w-14 text-right text-sm font-bold tabular-nums">
              {v.v}
              <span className="ml-0.5 text-[10px] font-medium text-muted">{v.u}</span>
            </span>
          </div>
        ))}
      </div>

      {/* AI suggestion */}
      <div className="mx-4 mt-2 flex gap-2 rounded-2xl bg-teal-soft p-3">
        <Icon name="spark" className="h-4 w-4 shrink-0 text-teal-deep" />
        <p className="text-[11px] leading-snug text-teal-deep">
          {tr(
            l(
              "昨晚深睡充足，HRV 高于基线。今天适合 30 分钟有氧；目前能量缺口 650 kcal，晚餐建议 500 kcal 以内。",
              "Plenty of deep sleep and HRV above baseline — good day for 30 min of cardio. You're 650 kcal under; keep dinner below 500 kcal."
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
