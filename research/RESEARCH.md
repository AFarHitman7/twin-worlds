# Research: Earth locations that resemble the Moon or Mars
Compiled for TWIN WORLDS. Sources reached live over the open web (DuckDuckGo HTML, Hacker News Algolia, Wikipedia API, ESA PDF, GitHub, NASA/USGS, editorial sites) plus Reddit via PullPush because Reddit's own JSON API returned 403.

> **Coverage note.** X/Twitter, Instagram, TikTok and LinkedIn were not reachable from this environment. Bing silently ignored `site:` operators; DuckDuckGo began rate-limiting after the first queries. Reddit direct API was blocked (403) and old.reddit redirected (302); PullPush returned noisy, recency-biased results. The source list below is therefore strong on web, Wikipedia, agency and editorial material, and weaker on social platforms.

---

## 1. Source inventory

### 1A. Authoritative catalogues, agencies and databases

| Source | Type | What it gives you | URL |
|---|---|---|---|
| ESA — *The Catalogue of Planetary Analogues* (TN2, 2012) | Scientific catalogue (PDF, ~13 MB) | The canonical list. 30 chapters, each with coordinates, country, geological setting, relevance, images, references. Built by The Open University for ESA. | http://esamultimedia.esa.int/docs/gsp/The_Catalogue_of_Planetary_Analogues.pdf |
| Wikipedia — *Terrestrial analogue site* | Encyclopedia article | Definition, the four fidelity criteria (geomorphology, geochemistry, exobiology, exploration conditions), history (1997 Arizona, HMP, NEEMO, Pavilion Lake, HI-SEAS), table of current analogues. | https://en.wikipedia.org/wiki/Terrestrial_analogue_site |
| Wikipedia — *List of Mars analogs* | Encyclopedia list | Crewed analogue **habitats/experiments**, not geographic lookalikes: Mars-500, MDRS, FMARS, HI-SEAS, NEEMO, Concordia, Mars Dune Alpha, SAM. Useful for the "simulation" angle. | https://en.wikipedia.org/wiki/List_of_Mars_analogs |
| NASA — *Analog Missions* | Agency hub | Program overview, analog mission types, links to field sites. | https://www.nasa.gov/analog-missions/ |
| NASA — *Planetary Analogs* | Agency explainer | What planetary analogs are and why they are used. | https://science.nasa.gov/solar-system/planetary-analogs/ |
| NASA — *Planetary Analog Explorer* | Interactive map/explorer | Browse analog sites on a map; good model for an interactive feature. | https://science.nasa.gov/solar-system/analog-explorer/ |
| NASA — *Analogs & Mockups (JSC)* | Agency reference | Habitat/mockup testing and human-factors analogs. | https://www.nasa.gov/reference/jsc-analogs-mockups/ |
| NASA Astrobiology — *Field Sites* | Agency directory | Astrobiology field sites and research locations. | https://astrobiology.nasa.gov/research-locations/ |
| USGS — *Terrestrial Analogs* | Agency explainer | How Earth analogs are used to study other planets. | https://www.usgs.gov/science/science-explorer/planetary-science/terrestrial-analogs |
| *Planetary Analogue Catalogue* (GitHub) | Structured dataset + live site | 16 sites, GeoJSON. Each record: target body, analogue type, feature, why relevant, **where it fails**, geology, biology, access, hazards, references, photos. Best model for data structure. | https://github.com/rachellelecussan/planetary-analogue-catalogue · https://rachellelecussan.github.io/planetary-analogue-catalogue/ |
| SAM — *Analogs Worldwide* | Habitat/simulation directory | Sealed-habitat analogs: BIOS-3, Biosphere 2, CEEF, Lunar Palace, ESA MELiSSA. | https://moonandmars.space/research/analogs-worldwide/ |
| NASA NTRS — *Mars Analog Site Study* | Technical report (PDF) | Site-selection science for Mars analogs. | https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/19940011727.pdf |
| ScienceDirect — review of analog habitats | Academic review | Lessons from lunar/Mars analog habitats. | https://www.sciencedirect.com/science/article/pii/S2352309321000018 |
| Springer — *Atlas of Lunar Historical Sites and Proposed Bases* | Academic atlas | Lunar site atlas; adjacent reference. | https://link.springer.com/article/10.1007/s42496-024-00239-z |
| NeurAstra — *Space Analogue Sites* | Curated directory | European analogue-site listings. | https://neurastra.eu/space-analogue-sites |

