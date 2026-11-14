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
            An interactive globe is being installed here: analogue sites as pins, filtered by
            world, each with its dossier and the caveats attached.
          </p>
          <p className={s.note}>The globe lands here next; this page is the shell for it.</p>
        </div>
      </section>
    </main>
  );
}
