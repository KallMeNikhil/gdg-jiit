import type { Metadata } from "next";
import { PageHero } from "@/src/components/layout/PageHero";
import { HistoryTrack } from "@/src/components/about/HistoryTrack";
import { TiltCard } from "@/src/components/about/TiltCard";
import { SectionHeading } from "@/src/components/motion/SectionHeading";
import { Highlight } from "@/src/components/motion/Highlight";
import { Reveal } from "@/src/components/motion/Reveal";
import { Domains } from "@/src/components/home/Domains";
import { CtaButton } from "@/src/components/ui/CtaButton";
import { COLOR_HEX, SITE, VALUES } from "@/src/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "The story, values and domains of Google Developer Groups on Campus at JIIT 128.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About the chapter"
        title={["Giving direction", <span key="g" className="g-text">to greatness.</span>]}
        lead="We are a student-run chapter of Google Developer Groups on Campus at JIIT, Sector 128 — a place to learn by building, with people who want you to win."
      />

      <section className="py-20 sm:py-28">
        <div className="shell">
          <Reveal>
            <p className="mx-auto max-w-5xl text-balance text-center font-display text-[clamp(1.6rem,3.8vw,3.1rem)] font-medium leading-[1.25] tracking-[-0.03em]">
              Every chapter starts with a few curious students and a shared Discord. Ours grew into a <Highlight color="#4285f4">hackathon</Highlight> now six editions deep, <Highlight color="#34a853" delay={0.2}>Study Jams</Highlight> that run all semester and a team that teaches what it learns. The tools change every year. The habit of <Highlight color="#fbbc04" delay={0.4}>building together</Highlight> does not.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pt-10">
        <div className="shell">
          <SectionHeading index="01" eyebrow="Our story" title={<>How we <span className="text-ash">got here.</span></>} lead="Scroll through the milestones that shaped the chapter — from DSC to GDG on Campus." />
        </div>
        <HistoryTrack />
      </section>

      <section className="py-24 sm:py-32">
        <div className="shell">
          <SectionHeading index="02" eyebrow="What we believe" title={<>Four rules we <span className="g-text">build by.</span></>} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.08}>
                <TiltCard glow={COLOR_HEX[v.color]} className="h-full p-9">
                  <span className="font-mono text-sm" style={{ color: COLOR_HEX[v.color] }}>0{i + 1}</span>
                  <h3 className="mt-10 text-3xl font-semibold">{v.title}</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-ash">{v.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Domains index="03" />

      <section className="py-20">
        <div className="shell">
          <Reveal className="glass flex flex-col items-start gap-6 rounded-[2rem] p-9 sm:flex-row sm:items-center sm:justify-between sm:p-12">
            <div>
              <p className="kicker">{SITE.motto}</p>
              <p className="mt-3 max-w-xl font-display text-3xl font-semibold sm:text-4xl">Your first step is one form away.</p>
            </div>
            <CtaButton href="/join" variant="blue">Join GDG JIIT</CtaButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
