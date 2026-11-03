"use client";

import { useRef, type HTMLAttributes } from "react";
import { useLive } from "@/src/hooks/useLive";

export function LiveGroup({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const { live } = useLive(ref);
  return <div ref={ref} data-live={live} className={`group ${className}`} {...rest} />;
}
