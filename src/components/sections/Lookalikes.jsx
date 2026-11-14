import { LOOKALIKES } from "../../data/lookalikes.js";
import { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery.js";
import { useTilt } from "../../hooks/useMotion.js";
import { cx } from "../../lib/cx.js";
import Ghost from "../ui/Ghost.jsx";
import Reveal from "../ui/Reveal.jsx";
import SectionHead from "../ui/SectionHead.jsx";
import s from "./Lookalikes.module.css";

function Look({ look, delay }) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const tilt = useTilt(fine && !reduced);

  return (
    <Reveal as="article" className={cx("tilt", s.look)} delay={delay} {...tilt}>
      <div className="card-shine" aria-hidden="true" />
      <div className={s.media}>
        <img src={look.img} alt={look.alt} loading="lazy" />
        <span className={s.tag}>✦ Visual lookalike</span>
      </div>
      <div className={s.body}>
        <h3>{look.title}</h3>
        <p>{look.place}</p>
      </div>
    </Reveal>
  );
}

export default function Lookalikes() {
  return (
    <section className="section" id="lookalikes">
      <Ghost>06</Ghost>
      <SectionHead
        kicker="DOPPELGÄNGERS · 06 — PURE RESEMBLANCE"
        title={
          <>
            The <span className="grad grad--vice">lookalikes.</span>
          </>
        }
        lede="Not every “alien” landscape is a scientific analogue. These are chosen purely for the resemblance, and a few are a little artistic license."
      />

      <div className={s.grid}>
        {LOOKALIKES.map((look, i) => (
          <Look look={look} delay={i * 80} key={look.title} />
        ))}
      </div>

      <Reveal as="p" className={s.note}>
        A scientific analogue is chosen for its geology, chemistry or mission value. A lookalike is
        chosen for its photograph.
      </Reveal>
    </section>
  );
}
