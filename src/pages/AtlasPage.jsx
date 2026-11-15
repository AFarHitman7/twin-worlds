import { useCallback, useEffect, useRef, useState } from "react";
import Globe from "../components/atlas/Globe.jsx";
import Rubric from "../components/atlas/Rubric.jsx";
import SiteDossier from "../components/atlas/SiteDossier.jsx";
import { BODY_LABEL, GRAVITY } from "../components/atlas/rubric.js";
import Sources from "../components/sections/Sources.jsx";
import { SITES } from "../data/atlas.js";
import { useMediaQuery, useReducedMotion } from "../hooks/useMediaQuery.js";
import { cx } from "../lib/cx.js";
import { BODIES, PARAMS, overallScore } from "../lib/similarity.js";
import { replaceRoute, useRoute } from "../router/useRoute.js";
import s from "./Page.module.css";
import atlas from "./AtlasPage.module.css";

const BODY_NAME = BODY_LABEL;

// The opening dossier is the strongest featured Mars analogue, not a name
// typed into the page: change the data and the default follows.
const FEATURED = SITES.filter((site) => site.featured);
const DEFAULT_SLUG =
  [...FEATURED]
    .sort(
      (a, b) =>
        (overallScore(b, "mars") ?? -1) - (overallScore(a, "mars") ?? -1) ||
        a.name.localeCompare(b.name)
    )[0]?.slug ?? SITES[0].slug;

const SITE_BY_SLUG = new Map(SITES.map((site) => [site.slug, site]));

const FILTERS = [
  { id: "all", label: "All" },
  { id: "mars", label: "Mars" },
  { id: "moon", label: "Moon" },
];

const COUNTS = {
  all: SITES.length,
  mars: SITES.filter((site) => site.targets.includes("mars")).length,
  moon: SITES.filter((site) => site.targets.includes("moon")).length,
};

/** Fixed order by composite score, then by name, for each destination. */
function rankBy(body) {
  return [...SITES].sort((a, b) => {
    const scoreA = overallScore(a, body) ?? -1;
    const scoreB = overallScore(b, body) ?? -1;
    return scoreB - scoreA || a.name.localeCompare(b.name);
  });
}

const RANKED = { mars: rankBy("mars"), moon: rankBy("moon") };

/** Keep a pressed chip and the selected site telling the same story. */
function followSite(site, current) {
  if (!site || current === "all" || site.targets.includes(current)) return current;
  return site.targets.includes("moon") ? "moon" : "mars";
}

function filterMessage(next) {
  if (next === "all") return `Showing all ${SITES.length} sites, ranked by Mars match`;
  return `${BODY_NAME[next]} filter on. ${COUNTS[next]} analogues highlighted; all ${
    SITES.length
  } are listed, ranked by ${BODY_NAME[next]} match.`;
}

function selectionMessage(site) {
  const mars = overallScore(site, "mars");
  const moon = overallScore(site, "moon");
  return `${site.name} selected. Mars ${Number.isFinite(mars) ? mars : "not scored"}, Moon ${
    Number.isFinite(moon) ? moon : "not scored"
  }.`;
}

function Score({ body, value }) {
  return (
    <span className={atlas.score} data-body={body}>
      <span className={atlas.track} aria-hidden="true">
        <span
          className={atlas.fill}
          style={{ width: `${Number.isFinite(value) ? value : 0}%` }}
        />
      </span>
      <span className={atlas.scoreNum}>{Number.isFinite(value) ? value : "—"}</span>
    </span>
  );
}

