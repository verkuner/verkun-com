"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { l, useLang } from "@/lib/i18n";
import { categories, devices } from "@/lib/devices";
import RingVisual from "./RingVisual";
import Icon from "./Icon";

const links = [
  { href: "/app", label: l("App 功能", "The App") },
  { href: "/app#nutrition", label: l("AI 饮食识别", "AI Nutrition") },
  { href: "/#contact", label: l("联系我们", "Contact") },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-teal to-sky">
        <span className="h-4 w-4 rounded-full border-[3px] border-white" />
      </span>
      <span className={`text-lg font-extrabold tracking-[0.18em] ${light ? "text-white" : "text-ink"}`}>VERKUN</span>
    </span>
  );
}

function DevicesMenu({ onNavigate }: { onNavigate: () => void }) {
  const { tr } = useLang();
  return (
    <div className="grid w-[560px] grid-cols-[1fr_180px] gap-2 rounded-3xl border border-line bg-white p-3 shadow-[0_24px_60px_-20px_rgba(15,34,48,0.35)]">
      <div className="p-2">
        {categories.map((cat) => (
          <div key={cat.key}>
            <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted">{tr(cat.name)}</p>
            <div className="mt-2 grid gap-1">
              {devices
                .filter((d) => d.category === cat.key)
                .map((d) => (
                  <Link
                    key={d.slug}
                    href={`/devices/${d.slug}`}
                    onClick={onNavigate}
                    className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-canvas"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-canvas">
                      <RingVisual finish={d.finishes[0]} shadow={false} sensor={false} className="h-10" />
                    </span>
                    <span>
                      <span className="block font-bold">{d.name}</span>
                      <span className="block text-xs text-muted">{tr(d.badge)}</span>
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 rounded-2xl bg-canvas p-3 text-sm">
        <Link href="/devices" onClick={onNavigate} className="flex items-center justify-between rounded-xl px-3 py-2 font-semibold hover:bg-white">
          {tr(l("全部设备", "All devices"))}
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
        <Link href="/devices#compare" onClick={onNavigate} className="rounded-xl px-3 py-2 font-medium text-ink/75 hover:bg-white">
          {tr(l("设备对比", "Compare"))}
        </Link>
        <p className="mt-auto rounded-xl border border-dashed border-teal/30 px-3 py-2 text-xs leading-relaxed text-muted">
          {tr(l("更多智能健康设备即将推出", "More health devices coming soon"))}
        </p>
      </div>
    </div>
  );
}

export default function Nav() {
  const { tr, lang, toggle } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [menu]);

  const onDevices = pathname.startsWith("/devices");
  const linkCls = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${active ? "bg-teal-soft text-teal-deep" : "text-ink/70 hover:text-ink"}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open || menu ? "border-b border-line bg-white/90 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Verkun home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <Link href={links[0].href} className={linkCls(pathname === "/app")}>
            {tr(links[0].label)}
          </Link>

          <div ref={menuRef} className="relative" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
            <button
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-haspopup="true"
              className={`${linkCls(onDevices)} flex items-center gap-1`}
            >
              {tr(l("智能设备", "Devices"))}
              <svg viewBox="0 0 12 12" className={`h-3 w-3 transition-transform ${menu ? "rotate-180" : ""}`} aria-hidden>
                <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            {menu && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                <DevicesMenu onNavigate={() => setMenu(false)} />
              </div>
            )}
          </div>

          {links.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className={linkCls(false)}>
              {tr(item.label)}
            </Link>
          ))}
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
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-white px-5 pb-5 lg:hidden">
          <Link href="/app" className="block border-b border-line py-3.5 font-medium text-ink/80">
            {tr(links[0].label)}
          </Link>
          <div className="border-b border-line py-3.5">
            <Link href="/devices" className="font-medium text-ink/80">
              {tr(l("智能设备", "Devices"))}
            </Link>
            <div className="mt-2 grid gap-1 pl-3">
              {devices.map((d) => (
                <Link key={d.slug} href={`/devices/${d.slug}`} className="py-1.5 text-sm text-ink/65">
                  {d.name} <span className="text-muted">· {tr(d.badge)}</span>
                </Link>
              ))}
              <Link href="/devices#compare" className="py-1.5 text-sm text-ink/65">
                {tr(l("设备对比", "Compare"))}
              </Link>
            </div>
          </div>
          {links.slice(1).map((item) => (
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
