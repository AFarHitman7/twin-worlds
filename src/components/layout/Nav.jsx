import { useState } from "react";
import { NAV_LINKS } from "../../data/nav.js";
import { useScrollThreshold } from "../../hooks/useScroll.js";
import { useScrollSpy } from "../../hooks/useScrollSpy.js";
import { cx } from "../../lib/cx.js";
import Button from "../ui/Button.jsx";
import s from "./Nav.module.css";

const SPY_IDS = NAV_LINKS.map((link) => link.id);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollThreshold(24);
  const active = useScrollSpy(SPY_IDS);

  const close = () => setOpen(false);

  return (
    <header className={cx(s.nav, scrolled && s.isScrolled, open && s.isOpen)}>
      <a className={s.brand} href="#top" aria-label="Twin Worlds, back to top" onClick={close}>
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
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={active === link.id ? s.isActive : undefined}
            onClick={close}
          >
            <em>{link.num}</em>
            {link.label}
          </a>
        ))}
      </nav>

      <Button variant="ghost" href="#game" magnetic className={s.cta} onClick={close}>
        Play ↗
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
