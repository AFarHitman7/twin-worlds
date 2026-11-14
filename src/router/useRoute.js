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
      // In-page anchors (#worlds, #game) are not routes: leave the page as is.
      // An empty hash is not an anchor either — it restores the landing page.
      const hash = window.location.hash;
      if (hash && !hash.startsWith("#/")) return;
      setCurrent(readRoute());
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return current;
}

export function navigate(path) {
  if (typeof window === "undefined") return;
  window.location.hash = path.startsWith("/") ? `#${path}` : `#/${path}`;
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
