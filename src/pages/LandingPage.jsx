import Divider from "../components/layout/Divider.jsx";
import Ticker from "../components/layout/Ticker.jsx";
import Compare from "../components/sections/Compare.jsx";
import Fidelity from "../components/sections/Fidelity.jsx";
import Gallery from "../components/sections/Gallery.jsx";
import Hero from "../components/sections/Hero.jsx";
import Lookalikes from "../components/sections/Lookalikes.jsx";
import Mars from "../components/sections/Mars.jsx";
import Moon from "../components/sections/Moon.jsx";
import Sources from "../components/sections/Sources.jsx";
import Worlds from "../components/sections/Worlds.jsx";

export default function LandingPage() {
  return (
    <main id="main">
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
      <Sources />
    </main>
  );
}
