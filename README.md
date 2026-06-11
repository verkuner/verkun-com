# Verkun — Enterprise AI Platform Website

Official marketing website for **Beijing Verkun Intelligent Technology Co., Ltd. (北京凡鲲智能科技有限公司)**, built with Next.js 16 and Tailwind CSS 4.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS 4 |
| Runtime | React 19 |

## Features

- **Bilingual (zh / en)** — client-side language toggle with `localStorage` persistence via a React context (`LanguageProvider`)
- **Single-page layout** — Hero, About, Solutions, Technology, Stats, Contact, Footer sections
- **News & Insights** — static blog posts with individual `[slug]` pages
- **Careers** — open positions page with department filtering
- **Contact form** — API route at `/api/contact`

## Project Structure

```
app/
  page.tsx              # Home page (all sections)
  globals.css
  layout.tsx
  news/
    page.tsx            # News listing
    [slug]/page.tsx     # Individual article
  careers/page.tsx
  api/contact/route.ts  # Contact form endpoint
components/
  Navbar.tsx
  Hero.tsx
  About.tsx
  Solutions.tsx
  Technology.tsx
  Stats.tsx
  Contact.tsx / ContactForm.tsx
  Footer.tsx
  NewsArticle.tsx
  NeuralOrb.tsx
  Reveal.tsx
lib/
  dictionary.ts         # All UI strings in zh + en
  i18n.tsx              # LanguageProvider + useLang hook
  data.ts               # Blog posts + job listings
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Internationalization

All copy lives in [lib/dictionary.ts](lib/dictionary.ts). To add a new language, extend the `Lang` type in [lib/dictionary.ts](lib/dictionary.ts) and add a matching key to the `dictionary` object.

## Contact

- Email: contact@verkun.com
- Business: bd@verkun.com
- Address: Zhongguancun Sci-Park, Haidian, Beijing
