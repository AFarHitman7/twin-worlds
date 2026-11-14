import { useEffect, useState } from "react";

/*
 * One IntersectionObserver per (threshold, rootMargin, once) combination,
 * shared by every element that asks for it — the same way the original
 * page observed all reveal targets with a single observer.
 */
const observers = new Map();

function observe(el, { threshold, rootMargin, once }, onChange) {
  const key = `${threshold}|${rootMargin}|${once}`;
  let entry = observers.get(key);

  if (!entry) {
    const callbacks = new WeakMap();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entryItem) => {
          const callback = callbacks.get(entryItem.target);
          if (!callback) return;
          if (entryItem.isIntersecting) {
            callback(true);
            if (once) io.unobserve(entryItem.target);
          } else if (!once) {
            callback(false);
          }
        });
      },
      { threshold, rootMargin }
    );
    entry = { io, callbacks };
    observers.set(key, entry);
  }

  entry.callbacks.set(el, onChange);
  entry.io.observe(el);

  return () => {
    entry.callbacks.delete(el);
    entry.io.unobserve(el);
  };
}

export function useInView(ref, { threshold = 0.14, rootMargin = "0px 0px -8% 0px", once = true } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    return observe(el, { threshold, rootMargin, once }, setInView);
  }, [ref, threshold, rootMargin, once]);

  return inView;
}
