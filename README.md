# verkun.com

Website for **北京凡鲲智能科技有限公司 (Beijing Verkun Intelligent Technology Co., Ltd.)**.

The repo holds two independent Next.js 16 apps:

| App | Served at | Port | What it is |
|---|---|---|---|
| [`v2/`](v2) | `https://verkun.com/` | 3000 | **Current site** — the VERKUN Health App (manage your health from real vital signs, AI food-calorie recognition) and its devices (VK100 / VK35 Pro smart rings). Health-tech theme. |
| [`v1/`](v1) | `https://verkun.com/v1` | 3001 | **Archived** first-generation enterprise-AI site (`basePath: "/v1"`). |

nginx terminates TLS and routes `/v1` → `:3001`, everything else → `:3000`.

## v2 pages

| Route | Page |
|---|---|
| `/` | Home (App-first) — "用真实体征，管理你的健康": app dashboard hero, capture → understand → act loop, app features, vitals board, AI meal-scan demo, energy balance, devices, health-device positioning, download, contact |
| `/app` | App deep-dive with anchors `#vitals` `#sleep` `#nutrition` `#energy` `#reports` `#download` |
| `/devices` | Devices hub — every device grouped by category, plus `#compare` table |
| `/devices/vk100`, `/devices/vk35pro` | Device pages — finish & size picker, highlights, specs, in-the-box |
| `/api/contact` | Contact form endpoint (logs leads; wire up email/CRM here) |

Device content lives in [`v2/lib/devices.ts`](v2/lib/devices.ts). **Adding a device:** append it to `devices`; for a new kind of device (e.g. a watch), add a `categories` entry too — the 智能设备 nav menu, footer, devices hub and static pages all pick it up automatically. Every string is bilingual (zh/en).

Positioning: VERKUN devices and the app are **health (wellness) devices, not medical devices** — copy avoids diagnostic or medical-grade claims, and the footer/`HealthDeviceNote` say so explicitly.

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
