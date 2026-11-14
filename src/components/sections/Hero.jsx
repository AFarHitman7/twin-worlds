import { Fragment, useEffect, useRef } from "react";
import { HERO_CHIPS, HERO_ORBS, HERO_STATS, HERO_TITLE } from "../../data/hero.js";
import { useInView } from "../../hooks/useInView.js";
import { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery.js";
import { useCountUp } from "../../hooks/useMotion.js";
import { cx } from "../../lib/cx.js";
import Button from "../ui/Button.jsx";
import Reveal from "../ui/Reveal.jsx";
import s from "./Hero.module.css";

const WORDS = HERO_TITLE.split(/\s+/);
const ORB_CLASS = { earth: "orbEarth", mars: "orbMars", moon: "orbMoon" };
const SAT_CLASS = { s1: "s1", s2: "s2" };
const CHIP_CLASS = { a: "chipA", b: "chipB", c: "chipC" };

function Stat({ count, lines }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.6 });
  const reduced = useReducedMotion();
  const value = useCountUp(count, inView, 1400, reduced);

  return (
    <div className={s.stat}>
      <b ref={ref}>{value}</b>
      <span>
        {lines[0]}
        <br />
        {lines[1]}
      </span>
    </div>
  );
}

export default function Hero() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const orbsRef = useRef(null);

  useEffect(() => {
    if (!fine || reduced) return;
    const orbs = orbsRef.current;
    if (!orbs) return;

    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      orbs.style.transform = `translate3d(${nx * 14}px, ${ny * 10}px, 0)`;
      orbs.querySelectorAll("[data-depth]").forEach((orb) => {
        const depth = Number(orb.dataset.depth || 1);
        orb.style.translate = `${nx * 16 * depth}px ${ny * 12 * depth}px`;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine, reduced]);

  return (
    <section className={s.hero} id="top">
      <div className={s.bgword} aria-hidden="true">
        <span>TWIN WORLDS • TWIN WORLDS • TWIN WORLDS</span>
      </div>
      <div className={s.beams} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className={s.copy}>
        <Reveal as="p" className={s.badge}>
          <span className={s.pulse} />
          {"EARTH\u00a0\u00a0·\u00a0\u00a0MARS\u00a0\u00a0·\u00a0\u00a0MOON"}
        </Reveal>

        <h1 className={cx(s.title, s.isSplit)} aria-label={HERO_TITLE}>
          {WORDS.map((word, i) => {
            const clean = word.toLowerCase().replace(/[^a-z]/g, "");
            return (
              <Fragment key={`${word}-${i}`}>
                <span
                  className={clean === "closer" ? `${s.word} ${s.wordHl}` : s.word}
                  style={{ "--i": i }}
                >
                  {word}
                </span>
                {i < WORDS.length - 1 ? " " : null}
              </Fragment>
            );
          })}
        </h1>

        <p className={s.sub}>
          Deserts, craters and lava fields on Earth mirror Mars and the Moon so closely that
          astronauts train for space without leaving the ground.
        </p>

        <div className={s.actions}>
          <Button href="#worlds" magnetic>
            Explore the worlds ↓
          </Button>
          <Button href="#/game" variant="brass" magnetic>
            Guess the planet ✦
          </Button>
        </div>

        <div className={s.meta}>
          {HERO_STATS.map((stat) =>
            stat.live ? (
              <div className={`${s.stat} ${s.statLive}`} key="live">
                <b>◉</b>
                <span>
                  {stat.lines[0]}
                  <br />
                  {stat.lines[1]}
                </span>
              </div>
            ) : (
              <Stat key={stat.lines[0]} count={stat.count} lines={stat.lines} />
            )
          )}
        </div>
      </div>

      <div className={s.orbs} aria-hidden="true" ref={orbsRef}>
        <div className={s.halo} />
        {HERO_ORBS.map((orb) => (
          <div
            key={orb.key}
            className={`${s.orb} ${s[ORB_CLASS[orb.key]]}`}
            data-depth={orb.depth}
          >
            <span className={s.glow} />
            <span className={`${s.ring} ${s.r1}`} />
            <span className={`${s.ring} ${s.r2}`} />
            <img src={orb.img} alt="" loading="eager" />
            <span className={s.label}>
              {orb.label}
              <span className={s.orbStat}>{orb.stat}</span>
            </span>
            {orb.sat ? <span className={`${s.sat} ${s[SAT_CLASS[orb.sat]]}`} /> : null}
          </div>
        ))}
        {HERO_CHIPS.map((chip) => (
          <div key={chip.cls} className={`${s.chip} ${s[CHIP_CLASS[chip.cls]]}`}>
            {chip.text}
          </div>
        ))}
      </div>

      <a className={s.scroll} href="#worlds" aria-label="Scroll to explore">
        <span>Scroll</span>
        <span className={s.scrollLine} aria-hidden="true" />
      </a>
    </section>
  );
}
