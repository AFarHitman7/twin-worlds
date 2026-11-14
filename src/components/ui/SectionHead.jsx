import Reveal from "./Reveal.jsx";
import { cx } from "../../lib/cx.js";

export default function SectionHead({ kicker, kickerClass, title, lede, className }) {
  return (
    <Reveal className={cx("section__head", className)}>
      <p className={cx("kicker", kickerClass)}>
        <span className="kicker__dot" />
        {kicker}
      </p>
      <h2 className="section__title">{title}</h2>
      {lede ? <p className="section__lede">{lede}</p> : null}
    </Reveal>
  );
}
