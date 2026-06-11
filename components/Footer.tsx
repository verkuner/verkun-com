"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

const groupHrefs = [
  ["/#solutions", "/#solutions", "/#solutions", "/#solutions"],
  ["/#about", "/#technology", "/news", "/careers"],
  ["#", "#", "#", "#"],
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-white/5 bg-[#05060f] px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-400 to-violet-500 text-lg font-black text-[#05060f]">
                凡
              </span>
              <span className="text-sm font-bold tracking-wide">
                北京凡鲲智能科技有限公司
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/45">
              {t.footer.desc}
            </p>
          </div>

          {t.footer.groups.map((g, gi) => (
            <div key={g.title}>
              <h4 className="text-sm font-semibold text-white/80">{g.title}</h4>
              <ul className="mt-4 space-y-3">
                {g.links.map((l, li) => (
                  <li key={l}>
                    <Link
                      href={groupHrefs[gi]?.[li] ?? "#"}
                      className="text-sm text-white/45 transition-colors hover:text-sky-300"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} 北京凡鲲智能科技有限公司 ·{" "}
            {t.footer.rights}
          </p>
          <p>{t.footer.icp}</p>
        </div>
      </div>
    </footer>
  );
}
