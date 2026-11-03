"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

const COLORS = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];

type Props = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
};

export function SectionHeading({ index, eyebrow, title, lead, className }: Props) {
  const color = COLORS[(Number(index) - 1 + 4) % 4] ?? COLORS[0];
  return (
    <div className={cn("mx-auto flex max-w-3xl flex-col items-center text-center", className)}>
      <motion.span
        initial={{ opacity: 0, letterSpacing: "0.6em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.32em" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 font-mono text-[0.74rem] font-medium uppercase"
        style={{ color }}
      >
        <span className="text-mist">{index}</span>
        <span>{eyebrow}</span>
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 40, rotateX: -35, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 900 }}
        className="mt-6 text-balance text-[clamp(2.1rem,5.4vw,4.2rem)] font-semibold"
      >
        {title}
      </motion.h2>
      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 max-w-xl text-pretty leading-relaxed text-ash"
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
}
