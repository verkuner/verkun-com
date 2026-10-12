import { NextResponse } from "next/server";
import nodemailer, { type Transporter } from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOPICS: Record<string, string> = {
  purchase: "个人购买咨询",
  retail: "渠道 / 经销合作",
  corporate: "企业健康方案",
  media: "媒体与测评",
  other: "其他",
};

// Mail goes to the Postfix relay on the VM (127.0.0.1:25), which forwards it
// through Feishu Mail. Without MAIL_TO (e.g. local dev) leads are only logged.
const MAIL_TO = process.env.MAIL_TO;
const MAIL_FROM = process.env.MAIL_FROM ?? "contact@verkun.com";

let transport: Transporter | null = null;
function mailer() {
  transport ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "127.0.0.1",
    port: Number(process.env.SMTP_PORT ?? 25),
    secure: false,
    ignoreTLS: true, // loopback hop only; the relay itself uses TLS to Feishu
  });
  return transport;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const field = (k: string, max = 2000) => String(body[k] ?? "").trim().slice(0, max);
  const line = (k: string) => field(k, 200).replace(/[\r\n]+/g, " ");
  const name = line("name");
  const email = line("email");
  const phone = line("phone");
  const message = field("message");
  const topic = field("topic") in TOPICS ? field("topic") : "other";

  // Honeypot: bots fill hidden fields; accept silently so they don't retry.
  if (field("website")) return NextResponse.json({ ok: true });

  const errors: Record<string, string> = {};
  if (!name) errors.name = "required";
  if (!EMAIL_RE.test(email)) errors.email = "invalid";
  if (!message) errors.message = "required";
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const at = new Date();
  // Always keep a copy in the server log (pm2 logs verkun-v2), even if mail fails.
  console.log("[contact:v2]", { topic, name, email, phone, message, at: at.toISOString() });

  if (!MAIL_TO) return NextResponse.json({ ok: true });

  const when = at.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
  const rows: [string, string][] = [
    ["咨询类型", TOPICS[topic]],
    ["姓名", name],
    ["邮箱", email],
    ["电话", phone || "—"],
    ["提交时间", when],
  ];

  try {
    await mailer().sendMail({
      from: { name: "VERKUN 官网", address: MAIL_FROM },
      to: MAIL_TO,
      replyTo: { name, address: email },
      subject: `[官网咨询 · ${TOPICS[topic]}] ${name}`,
      text: `${rows.map(([k, v]) => `${k}：${v}`).join("\n")}\n\n留言：\n${message}\n\n— 来自 verkun.com 联系表单，直接回复即可联系对方。`,
      html: `<table style="font:14px/1.6 -apple-system,'PingFang SC','Microsoft YaHei',sans-serif;border-collapse:collapse">
${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#5b7080">${k}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`).join("\n")}
</table>
<p style="font:14px/1.6 -apple-system,'PingFang SC','Microsoft YaHei',sans-serif;margin:16px 0 4px;color:#5b7080">留言</p>
<div style="font:14px/1.7 -apple-system,'PingFang SC','Microsoft YaHei',sans-serif;white-space:pre-wrap;padding:12px 16px;background:#f2f7f8;border-radius:8px">${escapeHtml(message)}</div>
<p style="font:12px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif;color:#8a9aa6;margin-top:16px">来自 verkun.com 联系表单，直接回复即可联系对方。</p>`,
    });
  } catch (err) {
    console.error("[contact:v2] mail failed", err);
    return NextResponse.json({ ok: false, error: "mail_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
