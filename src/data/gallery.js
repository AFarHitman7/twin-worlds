const U = (name, width) => `https://commons.wikimedia.org/wiki/Special:FilePath/${name}?width=${width}`;
const T = (path) => `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}`;
const TW = (path) => `https://thumb.wikimedia.org/wikipedia/commons/thumb/${path}`;

export const GALLERY = [
  {
    cat: "earth",
    span: "wide",
    caption: "Wadi Rum, Jordan · Earth, but filmed as Mars in The Martian",
    src: U("Wadi%20Rum%2C%20Jordan.jpg", 1600),
    alt: "Red sandstone desert of Wadi Rum, Jordan",
  },
  {
    cat: "mars",
    span: null,
    caption: "Mars in true colour · OSIRIS",
    src: U("OSIRIS%20Mars%20true%20color.jpg", 1200),
    alt: "Mars full disc",
  },
  {
    cat: "moon",
    span: null,
    caption: "The full Moon",
    src: U("FullMoon2010.jpg", 1200),
    alt: "The full Moon",
  },
  {
    cat: "earth",
    span: "tall",
    caption: "Valle de la Luna, Atacama, Chile · a Mars analogue",
    src: T("1/1f/Anfiteatro%2C_Valle_de_la_Luna%2C_San_Pedro_de_Atacama%2C_Chile%2C_2016-02-01%2C_DD_149.JPG/1280px-Anfiteatro%2C_Valle_de_la_Luna%2C_San_Pedro_de_Atacama%2C_Chile%2C_2016-02-01%2C_DD_149.JPG"),
    alt: "Valle de la Luna, Chile",
  },
  {
    cat: "earth",
    span: null,
    caption: "McMurdo Dry Valleys, Antarctica · the most Mars-like place on Earth",
    src: T("7/79/Gargoyle_Ridge_in_the_McMurdo_Dry_Valleys_in_Antarctica_%2830877661786%29.jpg/1280px-Gargoyle_Ridge_in_the_McMurdo_Dry_Valleys_in_Antarctica_%2830877661786%29.jpg"),
    alt: "McMurdo Dry Valleys",
  },
  {
    cat: "earth",
    span: "wide",
    caption: "Devon Island, Canada · Haughton impact structure and the Haughton-Mars Project",
    src: TW("7/70/Flying_over_Devon_Island_%282665527817%29.jpg/1280px-Flying_over_Devon_Island_%282665527817%29.jpg"),
    alt: "Devon Island from the air",
  },
  {
    cat: "earth",
    span: null,
    caption: "Timanfaya, Lanzarote · pristine 18th-century lava",
    src: TW("7/72/Timanfaya_-_Lanzarote_02.jpg/1280px-Timanfaya_-_Lanzarote_02.jpg"),
    alt: "Timanfaya lava field, Lanzarote",
  },
  {
    cat: "earth",
    span: "tall",
    caption: "Río Tinto, Spain · acidic, iron-rich water that echoes Martian minerals",
    src: T("b/bc/IronInRocksMakeRiverRed.jpg/1280px-IronInRocksMakeRiverRed.jpg"),
    alt: "Rio Tinto red river",
  },
  {
    cat: "earth",
    span: null,
    caption: "Dallol, Ethiopia · hyperacidic springs and vivid mineral crusts",
    src: T("2/2f/A_Sulphur_Pond%2C_Danakil_Depression%2C_Ethiopia.jpg/1280px-A_Sulphur_Pond%2C_Danakil_Depression%2C_Ethiopia.jpg"),
    alt: "Sulphur pond at Dallol, Ethiopia",
  },
  {
    cat: "earth",
    span: "wide",
    caption: "Craters of the Moon, Idaho · Apollo 14 trained on this lava field",
    src: T("1/10/Cinder_cone_complex_%28Holocene%2C_~2.4_ka%3B_Big_Craters%2C_Craters_of_the_Moon_Lava_Field%2C_Snake_River_Plain%2C_Idaho%2C_USA%29_7.jpg/1280px-Cinder_cone_complex_%28Holocene%2C_~2.4_ka%3B_Big_Craters%2C_Craters_of_the_Moon_Lava_Field%2C_Snake_River_Plain%2C_Idaho%2C_USA%29_7.jpg"),
    alt: "Craters of the Moon lava field",
  },
  {
    cat: "earth",
    span: null,
    caption: "Cinder Lake Crater Field, Arizona · a man-made Apollo training ground",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/03/Cinder_Lake_Crater_Field_1.jpg",
    alt: "Cinder Lake crater field",
  },
  {
    cat: "earth",
    span: null,
    caption: "Askja, Iceland · Apollo 11 and 12 geology training",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Viti_Crater_Askja_Iceland_UL1.jpg",
    alt: "Viti crater, Askja",
  },
  {
    cat: "mars",
    span: "wide",
    caption: "Gale Crater, Mars · photographed by the Curiosity rover",
    src: T("5/5a/Curiosity_Captures_Mars_Landscape_While_Talking_to_an_Orbiter_%28PIA26632%29.jpg/1280px-Curiosity_Captures_Mars_Landscape_While_Talking_to_an_Orbiter_%28PIA26632%29.jpg"),
    alt: "Mars surface by Curiosity",
  },
  {
    cat: "mars",
    span: null,
    caption: "Wind-carved rock, Mars · Curiosity, 2024",
    src: T("f/f7/NASA-MarsCuriosityRover-WindCarvedRock-20240228.jpg/1280px-NASA-MarsCuriosityRover-WindCarvedRock-20240228.jpg"),
    alt: "A wind-carved rock on Mars",
  },
  {
    cat: "moon",
    span: null,
    caption: "Apollo 17 · a panoramic view of the lunar surface",
    src: TW("6/65/Apollo_17_Moon_Panorama.jpg/1280px-Apollo_17_Moon_Panorama.jpg"),
    alt: "Apollo 17 lunar panorama",
  },
  {
    cat: "moon",
    span: null,
    caption: "Buzz Aldrin, Apollo 11 · the Moon, 1969",
    src: U("Aldrin%20Apollo%2011%20original.jpg", 1200),
    alt: "Buzz Aldrin on the Moon",
  },
];

export const FILTERS = [
  { key: "all", label: "All ✦" },
  { key: "earth", label: "◉ Earth" },
  { key: "mars", label: "✦ Mars" },
  { key: "moon", label: "◐ Moon" },
];
