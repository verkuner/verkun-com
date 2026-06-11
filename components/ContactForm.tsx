"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const { t } = useLang();
  const f = t.form;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fieldClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-sky-400/60";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const nextErrors: Record<string, string> = {};
    if (!String(data.name ?? "").trim()) nextErrors.name = f.errName;
    if (!EMAIL_RE.test(String(data.email ?? "").trim()))
      nextErrors.email = f.errEmail;
    if (!String(data.message ?? "").trim()) nextErrors.message = f.errMessage;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-10 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-400/15 text-2xl text-emerald-300">
          ✓
        </div>
        <p className="text-emerald-200">{f.success}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-white/60 underline-offset-4 hover:underline"
        >
          {t.form.submit} →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs text-white/60">{f.name}</label>
          <input name="name" placeholder={f.namePh} className={fieldClass} />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-white/60">
            {f.company}
          </label>
          <input
            name="company"
            placeholder={f.companyPh}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs text-white/60">{f.email}</label>
          <input
            name="email"
            type="email"
            placeholder={f.emailPh}
            className={fieldClass}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-white/60">{f.phone}</label>
          <input name="phone" placeholder={f.phonePh} className={fieldClass} />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs text-white/60">{f.message}</label>
        <textarea
          name="message"
          rows={4}
          placeholder={f.messagePh}
          className={`${fieldClass} resize-none`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message}</p>
        )}
      </div>

      {status === "error" && (
        <p className="rounded-lg border border-red-400/30 bg-red-400/5 px-4 py-2.5 text-sm text-red-300">
          {f.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-violet-500 px-8 py-3.5 font-semibold text-[#05060f] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? f.submitting : f.submit}
      </button>
    </form>
  );
}
