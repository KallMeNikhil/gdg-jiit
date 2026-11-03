import type { Metadata } from "next";
import { CalendarCheck, GraduationCap, MessagesSquare, Rocket } from "lucide-react";
import { PageHero } from "@/src/components/layout/PageHero";
import { JoinWizard } from "@/src/components/forms/JoinWizard";
import { Reveal } from "@/src/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Join",
  description: "Become a member of Google Developer Groups on Campus at JIIT 128. It takes two minutes and it is free.",
};

const PERKS = [
  { icon: CalendarCheck, title: "Early access to events", body: "Hear about sessions, Study Jams and hackathons before anyone else.", color: "#4285f4" },
  { icon: GraduationCap, title: "Mentors who reply", body: "Seniors and alumni who review your code and your resume.", color: "#34a853" },
  { icon: Rocket, title: "Projects that ship", body: "Teams and ideas to build something real, not just tutorials.", color: "#ea4335" },
  { icon: MessagesSquare, title: "A community on Discord", body: "Ask anything, any time — someone has been stuck there before.", color: "#fbbc04" },
];

export default function JoinPage() {
  return (
    <>
      <PageHero kicker="Membership is free" title={["Start your", <span key="j" className="g-text">journey.</span>]} />
      <section className="pb-16">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <div className="space-y-4 lg:sticky lg:top-28">
            <Reveal>
              <p className="max-w-md text-pretty text-lg leading-relaxed text-ash">Four quick steps and you are part of the chapter. Here is what membership gets you:</p>
            </Reveal>
            <ul className="mt-6 space-y-3">
              {PERKS.map((p, i) => (
                <Reveal as="li" key={p.title} delay={0.1 + i * 0.07} className="group flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors hover:border-white/20 active:border-white/20">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 group-active:-rotate-6 group-active:scale-110" style={{ background: `${p.color}1f`, color: p.color }}>
                    <p.icon size={20} />
                  </span>
                  <span>
                    <span className="block font-medium">{p.title}</span>
                    <span className="block text-sm text-ash">{p.body}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={0.15}>
            <JoinWizard />
          </Reveal>
        </div>
      </section>
    </>
  );
}
