import { PAGES } from "../../data/nav.js";
import s from "./Footer.module.css";

export default function Footer({ route = "/" }) {
  const onLanding = route === "/";

  return (
    <footer className={s.footer}>
      <div className={s.giant} aria-hidden="true">
        TWIN&nbsp;WORLDS
      </div>
      <div className={s.brand}>TWIN&nbsp;WORLDS ✦ EARTH · MARS · MOON</div>
      <p className={s.note}>
        Earth’s Mars and Moon analogues, with the science and the caveats attached.
      </p>
      <nav className={s.pages} aria-label="Pages">
        {PAGES.map((page) => (
          <a
            key={page.path}
            href={`#${page.path}`}
            aria-current={page.path === route ? "page" : undefined}
          >
            {page.label}
          </a>
        ))}
      </nav>
      <p className={s.fine}>
        Built for students, the curious and space enthusiasts · signal ends ·{" "}
        <a href={onLanding ? "#top" : "#/"}>back to orbit ↑</a>
      </p>
    </footer>
  );
}
