"use client";

import { motion } from "motion/react";
import { usePointerFine } from "@/src/hooks/useMediaQuery";

export default function Template({ children }: { children: React.ReactNode }) {
  const fine = usePointerFine();

  return (
    <motion.div
      initial={fine ? { opacity: 0, y: 24, filter: "blur(8px)" } : { opacity: 0, y: 24 }}
      animate={fine ? { opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none", transform: "none" } } : { opacity: 1, y: 0, transitionEnd: { transform: "none" } }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
