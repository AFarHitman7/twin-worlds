import { useRef } from "react";
import { PILLARS, REALITY } from "../../data/fidelity.js";
import { useInView } from "../../hooks/useInView.js";
import { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery.js";
import { useTilt } from "../../hooks/useMotion.js";
import { cx } from "../../lib/cx.js";
import Ghost from "../ui/Ghost.jsx";
import Reveal from "../ui/Reveal.jsx";
import SectionHead from "../ui/SectionHead.jsx";
import s from "./Fidelity.module.css";

function PillarIcon({ type }) {
  if (type === "landform") {
    return (
      <svg className={s.icon} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 19l6-11 4 7 3-4 5 8z" />
        <path d="M3 19h18" />
      </svg>
    );
  }
  if (type === "chemistry") {
    return (
      <svg className={s.icon} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l7 4v10l-7 4-7-4V7z" />
        <circle cx="12" cy="12" r="2.4" />
      </svg>
    );
  }
  if (type === "life") {
    return (
      <svg className={s.icon} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="8" cy="12" r="3" />
        <circle cx="15.5" cy="9" r="2" />
        <circle cx="16" cy="16" r="2.4" />
      </svg>
    );
  }
  return (
    <svg className={s.icon} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  );
}

function Pillar({ pillar, delay }) {
  const ref = useRef(null);
  const shown = useInView(ref);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const tilt = useTilt(fine && !reduced);

  return (
    <article
      ref={ref}
      className={cx("reveal", "tilt", s.pillar, shown && "is-visible", shown && s.isVisible)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...tilt}
    >
      <div className="card-shine" aria-hidden="true" />
      <span className={s.num}>{pillar.num}</span>
      <PillarIcon type={pillar.icon} />
      <h3>{pillar.title}</h3>
      <p>{pillar.text}</p>
      <span className={s.bar}>
        <i style={{ "--p": pillar.progress }} />
      </span>
    </article>
  );
}

export default function Fidelity() {
  return (
    <section className="section" id="fidelity">
      <Ghost>02</Ghost>
      <SectionHead
        kicker="FIDELITY INDEX · 02 — HOW CLOSE IS “CLOSE”?"
        title={
          <>
            How close is <span className="grad grad--ice">“close”?</span>
          </>
        }
        lede="Scientists grade an analogue on four things. A site can be a near-perfect match on one and a poor one on another."
      />

      <div className={s.grid}>
        {PILLARS.map((pillar, i) => (
          <Pillar pillar={pillar} delay={i * 80} key={pillar.num} />
        ))}
      </div>

      <Reveal className={s.reality}>
        <div className={s.intro}>
          <span className="eyebrow">⚠ Reality check</span>
          <h3>What Earth always gives away</h3>
          <p>
            Every analogue shares one problem: it is still Earth. These four differences are what
            make the real thing so hard.
          </p>
        </div>
        <ul className={s.list}>
          {REALITY.map((item) => (
            <li key={item.label}>
              <span>{item.label}</span> {item.text}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
