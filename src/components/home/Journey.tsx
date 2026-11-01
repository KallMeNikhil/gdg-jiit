"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { COLOR_HEX, JOURNEY } from "@/src/data/site";
import { SectionHeading } from "../motion/SectionHeading";

const PATH = "M 500 0 C 500 100, 220 100, 220 200 S 780 330, 780 430 S 220 560, 220 660 S 500 760, 500 860";
const NODES = [
  { x: 220, y: 200 },
  { x: 780, y: 430 },
  { x: 220, y: 660 },
  { x: 500, y: 860 },
];

function Stop({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const step = JOURNEY[i];
  const hex = COLOR_HEX[step.color];
  const at = (i + 1) / (NODES.length + 0.2);
  const lit = useTransform(progress, [at - 0.06, at], [0, 1]);
  const scale = useTransform(lit, [0, 1], [0.6, 1]);
  const glow = useTransform(lit, [0, 1], ["0 0 0 0 rgba(0,0,0,0)", `0 0 0 10px ${hex}22, 0 0 44px ${hex}`]);
  const cardOpacity = useTransform(lit, [0, 1], [0.25, 1]);
  const cardX = useTransform(lit, [0, 1], [NODES[i].x > 500 ? 40 : -40, 0]);
  const right = NODES[i].x > 500;
  const last = i === NODES.length - 1;

  return (
    <div className="absolute" style={{ left: `${NODES[i].x / 10}%`, top: `${(NODES[i].y / 860) * 100}%` }}>
      <motion.span
        style={{ scale, boxShadow: glow, background: hex }}
        className="absolute left-0 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl font-mono text-sm font-semibold text-ink"
      >
        0{i + 1}
      </motion.span>
      <motion.div
        style={{ opacity: cardOpacity, x: cardX }}
        className={`glass absolute w-[min(22rem,40vw)] -translate-y-1/2 rounded-3xl p-6 ${last ? "left-1/2 top-16 -translate-x-1/2 translate-y-0 text-center" : right ? "right-12" : "left-12"}`}
      >
        <h3 className="text-xl font-semibold sm:text-2xl">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ash">{step.body}</p>
      </motion.div>
    </div>
  );
}

function Winding() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.7"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative mx-auto mt-16 hidden aspect-[1000/1080] max-w-4xl md:block">
      <svg viewBox="0 0 1000 860" className="absolute inset-0 h-[88%] w-full overflow-visible" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="journey-road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4285f4" />
            <stop offset="0.35" stopColor="#ea4335" />
            <stop offset="0.65" stopColor="#fbbc04" />
            <stop offset="1" stopColor="#34a853" />
          </linearGradient>
        </defs>
        <path d={PATH} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="22" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path d={PATH} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeDasharray="6 14" vectorEffect="non-scaling-stroke" />
        <motion.path d={PATH} fill="none" stroke="url(#journey-road)" strokeWidth="8" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: progress, filter: "drop-shadow(0 0 10px rgba(66,133,244,0.6))" }} />
      </svg>
      <div className="absolute inset-0 h-[88%]">
        {NODES.map((_, i) => (
          <Stop key={i} i={i} progress={progress} />
        ))}
      </div>
    </div>
  );
}

function Stacked() {
  return (
    <ol className="mt-12 space-y-4 md:hidden">
      {JOURNEY.map((s, i) => {
        const hex = COLOR_HEX[s.color];
        return (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass flex gap-4 rounded-3xl p-5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-mono text-sm font-semibold text-ink" style={{ background: hex, boxShadow: `0 0 24px ${hex}88` }}>
              0{i + 1}
            </span>
            <span>
              <span className="block text-lg font-semibold">{s.title}</span>
              <span className="mt-1 block text-sm text-ash">{s.body}</span>
            </span>
          </motion.li>
        );
      })}
    </ol>
  );
}

export function Journey() {
  return (
    <section id="journey" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="Your journey"
          title={<>From first session to <span className="g-text">core team.</span></>}
          lead="Every member's path looks a little different, but most of them travel this road."
        />
        <Winding />
        <Stacked />
      </div>
    </section>
  );
}
