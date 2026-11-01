export type TimelineType = {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: string;
};

export const TimeLineDetails: TimelineType[] = [
  {
    id: 1,
    title: "Application Deadline",
    description: "Last date to submit applications for participation.",
    date: "13 April 2026",
    icon: "📝",
  },
  {
    id: 2,
    title: "PPT Submission Deadline",
    description: "Teams must submit their presentation decks for evaluation.",
    date: "15 April 2026",
    icon: "📊",
  },
  {
    id: 3,
    title: "PPT Results",
    description: "Results of the presentation round are announced.",
    date: "16 April 2026",
    icon: "✅",
  },
  {
    id: 4,
    title: "Speakers & Mini Events",
    description: "Engaging speaker sessions and mini-events for participants.",
    date: "17 April 2026",
    icon: "🎤",
  },
  {
    id: 5,
    title: "Grand Finale",
    description: "Final presentations, judging, and announcement of winners.",
    date: "18 April 2026",
    icon: "🏆",
  },
];