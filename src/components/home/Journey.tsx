"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { COLOR_HEX, JOURNEY } from "@/src/data/site";
import { SectionHeading } from "../motion/SectionHeading";

const ROUTE = "M 40 575 C 70 560, 95 540, 120 520 C 210 450, 300 470, 370 405 C 450 335, 540 340, 610 280 C 690 215, 760 190, 820 130 C 845 105, 860 92, 885 80";
const STOPS = [
  { x: 120, y: 520 },
  { x: 370, y: 405 },
  { x: 610, y: 280 },
  { x: 885, y: 80 },
];
const CAMPS = ["Base camp", "Camp I", "Camp II", "Summit"];
const RIDGE_BACK = "M 0 600 L 0 420 L 120 360 L 210 395 L 330 280 L 430 330 L 560 190 L 650 250 L 760 120 L 860 60 L 940 110 L 1000 90 L 1000 600 Z";
const RIDGE_FRONT = "M 0 600 L 0 560 L 120 520 L 250 470 L 370 405 L 480 360 L 610 280 L 700 230 L 820 130 L 885 80 L 950 150 L 1000 190 L 1000 600 Z";
const SUMMIT = 2026;
const ease = [0.16, 1, 0.3, 1] as const;

function Flag({ i, progress, at }: { i: number; progress: MotionValue<number>; at: number }) {
  const hex = COLOR_HEX[JOURNEY[i].color];
  const lit = useTransform(progress, [at - 0.04, at], [0, 1]);
  const rise = useTransform(lit, [0, 1], [10, 0]);
  const glow = useTransform(lit, [0, 1], [0, 0.9]);
  const { x, y } = STOPS[i];

  return (
    <g>
      <motion.circle cx={x} cy={y} r={18} fill={hex} style={{ opacity: glow }} filter="url(#journey-blur)" />
      <circle cx={x} cy={y} r={6} fill="#07080b" stroke={hex} strokeWidth={2.5} />
      <motion.g style={{ opacity: lit, y: rise }}>
        <line x1={x} y1={y - 6} x2={x} y2={y - 48} stroke="rgba(243,244,246,0.7)" strokeWidth={2} strokeLinecap="round" />
        <path d={`M ${x} ${y - 48} L ${x + 26} ${y - 40} L ${x} ${y - 31} Z`} fill={hex} />
      </motion.g>
      <text x={x + 12} y={y + 26} fill="rgba(243,244,246,0.5)" fontSize={13} fontFamily="var(--font-jetbrains), monospace" letterSpacing="2">
        {String(i + 1).padStart(2, "0")}
      </text>
    </g>
  );
}

function Altimeter({ progress }: { progress: MotionValue<number> }) {
  const metres = useTransform(progress, (v) => Math.round(Math.min(Math.max(v, 0), 1) * SUMMIT).toString().padStart(4, "0"));
  return (
    <div className="flex items-center gap-3 lg:flex-col lg:items-end lg:gap-4">
      <span className="kicker !tracking-[0.3em]">Altitude</span>
      <div className="relative h-1 w-24 overflow-hidden rounded-full bg-white/10 lg:h-40 lg:w-1">
        <motion.div style={{ scaleX: progress, background: "var(--g-gradient)" }} className="absolute inset-0 origin-left rounded-full lg:hidden" />
        <motion.div style={{ scaleY: progress, background: "linear-gradient(0deg, #4285f4, #ea4335, #fbbc04, #34a853)" }} className="absolute inset-0 hidden origin-bottom rounded-full lg:block" />
      </div>
      <p className="font-mono text-sm tabular-nums text-bone">
        <motion.span>{metres}</motion.span>
        <span className="ml-1 text-mist">m</span>
      </p>
    </div>
  );
}

