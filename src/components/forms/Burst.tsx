"use client";

import { motion } from "motion/react";

const COLORS = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];

export function Burst({ count = 28 }: { count?: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const dist = 120 + (i % 5) * 26;
        return (
          <motion.span
            key={i}
            className="absolute h-2.5 w-2.5 rounded-[3px]"
            style={{ background: COLORS[i % 4] }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
            animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist + 40, opacity: 0, scale: 1, rotate: 260 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}
    </div>
  );
}
