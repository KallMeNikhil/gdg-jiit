"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const BLOBS = [
  { color: "rgba(66,133,244,0.34)", size: "62vmax", top: "-18%", left: "-14%", path: "aurora-a", time: "34s" },
  { color: "rgba(234,67,53,0.24)", size: "54vmax", top: "38%", left: "62%", path: "aurora-b", time: "41s" },
  { color: "rgba(251,188,4,0.18)", size: "46vmax", top: "62%", left: "-6%", path: "aurora-c", time: "38s" },
  { color: "rgba(52,168,83,0.24)", size: "50vmax", top: "-10%", left: "58%", path: "aurora-d", time: "45s" },
];



export function Atmosphere() {
  const pathname = usePathname();
  const home = pathname === "/";
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const homeLogo = useTransform(scrollY, [150, 800], [0, 0.24]);
  const logoScale = useTransform(progress, [0, 1], [0.9, 1.2]);
  const logoRotate = useTransform(progress, [0, 1], [-8, 20]);
  const shiftA = useTransform(progress, [0, 1], ["0vh", "-30vh"]);
  const shiftB = useTransform(progress, [0, 1], ["0vh", "24vh"]);

  return (
    <div aria-hidden="true" className="atmosphere">
      {BLOBS.map((b, i) => (
        <motion.div key={b.path} className="absolute" style={{ top: b.top, left: b.left, y: i % 2 ? shiftB : shiftA }}>
          <div
            className="rounded-full will-change-transform"
            style={{ width: b.size, height: b.size, background: `radial-gradient(circle, ${b.color}, transparent 70%)`, animation: `${b.path} ${b.time} ease-in-out infinite alternate` }}
          />
        </motion.div>
      ))}

      <div className="grid-lines absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_80%)]" />

      <motion.div style={{ opacity: home ? homeLogo : 0.22, scale: logoScale, rotate: logoRotate }} className="absolute left-1/2 top-1/2 h-0 w-0">
        <div className="absolute left-0 top-0 h-[min(95vw,820px)] w-[min(95vw,820px)] [animation:logo-drift_18s_ease-in-out_infinite]">
          <Image src="/gdg-outlined-logo.png" alt="" fill sizes="820px" className="object-contain mix-blend-screen [mask-image:radial-gradient(circle,#000_45%,transparent_72%)]" />
        </div>
      </motion.div>

      <div className="atmosphere-vignette" />
    </div>
  );
}
