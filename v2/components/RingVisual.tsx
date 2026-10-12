"use client";

import { useId } from "react";
import { finishes } from "@/lib/devices";

const ellipse = (cx: number, cy: number, rx: number, ry: number) =>
  `M${cx - rx},${cy} a${rx},${ry} 0 1,0 ${rx * 2},0 a${rx},${ry} 0 1,0 ${-rx * 2},0 Z`;

/** A smart ring rendered in 3/4 view, pure SVG so it stays crisp at any size. */
export default function RingVisual({
  finish = "black",
  className = "",
  shadow = true,
  sensor = true,
}: {
  finish?: string;
  className?: string;
  shadow?: boolean;
  sensor?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const f = finishes[finish] ?? finishes.black;
  const [a, b, c] = f.stops;

  return (
    <svg viewBox="0 0 300 320" className={className} role="img" aria-label={`${f.name.en} smart ring`}>
      <defs>
        <linearGradient id={`m${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="0.42" stopColor={b} />
          <stop offset="0.68" stopColor={c} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
        <linearGradient id={`i${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={f.inner} />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <radialGradient id={`g${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#34f5c5" stopOpacity="0.95" />
          <stop offset="1" stopColor="#34f5c5" stopOpacity="0" />
        </radialGradient>
        <filter id={`b${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {shadow && (
        <ellipse cx="152" cy="298" rx="78" ry="9" fill="#0f2230" opacity="0.16" filter={`url(#b${id})`} />
      )}

      {/* inner resin surface */}
      <path d={`${ellipse(160, 150, 72, 98)} ${ellipse(168, 150, 65, 91)}`} fill={`url(#i${id})`} fillRule="evenodd" />

      {/* sensor array on the inside of the band */}
      {sensor && (
        <g>
          <circle cx="95" cy="150" r="16" fill={`url(#g${id})`} />
          <rect x="91" y="128" width="7" height="10" rx="3" fill="#0b0d10" stroke="#3a4148" strokeWidth="0.8" />
          <rect x="91" y="145" width="7" height="10" rx="3" fill="#34f5c5" className="animate-vk-blink" />
          <rect x="91" y="162" width="7" height="10" rx="3" fill="#ff5d6c" opacity="0.85" />
        </g>
      )}

      {/* metal band */}
      <path d={`${ellipse(150, 150, 96, 122)} ${ellipse(160, 150, 72, 98)}`} fill={`url(#m${id})`} fillRule="evenodd" />

      {/* chamfer + specular highlights */}
      <path d={ellipse(150, 150, 96, 122)} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
      <path d="M72 82 Q50 150 74 222" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round" />
      <path d="M226 96 Q240 150 224 206" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
