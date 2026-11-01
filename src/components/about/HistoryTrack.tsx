"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { COLOR_HEX, HISTORY } from "@/src/data/site";
import { useDesktop } from "@/src/hooks/useMediaQuery";

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
    <div className="relative w-[22rem] shrink-0 pt-16">
      <motion.span style={{ background: dotBg, boxShadow: dotShadow, borderColor: hex }} className="absolute left-0 top-[1.15rem] h-5 w-5 rounded-full border-2" />
      <motion.div style={{ y: cardY, opacity: cardO }}>
        <p className="font-display text-6xl font-semibold tracking-[-0.05em]" style={{ color: hex }}>{item.year}</p>
        <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
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
    return -Math.max(t.scrollWidth - window.innerWidth * 0.62, 0) * v;
  });

  return (
    <div ref={ref} style={{ height: `${HISTORY.length * 60}vh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="relative flex gap-16 pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-[30vw]">
          <div className="absolute left-[max(2rem,calc((100vw-80rem)/2+2rem))] right-[30vw] top-[1.75rem] h-px bg-white/10">
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

function Stacked() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  return (
    <ol ref={ref} className="shell relative mt-12 space-y-12 pl-12">
      <div className="absolute bottom-0 left-[1.6rem] top-0 w-px bg-white/10 sm:left-[2.6rem]">
        <motion.div style={{ scaleY: fill, background: "linear-gradient(#4285f4,#ea4335,#fbbc04,#34a853)" }} className="h-full w-px origin-top" />
      </div>
      {HISTORY.map((h) => (
        <motion.li key={h.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }} className="relative">
          <span className="absolute -left-[1.85rem] top-3 h-3.5 w-3.5 rounded-full" style={{ background: COLOR_HEX[h.color], boxShadow: `0 0 20px ${COLOR_HEX[h.color]}` }} />
          <p className="font-display text-4xl font-semibold" style={{ color: COLOR_HEX[h.color] }}>{h.year}</p>
          <h3 className="mt-2 text-xl font-semibold">{h.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ash">{h.body}</p>
        </motion.li>
      ))}
    </ol>
  );
}

export function HistoryTrack() {
  const desktop = useDesktop();
  return desktop ? <Pinned /> : <Stacked />;
}
