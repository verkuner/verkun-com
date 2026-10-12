# verkun.com

Website for **北京凡鲲智能科技有限公司 (Beijing Verkun Intelligent Technology Co., Ltd.)**.

The repo holds two independent Next.js 16 apps:

| App | Served at | Port | What it is |
|---|---|---|---|
| [`v2/`](v2) | `https://verkun.com/` | 3000 | **Current site** — VK100 / VK35 Pro smart rings and the AI food-calorie app. Health-tech theme. |
| [`v1/`](v1) | `https://verkun.com/v1` | 3001 | **Archived** first-generation enterprise-AI site (`basePath: "/v1"`). |

nginx terminates TLS and routes `/v1` → `:3001`, everything else → `:3000`.

## v2 pages

| Route | Page |
|---|---|
| `/` | Home — hero, ring family, 24h vitals dashboard, interactive AI meal-scan demo, energy balance, app download, contact |
| `/rings/vk100`, `/rings/vk35pro` | Product pages — finish & size picker, highlights, full specs, in-the-box |
| `/compare` | VK100 vs VK35 Pro comparison table |
| `/app` | AI nutrition app — scan demo, features, dashboard |
| `/api/contact` | Contact form endpoint (logs leads; wire up email/CRM here) |

Content lives in [`v2/lib/products.ts`](v2/lib/products.ts) (rings, specs, comparison rows, demo dishes), with every string in Chinese and English.

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
