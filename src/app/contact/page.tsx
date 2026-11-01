import type { Metadata } from "next";
import { ArrowUpRight, Github, Instagram, Linkedin, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/src/components/layout/PageHero";
import { ContactForm } from "@/src/components/forms/ContactForm";
import { Reveal } from "@/src/components/motion/Reveal";
import { LINKS, SITE } from "@/src/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Google Developer Groups on Campus at JIIT 128.",
};

const CHANNELS = [
  { label: "Discord", handle: "Join the server", href: LINKS.discord, icon: MessageCircle, color: "#4285f4" },
  { label: "Instagram", handle: "@gdg_jiit", href: LINKS.instagram, icon: Instagram, color: "#ea4335" },
  { label: "LinkedIn", handle: "GDG JIIT", href: LINKS.linkedin, icon: Linkedin, color: "#fbbc04" },
  { label: "GitHub", handle: "dsc-jiit-128", href: LINKS.github, icon: Github, color: "#34a853" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="We read everything"
        title={["Let's", <span key="t" className="g-text">talk.</span>]}
        lead="Questions about joining, a collaboration idea or a sponsorship for our next hackathon — drop us a line."
      />
      <section className="pb-16">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {CHANNELS.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.06}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] glass p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1"
                  >
                    <span aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60" style={{ background: c.color }} />
                    <div className="relative flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${c.color}1f`, color: c.color }}>
                        <c.icon size={20} />
                      </span>
                      <ArrowUpRight size={18} className="text-mist transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
                    </div>
                    <p className="relative mt-8 font-display text-xl font-semibold">{c.label}</p>
                    <p className="relative text-sm text-ash">{c.handle}</p>
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3}>
              <div className="relative overflow-hidden rounded-[1.5rem] glass p-6">
                <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-70" />
                <div aria-hidden="true" className="absolute right-10 top-1/2 -translate-y-1/2">
                  <span className="absolute -inset-6 animate-ping rounded-full bg-g-red/20" />
                  <span className="relative block h-4 w-4 rounded-full bg-g-red shadow-[0_0_24px_#ea4335]" />
                </div>
                <div className="relative flex items-start gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06]">
                    <MapPin size={20} />
                  </span>
                  <div>
                    <p className="font-display text-xl font-semibold">Find us on campus</p>
                    <p className="mt-1 text-sm text-ash">{SITE.campus}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
