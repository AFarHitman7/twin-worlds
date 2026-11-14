import { useEffect } from "react";
import { PLACEHOLDER } from "../../lib/fx.js";
import s from "./Lightbox.module.css";

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  return (
    <div
      className={s.lightbox}
      hidden={!item}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className={s.close} type="button" aria-label="Close" onClick={onClose}>
        ×
      </button>
      <img className={s.img} src={item ? item.src : PLACEHOLDER} alt={item ? item.alt : ""} />
      <p className={s.caption}>{item ? item.caption : ""}</p>
    </div>
  );
}
