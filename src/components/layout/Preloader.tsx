"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from "motion/react";
import { SITE } from "@/src/data/site";
import { useIntroDone } from "@/src/hooks/useIntroDone";

export const PRELOAD_KEY = "gdg:intro";
const HOLD_MS = 2200;
const COLORS = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>#*";
const ease = [0.16, 1, 0.3, 1] as const;
const RING = 2 * Math.PI * 92;

export const preloadScript = `try{if(sessionStorage.getItem("${PRELOAD_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="skip"}catch(e){}`;

const GLOWS = [
  { color: "rgba(66,133,244,0.4)", from: { x: "-30vw", y: "-24vh" }, to: { x: "-10vw", y: "-8vh" } },
  { color: "rgba(234,67,53,0.3)", from: { x: "30vw", y: "-22vh" }, to: { x: "10vw", y: "-7vh" } },
  { color: "rgba(251,188,4,0.24)", from: { x: "-28vw", y: "26vh" }, to: { x: "-9vw", y: "8vh" } },
  { color: "rgba(52,168,83,0.32)", from: { x: "30vw", y: "24vh" }, to: { x: "10vw", y: "8vh" } },
];

function Decode({ text, progress }: { text: string; progress: MotionValue<number> }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const settledRef = useRef(0);

  useEffect(() => {
    let tick = 0;
    const id = window.setInterval(() => {
      tick += 1;
      refs.current.forEach((el, i) => {
        if (!el || i < settledRef.current || text[i] === " ") return;
        el.textContent = GLYPHS[(i * 7 + tick * 5) % GLYPHS.length];
      });
    }, 70);
    return () => window.clearInterval(id);
  }, [text]);

  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.floor(Math.min(v * 1.25, 1) * text.length);
    if (next <= settledRef.current) return;
    for (let i = settledRef.current; i < next; i++) {
      const el = refs.current[i];
      if (!el) continue;
      el.textContent = text[i];
      el.style.color = "#f3f4f6";
    }
    settledRef.current = next;
  });

  return (
    <span aria-hidden="true" className="inline-flex flex-wrap justify-center">
      {Array.from(text).map((ch, i) =>
        ch === " " ? (
          <span key={i} className="w-[0.6em]" />
        ) : (
          <span
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="inline-block w-[0.72em] text-center"
            style={{ color: COLORS[i % 4] }}
          >
            {GLYPHS[(i * 7) % GLYPHS.length]}
          </span>
        ),
      )}
    </span>
  );
}

function Dot({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [i * 0.25, i * 0.25 + 0.05], [0.2, 1]);
  return <motion.circle cx="100" cy="8" r="2.5" fill={COLORS[i]} transform={`rotate(${i * 90} 100 100)`} style={{ opacity }} />;
}

export function Preloader() {
  const done = useIntroDone();
  const progress = useMotionValue(0);
  const offset = useTransform(progress, (v) => RING * (1 - v));
  const pct = useTransform(progress, (v) => String(Math.round(v * 100)).padStart(3, "0"));

  useEffect(() => {
    if (document.documentElement.dataset.intro === "skip") return;
    document.documentElement.dataset.intro = "play";
    const controls = animate(progress, 1, { duration: (HOLD_MS - 250) / 1000, ease: [0.33, 1, 0.68, 1] });
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(PRELOAD_KEY, "1");
      } catch {}
      document.documentElement.dataset.intro = "done";
      window.dispatchEvent(new Event("gdg:intro"));
    }, HOLD_MS);
    return () => {
      controls.stop();
      window.clearTimeout(timer);
    };
  }, [progress]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div role="status" aria-label={`Loading ${SITE.name}`} className="preloader fixed inset-0 z-[200] select-none overflow-hidden" exit={{ opacity: 1 }} transition={{ duration: 0.95 }}>
          <div aria-hidden="true" className="absolute inset-0 flex">
            {COLORS.map((c, i) => (
              <motion.span
                key={c}
                className="relative h-full flex-1 bg-ink will-change-transform"
                exit={{ y: "-100%" }}
                transition={{ duration: 0.75, delay: i * 0.07, ease: [0.76, 0, 0.24, 1] }}
              >
                <span className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 55%, ${c}14)` }} />
                <span className="absolute inset-x-0 bottom-0 h-[3px]" style={{ background: c, boxShadow: `0 0 18px ${c}` }} />
              </motion.span>
            ))}
          </div>

          <motion.div aria-hidden="true" exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0">
            {GLOWS.map((g, i) => (
              <motion.span
                key={g.color}
                className="absolute left-1/2 top-1/2 -ml-[28vmax] -mt-[28vmax] h-[56vmax] w-[56vmax] rounded-full will-change-transform"
                style={{ background: `radial-gradient(circle, ${g.color}, transparent 62%)` }}
                initial={{ x: g.from.x, y: g.from.y, opacity: 0 }}
                animate={{ x: g.to.x, y: g.to.y, opacity: 1 }}
                transition={{ duration: 2, delay: i * 0.05, ease }}
              />
            ))}
            <div className="grid-lines absolute inset-0 opacity-50 [mask-image:radial-gradient(circle_at_center,#000_10%,transparent_65%)]" />
          </motion.div>

          <motion.div exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }} className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="relative h-52 w-52 sm:h-64 sm:w-64 lg:h-80 lg:w-80">
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
                <defs>
                  <linearGradient id="preload-ring" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#4285f4" />
                    <stop offset="0.35" stopColor="#ea4335" />
                    <stop offset="0.65" stopColor="#fbbc04" />
                    <stop offset="1" stopColor="#34a853" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                <motion.circle cx="100" cy="100" r="92" fill="none" stroke="url(#preload-ring)" strokeWidth="3" strokeLinecap="round" strokeDasharray={RING} style={{ strokeDashoffset: offset }} />
                {COLORS.map((c, i) => (
                  <Dot key={c} i={i} progress={progress} />
                ))}
              </svg>
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease, delay: 0.1 }}
                className="absolute inset-[14%] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)" }}
              >
                <img src="/gdg-logo.gif" alt="" decoding="async" fetchPriority="high" className="h-full w-full object-contain" />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6, ease }}
              className="mt-10 max-w-[22rem] font-mono text-[0.78rem] font-medium uppercase tracking-[0.22em] sm:max-w-none sm:text-sm lg:mt-12 lg:text-base lg:tracking-[0.3em]"
            >
              <Decode text={SITE.motto} progress={progress} />
            </motion.p>
          </motion.div>

          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="safe-b absolute inset-x-0 bottom-0 px-6 sm:px-10"
          >
            <div className="flex items-end justify-between gap-4 font-mono text-[0.66rem] uppercase tracking-[0.28em] text-mist">
              <span className="hidden sm:inline">{SITE.campus}</span>
              <span className="sm:hidden">JIIT 128</span>
              <span className="font-display text-3xl font-semibold normal-case tracking-[-0.04em] text-bone tabular-nums sm:text-4xl">
                <motion.span>{pct}</motion.span>
                <span className="text-mist">%</span>
              </span>
            </div>
            <div className="mt-3 h-px w-full bg-white/10">
              <motion.div className="h-px origin-left" style={{ scaleX: progress, background: "var(--g-gradient)" }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
