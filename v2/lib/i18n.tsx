"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { l, type L, type Lang } from "./l10n";

export { l, type L, type Lang };

type Ctx = { lang: Lang; toggle: () => void; tr: (s: L) => string };

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");

  // Chinese is the default for every new visit; an EN choice only lasts for the
  // current browsing session (sessionStorage), not forever.
  useEffect(() => {
    try {
      window.localStorage.removeItem("vk-lang"); // clear choices saved by earlier versions
      const saved = window.sessionStorage.getItem("vk-lang");
      if (saved === "zh" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    try {
      window.sessionStorage.setItem("vk-lang", lang);
    } catch {}
  }, [lang]);

  return (
    <LangContext.Provider
      value={{
        lang,
        toggle: () => setLang((p) => (p === "zh" ? "en" : "zh")),
        tr: (s) => s[lang],
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
