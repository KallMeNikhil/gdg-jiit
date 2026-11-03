"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap } from "motion/react";
import { COLOR_HEX, type GoogleColor } from "@/src/data/site";
import { cn } from "@/src/lib/utils";

const ORDER: GoogleColor[] = ["blue", "red", "yellow", "green"];

function Spark({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.55em] w-[0.55em] shrink-0 animate-[spin_9s_linear_infinite]" style={{ color }}>
      <path d="M12 0c.9 6.4 5.6 11.1 12 12-6.4.9-11.1 5.6-12 12-.9-6.4-5.6-11.1-12-12C6.4 11.1 11.1 6.4 12 0Z" fill="currentColor" />
    </svg>
  );
}

function Band({ items, speed, tilt, variant, className = "", style }: { items: string[]; speed: number; tilt: number; variant: "display" | "mono"; className?: string; style?: React.CSSProperties }) {
  const reduced = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-1500, 0, 1500], [-4, 0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2000, 0, 2000], [8, 0, -8]);
  const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(1);
  const row = [...items, ...items, ...items, ...items];

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const f = factor.get();
    if (f < -0.05) dir.current = -1;
    else if (f > 0.05) dir.current = 1;
    base.set(base.get() + dir.current * speed * (delta / 1000) * (1 + Math.abs(f)));
  });

  return (
    <div className={cn("relative -mx-[5vw] overflow-hidden", variant === "display" ? "py-4 sm:py-5" : "py-2.5", className)} style={{ ...style, rotate: `${tilt}deg` }}>
      <motion.div style={{ x, skewX: variant === "display" ? skew : 0 }} className="flex w-max items-center will-change-transform">
        {row.map((item, i) => {
          const hex = COLOR_HEX[ORDER[i % 4]];
          if (variant === "mono") {
            return (
              <span key={`${item}-${i}`} className="flex items-center gap-4 pr-4 font-mono text-[0.7rem] font-medium uppercase tracking-[0.3em] text-ink sm:text-xs">
                <span>{item}</span>
                <span className="h-1 w-1 rounded-full bg-ink/60" />
              </span>
            );
          }
          const outline = i % 2 === 1;
          return (
            <span key={`${item}-${i}`} className="flex items-center gap-[0.45em] pr-[0.45em] font-display text-[clamp(2.2rem,6vw,4.6rem)] font-semibold leading-none tracking-[-0.045em]">
              <span
                className={cn(
                  "group/word relative inline-block cursor-default select-none transition-transform duration-500 ease-out hover:-translate-y-[0.06em] active:-translate-y-[0.06em]",
                  outline ? "text-transparent" : "text-bone",
                )}
                style={outline ? { backgroundImage: "linear-gradient(180deg, rgba(243,244,246,0.6), rgba(243,244,246,0.08))", WebkitBackgroundClip: "text", backgroundClip: "text" } : undefined}
              >
                {item}
                <span
                  aria-hidden="true"
                  className="flow-text absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/word:opacity-100 group-active/word:opacity-100"
                >
                  {item}
                </span>
              </span>
              <Spark color={hex} />
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const half = Math.ceil(items.length / 2);
  const words = [...items.slice(half), ...items.slice(0, half)];

  return (
    <section aria-label="What we work with" className="relative overflow-hidden pb-20 pt-12 sm:pb-28 sm:pt-16">
      <div className="relative">
        <div className="absolute inset-x-0 top-[78%] -translate-y-1/2">
          <Band items={words} speed={-1.6} tilt={4} variant="mono" style={{ background: "linear-gradient(90deg, #4285f4, #ea4335 35%, #fbbc04 65%, #34a853)" }} />
        </div>
        <Band
          items={items}
          speed={2.2}
          tilt={-2}
          variant="display"
          className="border-y border-white/10 bg-[#0b0d12] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]"
        />
      </div>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
