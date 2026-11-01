"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { COLOR_HEX } from "@/src/data/site";
import { TEAM } from "@/src/data/team";
import { MemberBadge } from "./MemberBadge";
import { cn } from "@/src/lib/utils";

export function TeamBoard() {
  const [active, setActive] = useState(0);
  const group = TEAM[active];
  const hex = COLOR_HEX[group.color];

  return (
    <section className="pb-16">
      <div className="shell">
        <div role="tablist" aria-label="Team groups" className="flex flex-wrap items-end justify-center gap-x-10 gap-y-4">
          {TEAM.map((g, i) => {
            const on = i === active;
            const c = COLOR_HEX[g.color];
            return (
              <button key={g.id} role="tab" aria-selected={on} onClick={() => setActive(i)} className="group relative pb-3">
                <span className={cn("font-display text-[clamp(1.6rem,3.6vw,2.8rem)] font-semibold tracking-[-0.03em] transition-colors duration-300", on ? "" : "text-white/30 group-hover:text-white/60")} style={on ? { color: c } : undefined}>
                  {g.title === "Our" ? g.accent : `${g.title} ${g.accent}`}
                </span>
                <sup className="ml-1 font-mono text-xs text-mist">{String(g.members.length).padStart(2, "0")}</sup>
                {on && (
                  <motion.span layoutId="team-underline" className="absolute inset-x-0 bottom-0 h-1 rounded-full" style={{ background: "var(--g-gradient)" }} transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.p key={group.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mx-auto mt-8 max-w-xl text-center text-ash">
            {group.lead}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div key={group.id} className="mt-12 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4" exit={{ opacity: 0, transition: { duration: 0.2 } }}>
            {group.members.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 70, rotateY: -35, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 110, damping: 16, delay: Math.min(i, 12) * 0.055 }}
                style={{ transformPerspective: 1200 }}
              >
                <MemberBadge member={m} color={hex} serial={`#${String(i + 1).padStart(2, "0")}`} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
