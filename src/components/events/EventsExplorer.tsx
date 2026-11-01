"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Instagram, Sparkles } from "lucide-react";
import { EVENTS, EVENT_TYPES, SEASONS, nextEvent, type ClubEvent, type EventType } from "@/src/data/events";
import { LINKS } from "@/src/data/site";
import { EventCard } from "./EventCard";
import { EventDrawer } from "./EventDrawer";
import { Countdown } from "./Countdown";
import { cn } from "@/src/lib/utils";

const spring = { type: "spring", stiffness: 420, damping: 36 } as const;
const CHIP_COLORS = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];

function Segmented<T extends string>({ id, options, value, onChange, label }: { id: string; options: { id: T; label: string; count?: number }[]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="no-scrollbar flex max-w-full flex-wrap justify-center gap-2">
      {options.map((o, i) => {
        const on = o.id === value;
        const hex = CHIP_COLORS[i % 4];
        return (
          <button
            key={o.id}
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.id)}
            className={cn("relative whitespace-nowrap rounded-2xl border px-4 py-2.5 text-sm transition-colors duration-300", on ? "border-transparent text-bone" : "border-white/10 bg-white/[0.02] text-ash hover:border-white/25 hover:text-bone")}
          >
            {on && (
              <motion.span
                layoutId={`${id}-chip`}
                transition={spring}
                className="absolute inset-0 rounded-2xl"
                style={{ background: `${hex}2b`, boxShadow: `inset 0 0 0 1px ${hex}, 0 8px 28px -10px ${hex}` }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full transition-transform duration-300" style={{ background: hex, transform: on ? "scale(1.4)" : "scale(1)" }} />
              {o.label}
              {o.count !== undefined && <span className="font-mono text-[0.68rem] text-mist">{o.count}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function EventsExplorer() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialSeason = params.get("season");
  const initialType = params.get("type");
  const [season, setSeason] = useState<string>(initialSeason && (SEASONS as readonly string[]).includes(initialSeason) ? initialSeason : "all");
  const [type, setType] = useState<EventType | "all">(EVENT_TYPES.some((t) => t.id === initialType) ? (initialType as EventType) : "all");
  const [open, setOpen] = useState<ClubEvent | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const upcoming = nextEvent();

  const sync = (s: string, t: string) => {
    const q = new URLSearchParams();
    if (s !== "all") q.set("season", s);
    if (t !== "all") q.set("type", t);
    router.replace(q.size ? `${pathname}?${q}` : pathname, { scroll: false });
  };

  const seasonOptions = useMemo(
    () => [{ id: "all", label: "All seasons", count: EVENTS.length }, ...SEASONS.map((s) => ({ id: s as string, label: s.replace("-", "–"), count: EVENTS.filter((e) => e.season === s).length }))],
    [],
  );

  const inSeason = EVENTS.filter((e) => season === "all" || e.season === season);
  const typeOptions = EVENT_TYPES.map((t) => ({ ...t, count: t.id === "all" ? inSeason.length : inSeason.filter((e) => e.type === t.id).length })).filter((t) => t.id === "all" || t.count > 0);
  const shown = inSeason.filter((e) => type === "all" || e.type === type);

  return (
    <div className="shell pb-10">
      {upcoming ? (
        <div className="glass mb-14 grid gap-8 rounded-[2rem] p-7 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="kicker !text-g-green">Next up</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{upcoming.title}</h2>
            <p className="mt-2 max-w-lg text-sm text-ash">{upcoming.summary}</p>
          </div>
          <Countdown date={upcoming.date!} />
        </div>
      ) : (
        <a
          href={LINKS.instagram}
          target="_blank"
          rel="noreferrer"
          className="glass group relative mb-14 flex flex-col gap-5 overflow-hidden rounded-[2rem] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9"
        >
          <span className="sheen" />
          <div aria-hidden="true" className="absolute -right-10 -top-24 h-64 w-64 rounded-full bg-g-blue/20 blur-[90px] transition-transform duration-700 group-hover:scale-125" />
          <div className="relative flex items-start gap-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-g-yellow/15 text-g-yellow">
              <Sparkles size={22} />
            </span>
            <div>
              <p className="kicker">Next drop</p>
              <p className="mt-2 font-display text-2xl font-semibold sm:text-3xl">The next season is being planned.</p>
              <p className="mt-1 text-sm text-ash">Announcements land on Instagram and Discord first.</p>
            </div>
          </div>
          <span className="relative inline-flex items-center gap-2 self-start rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink sm:self-auto">
            <Instagram size={16} /> Follow @gdg_jiit
          </span>
        </a>
      )}

      <LayoutGroup>
        <div className="flex flex-col items-center gap-3">
          <Segmented
            id="season"
            label="Season"
            options={seasonOptions}
            value={season}
            onChange={(v) => {
              setSeason(v);
              setType("all");
              sync(v, "all");
            }}
          />
          <Segmented
            id="type"
            label="Event type"
            options={typeOptions}
            value={type}
            onChange={(v) => {
              setType(v);
              sync(season, v);
            }}
          />
        </div>

        <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((e, i) => (
              <motion.div
                key={e.slug}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <EventCard event={e} onOpen={setOpen} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {shown.length === 0 && (
        <div className="mt-10 rounded-[2rem] border border-dashed border-white/15 p-14 text-center">
          <p className="font-display text-2xl font-semibold">Nothing here yet.</p>
          <p className="mt-2 text-sm text-ash">Events for this season will appear as soon as they are announced.</p>
        </div>
      )}

      <EventDrawer event={open} onClose={close} />
    </div>
  );
}
