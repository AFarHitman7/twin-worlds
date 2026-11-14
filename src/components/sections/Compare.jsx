import { useRef, useState } from "react";
import { COMPARISONS } from "../../data/comparisons.js";
import { cx } from "../../lib/cx.js";
import Ghost from "../ui/Ghost.jsx";
import Reveal from "../ui/Reveal.jsx";
import SectionHead from "../ui/SectionHead.jsx";
import s from "./Compare.module.css";

function CompareItem({ item }) {
  const [pos, setPos] = useState(50);
  const frameRef = useRef(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  const onPointerDown = (e) => {
    dragging.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* pointer capture is best-effort */
    }
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };

  const endDrag = (e) => {
    if (!dragging.current) return;
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const onKeyDown = (e) => {
    let next = pos;
    if (e.key === "ArrowLeft") next = pos - 5;
    else if (e.key === "ArrowRight") next = pos + 5;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 100;
    else return;
    e.preventDefault();
    setPos(Math.max(0, Math.min(100, next)));
  };

  return (
    <div className={s.item}>
      <Reveal
        nodeRef={frameRef}
        className={s.frame}
        data-compare=""
        data-cursor=""
        style={{ "--pos": `${pos}%` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <img
          className={s.img}
          src={item.after.src}
          alt={item.after.alt}
          loading="lazy"
          draggable="false"
        />
        <div className={s.before}>
          <img
            className={s.img}
            src={item.before.src}
            alt={item.before.alt}
            loading="lazy"
            draggable="false"
          />
          <span className={cx(s.label, s.labelA)}>{item.before.label}</span>
        </div>
        <span className={cx(s.label, s.labelB)}>{item.labelB}</span>
        <button
          className={s.handle}
          type="button"
          role="slider"
          aria-label={item.aria}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(pos)}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
        >
          <span className={s.grip} aria-hidden="true" />
        </button>
      </Reveal>
      <p className={s.caption}>
        {item.caption} <span>{item.captionNote}</span>
      </p>
    </div>
  );
}

export default function Compare() {
  return (
    <section className="section" id="compare">
      <Ghost>05</Ghost>
      <SectionHead
        kicker="TWIN SCANNER · 05 — DRAG TO SEE THE TWIN"
        title={
          <>
            Drag to see <span className="grad grad--hyper">the twin.</span>
          </>
        }
        lede="Slide between an Earth landscape and the world it stands in for. Same dust, different planet."
      />

      <div className={s.list}>
        {COMPARISONS.map((item, i) => (
          <CompareItem item={item} key={i} />
        ))}
      </div>
    </section>
  );
}
