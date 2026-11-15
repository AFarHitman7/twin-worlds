import { SITES } from "./atlas.js";

export const HERO_TITLE = "Other worlds are closer than you think.";

export const HERO_STATS = [
  { count: SITES.length, lines: ["analogue sites", "mapped"] },
  { count: 3, lines: ["worlds", "compared"] },
  { count: 12, lines: ["rounds in", "the game"] },
  { live: true, lines: ["live starfield", "warp on scroll"] },
];

export const HERO_ORBS = [
  {
    key: "earth",
    depth: 0.9,
    img: "https://commons.wikimedia.org/wiki/Special:FilePath/The%20Earth%20seen%20from%20Apollo%2017.jpg?width=800",
    label: "Earth",
    stat: "1.00\u00a0g",
    sat: "s1",
  },
  {
    key: "mars",
    depth: 1.4,
    img: "https://commons.wikimedia.org/wiki/Special:FilePath/OSIRIS%20Mars%20true%20color.jpg?width=800",
    label: "Mars",
    stat: "0.38\u00a0g",
    sat: "s2",
  },
  {
    key: "moon",
    depth: 0.6,
    img: "https://commons.wikimedia.org/wiki/Special:FilePath/FullMoon2010.jpg?width=800",
    label: "Moon",
    stat: "0.17\u00a0g",
    sat: null,
  },
];

export const HERO_CHIPS = [
  { cls: "a", text: "◉ SOL 1147 · GALE CRATER −63°C" },
  { cls: "b", text: "✦ SIGNAL LOCK · DSN 34M" },
  { cls: "c", text: "▲ 384,400 KM · LUNAR RANGE" },
];
