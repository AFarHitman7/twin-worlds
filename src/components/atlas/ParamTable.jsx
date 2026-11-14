import { PARAMS } from "../../lib/similarity.js";
import { GRAVITY } from "./rubric.js";
import s from "./ParamTable.module.css";

function Bar({ body, value }) {
  return (
    <span className={s.bar}>
      <span className={s.bodyTag} aria-hidden="true">
        {body.toUpperCase()}
      </span>
      <span className={s.track} aria-hidden="true">
        <span className={s.fill} style={{ width: `${value}%` }} />
      </span>
      <span className={s.number}>{value}</span>
    </span>
  );
}

/**
 * The seven scored parameters for one site, read against the same rubric the
 * rings use. The note under each row is the substance: it says why the bar is
 * where it is. Gravity is shown last because it is never matched at all.
 */
export default function ParamTable({ site }) {
  return (
    <div className={s.wrap}>
      <div className={s.table} role="table" aria-label={`Scored parameters for ${site.name}`}>
        <div className={s.head} role="row">
          <span className={s.headCell} role="columnheader">
            Parameter
          </span>
          <span className={s.headCell} role="columnheader">
            Earth value
          </span>
          <span className={s.headCell} role="columnheader">
            Mars
          </span>
          <span className={s.headCell} role="columnheader">
            Moon
          </span>
        </div>
        <div role="rowgroup">
          {PARAMS.map((param) => {
            const entry = site.params[param.key];
            if (!entry) return null;
            return (
              <div className={s.row} role="row" key={param.key}>
                <span className={s.label} role="cell">
                  {param.label}
                </span>
                <span className={s.value} role="cell">
                  {entry.value}
                </span>
                <span className={s.barCell} data-body="mars" role="cell">
                  <Bar body="mars" value={entry.mars} />
                </span>
                <span className={s.barCell} data-body="moon" role="cell">
                  <Bar body="moon" value={entry.moon} />
                </span>
                <span className={s.note} role="cell" aria-colspan={4}>
                  {entry.note}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={s.gravity}>
        <div className={s.gravityTop}>
          <span className={s.gravityLabel}>Gravity</span>
          <span className={s.gravityValue}>{GRAVITY.earth}</span>
        </div>
        <p className={s.gravityBadge}>
          NEVER MATCHED — Mars {GRAVITY.mars} · Moon {GRAVITY.moon}
        </p>
      </div>
    </div>
  );
}
