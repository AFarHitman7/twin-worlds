import { Fragment } from "react";
import { RUBRIC_PARTS } from "./rubric.js";

/**
 * The scoring scale, rendered from one list so the page legend and the
 * dossier's scoring note can never drift apart. Styling stays with the caller:
 * each place sets its own type size and alignment.
 */
export default function Rubric({ className }) {
  return (
    <p className={className}>
      <span>SCALE</span>{" "}
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
  );
}
