import { useCallback, useEffect, useRef, useState } from "react";
import s from "./Loader.module.css";

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setDone(true);
    onDone();
  }, [onDone]);

  useEffect(() => {
    let progress = 0;
    let handoff = 0;
    let interval = 0;

    interval = window.setInterval(() => {
      progress = Math.min(100, progress + Math.random() * 22 + 6);
      setPct(progress);
      if (progress >= 100) {
        window.clearInterval(interval);
        handoff = window.setTimeout(finish, 350);
      }
    }, 140);

    // Safety: never trap the user behind the loader
    const safety = window.setTimeout(finish, 3500);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(handoff);
      window.clearTimeout(safety);
    };
  }, [finish]);

  return (
    <div className={`${s.loader}${done ? ` ${s.isDone}` : ""}`} aria-hidden="true">
      <div className={s.core}>
        <div className={s.rings}>
          <span />
          <span />
          <span />
        </div>
        <div className={s.word}>TWIN&nbsp;WORLDS</div>
        <div className={s.bar}>
          <span style={{ width: `${pct}%` }} />
        </div>
        <div className={s.pct}>{String(Math.floor(pct)).padStart(2, "0")}%</div>
      </div>
    </div>
  );
}
