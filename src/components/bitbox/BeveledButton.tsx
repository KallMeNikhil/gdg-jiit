"use client";

import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface BeveledBorderButtonProps {
  title?: string;
  className?: string;
  icon?: LucideIcon;
  onClick?: () => void;
}

export const BeveledBorderButton = ({ title, className, icon: Icon = ArrowUpRight, onClick }: BeveledBorderButtonProps) => {
  return (
    <motion.button
      type="button"
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={cn(
        "relative z-10 flex cursor-pointer items-center justify-center gap-2 rounded-full border-transparent bg-neutral-950 px-4 py-1.5 text-sm font-medium text-white shadow-[0px_-1px_0px_0px_#FFFFFF40_inset,_0px_1px_0px_0px_#FFFFFF40_inset] transition-colors duration-200 hover:bg-neutral-900",
        className,
      )}
      onClick={onClick}
    >
      {title}
      <motion.span
        className="inline-flex"
        variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: 45, scale: 1.06 } }}
        transition={{ type: "spring", stiffness: 900, damping: 15 }}
      >
        <Icon size={18} />
      </motion.span>
    </motion.button>
  );
};
