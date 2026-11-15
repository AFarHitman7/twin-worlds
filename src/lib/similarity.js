// The seven scored parameters. References are the target bodies' own values,
// printed in the atlas so a site's score can be read against something real.
export const PARAMS = [
  {
    key: "temp",
    label: "Mean temperature",
    marsRef: "-63 C",
    moonRef: "-53 C (mean; -173 to +127 C)",
    weight: 0.18,
  },
  {
    key: "swing",
    label: "Diurnal swing",
    marsRef: "about 90 K",
    moonRef: "about 300 K",
    weight: 0.12,
  },
  {
    key: "precip",
    label: "Precipitation",
    marsRef: "less than 1 mm/yr",
    moonRef: "0 mm",
    weight: 0.2,
  },
  {
    key: "pressure",
    label: "Surface pressure",
    marsRef: "0.6 kPa",
    moonRef: "effectively 0",
    weight: 0.15,
  },
  {
    key: "radiation",
    label: "Radiation load",
    marsRef: "about 250 mSv/yr",
    moonRef: "about 380 mSv/yr",
    weight: 0.15,
  },
  {
    key: "regolith",
    label: "Regolith / mineralogy",
    marsRef: "basalt, iron oxides, sulfates",
    moonRef: "anorthosite, glass, nanophase iron",
    weight: 0.12,
  },
  {
    key: "ops",
    label: "Operational value",
    marsRef: "Crewed analogues, 3-22 min delay, no resupply",
    moonRef: "Apollo surface training, 1.3 s delay",
    weight: 0.08,
  },
];

export const BODIES = ["mars", "moon"];

/** Weighted mean of the seven scores, rounded. Null if any weight or score is missing. */
export function overallScore(site, body) {
  if (!site || !site.params || !BODIES.includes(body)) return null;

  let total = 0;
  let weight = 0;

  for (const param of PARAMS) {
    const entry = site.params[param.key];
    const score = entry ? entry[body] : undefined;
    if (!Number.isFinite(param.weight) || !Number.isFinite(score)) return null;
    total += score * param.weight;
    weight += param.weight;
  }

  return weight > 0 ? Math.round(total / weight) : null;
}
