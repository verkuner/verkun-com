"use client";

import Link from "next/link";
import { l, useLang } from "@/lib/i18n";
import { compareRows, devices } from "@/lib/devices";
import RingVisual from "./RingVisual";

export default function CompareTable() {
  const { tr } = useLang();
  const rings = devices.filter((d) => d.category === "ring");
  const cols = [
    { d: rings.find((r) => r.slug === "vk100")!, key: "vk100" as const },
    { d: rings.find((r) => r.slug === "vk35pro")!, key: "vk35pro" as const },
  ];

  return (
    <>
      <div className="card overflow-hidden">
        <div className="grid grid-cols-2 border-b border-line sm:grid-cols-[1.1fr_1fr_1fr]">
          <div className="hidden p-6 sm:block" />
          {cols.map(({ d }, i) => (
            <div key={d.slug} className={`flex flex-col items-center p-6 text-center ${i ? "border-l border-line" : "sm:border-l sm:border-line"}`}>
              <RingVisual finish={d.finishes[i]} shadow={false} className="h-28" />
              <p className="mt-3 text-2xl font-extrabold">{d.name}</p>
              <p className="text-xs text-muted">{tr(d.badge)}</p>
              <Link href={`/devices/${d.slug}`} className="mt-4 rounded-full bg-ink px-5 py-2 text-xs font-semibold text-white hover:bg-teal-deep">
                {tr(l("查看详情", "View details"))}
              </Link>
            </div>
          ))}
        </div>
        <dl>
          {compareRows.map((row, i) => (
            <div key={row.label.en} className={`grid grid-cols-2 sm:grid-cols-[1.1fr_1fr_1fr] ${i % 2 ? "bg-canvas/60" : ""}`}>
              <dt className="col-span-2 px-6 pt-4 text-xs font-semibold text-muted sm:col-span-1 sm:py-4 sm:text-sm">{tr(row.label)}</dt>
              {cols.map(({ key }) => {
                const v = row[key];
                return (
                  <dd
                    key={key}
                    className={`px-6 py-3 text-center text-sm sm:border-l sm:border-line sm:py-4 ${
                      v.en.startsWith("✓") ? "font-semibold text-teal-deep" : v.en === "—" ? "text-muted" : ""
                    }`}
                  >
                    {tr(v)}
                  </dd>
                );
              })}
            </div>
          ))}
        </dl>
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        {tr(l("* 续航为典型使用场景下的实验室数据，实际表现因使用方式而异。", "* Battery life is measured under typical lab conditions; real-world results vary with usage."))}
      </p>
    </>
  );
}
