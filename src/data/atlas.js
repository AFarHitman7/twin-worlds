import { SOURCES } from "./sources.js";

// Citation hrefs come from the site's own source list, so a dossier can never
// point at a URL the sources section does not already carry.
const sourceHref = (name) => {
  const source = SOURCES.find((entry) => entry.name === name);
  if (!source) throw new Error("Unknown source: " + name);
  return source.href;
};

const ESA = sourceHref("ESA · The Catalogue of Planetary Analogues");
const NASA = sourceHref("NASA · Analog Missions");
const EXPLORER = sourceHref("NASA · Planetary Analog Explorer");
const WIKI = sourceHref("Wikipedia · Terrestrial analogue site");
const CATALOGUE = sourceHref("Planetary Analogue Catalogue");

export const SITES = [
  // ---------------------------------------------------------------- Mars, featured
  {
    slug: "atacama",
    name: "Atacama Desert",
    title: "Atacama Desert",
    country: "Chile",
    region: "Antofagasta, Chile",
    type: "Hyperarid · Rover testing",
    coord: "22.9°S · 68.2°W",
    lat: -22.9,
    lon: -68.2,
    elevation: "About 2,400 m",
    targets: ["mars"],
    featured: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Anfiteatro%2C_Valle_de_la_Luna%2C_San_Pedro_de_Atacama%2C_Chile%2C_2016-02-01%2C_DD_149.JPG/1280px-Anfiteatro%2C_Valle_de_la_Luna%2C_San_Pedro_de_Atacama%2C_Chile%2C_2016-02-01%2C_DD_149.JPG",
    alt: "Bare banded hills in the Atacama desert, Chile",
    imgCredit: "Wikimedia Commons",
    summary: "The driest non-polar desert on Earth, and the closest soil to Mars.",
    location:
      "Northern Chile, around the salt basins of the Antofagasta region. Reached by road from San Pedro de Atacama; parts are protected, parts are mine and research land.",
    geography:
      "A high desert basin at roughly 2,400 m, running about 1,000 km north to south. Salt flats, gravel plains and dry washes sit beneath volcanic cones.",
    geology:
      "Volcanic ash, evaporite salts, nitrates and gypsum over older gravels. Long dryness has left nitrate-rich soils, desert pavement and wind-shaped rock.",
    atmosphere:
      "Thin, dry, almost dust-free air, a wide diurnal swing and a high ultraviolet load. Coastal fog rarely reaches the interior.",
    limits:
      "Pressure is still about 75 kPa and oxygen 21 per cent; rare rain and fog do fall.",
    text: "The driest non-polar desert on Earth. Instruments for Viking, Phoenix and ExoMars were tested in its Mars-like soils.",
    reality: "Still has an oxygen atmosphere and rare rain.",
    source: "ESA Catalogue · ch. 2",
    sources: [
      { label: "ESA Catalogue · ch. 2", href: ESA },
      { label: "NASA · Analog Explorer", href: EXPLORER },
    ],
    params: {
      temp: {
        value: "About 14 °C",
        moon: 8,
        mars: 4,
        note: "About 77 K warmer than Mars, 67 K warmer than the Moon.",
      },
      swing: {
        value: "About 20 K",
        moon: 8,
        mars: 45,
        note: "A strong desert swing, about a quarter of the Martian one.",
      },
      precip: {
        value: "Under 2 mm/yr",
        moon: 45,
        mars: 95,
        note: "Rain is rare enough to be recorded as an event.",
      },
      pressure: {
        value: "About 75 kPa",
        moon: 2,
        mars: 5,
        note: "Thin for Earth, 125 times the Martian pressure.",
      },
      radiation: {
        value: "About 5 mSv/yr",
        moon: 31,
        mars: 52,
        note: "Altitude raises the dose; Mars is about fifty times higher.",
      },
      regolith: {
        value: "Nitrates, gypsum, volcanic ash",
        moon: 35,
        mars: 70,
        note: "Sulphates and salts match; the silicates are Earth's.",
      },
      ops: {
        value: "Rover tests, no crew",
        moon: 35,
        mars: 80,
        note: "Remote and dry, with instruments but no light delay.",
      },
    },
  },
  {
    slug: "mcmurdo-dry-valleys",
    name: "McMurdo Dry Valleys",
    title: "McMurdo Dry Valleys",
    country: "Antarctica",
    region: "Victoria Land, Antarctica",
    type: "Cold desert · Astrobiology",
    coord: "77.5°S · 162.3°E",
    lat: -77.5,
    lon: 162.3,
    elevation: "Near sea level",
    targets: ["mars"],
    featured: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Gargoyle_Ridge_in_the_McMurdo_Dry_Valleys_in_Antarctica_%2830877661786%29.jpg/1280px-Gargoyle_Ridge_in_the_McMurdo_Dry_Valleys_in_Antarctica_%2830877661786%29.jpg",
    alt: "Bare rocky ridge in the McMurdo Dry Valleys, Antarctica",
    imgCredit: "Wikimedia Commons",
    summary:
      "Cold, snow-free valleys that ESA calls the most Mars-like environment on Earth.",
    location:
      "Southern Victoria Land, across McMurdo Sound from Ross Island. Reached by helicopter from McMurdo Station in summer; access is permit-only.",
    geography:
      "About 4,800 km² of ice-free valley floor, cut by glaciers and meltwater channels. Salty ground, scattered boulders and frozen lakes.",
    geology:
      "Beacon sandstone, granite and dolerite, with salts, ground ice and wind-blown sand. Sublimation polygons and sand-wedge cracks form in the cold, dry regime.",
    atmosphere:
      "A polar desert: very cold, very dry, with strong katabatic winds off the ice sheet. Snow is sparse; summer meltwater still moves sediment.",
    limits:
      "Summer melt and an oxygen atmosphere; the cold is Earth-cold, not Martian.",
    text: "Snow-free valleys that may not have seen rain for millions of years. Blood Falls stains the ice red with iron-rich brine.",
    reality: "Summer meltwater and an oxygen atmosphere.",
    source: "ESA Catalogue · ch. 1",
    sources: [
      { label: "ESA Catalogue · ch. 1", href: ESA },
      { label: "NASA · Analog Missions", href: NASA },
    ],
    params: {
      temp: {
        value: "About -20 °C",
        moon: 42,
        mars: 32,
        note: "Cold and polar, but still 43 K above Mars.",
      },
      swing: {
        value: "About 10 K",
        moon: 4,
        mars: 25,
        note: "Polar light, not thin air, sets the daily range.",
      },
      precip: {
        value: "Under 50 mm/yr",
        moon: 32,
        mars: 60,
        note: "Snow, not rain, and very little of it.",
      },
      pressure: {
        value: "About 100 kPa",
        moon: 1,
        mars: 2,
        note: "Sea-level pressure, against 0.6 kPa on Mars.",
      },
      radiation: {
        value: "About 2 mSv/yr",
        moon: 21,
        mars: 35,
        note: "The atmosphere and magnetic field still shield it.",
      },
      regolith: {
        value: "Granite, sandstone, salts",
        moon: 35,
        mars: 45,
        note: "Salts and sand, but granitic rock is rare on Mars.",
      },
      ops: {
        value: "Field camps and isolation",
        moon: 50,
        mars: 88,
        note: "Remote camps rehearse isolation; the radio delay is negligible by comparison.",
      },
    },
  },
  {
    slug: "haughton",
    name: "Haughton Crater",
    title: "Haughton Crater, Devon Island",
    country: "Canada",
    region: "Devon Island, Nunavut, Canada",
    type: "Impact · Isolation",
    coord: "75.4°N · 89.7°W",
    lat: 75.4,
    lon: -89.7,
    elevation: "About 200 m",
    targets: ["mars"],
    featured: true,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Flying_over_Devon_Island_%282665527817%29.jpg/1280px-Flying_over_Devon_Island_%282665527817%29.jpg",
    alt: "Aerial view of the barren Devon Island, Canada",
    imgCredit: "Wikimedia Commons",
    summary:
      "A 23 km impact structure in a polar desert, used to rehearse Mars isolation.",
    location:
      "Devon Island, Nunavut, in the Canadian high Arctic. Reached by charter and helicopter in summer; the Haughton-Mars Project camps on the rim.",
    geography:
      "A 23 km crater in a barren, glaciated plateau, with canyons cut into its rim. Rock, gravel and dust, with no trees and almost no soil.",
    geology:
      "Impact melt breccias and shocked gneiss, with carbonate and hydrothermal deposits in the crater floor. Cold, dry weathering leaves the surfaces little altered.",
    atmosphere:
      "A polar desert with a short summer, low precipitation and continuous daylight in June. Wind moves dust and snow; winter is dark and severe.",
    limits:
      "Earth gravity and slow polar weathering; the crater is eroded and partly filled.",
    text: "A 23\u00a0km impact structure in a polar desert. NASA’s Haughton-Mars Project tests habitats and communication delay here.",
    reality: "Earth gravity and slow polar weathering.",
    source: "ESA Catalogue · ch. 10",
    sources: [
      { label: "ESA Catalogue · ch. 10", href: ESA },
      { label: "NASA · Analog Missions", href: NASA },
    ],
    params: {
      temp: {
        value: "About -15 °C",
        moon: 38,
        mars: 28,
        note: "Cold for Earth, mild for either target.",
      },
      swing: {
        value: "About 12 K",
        moon: 4,
        mars: 28,
        note: "Small next to the Martian 90 K.",
      },
      precip: {
        value: "Under 200 mm/yr",
        moon: 12,
        mars: 40,
        note: "A polar desert, but snow still builds ice.",
      },
      pressure: {
        value: "About 99 kPa",
        moon: 1,
        mars: 2,
        note: "Sea-level air at a low Arctic site.",
      },
      radiation: {
        value: "About 2 mSv/yr",
        moon: 21,
        mars: 35,
        note: "The geomagnetic field still does its work here.",
      },
      regolith: {
        value: "Breccia, carbonate, melt rock",
        moon: 70,
        mars: 55,
        note: "Impact melt and breccia are genuine lunar matches.",
      },
      ops: {
        value: "Crewed summer camps",
        moon: 55,
        mars: 85,
        note: "Isolation and comms-delay tests, with a camp not a base.",
      },
    },
  },
  {
    slug: "holuhraun",
    name: "Holuhraun",
    title: "Holuhraun & Krafla",
    country: "Iceland",
    region: "North Iceland",
    type: "Volcanic · Rover testing",
    coord: "64.9°N · 19.0°W",
    lat: 64.9,
    lon: -19.0,
    elevation: "About 700 m",
    targets: ["mars"],
    featured: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Artemis_II_Crew_geology_training_in_Iceland_-_jsc2024e055198.jpg/1280px-Artemis_II_Crew_geology_training_in_Iceland_-_jsc2024e055198.jpg",
    alt: "Astronauts training on dark volcanic rock in Iceland",
    imgCredit: "NASA / Wikimedia Commons",
    summary:
      "Young fissure lava and altered basalt where Apollo crews and rover prototypes trained.",
    location:
      "The Icelandic highlands north of Vatnajökull, reached by track from the ring road in summer. Holuhraun is a 2014–15 lava field; Krafla is an active volcanic system.",
    geography:
      "A broad, flat lava plain below the Askja caldera, edged by sandur outwash and ice. New basalt is still bare, with little soil and few plants.",
    geology:
      "Fissure-fed basalt, hyaloclastite and sulphur-stained altered rock. Steam and geothermal heat keep parts of the ground warm and wet.",
    atmosphere:
      "Cold, windy and wet, with snow for much of the year. Rain and meltwater are abundant, and the air is at sea-level density.",
    limits:
      "Ice, water and an atmosphere: the lava is Mars-like, the setting is not.",
    text: "Fissure-fed lava fields and altered basalt. Apollo crews trained here, and a Mars 2020 rover prototype was tested in 2019.",
    reality: "Active ice and water, and an atmosphere.",
    source: "ESA Catalogue · ch. 12",
    sources: [
      { label: "ESA Catalogue · ch. 12", href: ESA },
      { label: "NASA · Analog Missions", href: NASA },
    ],
    params: {
      temp: {
        value: "About 1 °C",
        moon: 18,
        mars: 12,
        note: "About 64 K above Mars, 54 K above the Moon.",
      },
      swing: {
        value: "About 8 K",
        moon: 3,
        mars: 20,
        note: "Snow and cloud cover damp the swing.",
      },
      precip: {
        value: "About 400 mm/yr",
        moon: 5,
        mars: 20,
        note: "Wet by Martian standards, dry for Iceland.",
      },
      pressure: {
        value: "About 93 kPa",
        moon: 1,
        mars: 2,
        note: "Thick air, with weather to match.",
      },
      radiation: {
        value: "About 3 mSv/yr",
        moon: 24,
        mars: 40,
        note: "Natural background only, far below either target.",
      },
      regolith: {
        value: "Basalt, hyaloclastite, sulphur",
        moon: 60,
        mars: 65,
        note: "Basalt and glass match; the alteration is wet.",
      },
      ops: {
        value: "Apollo and rover training",
        moon: 65,
        mars: 62,
        note: "Real training, but close to a road and a hut.",
      },
    },
  },
  {
    slug: "timanfaya",
    name: "Timanfaya",
    title: "Timanfaya, Lanzarote",
    country: "Spain",
    region: "Lanzarote, Canary Islands, Spain",
    type: "Volcanic · Lava tubes",
    coord: "29.0°N · 13.6°W",
    lat: 29.0,
    lon: -13.6,
    elevation: "About 300 m",
    targets: ["mars"],
    featured: true,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Timanfaya_-_Lanzarote_02.jpg/1280px-Timanfaya_-_Lanzarote_02.jpg",
    alt: "Dark volcanic terrain of Timanfaya, Lanzarote",
    imgCredit: "Wikimedia Commons",
    summary:
      "Eighteenth-century lava and tubes, and a field site for astronaut training.",
    location:
      "The west of Lanzarote, in the Canary Islands, inside Timanfaya National Park. Visitor access is by coach road; the lava fields themselves are closed.",
    geography:
      "Lava and tephra from eruptions between 1730 and 1736, with cinder cones and tubes. The coast is close and the trade winds constant.",
    geology:
      "Basalt, tephra and palagonite, with lava tubes and collapsed galleries. The flows are young enough that their surfaces are still sharp.",
    atmosphere:
      "Warm, dry and windy, with sea air and occasional Saharan dust. Rain is sparse, but the ocean keeps humidity up.",
    limits:
      "A coastal, vegetated island with an atmosphere: a visual match, not a climate one.",
    text: "Pristine 18th-century lava and tubes. ESA’s Pangaea course trains astronauts in field geology on this island.",
    reality: "An atmosphere and vegetation nearby.",
    source: "ESA Pangaea · Planetary Analogue Catalogue",
    sources: [
      { label: "Planetary Analogue Catalogue", href: CATALOGUE },
      { label: "Wikipedia · Terrestrial analogue site", href: WIKI },
    ],
    params: {
      temp: {
        value: "About 20 °C",
        moon: 6,
        mars: 3,
        note: "About 83 K above Mars; a warm site.",
      },
      swing: {
        value: "About 10 K",
        moon: 4,
        mars: 25,
        note: "Ocean air keeps the nights mild.",
      },
      precip: {
        value: "About 150 mm/yr",
        moon: 16,
        mars: 45,
        note: "Arid, yet far wetter than Mars.",
      },
      pressure: {
        value: "About 98 kPa",
        moon: 1,
        mars: 2,
        note: "Sea-level pressure and sea air.",
      },
      radiation: {
        value: "About 2 mSv/yr",
        moon: 21,
        mars: 35,
        note: "Low altitude and thick air cut the dose.",
      },
      regolith: {
        value: "Basalt, tephra, palagonite",
        moon: 65,
        mars: 65,
        note: "Basalt and tephra, with palagonite glass.",
      },
      ops: {
        value: "Pangaea field training",
        moon: 58,
        mars: 58,
        note: "Astronaut geology inside a national park.",
      },
    },
  },
  {
    slug: "rio-tinto",
    name: "Río Tinto",
    title: "Río Tinto",
    country: "Spain",
    region: "Huelva, Andalusia, Spain",
    type: "Mineralogical · Astrobiology",
    coord: "37.7°N · 6.6°W",
    lat: 37.7,
    lon: -6.6,
    elevation: "About 400 m",
    targets: ["mars"],
    featured: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/IronInRocksMakeRiverRed.jpg/1280px-IronInRocksMakeRiverRed.jpg",
    alt: "The red, iron-rich water of the Rio Tinto in Spain",
    imgCredit: "Wikimedia Commons",
    summary:
      "An acid, iron-red river precipitating the same minerals found at Meridiani Planum.",
    location:
      "The Iberian Pyrite Belt inland from Huelva, in south-west Spain. The river runs past old mines; access is by road and foot, with some stretches fenced.",
    geography:
      "A river about 100 km long, stained red by dissolved iron, cutting through mined hills. Terraces of ochre and yellow sediment line the valley.",
    geology:
      "Pyrite, chalcopyrite and gossan, weathered to jarosite, hematite and goethite. The acidity comes from sulphide oxidation, not from Martian groundwater.",
    atmosphere:
      "Mediterranean: hot, dry summers and mild, wet winters. The river's chemistry, not the climate, is the analogue.",
    limits:
      "The acidity is mine drainage, and the site is wet, vegetated and oxygenated.",
    text: "An acidic, iron-rich river precipitating jarosite and hematite, minerals also found at Meridiani Planum on Mars.",
    reality: "The acidity comes from pyrite mining runoff, not Martian groundwater.",
    source: "ESA Catalogue · ch. 23",
    sources: [
      { label: "ESA Catalogue · ch. 23", href: ESA },
      { label: "Planetary Analogue Catalogue", href: CATALOGUE },
    ],
    params: {
      temp: {
        value: "About 17 °C",
        moon: 8,
        mars: 4,
        note: "About 80 K above Mars.",
      },
      swing: {
        value: "About 12 K",
        moon: 4,
        mars: 28,
        note: "A continental swing, well short of Mars.",
      },
      precip: {
        value: "About 600 mm/yr",
        moon: 2,
        mars: 12,
        note: "Mediterranean rain; the river runs all year.",
      },
      pressure: {
        value: "About 97 kPa",
        moon: 1,
        mars: 2,
        note: "Dense air; this water would boil on Mars.",
      },
      radiation: {
        value: "About 3 mSv/yr",
        moon: 24,
        mars: 40,
        note: "Rock and cosmic rays, all of it background.",
      },
      regolith: {
        value: "Jarosite, hematite, pyrite",
        moon: 20,
        mars: 80,
        note: "Jarosite and hematite are the Meridiani assemblage.",
      },
      ops: {
        value: "Field astrobiology",
        moon: 30,
        mars: 50,
        note: "Good science, with easy vehicle access.",
      },
    },
  },

  // ---------------------------------------------------------------- Moon, featured
  {
    slug: "craters-of-the-moon",
    name: "Craters of the Moon",
    title: "Craters of the Moon, Idaho",
    country: "USA",
    region: "Snake River Plain, Idaho, USA",
    type: "Volcanic · Apollo training",
    coord: "43.4°N · 113.5°W",
    lat: 43.4,
    lon: -113.5,
    elevation: "About 1,800 m",
    targets: ["moon"],
    featured: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Cinder_cone_complex_%28Holocene%2C_~2.4_ka%3B_Big_Craters%2C_Craters_of_the_Moon_Lava_Field%2C_Snake_River_Plain%2C_Idaho%2C_USA%29_7.jpg/1280px-Cinder_cone_complex_%28Holocene%2C_~2.4_ka%3B_Big_Craters%2C_Craters_of_the_Moon_Lava_Field%2C_Snake_River_Plain%2C_Idaho%2C_USA%29_7.jpg",
    alt: "Black cinder cones of Craters of the Moon, Idaho",
    imgCredit: "Wikimedia Commons",
    summary:
      "A young basalt sea where Apollo 14 crews learned to read volcanic ground.",
    location:
      "The eastern Snake River Plain in Idaho, on US 20 between Twin Falls and Idaho Falls. A national monument, open by road and trail.",
    geography:
      "A lava field of about 1,600 km², with cinder cones, spatter ramparts and open tubes. The surface is black, broken and almost bare.",
    geology:
      "Basaltic cinders, ash and glass, with pahoehoe and blocky clinker flows. Eruptions in the last few thousand years left the rock fresh.",
    atmosphere:
      "High desert: cold winters, dry air, strong wind and drifting ash. Thin, but still an atmosphere.",
    limits:
      "Earth gravity, a thin atmosphere and sparse plants; the field is small.",
    text: "A sea of young basalt. Apollo 14 astronauts trained here to read volcanic terrain before walking on the Moon.",
    reality: "Earth gravity and a thin atmosphere.",
    source: "National Park Service · mission history",
    sources: [
      { label: "NASA · Analog Missions", href: NASA },
      { label: "Wikipedia · Terrestrial analogue site", href: WIKI },
    ],
    params: {
      temp: {
        value: "About 7 °C",
        moon: 12,
        mars: 8,
        note: "About 70 K above Mars; cold for a desert.",
      },
      swing: {
        value: "About 20 K",
        moon: 8,
        mars: 45,
        note: "A fifth of the Martian swing, a fifteenth of the Moon's.",
      },
      precip: {
        value: "About 300 mm/yr",
        moon: 8,
        mars: 30,
        note: "Enough snow to feed soil and plants.",
      },
      pressure: {
        value: "About 82 kPa",
        moon: 2,
        mars: 3,
        note: "Thin for Earth, and still about 130 times Mars.",
      },
      radiation: {
        value: "About 4 mSv/yr",
        moon: 27,
        mars: 45,
        note: "About 4 mSv/yr at 1,800 m, against 250 on Mars.",
      },
      regolith: {
        value: "Basaltic cinders, glass, ash",
        moon: 85,
        mars: 70,
        note: "Cinders and glass, close to lunar soil.",
      },
      ops: {
        value: "Apollo 14 training",
        moon: 78,
        mars: 45,
        note: "Real training, now a public monument.",
      },
    },
  },
  {
    slug: "cinder-lake",
    name: "Cinder Lake",
    title: "Cinder Lake Crater Field",
    country: "USA",
    region: "Coconino County, Arizona, USA",
    type: "Impact · Apollo training",
    coord: "35.3°N · 111.5°W",
    lat: 35.3,
    lon: -111.5,
    elevation: "About 1,900 m",
    targets: ["moon"],
    featured: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/0/03/Cinder_Lake_Crater_Field_1.jpg",
    alt: "The man-made Cinder Lake crater field in Arizona",
    imgCredit: "Wikimedia Commons",
    summary:
      "A crater field blasted from a Lunar Orbiter photograph in the 1960s, for Apollo practice.",
    location:
      "North-east of Flagstaff, Arizona, on the Coconino plateau. It is public national forest land, reached by dirt road; the craters remain visible.",
    geography:
      "A small field of craters from a few metres to about 20 m across, laid out to match a lunar scene. Cinder cones and basalt flows stand nearby.",
    geology:
      "Cinders, ash and basaltic gravel, rearranged by explosives. The crater rims are still sharp and the surface is loose underfoot.",
    atmosphere:
      "High, dry and windy, with cold winters and summer thunderstorms. Dust moves easily across the open cinders.",
    limits:
      "Man-made, unweathered and far smaller than a real lunar crater field.",
    text: "A crater field built in the 1960s from a Lunar Orbiter image, so Apollo crews could practise on the ground.",
    reality: "Man-made, and far smaller than lunar crater fields.",
    source: "ESA Catalogue · ch. 7",
    sources: [
      { label: "ESA Catalogue · ch. 7", href: ESA },
      { label: "NASA · Analog Explorer", href: EXPLORER },
    ],
    params: {
      temp: {
        value: "About 8 °C",
        moon: 12,
        mars: 7,
        note: "About 71 K above Mars.",
      },
      swing: {
        value: "About 20 K",
        moon: 8,
        mars: 45,
        note: "Desert air, but only about 20 K.",
      },
      precip: {
        value: "About 300 mm/yr",
        moon: 8,
        mars: 30,
        note: "Winter snow and summer storms.",
      },
      pressure: {
        value: "About 81 kPa",
        moon: 2,
        mars: 3,
        note: "Thin for Earth, thick for either target.",
      },
      radiation: {
        value: "About 4 mSv/yr",
        moon: 27,
        mars: 45,
        note: "Thin air adds a little; Mars is far higher.",
      },
      regolith: {
        value: "Cinders, ash, basaltic gravel",
        moon: 88,
        mars: 68,
        note: "Cinders and ash, engineered into a known crater field: closer in texture than natural flows, still no anorthosite.",
      },
      ops: {
        value: "Apollo traverse practice",
        moon: 94,
        mars: 50,
        note: "Traverses and sampling rehearsed on a made field.",
      },
    },
  },
  {
    slug: "meteor-crater",
    name: "Meteor Crater",
    title: "Meteor Crater, Arizona",
    country: "USA",
    region: "Coconino County, Arizona, USA",
    type: "Impact · Geology training",
    coord: "35.0°N · 111.0°W",
    lat: 35.0,
    lon: -111.0,
    elevation: "About 1,700 m",
    targets: ["moon"],
    featured: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/2019_Meteor_Crater%2C_Arizona.jpg/1280px-2019_Meteor_Crater%2C_Arizona.jpg",
    alt: "The vast bowl of Meteor Crater in Arizona",
    imgCredit: "Wikimedia Commons",
    summary:
      "A 1.2 km bowl about 50,000 years old, and a classroom for impact geology.",
    location:
      "The Colorado Plateau east of Flagstaff, Arizona, off Interstate 40. A private visitor centre overlooks the rim; the floor is closed.",
    geography:
      "A simple bowl crater roughly 1.2 km across and 170 m deep, with a raised rim and an ejecta blanket. The surrounding plain is dry grassland.",
    geology:
      "Coconino sandstone and Kaibab dolomite, shocked and brecciated, with melt glass and iron-nickel fragments. The projectile was a nickel-iron meteorite.",
    atmosphere:
      "High desert with cold winters, dry air and afternoon wind. The crater is shallow enough that dust collects in it.",
    limits:
      "An eroded, partly filled crater in sedimentary rock, not a lunar mare.",
    text: "A 1.2\u00a0km bowl roughly 50,000 years old. Astronauts studied impact geology here before the Apollo missions.",
    reality: "Earth gravity and weathering.",
    source: "ESA Catalogue · ch. 16",
    sources: [
      { label: "ESA Catalogue · ch. 16", href: ESA },
      { label: "Wikipedia · Terrestrial analogue site", href: WIKI },
    ],
    params: {
      temp: {
        value: "About 12 °C",
        moon: 9,
        mars: 5,
        note: "About 75 K above Mars.",
      },
      swing: {
        value: "About 20 K",
        moon: 8,
        mars: 45,
        note: "About 20 K in dry high-desert air.",
      },
      precip: {
        value: "About 200 mm/yr",
        moon: 12,
        mars: 40,
        note: "Grass grows nearby, so water is present.",
      },
      pressure: {
        value: "About 83 kPa",
        moon: 2,
        mars: 3,
        note: "Enough air for wind to shape the rim.",
      },
      radiation: {
        value: "About 4 mSv/yr",
        moon: 27,
        mars: 45,
        note: "About 4 mSv/yr at 1,700 m.",
      },
      regolith: {
        value: "Sandstone, dolomite, glass",
        moon: 72,
        mars: 45,
        note: "Quartz-rich target rock, unlike either body.",
      },
      ops: {
        value: "Apollo geology training",
        moon: 72,
        mars: 48,
        note: "Astronaut training beside a visitor centre.",
      },
    },
  },
  {
    slug: "mauna-kea",
    name: "Mauna Kea",
    title: "Mauna Kea, Hawaii",
    country: "USA",
    region: "Hawaiʻi Island, USA",
    type: "Volcanic · Instrument testing",
    coord: "19.8°N · 155.5°W",
    lat: 19.8,
    lon: -155.5,
    elevation: "About 4,200 m",
    targets: ["moon"],
    featured: true,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Mauna_Kea_Summit_%28503893%29_%2821743654782%29.jpg/1280px-Mauna_Kea_Summit_%28503893%29_%2821743654782%29.jpg",
    alt: "Barren volcanic summit of Mauna Kea, Hawaii",
    imgCredit: "Wikimedia Commons",
    summary:
      "A high, barren cinder summit where Apollo crews trained and lunar tools were tested.",
    location:
      "The summit of Hawaiʻi Island, reached by a steep road from Hilo or Kona. The summit area is sacred to some Hawaiians, and access is contested.",
    geography:
      "A shield volcano reaching about 4,200 m above sea level, with cinder cones and a bare summit plateau. Snow falls in winter.",
    geology:
      "Tholeiitic basalt, tephra and palagonitised ash, with obsidian and fine glass. The summit rocks are fresh and little weathered.",
    atmosphere:
      "Thin, cold and clear, above much of the trade-wind cloud. Ultraviolet is strong and the air dry, though the island below is wet.",
    limits:
      "An atmosphere, water nearby, and cultural access limits on the summit.",
    text: "Apollo astronauts trained on these cinder slopes. NASA later tested lunar instruments and ISRU equipment here.",
    reality: "An atmosphere, water, and cultural access limits.",
    source: "Planetary Analogue Catalogue",
    sources: [
      { label: "Planetary Analogue Catalogue", href: CATALOGUE },
      { label: "NASA · Analog Missions", href: NASA },
    ],
    params: {
      temp: {
        value: "About -2 °C",
        moon: 20,
        mars: 15,
        note: "About 61 K above Mars, 51 K above the Moon.",
      },
      swing: {
        value: "About 10 K",
        moon: 4,
        mars: 25,
        note: "A cold summit with a small daily range.",
      },
      precip: {
        value: "Under 250 mm/yr",
        moon: 10,
        mars: 40,
        note: "The summit is dry; the flanks are not.",
      },
      pressure: {
        value: "About 62 kPa",
        moon: 5,
        mars: 8,
        note: "The lowest pressure in the atlas, still about 100 times Mars.",
      },
      radiation: {
        value: "About 6 mSv/yr",
        moon: 33,
        mars: 55,
        note: "The highest dose here; Mars is roughly forty times higher.",
      },
      regolith: {
        value: "Tholeiitic basalt, tephra, ash",
        moon: 70,
        mars: 65,
        note: "Basalt and glass; the Moon is more anorthositic.",
      },
      ops: {
        value: "Apollo and ISRU testing",
        moon: 85,
        mars: 58,
        note: "Instruments and suits tested at altitude.",
      },
    },
  },
  {
    slug: "askja",
    name: "Askja",
    title: "Askja & Lambahraun",
    country: "Iceland",
    region: "Central Iceland",
    type: "Volcanic · Apollo training",
    coord: "65.0°N · 16.7°W",
    lat: 65.0,
    lon: -16.7,
    elevation: "About 1,000 m",
    targets: ["moon"],
    featured: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Viti_Crater_Askja_Iceland_UL1.jpg",
    alt: "The blue crater lake of Askja, Iceland",
    imgCredit: "Wikimedia Commons",
    summary:
      "Black sand and craters where Apollo 11 and 12 crews learned field geology.",
    location:
      "The Icelandic interior east of the ring road, reached by mountain track in summer. Askja is a caldera; Lambahraun is a young lava field to its south.",
    geography:
      "A caldera about 8 km across, holding a geothermal lake, surrounded by pumice and black sand. The highland interior is empty and wind-scoured.",
    geology:
      "Basalt, hyaloclastite and rhyolitic pumice from eruptions under ice and water. The 1961 lava at Askja is still nearly bare.",
    atmosphere:
      "Cold, wet and windy, with snow cover for much of the year. Steam and volcanic gas add to the weather.",
    limits:
      "Ice, water and an atmosphere; the caldera is a wet, active volcanic system.",
    text: "Black sands and craters where Apollo 11 and 12 crews learned field geology in the 1960s.",
    reality: "Ice, water and an atmosphere.",
    source: "ESA Catalogue · ch. 12",
    sources: [
      { label: "ESA Catalogue · ch. 12", href: ESA },
      { label: "Wikipedia · Terrestrial analogue site", href: WIKI },
    ],
    params: {
      temp: {
        value: "About 0 °C",
        moon: 18,
        mars: 12,
        note: "About 63 K above Mars.",
      },
      swing: {
        value: "About 10 K",
        moon: 4,
        mars: 25,
        note: "Cloud and snow cover flatten the range.",
      },
      precip: {
        value: "About 300 mm/yr",
        moon: 8,
        mars: 30,
        note: "Snow and rain feed the caldera lake.",
      },
      pressure: {
        value: "About 90 kPa",
        moon: 2,
        mars: 3,
        note: "About 90 kPa at 1,000 m.",
      },
      radiation: {
        value: "About 3 mSv/yr",
        moon: 24,
        mars: 40,
        note: "Volcanic rock adds a little to the background.",
      },
      regolith: {
        value: "Basalt, hyaloclastite, pumice",
        moon: 62,
        mars: 65,
        note: "Basalt, but hydrated and altered.",
      },
      ops: {
        value: "Apollo field training",
        moon: 80,
        mars: 55,
        note: "Apollo crews trained in a remote highland.",
      },
    },
  },
  {
    slug: "lava-beds",
    name: "Lava Beds",
    title: "Lava Beds National Monument",
    country: "USA",
    region: "Modoc County, California, USA",
    type: "Lava tubes · Modelling",
    coord: "41.7°N · 121.5°W",
    lat: 41.7,
    lon: -121.5,
    elevation: "About 1,400 m",
    targets: ["moon"],
    featured: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/A114%2C_Lava_Beds_National_Monument%2C_California%2C_USA%2C_Golden_Dome_Lava_Tube_Cave%2C_2004.jpg/1280px-A114%2C_Lava_Beds_National_Monument%2C_California%2C_USA%2C_Golden_Dome_Lava_Tube_Cave%2C_2004.jpg",
    alt: "A lava tube cave in Lava Beds National Monument, California",
    imgCredit: "Wikimedia Commons",
    summary:
      "Basaltic tubes and skylights used to model how lunar caves might be mapped.",
    location:
      "The Modoc Plateau in northern California, near Tulelake. A national monument with self-guided cave routes and seasonal closures for bats.",
    geography:
      "A lava field with more than 700 mapped tubes, some over a kilometre long, plus cinder cones and fault scarps. The ground is dry and open.",
    geology:
      "Basalt and obsidian, with tube floors of fine sand and collapse debris. The tubes formed by crusting lava, not by impact or ice.",
    atmosphere:
      "High desert with cold winters, dry summers and strong afternoon wind. Dust and ash move on the plateau.",
    limits:
      "Terrestrial tubes are about 30 m wide, far smaller than lunar ones.",
    text: "Basaltic tubes and skylights used to model how lunar lava tubes could be mapped and eventually built in.",
    reality: "Terrestrial tubes are about 30\u00a0m wide, far smaller than lunar ones.",
    source: "Planetary Analogue Catalogue",
    sources: [
      { label: "Planetary Analogue Catalogue", href: CATALOGUE },
      { label: "Wikipedia · Terrestrial analogue site", href: WIKI },
    ],
    params: {
      temp: {
        value: "About 8 °C",
        moon: 12,
        mars: 7,
        note: "About 71 K above Mars.",
      },
      swing: {
        value: "About 18 K",
        moon: 7,
        mars: 42,
        note: "About 18 K on the dry plateau.",
      },
      precip: {
        value: "About 400 mm/yr",
        moon: 5,
        mars: 20,
        note: "Winter snow, dry summers.",
      },
      pressure: {
        value: "About 86 kPa",
        moon: 2,
        mars: 3,
        note: "Enough air to hold heat and move dust.",
      },
      radiation: {
        value: "About 4 mSv/yr",
        moon: 27,
        mars: 45,
        note: "About 4 mSv/yr on the plateau.",
      },
      regolith: {
        value: "Basalt, obsidian, cave sand",
        moon: 65,
        mars: 60,
        note: "Basalt and obsidian; the tubes are the match.",
      },
      ops: {
        value: "Cave survey practice",
        moon: 62,
        mars: 42,
        note: "Cave survey work, with marked trails and tours.",
      },
    },
  },

  // ---------------------------------------------------------------- Added for the atlas
  {
    slug: "dallol",
    name: "Dallol",
    title: "Dallol",
    country: "Ethiopia",
    region: "Danakil Depression, Ethiopia",
    type: "Hydrothermal · Geochemical",
    coord: "14.2°N · 40.3°E",
    lat: 14.24,
    lon: 40.3,
    elevation: "About 125 m below sea level",
    targets: ["mars"],
    featured: false,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/ET_Afar_asv2018-01_img16_Dallol.jpg/1280px-ET_Afar_asv2018-01_img16_Dallol.jpg",
    alt: "Salt and sulphur terraces at Dallol, Ethiopia",
    imgCredit: "Wikimedia Commons",
    summary:
      "Acid, hypersaline springs precipitating jarosite in one of the hottest places on Earth.",
    location:
      "The Danakil Depression in northern Ethiopia, below sea level. Reached by guided convoy; the area is hot, remote and occasionally unsafe.",
    geography:
      "Salt flats, mineral terraces and hot springs, coloured green and yellow by sulphur and salt.",
    geology:
      "Hydrothermal brines deposit halite, gypsum, sulphur and jarosite, with iron oxides staining the pools. Akaganeite and hematite form alongside them.",
    atmosphere:
      "Mean air temperatures sit above 30 °C, and rain is rare and erratic. Air is dense at this depth and carries salt dust.",
    limits:
      "Liquid acid water and heat far beyond anything Mars holds now.",
    text: "Acid, hypersaline springs deposit jarosite and sulphur below sea level, in the Danakil Depression.",
    reality: "Liquid acid water and heat Mars has not had for billions of years.",
    source: "Planetary Analogue Catalogue",
    sources: [
      { label: "Planetary Analogue Catalogue", href: CATALOGUE },
      { label: "Wikipedia · Terrestrial analogue site", href: WIKI },
    ],
    params: {
      temp: {
        value: "About 34 °C",
        moon: 0,
        mars: 0,
        note: "About 97 K above Mars; the hottest site here.",
      },
      swing: {
        value: "About 15 K",
        moon: 5,
        mars: 35,
        note: "Nights stay hot, so the range is modest.",
      },
      precip: {
        value: "About 100 mm/yr",
        moon: 22,
        mars: 50,
        note: "Erratic storms, and almost no effective rain.",
      },
      pressure: {
        value: "About 101 kPa",
        moon: 0,
        mars: 1,
        note: "The densest air in the atlas, 125 m below sea level.",
      },
      radiation: {
        value: "About 2 mSv/yr",
        moon: 21,
        mars: 35,
        note: "Low altitude and thick air cut the dose.",
      },
      regolith: {
        value: "Jarosite, halite, acid salts",
        moon: 20,
        mars: 75,
        note: "Jarosite is Martian; halite and acid salts are not.",
      },
      ops: {
        value: "Remote, no crewed work",
        moon: 20,
        mars: 55,
        note: "Hostile and remote, with no crewed analogue work.",
      },
    },
  },
  {
    slug: "svalbard",
    name: "Svalbard",
    title: "Svalbard",
    country: "Norway",
    region: "Bockfjord, Svalbard, Norway",
    type: "Cold desert · Astrobiology",
    coord: "79.4°N · 13.5°E",
    lat: 79.4,
    lon: 13.5,
    elevation: "Near sea level",
    targets: ["mars"],
    featured: false,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Haakon_VII_Land_Bockfjorden_IMG_5543_Trolltindane_Sverrefjellet_Adolfbreen_Sm%C3%B6rstabben.JPG/1280px-Haakon_VII_Land_Bockfjorden_IMG_5543_Trolltindane_Sverrefjellet_Adolfbreen_Sm%C3%B6rstabben.JPG",
    alt: "Fjord and barren mountains at Bockfjorden, Svalbard",
    imgCredit: "Wikimedia Commons",
    summary:
      "Red sandstone and cold springs in an Arctic desert, studied by the AMASE team.",
    location:
      "Bockfjord on the north-west coast of Spitsbergen, reached by boat or helicopter. The AMASE expedition has worked here since the early 2000s.",
    geography:
      "Fjords, gravel terraces and red sand beneath ice-capped mountains. The ground is bare, frozen for most of the year and cut by meltwater.",
    geology:
      "Red Devonian sandstone and conglomerate, with carbonate terraces and rosettes at cold springs. Permafrost holds the ground together.",
    atmosphere:
      "Polar desert: very cold, dry, with months of darkness and continuous summer light. Snow lies most of the year.",
    limits:
      "Ice, meltwater and a thick atmosphere; the cold is seasonal, not permanent.",
    text: "Red Devonian sandstone, cold carbonate springs and permafrost, studied by the AMASE expedition each summer.",
    reality: "Sea ice, meltwater and a full atmosphere.",
    source: "ESA Catalogue · ch. 26",
    sources: [
      { label: "ESA Catalogue · ch. 26", href: ESA },
      { label: "NASA · Analog Missions", href: NASA },
    ],
    params: {
      temp: {
        value: "About -6 °C",
        moon: 27,
        mars: 18,
        note: "About 57 K above Mars, 47 K above the Moon.",
      },
      swing: {
        value: "About 10 K",
        moon: 4,
        mars: 25,
        note: "Cold and stable, with little daily range.",
      },
      precip: {
        value: "About 200 mm/yr",
        moon: 12,
        mars: 40,
        note: "Low, but snow accumulates as ice.",
      },
      pressure: {
        value: "About 101 kPa",
        moon: 0,
        mars: 1,
        note: "Sea-level air on a polar coast.",
      },
      radiation: {
        value: "About 2 mSv/yr",
        moon: 21,
        mars: 35,
        note: "About 2 mSv/yr at polar sea level.",
      },
      regolith: {
        value: "Red sandstone, carbonate",
        moon: 25,
        mars: 55,
        note: "Red beds, not basalt; the carbonates match ALH84001.",
      },
      ops: {
        value: "AMASE field campaigns",
        moon: 40,
        mars: 72,
        note: "Boat-based camps, working in real isolation.",
      },
    },
  },
  {
    slug: "tenerife",
    name: "Teide",
    title: "Teide, Tenerife",
    country: "Spain",
    region: "Tenerife, Canary Islands, Spain",
    type: "Volcanic · Lava tubes",
    coord: "28.3°N · 16.6°W",
    lat: 28.27,
    lon: -16.64,
    elevation: "About 2,000 m",
    targets: ["mars", "moon"],
    featured: false,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Lava%2C_Parque_nacional_del_Teide%2C_Tenerife%2C_Espa%C3%B1a%2C_2015.JPG/1280px-Lava%2C_Parque_nacional_del_Teide%2C_Tenerife%2C_Espa%C3%B1a%2C_2015.JPG",
    alt: "Lava flows in Teide National Park, Tenerife",
    imgCredit: "Wikimedia Commons",
    summary:
      "A high volcanic caldera of lava, pumice and tubes, within reach of a road.",
    location:
      "Teide National Park on Tenerife, reached by road from the coast. The caldera is open; the summit cable car is often crowded.",
    geography:
      "A caldera about 15 km across below Pico del Teide, Spain's highest peak at 3,718 m. Lava flows, pumice and tubes fill the floor.",
    geology:
      "Basalt, phonolite and pumice from successive eruptions, with lava tubes and obsidian. The youngest flows are centuries old.",
    atmosphere:
      "High, dry and clear above the trade-wind cloud, with strong sun and cold nights. Snow falls in winter.",
    limits:
      "It sits high, but not cold enough, and its atmosphere is still far thicker than either destination's.",
    text: "A caldera of basalt, pumice and lava tubes at about 2,000 m, below Spain's highest peak.",
    reality: "A high, dry caldera, but still warm and thick-aired.",
    source: "ESA Catalogue · ch. 27",
    sources: [
      { label: "ESA Catalogue · ch. 27", href: ESA },
      { label: "Wikipedia · Terrestrial analogue site", href: WIKI },
    ],
    params: {
      temp: {
        value: "About 10 °C",
        moon: 11,
        mars: 6,
        note: "About 73 K above Mars.",
      },
      swing: {
        value: "About 10 K",
        moon: 4,
        mars: 25,
        note: "High, clear and steady, day to night.",
      },
      precip: {
        value: "About 400 mm/yr",
        moon: 5,
        mars: 20,
        note: "Cloud and orographic rain on the peak.",
      },
      pressure: {
        value: "About 80 kPa",
        moon: 3,
        mars: 5,
        note: "About 80 kPa at 2,000 m.",
      },
      radiation: {
        value: "About 5 mSv/yr",
        moon: 31,
        mars: 52,
        note: "High and clear, so the cosmic dose is raised.",
      },
      regolith: {
        value: "Basalt, phonolite, pumice",
        moon: 58,
        mars: 60,
        note: "Basalt and pumice, with little iron oxide.",
      },
      ops: {
        value: "Field geology, easy access",
        moon: 48,
        mars: 52,
        note: "A short drive from hotels; isolation is absent.",
      },
    },
  },
  {
    slug: "namib",
    name: "Namib",
    title: "Namib Desert",
    country: "Namibia",
    region: "Gobabeb, Namib Desert, Namibia",
    type: "Aeolian · Dune field",
    coord: "23.6°S · 15.0°E",
    lat: -23.56,
    lon: 15.04,
    elevation: "About 400 m",
    targets: ["mars"],
    featured: false,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Dune_Namib_Naukluft_1.jpg/1280px-Dune_Namib_Naukluft_1.jpg",
    alt: "A red dune ridge in the Namib desert, Namibia",
    imgCredit: "Wikimedia Commons",
    summary:
      "The oldest desert on Earth, with dunes at the closest scale to Martian ones.",
    location:
      "The central Namib gravel plains around Gobabeb, reached by road from Walvis Bay. A research station has operated here since 1962.",
    geography:
      "A coastal desert of gravel plains and a sand sea, with dunes reaching about 300 m. Fog rolls in from the Atlantic; rain is rare.",
    geology:
      "Quartz sand, gypsum and gravel over older rock, with salt pans and calcretes. Wind shapes the dunes into barchan and linear forms.",
    atmosphere:
      "Arid and foggy: the Atlantic supplies moisture as fog rather than rain. Wind is constant and dust moves freely.",
    limits:
      "Fog feeds lichens and beetles, and the sand is quartz, not basalt.",
    text: "Gravel plains and a sand sea with dunes around 300 m, the closest terrestrial scale to Martian dunes.",
    reality: "Coastal fog feeds lichens and beetles.",
    source: "ESA Catalogue · ch. 19",
    sources: [
      { label: "ESA Catalogue · ch. 19", href: ESA },
      { label: "Wikipedia · Terrestrial analogue site", href: WIKI },
    ],
    params: {
      temp: {
        value: "About 22 °C",
        moon: 5,
        mars: 2,
        note: "About 85 K above Mars.",
      },
      swing: {
        value: "About 25 K",
        moon: 10,
        mars: 50,
        note: "A strong desert swing, about 25 K.",
      },
      precip: {
        value: "About 25 mm/yr",
        moon: 38,
        mars: 70,
        note: "Fog, not rain, carries most of the moisture.",
      },
      pressure: {
        value: "About 97 kPa",
        moon: 1,
        mars: 2,
        note: "Dense coastal desert air.",
      },
      radiation: {
        value: "About 3 mSv/yr",
        moon: 24,
        mars: 40,
        note: "About 3 mSv/yr under a clear desert sky.",
      },
      regolith: {
        value: "Quartz sand, gypsum, gravel",
        moon: 30,
        mars: 55,
        note: "Quartz sand, where Mars has basaltic sand.",
      },
      ops: {
        value: "Remote field station",
        moon: 35,
        mars: 58,
        note: "A research station in a very empty desert.",
      },
    },
  },
  {
    slug: "hanksville",
    name: "Hanksville",
    title: "Hanksville & the San Rafael Swell",
    country: "USA",
    region: "Wayne County, Utah, USA",
    type: "Sedimentary · Crewed simulation",
    coord: "38.4°N · 110.7°W",
    lat: 38.37,
    lon: -110.71,
    elevation: "About 1,300 m",
    targets: ["mars"],
    featured: false,
    img: "https://upload.wikimedia.org/wikipedia/commons/4/49/Mars_Desert_Research_Station_2020.jpg",
    alt: "The Mars Desert Research Station habitat near Hanksville, Utah",
    imgCredit: "Wikimedia Commons",
    summary:
      "Jurassic red beds around a desert town, and the Mars Desert Research Station.",
    location:
      "Wayne County, Utah, at the edge of the San Rafael Swell. Reached by highway; the Mars Desert Research Station runs crewed rotations nearby.",
    geography:
      "Mudstone hills, mesas and dry washes, with gypsum and shale badlands. The terrain is open, soft and easily eroded.",
    geology:
      "Jurassic sandstone, mudstone and gypsum, with clays and evaporites. The red colour comes from iron oxides in the sediment.",
    atmosphere:
      "High desert: hot summers, cold winters, dry air and flash floods after storms. Dust moves across the open ground.",
    limits:
      "The rocks are sedimentary, not volcanic, and water still shapes the land.",
    text: "Jurassic red beds and evaporites around a small Utah town, with the Mars Desert Research Station nearby.",
    reality: "Sedimentary rock, flash floods and an oxygen atmosphere.",
    source: "ESA Catalogue · ch. 29",
    sources: [
      { label: "ESA Catalogue · ch. 29", href: ESA },
      { label: "NASA · Analog Missions", href: NASA },
    ],
    params: {
      temp: {
        value: "About 12 °C",
        moon: 9,
        mars: 5,
        note: "About 75 K above Mars.",
      },
      swing: {
        value: "About 18 K",
        moon: 7,
        mars: 42,
        note: "About 18 K in dry canyon air.",
      },
      precip: {
        value: "About 150 mm/yr",
        moon: 16,
        mars: 45,
        note: "Rare storms, often arriving as flash floods.",
      },
      pressure: {
        value: "About 87 kPa",
        moon: 2,
        mars: 3,
        note: "Thin enough for dust to lift easily.",
      },
      radiation: {
        value: "About 4 mSv/yr",
        moon: 27,
        mars: 45,
        note: "About 4 mSv/yr at 1,300 m.",
      },
      regolith: {
        value: "Sandstone, mudstone, gypsum",
        moon: 30,
        mars: 60,
        note: "Clays and sulphates match; the sand is quartz.",
      },
      ops: {
        value: "MDRS crewed rotations",
        moon: 55,
        mars: 82,
        note: "Crews work in sim suits, with a simulated delay.",
      },
    },
  },
  {
    slug: "pilbara",
    name: "Pilbara",
    title: "Pilbara",
    country: "Australia",
    region: "Pilbara, Western Australia",
    type: "Archaean · Astrobiology",
    coord: "21.6°S · 119.0°E",
    lat: -21.6,
    lon: 119.0,
    elevation: "About 400 m",
    targets: ["mars"],
    featured: false,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Hamersley_Range%2C_Pilbara_Region%2C_Western_Australia.JPG/1280px-Hamersley_Range%2C_Pilbara_Region%2C_Western_Australia.JPG",
    alt: "Red rock and spinifex country in the Pilbara, Western Australia",
    imgCredit: "Wikimedia Commons",
    summary:
      "Ancient rocks holding the oldest signs of life, in a dry red landscape.",
    location:
      "The Pilbara craton in Western Australia, inland from Port Hedland. Reached by dirt track; some sites sit on pastoral or mining leases.",
    geography:
      "Low ridges, dry river beds and spinifex plains, with dark iron-rich rock. The country is old, flat and red.",
    geology:
      "Archaean chert, basalt and banded iron formation, about 3.5 billion years old. Hydrothermal alteration and microfossils make it an astrobiology reference.",
    atmosphere:
      "Hot, dry and cyclonic: summer heat, rare rain and dust. The sky is clear for most of the year.",
    limits:
      "Oxygen, liquid water in the wet season, and heavily weathered rock.",
    text: "Archaean chert and banded iron, about 3.5 billion years old, holding some of the earliest evidence of life.",
    reality: "Oxygen, seasonal rain and deeply weathered rock.",
    source: "ESA Catalogue · ch. 21",
    sources: [
      { label: "ESA Catalogue · ch. 21", href: ESA },
      { label: "Wikipedia · Terrestrial analogue site", href: WIKI },
    ],
    params: {
      temp: {
        value: "About 26 °C",
        moon: 3,
        mars: 1,
        note: "About 89 K above Mars.",
      },
      swing: {
        value: "About 18 K",
        moon: 7,
        mars: 42,
        note: "About 18 K, hot by day.",
      },
      precip: {
        value: "About 300 mm/yr",
        moon: 8,
        mars: 30,
        note: "Summer cyclones, then long dry months.",
      },
      pressure: {
        value: "About 97 kPa",
        moon: 1,
        mars: 2,
        note: "Sea-level air; cyclones still pass through.",
      },
      radiation: {
        value: "About 3 mSv/yr",
        moon: 24,
        mars: 40,
        note: "Mars is roughly eighty times higher.",
      },
      regolith: {
        value: "Chert, basalt, banded iron",
        moon: 30,
        mars: 55,
        note: "Banded iron and chert, an ancient Earth signature.",
      },
      ops: {
        value: "Remote astrobiology work",
        moon: 35,
        mars: 62,
        note: "Field work reached by four-wheel drive.",
      },
    },
  },
];
