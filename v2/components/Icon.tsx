const paths: Record<string, React.ReactNode> = {
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  o2: (
    <>
      <path d="M12 3s6 6.2 6 10.5A6 6 0 0 1 6 13.5C6 9.2 12 3 12 3Z" />
      <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
    </>
  ),
  sleep: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />,
  stress: <path d="M3 12h4l2-5 4 10 2-5h6" />,
  temp: (
    <>
      <path d="M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0Z" />
      <path d="M12 11v6" />
    </>
  ),
  run: (
    <>
      <circle cx="14" cy="4.5" r="1.8" />
      <path d="M7 21l3-6 3 2v5M10 15l1-5 4 2 3-1M8 9l3-1" />
    </>
  ),
  gesture: (
    <>
      <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M12 10V8.5a1.5 1.5 0 0 1 3 0V12M15 11a1.5 1.5 0 0 1 3 0v3a7 7 0 0 1-12.4 4.4L4 15.6a1.6 1.6 0 0 1 2.4-2l2.6 2.4" />
    </>
  ),
  battery: (
    <>
      <rect x="3" y="7" width="16" height="10" rx="2.5" />
      <path d="M21 10.5v3M7 10v4M10.5 10v4" />
    </>
  ),
  steps: <path d="M8 3c2 0 3 2.5 3 5s-1 4-3 4-3-1.5-3-4S6 3 8 3Zm8 6c2 0 3 2.5 3 5s-1 4-3 4-3-1.5-3-4 1-5 3-5ZM6 15h4v3a2 2 0 0 1-4 0v-3Zm8 6h4" />,
  camera: (
    <>
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  spark: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm6 12l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z" />,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  sync: (
    <>
      <path d="M20 8a8 8 0 0 0-14.3-2M4 4v4h4" />
      <path d="M4 16a8 8 0 0 0 14.3 2M20 20v-4h-4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6l8-3Z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  bowl: <path d="M3 11h18a9 9 0 0 1-18 0Zm5-3c0-2 1-3 2-4m3 4c0-2 1-3 2-4m-11 15h16" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  apple: (
    <path
      d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.9-.9-3.1-.8c-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.4-1-2.4-3.8ZM14.2 5.8c.6-.8 1.1-1.8 1-2.8-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.3Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  android: (
    <path
      d="M7 9h10v8a1.5 1.5 0 0 1-1.5 1.5H15V21a1 1 0 0 1-2 0v-2.5h-2V21a1 1 0 0 1-2 0v-2.5h-.5A1.5 1.5 0 0 1 7 17V9Zm-2.5 0a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0v-5a1 1 0 0 1 1-1Zm15 0a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0v-5a1 1 0 0 1 1-1ZM7.2 8a4.8 4.8 0 0 1 2.4-3.5L8.8 3.2a.3.3 0 0 1 .5-.3l.8 1.3a5 5 0 0 1 3.8 0l.8-1.3a.3.3 0 0 1 .5.3l-.8 1.3A4.8 4.8 0 0 1 16.8 8H7.2Zm2.8-1.8a.6.6 0 1 0 0-1.2.6.6 0 0 0 0 1.2Zm4 0a.6.6 0 1 0 0-1.2.6.6 0 0 0 0 1.2Z"
      fill="currentColor"
      stroke="none"
    />
  ),
};

export default function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name] ?? paths.spark}
    </svg>
  );
}
