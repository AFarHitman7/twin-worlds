import { Fragment, useEffect, useState } from "react";
import { NAV_LINKS, PAGES } from "../../data/nav.js";
import { useScrollThreshold } from "../../hooks/useScroll.js";
import { useScrollSpy } from "../../hooks/useScrollSpy.js";
import { cx } from "../../lib/cx.js";
import { scrollToTop } from "../../router/useRoute.js";
import Button from "../ui/Button.jsx";
import s from "./Nav.module.css";

const LANDING_IDS = NAV_LINKS.map((link) => link.id);
const NO_IDS = [];
const CTA = {
  "/": { href: "#/game", label: "Play ↗" },
  "/atlas": { href: "#/game", label: "Play ↗" },
  "/game": { href: "#/atlas", label: "Atlas ↗" },
};

export default function Nav({ route = "/" }) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollThreshold(24);
  const onLanding = route === "/";
  const active = useScrollSpy(onLanding ? LANDING_IDS : NO_IDS);
  const cta = CTA[route] ?? CTA["/"];

  // A route change is always a new page: close the mobile menu.
  useEffect(() => setOpen(false), [route]);

  const close = () => setOpen(false);

  // Clicking the page you are already on is a request for its top.
  const follow = (path) => () => {
    close();
    if (path === route) scrollToTop();
  };

  // Desktop shows the pages around the current one, with the current page as a
  // label; the menu lists every page. On the landing page only Atlas rides in
  // the bar, since the CTA already covers the game.
  const pageLinks = PAGES.map((page) => {
    const current = page.path === route;
    const mobileOnly = onLanding ? page.path !== "/atlas" : current;
    const label = onLanding && page.path === "/atlas" ? "Atlas ↗" : page.label;

    return { ...page, current, mobileOnly, label };
  });

  return (
    <header className={cx(s.nav, scrolled && s.isScrolled, open && s.isOpen)}>
      <a
        className={s.brand}
        href={onLanding ? "#top" : "#/"}
        aria-label={onLanding ? "Twin Worlds, back to top" : "Twin Worlds, home"}
        onClick={close}
      >
        <span className={s.mark} aria-hidden="true">
          <span className={s.orbit} />
        </span>
        <span className={s.name}>TWIN&nbsp;WORLDS</span>
        <span className={s.live}>
          <i />
          LIVE&nbsp;ORBIT
        </span>
      </a>

      <nav className={s.links} id="navLinks" aria-label="Primary">
        {pageLinks.map((page) => (
          <Fragment key={page.path}>
            {page.current && !onLanding ? (
              <span className={cx(s.currentLabel, s.desktopOnly)} aria-current="page">
                {page.label}
              </span>
            ) : null}
            <a
              href={`#${page.path}`}
              className={cx(page.mobileOnly && s.mobileOnly)}
              aria-current={page.current ? "page" : undefined}
              onClick={follow(page.path)}
            >
              {page.label}
            </a>
          </Fragment>
        ))}

        {onLanding
          ? NAV_LINKS.map((link) => (
              <a
                key={link.id}
                // The game is a page now, not a section on the landing page.
                href={link.id === "game" ? "#/game" : `#${link.id}`}
                className={cx(
                  active === link.id && s.isActive,
                  // The menu already has a Game page link above.
                  link.id === "game" && s.desktopOnly
                )}
                onClick={close}
              >
                <em>{link.num}</em>
                {link.label}
              </a>
            ))
          : null}
      </nav>

      <Button variant="ghost" href={cta.href} magnetic className={s.cta} onClick={close}>
        {cta.label}
      </Button>

      <button
        className={s.toggle}
        type="button"
        aria-expanded={open}
        aria-controls="navLinks"
        aria-label="Toggle menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
