"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { NAV, SITE } from "@/src/data/site";
import { cn } from "@/src/lib/utils";
import { CtaButton } from "../ui/CtaButton";
import { MenuToggle, MobileMenu } from "./MobileMenu";

const COLORS = ["#4285f4", "#ea4335", "#fbbc04", "#34a853", "#4285f4", "#ea4335"];
const MOBILE = [{ label: "Home", href: "/" }, ...NAV];
const spring = { type: "spring", stiffness: 420, damping: 34 } as const;

export function Nav() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const closeMenu = useCallback(() => setMenu(false), []);
  const barRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(-200);
  const light = useMotionTemplate`radial-gradient(160px circle at ${mx}px 50%, rgba(255,255,255,0.14), transparent 70%)`;
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCompact(v > 60);
    if (v < 160 || v < prev - 2) setHidden(false);
    else if (v > prev + 4) setHidden(true);
  });

  useEffect(() => {
    const id = requestAnimationFrame(() => setMenu(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
  const items = NAV;
  const activeHref = items.find((i) => isActive(i.href))?.href ?? null;
  const lamp = hover ?? activeHref;

  return (
    <>
      <a href="#main" className="sr-only z-[120] rounded-full bg-bone px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>

      <motion.div
        className="fixed left-1 top-1 z-[110] sm:left-2.5 sm:top-0.5"
        animate={{ y: hidden && !menu ? -120 : 0, opacity: hidden && !menu ? 0 : 1, scale: compact && !menu ? 0.9 : 1 }}
        style={{ transformOrigin: "20% 50%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          onClick={closeMenu}
          className="group relative flex h-[72px] w-[72px] items-center justify-center sm:h-[88px] sm:w-[88px]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-3 inset-y-5 rounded-full opacity-35 blur-xl transition-opacity duration-500 group-hover:opacity-60"
            style={{ background: "conic-gradient(from 200deg, #4285f4, #ea4335, #fbbc04, #34a853, #4285f4)", animation: "spin 14s linear infinite" }}
          />
          <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(7,8,11,0.7)_35%,rgba(7,8,11,0.3)_65%,transparent)]" />
          <img src="/gdg-logo.gif" alt="" width={88} height={88} decoding="async" className="relative h-full w-full object-contain drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-[1.06]" />
        </Link>
      </motion.div>

      <motion.header
        animate={{ y: hidden ? -110 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-x-0 top-5 z-[95] hidden justify-center md:flex"
      >
        <nav
          ref={barRef}
          aria-label="Primary"
          onPointerMove={(e) => {
            const r = barRef.current?.getBoundingClientRect();
            if (r) mx.set(e.clientX - r.left);
          }}
          onPointerLeave={() => {
            mx.set(-200);
            setHover(null);
          }}
          className="g-edge edge-2 pointer-events-auto relative rounded-full p-1.5 [--edge-opacity:0.95]"
          style={{
            background:
              "linear-gradient(120deg, rgba(66,133,244,0.16), rgba(234,67,53,0.1) 35%, rgba(251,188,4,0.1) 65%, rgba(52,168,83,0.16)), rgba(14,16,22,0.55)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow: "0 14px 40px -18px rgba(66,133,244,0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full" style={{ background: light }} />
          <ul className="relative flex items-center gap-0.5">
            {items.map((item, i) => {
              const c = COLORS[i % COLORS.length];
              const on = lamp === item.href;
              return (
                <li key={item.href} className="relative flex items-center">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onPointerEnter={() => setHover(item.href)}
                    onFocus={() => setHover(item.href)}
                    onBlur={() => setHover(null)}
                    className={cn("relative z-10 block rounded-full px-5 py-2.5 text-[0.93rem] font-medium transition-colors duration-300", on ? "text-white" : "text-white/70")}
                  >
                    {item.label}
                  </Link>
                  {on && (
                    <motion.span
                      layoutId="nav-lamp"
                      transition={spring}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(120% 140% at 50% 120%, ${c}66, ${c}1f 60%, transparent 100%)`,
                        boxShadow: `inset 0 0 0 1px ${c}88, 0 6px 22px -6px ${c}`,
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </motion.header>

      <motion.div
        animate={{ y: hidden ? -110 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed right-6 top-6 z-[100] hidden md:block"
      >
        <CtaButton href="/join" variant="ghost">Join us</CtaButton>
      </motion.div>

      <motion.div
        className="fixed right-4 top-3 z-[110] md:hidden"
        style={{ top: "max(0.75rem, env(safe-area-inset-top))", right: "max(1rem, env(safe-area-inset-right))" }}
        animate={{ scale: compact && !menu ? 0.92 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <MenuToggle open={menu} onToggle={() => setMenu((m) => !m)} />
      </motion.div>

      <MobileMenu open={menu} onClose={closeMenu} items={MOBILE} isActive={isActive} />
    </>
  );
}
