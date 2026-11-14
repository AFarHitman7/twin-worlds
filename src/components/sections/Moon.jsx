import { MOON_ALSO, MOON_SITES } from "../../data/sites.js";
import { cx } from "../../lib/cx.js";
import Ghost from "../ui/Ghost.jsx";
import Pills from "../ui/Pills.jsx";
import SectionHead from "../ui/SectionHead.jsx";
import SiteCard from "../ui/SiteCard.jsx";
import s from "./Moon.module.css";

export default function Moon() {
  return (
    <section className={cx("section", s.analogsStrip)} id="moon">
      <Ghost>04</Ghost>
      <SectionHead
        kicker="GREY ZONE · 04 — MOON ON EARTH"
        kickerClass="kicker--moon"
        className={s.stripHead}
        title={
          <>
            Moon, <span className="grad grad--moon">rehearsed on Earth.</span>
          </>
        }
        lede={
          <>
            Grey lava, cinder and impact craters, the ground astronauts walked before they ever
            left orbit. <span className="drag-hint">⟵ drag sideways ⟶</span>
          </>
        }
      />

      <div className={s.strip} tabIndex={0} aria-label="Moon analogue locations, scroll sideways">
        {MOON_SITES.map((site) => (
          <SiteCard
            site={site}
            planet="moon"
            className={s.stripCard}
            href={"#/atlas/" + site.slug}
            key={site.title}
          />
        ))}
      </div>

      <Pills items={MOON_ALSO} className={s.stripPills} />
    </section>
  );
}
