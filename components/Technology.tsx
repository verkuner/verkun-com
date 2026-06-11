"use client";

import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

export default function Technology() {
  const { t } = useLang();
  return (
    <section
      id="technology"
      className="relative overflow-hidden border-y border-white/5 bg-[#0b0e1f]/60 py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            {t.technology.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-snug sm:text-4xl">
            {t.technology.title1}
            <span className="text-gradient">{t.technology.highlight}</span>
          </h2>
          <p className="mt-6 leading-relaxed text-white/60">{t.technology.p}</p>

          <div className="mt-8 space-y-4">
            {t.technology.stack.map((item, i) => (
              <Reveal key={item.name} delay={i * 80}>
                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-5 py-3.5">
                  <span className="flex items-center gap-3 text-sm font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    {item.name}
                  </span>
                  <span className="text-xs font-semibold text-sky-300">
                    {item.level}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="glass relative rounded-3xl p-8">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
              <span className="h-3 w-3 rounded-full bg-green-400/70" />
              <span className="ml-3 text-xs text-white/40">
                fankun-ai · inference
              </span>
            </div>
            <pre className="mt-6 overflow-x-auto rounded-xl bg-black/40 p-5 text-[13px] leading-relaxed">
              <code>
                <span className="text-violet-300">from</span>{" "}
                <span className="text-sky-300">fankun</span>{" "}
                <span className="text-violet-300">import</span> AIClient{"\n\n"}
                client = AIClient(model=
                <span className="text-emerald-300">&quot;fankun-pro&quot;</span>)
                {"\n\n"}
                resp = client.chat(
                <span className="text-emerald-300">
                  &quot;{t.technology.codePrompt}&quot;
                </span>
                ){"\n"}
                <span className="text-white/40">{t.technology.codeComment1}</span>
                {"\n"}
                <span className="text-white/40">{t.technology.codeComment2}</span>
                {"\n\n"}
                <span className="text-sky-300">print</span>(resp.solution)
              </code>
            </pre>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {t.technology.metrics.map(([v, l]) => (
                <div key={l} className="rounded-xl bg-white/[0.03] py-4">
                  <div className="text-xl font-bold text-gradient">{v}</div>
                  <div className="mt-1 text-[11px] text-white/50">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
