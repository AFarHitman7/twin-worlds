import { useEffect, useState } from "react";

const HOME = { route: "/", slug: "" };

/**
 * Reads the current route from the hash. Only hashes that start with "#/" are
 * routes; anything else (or an empty hash) is the landing page.
 */
function readRoute() {
  if (typeof window === "undefined") return HOME;

  const hash = window.location.hash;
  if (!hash.startsWith("#/")) return HOME;

  const segments = hash.slice(2).split("/").filter(Boolean);
  const [root, slug = ""] = segments;

  if (root === "atlas") return { route: "/atlas", slug };
  if (root === "game" && !slug) return { route: "/game", slug: "" };
  return HOME;
}

export function useRoute() {
  const [current, setCurrent] = useState(readRoute);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash && !hash.startsWith("#/")) {
        // A section anchor belongs to whichever page owns that element: #sites
        // is the atlas's own, #worlds is the landing's. A hash this document
        // can resolve keeps the current route and lets the browser scroll; one
        // it cannot is a way back home, scrolled after that page renders.
        if (document.getElementById(hash.slice(1))) return;
        setCurrent((previous) => (previous.route === "/" ? previous : HOME));
        return;
      }
      setCurrent(readRoute());
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // A section hash has to be honoured by the landing page itself: a direct
  // load arrives before the section exists, and a return from the atlas or the
  // game renders the page first, so the element only exists after this commit.
  useEffect(() => {
    if (current.route !== "/") return undefined;

    const hash = window.location.hash;
    if (!hash || hash.startsWith("#/") || hash === "#top") return undefined;

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1));
      if (!target) {
        // A section that belongs to another page: land at the top instead.
        scrollToTop();
        return;
      }
      // scrollIntoView honours the section's scroll-margin, so the fixed nav
      // does not cover the heading. "instant" is recent; older engines fall
      // back to the default behaviour, as scrollToTop does.
      try {
        target.scrollIntoView({ block: "start", behavior: "instant" });
      } catch {
        target.scrollIntoView({ block: "start" });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [current]);

  return current;
}

/** Replace the current history entry instead of adding one. */
export function replaceRoute(path) {
  if (typeof window === "undefined") return;
  window.history.replaceState(null, "", `#${path}`);
}

export function scrollToTop() {
  if (typeof window === "undefined") return;
  try {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  } catch {
    window.scrollTo(0, 0);
  }
}

/** True when the hash points at a section on the page rather than a route. */
function isSectionHash(hash) {
  if (!hash || hash.startsWith("#/") || hash === "#top") return false;
  return Boolean(document.getElementById(hash.slice(1)));
}

export function useScrollToTop(route) {
  useEffect(() => {
    // A deep link to a section (e.g. #worlds) keeps the browser's own jump.
    if (isSectionHash(window.location.hash)) return;
    scrollToTop();
  }, [route]);

  useEffect(() => {
    const onHashChange = () => {
      // "Home" (#/) clicked while already home: the route does not change, but
      // the page must still return to the top. Other hashes are anchors or
      // routes, handled by the browser or by the effect above.
      if (window.location.hash === "#/") scrollToTop();
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
}
