"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useLenis } from "lenis/react";

export type LightboxItem = {
  id: string;
  title: string;
  image: string;
  body: string;
  color: string;
  tags?: ReactNode;
  href?: string;
  hrefLabel?: string;
};

export function Lightbox({ item, onClose }: { item: LightboxItem | null; onClose: () => void }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!item) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose, lenis]);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[150] flex items-end justify-center p-3 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={item.title}>
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            className="glass relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem]"
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
          >
            <motion.div className="relative aspect-[16/8] overflow-hidden" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ delay: 0.12, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
              <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            </motion.div>
            <button type="button" onClick={onClose} aria-label="Close" className="glass absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full">
              <X size={18} />
            </button>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="p-7 sm:p-9">
              {item.tags && <div className="flex flex-wrap items-center gap-2">{item.tags}</div>}
              <h3 className="mt-5 text-4xl font-semibold sm:text-5xl">{item.title}</h3>
              <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-ash">{item.body}</p>
              {item.href && (
                <Link href={item.href} className="g-edge edge-2 mt-7 inline-flex h-12 items-center gap-2 rounded-2xl bg-white/[0.06] px-6 text-sm font-medium backdrop-blur-xl">
                  {item.hrefLabel ?? "Open"} <ArrowUpRight size={15} />
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
