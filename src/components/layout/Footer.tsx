"use client";

import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin, MessageCircle, Twitter, Youtube } from "lucide-react";
import { LINKS, NAV, SITE } from "@/src/data/site";
import { PixelBoard } from "./PixelBoard";
import { CtaButton } from "../ui/CtaButton";
import { Reveal } from "../motion/Reveal";

const SOCIALS = [
  { label: "Instagram", href: LINKS.instagram, icon: Instagram, color: "#ea4335" },
  { label: "LinkedIn", href: LINKS.linkedin, icon: Linkedin, color: "#4285f4" },
  { label: "GitHub", href: LINKS.github, icon: Github, color: "#34a853" },
  { label: "Discord", href: LINKS.discord, icon: MessageCircle, color: "#4285f4" },
  { label: "X", href: LINKS.x, icon: Twitter, color: "#fbbc04" },
  { label: "YouTube", href: LINKS.youtube, icon: Youtube, color: "#ea4335" },
  { label: "Facebook", href: LINKS.facebook, icon: Facebook, color: "#4285f4" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 pb-28 md:pb-0">
      <div className="shell relative">
        <Reveal className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute -left-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-g-blue/30 blur-[110px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-g-red/25 blur-[110px]" />
          <div className="glass relative overflow-hidden rounded-[2.25rem] px-6 py-14 text-center sm:px-14 sm:py-20">
            <h2 className="mx-auto max-w-3xl text-balance text-[clamp(2.2rem,6vw,4.6rem)] font-semibold">
              Ready to join our <span className="g-text">community?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-ash">
              Connect with fellow developers, learn new skills and build amazing projects together. Membership is free.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <CtaButton href="/join" variant="blue">Become a member</CtaButton>
              <CtaButton href="/contact" variant="ghost">Say hello</CtaButton>
            </div>
          </div>
        </Reveal>

        <div className="glass mt-10 rounded-[2rem] p-4 sm:p-6">
          <PixelBoard />
          <p className="mt-4 text-center font-mono text-[0.7rem] uppercase tracking-[0.25em] text-mist">Hover to paint the board</p>
        </div>

        <div className="glass mt-10 rounded-[2rem] p-7 sm:p-10">
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="flex items-center gap-4">
              <span className="g-dots" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight">{SITE.longName}</span>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-ash">
              Google Developer Groups on Campus at Jaypee Institute of Information Technology, Sector 128, Noida — a community of student developers learning and building with Google technologies.
            </p>
          </div>

          <nav aria-label="Footer" className="mt-9 flex flex-wrap justify-center gap-x-2 gap-y-2 border-y border-white/[0.08] py-5">
            {[{ label: "Home", href: "/" }, ...NAV, { label: "Join", href: "/join" }].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl px-4 py-2 text-sm text-ash transition-colors hover:bg-white/[0.06] hover:text-bone">
                {item.label}
              </Link>
            ))}
          </nav>

          <ul className="mt-7 flex flex-wrap justify-center gap-3">
            {SOCIALS.map(({ label, href, icon: Icon, color }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-ash transition-colors duration-300 hover:border-white/25 hover:text-bone"
                  style={{ ["--c" as string]: color }}
                >
                  <Icon size={17} className="transition-[color,transform] duration-300 group-hover:scale-110 group-hover:text-[var(--c)]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 py-8 text-xs text-mist sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Google Developer Groups JIIT. All rights reserved.</p>
          <p className="font-mono">{SITE.motto}</p>
        </div>
      </div>
    </footer>
  );
}
