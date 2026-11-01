"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

export function Highlight({ children, color, delay = 0 }: { children: ReactNode; color: string; delay?: number }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <motion.span
        aria-hidden="true"
        className="absolute -inset-x-1.5 bottom-[0.06em] top-[0.42em] origin-left rounded-[0.35em]"
        style={{ background: `${color}40` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.span
        className="relative"
        initial={{ color: "#f3f4f6" }}
        whileInView={{ color }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {children}
      </motion.span>
    </span>
  );
}
