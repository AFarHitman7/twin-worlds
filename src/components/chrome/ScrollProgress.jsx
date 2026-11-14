import { useRef } from "react";
import { useScrollProgress } from "../../hooks/useScroll.js";
import s from "./ScrollProgress.module.css";

export default function ScrollProgress() {
  const barRef = useRef(null);
  useScrollProgress(barRef);

  return (
    <div className={s.progress} aria-hidden="true">
      <span ref={barRef} className={s.bar} />
    </div>
  );
}
