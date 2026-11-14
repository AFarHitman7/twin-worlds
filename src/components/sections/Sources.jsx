import { SOURCES } from "../../data/sources.js";
import { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery.js";
import { useTilt } from "../../hooks/useMotion.js";
import { cx } from "../../lib/cx.js";
import Ghost from "../ui/Ghost.jsx";
import Reveal from "../ui/Reveal.jsx";
import SectionHead from "../ui/SectionHead.jsx";
import s from "./Sources.module.css";

function Source({ source, delay }) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const tilt = useTilt(fine && !reduced);

  return (
    <Reveal
      as="a"
      className={cx("tilt", s.source)}
      href={source.href}
      target="_blank"
      rel="noopener"
      delay={delay}
      {...tilt}
    >
      <div className="card-shine" aria-hidden="true" />
      <span className={s.type}>{source.type}</span>
      <span className={s.name}>{source.name}</span>
      <span className={s.desc}>{source.desc}</span>
    </Reveal>
  );
}

export default function Sources() {
  return (
    <section className="section" id="sources">
      <Ghost>09</Ghost>
      <SectionHead
        kicker="DEEP ARCHIVE · 09 — KEEP GOING"
        title={
          <>
            Go <span className="grad grad--fire">deeper.</span>
          </>
        }
        lede="The sites, catalogues and imagery behind this page, for anyone who wants to keep reading."
      />

      <div className={s.grid}>
        {SOURCES.map((source, i) => (
          <Source source={source} delay={i * 80} key={source.href} />
        ))}
      </div>

      <Reveal as="p" className={s.note}>
        Imagery: NASA and Wikimedia Commons contributors. Figures and site notes: ESA, NASA and
        Wikipedia. Content is educational, not mission advice.
      </Reveal>
    </section>
  );
}
