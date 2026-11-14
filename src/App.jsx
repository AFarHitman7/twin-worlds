import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import Cursor from "./components/chrome/Cursor.jsx";
import Loader from "./components/chrome/Loader.jsx";
import ScrollProgress from "./components/chrome/ScrollProgress.jsx";
import SpaceBackdrop from "./components/chrome/SpaceBackdrop.jsx";
import StardustTrail from "./components/chrome/StardustTrail.jsx";
import Starfield from "./components/chrome/Starfield.jsx";
import ToTop from "./components/chrome/ToTop.jsx";
import Footer from "./components/layout/Footer.jsx";
import Nav from "./components/layout/Nav.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import { useRoute, useScrollToTop } from "./router/useRoute.js";

const AtlasPage = lazy(() => import("./pages/AtlasPage.jsx"));
const GamePage = lazy(() => import("./pages/GamePage.jsx"));

export default function App() {
  const { route } = useRoute();
  // The launch sequence belongs to a first visit of the landing page only.
  const entryRoute = useRef(route).current;
  const withLoader = entryRoute === "/";
  const [loaded, setLoaded] = useState(!withLoader);

  useScrollToTop(route);

  useEffect(() => {
    if (loaded) document.body.classList.add("is-loaded");
  }, [loaded]);

  const onLoaderDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      {withLoader ? <Loader onDone={onLoaderDone} /> : null}
      <Cursor />
      <ScrollProgress />
      <Starfield />
      <StardustTrail />
      <SpaceBackdrop />
      <Nav route={route} />

      <Suspense fallback={<main id="main" aria-busy="true" style={{ minHeight: "60vh" }} />}>
        {route === "/atlas" ? <AtlasPage /> : route === "/game" ? <GamePage /> : <LandingPage />}
      </Suspense>

      <Footer route={route} />
      <ToTop />
    </>
  );
}
