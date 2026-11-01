import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/teams", destination: "/team", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/gdg-registration-form", destination: "/join", permanent: true },
      { source: "/events/:season(\\d{4}-\\d{4})", destination: "/events?season=:season", permanent: true },
    ];
  },
};

export default nextConfig;
