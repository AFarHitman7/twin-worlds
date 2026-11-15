import { useEffect, useRef, useState } from "react";

// A section takes the marker once its top has crossed this line, measured
// down from the top of the viewport. Six tenths of the screen keeps the hero
// clear while a section that has just filled the screen is still reported.
const BAND = 0.6;

/**
 * Highlights the section the reader is in. A section is the last one whose
 * top has crossed the band, six tenths of the way down the viewport, and
 * whose bottom is still on screen; above the first section, and below the
 * last, nothing is active.
 * The check runs on every scroll, so a section is named even when no
 * IntersectionObserver entry fires. The public signature is unchanged: it
 * takes section ids and returns the active id, or an empty string for none.
 */
export function useScrollSpy(ids) {
  const [active, setActive] = useState("");
  const activeRef = useRef("");

  const commit = (next) => {
    if (activeRef.current === next) return;
    activeRef.current = next;
    setActive(next);
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) {
      commit("");
      return undefined;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * BAND;
      let next = "";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // Sections are in document order: once one starts below the line,
        // none after it can be the reader's section.
        if (rect.top > line) break;
        // Fully scrolled past: below the last section, nothing is active.
        if (rect.bottom < 0) continue;
        next = section.id;
      }
      commit(next);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    // Images and fonts settle after mount and move the anchors; observing the
    // sections catches that without polling on every frame.
    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    sections.forEach((section) => observer?.observe(section));

    measure();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}
