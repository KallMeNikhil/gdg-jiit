import type { LucideIcon } from "lucide-react";

const RING = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];

export function Emblem({ icon: Icon, color, seed = 0, className = "" }: { icon: LucideIcon; color: string; seed?: number; className?: string }) {
  const tilt = (seed * 37) % 360;
  return (
    <div aria-hidden="true" className={`relative overflow-hidden ${className}`} style={{ background: `radial-gradient(120% 90% at 50% 110%, ${color}38, transparent 60%), linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0))` }}>
      <div className="grid-lines absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_50%_55%,#000_10%,transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 h-0 w-0">
        {[150, 220, 290].map((size, i) => (
          <span
            key={size}
            className="absolute rounded-full border border-dashed transition-transform duration-[1.6s] ease-out group-hover:rotate-[60deg] group-live:rotate-[60deg]"
            style={{
              width: size,
              height: size,
              left: -size / 2,
              top: -size / 2,
              borderColor: `${RING[(i + seed) % 4]}55`,
              transform: `rotate(${tilt + i * 40}deg)`,
              animation: `spin ${26 + i * 10}s linear infinite ${i % 2 ? "reverse" : ""}`,
            }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full" style={{ background: RING[(i + seed) % 4], boxShadow: `0 0 12px ${RING[(i + seed) % 4]}` }} />
          </span>
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1.6rem] border border-white/15 bg-[#151821]/90 transition-transform duration-700 group-hover:scale-110 group-live:scale-110">
        <span className="absolute inset-0 rounded-[1.6rem] opacity-40 blur-xl" style={{ background: color }} />
        <Icon size={34} strokeWidth={1.6} className="relative" style={{ color }} />
      </div>
    </div>
  );
}
