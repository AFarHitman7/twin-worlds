import { MARS_ALSO, MARS_SITES } from "../../data/sites.js";
import Ghost from "../ui/Ghost.jsx";
import Pills from "../ui/Pills.jsx";
import SectionHead from "../ui/SectionHead.jsx";
import SiteCard from "../ui/SiteCard.jsx";
import s from "./Mars.module.css";

export default function Mars() {
  return (
    <section className="section" id="mars">
      <Ghost>03</Ghost>
      <SectionHead
        kicker="RED ZONE · 03 — MARS ON EARTH"
        kickerClass="kicker--mars"
        title={
          <>
            Mars, <span className="grad grad--fire">already on Earth.</span>
          </>
        }
        lede="Six places where the ground, the chemistry or the isolation rehearses the Red Planet."
      />

      <div className={s.grid}>
        {MARS_SITES.map((site, i) => (
          <SiteCard
            site={site}
            planet="mars"
            delay={i * 80}
            href={"#/atlas/" + site.slug}
            key={site.title}
          />
        ))}
      </div>

      <Pills items={MARS_ALSO} />
    </section>
  );
}
