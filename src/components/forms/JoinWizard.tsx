"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Code2, Loader2, Megaphone, Palette, PartyPopper } from "lucide-react";
import { Field } from "./Field";
import { Burst } from "./Burst";
import { CtaButton } from "../ui/CtaButton";
import { LINKS } from "@/src/data/site";
import { cn } from "@/src/lib/utils";

type Department = "tech" | "ui/ux" | "management";

type Form = {
  name: string;
  email: string;
  mobileNo: string;
  year: string;
  batch: string;
  departmentInterested: Department | "";
};

const DEPARTMENTS: { id: Department; title: string; body: string; icon: typeof Code2; hex: string }[] = [
  { id: "tech", title: "Tech", body: "Web, app, AI/ML, cloud and CP — build the things.", icon: Code2, hex: "#4285f4" },
  { id: "ui/ux", title: "UI / UX", body: "Interfaces, visuals and brand — make it feel right.", icon: Palette, hex: "#ea4335" },
  { id: "management", title: "Management", body: "Events, outreach and PR — make it happen.", icon: Megaphone, hex: "#34a853" },
];

const STEPS = ["You", "Contact", "Domain", "Review"];
const YEARS = ["1", "2", "3", "4"];

const empty: Form = { name: "", email: "", mobileNo: "", year: "", batch: "", departmentInterested: "" };

