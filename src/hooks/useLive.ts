"use client";

import { useInView } from "motion/react";
import type { RefObject } from "react";
import { usePointerFine } from "./useMediaQuery";

export function useLive(ref: RefObject<Element | null>, margin: `${number}% ${number}${"px" | "%"} ${number}% ${number}${"px" | "%"}` = "-35% 0px -35% 0px") {
  const fine = usePointerFine();
  const centred = useInView(ref, { margin });
  return { fine, live: !fine && centred };
}
