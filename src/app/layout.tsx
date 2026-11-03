import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/layout/Providers";
import { Atmosphere } from "../components/layout/Atmosphere";
import { Preloader, preloadScript } from "../components/layout/Preloader";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
import { ScrollRail } from "../components/layout/ScrollRail";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "GDG JIIT 128 - Giving Direction to Greatness",
    template: "%s · GDG JIIT 128",
  },
  description:
    "Google Developer Groups on Campus at JIIT 128 - a student-led community of builders learning, shipping and growing together with Google technologies.",
  openGraph: {
    title: "GDG JIIT 128",
    description: "A student-led community of builders at JIIT 128.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#07080b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: preloadScript }} />
        <Providers>
          <Preloader />
          <Atmosphere />
          <Nav />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
          <ScrollRail />
        </Providers>
      </body>
    </html>
  );
}
