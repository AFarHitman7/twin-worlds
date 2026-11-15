# TWIN WORLDS

Earth's deserts, craters and lava fields, set beside the Mars and Moon landscapes they stand in for. The site has three pages: a landing page that introduces the worlds and the comparison, an atlas that places eighteen analogue sites on an interactive globe and scores each one against its destination, and a twelve-round signal test that asks you to name the world from a greyscale photograph.

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

`vite.config.js` sets `base: "./"`, and every route lives in the hash, so `dist/` works from a domain root, a subfolder, or a plain file server without a rebuild.

## Pages

| Route | Page | What it holds |
| --- | --- | --- |
| `#/` | Landing | Hero, ticker, the three worlds, fidelity criteria, Mars and Moon sections, the compare scanner, the lookalikes, the gallery, and two ways onward. |
| `#/atlas` | The atlas | Three.js globe with eighteen pins; a dossier with location, geography, geology, atmosphere, why the site is an analogue and where it fails; seven parameters scored 0–100 against Mars and the Moon; the weighted composite; the ranked list, reference values and sources. |
| `#/atlas/<slug>` | A dossier | The atlas with one site selected and its dossier open, e.g. `#/atlas/rio-tinto`. Unknown slugs fall back to the default site. |
| `#/game` | Signal test | Twelve rounds. Each photograph is drawn to a 480×270 canvas in greyscale, shown with viewfinder chrome, answered with one of three worlds, then reviewed in a twelve-cell grid. |

## Structure

```
index.html                  entry document: meta, favicon, fonts, #root
src/main.jsx                mounts App, imports global styles
src/App.jsx                 route switch, lazy atlas and game, chrome
src/pages/                  landing, atlas and game pages with page styles
src/router/useRoute.js      hash reading, navigation and scroll-to-top
src/components/
  atlas/                    globe, dossier, parameter table, rubric,
                            similarity ring
  game/                     the normalised reconnaissance frame
  chrome/                   loader, cursor, starfield, stardust trail,
                            space backdrop, progress bar, to-top, lightbox
  layout/                   nav, ticker, divider, footer
  sections/                 hero, worlds, fidelity, mars, moon, compare,
                            lookalikes, gallery, next steps, sources
  ui/                       button, reveal, section head, site card, pills
src/data/                   every string, image URL, site record and stat
src/hooks/                  in-view, media queries, motion, scroll, scroll spy
src/lib/                    class names, formatting, effects, similarity maths
src/styles/global.css       tokens, reset, base type, shared primitives
public/textures/            the globe's Earth texture
```

Each component carries its own `*.module.css`. Styles shared across components — tokens, typography, buttons, the reveal and tilt primitives — live in `src/styles/global.css`.

## The globe

The atlas draws the Earth with three.js. The page is a lazy-loaded chunk, so three.js is not part of the landing bundle.

The texture is NASA Earth Observatory's Blue Marble, `Land_ocean_ice_2048.jpg` (2048×1024, 266 kB), public domain, downloaded via Wikimedia Commons and stored locally at `public/textures/earth-blue-marble.jpg`. It is equirectangular, and the pins use the inverse of the sphere's UV mapping so each coast sits under its site.

If WebGL is unavailable, or the texture or the context fails, the globe shows a short message and a control that scrolls to the ranked list; the site facts stay readable. Touch and mouse drag rotate the globe, pinch or scroll zooms it, and the zoom buttons are keyboard controls.

## Similarity scores

Every site is scored 0–100 against each destination it targets, on seven parameters:

| Parameter | Mars reference | Moon reference | Weight |
| --- | --- | --- | --- |
| Mean temperature | −63 °C | −53 °C (mean; −173 to +127 °C) | 0.18 |
| Diurnal swing | about 90 K | about 300 K | 0.12 |
| Precipitation | less than 1 mm/yr | 0 mm | 0.20 |
| Surface pressure | 0.6 kPa | effectively 0 | 0.15 |
| Radiation load | about 250 mSv/yr | about 380 mSv/yr | 0.15 |
| Regolith / mineralogy | basalt, iron oxides, sulfates | anorthosite, glass, nanophase iron | 0.12 |
| Operational fidelity | 3–22 min light delay | 1.3 s light delay | 0.08 |

The rubric is fixed:

- 100 — indistinguishable
- 75 — strong match
- 50 — same process
- 25 — same category

The composite is the weighted mean of the seven scores, rounded, and is computed at runtime in `src/lib/similarity.js`; it is not stored in the data. Gravity is printed as a reference value but is not one of the scored parameters, because no site on Earth can differ from 1 g.

The scores are honest about the limits. Every site is still on Earth: surface pressure, gravity and mean temperature keep even the strongest analogue under 50 out of 100. A high score means the site rehearses the same processes, not that it is another planet.

## Game normalisation

Each round's photograph is loaded at its source size, cover-fitted into a 480×270 canvas backing store, and shown larger with smoothing. The grey comes from a CSS filter on the canvas. Nothing reads the pixels back, so the cross-origin images are fine, and there is no build-time image pipeline: the photographs are still hotlinked from Wikimedia Commons and NASA.

## Data and sources

`src/data/atlas.js` is the single source for the atlas and for the landing cards: change a site there and both pages follow. `src/data/sources.js` holds the citations shown in the Sources section. Imagery is hotlinked from Wikimedia Commons and NASA, except the globe texture, which is stored locally. The content is educational; the site makes no scientific claim of its own.

## Notes

- Motion respects `prefers-reduced-motion`: no globe spin, scanline, blinking REC or sheet slide.
- State is local to the browser: the game's best score is kept in `localStorage`, and there are no accounts and no backend.
- The atlas and the game are lazy-loaded. The site needs a network connection for its photographs.
