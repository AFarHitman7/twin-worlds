import { useEffect, useRef, useState } from "react";

/**
 * Highlights the section the reader is in. The observer band is a thin strip
 * below the page's middle; the scroll check clears the highlight when the
 * reader is above the first section, or when the section has left the page
 * altogether (below the last one). The public signature is unchanged: it takes
 * section ids and returns the active id, or an empty string for none.
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
    if (typeof IntersectionObserver === "undefined") return undefined;

    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) {
      commit("");
      return undefined;
    }

    const first = sections[0];
    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter((entry) => entry.isIntersecting);
        if (entering.length) {
          commit(entering[entering.length - 1].target.id);
          return;
        }
        // Nothing in the band: only clear if the highlighted section itself
        // has gone, so a section that merely loses the band to its neighbour
        // does not blank the marker for a frame.
        if (entries.some((entry) => entry.target.id === activeRef.current)) {
          commit("");
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));

    let frame = 0;
    const check = () => {
      frame = 0;
      const band = window.innerHeight * 0.4;
      // Above the first observed section there is no section to name.
      if (first.getBoundingClientRect().top > band) {
        commit("");
        return;
      }
      const current = activeRef.current
        ? document.getElementById(activeRef.current)
        : null;
      if (!current) return;
      const rect = current.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) commit("");
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}
