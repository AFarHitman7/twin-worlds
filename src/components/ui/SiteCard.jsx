import { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery.js";
import { useTilt } from "../../hooks/useMotion.js";
import { cx } from "../../lib/cx.js";
import Reveal from "./Reveal.jsx";
import s from "./SiteCard.module.css";

export default function SiteCard({ site, planet, delay = 0, className, href }) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const tilt = useTilt(fine && !reduced);

  const card = (
    <Reveal
      as="article"
      className={cx("tilt", s.card, className)}
      data-planet={planet}
      delay={delay}
      {...tilt}
    >
      <div className="card-shine" aria-hidden="true" />
      <div className={s.media}>
        <img src={site.img} alt={site.alt} loading="lazy" />
        <span className={s.planet}>
          {planet === "mars" ? "◉ Mars analogue" : "◐ Moon analogue"}
        </span>
        <span className={s.coord}>{site.coord}</span>
      </div>
      <div className={s.body}>
        <div className={s.meta}>
          <span className={s.country}>{site.country}</span>
          <span className={s.type}>{site.type}</span>
        </div>
        <h3 className={s.title}>{site.title}</h3>
        <p className={s.text}>{site.text}</p>
        <p className={s.reality}>
          <b>Reality check</b> {site.reality}
        </p>
        <p className={s.source}>{site.source}</p>
        {href ? <span className={s.open}>Open dossier →</span> : null}
      </div>
    </Reveal>
  );

  if (!href) return card;

  return (
    <a className={s.link} href={href} aria-label={`Open dossier for ${site.title}`}>
      {card}
    </a>
  );
}
