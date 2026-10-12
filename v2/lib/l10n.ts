// Plain (server-safe) localisation helpers, shared by data modules and client components.
export type Lang = "zh" | "en";
export type L = { zh: string; en: string };

export const l = (zh: string, en: string): L => ({ zh, en });
