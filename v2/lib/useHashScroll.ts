"use client";

import { useEffect } from "react";

/**
 * On a fresh load of /page#section the browser jumps before client components
 * settle, so re-scroll to the hash target once the page has hydrated.
 */
export function useHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: "start" }), 120);
    return () => clearTimeout(t);
  }, []);
}
