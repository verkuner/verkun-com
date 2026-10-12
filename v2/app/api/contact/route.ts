import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOPICS = new Set(["purchase", "retail", "corporate", "media", "other"]);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const field = (k: string) => String(body[k] ?? "").trim().slice(0, 2000);
  const name = field("name");
  const email = field("email");
  const phone = field("phone");
  const message = field("message");
  const topic = TOPICS.has(field("topic")) ? field("topic") : "other";

  // Honeypot: bots fill hidden fields; accept silently so they don't retry.
  if (field("website")) return NextResponse.json({ ok: true });

  const errors: Record<string, string> = {};
  if (!name) errors.name = "required";
  if (!EMAIL_RE.test(email)) errors.email = "invalid";
  if (!message) errors.message = "required";
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Leads land in the server log (pm2 logs verkun-v2). Hook up email/CRM delivery here.
  console.log("[contact:v2]", { topic, name, email, phone, message, at: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
