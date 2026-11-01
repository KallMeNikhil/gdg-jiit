"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { CtaButton } from "../components/ui/CtaButton";

export default function NotFound() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const layers = [
    { color: "#4285f4", depth: 34 },
    { color: "#ea4335", depth: 22 },
    { color: "#fbbc04", depth: 12 },
    { color: "#34a853", depth: 4 },
  ];
  const x0 = useTransform(sx, (v) => v * layers[0].depth);
  const y0 = useTransform(sy, (v) => v * layers[0].depth);
  const x1 = useTransform(sx, (v) => v * layers[1].depth);
  const y1 = useTransform(sy, (v) => v * layers[1].depth);
  const x2 = useTransform(sx, (v) => v * layers[2].depth);
  const y2 = useTransform(sy, (v) => v * layers[2].depth);
  const x3 = useTransform(sx, (v) => v * layers[3].depth);
  const y3 = useTransform(sy, (v) => v * layers[3].depth);
  const offsets = [
    { x: x0, y: y0 },
    { x: x1, y: y1 },
    { x: x2, y: y2 },
    { x: x3, y: y3 },
  ];

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="noise relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-24 text-center"
    >
      <div className="relative h-[clamp(9rem,30vw,20rem)] w-full max-w-4xl select-none" aria-hidden="true">
        {layers.map((l, i) => (
          <motion.p
            key={l.color}
            style={{ x: offsets[i].x, y: offsets[i].y, color: l.color, WebkitTextStroke: i === layers.length - 1 ? undefined : `1px ${l.color}` }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: i === layers.length - 1 ? 1 : 0.35, scale: 1 }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 flex items-center justify-center font-display text-[clamp(9rem,30vw,20rem)] font-bold leading-none tracking-[-0.08em] ${i === layers.length - 1 ? "" : "!text-transparent"}`}
          >
            404
          </motion.p>
        ))}
      </div>
      <p className="kicker mt-6">Error 404 · Route not found</p>
      <h1 className="mt-5 max-w-2xl text-balance text-[clamp(2rem,5vw,3.6rem)] font-semibold">This branch was never merged.</h1>
      <p className="mt-4 max-w-md text-ash">The page you are looking for moved, was renamed or never existed. Even the best developers take a wrong turn sometimes.</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <CtaButton href="/" variant="blue">Back to home</CtaButton>
        <CtaButton href="/events" variant="ghost">Browse events</CtaButton>
      </div>
    </section>
  );
}
