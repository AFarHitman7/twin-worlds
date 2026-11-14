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
      if (!window.location.hash.startsWith("#/")) return;
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

export function useScrollToTop(route) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    // A deep link to a section (e.g. #worlds) keeps the browser's own jump.
    if (hash && !hash.startsWith("#/") && hash !== "#top") {
      if (document.getElementById(hash.slice(1))) return;
    }

    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [route]);
}
