# GDG JIIT 128

The website of Google Developer Groups on Campus at JIIT, Sector 128 — events, team, programs, membership and our flagship hackathon, BitBox.

## Stack

- **Next.js 16** (App Router) and **React 19**
- **Tailwind CSS v4** with design tokens in `src/app/globals.css`
- **Motion** for animation, **Lenis** for smooth scrolling, **Three.js** for the hero field
- **MongoDB / Mongoose** and **Resend** behind the API routes

## Getting started

```sh
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:3000. The API routes need `MONGODB_URI` and `RESEND_API_KEY` in `.env`.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home — hero, mission, domains, programs, journey, events, team, FAQ |
| `/about` | Story timeline, values and domains |
| `/events` | Every event, filterable by season and type, with a detail view |
| `/team` | Mentors, team leads and core team spotlights |
| `/bitbox` | BitBox 6.0 archive — timeline, prizes, speakers, judges, sponsors |
| `/join` | Membership registration (`POST /api/registrationForm`) |
| `/contact` | Contact form (`POST /api/contactUs`) |

Old URLs such as `/events/2022-2023`, `/contact-us`, `/gdg-registration-form` and `/teams` redirect to their new homes.

## Editing content

All copy lives in `src/data`:

- `site.ts` — links, navigation, domains, programs, journey, FAQ, history and values
- `events.ts` — every event; add a `date` to an upcoming event to show the live countdown
- `team/` — team rosters and photos
- `bitbox/` — BitBox timeline, prizes and mini games

## Structure

```
src/
  app/          routes, layout, page transitions and API routes
  components/   layout, home, events, team, about, forms, bitbox, motion and ui
  data/         site content
  hooks/        media query and intro hooks
  lib/ model/ validation/   backend helpers
```

Animations respect `prefers-reduced-motion`, and the WebGL hero falls back to a static gradient on software renderers or slow machines.
