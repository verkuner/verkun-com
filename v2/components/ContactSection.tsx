"use client";

import { useState } from "react";
import { l, useLang } from "@/lib/i18n";
import Icon from "./Icon";
import Reveal from "./Reveal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const topics = [
  { key: "purchase", label: l("个人购买咨询", "Personal purchase") },
  { key: "retail", label: l("渠道 / 经销合作", "Retail & distribution") },
  { key: "corporate", label: l("企业健康方案", "Corporate wellness") },
  { key: "media", label: l("媒体与测评", "Media & reviews") },
  { key: "other", label: l("其他", "Other") },
];

export default function ContactSection() {
  const { tr } = useLang();
  const [topic, setTopic] = useState("purchase");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const input =
    "w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-teal focus:bg-white";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data: Record<string, FormDataEntryValue> = { ...Object.fromEntries(new FormData(form).entries()), topic };

    const next: Record<string, string> = {};
    if (!String(data.name ?? "").trim()) next.name = tr(l("请填写姓名", "Please enter your name"));
    if (!EMAIL_RE.test(String(data.email ?? "").trim())) next.email = tr(l("请填写有效邮箱", "Please enter a valid email"));
    if (!String(data.message ?? "").trim()) next.message = tr(l("请填写留言内容", "Please enter a message"));
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="card grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative bg-graphite p-8 text-white sm:p-12">
          <div className="dot-grid absolute inset-0 opacity-60" />
          <div className="relative">
            <p className="eyebrow !text-teal">{tr(l("联系我们", "Contact"))}</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              {tr(l("预约体验，或成为合作伙伴", "Book a fitting, or partner with us"))}
            </h2>
            <p className="mt-4 max-w-md text-white/60">
              {tr(
                l(
                  "无论是购买咨询、尺码试戴、渠道合作还是企业员工健康方案，我们都会在 1 个工作日内回复。",
                  "Purchase questions, ring sizing, retail partnerships or corporate wellness programs — we reply within one business day."
                )
              )}
            </p>
            <ul className="mt-10 space-y-5 text-sm">
              {[
                { icon: "spark", k: l("邮箱", "Email"), v: "contact@verkun.com" },
                { icon: "chart", k: l("商务合作", "Business"), v: "bd@verkun.com" },
                { icon: "target", k: l("地址", "Address"), v: tr(l("北京市海淀区中关村科技园", "Zhongguancun Science Park, Haidian, Beijing")) },
              ].map((row) => (
                <li key={row.k.en} className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.07] text-teal">
                    <Icon name={row.icon} className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-white/45">{tr(row.k)}</span>
                    <span className="text-white/85">{row.v}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="p-8 sm:p-12">
          {status === "ok" ? (
            <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-mint-soft text-mint">
                <Icon name="check" className="h-7 w-7" />
              </span>
              <p className="mt-5 text-lg font-bold">{tr(l("已收到您的留言", "Message received"))}</p>
              <p className="mt-2 text-sm text-muted">{tr(l("我们会在 1 个工作日内与您联系。", "We'll be in touch within one business day."))}</p>
              <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold text-teal-deep hover:underline">
                {tr(l("再写一条", "Send another"))}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <div>
                <p className="mb-2 text-xs font-semibold text-muted">{tr(l("咨询类型", "Inquiry type"))}</p>
                <div className="flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button
                      type="button"
                      key={t.key}
                      onClick={() => setTopic(t.key)}
                      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                        topic === t.key ? "border-teal bg-teal-soft font-semibold text-teal-deep" : "border-line text-ink/65 hover:border-teal/40"
                      }`}
                    >
                      {tr(t.label)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">{tr(l("姓名", "Name"))}</span>
                  <input name="name" className={input} placeholder={tr(l("您的称呼", "Your name"))} />
                  {errors.name && <span className="mt-1 block text-xs text-heart">{errors.name}</span>}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">{tr(l("电话（选填）", "Phone (optional)"))}</span>
                  <input name="phone" className={input} placeholder="138 0000 0000" />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted">{tr(l("邮箱", "Email"))}</span>
                <input name="email" type="email" className={input} placeholder="name@example.com" />
                {errors.email && <span className="mt-1 block text-xs text-heart">{errors.email}</span>}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted">{tr(l("留言", "Message"))}</span>
                <textarea
                  name="message"
                  rows={4}
                  className={`${input} resize-none`}
                  placeholder={tr(l("例如：想了解 VK35 Pro 的尺码与上市时间", "e.g. I'd like sizing and launch info for VK35 Pro"))}
                />
                {errors.message && <span className="mt-1 block text-xs text-heart">{errors.message}</span>}
              </label>

              {status === "error" && (
                <p className="rounded-2xl bg-heart-soft px-4 py-3 text-sm text-heart">
                  {tr(l("提交失败，请稍后重试或发送邮件至 contact@verkun.com", "Couldn't send. Please retry or email contact@verkun.com"))}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal py-3.5 font-semibold text-white transition-colors hover:bg-teal-deep disabled:opacity-60"
              >
                {status === "sending" ? tr(l("提交中…", "Sending…")) : tr(l("提交", "Send message"))}
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
