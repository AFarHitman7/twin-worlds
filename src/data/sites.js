import { SITES } from "./atlas.js";

const featuredFor = (target) =>
  SITES.filter((site) => site.featured && site.targets.includes(target));

// The landing sections show the six featured sites for each body, in atlas order.
export const MARS_SITES = featuredFor("mars");

export const MARS_ALSO = [
  "Dallol, Ethiopia",
  "Svalbard, Norway",
  "Tenerife, Spain",
  "Pilbara, Australia",
  "Namib, Namibia",
  "Utah, USA",
  "Boulby, UK",
];

export const MOON_SITES = featuredFor("moon");

export const MOON_ALSO = [
  "Lanzarote, Spain",
  "Haleakala, Hawaii",
  "Pisgah Crater, California",
  "Lonar Crater, India",
  "Mistastin Lake, Canada",
  "Sudbury, Canada",
];
