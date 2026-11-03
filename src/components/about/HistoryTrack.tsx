"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { COLOR_HEX, HISTORY } from "@/src/data/site";

type Item = (typeof HISTORY)[number];

function Milestone({ item, index, progress, total }: { item: Item; index: number; progress: MotionValue<number>; total: number }) {
  const hex = COLOR_HEX[item.color];
  const at = index / Math.max(total - 1, 1);
  const lit = useTransform(progress, [at - 0.08, at], [0, 1]);
  const dotBg = useTransform(lit, [0, 1], ["rgba(7,8,11,1)", hex]);
  const dotShadow = useTransform(lit, [0, 1], ["0 0 0 0 rgba(0,0,0,0)", `0 0 0 8px ${hex}22, 0 0 40px ${hex}`]);
  const cardY = useTransform(lit, [0, 1], [30, 0]);
  const cardO = useTransform(lit, [0, 1], [0.35, 1]);

  return (
    <div className="relative w-[min(76vw,20rem)] shrink-0 pt-16 sm:w-[22rem]">
      <motion.span style={{ background: dotBg, boxShadow: dotShadow, borderColor: hex }} className="absolute left-0 top-[1.15rem] h-5 w-5 rounded-full border-2" />
      <motion.div style={{ y: cardY, opacity: cardO }}>
        <p className="font-display text-5xl font-semibold tracking-[-0.05em] sm:text-6xl" style={{ color: hex }}>{item.year}</p>
        <h3 className="mt-4 text-xl font-semibold sm:mt-5 sm:text-2xl">{item.title}</h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-ash">{item.body}</p>
      </motion.div>
    </div>
  );
}

function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });
  const x = useTransform(p, (v) => {
    const t = trackRef.current;
    if (!t) return 0;
    return -Math.max(t.scrollWidth - window.innerWidth * (window.innerWidth < 640 ? 1 : 0.62), 0) * v;
  });

  return (
    <div ref={ref} style={{ height: `${HISTORY.length * 60}vh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="relative flex gap-10 pl-6 pr-6 sm:gap-16 sm:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] sm:pr-[30vw]">
          <div className="absolute left-6 right-6 top-[1.75rem] h-px bg-white/10 sm:left-[max(2rem,calc((100vw-80rem)/2+2rem))] sm:right-[30vw]">
            <motion.div style={{ scaleX: p, background: "var(--g-gradient)" }} className="h-px origin-left" />
          </div>
          {HISTORY.map((h, i) => (
            <Milestone key={h.title} item={h} index={i} progress={p} total={HISTORY.length} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function HistoryTrack() {
  return <Pinned />;
}
