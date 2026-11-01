"use client";

import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/src/lib/utils";

type Common = { label: string; error?: string };

const base =
  "peer w-full rounded-2xl border bg-white/[0.03] px-4 pb-2.5 pt-6 text-bone outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-transparent focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(66,133,244,0.15)]";

function Label({ id, label }: { id: string; label: string }) {
  return (
    <label
      htmlFor={id}
      className="pointer-events-none absolute left-4 top-4 origin-left text-[0.95rem] text-ash transition-all duration-300 peer-focus:top-2 peer-focus:text-[0.68rem] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-g-blue peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[0.68rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest"
    >
      {label}
    </label>
  );
}

function FieldError({ error }: { error?: string }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 pl-1 text-xs text-g-red">
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function Field({ label, error, className, ...props }: Common & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className={className}>
      <div className="relative">
        <input id={id} placeholder={label} aria-invalid={Boolean(error)} {...props} className={cn(base, error ? "border-g-red/60" : "border-white/10 focus:border-g-blue/70")} />
        <Label id={id} label={label} />
      </div>
      <FieldError error={error} />
    </div>
  );
}

export function TextArea({ label, error, className, ...props }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <div className={className}>
      <div className="relative">
        <textarea id={id} placeholder={label} aria-invalid={Boolean(error)} {...props} className={cn(base, "min-h-40 resize-none", error ? "border-g-red/60" : "border-white/10 focus:border-g-blue/70")} />
        <Label id={id} label={label} />
      </div>
      <FieldError error={error} />
    </div>
  );
}