function Climb() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [fracs, setFracs] = useState([0.08, 0.36, 0.66, 1]);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const eased = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });
  const progress = useTransform(eased, [0.04, 0.86], [0, 1], { clamp: true });
  const cx = useMotionValue(STOPS[0].x);
  const cy = useMotionValue(575);
  const backY = useTransform(progress, [0, 1], [0, -26]);
  const glowX = useTransform(progress, [0, 1], ["15%", "85%"]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const next = STOPS.map(({ x, y }) => {
      let best = 0;
      let dist = Infinity;
      for (let l = 0; l <= total; l += 2) {
        const p = path.getPointAtLength(l);
        const d = (p.x - x) ** 2 + (p.y - y) ** 2;
        if (d < dist) {
          dist = d;
          best = l;
        }
      }
      return best / total;
    });
    const id = requestAnimationFrame(() => setFracs(next));
    return () => cancelAnimationFrame(id);
  }, []);

  useMotionValueEvent(progress, "change", (v) => {
    const path = pathRef.current;
    if (path) {
      const point = path.getPointAtLength(Math.min(Math.max(v, 0), 1) * path.getTotalLength());
      cx.set(point.x);
      cy.set(point.y);
    }
    let i = 0;
    fracs.forEach((f, k) => {
      if (v >= f - 0.04) i = k;
    });
    if (i !== active) setActive(i);
  });

  const step = JOURNEY[active];
  const hex = COLOR_HEX[step.color];

  return (
    <div ref={ref} style={{ height: `${JOURNEY.length * 75 + 60}vh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div aria-hidden="true" style={{ left: glowX, background: `radial-gradient(circle, ${hex}33, transparent 65%)` }} className="pointer-events-none absolute top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[background] duration-700" />

        <div className="shell relative grid w-full items-center gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)_auto] lg:gap-10">
          <div className="order-2 min-h-[15rem] lg:order-1 lg:min-h-[20rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={step.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45, ease }}>
                <p className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.3em]" style={{ color: hex }}>
                  <span className="h-px w-8" style={{ background: hex }} />
                  {CAMPS[active]}
                </p>
                <div className="mt-4 flex items-end gap-4">
                  <span className="font-display text-[clamp(4.5rem,9vw,8.5rem)] font-bold leading-[0.8] tracking-[-0.06em] text-transparent" style={{ WebkitTextStroke: `1.5px ${hex}` }}>
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="mb-2 font-mono text-xs text-mist">/ {String(JOURNEY.length).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-balance text-[clamp(1.7rem,3vw,2.6rem)] font-semibold">{step.title}</h3>
                <p className="mt-3 max-w-sm text-pretty leading-relaxed text-ash lg:text-lg">{step.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="order-1 lg:order-2">
            <svg viewBox="0 0 1000 600" className="h-auto w-full overflow-visible" aria-hidden="true">
              <defs>
                <linearGradient id="journey-route" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0" stopColor="#4285f4" />
                  <stop offset="0.35" stopColor="#34a853" />
                  <stop offset="0.65" stopColor="#fbbc04" />
                  <stop offset="1" stopColor="#ea4335" />
                </linearGradient>
                <linearGradient id="journey-ridge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="rgba(255,255,255,0.09)" />
                  <stop offset="1" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
                <filter id="journey-blur" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="8" />
                </filter>
              </defs>
              <motion.path d={RIDGE_BACK} fill="url(#journey-ridge)" opacity={0.6} style={{ y: backY }} />
              <path d={RIDGE_FRONT} fill="url(#journey-ridge)" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
              <path d={ROUTE} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={2} strokeDasharray="2 10" strokeLinecap="round" />
              <motion.path ref={pathRef} d={ROUTE} fill="none" stroke="url(#journey-route)" strokeWidth={5} strokeLinecap="round" style={{ pathLength: progress }} />
              {STOPS.map((_, i) => (
                <Flag key={i} i={i} progress={progress} at={fracs[i]} />
              ))}
              <motion.circle cx={cx} cy={cy} r={16} fill="#f3f4f6" opacity={0.25} filter="url(#journey-blur)" />
              <motion.circle cx={cx} cy={cy} r={7} fill="#f3f4f6" />
            </svg>
          </div>

          <div className="order-3 flex justify-start lg:justify-end">
            <Altimeter progress={progress} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Journey() {
  return (
    <section id="journey" className="relative pt-24 sm:pt-32">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="Your journey"
          title={<>From first session to <span className="g-text">core team.</span></>}
          lead="Every member climbs at their own pace. Scroll the route most of them take."
        />
      </div>
      <Climb />
    </section>
  );
}
