"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { usePointerFine } from "@/src/hooks/useMediaQuery";
import { cn } from "@/src/lib/utils";

const INSET = 8;
const MIN_THUMB = 56;

export function ScrollRail() {
  const fine = usePointerFine();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [size, setSize] = useState({ view: 0, doc: 0 });
  const [awake, setAwake] = useState(false);
  const [drag, setDrag] = useState(false);
  const idle = useRef(0);
  const grab = useRef({ y: 0, scroll: 0 });
  const thumbY = useMotionValue(0);

  useEffect(() => {
    const measure = () => setSize({ view: window.innerHeight, doc: document.documentElement.scrollHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const track = Math.max(size.view - INSET * 2, 0);
  const max = Math.max(size.doc - size.view, 1);
  const thumb = Math.min(track, Math.max(MIN_THUMB, (size.view / Math.max(size.doc, 1)) * track));
  const room = Math.max(track - thumb, 1);
  const glow = useTransform(thumbY, (v) => `0 0 ${12 + (v / room) * 6}px rgba(66,133,244,0.45)`);

  useEffect(() => {
    thumbY.set((Math.min(Math.max(scrollY.get(), 0), max) / max) * room);
  }, [max, room, scrollY, thumbY]);

  useMotionValueEvent(scrollY, "change", (v) => {
    thumbY.set((Math.min(Math.max(v, 0), max) / max) * room);
    if (fine) return;
    if (!awake) setAwake(true);
    window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => setAwake(false), 1100);
  });

  useEffect(() => () => window.clearTimeout(idle.current), []);

  const scrollTo = (target: number) => {
    const y = Math.min(Math.max(target, 0), max);
    if (lenis) lenis.scrollTo(y, { immediate: true });
    else window.scrollTo(0, y);
  };

  if (size.doc <= size.view + 4) return null;

  const shown = fine || awake || drag;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "group fixed bottom-2 right-0 top-2 z-[90] flex w-4 touch-none justify-end pr-1 transition-opacity duration-500",
        shown ? "opacity-100" : "opacity-0",
        (!fine || !shown) && "pointer-events-none",
      )}
      onPointerDown={(e) => {
        if (!fine || (e.target as HTMLElement).dataset.thumb) return;
        const r = e.currentTarget.getBoundingClientRect();
        scrollTo(((e.clientY - r.top - thumb / 2) / room) * max);
      }}
    >
      <div className={cn("relative h-full rounded-full bg-white/[0.06] transition-[width] duration-300", drag ? "w-2" : "w-1 group-hover:w-2")}>
        <motion.div
          data-thumb="true"
          className={cn("absolute inset-x-0 top-0 cursor-grab rounded-full before:absolute before:-inset-x-3 before:inset-y-0 before:content-[''] active:cursor-grabbing", shown && "pointer-events-auto")}
          style={{ height: thumb, y: thumbY, boxShadow: glow, background: "linear-gradient(180deg, #4285f4, #ea4335 38%, #fbbc04 68%, #34a853)" }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.currentTarget.setPointerCapture(e.pointerId);
            grab.current = { y: e.clientY, scroll: scrollY.get() };
            setDrag(true);
          }}
          onPointerMove={(e) => {
            if (!drag) return;
            scrollTo(grab.current.scroll + ((e.clientY - grab.current.y) / room) * max);
          }}
          onPointerUp={(e) => {
            e.currentTarget.releasePointerCapture(e.pointerId);
            setDrag(false);
          }}
          onPointerCancel={() => setDrag(false)}
        />
      </div>
    </div>
  );
}
