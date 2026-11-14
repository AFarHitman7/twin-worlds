import { Fragment, useEffect, useRef } from "react";
import { PARAMS, overallScore } from "../../lib/similarity.js";
import ParamTable from "./ParamTable.jsx";
import SimilarityRing from "./SimilarityRing.jsx";
import { RUBRIC_PARTS } from "./rubric.js";
import { cx } from "../../lib/cx.js";
import s from "./SiteDossier.module.css";

const PARAM_LIST = PARAMS.map((param) => param.label.toLowerCase()).join(", ");

const BADGES = [
  { body: "mars", glyph: "◉", text: "MARS ANALOGUE" },
  { body: "moon", glyph: "◐", text: "MOON ANALOGUE" },
];

const PROSE = [
  { key: "location", title: "Location" },
  { key: "geography", title: "Geography" },
  { key: "geology", title: "Geology" },
  { key: "atmosphere", title: "Atmosphere" },
];

/**
 * The full record for one site. On desktop it is the second column of the band
 * and scrolls inside itself; under 1024 px the same markup is the bottom sheet.
 */
export default function SiteDossier({ site, dialog = false, open = false, onClose }) {
  const cardRef = useRef(null);
  const closeRef = useRef(null);

  // Focus goes to the close control when the sheet opens, and the page behind
  // it stops scrolling. Escape closes; Tab stays inside the sheet.
  useEffect(() => {
    if (!dialog || !open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
        return;
      }
      if (event.key !== "Tab") return;

      const card = cardRef.current;
      if (!card) return;
      const focusable = card.querySelectorAll(
        'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [dialog, open, onClose]);

  if (!site) return null;

  const marsScore = overallScore(site, "mars");
  const moonScore = overallScore(site, "moon");
  const body =
    site.targets.includes("mars") && site.targets.includes("moon")
      ? "both"
      : site.targets.includes("moon")
        ? "moon"
        : "mars";

  return (
    <article
      ref={cardRef}
      className={s.card}
      data-body={body}
      data-dialog={dialog ? "true" : "false"}
      data-open={dialog ? (open ? "true" : "false") : undefined}
      role={dialog ? "dialog" : undefined}
      aria-modal={dialog ? "true" : undefined}
      aria-label={dialog ? `${site.name} dossier` : undefined}
    >
      {dialog ? (
        <div className={s.sheetHead}>
          <span className={s.grabber} aria-hidden="true" />
          <button
            ref={closeRef}
            type="button"
            className={s.close}
            onClick={onClose}
            aria-label="Close dossier"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
              />
            </svg>
          </button>
        </div>
      ) : null}

      <div className={s.body}>
        <div className={s.top}>
          <div className={s.badges}>
            {BADGES.filter((badge) => site.targets.includes(badge.body)).map((badge) => (
              <span className={s.badge} data-body={badge.body} key={badge.body}>
                <span aria-hidden="true">{badge.glyph}</span> {badge.text}
              </span>
            ))}
          </div>
          <div className={s.place}>
            <span className={s.country}>{site.country}</span>
            <span className={s.type}>{site.type}</span>
          </div>
        </div>

        <h2 className={s.name}>{site.name}</h2>

        <p className={s.coords}>
          {site.coord}
          {site.elevation ? ` — ${site.elevation}` : null}
        </p>

        <div className={s.scores}>
          <div className={s.rings}>
            <SimilarityRing body="mars" value={marsScore} />
            <SimilarityRing body="moon" value={moonScore} />
          </div>
          <p className={s.scoreCaption}>Weighted physical match · out of 100</p>
          <details className={s.how}>
            <summary>How these are scored</summary>
            <div className={s.howBody}>
              <p className={s.rubric}>
                {RUBRIC_PARTS.map((part, index) => (
                  <Fragment key={part}>
                    {index > 0 ? " " : null}
                    <span>
                      {part}
                      {index < RUBRIC_PARTS.length - 1 ? " ·" : ""}
                    </span>
                  </Fragment>
                ))}
              </p>
              <p>Each score is a weighted mean of seven parameters: {PARAM_LIST}.</p>
            </div>
          </details>
        </div>

        <figure className={s.photo}>
          <img
            className={s.img}
            src={site.img}
            alt={site.alt}
            loading="lazy"
            decoding="async"
          />
          <figcaption className={s.credit}>Photo: {site.imgCredit}</figcaption>
        </figure>

        <div className={s.prose}>
          {PROSE.map((block) => (
            <section className={s.block} key={block.key}>
              <h3>{block.title}</h3>
              <p>{site[block.key]}</p>
            </section>
          ))}

          <section className={s.block}>
            <h3>Why it is an analogue</h3>
            <p>{site.summary}</p>
            <p>{site.text}</p>
          </section>

          <section className={cx(s.block, s.fails)}>
            <h3>Where it fails</h3>
            <p>{site.limits}</p>
          </section>
        </div>

        <ParamTable site={site} />

        <div className={s.sources}>
          <h3 className={s.sourcesLabel}>Sources</h3>
          <ul className={s.sourceList}>
            {site.sources.map((source) => (
              <li key={source.href + source.label}>
                <a href={source.href} target="_blank" rel="noopener noreferrer">
                  {source.label}
                  <span className={s.arrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
