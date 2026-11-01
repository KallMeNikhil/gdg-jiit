"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function parts(target: number) {
  const diff = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown({ date }: { date: string }) {
  const target = new Date(`${date}T09:00:00`).getTime();
  const [t, setT] = useState<ReturnType<typeof parts> | null>(null);

  useEffect(() => {
    const tick = () => setT(parts(target));
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [target]);

  const cells = t ? [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ] : [];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-live="off">
      {cells.map((c) => (
        <div key={c.label} className="rounded-2xl border border-white/10 bg-ink/60 px-2 py-4 text-center">
          <div className="relative h-[1.1em] overflow-hidden font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-none tabular-nums">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={c.value} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="block">
                {String(c.value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="kicker mt-2 !text-[0.62rem]">{c.label}</p>
        </div>
      ))}
    </div>
  );
}
