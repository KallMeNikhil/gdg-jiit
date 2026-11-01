"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { usePointerFine } from "@/src/hooks/useMediaQuery";

export function TiltCard({ children, className = "", glow }: { children: ReactNode; className?: string; glow: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = usePointerFine();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 });
  const bg = useTransform([px, py], ([x, y]: number[]) => `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, ${glow}2e, transparent 60%)`);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: fine ? rx : 0, rotateY: fine ? ry : 0, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      className={`group relative overflow-hidden rounded-[2rem] glass [transform-style:preserve-3d] ${className}`}
    >
      <motion.div aria-hidden="true" style={{ background: bg }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative [transform:translateZ(40px)]">{children}</div>
    </motion.div>
  );
}
