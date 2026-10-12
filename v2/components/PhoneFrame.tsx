/** Generic phone bezel used for the app mockups. */
export default function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative w-[300px] rounded-[48px] bg-[#0b0d10] p-3 shadow-[0_40px_80px_-30px_rgba(15,34,48,0.55)] ${className}`}>
      <div className="absolute left-1/2 top-3 z-10 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-[#0b0d10]" />
      <div className="overflow-hidden rounded-[38px] bg-canvas">
        <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-ink">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-3 rounded-sm bg-ink/80" />
            <span className="h-2.5 w-5 rounded-[3px] border border-ink/70 p-[1px]">
              <span className="block h-full w-3/4 rounded-[1px] bg-mint" />
            </span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
