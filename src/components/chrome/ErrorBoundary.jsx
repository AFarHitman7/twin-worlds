import { Component } from "react";
import s from "./ErrorBoundary.module.css";

/**
 * Keeps the shell alive when a page throws. The nav and footer stay mounted, so
 * the fallback sits where the page would and still offers both ways onward. The
 * app remounts this boundary per route, so the next navigation clears the error
 * even when the failing component never recovers.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    // The console keeps the trace for a developer; the page stays calm.
    console.error("Page render failed", error, info?.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <main id="main" className={s.fallback}>
        <section className="section" aria-labelledby="error-title">
          <p className="kicker">PAGE FAULT</p>
          <h1 className="section__title" id="error-title">
            This page could not load
          </h1>
          <p className={s.text}>
            Something failed while the page was rendering. The rest of the site is
            still here, and the atlas and the signal test are unaffected.
          </p>
          <nav className={s.links} aria-label="Recovery">
            <a className={s.link} href="#/atlas">
              Back to the atlas
            </a>
            <a className={s.link} href="#/">
              Home
            </a>
          </nav>
        </section>
      </main>
    );
  }
}
