"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useIntroDone } from "@/src/hooks/useIntroDone";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = {
  kicker: string;
  title: ReactNode[];
  lead?: ReactNode;
  aside?: ReactNode;
};

export function PageHero({ kicker, title, lead, aside }: Props) {
  const play = useIntroDone();

  return (
    <section className="noise relative overflow-hidden pb-12 pt-32 text-center sm:pb-20 sm:pt-48">
      <div className="shell relative flex flex-col items-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={play ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.6, ease }} className="flex items-center gap-3">
          <span className="g-dots">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-ash">{kicker}</span>
        </motion.p>
        <h1 className="mt-7 text-[clamp(2.8rem,8.5vw,7rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          {title.map((line, i) => (
            <motion.span
              key={i}
              className="block"
              initial={{ opacity: 0, y: 50, scale: 0.92, filter: "blur(12px)" }}
              animate={play ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : undefined}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
            >
              {line}
            </motion.span>
          ))}
        </h1>
        {(lead || aside) && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={play ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.8, delay: 0.45, ease }} className="mt-8 flex flex-col items-center">
            {lead && <p className="max-w-2xl text-pretty text-lg leading-relaxed text-ash">{lead}</p>}
            {aside}
          </motion.div>
        )}
      </div>
    </section>
  );
}
