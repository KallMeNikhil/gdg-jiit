import type { StaticImageData } from "next/image";
import type { GoogleColor } from "../site";
import mentors from "./Mentors";
import leads from "./TeamLead";
import core from "./CoreTeam";

export type Socials = {
  instagram?: string;
  linkedin?: string;
  github?: string;
  discord?: string;
  website?: string;
};

export type Member = {
  id: string;
  name: string;
  role: string;
  image: StaticImageData;
  quote: string;
  socials: Socials;
};

export type TeamGroup = {
  id: string;
  title: string;
  accent: string;
  lead: string;
  color: GoogleColor;
  members: Member[];
};

type RawMember = {
  id: number;
  name: string;
  role: string;
  image: StaticImageData;
  quote: string;
  socials: Record<string, string | undefined>;
};

function normaliseUrl(url?: string) {
  if (!url || !url.trim()) return undefined;
  const trimmed = url.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function titleCase(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => (w.length > 1 && w === w.toLowerCase() ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function toMembers(prefix: string, list: RawMember[]): Member[] {
  return list.map((m) => ({
    id: `${prefix}-${m.id}`,
    name: titleCase(m.name),
    role: m.role,
    image: m.image,
    quote: m.quote,
    socials: {
      github: normaliseUrl(m.socials.github),
      linkedin: normaliseUrl(m.socials.linkedin),
      instagram: normaliseUrl(m.socials.instagram),
      discord: normaliseUrl(m.socials.discord),
      website: normaliseUrl(m.socials.website),
    },
  }));
}

export const TEAM: TeamGroup[] = [
  {
    id: "mentors",
    title: "Our",
    accent: "Mentors",
    lead: "Alumni and seniors who built this chapter, and still show up to guide the next batch.",
    color: "blue",
    members: toMembers("mentor", mentors as unknown as RawMember[]),
  },
  {
    id: "leads",
    title: "Team",
    accent: "Leads",
    lead: "The people who run each domain — planning sessions, reviewing code and keeping the chapter moving.",
    color: "red",
    members: toMembers("lead", leads as unknown as RawMember[]),
  },
  {
    id: "core",
    title: "Core",
    accent: "Team",
    lead: "The builders behind every event, poster, workshop and line of code you see from GDG JIIT.",
    color: "green",
    members: toMembers("core", core as unknown as RawMember[]),
  },
];

export const ALL_MEMBERS = TEAM.flatMap((g) => g.members);
