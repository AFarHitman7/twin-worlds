import { useCallback, useEffect, useRef, useState } from "react";

export function useCountUp(target, active, duration = 1400, reduceMotion = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduceMotion]);

  return value;
}

export function useMagnetic(enabled) {
  const onPointerMove = useCallback(
    (e) => {
      if (!enabled) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px) scale(1.03)`;
    },
    [enabled]
  );

  const onPointerLeave = useCallback((e) => {
    e.currentTarget.style.transform = "";
  }, []);

  return enabled ? { onPointerMove, onPointerLeave } : {};
}

export function useTilt(enabled) {
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onPointerMove = useCallback(
    (e) => {
      if (!enabled) return;
      const card = e.currentTarget;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-5px)`;
      });
    },
    [enabled]
  );

  const onPointerLeave = useCallback((e) => {
    cancelAnimationFrame(raf.current);
    e.currentTarget.style.transform = "";
  }, []);

  return enabled ? { onPointerMove, onPointerLeave } : {};
}
