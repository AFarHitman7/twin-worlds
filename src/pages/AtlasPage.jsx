import { useState } from "react";
import { cx } from "../lib/cx.js";
import Globe from "../components/atlas/Globe.jsx";
import { SITES } from "../data/atlas.js";
import s from "./Page.module.css";
import atlas from "./AtlasPage.module.css";

export default function AtlasPage() {
  // Task 4 replaces this page wholesale; the local state is only here to prove
  // the globe's prop contract on the live route.
  const [selected, setSelected] = useState(null);

  return (
    <main id="main" className={s.page}>
      <section className={cx("section", s.head)}>
        <div className="section__head">
          <p className="eyebrow">PLANETARY ANALOGUE ATLAS</p>
          <h1 className="section__title">The atlas</h1>
          <p className="section__lede">
            Eighteen analogue sites, pinned where they actually sit. Drag the globe to
            turn it; select a pin and the site turns to face you.
          </p>
        </div>
        <div className={atlas.globe}>
          <Globe
            sites={SITES}
            selected={selected}
            onSelect={setSelected}
            filter="all"
          />
        </div>
      </section>
    </main>
  );
}
