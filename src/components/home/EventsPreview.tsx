"use client";

import { useCallback, useState } from "react";
import { EVENTS, type ClubEvent } from "@/src/data/events";
import { SectionHeading } from "../motion/SectionHeading";
import { Reveal } from "../motion/Reveal";
import { EventCard } from "../events/EventCard";
import { EventDrawer } from "../events/EventDrawer";
import { CtaButton } from "../ui/CtaButton";

export function EventsPreview() {
  const [open, setOpen] = useState<ClubEvent | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const latest = EVENTS.slice(0, 3);

  return (
    <section id="events" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="05"
          eyebrow="Events"
          title={<>Fresh from <span className="text-ash">the calendar.</span></>}
          lead="Hackathons, hands-on sessions, Study Jams and meetups. Here is what we have been up to lately."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((e, i) => (
            <Reveal key={e.slug} delay={i * 0.08} className={i === 0 ? "md:col-span-2 lg:col-span-1" : ""}>
              <EventCard event={e} onOpen={setOpen} index={i} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex justify-center">
          <CtaButton href="/events" variant="ghost">See every event</CtaButton>
        </Reveal>
      </div>
      <EventDrawer event={open} onClose={close} />
    </section>
  );
}
