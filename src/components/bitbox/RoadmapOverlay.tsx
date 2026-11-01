"use client";

import { motion, AnimatePresence } from "motion/react";
import { Ripple } from "@/src/components/ui/ripple";

interface OverlayProps {
  activeRange: boolean;
}

export function RoadmapOverlay({ activeRange }: OverlayProps) {
  return (
    <AnimatePresence>
      {activeRange && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="ripple-background-wrapper"
        >
          <Ripple />
        </motion.div>
      )}
    </AnimatePresence>
  );
}