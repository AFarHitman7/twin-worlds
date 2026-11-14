import { TICKER } from "../../data/nav.js";
import s from "./Ticker.module.css";

export default function Ticker() {
  return (
    <div className={s.ticker} aria-hidden="true">
      <div className={s.track}>
        <span>{TICKER}</span>
        <span>{TICKER}</span>
      </div>
    </div>
  );
}
