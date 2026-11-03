const BARS = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];

export function Emblem({ word, color, seed = 0, className = "" }: { word: string; color: string; seed?: number; className?: string }) {
  const lift = 4 + ((seed * 7) % 8);
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden ${className}`}
      style={{ background: `radial-gradient(110% 80% at 85% 110%, ${color}40, transparent 62%), linear-gradient(160deg, rgba(255,255,255,0.045), rgba(255,255,255,0))` }}
    >
      <div
        className="absolute inset-0 opacity-70 [mask-image:linear-gradient(200deg,#000_10%,transparent_75%)]"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1.2px)", backgroundSize: "14px 14px" }}
      />
      <div className="absolute bottom-5 right-5 flex items-end gap-1">
        {BARS.map((c, i) => (
          <span
            key={c}
            className="w-1.5 rounded-full transition-[height] duration-500 ease-out"
            style={{ background: c, height: `${[10, 16, 7, 13][(i + seed) % 4]}px` }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 h-px opacity-60" style={{ top: `${46 + (seed % 3) * 6}%`, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      <div className="absolute -left-[0.04em] font-display text-[clamp(5.2rem,9vw,7.5rem)] font-bold leading-[0.8] tracking-[-0.07em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-active:translate-x-3" style={{ bottom: `-${lift / 100}em` }}>
        <span
          className="block text-transparent"
          style={{ backgroundImage: `linear-gradient(180deg, ${color}cc 0%, ${color}38 55%, ${color}08 100%)`, WebkitBackgroundClip: "text", backgroundClip: "text" }}
        >
          {word}
        </span>
        <span
          className="absolute inset-0 block text-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100"
          style={{ backgroundImage: `linear-gradient(100deg, ${color}, #f3f4f6 70%)`, WebkitBackgroundClip: "text", backgroundClip: "text" }}
        >
          {word}
        </span>
      </div>
    </div>
  );
}
