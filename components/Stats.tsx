"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = performance.now();
          const dur = 1600;
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl font-black sm:text-5xl">
      <span className="text-gradient">
        {n}
        {suffix}
      </span>
    </div>
  );
}

export default function Stats() {
  const { t } = useLang();
  return (
    <section id="stats" className="mx-auto max-w-7xl px-6 py-24">
      <div className="glass grid grid-cols-2 gap-8 rounded-3xl px-8 py-12 lg:grid-cols-4">
        {t.stats.items.map((s) => (
          <div key={s.label} className="text-center">
            <Counter value={s.value} suffix={s.suffix} />
            <p className="mt-3 text-sm text-white/55">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
