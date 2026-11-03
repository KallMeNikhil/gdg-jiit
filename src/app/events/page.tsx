import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/src/components/layout/PageHero";
import { EventsExplorer } from "@/src/components/events/EventsExplorer";
import { EVENTS } from "@/src/data/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Hackathons, hands-on sessions, Study Jams and meetups by GDG JIIT 128 - every season in one place.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        kicker={`${EVENTS.length} events and counting`}
        title={["Where builders", <span key="b" className="g-text">come together.</span>]}
        lead="Every session, hackathon and Study Jam we have run - filter by season or format, and open any event for the full story."
      />
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <EventsExplorer />
      </Suspense>
    </>
  );
}
