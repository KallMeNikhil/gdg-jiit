"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { Plus } from "lucide-react";
import { FAQ } from "@/src/data/site";
import { SectionHeading } from "../motion/SectionHeading";
import { cn } from "@/src/lib/utils";

export function Faq() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} id="faq" className="relative overflow-hidden py-24 sm:py-32">
      <motion.p aria-hidden="true" style={{ y: ghostY }} className="pointer-events-none absolute -right-8 top-10 select-none font-display text-[22vw] font-bold leading-none tracking-[-0.06em] text-white/[0.025]">
        FAQ
      </motion.p>
      <div className="shell relative">
        <SectionHeading index="07" eyebrow="Questions" title={<>Asked, <span className="text-ash">answered.</span></>} lead="Still curious? Drop us a message on the contact page or in Discord." />
        <ul className="mt-12 divide-y divide-white/10 border-b border-white/10">
          {FAQ.map((item, i) => {
            const on = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  aria-expanded={on}
                  onClick={() => setOpen(on ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="kicker w-6">{String(i + 1).padStart(2, "0")}</span>
                    <span className={cn("font-display text-xl font-medium transition-colors sm:text-2xl", on ? "text-bone" : "text-ash group-hover:text-bone")}>{item.q}</span>
                  </span>
                  <motion.span
                    animate={{ rotate: on ? 45 : 0, backgroundColor: on ? "rgba(66,133,244,1)" : "rgba(255,255,255,0.04)" }}
                    transition={{ duration: 0.3 }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10"
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <p className="max-w-2xl pb-7 pl-11 text-pretty leading-relaxed text-ash">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
