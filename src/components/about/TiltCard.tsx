"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useLive } from "@/src/hooks/useLive";

export function TiltCard({ children, className = "", glow }: { children: ReactNode; className?: string; glow: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { fine, live } = useLive(ref);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 });
  const bg = useTransform([px, py], ([x, y]: number[]) => `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, ${glow}2e, transparent 60%)`);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (fine) return;
    px.set(0.5 + Math.sin(p * Math.PI * 2) * 0.22);
    py.set(1 - p);
  });

  return (
    <motion.div
      ref={ref}
      data-live={live}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (!fine) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        if (!fine) return;
        px.set(0.5);
        py.set(0.5);
      }}
      className={`group relative overflow-hidden rounded-[2rem] glass [transform-style:preserve-3d] ${className}`}
    >
      <motion.div aria-hidden="true" style={{ background: bg }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-live:opacity-100" />
      <div className="relative [transform:translateZ(40px)]">{children}</div>
    </motion.div>
  );
}
