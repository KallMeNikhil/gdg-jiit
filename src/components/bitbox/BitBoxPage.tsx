"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { TimeLineDetails } from "@/src/data/bitbox/timeline";
import { mockGames } from "@/src/data/bitbox/games";
import { AuroraText } from "../ui/aurora-text";
import { Particles } from "../ui/particles";
import { RoadmapStep } from "./RoadmapStep";
import { RoadmapOverlay } from "./RoadmapOverlay";
import BentoComponent from "./BentoGrid";
import MiniGamesGrid from "./MiniGamesCard";
import SpeakerGrid, { defaultJudges, defaultSpeakers } from "./SpeakerCard";
import Sponsors from "./Sponsors";
import { BeveledBorderButton } from "./BeveledButton";
import "./bitbox-timeline.css";



function SectionTitle({ lead, accent }: { lead: string; accent: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
      <h2 className="text-4xl font-bold tracking-tighter text-white md:text-6xl">
        {lead} <AuroraText>{accent}</AuroraText>
      </h2>
      <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-white/20" />
    </motion.div>
  );
}

export function BitBoxPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(0);
  const { scrollYProgress } = useScroll({ target: spineRef, offset: ["start 0.6", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section className="relative min-h-screen bg-black">
      <Particles className="pointer-events-none fixed inset-0 z-[60] h-full w-full" quantity={250} staticity={30} ease={50} color="#ffffff" refresh={false} />
      <div ref={containerRef} className="roadmap-page-root relative z-10 pt-20">
        <RoadmapOverlay activeRange={activeId >= 0 && activeId <= 9} />

        <header className="roadmap-header">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="roadmap-eyebrow">
            Flagship Hackathon
          </motion.h2>
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="roadmap-title">
            BitBox{" "}
            <AuroraText>
              <span className="roadmap-title-muted">6.0</span>
            </AuroraText>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="roadmap-tagline">
            Simplicity is the ultimate sophistication.
          </motion.p>

          <div className="pointer-events-auto relative z-60 mb-10 mt-14 flex w-full items-center justify-center">
            <div className="group relative flex items-center justify-center overflow-hidden rounded-full p-[1px] shadow-[0_0_50px_-15px_rgba(168,85,247,0.4)] transition-all hover:shadow-[0_0_80px_-15px_rgba(168,85,247,0.6)]">
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#c084fc_10%,#e879f9_30%,transparent_50%)] opacity-80 group-hover:opacity-100" />
              <BeveledBorderButton
                title="Relive it on Devfolio"
                className="border-0 bg-neutral-950/90 px-8 py-2.5 text-sm font-bold shadow-none backdrop-blur-3xl hover:bg-neutral-900 sm:text-lg md:px-12 md:py-4 md:text-xl"
                onClick={() => window.open("https://bitbox6-0.devfolio.co/overview", "_blank", "noopener")}
              />
            </div>
          </div>
        </header>

        <div ref={spineRef} className="roadmap-timeline-spine">
          <div className="roadmap-spine-line static" />
          <motion.div className="roadmap-spine-line active" style={{ scaleY, originY: 0, height: "100%" }} />
          {TimeLineDetails.filter((item) => item.id !== 1).map((item, index) => (
            <RoadmapStep key={item.id} item={item} index={index} onVisible={(id) => setActiveId(id)} />
          ))}
        </div>

        <div className="mb-[100px] mt-[200px] flex w-[80%] flex-col items-center justify-center">
          <SectionTitle lead="Exciting" accent="Prizes" />
          <div className="w-full md:w-[80%] lg:w-[70%]">
            <BentoComponent />
          </div>
        </div>

        <div className="my-[100px] flex w-[80%] flex-col items-center justify-center">
          <SectionTitle lead="Mini" accent="Games" />
          <div className="w-full md:w-[80%] lg:w-[70%]">
            <MiniGamesGrid games={mockGames} />
          </div>
        </div>

        <div className="mb-[100px] mt-[200px] flex w-[95%] max-w-[1400px] flex-col items-center justify-center md:w-[90%] xl:w-[80%]">
          <SectionTitle lead="Our" accent="Speakers" />
          <div className="w-full px-4 md:px-0">
            <SpeakerGrid speakers={defaultSpeakers} />
          </div>
        </div>

        <div className="my-[100px] flex w-[95%] max-w-[1400px] flex-col items-center justify-center md:w-[90%] xl:w-[80%]">
          <SectionTitle lead="Our" accent="Judges" />
          <div className="w-full px-4 md:px-0">
            <SpeakerGrid speakers={defaultJudges} />
          </div>
        </div>

        <Sponsors />
      </div>
    </section>
  );
}
