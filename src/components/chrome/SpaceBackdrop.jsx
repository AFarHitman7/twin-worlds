import { useLayoutEffect } from "react";
import s from "./SpaceBackdrop.module.css";

/*
  The sky has two jobs. In the hero it has to be legible at a glance, because
  the starfield is decoration a low-vision reader should still perceive. Every-
  where else it drops back to a texture that stays out of the copy's way.

  One custom property, --sky (0.2 … 1), drives the stars, the nebula wash, the
  dust clouds and the chart grid. The landing page owns the bright end for its
  first screen; every other route and every scroll past the hero gets the dim
  end.
*/
const HERO_SKY = 1;
const REST_SKY = 0.2;

export default function SpaceBackdrop({ route = "/" }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    if (route !== "/") {
      root.style.setProperty("--sky", String(REST_SKY));
      return () => root.style.removeProperty("--sky");
    }

    const apply = () => {
      frame = 0;
      const view = window.innerHeight || 800;
      // Full brightness holds through most of the hero, then falls away quickly
      // before the next section arrives: nothing below the first screen should
      // compete with the copy.
      const faded = (window.scrollY - view * 0.45) / (view * 0.55);
      const t = Math.max(0, Math.min(1, faded));
      root.style.setProperty("--sky", String(HERO_SKY - (HERO_SKY - REST_SKY) * t));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.style.removeProperty("--sky");
    };
  }, [route]);

  return (
    <>
      <div className={s.nebula} aria-hidden="true" />
      <div className={s.aurora} aria-hidden="true">
        <span className={s.a1} />
        <span className={s.a2} />
        <span className={s.a3} />
        <span className={s.a4} />
      </div>
      <div className={s.grid} aria-hidden="true" />
      <div className={s.noise} aria-hidden="true" />
      <div className={s.vignette} aria-hidden="true" />
      <div className={s.scanlines} aria-hidden="true" />
    </>
  );
}
