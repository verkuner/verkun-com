"use client";

import { l, useLang, type L } from "@/lib/i18n";
import Icon from "./Icon";
import Reveal from "./Reveal";

export type Score = {
  key: string;
  icon: string;
  color: string;
  tone: string;
  name: L;
  value: number;
  status: L;
  what: L;
  tip: L;
  week: number[]; // last 7 days, oldest first
};

/** The four everyday scores the VERKUN app uses to describe how your body is doing. Illustrative values. */
export const scores: Score[] = [
  {
    key: "energy",
    icon: "spark",
    color: "#0fb5a6",
    tone: "bg-teal-soft text-teal-deep",
    name: l("体能", "Readiness"),
    value: 82,
    status: l("状态充沛", "Ready to go"),
    what: l("综合昨晚的睡眠与身体的恢复情况，告诉你今天的身体能量是否充足。", "Combines last night's sleep and how well you've recovered to show how ready your body is today."),
    tip: l("适合 30 分钟中等强度运动", "Good day for 30 min of moderate exercise"),
    week: [70, 74, 66, 72, 78, 80, 82],
  },
  {
    key: "sleep",
    icon: "sleep",
    color: "#2f80ed",
    tone: "bg-sky-soft text-sky",
    name: l("睡眠", "Sleep"),
    value: 88,
    status: l("睡得很好", "Slept well"),
    what: l("不只看睡了多久，还看睡得深不深、作息规律不规律。", "Not just how long you slept — how deeply, and how regular your bedtime is."),
    tip: l("保持 23:30 前入睡", "Keep lights-out before 23:30"),
    week: [76, 81, 70, 84, 79, 86, 88],
  },
  {
    key: "activity",
    icon: "run",
    color: "#f5a524",
    tone: "bg-amber-soft text-amber",
    name: l("活动", "Activity"),
    value: 76,
    status: l("还差一点", "Almost there"),
    what: l("综合步数、运动和久坐情况，看看你今天动得够不够。", "Steps, workouts and time sitting still — are you moving enough today?"),
    tip: l("再走 2,000 步就能达标", "2,000 more steps to hit your goal"),
    week: [68, 72, 80, 74, 70, 78, 76],
  },
  {
    key: "heart",
    icon: "heart",
    color: "#ff5d6c",
    tone: "bg-heart-soft text-heart",
    name: l("心率", "Heart"),
    value: 90,
    status: l("平稳", "Steady"),
    what: l("看全天与安静时的心率是否处在你自己的正常范围内。", "Whether your heart rate through the day and at rest sits within your own normal range."),
    tip: l("心率平稳，继续保持", "Nice and steady — keep it up"),
    week: [86, 88, 84, 87, 89, 90, 90],
  },
];

export function ScoreGauge({
  value,
  color,
  size = 96,
  stroke = 9,
  track = "#e6eff1",
  label,
  labelClass = "",
}: {
  value: number;
  color: string;
  size?: number;
  stroke?: number;
  track?: string;
  label?: string;
  labelClass?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${(c * value) / 100} ${c}`}
        />
      </svg>
      <span className={`relative font-extrabold tabular-nums ${labelClass}`}>{label ?? value}</span>
    </span>
  );
}

export type Calorie = {
  key: "burn" | "intake";
  icon: string;
  color: string;
  tone: string;
  name: L;
  value: number;
  goal: number;
  goalLabel: L;
  source: L;
  what: L;
};

/** The two calorie figures: burned through activity (ring) and eaten (AI food photos). Illustrative values. */
export const calories: Calorie[] = [
  {
    key: "burn",
    icon: "run",
    color: "#ff5d6c",
    tone: "bg-heart-soft text-heart",
    name: l("活动消耗", "Calories burned"),
    value: 512,
    goal: 600,
    goalLabel: l("目标", "Goal"),
    source: l("戒指自动记录", "Tracked by your ring"),
    what: l("走路、运动、日常活动消耗了多少热量，戒指全天自动记录，不用手动输入。", "Every walk, workout and daily movement is counted automatically by your ring — nothing to log."),
  },
  {
    key: "intake",
    icon: "bowl",
    color: "#22b573",
    tone: "bg-mint-soft text-mint",
    name: l("食物摄入", "Calories eaten"),
    value: 1480,
    goal: 1800,
    goalLabel: l("建议", "Target"),
    source: l("拍照 AI 识别", "AI photo recognition"),
    what: l("每餐拍一张照片，AI 识别菜品与分量，算出吃进去多少热量。", "Snap each meal; AI recognises the dishes and portions and works out what you ate."),
  },
];

/** The two calorie figures with progress toward the daily goal. */
export function CaloriePair({ dark = false, detailed = false }: { dark?: boolean; detailed?: boolean }) {
  const { tr } = useLang();
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {calories.map((c, i) => (
        <Reveal key={c.key} delay={i * 90}>
          <div className={`h-full rounded-3xl p-6 sm:p-7 ${dark ? "border border-white/10 bg-white/[0.04] backdrop-blur" : "card"}`}>
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-2 font-bold">
                <span className={`grid h-9 w-9 place-items-center rounded-xl ${c.tone}`}>
                  <Icon name={c.icon} className="h-4.5 w-4.5" />
                </span>
                {tr(c.name)}
              </p>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${dark ? "bg-white/[0.07] text-white/65" : "bg-canvas text-muted"}`}>
                {tr(c.source)}
              </span>
            </div>
            <p className="mt-5 text-5xl font-extrabold tracking-tight tabular-nums">
              {c.value.toLocaleString()}
              <span className={`ml-1.5 text-lg font-semibold ${dark ? "text-white/50" : "text-muted"}`}>kcal</span>
            </p>
            <div className={`mt-4 h-2.5 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-canvas"}`}>
              <div className="h-full rounded-full" style={{ width: `${Math.min(100, (c.value / c.goal) * 100)}%`, background: c.color }} />
            </div>
            <p className={`mt-2 text-xs ${dark ? "text-white/50" : "text-muted"}`}>
              {tr(c.goalLabel)} {c.goal.toLocaleString()} kcal · {Math.round((c.value / c.goal) * 100)}%
            </p>
            {detailed && <p className={`mt-4 text-sm leading-relaxed ${dark ? "text-white/60" : "text-ink/75"}`}>{tr(c.what)}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Compact 2×2 / 4-up board of the four scores; used on dark and light backgrounds. */
export default function ScoreBoard({ dark = false }: { dark?: boolean }) {
  const { tr } = useLang();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {scores.map((s, i) => (
        <Reveal key={s.key} delay={i * 90}>
          <div
            className={`flex h-full flex-col items-center rounded-3xl p-7 text-center ${
              dark ? "border border-white/10 bg-white/[0.04] backdrop-blur" : "card"
            }`}
          >
            <ScoreGauge
              value={s.value}
              color={s.color}
              size={120}
              stroke={10}
              track={dark ? "rgba(255,255,255,0.1)" : "#e6eff1"}
              labelClass="text-4xl"
            />
            <p className="mt-5 flex items-center gap-2 text-lg font-bold">
              <Icon name={s.icon} className="h-5 w-5" />
              {tr(s.name)}
            </p>
            <p className="mt-1 text-sm font-semibold" style={{ color: s.color }}>
              {tr(s.status)}
            </p>
            <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-white/55" : "text-muted"}`}>{tr(s.what)}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
