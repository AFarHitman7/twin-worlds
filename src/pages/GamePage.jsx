import Game from "../components/sections/Game.jsx";
import { cx } from "../lib/cx.js";
import s from "./Page.module.css";

export default function GamePage() {
  return (
    <main id="main" className={s.page}>
      <section className={cx("section", s.head)}>
        <div className="section__head">
          <p className="eyebrow">TRAINING SIMULATION</p>
          <h1 className="section__title">Signal test</h1>
          <p className="section__lede">
            Twelve frames, three worlds. Call the planet, then read what the terrain is telling you.
          </p>
        </div>
      </section>
      <Game />
    </main>
  );
}
