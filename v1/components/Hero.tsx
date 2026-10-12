"use client";

import Link from "next/link";
import NeuralOrb from "./NeuralOrb";
import { useLang } from "@/lib/i18n";

export default function Hero() {
  const { t } = useLang();
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-32 pb-20 text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur reveal in-view">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
        </span>
        {t.hero.badge}
      </div>

      <h1 className="mt-8 max-w-4xl text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">
        {t.hero.title1}
        <span className="text-gradient">{t.hero.highlight}</span>
        <br className="hidden sm:block" />
        {t.hero.title2}
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
        {t.hero.subtitle1}
        <br className="hidden sm:block" />
        {t.hero.subtitle2}
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="#solutions"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-violet-500 px-8 py-3.5 font-semibold text-[#05060f] transition-transform hover:scale-105"
        >
          {t.hero.cta1}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
        <Link
          href="#contact"
          className="rounded-full border border-white/15 px-8 py-3.5 font-semibold text-white/90 transition-colors hover:bg-white/5"
        >
          {t.hero.cta2}
        </Link>
      </div>

      <div className="mt-16 w-full">
        <NeuralOrb />
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  );
}
