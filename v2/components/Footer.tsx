"use client";

import Link from "next/link";
import { l, useLang } from "@/lib/i18n";
import { Logo } from "./Nav";
import { devices } from "@/lib/devices";

const groups = [
  {
    title: l("VERKUN Health App", "VERKUN Health App"),
    links: [
      { href: "/app", label: l("App 功能", "Features") },
      { href: "/app#vitals", label: l("体征看板", "Vitals dashboard") },
      { href: "/app#nutrition", label: l("AI 饮食识别", "AI nutrition") },
      { href: "/app#download", label: l("下载 App", "Download") },
    ],
  },
  {
    title: l("智能设备", "Devices"),
    links: [
      ...devices.map((d) => ({ href: `/devices/${d.slug}`, label: l(d.name, d.name) })),
      { href: "/devices", label: l("全部设备", "All devices") },
      { href: "/devices#compare", label: l("设备对比", "Compare") },
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
                  "用真实体征数据，管理你的健康。智能设备采集，App 分析与建议。",
                  "Manage your health with your real vital signs — captured by our devices, made useful by the app."
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
                  <li key={item.href + item.label.en}>
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
              "健康提示：VERKUN 智能设备（含 VK 系列智能戒指）与 VERKUN Health App 为健康设备及健康管理产品，非医疗器械，不用于疾病的诊断、治疗或预防。所提供的数据与建议仅供日常健康管理参考，不能替代专业医疗意见。如有身体不适，请及时就医。",
              "Health notice: VERKUN devices (including VK smart rings) and the VERKUN Health app are health and wellness products, not medical devices, and are not intended to diagnose, treat or prevent any disease. Data and suggestions support everyday self-care and do not replace professional medical advice. Please consult a doctor if you feel unwell."
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
