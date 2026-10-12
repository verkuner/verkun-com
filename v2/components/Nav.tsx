"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { l, useLang } from "@/lib/i18n";

const links = [
  { href: "/rings/vk100", label: l("VK100", "VK100") },
  { href: "/rings/vk35pro", label: l("VK35 Pro", "VK35 Pro") },
  { href: "/compare", label: l("产品对比", "Compare") },
  { href: "/app", label: l("AI 饮食 App", "AI Nutrition App") },
  { href: "/#contact", label: l("联系我们", "Contact") },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-teal to-sky">
        <span className="h-4 w-4 rounded-full border-[3px] border-white" />
      </span>
      <span className={`text-lg font-extrabold tracking-[0.18em] ${light ? "text-white" : "text-ink"}`}>
        VERKUN
      </span>
    </span>
  );
}

export default function Nav() {
  const { tr, lang, toggle } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-line bg-white/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Verkun home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-teal-soft text-teal-deep" : "text-ink/70 hover:text-ink"
                }`}
              >
                {tr(item.label)}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink/80 transition-colors hover:border-teal"
            aria-label="切换语言 / Switch language"
          >
            {lang === "zh" ? "EN" : "中文"}
          </button>
          <Link
            href="/app#download"
            className="hidden rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-deep sm:inline-block"
          >
            {tr(l("下载 App", "Get the App"))}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white lg:hidden"
            aria-label="menu"
            aria-expanded={open}
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-ink transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-4 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-ink transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-white px-5 pb-5 lg:hidden">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="block border-b border-line py-3.5 font-medium text-ink/80">
              {tr(item.label)}
            </Link>
          ))}
          <Link href="/app#download" className="mt-4 block rounded-full bg-ink py-3 text-center font-semibold text-white">
            {tr(l("下载 App", "Get the App"))}
          </Link>
        </div>
      )}
    </header>
  );
}
