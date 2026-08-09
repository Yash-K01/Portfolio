# Cinematic Portfolio Hero

A fullscreen, sticky video hero built with Next.js App Router, React, Three.js
and GSAP — your talking-head clip as both foreground video and a blurred
ambient background layer, with a floating warm-ember bokeh field, glass
controls, and a scroll-triggered entrance.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
app/
  layout.js          Fonts + global shell
  page.js             Renders <VideoIntro /> + a placeholder next section
  globals.css         Design tokens (color/type/easing) as CSS custom props
components/
  VideoIntro.jsx        Hero: video layers, overlays, content, controls, GSAP
  VideoIntro.module.css Scoped styles for the hero
  CinematicLayer.jsx    Three.js bokeh/particle canvas (self-contained)
public/videos/
  portfolio-vid.mp4     Your uploaded video, used for both fg + bg layers
```

## Customize

- **Name / role / copy** — edit the props passed to `<VideoIntro />` in
  `app/page.js`.
- **Palette** — all colors live as CSS variables at the top of
  `app/globals.css` (`--color-ember`, `--color-monitor`, etc.). Change once,
  updates everywhere.
- **Particle density / color mix** — `COUNT` and the color `roll` weights
  near the top of `CinematicLayer.jsx`.
- **Video crop / focal point** — `.fgVideo { object-position }` in
  `VideoIntro.module.css` (currently centered, biased toward the top third
  for a talking-head framing).
- **Next section** — swap the placeholder markup in `app/page.js` for your
  real case-study / about / contact content. The scroll indicator already
  targets `#next-section`.

## Notes

- The hero is `position: sticky`, so it holds in place while the next
  section scrolls up over it — a common cinematic reveal pattern. If you'd
  rather it scroll away normally, change `.hero { position: sticky }` to
  `position: relative` in `VideoIntro.module.css`.
- Both `<video>` tags start muted (autoplay policies require this); the
  foreground track unmutes on user interaction via the sound button or the
  "Tap for sound" badge, which auto-hides after 5s.
- `CinematicLayer` pauses its render loop when the tab is hidden and fully
  disposes its Three.js geometry/material/texture/renderer on unmount.
- Respects `prefers-reduced-motion` for the pulse/scroll animations.
