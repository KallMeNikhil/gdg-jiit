"use client";

import { motion } from "motion/react";
import { SectionHeading } from "../motion/SectionHeading";
import { MagicCard } from "../ui/magic-card";
import { COLOR_HEX, DOMAINS, type GoogleColor } from "@/src/data/site";

const NEXT: Record<GoogleColor, GoogleColor> = { blue: "red", red: "yellow", yellow: "green", green: "blue" };
const SPANS = ["lg:col-span-2", "", "", "", "", "lg:col-span-2"];

export function Domains({ index = "02" }: { index?: string }) {
  return (
    <section id="domains" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index={index}
          eyebrow="What we do"
          title={<>Six domains. <span className="g-text">One community.</span></>}
          lead="Pick a lane or try them all. Every domain has its own leads, sessions and projects - and they all meet at the hackathon."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DOMAINS.map((d, i) => {
            const hex = COLOR_HEX[d.color];
            const wide = SPANS[i] !== "";
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={SPANS[i]}
              >
                <MagicCard className="group h-full rounded-[1.75rem]" gradientSize={260} gradientColor={`${hex}26`} gradientFrom={hex} gradientTo={COLOR_HEX[NEXT[d.color]]}>
                  <article className={`relative flex h-full flex-col p-6 sm:p-7 ${wide ? "min-h-[15rem] sm:min-h-[17rem] lg:flex-row lg:items-end lg:gap-10" : "min-h-[15rem] sm:min-h-[17rem]"}`}>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-5 top-3 font-display text-[4.5rem] font-bold leading-none tracking-[-0.06em] text-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100 group-live:opacity-100 sm:right-7 sm:top-4"
                      style={{ WebkitTextStroke: `1px ${hex}66` }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className={wide ? "lg:flex-1" : ""}>
                      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl" style={{ color: hex, background: `${hex}1a` }}>
                        <span aria-hidden="true" className="absolute inset-0 rounded-2xl opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100 group-live:opacity-100" style={{ background: `${hex}55` }} />
                        <d.icon size={24} strokeWidth={1.75} className="relative transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-8deg] group-live:scale-110 group-live:rotate-[-8deg]" />
                      </span>
                      <h3 className={`mt-6 font-semibold sm:mt-8 ${wide ? "text-3xl" : "text-2xl"}`}>{d.title}</h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-ash">{d.body}</p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2 lg:mt-0">
                      {d.stack.map((s) => (
                        <span key={s} className="rounded-xl bg-white/[0.05] px-3 py-1.5 font-mono text-[0.72rem] text-ash transition-colors duration-300 group-hover:text-bone group-live:text-bone">
                          {s}
                        </span>
                      ))}
                    </div>
                  </article>
                </MagicCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
