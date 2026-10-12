"use client";

import { useEffect, useRef, useState } from "react";
import { l, useLang } from "@/lib/i18n";
import { dishes } from "@/lib/devices";
import Icon from "./Icon";
import PhoneFrame from "./PhoneFrame";

const SCAN_MS = 1500;
const AUTOPLAY_MS = 6500;

function useCountUp(target: number, run: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) {
      setN(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 900, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return n;
}

export default function PhoneDemo({ autoplay = true }: { autoplay?: boolean }) {
  const { tr } = useLang();
  const [idx, setIdx] = useState(0);
  const [scanning, setScanning] = useState(true);
  const [touched, setTouched] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const dish = dishes[idx];
  const done = !scanning;
  const kcal = useCountUp(dish.kcal, done);

  // Each dish change re-runs the scan, then reveals the result.
  useEffect(() => {
    setScanning(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setScanning(false), SCAN_MS);
    return () => clearTimeout(timer.current);
  }, [idx]);

  // Cycle through dishes until the visitor picks one themselves.
  useEffect(() => {
    if (!autoplay || touched) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % dishes.length), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [autoplay, touched]);

  const macros = [
    { key: "protein", label: l("蛋白质", "Protein"), g: dish.protein, kcal: dish.protein * 4, color: "bg-sky" },
    { key: "carbs", label: l("碳水", "Carbs"), g: dish.carbs, kcal: dish.carbs * 4, color: "bg-amber" },
    { key: "fat", label: l("脂肪", "Fat"), g: dish.fat, kcal: dish.fat * 9, color: "bg-heart" },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label={tr(l("示例菜品", "Sample dishes"))}>
        {dishes.map((d, i) => (
          <button
            key={d.key}
            role="tab"
            aria-selected={i === idx}
            onClick={() => {
              setTouched(true);
              if (i === idx) {
                setScanning(true);
                clearTimeout(timer.current);
                timer.current = setTimeout(() => setScanning(false), SCAN_MS);
              } else setIdx(i);
            }}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
              i === idx
                ? "border-teal bg-teal text-white shadow-[0_8px_20px_-8px_rgba(15,181,166,0.7)]"
                : "border-line bg-white text-ink/70 hover:border-teal/50"
            }`}
          >
            <span>{d.emoji}</span>
            {tr(d.name)}
          </button>
        ))}
      </div>

      <PhoneFrame>

          <div className="flex items-center justify-between px-5 pt-2 pb-3">
            <div>
              <p className="text-[11px] text-muted">{tr(l("午餐 · 12:30", "Lunch · 12:30"))}</p>
              <p className="text-base font-bold">{tr(l("AI 识餐", "AI Meal Scan"))}</p>
            </div>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-soft text-teal-deep">
              <Icon name="camera" className="h-4 w-4" />
            </span>
          </div>

          {/* photo */}
          <div className="relative mx-4 aspect-square overflow-hidden rounded-3xl" style={{ background: dish.bg }}>
            <span
              className={`absolute inset-0 grid place-items-center text-[118px] transition-transform duration-700 ${
                scanning ? "scale-95" : "scale-100"
              }`}
              aria-hidden
            >
              {dish.emoji}
            </span>

            {/* AI bounding box */}
            <div
              className={`absolute inset-[14%] transition-all duration-500 ${
                done ? "opacity-100" : "opacity-50"
              }`}
            >
              {["left-0 top-0 border-l-[3px] border-t-[3px] rounded-tl-xl", "right-0 top-0 border-r-[3px] border-t-[3px] rounded-tr-xl", "left-0 bottom-0 border-l-[3px] border-b-[3px] rounded-bl-xl", "right-0 bottom-0 border-r-[3px] border-b-[3px] rounded-br-xl"].map((c) => (
                <span key={c} className={`absolute h-7 w-7 border-white ${c}`} />
              ))}
            </div>

            {scanning && <div className="vk-scanline" />}

            <div className="absolute inset-x-0 bottom-3 flex justify-center">
              <span className="flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {scanning ? (
                  <>
                    <span className="relative h-2 w-2 rounded-full text-mint vk-pulse bg-mint" />
                    {tr(l("AI 识别中…", "Analyzing…"))}
                  </>
                ) : (
                  <>
                    <Icon name="check" className="h-3.5 w-3.5 text-mint" />
                    {tr(dish.name)} · {dish.confidence}%
                  </>
                )}
              </span>
            </div>
          </div>

          {/* result */}
          <div className="mx-4 mt-3 rounded-3xl bg-white p-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] text-muted">{tr(l("估算热量", "Estimated energy"))}</p>
                <p className="text-3xl font-extrabold tabular-nums tracking-tight">
                  {done ? kcal : "—"}
                  <span className="ml-1 text-sm font-semibold text-muted">kcal</span>
                </p>
              </div>
              <p className="rounded-full bg-canvas px-2.5 py-1 text-[11px] font-semibold text-muted">
                {tr(l("约", "≈"))} {dish.portion} g
              </p>
            </div>
            <div className="mt-3 space-y-2">
              {macros.map((m) => (
                <div key={m.key}>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted">{tr(m.label)}</span>
                    <span className="font-semibold tabular-nums">{done ? `${m.g} g` : "—"}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-canvas">
                    <div
                      className={`h-full rounded-full ${m.color} transition-[width] duration-700 ease-out`}
                      style={{ width: done ? `${Math.round((m.kcal / dish.kcal) * 100)}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`mx-4 mt-2 flex gap-2 rounded-2xl bg-teal-soft p-3 transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}>
            <Icon name="spark" className="h-4 w-4 shrink-0 text-teal-deep" />
            <p className="text-[11px] leading-snug text-teal-deep">{tr(dish.tip)}</p>
          </div>

          <div className="px-4 pt-2 pb-5">
            <div className="rounded-full bg-ink py-2.5 text-center text-xs font-semibold text-white">
              {tr(l("加入今日饮食", "Add to today's log"))}
            </div>
          </div>
      </PhoneFrame>
    </div>
  );
}
