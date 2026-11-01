"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotionPref } from "@/src/hooks/useMediaQuery";

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    if (window.location.hash) return;
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionPref();

  return (
    <MotionConfig reducedMotion="user">
      {reduced ? (
        children
      ) : (
        <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true }}>
          <ScrollReset />
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
