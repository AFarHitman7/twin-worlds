import { cx } from "../lib/cx.js";
import s from "./Page.module.css";

export default function AtlasPage() {
  return (
    <main id="main" className={s.page}>
      <section className={cx("section", s.head)}>
        <div className="section__head">
          <p className="eyebrow">PLANETARY ANALOGUE ATLAS</p>
          <h1 className="section__title">The atlas</h1>
          <p className="section__lede">
            Every analogue site in one place — from the Atacama to Haughton — with the science and
            the caveats pinned to each place.
          </p>
          <p className={s.note}>The interactive globe lands here next: one pin per site.</p>
        </div>
      </section>
    </main>
  );
}