function validate(step: number, f: Form) {
  const e: Partial<Record<keyof Form, string>> = {};
  if (step === 0) {
    if (f.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "That email does not look right.";
  }
  if (step === 1) {
    if (!/^\d{10}$/.test(f.mobileNo.trim())) e.mobileNo = "Enter a 10-digit mobile number.";
    if (!f.year) e.year = "Pick your year.";
    if (!f.batch.trim()) e.batch = "Enter your batch, for example F1 or B2.";
  }
  if (step === 2 && !f.departmentInterested) e.departmentInterested = "Choose the domain you are most excited about.";
  return e;
}

export function JoinWizard() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const set = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const next = () => {
    const e = validate(step, form);
    setErrors(e);
    if (Object.keys(e).length) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = async () => {
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/registrationForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          mobileNo: Number(form.mobileNo),
          year: Number(form.year),
          batch: form.batch.trim().toUpperCase(),
          departmentInterested: form.departmentInterested,
        }),
      });
      if (res.status === 201) {
        setStatus("done");
        return;
      }
      setStatus("error");
      setMessage(res.status === 409 ? "Looks like you have already registered with these details." : "Something went wrong. Please check your details and try again.");
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Please try again in a moment.");
    }
  };

  if (status === "done") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="glass relative overflow-hidden rounded-[2rem] p-10 text-center sm:p-14">
        <Burst />
        <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }} className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-g-green/20 text-g-green">
          <PartyPopper size={28} />
        </motion.span>
        <h2 className="mt-7 text-4xl font-semibold">You are in, {form.name.split(" ")[0]}.</h2>
        <p className="mx-auto mt-4 max-w-md text-ash">Your application is with the team. While you wait, come say hi in Discord — that is where everything happens first.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton href={LINKS.discord} variant="blue">Join our Discord</CtaButton>
          <CtaButton href="/events" variant="ghost">Browse events</CtaButton>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
      <ol className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-all duration-500",
                i < step ? "border-g-green bg-g-green text-ink" : i === step ? "border-g-blue bg-g-blue text-white shadow-[0_0_24px_rgba(66,133,244,0.6)]" : "border-white/15 text-mist",
              )}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </span>
            <span className={cn("hidden text-sm sm:block", i === step ? "text-bone" : "text-mist")}>{s}</span>
            {i < STEPS.length - 1 && (
              <span className="relative h-px flex-1 bg-white/10">
                <motion.span className="absolute inset-0 origin-left bg-g-green" animate={{ scaleX: i < step ? 1 : 0 }} transition={{ duration: 0.5 }} />
              </span>
            )}
          </li>
        ))}
      </ol>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < STEPS.length - 1) next();
          else submit();
        }}
        className="mt-10"
        noValidate
      >
        <div className="relative min-h-[22rem]">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={step}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 40, filter: "blur(6px)" }),
                center: { opacity: 1, x: 0, filter: "blur(0px)" },
                exit: (d: number) => ({ opacity: 0, x: d * -40, filter: "blur(6px)" }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 && (
                <div className="space-y-5">
                  <h2 className="text-3xl font-semibold">First, who are you?</h2>
                  <Field label="Full name" value={form.name} onChange={(e) => set("name", e.target.value)} error={errors.name} autoComplete="name" autoFocus />
                  <Field label="Email address" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} error={errors.email} autoComplete="email" />
                </div>
              )}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-3xl font-semibold">How do we reach you?</h2>
                  <Field label="Mobile number" inputMode="numeric" maxLength={10} value={form.mobileNo} onChange={(e) => set("mobileNo", e.target.value.replace(/\D/g, ""))} error={errors.mobileNo} autoComplete="tel-national" />
                  <div>
                    <p className="mb-3 pl-1 text-sm text-ash">Year of study</p>
                    <div role="radiogroup" aria-label="Year of study" className="grid grid-cols-4 gap-2">
                      {YEARS.map((y) => (
                        <button
                          key={y}
                          type="button"
                          role="radio"
                          aria-checked={form.year === y}
                          onClick={() => set("year", y)}
                          className={cn("relative rounded-2xl border py-3 font-display text-lg font-semibold transition-colors", form.year === y ? "border-g-blue text-white" : "border-white/10 text-ash hover:border-white/25")}
                        >
                          {form.year === y && <motion.span layoutId="year-pill" className="absolute inset-0 rounded-2xl bg-g-blue/25" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                          <span className="relative">
                            {y}
                            <sup className="ml-0.5 text-[0.6rem] font-normal">{["st", "nd", "rd", "th"][Number(y) - 1]}</sup>
                          </span>
                        </button>
                      ))}
                    </div>
                    {errors.year && <p className="mt-2 pl-1 text-xs text-g-red">{errors.year}</p>}
                  </div>
                  <Field label="Batch (e.g. F1, B2)" value={form.batch} onChange={(e) => set("batch", e.target.value)} error={errors.batch} />
                </div>
              )}
              {step === 2 && (
                <div>
                  <h2 className="text-3xl font-semibold">Where do you want to start?</h2>
                  <div role="radiogroup" aria-label="Department" className="mt-6 grid gap-3">
                    {DEPARTMENTS.map((d) => {
                      const on = form.departmentInterested === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => set("departmentInterested", d.id)}
                          className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border p-5 text-left transition-colors"
                          style={{ borderColor: on ? d.hex : "rgba(255,255,255,0.1)", background: on ? `${d.hex}18` : "rgba(255,255,255,0.02)" }}
                        >
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110" style={{ background: `${d.hex}22`, color: d.hex }}>
                            <d.icon size={22} />
                          </span>
                          <span className="flex-1">
                            <span className="block font-display text-xl font-semibold">{d.title}</span>
                            <span className="block text-sm text-ash">{d.body}</span>
                          </span>
                          <span className="flex h-6 w-6 items-center justify-center rounded-full border transition-colors" style={{ borderColor: on ? d.hex : "rgba(255,255,255,0.2)", background: on ? d.hex : "transparent" }}>
                            {on && <Check size={13} className="text-ink" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.departmentInterested && <p className="mt-3 pl-1 text-xs text-g-red">{errors.departmentInterested}</p>}
                </div>
              )}
              {step === 3 && (
                <div>
                  <h2 className="text-3xl font-semibold">Looks good?</h2>
                  <dl className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
                    {[
                      ["Name", form.name],
                      ["Email", form.email],
                      ["Mobile", form.mobileNo],
                      ["Year", form.year ? `Year ${form.year}` : ""],
                      ["Batch", form.batch.toUpperCase()],
                      ["Domain", DEPARTMENTS.find((d) => d.id === form.departmentInterested)?.title ?? ""],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
                        <dt className="text-ash">{k}</dt>
                        <dd className="truncate font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="mt-4 rounded-xl border border-g-red/30 bg-g-red/10 px-4 py-3 text-sm text-g-red">
                        {message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button type="button" onClick={back} disabled={step === 0} className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm text-ash transition-colors hover:text-bone disabled:pointer-events-none disabled:opacity-0">
            <ArrowLeft size={16} /> Back
          </button>
          <button
            type="submit"
            disabled={status === "sending"}
            className="g-edge edge-2 group relative inline-flex h-12 items-center gap-2 rounded-2xl bg-white/[0.05] px-6 text-sm font-medium text-white backdrop-blur-xl transition-colors hover:bg-white/[0.09] disabled:opacity-70"
          >
            {status === "sending" ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Submitting
              </>
            ) : step === STEPS.length - 1 ? (
              <>
                Submit application <Check size={16} />
              </>
            ) : (
              <>
                Continue <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
