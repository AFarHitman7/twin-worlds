import { useEffect, useState } from "react";
import { NAV_LINKS, PAGES } from "../../data/nav.js";
import { useScrollThreshold } from "../../hooks/useScroll.js";
import { useScrollSpy } from "../../hooks/useScrollSpy.js";
import { cx } from "../../lib/cx.js";
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

  // Desktop shows the links for the current page; the mobile menu lists every page.
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
          <a
            key={page.path}
            href={`#${page.path}`}
            className={cx(page.mobileOnly && s.mobileOnly)}
            aria-current={page.current ? "page" : undefined}
            onClick={close}
          >
            {page.label}
          </a>
        ))}

        {onLanding
          ? NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={active === link.id ? s.isActive : undefined}
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
