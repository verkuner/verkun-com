# verkun.com

Website for **北京凡鲲智能科技有限公司 (Beijing Verkun Intelligent Technology Co., Ltd.)**.

The repo holds two independent Next.js 16 apps:

| App | Served at | Port | What it is |
|---|---|---|---|
| [`v2/`](v2) | `https://verkun.com/` | 3000 | **Current site** — the VERKUN Health App (manage your health from real vital signs, AI food-calorie recognition) and its devices (VK100 / VK35 Pro smart rings). Health-tech theme. |
| [`v1/`](v1) | `https://verkun.com/v1` | 3001 | **Archived** first-generation enterprise-AI site (`basePath: "/v1"`). |

nginx terminates TLS and routes `/v1` → `:3001`, everything else → `:3000`.

## v2 pages

Navigation: **你的健康 Your Health ▾** (three chapters) · **智能设备 Devices ▾** · **联系我们 Contact**.

| Route | Page |
|---|---|
| `/` | Home — hero plus the three Your Health chapters, devices, download, contact |
| `/wear` | 01 · Wear your best life — the ring as an everyday companion ("a day with your ring") |
| `/understand` | 02 · Understand your body. Own your health. — what each vital means, personal baseline |
| `/health-radar` | 03 · Meet Health Radar — the app: vitals, sleep & recovery, AI calorie recognition, energy balance, guidance (`/app` redirects here) |
| `/devices` | Devices hub — every device by category, plus `#compare` |
| `/devices/vk100`, `/devices/vk35pro` | Device pages |
| `/api/contact` | Contact form endpoint — logs each lead and emails it to contact@verkun.com (see Mail below) |

The Your Health menu is defined once in [`v2/lib/nav.ts`](v2/lib/nav.ts). Device content lives in [`v2/lib/devices.ts`](v2/lib/devices.ts) — append to `devices` (and `categories` for a new kind of device) and the nav, footer, devices hub and static pages pick it up. Every string is bilingual (zh/en).

## Develop

```bash
cd v2 && npm install && npm run dev      # http://localhost:3000
cd v1 && npm install && npm run dev      # http://localhost:3000/v1
```

## Deploy

```bash
./scripts/deploy.sh          # build + release both apps from committed HEAD
./scripts/deploy.sh v2       # only v2
```

The script archives `HEAD`, builds on the VM in a staging directory, swaps the release in, and reloads pm2 via [`ecosystem.config.cjs`](ecosystem.config.cjs). The previous build is kept as `/opt/verkun-com/<app>.prev`.

## Mail (contact form)

v2's `/api/contact` emails every submission to `contact@verkun.com` (Reply-To = the visitor). It hands the message to **Postfix on the VM**, listening on `127.0.0.1:25` only, which relays it through **Feishu Mail** (`smtp.feishu.cn:465`, signed in as `contact@verkun.com`). Postfix queues and retries if Feishu is unreachable. Every lead is also written to `pm2 logs verkun-v2`.

- One-time server setup: `sudo bash scripts/setup-mail-relay.sh` (already done on the VM).
- Set / rotate the Feishu app password: `sudo verkun-mail-password` (prompts; stored root-only in `/etc/postfix/sasl_passwd`).
- Troubleshoot: `sudo tail -f /var/log/mail.log`, `mailq`, `sudo postqueue -f` (retry now).
- Recipient/sender are `MAIL_TO` / `MAIL_FROM` in `ecosystem.config.cjs`. Without `MAIL_TO` (local dev) leads are only logged.
