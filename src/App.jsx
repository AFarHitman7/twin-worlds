import { useCallback, useEffect, useState } from "react";
import Cursor from "./components/chrome/Cursor.jsx";
import Loader from "./components/chrome/Loader.jsx";
import ScrollProgress from "./components/chrome/ScrollProgress.jsx";
import SpaceBackdrop from "./components/chrome/SpaceBackdrop.jsx";
import StardustTrail from "./components/chrome/StardustTrail.jsx";
import Starfield from "./components/chrome/Starfield.jsx";
import ToTop from "./components/chrome/ToTop.jsx";
import Divider from "./components/layout/Divider.jsx";
import Footer from "./components/layout/Footer.jsx";
import Nav from "./components/layout/Nav.jsx";
import Ticker from "./components/layout/Ticker.jsx";
import Compare from "./components/sections/Compare.jsx";
import Fidelity from "./components/sections/Fidelity.jsx";
import Gallery from "./components/sections/Gallery.jsx";
import Game from "./components/sections/Game.jsx";
import Hero from "./components/sections/Hero.jsx";
import Lookalikes from "./components/sections/Lookalikes.jsx";
import Mars from "./components/sections/Mars.jsx";
import Moon from "./components/sections/Moon.jsx";
import Sources from "./components/sections/Sources.jsx";
import Worlds from "./components/sections/Worlds.jsx";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) document.body.classList.add("is-loaded");
  }, [loaded]);

  const onLoaderDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Loader onDone={onLoaderDone} />
      <Cursor />
      <ScrollProgress />
      <Starfield />
      <StardustTrail />
      <SpaceBackdrop />
      <Nav />

      <main>
        <Hero />
        <Ticker />
        <Worlds />
        <Divider text="✦ TRANSMISSION 01 · STABLE ✦" />
        <Fidelity />
        <Mars />
        <Moon />
        <Compare />
        <Lookalikes />
        <Gallery />
        <Divider text="✦ FINAL TEST · DO YOU TRUST YOUR EYES? ✦" />
        <Game />
        <Sources />
      </main>

      <Footer />
      <ToTop />
    </>
  );
}