### 1B. Editorial, travel and listicle sources

| Source | Type | What it gives you | URL |
|---|---|---|---|
| BBC Earth — *The places where you can visit Mars on Earth* (Richard Gray) | Long-form editorial | Atacama, McMurdo Dry Valleys, Hanksville (Utah), Tenerife, Iceland, Pilbara, Boulby. Quotes Dr Claire Cousins (St Andrews); rover/instrument history; access notes. | https://www.bbcearth.com/news/the-places-where-you-can-visit-mars-on-earth |
| The Independent — *The places on Earth that look like the moon* | Photo listicle | Bardenas Reales (Spain), Spotted Lake (Canada), Valle de la Luna (Chile), The Pinnacles (Australia), Rummu quarry (Estonia), Goblin Valley (Utah), Fly Geyser (Nevada), Iceland, Sarakiniko (Greece), Hawaii. Openly admits "artistic license" for some. | https://www.independent.co.uk/travel/news-and-advice/moon-landings-travel-earth-apollo-11-chile-canada-iceland-a8998966.html |
| Atlas Obscura — *Extraterrestrial Analogues: Seven Places…* | Editorial | Blood Falls/Antarctic Dry Valleys, Atacama, Cinder Lake Crater Field, Askja (Iceland), Mount Etna, Namib Desert, Pavilion Lake. Links the ESA catalogue. | https://www.atlasobscura.com/articles/planetary-analogues-space-on-earth |
| Forbes — *Most Mars-Like Locations On Earth* | Editorial | Mars-like locations with imagery. | https://www.forbes.com/sites/valeriestimac/2021/12/29/these-are-the-most-mars-like-locations-on-earth/ |
| GeologyScience — *10 Places That Look Like Other Planets* | Geoscience listicle | Dallol (Ethiopia) and other planetary analogs; explains geology and planetary analog. | https://geologyscience.com/gallery/geologic-lists/10-places-that-look-like-other-planets/ |
| WonderDome — *No rocket needed…* | Educational listicle | Svalbard (AMASE), Wadi Rum, Mauna Kea/Mauna Loa, Lanzarote, Lambahraun (Iceland), Devon/Axel Heiberg. Explains Moon/Mars conditions. | https://wonderdome.co.uk/moon-mars-like-analog-sites/ |
| The Scroller — *15 Places on Earth NASA Uses to Train* | Listicle | Atacama, Haughton, Craters of the Moon, Aquarius Reef Base, Lanzarote, McMurdo, Haleakala, Pavilion Lake, Pisgah Crater, Askja, Meteora, Tswalu, Mauna Kea, Rio Tinto, Nullarbor. **Caution: images credited to Reddit users.** | https://www.thescroller.net/86967/nasa-astronaut-training-places-earth/ |
| Matador Network — *Places That Look Like the Moon, Mars on Planet Earth* | Travel editorial | Photo-led comparisons. | https://matadornetwork.com/read/other-worldly-landscapes/ |
| Times of India — *Moon on Earth* | Photo story | 10 moon-like places. | https://timesofindia.indiatimes.com/travel/web-stories/moon-on-earth-10-places-on-earth-that-look-strikingly-like-the-moon/photostory/124012635.cms |
| Moneycontrol — *Moon on Earth: 5 places* | Photo listicle | Moon-like landscapes. | https://www.moneycontrol.com/travel/moon-on-earth-5-stunning-places-that-resemble-the-lunar-landscape-article-13563787.html |
| TravelerWiz — *14 Real Places…* | Listicle | Broad "other planet" locations. | https://www.travelerwiz.com/travel-destinations/places-on-earth-that-look-like-an-another-planet/ |
| AOL — *12 Places on Earth That Look Like Mars* | Syndicated listicle | Mars lookalikes. | https://www.aol.com/lifestyle/12-places-earth-look-mars-190842184.html |
| TourRadar — *Mars on Earth: 7 Places* | Travel listicle | Mars lookalikes. | https://www.tourradar.com/days-to-come/mars-on-earth-places-that-look-like-mars/ |
| TheTravel — *7 Places On Earth That Look Like Mars* | Travel listicle | Mars lookalikes. | https://www.thetravel.com/places-that-look-like-mars/ |
| YourAmazingPlaces — *16 Unbelievable Places…* | Travel listicle | Mars-like landscapes. | https://www.youramazingplaces.com/16-unearthly-places-thatll-make-believe-mars/ |
| CuriousDon — *10 Places That Look Like Mars* | Travel listicle | Mars lookalikes. | https://www.curiousdon.com/places-that-look-like-mars/ |
| RadioCity — *Earth Locations That Resemble Mars* | Web story | Mars lookalikes. | https://www.radiocity.in/web-stories/places-on-earth-like-mars-5828 |
| TiltedTimes — *25 Earth Places So Strange…* | Listicle | "Another planet" locations. | https://tiltedtimes.org/earth-places-that-look-like-another-planet |
| TheVoyaging — *9 Surreal Places…* | Listicle | Space-like Earth places. | https://thevoyaging.com/surreal-places-on-earth-that-look-like-they-belong-in-space/ |
| Facts.net — *31 Facts About Earth Analogue Sites* | Fact list | Quick facts about analog sites. | https://facts.net/science/geography/31-facts-about-earth-analogue-sites-for-space-exploration/ |

