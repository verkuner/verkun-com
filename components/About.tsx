"use client";

import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

export default function About() {
  const { t } = useLang();
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            {t.about.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-snug sm:text-4xl">
            {t.about.title1}
            <span className="text-gradient">{t.about.highlight}</span>
          </h2>
          <p className="mt-6 leading-relaxed text-white/60">{t.about.p1}</p>
          <p className="mt-4 leading-relaxed text-white/60">{t.about.p2}</p>
        </Reveal>

        <div className="grid gap-5">
          {t.about.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 120}>
              <div className="glass glow-ring relative flex gap-5 rounded-2xl p-6 transition-transform hover:-translate-y-1">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-400/20 to-violet-500/20 text-2xl text-sky-300">
                  {v.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                    {v.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
