"use client";

import Link from "next/link";
import { l, useLang } from "@/lib/i18n";
import { Logo } from "./Nav";

const groups = [
  {
    title: l("产品", "Products"),
    links: [
      { href: "/rings/vk100", label: l("VK100 智能戒指", "VK100 Smart Ring") },
      { href: "/rings/vk35pro", label: l("VK35 Pro 智能戒指", "VK35 Pro Smart Ring") },
      { href: "/compare", label: l("产品对比", "Compare rings") },
    ],
  },
  {
    title: l("App", "App"),
    links: [
      { href: "/app", label: l("AI 饮食热量识别", "AI calorie recognition") },
      { href: "/app#features", label: l("健康数据看板", "Health dashboard") },
      { href: "/app#download", label: l("下载 App", "Download") },
    ],
  },
  {
    title: l("公司", "Company"),
    links: [
      { href: "/#contact", label: l("联系我们", "Contact us") },
      { href: "/#contact", label: l("渠道与企业合作", "Retail & B2B") },
    ],
  },
];

export default function Footer() {
  const { tr } = useLang();
  return (
    <footer className="bg-graphite text-white">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-10 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              {tr(
                l(
                  "智能戒指 + AI 饮食分析，让健康管理轻到无感、准到可信。",
                  "Smart rings + AI nutrition — health tracking you barely notice and can truly trust."
                )
              )}
            </p>
            <p className="mt-6 text-sm text-white/70">北京凡鲲智能科技有限公司</p>
          </div>
          {groups.map((g) => (
            <div key={g.title.en}>
              <h4 className="text-sm font-semibold text-white/90">{tr(g.title)}</h4>
              <ul className="mt-4 space-y-3">
                {g.links.map((item) => (
                  <li key={item.label.en}>
                    <Link href={item.href} className="text-sm text-white/55 transition-colors hover:text-teal">
                      {tr(item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-white/45">
          {tr(
            l(
              "健康提示：VK 系列智能戒指及 App 为消费级健康管理产品，不属于医疗器械，所提供的数据与建议仅供参考，不能替代专业医疗诊断。如有身体不适，请及时就医。",
              "Health notice: VK smart rings and the app are consumer wellness products, not medical devices. Data and suggestions are for reference only and do not replace professional medical diagnosis. Please consult a doctor if you feel unwell."
            )
          )}
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} 北京凡鲲智能科技有限公司 · {tr(l("版权所有", "All rights reserved"))}</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className="hover:text-white/70">
              京ICP备2021007699号
            </a>
            {/* Plain anchor: /v1 is a separate app behind nginx, not a route of this one. */}
            <a href="/v1" className="hover:text-white/70">
              {tr(l("旧版网站 (v1)", "Previous site (v1)"))}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
