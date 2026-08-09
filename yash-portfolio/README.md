# Yash Khartode — Cinematic 3D Portfolio (MERN)

A premium, cinematic portfolio for Yash Khartode. The frontend is Next.js
(App Router) + React + Three.js + GSAP; the contact form is backed by a
small Express + MongoDB API — together that's the full **M**ongoDB /
**E**xpress / **R**eact / **N**ode stack, in JavaScript throughout.

## Structure

```
yash-portfolio/
├── app/                  # Next.js App Router (layout, globals.css, page.js)
├── components/           # One folder per section, each with its .module.css
│   ├── Navbar/
│   ├── VideoIntro/       # Cinematic hero: fg + blurred bg video, controls
│   ├── CinematicLayer/   # Three.js bokeh/particle atmosphere
│   ├── About/
│   ├── Projects/
│   ├── Skills/
│   ├── Experience/
│   ├── Education/
│   ├── Achievements/
│   ├── Contact/          # Copy-to-clipboard + form → Express API
│   └── Footer/
├── data/portfolioData.js # All real content in one place — edit here
├── hooks/                # useGsapReveal (scroll reveals), useActiveSection (navbar)
├── public/videos/hero.mp4  # Your talking-head video
└── server/                # Express + MongoDB backend (contact form)
    ├── server.js
    ├── models/Message.js
    └── routes/contact.js
```

## Run the frontend

```bash
cd yash-portfolio
npm install
npm run dev
```

Open http://localhost:3000. The hero video is already wired to
`/public/videos/hero.mp4` — swap that file for a different clip any time
and everything else (autoplay, blurred duplicate, play/pause, mute) keeps
working unchanged.

## Run the backend (contact form storage)

You need a MongoDB instance — either local (`mongod`) or a free
[MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

```bash
cd server
cp .env.example .env       # edit MONGO_URI if using Atlas
npm install
npm run dev
```

This starts the API on `http://localhost:5000` with:
- `POST /api/contact` — saves `{ name, email, message }` to MongoDB
- `GET /api/contact` — lists saved messages (add real auth before exposing publicly)
- `GET /api/health` — health check

Then in the project root, copy `.env.local.example` to `.env.local` so the
frontend knows where the API lives:

```bash
cp .env.local.example .env.local
```

If you skip the backend, the site still works — the form will just show a
friendly error and visitors can still email/copy your contact details
directly.

## Editing content

Everything text-based (name, projects, skills, experience, education,
achievements, links) lives in `data/portfolioData.js`. Update it there and
every section re-renders automatically — no need to touch component files.

## Deploying

- **Frontend:** Vercel (zero-config for Next.js). Set `NEXT_PUBLIC_API_URL`
  to your deployed backend URL in the Vercel project's environment variables.
- **Backend:** Render, Railway, or any Node host. Set `MONGO_URI` to your
  Atlas connection string and `CLIENT_ORIGIN` to your deployed frontend URL.

## Notes on the design

Dark cinematic base (`#0a0806`) with warm ember (`#ff7a33`) and soft blue
(`#4fa8ff`) accent glows, per the brief. Display type is Bebas Neue for the
huge stacked name and section titles; body copy is Inter; labels/timestamps
use JetBrains Mono for a technical, data-driven feel that matches the
AI/ML subject matter. The Three.js `CinematicLayer` behind the hero is the
signature element — slow warm/white bokeh particles with additive blending
and gentle mouse parallax, tuned to feel like a film title card rather than
a game effect.
