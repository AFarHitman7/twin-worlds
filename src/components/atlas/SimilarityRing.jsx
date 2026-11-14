import { BODY_LABEL } from "./rubric.js";
import s from "./SimilarityRing.module.css";

const SIZE = 84;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * One similarity score as a thin gauge. The colour is the destination body,
 * never the quality of the score: a low number is still the honest answer.
 */
export default function SimilarityRing({ body, value }) {
  const name = BODY_LABEL[body] ?? "Mars";
  const score = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : null;
  const label =
    score === null
      ? `${name} similarity not scored`
      : `${name} similarity ${score} out of 100`;

  return (
    <figure className={s.ring} data-body={body}>
      <div className={s.dial} role="img" aria-label={label}>
        <svg
          className={s.svg}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width={SIZE}
          height={SIZE}
          aria-hidden="true"
          focusable="false"
        >
          <circle
            className={s.track}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE}
          />
          {score === null ? null : (
            <circle
              className={s.arc}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              strokeWidth={STROKE}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - score / 100)}
              transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            />
          )}
        </svg>
        <span className={s.value} aria-hidden="true">
          {score === null ? "—" : score}
        </span>
      </div>
      <figcaption className={s.label}>{name.toUpperCase()}</figcaption>
    </figure>
  );
}
