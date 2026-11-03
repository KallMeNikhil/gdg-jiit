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
const ORIGIN = "calc(100% - 2.5rem) 2.5rem";

const DOTS = [
  { closed: { x: -5, y: -5, width: 7, height: 7 }, open: { x: 0, y: -5.5, width: 4, height: 11 } },
  { closed: { x: 5, y: -5, width: 7, height: 7 }, open: { x: 5.5, y: 0, width: 11, height: 4 } },
  { closed: { x: 5, y: 5, width: 7, height: 7 }, open: { x: 0, y: 5.5, width: 4, height: 11 } },
  { closed: { x: -5, y: 5, width: 7, height: 7 }, open: { x: -5.5, y: 0, width: 11, height: 4 } },
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
      <motion.span className="relative block h-6 w-6" animate={{ rotate: open ? 45 : 0 }} transition={{ type: "spring", stiffness: 320, damping: 22 }}>
        {DOTS.map((d, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{ background: COLORS[i], translateX: "-50%", translateY: "-50%", boxShadow: `0 0 10px ${COLORS[i]}88` }}
            initial={false}
            animate={open ? d.open : d.closed}
            transition={{ type: "spring", stiffness: 380, damping: 24, delay: open ? i * 0.03 : 0 }}
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
          initial={{ clipPath: `circle(0% at ${ORIGIN})` }}
          animate={{ clipPath: `circle(150% at ${ORIGIN})` }}
          exit={{ clipPath: `circle(0% at ${ORIGIN})`, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-ink" />
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            {COLORS.map((c, i) => (
              <span
                key={c}
                className="absolute h-[70vmax] w-[70vmax] rounded-full opacity-70"
                style={{
                  background: `radial-gradient(circle, ${c}55, transparent 65%)`,
                  top: ["-30%", "10%", "55%", "30%"][i],
                  left: ["-40%", "45%", "-35%", "-10%"][i],
                  animation: `aurora-${"abcd"[i]} ${26 + i * 5}s ease-in-out infinite alternate`,
                }}
              />
            ))}
            <div className="grid-lines absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000_15%,transparent_75%)]" />
          </div>

          <div className="safe-b relative flex h-full flex-col px-6 pt-24">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.25, duration: 0.5, ease }} className="flex items-center gap-3">
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
                      initial={{ opacity: 0, y: 36, rotateX: -40 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: -16, transition: { duration: 0.2, delay: (items.length - i) * 0.02 } }}
                      transition={{ delay: 0.28 + i * 0.06, duration: 0.7, ease }}
                      style={{ transformPerspective: 700, transformOrigin: "50% 100%" }}
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
                          style={active ? { color: c, textShadow: `0 0 32px ${c}66` } : undefined}
                        >
                          {item.label}
                        </span>
                        {active ? (
                          <motion.span layoutId="mobile-menu-dot" className="ml-auto h-2.5 w-2.5 rounded-full" style={{ background: c, boxShadow: `0 0 16px ${c}` }} />
                        ) : (
                          <ArrowUpRight size={20} className="ml-auto text-mist transition-transform group-active:-translate-y-0.5 group-active:translate-x-0.5" />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ delay: 0.6, duration: 0.6, ease }} className="space-y-6 pb-2">
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
