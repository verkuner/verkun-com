"use client";

import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

export default function Solutions() {
  const { t } = useLang();
  return (
    <section id="solutions" className="relative mx-auto max-w-7xl px-6 py-28">
      <Reveal className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
          {t.solutions.eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
          {t.solutions.title1}
          <span className="text-gradient">{t.solutions.highlight}</span>
          {t.solutions.title2}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/60">
          {t.solutions.subtitle}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {t.solutions.items.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 120}>
            <article className="glass glow-ring group relative h-full overflow-hidden rounded-2xl p-7 transition-transform hover:-translate-y-1.5">
              <span className="absolute right-5 top-5 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold tracking-widest text-sky-300">
                {s.tag}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {s.desc}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-sky-400/20 to-violet-500/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
