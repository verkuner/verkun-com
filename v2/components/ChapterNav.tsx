"use client";

import Link from "next/link";
import { l, useLang } from "@/lib/i18n";
import { yourHealth } from "@/lib/nav";
import Icon from "./Icon";

/** "Your Health" chapter switcher shown at the bottom of each chapter page. */
export default function ChapterNav({ current }: { current: string }) {
  const { tr } = useLang();
  const idx = yourHealth.findIndex((c) => c.href === current);
  const next = yourHealth[idx + 1];

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
      <p className="eyebrow">{tr(l("你的健康", "Your Health"))}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {yourHealth.map((c, i) => {
          const active = c.href === current;
          const isNext = c === next;
          return (
            <Link
              key={c.href}
              href={c.href}
              aria-current={active ? "page" : undefined}
              className={`group flex items-center gap-4 rounded-3xl border p-5 transition-all ${
                active
                  ? "border-teal/40 bg-teal-soft"
                  : isNext
                    ? "border-line bg-white shadow-lg hover:-translate-y-0.5"
                    : "border-line bg-white/60 hover:bg-white"
              }`}
            >
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${c.tone}`}>
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
              <span className="flex-1">
                <span className="block text-[11px] font-bold text-muted">
                  0{i + 1}
                  {active && ` · ${tr(l("当前", "You are here"))}`}
                  {isNext && ` · ${tr(l("下一章", "Next"))}`}
                </span>
                <span className="block font-bold leading-snug">{tr(c.title)}</span>
              </span>
              {!active && <Icon name="arrow" className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1" />}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
