import type { Metadata } from "next";
import { BitBoxPage } from "@/src/components/bitbox/BitBoxPage";

export const metadata: Metadata = {
  title: "BitBox 6.0",
  description: "BitBox 6.0, the flagship hackathon of GDG JIIT 128 — timeline, prizes, speakers, judges and sponsors.",
};

export default function Page() {
  return <BitBoxPage />;
}
