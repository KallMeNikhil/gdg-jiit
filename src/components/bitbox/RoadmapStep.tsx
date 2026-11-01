"use client";

import { motion } from "motion/react";
import { MagicCard } from "@/src/components/ui/magic-card";
import { TimelineType } from "@/src/data/bitbox/timeline";

interface StepProps {
  item: TimelineType;
  index: number;
  onVisible: (id: number) => void;
}

export function RoadmapStep({ item, index, onVisible }: StepProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      onViewportEnter={() => onVisible(item.id)}
      viewport={{ margin: "-30% 0px -30% 0px" }} 
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`roadmap-step ${index % 2 === 0 ? "step-left" : "step-right"}`}
    >
      <div className="roadmap-dot">
        <div className="roadmap-dot-core" />
      </div>

      <div className="roadmap-card-anchor">
        <MagicCard 
          className="roadmap-bento-box"
          gradientSize={250}
          gradientOpacity={0.8}
          gradientColor="#262626"
          gradientFrom="#9E7AFF"
          gradientTo="#FE8BBB"
        >
          <div className="roadmap-box-inner">
            <span className="roadmap-box-date">{item.date}</span>
            <h3 className="roadmap-box-title">{item.title}</h3>
            <p className="roadmap-box-text">{item.description}</p>
          </div>
          <div className="roadmap-box-number">
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </div>
        </MagicCard>
      </div>
    </motion.div>
  );
}