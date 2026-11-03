"use client";

import { motion } from "motion/react";
import { Images } from "lucide-react";
import { COLOR_HEX } from "@/src/data/site";
import { TYPE_COLOR, isUpcoming, type ClubEvent } from "@/src/data/events";
import { Emblem } from "../ui/Emblem";

const TYPE_LABEL: Record<ClubEvent["type"], string> = {
  session: "Session",
  hackathon: "Hackathon",
  bootcamp: "Bootcamp",
  meetup: "Meetup",
  "study-jam": "Study Jam",
};

const TYPE_WORD: Record<ClubEvent["type"], string> = {
  session: "TALK",
  hackathon: "HACK",
  bootcamp: "CAMP",
  meetup: "MEET",
  "study-jam": "JAM",
};

export function EventCard({ event, onOpen, index = 0 }: { event: ClubEvent; onOpen?: (e: ClubEvent) => void; index?: number }) {
  const hex = COLOR_HEX[TYPE_COLOR[event.type]];
  const upcoming = isUpcoming(event);

  return (
    <motion.button
      type="button"
      layoutId={onOpen ? `event-${event.slug}` : undefined}
      onClick={() => onOpen?.(event)}
      className="glass group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] text-left transition-transform duration-500 hover:-translate-y-1 active:scale-[0.98]"
    >
      <div className="relative">
        <Emblem word={TYPE_WORD[event.type]} color={hex} seed={index} className="aspect-[16/9]" />
        <span className="absolute left-5 top-5 font-mono text-[0.68rem] uppercase tracking-[0.25em]" style={{ color: hex }}>
          {TYPE_LABEL[event.type]}
        </span>
        {upcoming && (
          <span className="absolute right-5 top-5 flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-g-green">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-g-green" />
            Upcoming
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <p className="kicker">{event.season.replace("-", " - ")}</p>
        <h3 className="mt-2 text-2xl font-semibold">{event.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ash">{event.summary}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-bone/70 transition-colors group-hover:text-bone">
          <Images size={15} style={{ color: hex }} /> View moments
        </span>
      </div>
    </motion.button>
  );
}

export { TYPE_LABEL };
