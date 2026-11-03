"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { useLive } from "@/src/hooks/useLive";
import "./MagicCard.css";

interface MagicCardProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function MagicCard({
  children,
  className = "",
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
  gradientFrom = "#9E7AFF",
  gradientTo = "#FE8BBB",
}: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { fine, live } = useLive(ref);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const reset = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [gradientSize, mouseX, mouseY]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (fine) return;
    const el = ref.current;
    if (!el) return;
    const { offsetWidth: w, offsetHeight: h } = el;
    mouseX.set(w * (0.1 + 0.8 * p) + Math.sin(p * Math.PI * 2) * w * 0.08);
    mouseY.set(h * (1.1 - 1.2 * p));
  });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    if (fine) reset();
  }, [reset, fine]);

  useEffect(() => {
    if (!fine) return;
    const handleGlobalPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) reset();
    };

    const handleVisibility = () => {
      if (document.visibilityState !== "visible") reset();
    };

    window.addEventListener("pointerout", handleGlobalPointerOut);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("pointerout", handleGlobalPointerOut);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reset, fine]);

  return (
    <div
      ref={ref}
      data-live={live}
      className={`magic-card ${className}`}
      onPointerMove={fine ? handlePointerMove : undefined}
      onPointerDown={fine ? undefined : handlePointerMove}
      onPointerLeave={fine ? reset : undefined}
      onPointerEnter={fine ? reset : undefined}
    >
      <motion.div
        className="magic-card-border"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom},
            ${gradientTo},
            rgba(255,255,255,0.08) 100%)
          `,
        }}
      />

      <div className="magic-card-bg" />

      <motion.div
        className="magic-card-glow"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientColor}, transparent 100%)
          `,
          opacity: fine || live ? gradientOpacity : 0,
        }}
      />

      <div className="magic-card-content">{children}</div>
    </div>
  );
}
