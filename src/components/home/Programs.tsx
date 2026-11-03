"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Images } from "lucide-react";
import { COLOR_HEX, PROGRAMS, type Program } from "@/src/data/site";
import { SectionHeading } from "../motion/SectionHeading";
import { Emblem } from "../ui/Emblem";
import { Lightbox, type LightboxItem } from "../ui/Lightbox";

const WORDS: Record<string, string> = {
  bitbox: "HACK",
  exploreml: "ML",
  "study-jams": "JAM",
  sessions: "TALK",
  meetups: "MEET",
};

function ProgramCard({ program, index, onOpen }: { program: Program; index: number; onOpen: (p: Program) => void }) {
  const hex = COLOR_HEX[program.color];
  return (
    <button type="button" onClick={() => onOpen(program)} className="glass group relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] text-left transition-transform duration-500 hover:-translate-y-1 active:scale-[0.98]">
      <div className="relative">
        <Emblem word={WORDS[program.slug] ?? "GDG"} color={hex} seed={index} className="aspect-[16/11]" />
        <span className="absolute left-6 top-6 font-mono text-[0.7rem] uppercase tracking-[0.25em]" style={{ color: hex }}>
          {program.kicker}
        </span>
        <span className="absolute right-6 top-4 font-display text-5xl font-semibold text-white/10">0{index + 1}</span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-[1.75rem] font-semibold sm:text-3xl">{program.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ash">{program.body}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-bone/70 transition-colors group-hover:text-bone">
          <Images size={15} style={{ color: hex }} /> See it in action
        </span>
      </div>
    </button>
  );
}

function PinnedTrack({ onOpen }: { onOpen: (p: Program) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  const x = useTransform(smooth, (v) => {
    const track = trackRef.current;
    if (!track) return 0;
    const overflow = track.scrollWidth - window.innerWidth + (window.innerWidth < 640 ? 20 : 80);
    return -Math.max(overflow, 0) * v;
  });

  return (
    <div ref={ref} style={{ height: `${PROGRAMS.length * 70}vh` }} className="relative mt-4 sm:mt-0">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex gap-4 pl-5 will-change-transform sm:gap-6 sm:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {PROGRAMS.map((p, i) => (
            <div key={p.slug} className="w-[min(80vw,24rem)] shrink-0 sm:w-[28rem]">
              <ProgramCard program={p} index={i} onOpen={onOpen} />
            </div>
          ))}
          <div className="w-1 shrink-0 sm:w-16" />
        </motion.div>
        <div className="shell mt-8 sm:mt-10">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div style={{ scaleX: smooth, background: "var(--g-gradient)" }} className="h-full origin-left rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Programs() {
  const [open, setOpen] = useState<LightboxItem | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const onOpen = (p: Program) =>
    setOpen({
      id: p.slug,
      title: p.title,
      image: p.image,
      body: p.body,
      color: COLOR_HEX[p.color],
      href: p.href,
      hrefLabel: "Explore BitBox",
      tags: (
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.25em]" style={{ color: COLOR_HEX[p.color] }}>
          {p.kicker}
        </span>
      ),
    });

  return (
    <section id="programs" className="relative pt-24 sm:pt-32">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Flagship programs"
          title={<>Where the <span className="g-text">magic</span> happens.</>}
          lead="From a weekend hackathon to a semester-long Study Jam - every program is built to get you building."
        />
      </div>
      <PinnedTrack onOpen={onOpen} />
      <Lightbox item={open} onClose={close} />
    </section>
  );
}
