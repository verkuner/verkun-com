"use client";

import { useEffect, useRef, useState } from "react";
import { l, useLang, type L } from "@/lib/i18n";
import { calories, scores } from "./ScoreBoard";

type Axis = { key: string; name: L; value: number; display: string; color: string };

/** The six Health Radar axes: four scores plus progress toward the two calorie goals. */
function useAxes(): Axis[] {
  const s = Object.fromEntries(scores.map((x) => [x.key, x]));
  const c = Object.fromEntries(calories.map((x) => [x.key, x]));
  const pct = (k: "burn" | "intake") => Math.round((c[k].value / c[k].goal) * 100);
  return [
    { key: "energy", name: s.energy.name, value: s.energy.value, display: String(s.energy.value), color: s.energy.color },
    { key: "sleep", name: s.sleep.name, value: s.sleep.value, display: String(s.sleep.value), color: s.sleep.color },
    { key: "activity", name: s.activity.name, value: s.activity.value, display: String(s.activity.value), color: s.activity.color },
    { key: "burn", name: c.burn.name, value: pct("burn"), display: `${pct("burn")}%`, color: c.burn.color },
    { key: "intake", name: c.intake.name, value: pct("intake"), display: `${pct("intake")}%`, color: c.intake.color },
    { key: "heart", name: s.heart.name, value: s.heart.value, display: String(s.heart.value), color: s.heart.color },
  ];
}

export function RadarChart({ className = "" }: { className?: string }) {
  const { tr } = useLang();
  const axes = useAxes();
  const ref = useRef<SVGSVGElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const size = 360;
  const c = size / 2;
  const R = 118;
  const pt = (i: number, r: number) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;
    return [c + r * Math.cos(a), c + r * Math.sin(a)] as const;
  };
  const ring = (f: number) => axes.map((_, i) => pt(i, R * f).join(",")).join(" ");
  const shape = axes.map((a, i) => pt(i, (R * Math.min(a.value, 100)) / 100).join(",")).join(" ");

  return (
    <svg ref={ref} viewBox={`0 0 ${size} ${size}`} className={className} role="img" aria-label={tr(l("健康雷达图", "Health Radar chart"))}>
      <defs>
        <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0fb5a6" stopOpacity="0.45" />
          <stop offset="1" stopColor="#2f80ed" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={ring(f)} fill={f === 1 ? "#f2f7f8" : "none"} stroke="#0f2230" strokeOpacity={f === 1 ? 0.12 : 0.07} />
      ))}
      {axes.map((_, i) => {
        const [x, y] = pt(i, R);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="#0f2230" strokeOpacity="0.07" />;
      })}

      <g
        style={{
          transformOrigin: `${c}px ${c}px`,
          transform: shown ? "scale(1)" : "scale(0.2)",
          opacity: shown ? 1 : 0,
          transition: "transform 900ms cubic-bezier(0.22,1,0.36,1), opacity 600ms ease",
        }}
      >
        <polygon points={shape} fill="url(#radarFill)" stroke="#0fb5a6" strokeWidth="2.5" strokeLinejoin="round" />
        {axes.map((a, i) => {
          const [x, y] = pt(i, (R * Math.min(a.value, 100)) / 100);
          return <circle key={a.key} cx={x} cy={y} r="5.5" fill={a.color} stroke="#fff" strokeWidth="2.5" />;
        })}
      </g>

      {axes.map((a, i) => {
        const [x, y] = pt(i, R + 34);
        return (
          <g key={a.key}>
            <text x={x} y={y - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f2230">
              {tr(a.name)}
            </text>
            <text x={x} y={y + 13} textAnchor="middle" fontSize="13" fontWeight="800" fill={a.color}>
              {a.display}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Health Radar as shown in the VERKUN app: the radar plus a one-line reading of it. */
export default function RadarCard({ className = "" }: { className?: string }) {
  const { tr } = useLang();
  const strongest = [...scores].sort((a, b) => b.value - a.value)[0];
  const weakest = [...scores].sort((a, b) => a.value - b.value)[0];
  return (
    <div className={`card p-6 sm:p-8 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="font-bold">{tr(l("健康雷达 · 今日", "Health Radar · Today"))}</p>
        <span className="rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-teal-deep">{tr(l("凡鲲 App", "VERKUN App"))}</span>
      </div>
      <RadarChart className="mx-auto mt-2 w-full max-w-[380px]" />
      <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-mint-soft p-3">
          <p className="text-xs text-muted">{tr(l("表现最好", "Strongest"))}</p>
          <p className="font-bold text-mint">
            {tr(strongest.name)} {strongest.value}
          </p>
        </div>
        <div className="rounded-2xl bg-amber-soft p-3">
          <p className="text-xs text-muted">{tr(l("今天多留意", "Needs attention"))}</p>
          <p className="font-bold text-amber">
            {tr(weakest.name)} {weakest.value}
          </p>
        </div>
      </div>
    </div>
  );
}
