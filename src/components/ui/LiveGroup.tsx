"use client";

import type { HTMLAttributes, MouseEvent } from "react";
import { useLive } from "@/src/hooks/useLive";

export function LiveGroup({ className = "", onClick, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const { live, tap } = useLive();
  return (
    <div
      data-live={live}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        tap();
        onClick?.(e);
      }}
      className={`group ${className}`}
      {...rest}
    />
  );
}
