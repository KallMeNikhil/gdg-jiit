"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const FONT: Record<string, string[]> = {
  G: ["01110", "10000", "10000", "10111", "10001", "10001", "01110"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  J: ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
  I: ["111", "010", "010", "010", "010", "010", "111"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  "1": ["010", "110", "010", "010", "010", "010", "111"],
  "2": ["01110", "10001", "00001", "00110", "01000", "10000", "11111"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
};

const WORDS = ["GDG", "JIIT", "128", "LEARN", "BUILD"];
const COLS = 34;
const ROWS = 9;
const PALETTE = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];

function layout(word: string) {
  const glyphs = Array.from(word).map((ch) => FONT[ch]);
  const width = glyphs.reduce((w, g) => w + g[0].length + 1, -1);
  const left = Math.floor((COLS - width) / 2);
  const cells = new Map<number, number>();
  let x = left;
  glyphs.forEach((g, gi) => {
    g.forEach((row, r) =>
      Array.from(row).forEach((bit, c) => {
        if (bit === "1") cells.set((r + 1) * COLS + x + c, gi % 4);
      }),
    );
    x += g[0].length + 1;
  });
  return cells;
}

export function PixelBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const reduced = useReducedMotion();
  const maps = useMemo(() => WORDS.map(layout), []);
  const [word, setWord] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("out");
  const [paint, setPaint] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!inView) return;
    const start = window.setTimeout(() => setPhase("in"), 80);
    if (reduced) return () => window.clearTimeout(start);
    const hold = window.setTimeout(() => setPhase("out"), 3600);
    const next = window.setTimeout(() => setWord((w) => (w + 1) % WORDS.length), 4500);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(hold);
      window.clearTimeout(next);
    };
  }, [inView, reduced, word]);

  useEffect(() => {
    const keys = Object.keys(paint);
    if (!keys.length) return;
    const t = window.setTimeout(() => {
      const now = Date.now();
      setPaint((p) => Object.fromEntries(Object.entries(p).filter(([, at]) => now - at < 900)));
    }, 300);
    return () => window.clearTimeout(t);
  }, [paint]);

  const lit = maps[word];

  const paintAt = (x: number, y: number) => {
    const el = document.elementFromPoint(x, y)?.closest<HTMLElement>("[data-cell]");
    if (!el || !ref.current?.contains(el)) return;
    const i = Number(el.dataset.cell);
    const now = Date.now();
    setPaint((p) => {
      const next = { ...p, [i]: now };
      for (const n of [i - 1, i + 1, i - COLS, i + COLS]) {
        if (n >= 0 && n < ROWS * COLS && Math.abs((n % COLS) - (i % COLS)) <= 1 && p[n] === undefined && Math.random() < 0.35) next[n] = now;
      }
      return next;
    });
  };

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Pixel board spelling ${WORDS.join(", ")}`}
      className="grid touch-none gap-[3px] sm:gap-[5px]"
      style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      onPointerDown={(e) => paintAt(e.clientX, e.clientY)}
      onPointerMove={(e) => paintAt(e.clientX, e.clientY)}
    >
      {Array.from({ length: ROWS * COLS }, (_, i) => {
        const r = Math.floor(i / COLS);
        const c = i % COLS;
        const colorIdx = lit.get(i);
        const on = colorIdx !== undefined && phase === "in";
        const painted = paint[i] !== undefined;
        const paintColor = PALETTE[(r + c) % 4];
        const delay = on ? c * 22 + r * 12 : ((c * 37 + r * 53) % 400);
        return (
          <span key={i} data-cell={i} className="relative aspect-square rounded-[3px] bg-white/[0.04]">
            <span
              className="absolute inset-0 rounded-[3px]"
              style={{
                background: on ? PALETTE[colorIdx!] : paintColor,
                opacity: on ? 1 : painted ? 0.75 : 0,
                transform: on ? "translateY(0) scale(1)" : painted ? "scale(0.9)" : `translateY(${colorIdx !== undefined ? -140 : 0}%) scale(${colorIdx !== undefined ? 0.6 : 0.3})`,
                boxShadow: on || painted ? `0 0 14px -2px ${on ? PALETTE[colorIdx!] : paintColor}` : "none",
                transition: painted && !on ? "opacity 0.15s, transform 0.15s" : `opacity 0.45s ${delay}ms, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}
