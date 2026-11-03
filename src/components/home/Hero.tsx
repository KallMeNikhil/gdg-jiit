"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Facebook, Github, Instagram, MessageCircle, Twitter, Youtube } from "lucide-react";
import { HeroField } from "./HeroField";
import { HeroMotto, HeroTitle } from "./HeroTitle";
import { CtaButton } from "../ui/CtaButton";
import { SITE, SOCIALS } from "@/src/data/site";
import { useIntroDone } from "@/src/hooks/useIntroDone";
import { usePointerFine } from "@/src/hooks/useMediaQuery";

const ease = [0.16, 1, 0.3, 1] as const;
const SOCIAL_ICONS = { Instagram, YouTube: Youtube, Discord: MessageCircle, X: Twitter, GitHub: Github, Facebook } as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const play = useIntroDone();
  const fine = usePointerFine();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.7], ["blur(0px)", "blur(8px)"]);

  return (
    <section ref={ref} className="noise relative flex min-h-[100svh] items-center justify-center overflow-hidden pb-16 pt-24 sm:pb-24 sm:pt-28">
      <HeroField />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(52%_48%_at_50%_50%,rgba(7,8,11,0.88),rgba(7,8,11,0.45)_65%,transparent_100%)]" />

      <motion.div style={fine ? { y, opacity, filter: blur } : { y, opacity }} className="shell relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={play ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease }}
          className="max-w-[22rem] text-balance font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.22em] text-ash sm:max-w-none sm:text-[0.72rem] sm:tracking-[0.3em]"
        >
          Jaypee Institute of Information Technology · Sector 128, Noida
        </motion.p>

        <div className="mt-7">
          <HeroTitle play={play} />
        </div>

        <HeroMotto text={SITE.motto} play={play} />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={play ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 1.3, duration: 0.8, ease }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:mt-10"
        >
          <CtaButton href="/join" variant="blue">Become a member</CtaButton>
          <CtaButton href="/events" variant="ghost">Explore events</CtaButton>
        </motion.div>

        <motion.ul
          initial="hidden"
          animate={play ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 1.5 } } }}
          className="mt-10 flex flex-wrap justify-center gap-2 sm:mt-12"
        >
          {SOCIALS.map((s) => {
            const Icon = SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS];
            return (
              <motion.li key={s.label} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="glass group flex h-11 w-11 items-center justify-center rounded-2xl text-ash transition-[color,transform] duration-300 hover:text-bone active:scale-90"
                  style={{ ["--c" as string]: s.color }}
                >
                  <Icon size={18} className="text-[var(--c)] transition-[color,transform] duration-300 group-hover:scale-110 [@media(pointer:fine)]:text-current [@media(pointer:fine)]:group-hover:text-[var(--c)]" />
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
    </section>
  );
}
