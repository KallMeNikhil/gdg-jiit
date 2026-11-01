import { Hero } from "../components/home/Hero";
import { Marquee } from "../components/ui/Marquee";
import { Mission } from "../components/home/Mission";
import { Domains } from "../components/home/Domains";
import { Programs } from "../components/home/Programs";
import { Journey } from "../components/home/Journey";
import { EventsPreview } from "../components/home/EventsPreview";
import { TeamTeaser } from "../components/home/TeamTeaser";
import { Faq } from "../components/home/Faq";
import { TICKER } from "../data/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={TICKER} />
      <Mission />
      <Domains />
      <Programs />
      <Journey />
      <EventsPreview />
      <TeamTeaser />
      <Faq />
    </>
  );
}
