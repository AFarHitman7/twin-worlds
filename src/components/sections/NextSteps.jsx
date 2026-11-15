import { Fragment } from "react";
import { SITES } from "../../data/atlas.js";
import { ROUNDS } from "../../data/game.js";
import { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery.js";
import { useTilt } from "../../hooks/useMotion.js";
import { BODIES, PARAMS } from "../../lib/similarity.js";
import { cx } from "../../lib/cx.js";
import Button from "../ui/Button.jsx";
import Reveal from "../ui/Reveal.jsx";
import SectionHead from "../ui/SectionHead.jsx";
import s from "./NextSteps.module.css";

// Earth, Mars and the Moon, read from the rounds rather than typed.
const GAME_WORLDS = new Set(ROUNDS.map((round) => round.answer)).size;

// A dotted globe with one orbit and one marker: the atlas, drawn rather than
// rendered, so this band never pulls three into the landing chunk.
function AtlasMark() {
  return (
    <svg className={s.mark} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="nextsteps-dots" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1.3" cy="1.3" r="1.05" fill="currentColor" />
        </pattern>
      </defs>
      <circle cx="60" cy="60" r="30" fill="url(#nextsteps-dots)" opacity="0.55" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
      <ellipse cx="60" cy="60" rx="30" ry="12" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.28" />
      <ellipse cx="60" cy="60" rx="12" ry="30" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.28" />
      <ellipse
        cx="60"
        cy="60"
        rx="46"
        ry="17"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.35"
        transform="rotate(-24 60 60)"
      />
      <circle cx="97" cy="37" r="2.8" fill="var(--sun)" opacity="0.85" />
      <circle cx="97" cy="37" r="6.5" fill="none" stroke="var(--sun)" strokeWidth="0.6" opacity="0.4" />
    </svg>
  );
}

// A viewfinder and its scanlines: the game's grey frame, drawn in the same
// low-contrast ink as the globe.
function FrameMark() {
  return (
    <svg className={s.mark} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <rect x="12" y="28" width="96" height="64" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      {[36, 44, 52, 60, 68, 76, 84].map((y) => (
        <line
          key={y}
          x1="16"
          y1={y}
          x2="104"
          y2={y}
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.16"
        />
      ))}
      <path
        d="M12 40V28h12M108 40V28H96M12 80v12h12M108 80v12H96"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.6"
      />
      <circle cx="78" cy="60" r="7" fill="none" stroke="var(--sun)" strokeWidth="0.7" opacity="0.5" />
      <path d="M78 51v5M78 64v5M69 60h5M82 60h5" stroke="var(--sun)" strokeWidth="0.7" opacity="0.5" />
      <circle cx="30" cy="60" r="1.6" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function Door({ kicker, title, copy, stats, cta, mark, delay }) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const tilt = useTilt(fine && !reduced);

  return (
    <Reveal className={s.cell} delay={delay}>
      <article className={cx("tilt", s.card)} {...tilt}>
        <div className="card-shine" aria-hidden="true" />
        <div className={s.top}>
          <p className={s.kicker}>{kicker}</p>
          {mark}
        </div>
        <h3 className={s.title}>{title}</h3>
        <p className={s.copy}>{copy}</p>
        <p className={s.stats}>
          {stats.map((item, i) => (
            <Fragment key={item}>
              <span>
                {item}
                {i < stats.length - 1 ? " ·" : ""}
              </span>
              {i < stats.length - 1 ? " " : null}
            </Fragment>
          ))}
        </p>
        <div className={s.cta}>
          <Button href={cta.href} variant={cta.variant}>
            {cta.label}
          </Button>
        </div>
      </article>
    </Reveal>
  );
}

export default function NextSteps() {
  return (
    <section className="section">
      <SectionHead
        kicker="TWO WAYS ONWARD"
        title={
          <>
            Pick a side of the <span className="grad grad--fire">story.</span>
          </>
        }
        lede="Read the science, or test your eyes. Both start here."
      />

      <div className={s.grid}>
        <Door
          kicker="TRAINING SIMULATION"
          // The word is the spelled form of ROUNDS.length.
          title="Twelve frames. No colour."
          copy="Black and white, lower resolution. The only clues are shape, tone and rock."
          stats={[`${ROUNDS.length} FRAMES`, `${GAME_WORLDS} WORLDS`, "1 GUESS EACH"]}
          cta={{ href: "#/game", label: "Play the test ↗", variant: "brass" }}
          mark={<FrameMark />}
          delay={0}
        />
        <Door
          kicker="FIELD RESEARCH"
          // The word is the spelled form of SITES.length.
          title="Eighteen sites, one globe."
          copy="Places that rehearse Mars or the Moon, scored against both bodies on seven parameters, with the limits of each one written down."
          stats={[`${SITES.length} SITES`, `${PARAMS.length} PARAMETERS`, `${BODIES.length} DESTINATIONS`]}
          cta={{ href: "#/atlas", label: "Open the atlas ↗" }}
          mark={<AtlasMark />}
          delay={90}
        />
      </div>

      <Reveal as="p" className={s.note}>
        NO ACCOUNT · NO <span className={s.keep}>SIGN-UP</span> · {ROUNDS.length} ROUNDS,{" "}
        {SITES.length} SITES
      </Reveal>
    </section>
  );
}
