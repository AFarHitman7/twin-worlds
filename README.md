# TWIN WORLDS

Earth's deserts, craters and lava fields, set beside the Mars and Moon landscapes they stand in for. A single-page site with a comparison scanner and a twelve-round guess-the-planet game.

## Run it

```bash
npm install
npm run dev
```

Vite prints the local URL (usually http://localhost:5173).

```bash
npm run build     # production build into dist/
npm run preview   # serve the build locally
```

`vite.config.js` sets `base: "./"`, so `dist/` works from a domain root, a subfolder, or a plain file server without a rebuild.

## Structure

```
index.html                  entry document: meta, fonts, #root
src/main.jsx                mounts App, imports global styles
src/App.jsx                 page composition and loader state
src/styles/global.css       tokens, reset, base type, shared primitives
src/data/                   every string, image URL and stat on the page
src/hooks/                  intersection, media queries, scroll, tilt, magnetic
src/lib/                    class-name helper, confetti, placeholder image
src/components/
  chrome/                   loader, cursor, starfield, stardust trail,
                            space backdrop, progress bar, to-top, lightbox
  layout/                   nav, ticker, divider, footer
  ui/                       button, reveal, section head, site card, pills
  sections/                 hero, worlds, fidelity, mars, moon, compare,
                            lookalikes, gallery, game, sources
```

Each component carries its own `*.module.css`. Styles shared across components — tokens, typography, buttons, the reveal and tilt primitives — live in `src/styles/global.css`.

## Notes

- Artwork is hotlinked from NASA and Wikimedia Commons sources listed in the Sources section; there is no build-time image pipeline.
- The page works without a backend. Game state is local to the session.
- Motion respects `prefers-reduced-motion`.
