import {
  BrainCircuit,
  Cloud,
  Code2,
  Palette,
  Smartphone,
  Terminal,
  type LucideIcon,
} from "lucide-react";

export const SITE = {
  name: "GDG JIIT",
  shortName: "GDG 128",
  longName: "Google Developer Groups on Campus — JIIT 128",
  campus: "JIIT, Sector 128, Noida",
  motto: "Giving Direction to Greatness",
  tagline:
    "The student-led developer community of JIIT 128 — where students learn Google technologies, build real projects and grow together through sessions, study jams and hackathons.",
  mission:
    "With our motto being Giving Direction to Greatness, we help students climb mountains on their own, as high as possible. We provide the tools, the community and the guidance that turn curiosity into industry-ready expertise.",
};

export const LINKS = {
  github: "https://github.com/dsc-jiit-128",
  instagram: "https://www.instagram.com/gdg_jiit/",
  linkedin: "https://www.linkedin.com/company/dsc-jiit",
  x: "https://x.com/gdgjiit",
  discord: "https://discord.com/invite/HqatsVyq5H",
  youtube: "https://www.youtube.com/channel/UCsq-cbi1tZStoem3KVQVjCg",
  facebook: "https://www.facebook.com/gdscjiit/",
};

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
  { label: "BitBox", href: "/bitbox" },
  { label: "Contact", href: "/contact" },
];

export const SOCIALS = [
  { label: "Instagram", href: LINKS.instagram, color: "#ea4335" },
  { label: "YouTube", href: LINKS.youtube, color: "#ea4335" },
  { label: "Discord", href: LINKS.discord, color: "#4285f4" },
  { label: "X", href: LINKS.x, color: "#f3f4f6" },
  { label: "GitHub", href: LINKS.github, color: "#34a853" },
  { label: "Facebook", href: LINKS.facebook, color: "#4285f4" },
];

export const TICKER = [
  "Android",
  "Flutter",
  "Firebase",
  "Google Cloud",
  "Gemini",
  "TensorFlow",
  "Kotlin",
  "Web",
  "Machine Learning",
  "DSA",
  "UI / UX",
  "Hackathons",
  "Study Jams",
];

export type GoogleColor = "blue" | "red" | "yellow" | "green";

export const COLOR_HEX: Record<GoogleColor, string> = {
  blue: "#4285f4",
  red: "#ea4335",
  yellow: "#fbbc04",
  green: "#34a853",
};

export type Domain = {
  title: string;
  body: string;
  icon: LucideIcon;
  color: GoogleColor;
  stack: string[];
};

export const DOMAINS: Domain[] = [
  {
    title: "Web Development",
    body: "From your first HTML page to production-grade full-stack apps with modern frameworks.",
    icon: Code2,
    color: "blue",
    stack: ["React", "Next.js", "Node"],
  },
  {
    title: "App Development",
    body: "Native and cross-platform apps with Android, Kotlin and Flutter — built and shipped to real users.",
    icon: Smartphone,
    color: "green",
    stack: ["Android", "Flutter", "Compose"],
  },
  {
    title: "AI & Machine Learning",
    body: "Data, models and LLMs. Turn coursework into applied AI that solves a real problem.",
    icon: BrainCircuit,
    color: "red",
    stack: ["Gemini", "TensorFlow", "Python"],
  },
  {
    title: "Cloud & DevOps",
    body: "Deploy, scale and automate. Learn the infrastructure that keeps software running.",
    icon: Cloud,
    color: "yellow",
    stack: ["Google Cloud", "Firebase", "Docker"],
  },
  {
    title: "Competitive Programming",
    body: "Sharpen problem solving with DSA sprints, contests and peer-reviewed practice.",
    icon: Terminal,
    color: "blue",
    stack: ["C++", "DSA", "Contests"],
  },
  {
    title: "Design",
    body: "Product thinking, interfaces and visual systems that make technology feel human.",
    icon: Palette,
    color: "red",
    stack: ["Figma", "UI / UX", "Branding"],
  },
];

export type Program = {
  slug: string;
  title: string;
  kicker: string;
  body: string;
  image: string;
  color: GoogleColor;
  href?: string;
};

