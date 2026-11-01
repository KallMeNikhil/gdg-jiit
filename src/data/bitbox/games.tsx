import { type LucideIcon, Sparkles } from "lucide-react";

export interface GameCardProps {
  title: string;
  description: string;
  image?: string;
  icon?: LucideIcon;
  borderColor?: string;
  glowStyles?: string;
  ambientColor?: string;
}
export const mockGames: GameCardProps[] = [
  {
    title: "Memory Matrix",
    description: "Test your focus and memory sequence in the ultimate mental sprint.",
    icon: Sparkles,
    borderColor: "border-purple-500/20 hover:border-purple-500/50",
    glowStyles: "hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)]",
    ambientColor: "rgba(168,85,247,0.1)",
    image: "/memory-matrix.webp"
  }
];