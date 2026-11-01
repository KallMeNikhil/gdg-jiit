"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "blue";
  icon?: LucideIcon;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export function CtaButton({ href, children, icon: Icon, external, type = "button", disabled, onClick, className }: Props) {
  const inner = (
    <span
      className={cn(
        "g-edge edge-2 group relative inline-flex h-12 items-center gap-2.5 rounded-2xl px-6 text-[0.95rem] font-medium backdrop-blur-xl transition-[background-color,transform] duration-300 active:scale-[0.97]",
        "bg-white/[0.04] text-bone hover:bg-white/[0.08]",
        disabled && "pointer-events-none opacity-60",
        className,
      )}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      {Icon && <Icon size={17} strokeWidth={2} className="relative" />}
      <span className="relative">{children}</span>
    </span>
  );

  if (!href) {
    return (
      <button type={type} disabled={disabled} onClick={onClick} className="rounded-2xl">
        {inner}
      </button>
    );
  }
  if (external || href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="rounded-2xl">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className="rounded-2xl">
      {inner}
    </Link>
  );
}
