"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SITE } from "@/src/data/site";
import { useIntroDone } from "@/src/hooks/useIntroDone";

export const PRELOAD_KEY = "gdg:intro";
const HOLD_MS = 1900;
const COLORS = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];
const WORD = "GDG JIIT";

export const preloadScript = `try{if(sessionStorage.getItem("${PRELOAD_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="skip"}catch(e){}`;

export function Preloader() {
  const done = useIntroDone();

  useEffect(() => {
    if (document.documentElement.dataset.intro === "skip") return;
    document.documentElement.dataset.intro = "play";
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(PRELOAD_KEY, "1");
      } catch {}
      document.documentElement.dataset.intro = "done";
      window.dispatchEvent(new Event("gdg:intro"));
    }, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, []);

  let colorIndex = 0;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div role="status" aria-label={`Loading ${SITE.name}`} className="preloader fixed inset-0 z-[200] select-none" exit={{ opacity: 1 }} transition={{ duration: 0.9 }}>
          <div aria-hidden="true" className="absolute inset-0 flex">
            {COLORS.map((c, i) => (
              <motion.span
                key={c}
                className="relative h-full flex-1 bg-ink"
                exit={{ y: "-100%" }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.76, 0, 0.24, 1] }}
              >
                <span className="absolute inset-x-0 bottom-0 h-1" style={{ background: c }} />
              </motion.span>
            ))}
          </div>
          <motion.div exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ scale: 0.4, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 14 }}
              className="relative h-32 w-32"
            >
              <img src="/gdg-logo.gif" alt="" className="h-full w-full object-contain" />
            </motion.div>
            <p className="mt-8 flex font-display text-[clamp(2.6rem,9vw,5rem)] font-semibold leading-none tracking-[-0.04em]">
              {Array.from(WORD).map((ch, i) => {
                const color = ch === " " ? "#f3f4f6" : COLORS[colorIndex++ % 4];
                return (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: 40, opacity: 0, color }}
                    animate={{ y: 0, opacity: 1, color: "#f3f4f6" }}
                    transition={{ y: { delay: 0.25 + i * 0.05, type: "spring", stiffness: 300, damping: 18 }, opacity: { delay: 0.25 + i * 0.05 }, color: { delay: 0.9 + i * 0.04, duration: 0.5 } }}
                  >
                    {ch === " " ? " " : ch}
                  </motion.span>
                );
              })}
            </p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="g-dots mt-8 [--dot:12px]">
              <i />
              <i />
              <i />
              <i />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
