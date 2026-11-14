import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery.js";
import s from "./StardustTrail.module.css";

const COLORS = ["#f4e3c2", "#cfe0f5", "#e8b07e", "#d9d4e8", "#ffffff"];

export default function StardustTrail() {
  const canvasRef = useRef(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    const trail = canvasRef.current;
    if (!trail || !fine || reduced) return;
    const tctx = trail.getContext("2d");
    if (!tctx) return;

    let particles = [];
    let tw = 0;
    let th = 0;
    let tdpr = 1;
    let raf = 0;

    const sizeTrail = () => {
      tdpr = Math.min(window.devicePixelRatio || 1, 2);
      tw = window.innerWidth;
      th = window.innerHeight;
      trail.width = tw * tdpr;
      trail.height = th * tdpr;
      trail.style.width = tw + "px";
      trail.style.height = th + "px";
      tctx.setTransform(tdpr, 0, 0, tdpr, 0, 0);
    };

    let lastPX = 0;
    let lastPY = 0;
    const onMove = (e) => {
      const dx = e.clientX - lastPX;
      const dy = e.clientY - lastPY;
      const dist = Math.hypot(dx, dy);
      lastPX = e.clientX;
      lastPY = e.clientY;
      if (dist < 3 || particles.length > 220) return;
      particles.push({
        x: e.clientX,
        y: e.clientY,
        vx: -dx * 0.02 + (Math.random() - 0.5) * 1.2,
        vy: -dy * 0.02 + (Math.random() - 0.5) * 1.2,
        life: 1,
        decay: 0.02 + Math.random() * 0.03,
        r: Math.random() * 2.4 + 0.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    };

    const loop = () => {
      tctx.clearRect(0, 0, tw, th);
      tctx.globalCompositeOperation = "lighter";
      particles = particles.filter((p) => p.life > 0);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= p.decay;
        tctx.globalAlpha = Math.max(0, p.life) * 0.9;
        tctx.fillStyle = p.color;
        tctx.shadowBlur = 14;
        tctx.shadowColor = p.color;
        tctx.beginPath();
        tctx.arc(p.x, p.y, p.r * p.life + 0.4, 0, Math.PI * 2);
        tctx.fill();
      }
      tctx.shadowBlur = 0;
      tctx.globalAlpha = 1;
      tctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(loop);
    };

    sizeTrail();
    window.addEventListener("resize", sizeTrail);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", sizeTrail);
      window.removeEventListener("pointermove", onMove);
    };
  }, [fine, reduced]);

  return <canvas ref={canvasRef} className={s.trail} aria-hidden="true" />;
}
