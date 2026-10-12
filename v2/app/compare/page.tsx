"use client";

import Link from "next/link";
import { l, useLang } from "@/lib/i18n";
import { compareRows, rings } from "@/lib/products";
import RingVisual from "@/components/RingVisual";
import Reveal from "@/components/Reveal";

export default function ComparePage() {
  const { tr } = useLang();
  const [a, b] = rings;

  return (
    <section className="hero-glow pt-28 pb-24 sm:pt-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">{tr(l("产品对比", "Compare"))}</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {tr(l("哪一枚更适合你？", "Which ring is right for you?"))}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            {tr(
              l(
                "VK100 轻盈日常，VK35 Pro 续航更长、功能更全。两者都支持 AI 饮食热量识别。",
                "VK100 is light and everyday; VK35 Pro brings longer battery and more features. Both work with AI calorie recognition."
              )
            )}
          </p>
        </Reveal>

        <div className="card mt-12 overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr] border-b border-line sm:grid-cols-[1.1fr_1fr_1fr]">
            <div className="hidden p-6 sm:block" />
            {[a, b].map((r) => (
              <div key={r.slug} className="flex flex-col items-center border-l border-line p-6 text-center first:border-l-0 sm:first:border-l">
                <RingVisual finish={r.finishes[r.slug === "vk100" ? 0 : 1]} shadow={false} className="h-28" />
                <p className="mt-3 text-2xl font-extrabold">{r.name}</p>
                <p className="text-xs text-muted">{tr(r.badge)}</p>
                <Link href={`/rings/${r.slug}`} className="mt-4 rounded-full bg-ink px-5 py-2 text-xs font-semibold text-white hover:bg-teal-deep">
                  {tr(l("查看详情", "View details"))}
                </Link>
              </div>
            ))}
          </div>

          <dl>
            {compareRows.map((row, i) => (
              <div key={row.label.en} className={`grid grid-cols-2 sm:grid-cols-[1.1fr_1fr_1fr] ${i % 2 ? "bg-canvas/60" : ""}`}>
                <dt className="col-span-2 px-6 pt-4 text-xs font-semibold text-muted sm:col-span-1 sm:py-4 sm:text-sm">{tr(row.label)}</dt>
                {[row.vk100, row.vk35pro].map((v, j) => (
                  <dd
                    key={j}
                    className={`px-6 py-3 text-center text-sm sm:border-l sm:border-line sm:py-4 ${
                      v.en === "✓" || v.en.startsWith("✓") ? "font-semibold text-teal-deep" : v.en === "—" ? "text-muted" : ""
                    }`}
                  >
                    {tr(v)}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          {tr(l("* 续航为典型使用场景下的实验室数据，实际表现因使用方式而异。", "* Battery life is measured under typical lab conditions; real-world results vary with usage."))}
        </p>
      </div>
    </section>
  );
}
