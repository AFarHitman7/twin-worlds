import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery.js";
import s from "./Starfield.module.css";

const PALETTE = ["#e8edf5", "#cfe0f5", "#f4e3c2", "#d9d4e8", "#ffffff"];

export default function Starfield() {
  const canvasRef = useRef(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars = [];
    let rafId = 0;
    let pointerX = 0;
    let pointerY = 0;
    let easedX = 0;
    let easedY = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let warp = 1;
    let warpTarget = 1;
    let lastScroll = window.scrollY;

    const buildStars = () => {
      const area = width * height;
      const count = Math.min(420, Math.floor(area / 4200));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.3,
        base: Math.random() * 0.6 + 0.25,
        tw: Math.random() * 2 + 0.4,
        phase: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.85 + 0.15,
        speed: Math.random() * 8 + 2,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        streak: Math.random() < 0.18,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        ctx.globalAlpha = star.base;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const draw = (time) => {
      const t = time / 1000;
      warp += (warpTarget - warp) * 0.06;
      warpTarget += (1 - warpTarget) * 0.02;
      easedX += (pointerX - easedX) * 0.04;
      easedY += (pointerY - easedY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        const fall = t * star.speed * star.depth * warp;
        const y = (star.y + fall * 4) % height;
        const px = star.x + easedX * 40 * star.depth;
        const py = y + easedY * 22 * star.depth;
        const alpha = Math.max(0.05, star.base * (0.62 + 0.38 * Math.sin(t * star.tw + star.phase)));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        if (star.streak && warp > 1.6) {
          const len = Math.min(60, (warp - 1) * 14 * star.depth);
          ctx.fillRect(px, py, star.r * 0.7, len);
        } else {
          ctx.beginPath();
          ctx.arc(px, py, star.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(rafId);
      resize();
      if (reduced) {
        drawStatic();
        return;
      }
      rafId = requestAnimationFrame(draw);
    };

    const onResize = () => start();

    let scrollTick = false;
    const onScroll = () => {
      if (scrollTick) return;
      scrollTick = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const v = Math.abs(y - lastScroll);
        lastScroll = y;
        if (v > 4) warpTarget = Math.min(7, 1 + v / 22);
        scrollTick = false;
      });
    };

    const onPointer = (e) => {
      pointerX = e.clientX / window.innerWidth - 0.5;
      pointerY = e.clientY / window.innerHeight - 0.5;
    };

    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (fine) window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [fine, reduced]);

  return <canvas ref={canvasRef} className={s.stars} aria-hidden="true" />;
}
