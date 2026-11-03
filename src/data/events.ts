import type { GoogleColor } from "./site";

export type EventType = "session" | "hackathon" | "bootcamp" | "meetup" | "study-jam";

export type ClubEvent = {
  slug: string;
  title: string;
  summary: string;
  season: string;
  type: EventType;
  image: string;
  date?: string;
  href?: string;
};

export const SEASONS = ["2025-2026", "2024-2025", "2023-2024", "2022-2023"] as const;

export const EVENT_TYPES: { id: EventType | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "session", label: "Sessions" },
  { id: "hackathon", label: "Hackathons" },
  { id: "bootcamp", label: "Bootcamps" },
  { id: "study-jam", label: "Study Jams" },
  { id: "meetup", label: "Meetups" },
];

export const TYPE_COLOR: Record<EventType, GoogleColor> = {
  session: "blue",
  hackathon: "red",
  bootcamp: "yellow",
  "study-jam": "green",
  meetup: "blue",
};

export const EVENTS: ClubEvent[] = [
  {
    slug: "bitbox-6",
    title: "BitBox 6.0",
    summary:
      "Our flagship hackathon returned bigger than ever - PPT rounds, speaker sessions, mini games and a grand finale judged by engineers from the industry.",
    season: "2025-2026",
    type: "hackathon",
    image: "/bitbox-screen.png",
    date: "2026-04-18",
    href: "/bitbox",
  },
  {
    slug: "ai-ml-session",
    title: "AI ML Session",
    summary: "Dissected AI, ML and deep learning, exploring the different types of machine learning and the models behind them.",
    season: "2023-2024",
    type: "session",
    image: "/aimlsession.webp",
  },
  {
    slug: "git-github-2023",
    title: "Git & GitHub",
    summary: "Students learned to use GitHub effectively for writing code and collaborating on it with others.",
    season: "2023-2024",
    type: "session",
    image: "/gitgithub.webp",
  },
  {
    slug: "orientation-2022",
    title: "Orientation",
    summary: "Freshers were introduced to the structure of the chapter and to how to begin their journey with us.",
    season: "2022-2023",
    type: "meetup",
    image: "/orientation.webp",
  },
  {
    slug: "roadmap-2022",
    title: "Roadmap",
    summary: "An introduction to web development, competitive programming, DSA and internship opportunities.",
    season: "2022-2023",
    type: "session",
    image: "/techworldabc.webp",
  },
  {
    slug: "git-github-2022",
    title: "Git & GitHub",
    summary: "A hands-on session on Git and GitHub, with an introduction to Hacktoberfest.",
    season: "2022-2023",
    type: "session",
    image: "/githubabc.webp",
  },
  {
    slug: "compose-camp",
    title: "Compose Camp",
    summary: "A hands-on Study Jam on Android development with Jetpack Compose.",
    season: "2022-2023",
    type: "study-jam",
    image: "/composeabc.webp",
  },
  {
    slug: "decrypt-the-crypto",
    title: "Decrypt the Crypto",
    summary: "A session that took the campus into the world of crypto, blockchains and what lies beyond them.",
    season: "2022-2023",
    type: "session",
    image: "/decrypt.webp",
  },
  {
    slug: "intro-to-hackathon",
    title: "Intro to Hackathon",
    summary: "Come, explore and code - the kick-off for BitBox 3.0, the annual hackathon of GDG JIIT 128.",
    season: "2022-2023",
    type: "hackathon",
    image: "/hackathon.webp",
  },
  {
    slug: "bootcamp-2022",
    title: "Bootcamp",
    summary: "A three-day bootcamp covering HTML, CSS and JavaScript by building an app from scratch.",
    season: "2022-2023",
    type: "bootcamp",
    image: "/bootcamp.webp",
  },
];

export function isUpcoming(event: ClubEvent, now = new Date()) {
  if (!event.date) return false;
  return new Date(`${event.date}T23:59:59`) >= now;
}

export function nextEvent(now = new Date()) {
  return EVENTS.filter((e) => isUpcoming(e, now)).sort((a, b) => (a.date! < b.date! ? -1 : 1))[0];
}