export const PROGRAMS: Program[] = [
  {
    slug: "bitbox",
    title: "BitBox",
    kicker: "Flagship hackathon",
    body: "Six editions of our annual hackathon — teams building a working prototype from scratch, judged by engineers from the industry.",
    image: "/hackathon.webp",
    color: "blue",
    href: "/bitbox",
  },
  {
    slug: "exploreml",
    title: "ExploreML",
    kicker: "AI / ML deep dive",
    body: "A guided track through machine learning, deep learning and modern AI, from fundamentals to models you train yourself.",
    image: "/aimlsession.webp",
    color: "red",
  },
  {
    slug: "study-jams",
    title: "Study Jams",
    kicker: "Community learning",
    body: "Community-run study groups for developers of every level. Learn a technology together, week by week.",
    image: "/composeabc.webp",
    color: "green",
  },
  {
    slug: "sessions",
    title: "Sessions & Bootcamps",
    kicker: "Hands-on workshops",
    body: "Practical sessions on Git, web, Android and more — plus multi-day bootcamps where you build an app end to end.",
    image: "/bootcamp.webp",
    color: "yellow",
  },
  {
    slug: "meetups",
    title: "Meetups",
    kicker: "People & ideas",
    body: "Regular meetups for students who share the same technical interests, so ideas, projects and teams can find each other.",
    image: "/orientation.webp",
    color: "blue",
  },
];

export type JourneyStep = {
  id: string;
  title: string;
  body: string;
  color: GoogleColor;
};

export const JOURNEY: JourneyStep[] = [
  {
    id: "join",
    title: "Join the community",
    body: "Sign up, hop into Discord and meet the people building alongside you.",
    color: "blue",
  },
  {
    id: "learn",
    title: "Learn together",
    body: "Attend sessions and Study Jams. Ask questions early, ask them often.",
    color: "green",
  },
  {
    id: "build",
    title: "Build real projects",
    body: "Team up at workshops and hackathons, pick an idea and build something people can actually use.",
    color: "yellow",
  },
  {
    id: "lead",
    title: "Lead the next batch",
    body: "Join the core team, mentor juniors and give direction to greatness.",
    color: "red",
  },
];

export const FAQ = [
  {
    q: "Who can join GDG JIIT?",
    a: "Any student at JIIT 128 who is curious about technology. There is no prerequisite — beginners are exactly who we build our sessions for.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. Many members write their first line of code at one of our sessions. You bring curiosity, we bring the roadmap and the people to help.",
  },
  {
    q: "Is there a membership fee?",
    a: "No. Membership, sessions and Study Jams are free. Some flagship events may have their own registration process.",
  },
  {
    q: "How do I become part of the core team?",
    a: "Recruitment opens once a year. Stay active, help out at events and projects, and apply through the registration form when it opens.",
  },
  {
    q: "What is BitBox?",
    a: "BitBox is our flagship annual hackathon. Teams build a working prototype from scratch and present it to judges from the industry.",
  },
  {
    q: "How do I stay updated about events?",
    a: "Follow us on Instagram and join our Discord — every session, Study Jam and hackathon is announced there first.",
  },
];

export const HISTORY = [
  {
    year: "Origins",
    title: "Developer Student Clubs",
    body: "The chapter starts as DSC JIIT 128 — a handful of students, a shared Discord and a habit of building things together.",
    color: "blue" as GoogleColor,
  },
  {
    year: "GDSC",
    title: "Google Developer Student Clubs",
    body: "The community grows into GDSC JIIT 128, and sessions move from classrooms to auditoriums.",
    color: "red" as GoogleColor,
  },
  {
    year: "2022–23",
    title: "Season of sessions",
    body: "Orientation, roadmaps, Git & GitHub, Compose Camp, crypto and a three-day bootcamp. BitBox 3.0 takes the stage.",
    color: "yellow" as GoogleColor,
  },
  {
    year: "2023–24",
    title: "Into AI",
    body: "AI, ML and deep learning sessions open up machine learning to every year of students.",
    color: "green" as GoogleColor,
  },
  {
    year: "2024",
    title: "GDG on Campus",
    body: "Student clubs worldwide become Google Developer Groups on Campus — same people, a wider community.",
    color: "blue" as GoogleColor,
  },
  {
    year: "2026",
    title: "BitBox 6.0",
    body: "Our biggest hackathon yet, with speakers and judges from Atlassian, Microsoft, Oracle and GeeksforGeeks.",
    color: "red" as GoogleColor,
  },
];

export const VALUES = [
  {
    title: "Learn by building",
    body: "Every session ends with something running on your machine. Theory is the map; building is the climb.",
    color: "blue" as GoogleColor,
  },
  {
    title: "Open by default",
    body: "Our code, our notes and our mistakes are shared, so the next batch starts further ahead than we did.",
    color: "green" as GoogleColor,
  },
  {
    title: "Everyone teaches",
    body: "Seniors mentor juniors, juniors run sessions. The fastest way to learn something is to explain it.",
    color: "yellow" as GoogleColor,
  },
  {
    title: "Ship, then polish",
    body: "We value working prototypes over perfect plans. Feedback only arrives once something is live.",
    color: "red" as GoogleColor,
  },
];