### 1C. Community discussions

| Source | Type | What it gives you | Link |
|---|---|---|---|
| Hacker News — CHAPEA year-long Mars analog | News thread (Algolia) | Discussion of NASA's year-long simulated Mars mission. | http://www.collectspace.com/news/news_062523a-chapea-yearlong-mars-analog-begins.html |
| Hacker News — HI-SEAS (The Verge) | News thread | "What it's like to spend 8 months on a fake Mars mission" (Hawaii). | https://www.theverge.com/2017/9/24/16356876/nasa-hi-seas-mars-analogue-mission-hawaii-mauna-loa |
| Hacker News — Armenia Mars analog | News thread | Armenia to host a Mars analog simulation. | https://massispost.com/2023/03/a-twin-of-the-red-planet-armenia-to-host-austrian-space-forums-next-mars-analog-simulation/ |
| Hacker News — MarsVR | Show HN | VR experience supporting Mars exploration. | https://news.ycombinator.com/item?id=17089018 |
| Reddit r/space, r/MarsSociety, r/Astrobiology | Community posts | MDRS alumni, analog missions, Mars sample/life discussion. Examples: https://reddit.com/comments/1x0ivll · https://reddit.com/comments/1x4qbff | — |
| Reddit — Dallol image posts | Community posts | Dallol (Ethiopia) shared as "otherworldly": r/ScienceNcoolThings https://reddit.com/comments/1u2xup3 · r/natureporn https://reddit.com/comments/1u2xv1t · r/BeAmazed https://reddit.com/comments/1u2xuxx | — |
| PullPush API | Reddit archive | Fallback search for Reddit submissions (noisy). | https://api.pullpush.io |

---

## 2. The canonical 30 — ESA Catalogue of Planetary Analogues

