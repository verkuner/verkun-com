"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { useLang } from "@/lib/i18n";
import { posts, formatDate } from "@/lib/data";

export default function NewsPage() {
  const { t, lang } = useLang();
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 pt-36 pb-24">
        <Link
          href="/"
          className="text-sm text-white/50 transition-colors hover:text-sky-300"
        >
          {t.news.back}
        </Link>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
          {t.news.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-black sm:text-5xl">{t.news.title}</h1>
        <p className="mt-4 max-w-2xl text-white/60">{t.news.subtitle}</p>

        <div className="mt-14 space-y-6">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <Link href={`/news/${p.slug}`} className="block">
                <article className="glass glow-ring group relative flex flex-col gap-4 rounded-2xl p-7 transition-transform hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-white/45">
                      <span className="rounded-full bg-sky-400/10 px-2.5 py-0.5 font-semibold text-sky-300">
                        {p.category[lang]}
                      </span>
                      <span>{formatDate(p.date, lang)}</span>
                      <span>· {p.readTime} {t.news.readTime}</span>
                    </div>
                    <h2 className="mt-3 text-xl font-semibold transition-colors group-hover:text-sky-200">
                      {p.title[lang]}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">
                      {p.excerpt[lang]}
                    </p>
                  </div>
                  <span className="shrink-0 text-sky-300 transition-transform group-hover:translate-x-1">
                    {t.news.readMore} →
                  </span>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
