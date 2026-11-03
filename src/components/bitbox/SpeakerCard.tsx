"use client";
import React from "react";
import { ArrowRight, UserCircle2, Mail } from "lucide-react";
import { LiveGroup } from "../ui/LiveGroup";

export interface SpeakerCardProps {
  name?: string;
  role?: string;
  image?: string;
  borderColor?: string;
  glowStyles?: string;
  ambientColor?: string;
}

export const defaultSpeakers: SpeakerCardProps[] = [
  {
    name: "Harshit Trehan",
    role: "SDE 2 @ Atlassian",
    image: "/speakers/harshit_trehan.webp",
    borderColor: "border-pink-500/20",
    glowStyles: "hover:shadow-[0_0_30px_-10px_rgba(236,72,153,0.3)]",
    ambientColor: "rgba(236,72,153,0.1)",
  },
  {
    name: "Raghav Garg",
    role: "Senior Member of Technical Staff @ GFG",
    image: "/speakers/raghav-garg.webp",
    borderColor: "border-pink-500/20",
    glowStyles: "hover:shadow-[0_0_30px_-10px_rgba(236,72,153,0.3)]",
    ambientColor: "rgba(236,72,153,0.1)",
  }
];

export const defaultJudges: SpeakerCardProps[] = [
  {
    name: "Harshit Trehan",
    role: "SDE 2 @ Atlassian",
    image: "/speakers/harshit_trehan.webp",
    borderColor: "border-pink-500/20",
    glowStyles: "hover:shadow-[0_0_30px_-10px_rgba(236,72,153,0.3)]",
    ambientColor: "rgba(236,72,153,0.1)",
  },
  {
    name: "Raghav Garg",
    role: "Senior Member of Technical Staff @ GFG",
    image: "/speakers/raghav-garg.webp",
    borderColor: "border-pink-500/20",
    glowStyles: "hover:shadow-[0_0_30px_-10px_rgba(236,72,153,0.3)]",
    ambientColor: "rgba(236,72,153,0.1)",
  },
  {
    name: "Rishabh Agarwal",
    role: "Senior SDE @ Microsoft",
    image: "/speakers/rishabh_agarwal.jpeg",
    borderColor: "border-blue-500/20",
    glowStyles: "hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]",
    ambientColor: "rgba(59,130,246,0.1)",
  },
  {
    name: "Shashwat",
    role: "Developer @ Internshala",
    image: "/speakers/shashwat.webp",
    borderColor: "border-orange-500/20",
    glowStyles: "hover:shadow-[0_0_30px_-10px_rgba(249,115,22,0.3)]",
    ambientColor: "rgba(249,115,22,0.1)",
  },
  {
    name: "Amish",
    role: "Technical Consultant @ Oracle",
    image: "/speakers/amish.webp",
    borderColor: "border-purple-500/20",
    glowStyles: "hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]",
    ambientColor: "rgba(168,85,247,0.1)",
  }
];

export default function SpeakerGrid({ speakers = defaultSpeakers }: { speakers?: SpeakerCardProps[] }) {
  return (
    <div className="relative z-40 w-full max-w-none px-0 py-6 md:px-6 md:py-8 lg:px-10 xl:px-16">
      <div className="grid grid-cols-1 gap-5 auto-rows-[420px] min-[560px]:grid-cols-2 md:gap-6 md:auto-rows-[480px]">
        {speakers.map((speaker, index) => (
          <LiveGroup
            key={index}
            className={`relative overflow-hidden rounded-[32px] md:rounded-[40px]
            border bg-[rgba(15,15,15,0.4)] saturate-150 
            transition-all duration-500 hover:scale-[1.01] live:scale-[1.01]
            ${speaker.borderColor || "border-white/10"} 
            ${speaker.glowStyles || "hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.15)]"}`}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 group-live:opacity-100
              transition-opacity duration-500 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to bottom, ${speaker.ambientColor || 'rgba(255,255,255,0.05)'}, transparent)`
              }}
            />

            <div className="absolute inset-0 pointer-events-none">
              {speaker.image ? (
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 transition-all duration-700 
                  group-hover:opacity-100 group-hover:scale-105 group-live:opacity-100 group-live:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-end pr-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <UserCircle2 size={240} strokeWidth={1} />
                </div>
              )}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,transparent_20%,rgba(10,10,10,0.9)_100%)]" />
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/70 to-transparent" />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-10">
              <div className="flex flex-col gap-4">
                <div className="p-3 w-fit rounded-2xl bg-white/5 border border-white/10 shadow-2xl transition-transform group-hover:rotate-6 group-live:rotate-6">
                  <UserCircle2 className="w-7 h-7 text-white/70" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-[1.75rem] font-bold leading-tight tracking-tight text-white md:text-3xl">
                    {speaker.name}
                  </h3>
                  <p className="text-base text-orange-500/80 font-medium uppercase tracking-widest text-[10px]">
                    {speaker.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs font-medium text-white/40 
                group-hover:text-white group-live:text-white transition-colors cursor-pointer">
                  <Mail className="w-4 h-4" />
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1 group-live:translate-x-1" />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          </LiveGroup>
        ))}
      </div>
    </div>
  );
}