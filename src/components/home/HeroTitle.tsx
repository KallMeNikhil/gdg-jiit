"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const LINE = Array.from("Google Developer");
const WAVE = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];

export function HeroTitle({ play }: { play: boolean }) {
  let n = 0;
  return (
    <h1 aria-label="Google Developer Groups JIIT" className="text-[clamp(2.7rem,8.8vw,8rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
      <span aria-hidden="true" className="block whitespace-nowrap text-bone">
        {LINE.map((ch, i) => {
          if (ch === " ") return <span key={i}>&nbsp;</span>;
          const k = n++;
          return (
            <motion.span
              key={i}
              className="inline-block cursor-default"
              initial={{ y: "-110%", opacity: 0, rotate: -10 }}
              animate={play ? { y: 0, opacity: 1, rotate: 0 } : undefined}
              transition={{ type: "spring", stiffness: 380, damping: 15, delay: 0.15 + k * 0.045 }}
              whileHover={{ y: -16, rotate: k % 2 ? 8 : -8, transition: { type: "spring", stiffness: 500, damping: 10 } }}
              whileTap={{ y: -14, rotate: k % 2 ? 10 : -10, scale: 1.08, transition: { type: "spring", stiffness: 500, damping: 10 } }}
            >
              <span
                className="inline-block"
                style={{ ["--wc" as string]: WAVE[k % 4], animation: play ? `letter-wave 6s ease-in-out ${1.4 + k * 0.09}s infinite` : undefined }}
              >
                {ch}
              </span>
            </motion.span>
          );
        })}
      </span>
      <motion.span
        aria-hidden="true"
        className="sweep-text block whitespace-nowrap pb-[0.06em]"
        initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
        animate={play ? { opacity: 1, y: 0, clipPath: "inset(-20% -5% -20% -5%)" } : undefined}
        transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        Groups JIIT
      </motion.span>
    </h1>
  );
}

export function HeroMotto({ text, play }: { text: string; play: boolean }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!play) return;
    if (reduced) {
      const id = window.setTimeout(() => setCount(text.length), 0);
      return () => window.clearTimeout(id);
    }
    let i = 0;
    let timer = 0;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) window.clearInterval(timer);
      }, 55);
    }, 1500);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [play, reduced, text]);

  return (
    <p aria-label={text} className="mt-7 flex min-h-[1.4em] flex-wrap items-center justify-center text-center font-mono text-[clamp(0.8rem,3.4vw,1.55rem)] font-medium uppercase tracking-[0.2em] sm:mt-8 sm:h-[1.4em] sm:tracking-[0.28em]">
      <span aria-hidden="true" className="flow-text">{text.slice(0, count)}</span>
      <span aria-hidden="true" className="ml-1 inline-block h-[1.1em] w-[3px] animate-blink rounded-full" style={{ background: "linear-gradient(#4285f4, #ea4335, #fbbc04, #34a853)" }} />
    </p>
  );
}
