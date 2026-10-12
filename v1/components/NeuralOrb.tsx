export default function NeuralOrb() {
  const rings = [
    { r: 120, dur: "22s", dir: "" },
    { r: 170, dur: "30s", dir: "reverse" },
    { r: 220, dur: "40s", dir: "" },
  ];
  const nodes = [
    { cx: 250, cy: 130 },
    { cx: 380, cy: 200 },
    { cx: 360, cy: 320 },
    { cx: 230, cy: 380 },
    { cx: 110, cy: 300 },
    { cx: 130, cy: 170 },
  ];

  return (
    <div className="relative mx-auto flex h-[360px] w-full max-w-xl items-center justify-center sm:h-[460px]">
      <div className="absolute h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
      <svg
        viewBox="0 0 500 500"
        className="h-full w-full max-w-[460px]"
        aria-hidden
      >
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="45%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </radialGradient>
          <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* orbital rings */}
        {rings.map((ring, i) => (
          <g
            key={i}
            className="animate-spin-slow"
            style={{
              transformOrigin: "250px 250px",
              animationDuration: ring.dur,
              animationDirection: ring.dir,
            }}
          >
            <circle
              cx="250"
              cy="250"
              r={ring.r}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="3 8"
            />
            <circle
              cx={250 + ring.r}
              cy="250"
              r="4"
              fill="#38bdf8"
            />
          </g>
        ))}

        {/* connecting lines */}
        {nodes.map((n, i) => (
          <line
            key={`l-${i}`}
            x1="250"
            y1="250"
            x2={n.cx}
            y2={n.cy}
            stroke="url(#line)"
            strokeWidth="1.5"
          />
        ))}

        {/* outer nodes */}
        {nodes.map((n, i) => (
          <g key={`n-${i}`}>
            <circle cx={n.cx} cy={n.cy} r="14" fill="#101427" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx={n.cx} cy={n.cy} r="5" fill="#38bdf8">
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="2.5s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* core */}
        <circle cx="250" cy="250" r="46" fill="url(#core)" />
        <circle cx="250" cy="250" r="46" fill="none" stroke="#bae6fd" strokeOpacity="0.6">
          <animate attributeName="r" values="46;70;46" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        <text
          x="250"
          y="258"
          textAnchor="middle"
          className="fill-[#05060f] font-black"
          style={{ fontSize: "26px" }}
        >
          AI
        </text>
      </svg>
    </div>
  );
}
