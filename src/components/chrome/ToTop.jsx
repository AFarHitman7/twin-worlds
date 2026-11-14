import { useReducedMotion } from "../../hooks/useMediaQuery.js";
import { useScrollThreshold } from "../../hooks/useScroll.js";
import s from "./ToTop.module.css";

export default function ToTop() {
  const shown = useScrollThreshold(700);
  const reduced = useReducedMotion();

  return (
    <button
      className={`${s.toTop}${shown ? ` ${s.isShow}` : ""}`}
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
    >
      ↑
    </button>
  );
}
