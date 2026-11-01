"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { COLOR_HEX } from "@/src/data/site";
import { TYPE_COLOR, isUpcoming, type ClubEvent } from "@/src/data/events";
import { TYPE_LABEL } from "./EventCard";

export function EventDrawer({ event, onClose }: { event: ClubEvent | null; onClose: () => void }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!event) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [event, onClose, lenis]);

  return (
    <AnimatePresence>
      {event && (
        <div className="fixed inset-0 z-[150] flex items-end justify-center p-3 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={event.title}>
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            layoutId={`event-${event.slug}`}
            className="glass relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem]"
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="relative aspect-[16/8] overflow-hidden">
              <motion.div layoutId={`event-img-${event.slug}`} className="absolute inset-0">
                <Image src={event.image} alt={event.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-soft via-ink-soft/10 to-transparent" />
              <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-md transition-colors hover:bg-black/70">
                <X size={18} />
              </button>
            </div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.15, duration: 0.4 }} className="p-7 sm:p-9">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full px-3 py-1 font-mono text-[0.7rem] uppercase tracking-widest" style={{ background: `${COLOR_HEX[TYPE_COLOR[event.type]]}26`, color: COLOR_HEX[TYPE_COLOR[event.type]] }}>
                  {TYPE_LABEL[event.type]}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-widest text-ash">{event.season}</span>
                {event.date && (
                  <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-widest text-ash">
                    {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                )}
                {isUpcoming(event) && <span className="rounded-full bg-g-green/20 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-widest text-g-green">Upcoming</span>}
              </div>
              <h3 className="mt-5 text-4xl font-semibold sm:text-5xl">{event.title}</h3>
              <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-ash">{event.summary}</p>
              {event.href && (
                <Link href={event.href} className="mt-7 inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink transition-shadow hover:shadow-[0_0_30px_-4px_rgba(66,133,244,0.7)]">
                  Open event page <ArrowUpRight size={15} />
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
