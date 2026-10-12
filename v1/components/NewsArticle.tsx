"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLang } from "@/lib/i18n";
import { formatDate, type Post } from "@/lib/data";

export default function NewsArticle({ post }: { post: Post }) {
  const { t, lang } = useLang();
  return (
    <main>
      <Navbar />
      <article className="mx-auto max-w-3xl px-6 pt-36 pb-24">
        <Link
          href="/news"
          className="text-sm text-white/50 transition-colors hover:text-sky-300"
        >
          {t.news.backList}
        </Link>

        <div className="mt-8 flex items-center gap-3 text-xs text-white/45">
          <span className="rounded-full bg-sky-400/10 px-2.5 py-0.5 font-semibold text-sky-300">
            {post.category[lang]}
          </span>
          <span>{formatDate(post.date, lang)}</span>
          <span>· {post.readTime} {t.news.readTime}</span>
        </div>

        <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
          {post.title[lang]}
        </h1>

        <div className="mt-8 h-px w-full bg-gradient-to-r from-sky-400/40 to-transparent" />

        <div className="mt-8 space-y-6 leading-relaxed text-white/70">
          {post.body.map((para, i) => (
            <p key={i}>{para[lang]}</p>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-violet-500 px-7 py-3 font-semibold text-[#05060f] transition-transform hover:scale-105"
          >
            {t.nav.contact} →
          </Link>
        </div>
      </article>
      <Footer />
    </main>
  );
}
