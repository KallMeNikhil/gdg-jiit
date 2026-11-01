"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, Send } from "lucide-react";
import { Field, TextArea } from "./Field";
import { Burst } from "./Burst";

type Form = { name: string; email: string; message: string };

export function ContactForm() {
  const [form, setForm] = useState<Form>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Form>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
    if (status !== "sending") setStatus("idle");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<Form> = {};
    if (form.name.trim().length < 2) errs.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "That email does not look right.";
    if (form.message.trim().length < 10) errs.message = "A little more detail, please — at least 10 characters.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contactUs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() }),
      });
      if (res.status >= 200 && res.status < 300) {
        setStatus("done");
        setForm({ name: "", email: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submit} noValidate className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
      {status === "done" && <Burst />}
      <h2 className="text-3xl font-semibold">Send a message</h2>
      <p className="mt-2 text-sm text-ash">We usually reply within a couple of days.</p>
      <div className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" value={form.name} onChange={(e) => set("name", e.target.value)} error={errors.name} autoComplete="name" />
          <Field label="Email address" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} error={errors.email} autoComplete="email" />
        </div>
        <TextArea label="How can we help?" value={form.message} onChange={(e) => set("message", e.target.value)} error={errors.message} />
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <AnimatePresence mode="wait">
          {status === "done" && (
            <motion.p key="ok" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-g-green" role="status">
              <Check size={16} /> Message sent. Thank you!
            </motion.p>
          )}
          {status === "error" && (
            <motion.p key="err" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-sm text-g-red" role="alert">
              Could not send right now. Please try again.
            </motion.p>
          )}
        </AnimatePresence>
        <button
          type="submit"
          disabled={status === "sending"}
          className="g-edge edge-2 group relative ml-auto inline-flex h-12 items-center gap-2 rounded-2xl bg-white/[0.05] px-6 text-sm font-medium text-white backdrop-blur-xl transition-colors hover:bg-white/[0.09] disabled:opacity-70"
        >
          {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
          {status === "sending" ? "Sending" : "Send message"}
        </button>
      </div>
    </form>
  );
}
