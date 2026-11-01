"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { Github, Globe, Instagram, Linkedin, MessageCircle } from "lucide-react";
import type { Member } from "@/src/data/team";
import { usePointerFine } from "@/src/hooks/useMediaQuery";
import { cn } from "@/src/lib/utils";

function links(m: Member) {
  return [
    m.socials.linkedin && { label: "LinkedIn", href: m.socials.linkedin, icon: Linkedin },
    m.socials.github && { label: "GitHub", href: m.socials.github, icon: Github },
    m.socials.instagram && { label: "Instagram", href: m.socials.instagram, icon: Instagram },
    m.socials.discord && { label: "Discord", href: m.socials.discord, icon: MessageCircle },
    m.socials.website && { label: "Portfolio", href: m.socials.website, icon: Globe },
  ].filter(Boolean) as { label: string; href: string; icon: typeof Linkedin }[];
}

export function MemberBadge({ member, color, serial }: { member: Member; color: string; serial: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = usePointerFine();
  const [open, setOpen] = useState(false);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [12, -12]), { stiffness: 170, damping: 16 });
  const ry = useSpring(useTransform(px, [0, 1], [-14, 14]), { stiffness: 170, damping: 16 });
  const foilX = useTransform(px, [0, 1], [0, 100]);
  const foilY = useTransform(py, [0, 1], [0, 100]);
  const glareX = useTransform(px, [0, 1], [0, 100]);
  const glareY = useTransform(py, [0, 1], [0, 100]);
  const foil = useMotionTemplate`${foilX}% ${foilY}%`;
  const glare = useMotionTemplate`radial-gradient(260px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35), transparent 60%)`;
  const show = open;

  return (
    <div className="[perspective:1000px]">
      <motion.div
        ref={ref}
        style={{ rotateX: fine ? rx : 0, rotateY: fine ? ry : 0 }}
        onPointerMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerEnter={() => fine && setOpen(true)}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
          if (fine) setOpen(false);
        }}
        onClick={() => !fine && setOpen((o) => !o)}
        className="g-edge group relative aspect-[3/4.2] overflow-hidden rounded-[1.75rem] bg-ink-soft [--edge-opacity:0.25] [transform-style:preserve-3d]"
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          placeholder="blur"
          sizes="(max-width: 640px) 90vw, (max-width: 1280px) 33vw, 300px"
          className="scale-[1.06] object-cover grayscale-[65%] transition-[filter,transform] duration-700 group-hover:scale-[1.12] group-hover:grayscale-0"
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-color-dodge transition-opacity duration-500 group-hover:opacity-40"
          style={{
            backgroundImage: "repeating-linear-gradient(115deg, #4285f4 0%, #ea4335 7%, #fbbc04 14%, #34a853 21%, #4285f4 28%)",
            backgroundSize: "260% 260%",
            backgroundPosition: foil,
          }}
        />
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100" style={{ background: glare }} />

        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 [transform:translateZ(30px)]">
          <span className="font-mono text-[0.68rem] tracking-[0.22em] text-white/70">{serial}</span>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: color, boxShadow: `0 0 14px ${color}` }} />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 [transform:translateZ(40px)]">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em]" style={{ color }}>
            {member.role}
          </p>
          <h3 className="mt-1.5 font-display text-2xl font-semibold leading-tight">{member.name}</h3>
          <div className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-out", show ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
            <div className="overflow-hidden">
              <div className="glass mt-4 rounded-2xl p-4">
                <p className="line-clamp-3 text-sm leading-relaxed text-bone/85">{member.quote}</p>
                <div className="mt-3 flex gap-2">
                  {links(member).map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} on ${label}`}
                      tabIndex={show ? 0 : -1}
                      onClick={(e) => e.stopPropagation()}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-bone/80 transition-colors hover:text-white"
                      style={{ ["--c" as string]: color }}
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
