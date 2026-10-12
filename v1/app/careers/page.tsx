"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { useLang } from "@/lib/i18n";
import { jobs } from "@/lib/data";

export default function CareersPage() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<string>("all");

  const depts = useMemo(() => {
    const map = new Map<string, string>();
    jobs.forEach((j) => map.set(j.deptKey, j.dept[lang]));
    return Array.from(map.entries());
  }, [lang]);

  const filtered = jobs.filter((j) => filter === "all" || j.deptKey === filter);

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pt-36 pb-16">
        <Link
          href="/"
          className="text-sm text-white/50 transition-colors hover:text-sky-300"
        >
          {t.careers.back}
        </Link>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
          {t.careers.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
          {t.careers.title1}
          <span className="text-gradient">{t.careers.highlight}</span>
        </h1>
        <p className="mt-5 max-w-2xl text-white/60">{t.careers.subtitle}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-bold">{t.careers.perksTitle}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.careers.perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="glass glow-ring relative h-full rounded-2xl p-6">
                <div className="text-3xl">{p.icon}</div>
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <h2 className="text-2xl font-bold">{t.careers.openings}</h2>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              filter === "all"
                ? "border-sky-400/60 bg-sky-400/10 text-sky-200"
                : "border-white/10 text-white/60 hover:bg-white/5"
            }`}
          >
            {lang === "zh" ? "全部" : "All"}
          </button>
          {depts.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                filter === key
                  ? "border-sky-400/60 bg-sky-400/10 text-sky-200"
                  : "border-white/10 text-white/60 hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {filtered.length === 0 && (
            <p className="text-white/50">{t.careers.noOpenings}</p>
          )}
          {filtered.map((j, i) => (
            <Reveal key={j.id} delay={i * 80}>
              <div className="glass glow-ring group relative flex flex-col gap-4 rounded-2xl p-6 transition-transform hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold transition-colors group-hover:text-sky-200">
                    {j.title[lang]}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-sm text-white/55">
                    {j.desc[lang]}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/60">
                    <span className="rounded-full bg-white/5 px-3 py-1">
                      {t.careers.deptLabel}: {j.dept[lang]}
                    </span>
                    <span className="rounded-full bg-white/5 px-3 py-1">
                      {t.careers.locationLabel}: {j.location[lang]}
                    </span>
                    <span className="rounded-full bg-white/5 px-3 py-1">
                      {t.careers.typeLabel}: {j.type[lang]}
                    </span>
                  </div>
                </div>
                <a
                  href={`mailto:hr@verkun.com?subject=${encodeURIComponent(
                    j.title[lang]
                  )}`}
                  className="shrink-0 rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/5"
                >
                  {t.careers.apply} →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
