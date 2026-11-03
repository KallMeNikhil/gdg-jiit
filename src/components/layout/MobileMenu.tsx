"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUpRight, Facebook, Github, Instagram, MessageCircle, Twitter, Youtube } from "lucide-react";
import { SITE, SOCIALS } from "@/src/data/site";
import { cn } from "@/src/lib/utils";
import { CtaButton } from "../ui/CtaButton";

const COLORS = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];
const SOCIAL_ICONS = { Instagram, YouTube: Youtube, Discord: MessageCircle, X: Twitter, GitHub: Github, Facebook } as const;
const ease = [0.16, 1, 0.3, 1] as const;
const BACKDROP = [
  "radial-gradient(60vmax 60vmax at 0% 0%, rgba(66,133,244,0.28), transparent 60%)",
  "radial-gradient(55vmax 55vmax at 100% 30%, rgba(234,67,53,0.2), transparent 60%)",
  "radial-gradient(55vmax 55vmax at 0% 85%, rgba(251,188,4,0.16), transparent 60%)",
  "radial-gradient(60vmax 60vmax at 100% 100%, rgba(52,168,83,0.22), transparent 60%)",
  "#07080b",
].join(", ");

const DOTS = [
  { closed: { x: -5, y: -5, scaleX: 1, scaleY: 1 }, open: { x: 0, y: -5, scaleX: 0.6, scaleY: 1.5 } },
  { closed: { x: 5, y: -5, scaleX: 1, scaleY: 1 }, open: { x: 5, y: 0, scaleX: 1.5, scaleY: 0.6 } },
  { closed: { x: 5, y: 5, scaleX: 1, scaleY: 1 }, open: { x: 0, y: 5, scaleX: 0.6, scaleY: 1.5 } },
  { closed: { x: -5, y: 5, scaleX: 1, scaleY: 1 }, open: { x: -5, y: 0, scaleX: 1.5, scaleY: 0.6 } },
];

export function MenuToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className="g-edge edge-2 relative flex h-12 w-12 items-center justify-center rounded-full [--edge-opacity:0.9] active:scale-95"
      style={{
        background: "linear-gradient(140deg, rgba(66,133,244,0.18), rgba(234,67,53,0.1) 40%, rgba(52,168,83,0.16)), rgba(14,16,22,0.6)",
        backdropFilter: "blur(18px) saturate(180%)",
        WebkitBackdropFilter: "blur(18px) saturate(180%)",
        boxShadow: "0 12px 32px -14px rgba(66,133,244,0.6), inset 0 1px 0 rgba(255,255,255,0.12)",
        transition: "transform 0.2s",
      }}
    >
      <motion.span className="relative block h-6 w-6" initial={false} animate={{ rotate: open ? 45 : 0 }} transition={{ type: "spring", stiffness: 320, damping: 28 }}>
        {DOTS.map((d, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 -ml-[3.5px] -mt-[3.5px] h-[7px] w-[7px] rounded-full"
            style={{ background: COLORS[i] }}
            initial={false}
            animate={open ? d.open : d.closed}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
          />
        ))}
      </motion.span>
    </button>
  );
}

export function MobileMenu({ open, onClose, items, isActive }: { open: boolean; onClose: () => void; items: { label: string; href: string }[]; isActive: (href: string) => boolean }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[105] overflow-hidden md:hidden"
          style={{ background: BACKDROP }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeOut" } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-40" />

          <div className="safe-b relative flex h-full flex-col px-6 pt-24">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.45, ease }} className="flex items-center gap-3">
              <span className="g-dots [--dot:6px]">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="kicker">Navigate</span>
            </motion.p>

            <nav aria-label="Mobile" className="mt-6 flex-1">
              <ul className="space-y-1">
                {items.map((item, i) => {
                  const c = COLORS[i % 4];
                  const active = isActive(item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.045, duration: 0.5, ease }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className="group relative flex items-center gap-4 rounded-2xl py-2.5 transition-transform active:scale-[0.98]"
                      >
                        <span className="w-7 font-mono text-[0.7rem] tracking-[0.2em]" style={{ color: c }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn("font-display text-[clamp(2.1rem,11vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.04em] transition-colors", active ? "" : "text-bone/75 group-active:text-bone")}
                          style={active ? { color: c } : undefined}
                        >
                          {item.label}
                        </span>
                        {active ? (
                          <span className="ml-auto h-2.5 w-2.5 rounded-full" style={{ background: c, boxShadow: `0 0 16px ${c}` }} />
                        ) : (
                          <ArrowUpRight size={20} className="ml-auto text-mist transition-transform group-active:-translate-y-0.5 group-active:translate-x-0.5" />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5, ease }} className="space-y-6 pb-2">
              <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }} />
              <div className="flex items-center justify-between gap-4">
                <CtaButton href="/join" onClick={onClose} variant="blue">Join us</CtaButton>
                <ul className="flex flex-wrap justify-end gap-2">
                  {SOCIALS.slice(0, 4).map((s) => {
                    const Icon = SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS];
                    return (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={s.label}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-ash transition-colors active:text-bone"
                        >
                          <Icon size={16} style={{ color: s.color }} />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <p className="text-center font-mono text-[0.68rem] uppercase tracking-[0.25em] text-mist">{SITE.motto}</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