export default function AtlasPage() {
  const { slug } = useRoute();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduced = useReducedMotion();

  const [selectedSlug, setSelectedSlug] = useState(() =>
    slug && SITE_BY_SLUG.has(slug) ? slug : DEFAULT_SLUG
  );
  const [filter, setFilter] = useState("all");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [tableOverflows, setTableOverflows] = useState(false);
  const selectedSlugRef = useRef(selectedSlug);
  const triggerRef = useRef(null);
  const tableWrapRef = useRef(null);

  useEffect(() => {
    selectedSlugRef.current = selectedSlug;
  }, [selectedSlug]);

  // The swipe hint and the scroll region's tab stop belong to a table that
  // actually overflows: neither is shown or reachable when the columns fit.
  useEffect(() => {
    const scroller = tableWrapRef.current;
    if (!scroller) return undefined;

    const measure = () =>
      setTableOverflows(scroller.scrollWidth > scroller.clientWidth + 1);
    measure();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(scroller);
    if (scroller.firstElementChild) observer.observe(scroller.firstElementChild);
    return () => observer.disconnect();
  }, []);

  const closeSheet = useCallback(() => {
    setSheetOpen(false);
    const trigger = triggerRef.current;
    if (trigger && trigger.isConnected) {
      window.requestAnimationFrame(() => trigger.focus({ preventScroll: true }));
    }
  }, []);

  // The URL is the source of truth for a deep link and for Back. A slug we do
  // not know falls back to the default site, and the address is corrected with
  // replaceRoute so no history entry is added per selection. The filter follows
  // the site exactly as it does for a click, so Back cannot leave a pressed
  // chip that excludes the dossier on screen.
  useEffect(() => {
    const known = slug ? SITE_BY_SLUG.get(slug) : null;
    const next = known ?? SITE_BY_SLUG.get(slug ? DEFAULT_SLUG : selectedSlugRef.current);

    setSelectedSlug(next ? next.slug : DEFAULT_SLUG);
    if (!known) replaceRoute(`/atlas/${next ? next.slug : DEFAULT_SLUG}`);
    if (next) setFilter((current) => followSite(next, current));
  }, [slug]);

  // The sheet belongs to the narrow layout only. Closing through the normal
  // path returns focus instead of losing it with the unmounted close button.
  useEffect(() => {
    if (isDesktop && sheetOpen) closeSheet();
  }, [isDesktop, sheetOpen, closeSheet]);

  const selectSite = useCallback(
    (nextSlug, { openSheet = false } = {}) => {
      const site = SITE_BY_SLUG.get(nextSlug);
      if (!site) return;

      // A pin that does not match the filter still selects, and the filter
      // follows the site so the pin and the list never disagree.
      if (filter !== "all" && !site.targets.includes(filter)) {
        setFilter(followSite(site, filter));
      }

      setSelectedSlug(nextSlug);
      replaceRoute(`/atlas/${nextSlug}`);
      setAnnouncement(selectionMessage(site));

      if (openSheet && !isDesktop) {
        triggerRef.current =
          document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setSheetOpen(true);
      }
    },
    [filter, isDesktop]
  );

  const handlePinSelect = useCallback(
    (nextSlug) => selectSite(nextSlug, { openSheet: true }),
    [selectSite]
  );

  const changeFilter = useCallback(
    (next) => {
      if (next === filter) return;
      setFilter(next);
      setAnnouncement(filterMessage(next));

      const current = SITE_BY_SLUG.get(selectedSlugRef.current);
      if (next !== "all" && current && !current.targets.includes(next)) {
        // The list is sorted for the new body, so the first site that carries
        // that target is its top analogue, not just its highest score.
        const top = RANKED[next].find((site) => site.targets.includes(next));
        if (top) {
          setSelectedSlug(top.slug);
          replaceRoute(`/atlas/${top.slug}`);
        }
      }
    },
    [filter]
  );

  const handleShowList = useCallback(() => {
    document.getElementById("sites")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }, [reduced]);

  const selectedSite = SITE_BY_SLUG.get(selectedSlug) ?? SITE_BY_SLUG.get(DEFAULT_SLUG);
  const rankBody = filter === "moon" ? "moon" : "mars";
  const rows = RANKED[rankBody];

  return (
    <main id="main" className={s.page}>
      <p
        className="visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        data-announcer="true"
      >
        {announcement}
      </p>

      <section className={cx("section", s.head, atlas.head)} aria-labelledby="atlas-title">
        <div className={atlas.headGrid}>
          <div className={atlas.headMain}>
            <p className="kicker">PLANETARY ANALOGUE ATLAS · {SITES.length} SITES</p>
            <h1 className="section__title" id="atlas-title">
              The atlas
            </h1>
          </div>
          <div className={atlas.headAside}>
            <p className="section__lede">
              {SITES.length} places used to rehearse Mars and the Moon. Every score compares
              the site with its destination, not the two planets with each other.
            </p>
            <p className={atlas.stats}>
              <span>{SITES.length} sites</span>
              <span>{BODIES.length} destinations</span>
              <span>{PARAMS.length} parameters</span>
            </p>
          </div>
        </div>
      </section>

      <div className={atlas.controls}>
        <div className={atlas.chips} role="group" aria-label="Filter sites by destination">
          {FILTERS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={atlas.chip}
              aria-pressed={filter === entry.id}
              onClick={() => changeFilter(entry.id)}
            >
              {entry.label}
              <span className={atlas.chipCount}>{COUNTS[entry.id]}</span>
            </button>
          ))}
        </div>

        <div className={atlas.legend}>
          <Rubric className={atlas.rubric} />
          <p className={atlas.legendNote}>
            Every site is still Earth. Pressure, gravity and mean temperature keep even the
            best analogue under 50 out of 100.
          </p>
        </div>
      </div>

      <div className={atlas.band}>
        <div className={atlas.globeCol}>
          <div className={atlas.globeWrap}>
            <Globe
              sites={SITES}
              selected={selectedSlug}
              onSelect={handlePinSelect}
              filter={filter}
              onShowList={handleShowList}
            />
          </div>

          {!isDesktop && !sheetOpen ? (
            <p className={atlas.tapHint}>Tap a pin to open its dossier</p>
          ) : null}
        </div>

        <div className={atlas.dossierCol}>
          <SiteDossier
            site={selectedSite}
            dialog={!isDesktop}
            open={sheetOpen}
            onClose={closeSheet}
          />
        </div>
      </div>

      {!isDesktop ? (
        <div
          className={atlas.backdrop}
          data-backdrop="true"
          data-open={sheetOpen ? "true" : "false"}
          onClick={closeSheet}
          aria-hidden="true"
        />
      ) : null}

      <section id="sites" className="section" aria-labelledby="ranked-title">
        <div className="section__head">
          <p className="kicker">THE FULL LIST</p>
          <h2 className="section__title" id="ranked-title">
            All sites, ranked
          </h2>
          <p className={atlas.sortNote}>Ranked by {BODY_NAME[rankBody]} match</p>
        </div>

        {tableOverflows ? (
          <p className={atlas.swipeHint} aria-hidden="true">
            Swipe for Moon →
          </p>
        ) : null}

        <div
          ref={tableWrapRef}
          className={atlas.tableWrap}
          tabIndex={tableOverflows ? 0 : undefined}
          role="region"
          aria-label={`All sites ranked by ${BODY_NAME[rankBody]} match`}
        >
          <table className={atlas.table}>
            <caption className="visually-hidden">
              All {SITES.length} analogue sites, ranked by {BODY_NAME[rankBody]} similarity.
            </caption>
            <thead>
              <tr>
                <th scope="col" className={atlas.rankCol}>
                  #
                </th>
                <th scope="col">Site</th>
                <th scope="col" className={atlas.regionCol}>
                  Region
                </th>
                <th scope="col">Targets</th>
                <th scope="col" className={atlas.scoreCol}>
                  Mars
                </th>
                <th scope="col" className={atlas.scoreCol}>
                  Moon
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((site, index) => {
                const mars = overallScore(site, "mars");
                const moon = overallScore(site, "moon");
                const isSelected = site.slug === selectedSlug;
                return (
                  <tr key={site.slug} data-selected={isSelected ? "true" : undefined}>
                    <td className={atlas.rankCol}>{index + 1}</td>
                    <td className={atlas.siteCell}>
                      <a
                        href={`#/atlas/${site.slug}`}
                        aria-current={isSelected ? "true" : undefined}
                        onClick={(event) => {
                          event.preventDefault();
                          selectSite(site.slug, { openSheet: true });
                        }}
                      >
                        {site.name}
                      </a>
                    </td>
                    <td className={atlas.regionCol}>{site.region}</td>
                    <td className={atlas.targets}>
                      {site.targets.map((target) => (
                        <span key={target} data-body={target}>
                          {BODY_NAME[target]}
                        </span>
                      ))}
                    </td>
                    <td className={atlas.scoreCol}>
                      <Score body="mars" value={mars} />
                    </td>
                    <td className={atlas.scoreCol}>
                      <Score body="moon" value={moon} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" aria-labelledby="reference-title">
        <div className={atlas.refHead}>
          <p className="kicker">REFERENCE VALUES</p>
          <h2 className="section__title" id="reference-title">
            The two destinations
          </h2>
        </div>
        <p className={atlas.refNote}>Scores compare a site's value with these numbers.</p>

        <div className={atlas.refWrap}>
          <table className={atlas.refTable}>
            <caption className="visually-hidden">
              Mars and Moon reference values for the {PARAMS.length} parameters and gravity.
            </caption>
            <thead>
              <tr>
                <th scope="col">Parameter</th>
                <th scope="col">Mars</th>
                <th scope="col">Moon</th>
              </tr>
            </thead>
            <tbody>
              {PARAMS.map((param) => (
                <tr key={param.key}>
                  <th scope="row">{param.label}</th>
                  <td>{param.marsRef}</td>
                  <td>{param.moonRef}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">Gravity</th>
                <td>{GRAVITY.mars}</td>
                <td>{GRAVITY.moon}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <Sources />
    </main>
  );
}