Extracted from the PDF (chapter, country/region, coordinates where given, and the catalogue's own relevance note).

| # | Site | Where | Analog for | Why it is used |
|---|---|---|---|---|
| 1 | Antarctic Dry Valleys (McMurdo) | Antarctica (77°30′S 163°00′E) | Mars | "Most Mars-like environment on Earth": cold desert, ice/sand-wedge and sublimation polygons, gullies, cryptoendoliths, salts, subsurface brines, Blood Falls. |
| 2 | Atacama Desert | N Chile / S Peru (20–30°S) | Mars + Moon | Hyper-arid desert, Mars-like soils, desert pavement, volcanic and hydrothermal deposits, playas, channels, alluvial fans, aeolian features, impact deposits. |
| 3 | Central Australia | Australia (Alice Springs 23.7°S 133.87°E) | Mars | Fluvial/aeolian features, barchan dunes, dry fluvial deposits, Martian regolith/soils, major channels, impact craters and rays. |
| 4 | Axel Heiberg Island | Canada, Nunavut (79°26′N 90°46′W) | Mars | Periglacial landforms, ground ice, polygons, perennial spring mineral deposits, salt deposits, extremophile studies. |
| 5 | Barberton Greenstone Belt | South Africa, Mpumalanga (25°47′10″S 31°31′1″E) | Mars (astrobiology) | Fossil microbial mats and stromatolites, volcanic sediments, aqueous alteration; preservation potential of life. |
| 6 | Black Point Lava Flow | USA, Arizona (35°42′N 111°18′W) | Moon + Mars | Lava-flow compositions/morphologies, cinder cones, impact crater morphologies, basalts. |
| 7 | Cinder Lake | USA, Arizona (35.3225, −111.51806) | Moon (designed) | Man-made crater field built from a Lunar Orbiter image for Apollo; cinder types/thicknesses as lunar analogue. |
| 8 | Columbia River Basalt Group | USA, WA/OR/ID/NV/CA | Moon + Mars | Flood-basalt volcanism, basalts interbedded with sediments, astrobiology. |
| 9 | The Golden Deposit | Canada, NWT (65°11′58″N 124°38′15″W) | Mars | Natrojarosite, jarosite, hematite, goethite under permafrost/arid conditions; sulphate/iron-oxide analogue. |
| 10 | Haughton Impact Structure | Canada, Nunavut, Devon Island (75°22′N 89°41′W) | Moon + Mars | Rocky, dusty, unvegetated terrain; impact melt breccias, hydrothermal deposits, canyons; HMP field site. |
| 11 | Ibn Battuta | Morocco (30.5, −6.75) | Mars | Ancient stromatolites, modern analogues, exploration terrain around the Ibn Battuta Centre. |
| 12 | Iceland | Iceland (65°N 18°W) | Mars + Moon | Basaltic lavas, volcanism, glaciovolcanism, hydrothermal alteration; Apollo and Artemis training; Mars2020 prototype tests. |
| 13 | Kamchatka | Russia (51–61°N) | Mars + Moon | Lava flows, scoria, ash; cold climate and frozen ground add permafrost/volcanic analogs. |
| 14 | Kilauea | USA, Hawaiʻi (19°25′30″N 155°17′31″W) | Mars + Moon | Shield volcanoes, basaltic lavas, caves, lava tubes, collapse pits, skylights, palaeoregolith, subsurface life. |
| 15 | Lonar Crater | India, Maharashtra (19°58′36″N 76°30′30″E) | Moon + Mars | Impact cratering in basalt; basalt composition similar to Martian meteorites. |
| 16 | Meteor Crater | USA, Arizona (35°1′38″N 111°1′21″W) | Moon + Mars | Simple bowl crater, ejecta, glass, shocked materials; astronaut geology training. |
| 17 | Mistastin Lake Crater | Canada, Labrador (55°53′N 63°18′W) | Moon (exceptional) | Anorthositic target + ejecta; comparable to 150–200 km lunar craters. |
| 18 | Mt. Etna | Italy, Sicily (37°45′18″N 14°59′42″E) | Moon + Mars (+ Venus) | Active volcanism, lava flows, pyroclastics; scientific and robotic studies. |
| 19 | Namib Desert | Namibia / Angola (Gobabeb 23°34′S) | Moon + Mars | Deserts, sand/gravel, barchan/barchanoid/transverse/complex dunes; dune scale closest to Mars. |
| 20 | Pavilion Lake | Canada, British Columbia (50°51′N 121°44′W) | Moon + Mars (+ early Earth) | Microbialites and underwater exploration; analog for astrobiology and EVA/submersible operations. |
| 21 | Pilbara | Australia (21°S 119°E) | Mars | Ancient volcanic sediments, metamorphism, aqueous alteration, fossils; origin/preservation of life. |
| 22 | Ries Impact Crater | Germany, Bavaria (48°53′N 10°37′E) | Moon + Mars | Mid-size complex crater, ejecta, glasses, phyllosilicates; astrobiology. |
| 23 | Rio Tinto | Spain, Huelva (37°15′N 6°57′W) | Mars | Acidic river, iron-oxide/sulphate deposits, extremophiles, fossil preservation. |
| 24 | Sudbury Impact Crater | Canada, Ontario (46°36′N 81°11′W) | Moon + Mars | Large impact structures, melt rocks/breccias/sheets, hydrothermal systems, shatter cones. |
| 25 | Sunset Crater | USA, Arizona (35°21′51″N 111°30′11″W) | Mars | Wind-reworked tephra into dunes; aeolian processes, volcanoes, lava flows, basalt. |
| 26 | Svalbard | Norway (78°N 16°E) | Mars | Red sand/gravel/mud, cold climate, carbonate terraces and rosettes (cf. ALH84001); AMASE. |
| 27 | Tenerife | Spain, Canary Islands (28°13′N 16°37′W) | Mars + Moon | Volcanoes, vents, lava flows, pyroclastic deposits, lava tubes/caves. |
| 28 | Turpan Desert | China, Xinjiang (42.63°N 89.86°E) | Mars | Aeolian dunes, ripples, dust devils and tracks, studied in situ and from orbit. |
| 29 | Utah Desert (MDRS) | USA, Utah (38°24′N 110°47′W) | Mars | Mars-analogue soils/regolith, sands, evaporites, clays, sulphates; MDRS habitat. |
| 30 | Yellowstone | USA (44°36′N 110°30′W) | Mars | Hot springs, silica sinters, giant calderas/supervolcano analogues. |

---

## 3. Widely cited sites beyond the ESA catalogue

These appear repeatedly in editorial sources, mission histories, or structured datasets.

| Site | Where | Analog for | Why it is cited | Main sources |
|---|---|---|---|---|
| Wadi Rum | Jordan | Mars (visual/landscape) | Red sandstone, "Valley of the Moon"; filmed as Mars in *The Martian*, *Red Planet*, *The Last Days on Mars*. Great for visual comparison, weaker as a scientific analog. | WonderDome, travel listicles |
| Lanzarote (Timanfaya, Los Volcanes, Cueva de los Verdes) | Spain, Canary Islands | Mars + Moon | Pristine 1730s lavas, lava tubes; ESA **Pangaea** astronaut geology training; NASA/ESA rover practice. | The Scroller, WonderDome, GitHub |
| Mauna Kea / Mauna Loa / HI-SEAS | USA, Hawaiʻi | Moon + Mars | "Apollo Valley" geology training; palagonitized tephra; ISRU/instrument tests; HI-SEAS isolation habitat. | ESA (Kilauea ch.), WonderDome, GitHub, The Scroller |
| Craters of the Moon | USA, Idaho | Moon | Vast basaltic lava field; Apollo 14 astronauts trained here. | The Scroller |
| Boulby Mine | UK, North Yorkshire | Mars (subsurface) | Permian evaporites and brines; MINAR instrument suite tested underground. | GitHub, BBC |
| Dallol | Ethiopia, Danakil Depression | Mars (geochemical) + Io (visual) | Hyperacidic, hypersaline, iron-rich springs precipitating jarosite/akaganeite/hematite; vivid colours. | GitHub, GeologyScience |
| Hanksville / Utah Desert | USA, Utah | Mars | Jurassic red beds; ExoMars/rover instrument tests; MDRS nearby. | BBC, ESA ch.29 |
| Haleakala Crater | USA, Hawaiʻi (Maui) | Moon + Mars | Cinder cones, high-altitude volcanic terrain; rover driving. | The Scroller |
| Pisgah Crater | USA, California (Mojave) | Moon + Mars | Pahoehoe/aa lava; Curiosity/Perseverance-style rover tests; blind rover driving with time delay. | The Scroller |
| Lava Beds National Monument | USA, California | Moon | Basaltic lava tubes and skylights; lunar tube mapping/stability models. | GitHub |
| Meteora | Greece | Moon/Mars (visual/operational) | Vertical conglomerate pillars; tethering/robotic-climbing tests (listicle claim). | The Scroller |
| Tswalu / Kalahari | South Africa, Northern Cape | Mars | Red Kalahari sands, dust/thermal testing, long traverses. | The Scroller |
| Nullarbor Plain | Australia | Moon/Mars (operational) | Flat, vegetation-free limestone; meteorite-hunting practice. | The Scroller |
| Bardenas Reales | Spain, Navarre | Moon (visual) | Eroded badlands; *Game of Thrones* / Bond location. | The Independent |
| Goblin Valley | USA, Utah | Moon (visual) | Hoodoos; *Galaxy Quest* backdrop. | The Independent |
| Sarakiniko, Milos | Greece | Moon (visual) | White volcanic rock, salt-crusted cliffs. | The Independent |
| The Pinnacles | Australia, WA | Moon (visual) | Limestone pillars. | The Independent |
| Rummu quarry | Estonia | Moon (visual) | Flooded limestone quarry. | The Independent |
| Spotted Lake | Canada, BC | Moon (visual; "artistic license") | Mineral pools. The article itself admits the moon has no spotted lakes. | The Independent |
| Fly Geyser | USA, Nevada | Moon (visual; "artistic license") | Mineral geyser. | The Independent |
| Lake Vostok | Antarctica | Europa | Subglacial lake under ~4 km ice. | GitHub |
| Lost City Hydrothermal Field | Mid-Atlantic Ridge | Enceladus | Alkaline H₂/CH₄ hydrothermal chimneys. | GitHub |

---

## 4. Image sources (and licensing)

| Source | Type | Notes |
|---|---|---|
| Wikimedia Commons | Free / CC / public domain | Best for a public site. Use `Special:FilePath` with `?width=`. **Always credit the author and licence.** |
| NASA Image and Video Library — https://images.nasa.gov | Public domain (mostly) | Earth/Mars/Moon, rover and Apollo imagery. |
| NASA Photojournal — https://photojournal.jpl.nasa.gov | Public domain (mostly) | Mission images with captions and IDs. |
| ESA Catalogue of Planetary Analogues PDF | Agency report; images individually credited | Check each image credit before reuse. |
| Atlas Obscura place pages | Editorial photos, credited | Licensed; contact/credit required. |
| Getty / iStock (via BBC, Independent, Forbes) | Paid stock | Do not hotlink; license required. |
| Google Maps / Street View | Map imagery | Devon Island 360° views via Haughton-Mars Project; check terms. |
| The Scroller / Reddit-sourced images | User content | **Avoid** for a public site; provenance and licence unclear. |

Verified free image examples (HTTP 200, Wikimedia Commons):
- Earth (Blue Marble): `Special:FilePath/The Earth seen from Apollo 17.jpg?width=1200`
- Mars: `Special:FilePath/OSIRIS Mars true color.jpg?width=1200`
- Moon: `Special:FilePath/FullMoon2010.jpg?width=1200`
- Wadi Rum: `Special:FilePath/Wadi Rum, Jordan.jpg?width=1600`
- Aldrin on the Moon: `Special:FilePath/Aldrin Apollo 11 original.jpg?width=1600`
- Atacama / Valle de la Luna, McMurdo, Craters of the Moon, Meteor Crater, Curiosity landscapes: Wikimedia Commons thumb URLs (see the site's `index.html`).

---

## 5. What to look for

### 5.1 Specific locations — the shortlist worth featuring
**Mars analogues:** Atacama (Yungay/Valle de la Luna), Antarctic Dry Valleys + Blood Falls, Haughton/Devon Island, Iceland (Askja, Holuhraun, Krafla, Lambahraun), Wadi Rum, Lanzarote, Tenerife/Teide, Rio Tinto, Dallol, Namib/Dead Vlei, Central Australia/Pilbara, Mauna Kea/Mauna Loa, Utah/Hanksville, Svalbard/Bockfjord, Boulby Mine.

**Moon analogues:** Craters of the Moon (Idaho), Cinder Lake Crater Field (AZ), Meteor Crater (AZ), Mauna Kea/Mauna Loa "Apollo Valley", Iceland (Askja, Lambahraun), Lanzarote, Haleakala, Pisgah Crater, Lava Beds NM, plus visual lookalikes (Bardenas Reales, Goblin Valley, Sarakiniko, Pinnacles, Rummu).

### 5.2 Images — what makes a comparison convincing
- Pair each Earth site with a **real NASA image of the target body** at a similar framing and scale.
- Match **ground-level** shots to ground-level rover/Apollo images; match **orbital/dune** shots to orbital images.
- Show the diagnostic features: red vs grey palette, dunes, craters, lava tubes, polygons, salt/acid deposits.
- Credit everything; prefer NASA + Wikimedia.

### 5.3 Similarities — a reusable taxonomy
1. **Visual / geomorphological:** iron-oxide red vs basalt grey/black; dunes; craters and ejecta; lava flows and tubes; canyons; polygons; yardangs; salt flats; hoodoos.
2. **Chemical / mineralogical:** jarosite, hematite, goethite, smectite clays, perchlorates, nitrates, carbonates, sulphates, acidic brines.
3. **Biological:** extremophiles, cryptoendolithic lichens, chemolithotrophs, stromatolites, microbialites.
4. **Process:** impact, volcanism, aeolian, fluvial, glacial/periglacial, hydrothermal.
5. **Operational:** isolation, communication delay, spacesuit analog, low-pressure/low-gravity analog, rover and ISRU testing.

**Fidelity framework (from Wikipedia):** judge each site on *geomorphology*, *geochemistry*, *exobiology* and *exploration conditions*. State the **limitations** too — atmosphere, liquid water, weathering, gravity, scale of lava tubes.

---

## 6. Gaps and opportunities for TWIN WORLDS

1. **Most competitors are static listicles.** Few offer a drag comparison, a map, or a quiz. The site's comparison sliders + "Guess the Planet" already sit in a gap.
2. **Data is fragmented.** Wikipedia covers habitats, ESA covers geographic sites, GitHub adds limitations/references, NASA offers an explorer, and listicles cover visuals. A single cited, structured page is an opportunity.
3. **Add "why it is NOT the planet."** The GitHub dataset's `analogue_limitations` is the credibility differentiator: atmosphere, water, weathering, gravity, tube size.
4. **Separate scientific analogues from visual lookalikes.** Label Spotted Lake, Fly Geyser, Sarakiniko, Pinnacles, Rummu as "visually lunar" (some are admitted artistic license), and keep Atacama, Dry Valleys, Haughton, Cinder Lake, etc. as scientific analogues.
5. **Add a map.** ESA coordinates + the GitHub GeoJSON make a Leaflet map straightforward.
6. **Expand the roster** beyond the current six sites: Devon Island/Haughton, Lanzarote, Tenerife, Rio Tinto, Dallol, Svalbard, Namib, Cinder Lake, Mauna Kea, Haleakala, Pisgah, Lava Beds, Pavilion Lake.
7. **Citation per card.** Each location should show its source (ESA CPA chapter, NASA, USGS, peer-reviewed paper) and image credit.

---

## 7. Fact bank (safe, sourced)

- The Antarctic Dry Valleys are described by the ESA catalogue as "the most Mars-like environment on Earth."
- Atacama instruments used on Viking 1, Viking 2, Phoenix and ExoMars were tested there (BBC Earth).
- Haughton is a 14-mile-wide (≈23 km) impact structure on Devon Island; NASA's Haughton-Mars Project uses it for isolation and comms-delay tests.
- Cinder Lake crater field was man-made in the 1960s from a Lunar Orbiter image for Apollo training.
- Craters of the Moon (Idaho) was used by Apollo 14 astronauts (Alan Shepard, Edgar Mitchell) for volcanic-rock training.
- Iceland hosted Apollo 11/12 geology training and a 2019 Mars2020 rover prototype test at Lambahraun.
- Lanzarote hosts ESA's Pangaea astronaut field-geology course.
- Namib dunes reach ~300 m, the closest terrestrial scale to Martian dunes (Atlas Obscura).
- Pavilion Lake's microbialites are analogues for ancient stromatolites and underwater exploration.
- Rio Tinto precipitates jarosite/hematite like Meridiani Planum; Dallol precipitates jarosite/akaganeite.
