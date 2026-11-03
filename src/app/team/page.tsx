import type { Metadata } from "next";
import { PageHero } from "@/src/components/layout/PageHero";
import { TeamBoard } from "@/src/components/team/TeamBoard";
import { ALL_MEMBERS, TEAM } from "@/src/data/team";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the mentors, team leads and core team behind GDG JIIT 128.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        kicker={`${ALL_MEMBERS.length} people · ${TEAM.length} groups`}
        title={["Meet the", <span key="b" className="g-text">builders.</span>]}
        lead="Pick a group and open any card to read their story and find them online."
      />
      <TeamBoard />
    </>
  );
}
