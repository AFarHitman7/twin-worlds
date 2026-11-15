import { useEffect, useRef, useState } from "react";
import { cx } from "../../lib/cx.js";
import { pad2 } from "../../lib/format.js";
import s from "./ReconImage.module.css";

// A frame is drawn once into a 480x270 canvas and then shown larger. The
// browser smooths the upscale, and the grey comes from CSS on the canvas:
// nothing here ever reads the pixels back, so a cross-origin photo is fine.
const addRetry = (url, attempt) =>
  `${url}${url.includes("?") ? "&" : "?"}retry=${attempt}`;

export default function ReconImage({
  src,
  alt,
  width = 480,
  height = 270,
  frame,
  total,
  compact = false,
  className,
}) {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !src) return undefined;

    let cancelled = false;
    const image = new Image();

    const draw = () => {
      if (cancelled || !image.naturalWidth || !image.naturalHeight) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setStatus("error");
        return;
      }

      // Cover-fit: scale until both sides are filled, then centre the crop.
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight
      );
      setStatus("ready");
    };

    const fail = () => {
      if (!cancelled) setStatus("error");
    };

    setStatus("loading");
    image.onload = draw;
    image.onerror = fail;
    image.src = attempt > 0 ? addRetry(src, attempt) : src;

    // decode() gets the bitmap ready before the draw; the load handler is the
    // fallback for browsers without it, and both paths end in the same draw.
    if (typeof image.decode === "function") {
      image.decode().then(draw, () => {
        // A failed decode still reports through onerror; an aborted one does not.
      });
    }

    return () => {
      cancelled = true;
      image.onload = null;
      image.onerror = null;
    };
  }, [src, attempt, width, height]);

  // The canvas can outlive the image by one paint while React detaches it.
  useEffect(() => {
    const canvas = canvasRef.current;
    return () => {
      const ctx = canvas ? canvas.getContext("2d") : null;
      if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  const label =
    status === "error"
      ? "Frame failed to load"
      : alt || `Reconnaissance frame ${frame ?? 1}${total ? ` of ${total}` : ""}`;

  return (
    <div
      className={cx(s.frame, compact && s.isCompact, className)}
      data-state={status}
      data-live={compact ? undefined : "true"}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div className={s.media} role="img" aria-label={label}>
        <canvas
          ref={canvasRef}
          className={s.canvas}
          width={width}
          height={height}
          aria-hidden="true"
        />
      </div>

      {compact ? null : (
        <>
          <span className={cx(s.corner, s.tl)} aria-hidden="true" />
          <span className={cx(s.corner, s.tr)} aria-hidden="true" />
          <span className={cx(s.corner, s.bl)} aria-hidden="true" />
          <span className={cx(s.corner, s.br)} aria-hidden="true" />

          <span className={s.chrome} data-corner="tl" aria-hidden="true">
            {frame ? `Frame ${pad2(frame)}` : "Frame"}
          </span>
          <span className={s.chrome} data-corner="tr" aria-hidden="true">
            {width}×{height} · 8-bit grey
          </span>
          <span className={s.scan} aria-hidden="true" />
          <span className={s.rec} aria-hidden="true">
            ● Rec
          </span>
        </>
      )}

      {status === "loading" && !compact ? (
        <span className={s.acquiring} aria-hidden="true">
          Acquiring frame
        </span>
      ) : null}

      {status === "error" ? (
        <div className={s.lost}>
          <span className={s.lostTitle} role="status">
            Frame lost
          </span>
          <button
            type="button"
            className={s.retry}
            onClick={() => setAttempt((value) => value + 1)}
          >
            Retry
          </button>
        </div>
      ) : null}
    </div>
  );
}
