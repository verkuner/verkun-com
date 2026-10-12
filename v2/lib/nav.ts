import { l, type L } from "./l10n";

export type Chapter = { href: string; icon: string; tone: string; title: L; desc: L };

/** The three chapters of the "Your Health" menu, in order. */
export const yourHealth: Chapter[] = [
  {
    href: "/wear",
    icon: "heart",
    tone: "bg-heart-soft text-heart",
    title: l("戴上，更好的生活", "Wear your best life"),
    desc: l("一枚智能戒指，陪伴你的每个 24 小时", "A smart ring with you around the clock"),
  },
  {
    href: "/understand",
    icon: "chart",
    tone: "bg-sky-soft text-sky",
    title: l("读懂身体，掌控健康", "Understand your body. Own your health."),
    desc: l("用真实体征认识自己", "Know yourself through your real vitals"),
  },
  {
    href: "/health-radar",
    icon: "target",
    tone: "bg-teal-soft text-teal-deep",
    title: l("认识 Health Radar", "Meet Health Radar"),
    desc: l("你的健康管理 App", "Your health app"),
  },
];
