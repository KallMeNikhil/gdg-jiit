"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ALL_MEMBERS, type Member } from "@/src/data/team";
import { SectionHeading } from "../motion/SectionHeading";
import { CtaButton } from "../ui/CtaButton";
import { Reveal } from "../motion/Reveal";

function Face({ m }: { m: Member }) {
  return (
    <Link
      href="/team"
      className="group relative block h-56 w-44 shrink-0 overflow-hidden rounded-[1.5rem] border border-white/10 bg-ink-soft transition-[transform,border-color] duration-500 hover:-translate-y-2 hover:border-white/30"
    >
      <Image src={m.image} alt={m.name} fill sizes="176px" placeholder="blur" className="object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="truncate font-display text-base font-semibold">{m.name}</p>
        <p className="truncate font-mono text-[0.65rem] uppercase tracking-widest text-ash">{m.role}</p>
      </div>
    </Link>
  );
}

export function TeamTeaser() {
  const [rowA, rowB] = useMemo(() => {
    const half = Math.ceil(ALL_MEMBERS.length / 2);
    return [ALL_MEMBERS.slice(0, half), ALL_MEMBERS.slice(half)];
  }, []);

  return (
    <section id="team" className="relative overflow-hidden py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="06"
          eyebrow="The people"
          title={<>Built by <span className="g-text">{ALL_MEMBERS.length} humans</span> who care.</>}
          lead="Mentors, team leads and the core team — the people who plan every session, mentor every batch and make every event happen."
        />
      </div>
      <div className="mt-14 flex flex-col gap-4 mask-fade-x">
        {[rowA, rowB].map((row, r) => (
          <div key={r} className="group flex overflow-hidden">
            <div className={`flex shrink-0 gap-4 pr-4 group-hover:[animation-play-state:paused] ${r === 0 ? "animate-marquee" : "animate-marquee-reverse"}`} style={{ animationDuration: "70s" }}>
              {[...row, ...row].map((m, i) => (
                <Face key={`${m.id}-${i}`} m={m} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Reveal className="mt-12 flex justify-center">
        <CtaButton href="/team" variant="ghost">Meet the whole team</CtaButton>
      </Reveal>
    </section>
  );
}
