import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery.js";
import s from "./Cursor.module.css";

const isInteractive = (el) =>
  el && el.closest && el.closest("a, button, [data-cursor]");

export default function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!fine || reduced) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onOver = (e) => {
      const target = isInteractive(e.target);
      if (target && !target.contains(e.relatedTarget)) ring.classList.add(s.isHover);
    };
    const onOut = (e) => {
      const target = isInteractive(e.target);
      if (target && !target.contains(e.relatedTarget)) ring.classList.remove(s.isHover);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, [fine, reduced]);

  return (
    <>
      <div ref={dotRef} className={s.dot} aria-hidden="true" />
      <div ref={ringRef} className={s.ring} aria-hidden="true" />
    </>
  );
}
