const U = (name, width) => `https://commons.wikimedia.org/wiki/Special:FilePath/${name}?width=${width}`;

export const ROUNDS = [
  { src: U("FullMoon2010.jpg", 1200), alt: "A bright, cratered disc in a dark sky", answer: "moon", fact: "The Moon’s near side in full sunlight. The same face always turns toward Earth." },
  { src: U("Wadi%20Rum%2C%20Jordan.jpg", 1200), alt: "A vast red sandstone desert", answer: "earth", fact: "Wadi Rum, Jordan. Earth, but it stood in for Mars in 'The Martian'." },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Curiosity_Captures_Mars_Landscape_While_Talking_to_an_Orbiter_%28PIA26632%29.jpg/1280px-Curiosity_Captures_Mars_Landscape_While_Talking_to_an_Orbiter_%28PIA26632%29.jpg", alt: "A rocky, red-brown desert under a hazy sky", answer: "mars", fact: "Gale Crater, Mars, photographed by NASA’s Curiosity rover." },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Anfiteatro%2C_Valle_de_la_Luna%2C_San_Pedro_de_Atacama%2C_Chile%2C_2016-02-01%2C_DD_149.JPG/1280px-Anfiteatro%2C_Valle_de_la_Luna%2C_San_Pedro_de_Atacama%2C_Chile%2C_2016-02-01%2C_DD_149.JPG", alt: "Bare, banded hills in a bone-dry desert", answer: "earth", fact: "Chile’s Atacama, the driest non-polar desert. NASA and ESA test rovers here." },
  { src: U("Aldrin%20Apollo%2011%20original.jpg", 1200), alt: "A spacesuited figure on a grey, shadowed surface", answer: "moon", fact: "Buzz Aldrin on the lunar surface, Apollo 11, 1969." },
  { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Flying_over_Devon_Island_%282665527817%29.jpg/1280px-Flying_over_Devon_Island_%282665527817%29.jpg", alt: "A bare, rocky polar landscape seen from the air", answer: "earth", fact: "Devon Island, Canada. NASA’s Haughton-Mars Project rehearses Mars here." },
  { src: U("OSIRIS%20Mars%20true%20color.jpg", 1200), alt: "A rust-coloured planet against black space", answer: "mars", fact: "The full disc of Mars, home to Olympus Mons, the tallest volcano known." },
  { src: "https://upload.wikimedia.org/wikipedia/commons/0/03/Cinder_Lake_Crater_Field_1.jpg", alt: "A field of small craters in dark volcanic ground", answer: "earth", fact: "Cinder Lake, Arizona, a man-made crater field built for Apollo training." },
  { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Apollo_17_Moon_Panorama.jpg/1280px-Apollo_17_Moon_Panorama.jpg", alt: "A grey, cratered lunar surface under a black sky", answer: "moon", fact: "The lunar surface at Apollo 17's landing site, 1972." },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/IronInRocksMakeRiverRed.jpg/1280px-IronInRocksMakeRiverRed.jpg", alt: "A river stained deep red by iron-rich water", answer: "earth", fact: "Río Tinto, Spain. Its acidic, iron-rich water precipitates minerals also found on Mars." },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PIA24173-MarsCuriosityRover-SelfPortrait-20201112.jpg/1280px-PIA24173-MarsCuriosityRover-SelfPortrait-20201112.jpg", alt: "A robotic rover on rusty, dusty ground", answer: "mars", fact: "A Curiosity rover selfie on Mars. The rover itself is in the frame." },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/A_Sulphur_Pond%2C_Danakil_Depression%2C_Ethiopia.jpg/1280px-A_Sulphur_Pond%2C_Danakil_Depression%2C_Ethiopia.jpg", alt: "A vivid yellow and green sulphur pond", answer: "earth", fact: "Dallol, Ethiopia, a hyperacidic, hypersaline volcanic landscape." },
];

export const CHOICES = [
  { pick: "earth", label: "◉ Earth" },
  { pick: "mars", label: "✦ Mars" },
  { pick: "moon", label: "◐ Moon" },
];

export function verdict(value, total) {
  if (value === total) return ["Offworld Expert ✦", "Flawless. You can tell a red desert from the Red Planet."];
  if (value >= total - 2) return ["Astronaut in Training", "Sharp eyes. Only a couple of worlds tripped you up."];
  if (value >= Math.ceil(total * 0.55)) return ["Mission Specialist", "Solid. Earth’s disguises are convincing, aren’t they?"];
  if (value >= Math.ceil(total * 0.3)) return ["Ground Control", "Not bad. The point is exactly how hard this is."];
  return ["Earthbound Explorer", "The disguises worked. That’s the whole idea."];
}
