import { COLOR_HEX, type GoogleColor } from "@/src/data/site";

const ORDER: GoogleColor[] = ["blue", "red", "yellow", "green"];

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div aria-hidden="true" className="group relative flex select-none overflow-hidden border-y border-white/[0.06] bg-white/[0.02] py-5 backdrop-blur-md mask-fade-x">
      <div className="animate-marquee flex shrink-0 gap-10 whitespace-nowrap pr-10 group-hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10 font-display text-xl font-medium tracking-tight text-ash transition-colors hover:text-bone sm:text-2xl">
            <span>{item}</span>
            <span className="h-2 w-2 rotate-45 rounded-[2px]" style={{ background: COLOR_HEX[ORDER[i % 4]] }} />
          </span>
        ))}
      </div>
    </div>
  );
}
