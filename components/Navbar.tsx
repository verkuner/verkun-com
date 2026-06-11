"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#about", label: t.nav.about },
    { href: "/#solutions", label: t.nav.solutions },
    { href: "/#technology", label: t.nav.technology },
    { href: "/news", label: t.nav.news },
    { href: "/careers", label: t.nav.careers },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#05060f]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-400 to-violet-500 text-lg font-black text-[#05060f]">
            凡
            <span className="absolute inset-0 rounded-xl ring-2 ring-sky-400/40" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-wide">凡鲲智能</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
              VERKUN AI
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={toggle}
            aria-label="切换语言 / Switch language"
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:bg-white/5"
          >
            {lang === "zh" ? "EN" : "中文"}
          </button>
          <Link
            href="/#contact"
            className="rounded-full bg-gradient-to-r from-sky-400 to-violet-500 px-5 py-2 text-sm font-semibold text-[#05060f] transition-transform hover:scale-105"
          >
            {t.nav.demo}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggle}
            aria-label="切换语言 / Switch language"
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80"
          >
            {lang === "zh" ? "EN" : "中文"}
          </button>
          <button
            aria-label="menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-[#05060f]/95 px-6 py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-white/80"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-gradient-to-r from-sky-400 to-violet-500 px-5 py-2 text-center font-semibold text-[#05060f]"
          >
            {t.nav.demo}
          </Link>
        </div>
      )}
    </header>
  );
}
