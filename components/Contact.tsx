"use client";

import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import { useLang } from "@/lib/i18n";

export default function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl px-6 py-14 sm:px-12">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                {t.contact.title1}
                <span className="text-gradient">{t.contact.highlight}</span>
                {t.contact.title2}
              </h2>
              <p className="mt-5 max-w-md text-white/60">
                {t.contact.subtitle}
              </p>

              <div className="mt-10">
                <p className="text-xs uppercase tracking-widest text-sky-400">
                  {t.contact.infoTitle}
                </p>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {t.contact.info.map(([k, v]) => (
                    <div key={k}>
                      <p className="text-xs text-white/40">{k}</p>
                      <p className="mt-1 text-sm text-white/80">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
              <p className="mb-6 text-sm font-medium text-white/70">
                {t.contact.formTitle}
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
