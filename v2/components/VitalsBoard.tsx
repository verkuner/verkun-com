"use client";

import { l, useLang, type L } from "@/lib/i18n";
import Icon from "./Icon";
import Reveal from "./Reveal";

// Illustrative 24h resting-heart-rate curve (bpm), one point per hour.
const HR = [58, 56, 55, 54, 55, 57, 63, 72, 78, 74, 70, 76, 81, 77, 72, 75, 88, 96, 84, 76, 70, 66, 62, 60];

// Sleep hypnogram: 0 awake · 1 REM · 2 light · 3 deep (one entry ≈ 20 min).
const SLEEP = [0, 2, 2, 3, 3, 3, 2, 2, 1, 1, 2, 3, 3, 2, 2, 1, 1, 1, 2, 2, 3, 2, 1, 1, 2, 0];
const STAGE_COLOR = ["#ff9a8b", "#7cc4ff", "#3aa0ff", "#1b5fd6"];

function HrChart() {
  const w = 300;
  const h = 96;
  const min = 50;
  const max = 100;
  const pts = HR.map((v, i) => [(i / (HR.length - 1)) * w, h - ((v - min) / (max - min)) * h] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h + 6}`} className="mt-4 h-28 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="hrfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff5d6c" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ff5d6c" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="#fff" strokeOpacity="0.07" />
      ))}
      <path d={`${line} L${w},${h} L0,${h} Z`} fill="url(#hrfill)" />
      <path d={line} fill="none" stroke="#ff5d6c" strokeWidth="2.2" strokeLinejoin="round" className="ecg-trace" />
    </svg>
  );
}

function SleepChart() {
  const w = 300;
  const rowH = 18;
  const step = w / SLEEP.length;
  return (
    <svg viewBox={`0 0 ${w} ${rowH * 4}`} className="mt-4 h-24 w-full" preserveAspectRatio="none" aria-hidden>
      {SLEEP.map((s, i) => (
        <rect key={i} x={i * step + 0.5} y={s * rowH + 3} width={step - 1} height={rowH - 6} rx="3" fill={STAGE_COLOR[s]} />
      ))}
    </svg>
  );
}

function Gauge({ value }: { value: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const arc = c * 0.75;
  const pct = (value - 85) / 15; // map 85–100% onto the arc
  return (
    <svg viewBox="0 0 110 110" className="h-32 w-32" aria-hidden>
      <g transform="rotate(135 55 55)">
        <circle cx="55" cy="55" r={r} fill="none" stroke="#fff" strokeOpacity="0.1" strokeWidth="9" strokeDasharray={`${arc} ${c}`} strokeLinecap="round" />
        <circle cx="55" cy="55" r={r} fill="none" stroke="#0fb5a6" strokeWidth="9" strokeDasharray={`${arc * pct} ${c}`} strokeLinecap="round" />
      </g>
      <text x="55" y="58" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="800">{value}%</text>
      <text x="55" y="76" textAnchor="middle" fill="#fff" fillOpacity="0.5" fontSize="9">SpO₂</text>
    </svg>
  );
}

function Tile({
  icon,
  tone,
  label,
  value,
  unit,
  note,
  children,
  className = "",
}: {
  icon: string;
  tone: string;
  label: L;
  value: string;
  unit?: string;
  note?: L;
  children?: React.ReactNode;
  className?: string;
}) {
  const { tr } = useLang();
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur ${className}`}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-white/65">
          <span className={`grid h-8 w-8 place-items-center rounded-full ${tone}`}>
            <Icon name={icon} className="h-4 w-4" />
          </span>
          {tr(label)}
        </span>
        {note && <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/60">{tr(note)}</span>}
      </div>
      {value && (
        <p className="mt-4 text-4xl font-extrabold tracking-tight tabular-nums">
          {value}
          {unit && <span className="ml-1.5 text-base font-semibold text-white/50">{unit}</span>}
        </p>
      )}
      {children}
    </div>
  );
}

export default function VitalsBoard() {
  const { tr } = useLang();
  return (
    <div className="grid gap-4 md:grid-cols-6">
      <Reveal className="md:col-span-4">
        <Tile icon="heart" tone="bg-heart/15 text-heart" label={l("心率 · 24 小时", "Heart rate · 24h")} value="62" unit="bpm" note={l("静息心率", "Resting")} className="h-full">
          <HrChart />
          <div className="mt-1 flex justify-between text-[11px] text-white/35">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
          </div>
        </Tile>
      </Reveal>

      <Reveal delay={100} className="md:col-span-2">
        <Tile icon="o2" tone="bg-teal/15 text-teal" label={l("血氧饱和度", "Blood oxygen")} value="" note={l("夜间平均", "Night avg")} className="h-full">
          <div className="mt-3 flex justify-center">
            <Gauge value={98} />
          </div>
        </Tile>
      </Reveal>

      <Reveal className="md:col-span-3">
        <Tile icon="sleep" tone="bg-sky/15 text-sky" label={l("睡眠", "Sleep")} value="7h 42m" note={l("睡眠评分 88", "Score 88")} className="h-full">
          <SleepChart />
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/55">
            {[l("清醒", "Awake"), l("REM", "REM"), l("浅睡", "Light"), l("深睡", "Deep")].map((s, i) => (
              <span key={s.en} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: STAGE_COLOR[i] }} />
                {tr(s)}
              </span>
            ))}
          </div>
        </Tile>
      </Reveal>

      <Reveal delay={100} className="md:col-span-3">
        <div className="grid h-full grid-cols-2 gap-4">
          <Tile icon="stress" tone="bg-mint/15 text-mint" label={l("HRV", "HRV")} value="58" unit="ms" note={l("压力 低", "Low stress")} />
          <Tile icon="temp" tone="bg-amber/15 text-amber" label={l("皮肤温度", "Skin temp")} value="+0.2" unit="°C" note={l("较基线", "vs base")} />
          <Tile icon="steps" tone="bg-sky/15 text-sky" label={l("步数", "Steps")} value="8,420" note={l("目标 84%", "84% goal")} />
          <Tile icon="run" tone="bg-heart/15 text-heart" label={l("活动消耗", "Active burn")} value="512" unit="kcal" />
        </div>
      </Reveal>
    </div>
  );
}
