import { useRef } from "react";
import { GRAVITY, WORLDS } from "../../data/worlds.js";
import { useInView } from "../../hooks/useInView.js";
import { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery.js";
import { useTilt } from "../../hooks/useMotion.js";
import { cx } from "../../lib/cx.js";
import Ghost from "../ui/Ghost.jsx";
import Reveal from "../ui/Reveal.jsx";
import SectionHead from "../ui/SectionHead.jsx";
import s from "./Worlds.module.css";

function WorldCard({ world, delay }) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const tilt = useTilt(fine && !reduced);

  return (
    <Reveal
      as="article"
      className={cx("tilt", s.world)}
      style={{ "--planet": world.planet }}
      delay={delay}
      {...tilt}
    >
      <div className="card-shine" aria-hidden="true" />
      <div className={s.top}>
        <img className={s.img} src={world.img} alt={world.alt} loading="lazy" />
        <span className={s.tag}>{world.tag}</span>
        <span className={s.index}>{world.index}</span>
      </div>
      <h3 className={s.name}>{world.name}</h3>
      <p className={s.desc}>{world.desc}</p>
      <dl className={s.stats}>
        {world.stats.map(([term, value]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

function Gravity() {
  const ref = useRef(null);
  const revealed = useInView(ref);
  const shown = useInView(ref, { threshold: 0.35 });

  return (
    <div
      ref={ref}
      className={cx("reveal", revealed && "is-visible", s.gravity, shown && s.isVisible)}
      aria-label="Surface gravity compared with Earth"
    >
      <div className={s.gHead}>
        <span>◉ Surface gravity</span>
        <span className="mono">relative to Earth</span>
      </div>
      {GRAVITY.map((row) => (
        <div
          className={s.gRow}
          key={row.name}
          style={{ "--w": row.width, "--planet": row.planet, "--d": row.delay }}
        >
          <span className={s.gName}>{row.name}</span>
          <span className={s.gTrack}>
            <span className={s.gFill} />
            <span className={s.gSpark} />
          </span>
          <span className={s.gVal}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function Worlds() {
  return (
    <section className="section" id="worlds">
      <Ghost>01</Ghost>
      <SectionHead
        kicker="SYSTEM MAP · 01 — THE WORLDS"
        title={
          <>
            Three worlds, <span className="grad grad--fire">one neighbourhood.</span>
          </>
        }
        lede="The same rock and dust, spun at different scales. Here are the numbers that separate them."
      />

      <div className={s.grid}>
        {WORLDS.map((world, i) => (
          <WorldCard world={world} delay={i * 80} key={world.key} />
        ))}
      </div>

      <Gravity />
    </section>
  );
}
