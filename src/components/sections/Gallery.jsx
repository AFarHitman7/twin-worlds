import { useCallback, useEffect, useRef, useState } from "react";
import { FILTERS, GALLERY } from "../../data/gallery.js";
import { useReducedMotion } from "../../hooks/useMediaQuery.js";
import { useMagnetic } from "../../hooks/useMotion.js";
import { cx } from "../../lib/cx.js";
import Lightbox from "../chrome/Lightbox.jsx";
import Ghost from "../ui/Ghost.jsx";
import Reveal from "../ui/Reveal.jsx";
import SectionHead from "../ui/SectionHead.jsx";
import s from "./Gallery.module.css";

function FilterButton({ filterKey, active, onClick, children }) {
  const reduced = useReducedMotion();
  const magnetic = useMagnetic(!reduced);

  return (
    <button
      className={cx(s.filter, active && s.isActive)}
      type="button"
      data-filter={filterKey}
      onClick={onClick}
      {...magnetic}
    >
      {children}
    </button>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);
  const reduced = useReducedMotion();
  const itemRefs = useRef([]);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (reduced) return;
    itemRefs.current.forEach((node) => {
      if (!node || node.hidden) return;
      node.animate(
        [
          { opacity: 0, transform: "scale(0.94) rotate(0.5deg)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 380, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" }
      );
    });
  }, [filter, reduced]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section className="section" id="gallery">
      <Ghost>07</Ghost>
      <SectionHead
        kicker="FIELD NOTES · 07 — SIGNAL ARCHIVE"
        title={
          <>
            Field <span className="grad grad--ice">notes.</span>
          </>
        }
        lede="A few frames from the three worlds. Filter by world, then click any to look closer."
      />

      <Reveal className={s.filters} role="group" aria-label="Filter gallery by world">
        {FILTERS.map((item) => (
          <FilterButton
            key={item.key}
            filterKey={item.key}
            active={filter === item.key}
            onClick={() => setFilter(item.key)}
          >
            {item.label}
          </FilterButton>
        ))}
      </Reveal>

      <div className={s.grid} id="galleryGrid">
        {GALLERY.map((item, i) => {
          const match = filter === "all" || item.cat === filter;
          return (
            <Reveal
              as="figure"
              key={item.src + i}
              nodeRef={(node) => {
                itemRefs.current[i] = node;
              }}
              className={cx(s.item, item.span === "wide" && s.wide, item.span === "tall" && s.tall)}
              data-caption={item.caption}
              data-cursor=""
              hidden={!match}
              onClick={() => setLightbox(item)}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
            </Reveal>
          );
        })}
      </div>

      <Lightbox item={lightbox} onClose={closeLightbox} />
    </section>
  );
}
