"use client";

import Link from "next/link";
import { l, useLang } from "@/lib/i18n";
import { categories, devices } from "@/lib/devices";
import RingVisual from "./RingVisual";
import Icon from "./Icon";
import Reveal from "./Reveal";

/** Device cards grouped by category, with a placeholder slot for upcoming devices. */
export default function DevicesShowcase() {
  const { tr } = useLang();
  return (
    <div className="space-y-12">
      {categories.map((cat) => {
        const list = devices.filter((d) => d.category === cat.key);
        return (
          <div key={cat.key}>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold">{tr(cat.name)}</h3>
              <span className="rounded-full bg-white px-2.5 py-0.5 text-xs text-muted">{list.length}</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {list.map((d, i) => (
                <Reveal key={d.slug} delay={i * 100}>
                  <Link href={`/devices/${d.slug}`} className="card group flex h-full flex-col p-7 transition-transform hover:-translate-y-1">
                    <span className="w-fit rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-teal-deep">{tr(d.badge)}</span>
                    <div className="relative my-4 flex h-44 items-center justify-center">
                      <div className="absolute h-36 w-36 rounded-full bg-gradient-to-br from-canvas to-teal-soft transition-transform duration-700 group-hover:scale-110" />
                      <RingVisual finish={d.finishes[0]} className="relative h-44 transition-transform duration-700 group-hover:-rotate-6" />
                    </div>
                    <p className="text-2xl font-extrabold">{d.name}</p>
                    <p className="mt-1 text-sm text-muted">{tr(d.tagline)}</p>
                    <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                      {d.keySpecs.map((s) => (
                        <div key={s.label.en} className="rounded-xl bg-canvas py-2">
                          <p className="text-sm font-extrabold">{tr(s.value)}</p>
                          <p className="text-[11px] text-muted">{tr(s.label)}</p>
                        </div>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep">
                      {tr(l("查看详情", "View details"))}
                      <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}

              <Reveal delay={list.length * 100}>
                <div className="flex h-full min-h-72 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-teal/25 p-7 text-center">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-teal-deep">
                    <Icon name="spark" className="h-6 w-6" />
                  </span>
                  <p className="mt-4 font-bold">{tr(l("更多智能健康设备", "More health devices"))}</p>
                  <p className="mt-1 text-sm text-muted">{tr(l("敬请期待，都将接入 VERKUN Health App", "Coming soon — all connected to VERKUN Health"))}</p>
                </div>
              </Reveal>
            </div>
          </div>
        );
      })}
    </div>
  );
}
