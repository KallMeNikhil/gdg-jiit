"use client";

import { motion } from "motion/react";
import { Counter } from "../motion/Counter";
import { Highlight } from "../motion/Highlight";
import { DOMAINS } from "@/src/data/site";
import { EVENTS } from "@/src/data/events";
import { ALL_MEMBERS } from "@/src/data/team";

const STATS = [
  { value: 6, suffix: "", label: "BitBox editions", color: "#4285f4" },
  { value: ALL_MEMBERS.length, suffix: "+", label: "Mentors, leads & core", color: "#ea4335" },
  { value: EVENTS.length, suffix: "+", label: "Sessions & events", color: "#fbbc04" },
  { value: DOMAINS.length, suffix: "", label: "Tech domains", color: "#34a853" },
];

export function Mission() {
  return (
    <section id="mission" className="relative py-28 sm:py-36">
      <div className="shell">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl text-balance text-center font-display text-[clamp(1.45rem,4.2vw,3.4rem)] font-medium leading-[1.25] tracking-[-0.03em]"
        >
          With our motto being <span className="whitespace-nowrap"><Highlight color="#4285f4" delay={0.2}>Giving Direction to Greatness</Highlight>,</span> we help students climb mountains on their own - as high as possible. We bring the <Highlight color="#ea4335" delay={0.55}>tools</Highlight>, the <Highlight color="#fbbc04" delay={0.75}>community</Highlight> and the <Highlight color="#34a853" delay={0.95}>guidance</Highlight> that turn curiosity into industry-ready expertise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass mx-auto mt-14 grid sm:mt-20 max-w-5xl grid-cols-2 overflow-hidden rounded-[2rem] lg:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-7 text-center sm:px-6 sm:py-9 ${i % 2 === 1 ? "border-l border-white/[0.08]" : ""} ${i >= 2 ? "border-t border-white/[0.08] lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <p className="font-display text-[clamp(2.6rem,5.5vw,4rem)] font-semibold leading-none tracking-[-0.05em]">
                <Counter value={s.value} />
                {s.suffix && <span style={{ color: s.color }}>{s.suffix}</span>}
              </p>
              <p className="mt-3 text-sm text-ash">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
