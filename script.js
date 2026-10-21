/* ============================================================
   TWIN WORLDS — maximum overdrive interactions
   ============================================================ */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ----------------------------------------------------------
     Preloader
  ---------------------------------------------------------- */
  const loader = document.getElementById("loader");
  const loaderBar = document.getElementById("loaderBar");
  const loaderPct = document.getElementById("loaderPct");
  let loadPct = 0;
  const loadTick = setInterval(() => {
    loadPct = Math.min(100, loadPct + Math.random() * 22 + 6);
    if (loaderBar) loaderBar.style.width = loadPct + "%";
    if (loaderPct) loaderPct.textContent = String(Math.floor(loadPct)).padStart(2, "0") + "%";
    if (loadPct >= 100) {
      clearInterval(loadTick);
      setTimeout(() => {
        if (loader) loader.classList.add("is-done");
        document.body.classList.add("is-loaded");
      }, 350);
    }
  }, 140);
  // Safety: never trap the user behind the loader
  setTimeout(() => {
    if (loader && !loader.classList.contains("is-done")) {
      loader.classList.add("is-done");
      document.body.classList.add("is-loaded");
    }
  }, 3500);

  /* ----------------------------------------------------------
     Custom cursor + click burst
  ---------------------------------------------------------- */
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  let mx = -100, my = -100, rx = -100, ry = -100;
  if (finePointer && !reduceMotion && dot && ring) {
    window.addEventListener("pointermove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    }, { passive: true });
    (function ringLoop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(ringLoop);
    })();
    document.querySelectorAll("a, button, .gallery__item, [data-compare]").forEach((el) => {
      el.addEventListener("pointerenter", () => ring.classList.add("is-hover"));
      el.addEventListener("pointerleave", () => ring.classList.remove("is-hover"));
    });
  }

  /* ----------------------------------------------------------
     Starfield — warp speed reacts to scroll velocity
  ---------------------------------------------------------- */
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let rafId = null;
  let pointerX = 0, pointerY = 0, easedX = 0, easedY = 0;
  let width = 0, height = 0, dpr = 1;
  let warp = 1, warpTarget = 1, lastScroll = window.scrollY;

  const PALETTE = ["#e8edf5", "#cfe0f5", "#f4e3c2", "#d9d4e8", "#ffffff"];

  function buildStars() {
    const area = width * height;
    const count = Math.min(420, Math.floor(area / 4200));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.3,
      base: Math.random() * 0.6 + 0.25,
      tw: Math.random() * 2 + 0.4,
      phase: Math.random() * Math.PI * 2,
      depth: Math.random() * 0.85 + 0.15,
      speed: Math.random() * 8 + 2,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      streak: Math.random() < 0.18,
    }));
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildStars();
  }

  function drawStatic() {
    ctx.clearRect(0, 0, width, height);
    for (const s of stars) {
      ctx.globalAlpha = s.base;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function draw(time) {
    const t = time / 1000;
    warp += (warpTarget - warp) * 0.06;
    warpTarget += (1 - warpTarget) * 0.02;
    easedX += (pointerX - easedX) * 0.04;
    easedY += (pointerY - easedY) * 0.04;

    ctx.clearRect(0, 0, width, height);

    for (const s of stars) {
      const fall = t * s.speed * s.depth * warp;
      const y = (s.y + fall * 4) % height;
      const px = s.x + easedX * 40 * s.depth;
      const py = y + easedY * 22 * s.depth;
      const alpha = Math.max(0.05, s.base * (0.62 + 0.38 * Math.sin(t * s.tw + s.phase)));
      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.color;
      if (s.streak && warp > 1.6) {
        const len = Math.min(60, (warp - 1) * 14 * s.depth);
        ctx.fillRect(px, py, s.r * 0.7, len);
      } else {
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    rafId = requestAnimationFrame(draw);
  }

  function startStars() {
    resize();
    if (reduceMotion) { drawStatic(); return; }
    rafId = requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    cancelAnimationFrame(rafId);
    resize();
    if (reduceMotion) drawStatic();
    else rafId = requestAnimationFrame(draw);
  });

  // Warp boost on fast scroll
  let scrollTick = false;
  window.addEventListener("scroll", () => {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const v = Math.abs(y - lastScroll);
      lastScroll = y;
      if (v > 4) warpTarget = Math.min(7, 1 + v / 22);
      scrollTick = false;
    });
  }, { passive: true });

  if (finePointer && !reduceMotion) {
    window.addEventListener("pointermove", (e) => {
      pointerX = e.clientX / window.innerWidth - 0.5;
      pointerY = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     Pointer trail (stardust)
  ---------------------------------------------------------- */
  const trail = document.getElementById("trail");
  if (trail && finePointer && !reduceMotion) {
    const tctx = trail.getContext("2d");
    let particles = [];
    let tw = 0, th = 0, tdpr = 1;
    const TRAIL_COLORS = ["#f4e3c2", "#cfe0f5", "#e8b07e", "#d9d4e8", "#ffffff"];
    function sizeTrail() {
      tdpr = Math.min(window.devicePixelRatio || 1, 2);
      tw = window.innerWidth; th = window.innerHeight;
      trail.width = tw * tdpr; trail.height = th * tdpr;
      trail.style.width = tw + "px"; trail.style.height = th + "px";
      tctx.setTransform(tdpr, 0, 0, tdpr, 0, 0);
    }
    sizeTrail();
    window.addEventListener("resize", sizeTrail);
    let lastPX = 0, lastPY = 0;
    window.addEventListener("pointermove", (e) => {
      const dx = e.clientX - lastPX, dy = e.clientY - lastPY;
      const dist = Math.hypot(dx, dy);
      lastPX = e.clientX; lastPY = e.clientY;
      if (dist < 3 || particles.length > 220) return;
      particles.push({
        x: e.clientX, y: e.clientY,
        vx: -dx * 0.02 + (Math.random() - 0.5) * 1.2,
        vy: -dy * 0.02 + (Math.random() - 0.5) * 1.2,
        life: 1, decay: 0.02 + Math.random() * 0.03,
        r: Math.random() * 2.4 + 0.8,
        color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)],
      });
    }, { passive: true });
    (function trailLoop() {
      tctx.clearRect(0, 0, tw, th);
      tctx.globalCompositeOperation = "lighter";
      particles = particles.filter((p) => p.life > 0);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.vx *= 0.96; p.vy *= 0.96; p.life -= p.decay;
        tctx.globalAlpha = Math.max(0, p.life) * 0.9;
        tctx.fillStyle = p.color;
        tctx.shadowBlur = 14;
        tctx.shadowColor = p.color;
        tctx.beginPath();
        tctx.arc(p.x, p.y, p.r * p.life + 0.4, 0, Math.PI * 2);
        tctx.fill();
      }
      tctx.shadowBlur = 0;
      tctx.globalAlpha = 1;
      tctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(trailLoop);
    })();
  }

  /* ----------------------------------------------------------
     Navigation + scroll progress + scrollspy + to-top
  ---------------------------------------------------------- */
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const progressBar = document.getElementById("progressBar");
  const toTop = document.getElementById("toTop");
  const spyLinks = [...document.querySelectorAll("[data-spy]")];
  const spySections = spyLinks
    .map((a) => document.getElementById(a.dataset.spy))
    .filter(Boolean);

  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.width = pct + "%";
    if (toTop) toTop.classList.toggle("is-show", window.scrollY > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  if ("IntersectionObserver" in window && spySections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          spyLinks.forEach((a) => a.classList.toggle("is-active", a.dataset.spy === entry.target.id));
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    spySections.forEach((s) => spy.observe(s));
  }

  /* ----------------------------------------------------------
     Magnetic buttons
  ---------------------------------------------------------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px) scale(1.03)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* ----------------------------------------------------------
     3D tilt cards
  ---------------------------------------------------------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".tilt").forEach((card) => {
      let raf = null;
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          card.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-5px)`;
        });
      });
      card.addEventListener("pointerleave", () => {
        if (raf) cancelAnimationFrame(raf);
        card.style.transform = "";
      });
    });
  }

  /* ----------------------------------------------------------
     Hero title: word-level split (keeps kerning), light sheen
  ---------------------------------------------------------- */
  const heroTitle = document.getElementById("heroTitle");
  if (heroTitle) {
    const words = heroTitle.textContent.trim().split(/\s+/);
    heroTitle.setAttribute("aria-label", words.join(" "));
    heroTitle.innerHTML = "";
    words.forEach((w, wi) => {
      const word = document.createElement("span");
      word.className = "word";
      const clean = w.toLowerCase().replace(/[^a-z]/g, "");
      if (clean === "closer") word.classList.add("word-hl");
      word.style.setProperty("--i", wi);
      word.textContent = w;
      heroTitle.appendChild(word);
      if (wi < words.length - 1) heroTitle.appendChild(document.createTextNode(" "));
    });
    heroTitle.classList.add("is-split");
  }

  /* ----------------------------------------------------------
     Animated counters
  ---------------------------------------------------------- */
  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        cio.unobserve(el);
        const target = Number(el.dataset.count) || 0;
        if (reduceMotion) { el.textContent = target; return; }
        const t0 = performance.now(), dur = 1400;
        (function step(now) {
          const p = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach((c) => { c.textContent = c.dataset.count; });
  }

  /* ----------------------------------------------------------
     Hero orb mouse parallax (depth-weighted)
  ---------------------------------------------------------- */
  const orbs = document.querySelector(".hero__orbs");
  if (orbs && finePointer && !reduceMotion) {
    window.addEventListener("pointermove", (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      orbs.style.transform = `translate3d(${nx * 14}px, ${ny * 10}px, 0)`;
      orbs.querySelectorAll(".orb").forEach((o) => {
        const d = Number(o.dataset.depth || 1);
        o.style.translate = `${nx * 16 * d}px ${ny * 12 * d}px`;
      });
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     Reveal on scroll
  ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ----------------------------------------------------------
     Gravity bars + pillar bars become visible
  ---------------------------------------------------------- */
  const gravity = document.querySelector(".gravity");
  if (gravity && "IntersectionObserver" in window) {
    new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { gravity.classList.add("is-visible"); obs.disconnect(); }
      });
    }, { threshold: 0.35 }).observe(gravity);
  } else if (gravity) {
    gravity.classList.add("is-visible");
  }

  /* ----------------------------------------------------------
     Comparison sliders
  ---------------------------------------------------------- */
  document.querySelectorAll("[data-compare]").forEach((frame) => {
    const handle = frame.querySelector(".compare__handle");
    let dragging = false;

    const setPos = (pct) => {
      const clamped = Math.max(0, Math.min(100, pct));
      frame.style.setProperty("--pos", clamped + "%");
      handle.setAttribute("aria-valuenow", String(Math.round(clamped)));
    };
    const posFromEvent = (clientX) => {
      const rect = frame.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    };

    frame.addEventListener("pointerdown", (e) => {
      dragging = true;
      try { frame.setPointerCapture(e.pointerId); } catch (_) {}
      setPos(posFromEvent(e.clientX));
    });
    frame.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      setPos(posFromEvent(e.clientX));
    });
    const endDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      try { frame.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    frame.addEventListener("pointerup", endDrag);
    frame.addEventListener("pointercancel", endDrag);

    handle.addEventListener("keydown", (e) => {
      const current = Number(handle.getAttribute("aria-valuenow"));
      let next = current;
      if (e.key === "ArrowLeft") next = current - 5;
      else if (e.key === "ArrowRight") next = current + 5;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = 100;
      else return;
      e.preventDefault();
      setPos(next);
    });
  });

  /* ----------------------------------------------------------
     Gallery filters + lightbox
  ---------------------------------------------------------- */
  const galleryItems = [...document.querySelectorAll(".gallery__item")];
  const filterButtons = [...document.querySelectorAll(".filter")];

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach((b) => b.classList.toggle("is-active", b === btn));
      galleryItems.forEach((item) => {
        const match = filter === "all" || item.dataset.cat === filter;
        item.hidden = !match;
        if (match && !reduceMotion) {
          item.animate(
            [{ opacity: 0, transform: "scale(0.94) rotate(0.5deg)" }, { opacity: 1, transform: "scale(1)" }],
            { duration: 380, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" }
          );
        }
      });
    });
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = item.dataset.caption || img.alt;
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    document.body.style.overflow = "";
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  /* ----------------------------------------------------------
     Confetti burst (canvas-free, DOM particles)
  ---------------------------------------------------------- */
  function confettiBurst(n = 90) {
    if (reduceMotion) return;
    const colors = ["#f4e3c2", "#cfe0f5", "#e8b07e", "#d6dce6", "#d9a45b", "#ffffff"];
    for (let i = 0; i < n; i++) {
      const p = document.createElement("span");
      const s = Math.random() * 9 + 4;
      p.style.cssText = `position:fixed;z-index:250;left:50%;top:42%;width:${s}px;height:${s * (Math.random() > 0.5 ? 1 : 0.4)}px;pointer-events:none;background:${colors[i % colors.length]};box-shadow:0 0 10px ${colors[i % colors.length]};`;
      document.body.appendChild(p);
      const ang = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 380;
      const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist - 120;
      p.animate(
        [
          { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
          { transform: `translate(${dx}px, ${dy + 260}px) rotate(${Math.random() * 900 - 450}deg)`, opacity: 0 },
        ],
        { duration: 1200 + Math.random() * 900, easing: "cubic-bezier(0.23,1,0.32,1)" }
      ).onfinish = () => p.remove();
    }
  }

  /* ----------------------------------------------------------
     Guess the planet
  ---------------------------------------------------------- */
  const ROUNDS = [
    { src: "https://commons.wikimedia.org/wiki/Special:FilePath/FullMoon2010.jpg?width=1200", alt: "A bright, cratered disc in a dark sky", answer: "moon", fact: "The Moon’s near side in full sunlight. The same face always turns toward Earth." },
    { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wadi%20Rum%2C%20Jordan.jpg?width=1200", alt: "A vast red sandstone desert", answer: "earth", fact: "Wadi Rum, Jordan. Earth, but it stood in for Mars in 'The Martian'." },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Curiosity_Captures_Mars_Landscape_While_Talking_to_an_Orbiter_%28PIA26632%29.jpg/1280px-Curiosity_Captures_Mars_Landscape_While_Talking_to_an_Orbiter_%28PIA26632%29.jpg", alt: "A rocky, red-brown desert under a hazy sky", answer: "mars", fact: "Gale Crater, Mars, photographed by NASA’s Curiosity rover." },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Anfiteatro%2C_Valle_de_la_Luna%2C_San_Pedro_de_Atacama%2C_Chile%2C_2016-02-01%2C_DD_149.JPG/1280px-Anfiteatro%2C_Valle_de_la_Luna%2C_San_Pedro_de_Atacama%2C_Chile%2C_2016-02-01%2C_DD_149.JPG", alt: "Bare, banded hills in a bone-dry desert", answer: "earth", fact: "Chile’s Atacama, the driest non-polar desert. NASA and ESA test rovers here." },
    { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Aldrin%20Apollo%2011%20original.jpg?width=1200", alt: "A spacesuited figure on a grey, shadowed surface", answer: "moon", fact: "Buzz Aldrin on the lunar surface, Apollo 11, 1969." },
    { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Flying_over_Devon_Island_%282665527817%29.jpg/1280px-Flying_over_Devon_Island_%282665527817%29.jpg", alt: "A bare, rocky polar landscape seen from the air", answer: "earth", fact: "Devon Island, Canada. NASA’s Haughton-Mars Project rehearses Mars here." },
    { src: "https://commons.wikimedia.org/wiki/Special:FilePath/OSIRIS%20Mars%20true%20color.jpg?width=1200", alt: "A rust-coloured planet against black space", answer: "mars", fact: "The full disc of Mars, home to Olympus Mons, the tallest volcano known." },
    { src: "https://upload.wikimedia.org/wikipedia/commons/0/03/Cinder_Lake_Crater_Field_1.jpg", alt: "A field of small craters in dark volcanic ground", answer: "earth", fact: "Cinder Lake, Arizona, a man-made crater field built for Apollo training." },
    { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Apollo_17_Moon_Panorama.jpg/1280px-Apollo_17_Moon_Panorama.jpg", alt: "A grey, cratered lunar surface under a black sky", answer: "moon", fact: "The lunar surface at Apollo 17's landing site, 1972." },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/IronInRocksMakeRiverRed.jpg/1280px-IronInRocksMakeRiverRed.jpg", alt: "A river stained deep red by iron-rich water", answer: "earth", fact: "Río Tinto, Spain. Its acidic, iron-rich water precipitates minerals also found on Mars." },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PIA24173-MarsCuriosityRover-SelfPortrait-20201112.jpg/1280px-PIA24173-MarsCuriosityRover-SelfPortrait-20201112.jpg", alt: "A robotic rover on rusty, dusty ground", answer: "mars", fact: "A Curiosity rover selfie on Mars. The rover itself is in the frame." },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/A_Sulphur_Pond%2C_Danakil_Depression%2C_Ethiopia.jpg/1280px-A_Sulphur_Pond%2C_Danakil_Depression%2C_Ethiopia.jpg", alt: "A vivid yellow and green sulphur pond", answer: "earth", fact: "Dallol, Ethiopia, a hyperacidic, hypersaline volcanic landscape." },
  ];

  const intro = document.getElementById("gameIntro");
  const play = document.getElementById("gamePlay");
  const end = document.getElementById("gameEnd");
  const startBtn = document.getElementById("gameStart");
  const againBtn = document.getElementById("gameAgain");
  const roundEl = document.getElementById("gameRound");
  const scoreEl = document.getElementById("gameScore");
  const meterEl = document.getElementById("gameMeter");
  const gameImg = document.getElementById("gameImg");
  const choices = document.getElementById("gameChoices");
  const choiceBtns = [...choices.querySelectorAll("button")];
  const factEl = document.getElementById("gameFact");
  const nextBtn = document.getElementById("gameNext");
  const endTitle = document.getElementById("gameTitle");
  const endScore = document.getElementById("gameFinal");
  const endVerdict = document.getElementById("gameVerdict");

  let index = 0;
  let score = 0;

  function preload() {
    ROUNDS.forEach((r) => { const img = new Image(); img.src = r.src; });
  }
  function show(el) { el.hidden = false; }
  function hide(el) { el.hidden = true; }

  function loadRound() {
    const round = ROUNDS[index];
    gameImg.classList.remove("is-flip");
    void gameImg.offsetWidth;
    gameImg.src = round.src;
    gameImg.alt = round.alt;
    gameImg.classList.add("is-flip");
    roundEl.textContent = `Round ${index + 1} / ${ROUNDS.length}`;
    scoreEl.textContent = `Score ${score}`;
    if (meterEl) meterEl.style.width = `${(index / ROUNDS.length) * 100}%`;
    factEl.textContent = "";
    hide(nextBtn);
    choiceBtns.forEach((b) => { b.disabled = false; b.classList.remove("is-correct", "is-wrong"); });
  }

  function verdict(value) {
    const total = ROUNDS.length;
    if (value === total) return ["Offworld Expert ✦", "Flawless. You can tell a red desert from the Red Planet."];
    if (value >= total - 2) return ["Astronaut in Training", "Sharp eyes. Only a couple of worlds tripped you up."];
    if (value >= Math.ceil(total * 0.55)) return ["Mission Specialist", "Solid. Earth’s disguises are convincing, aren’t they?"];
    if (value >= Math.ceil(total * 0.3)) return ["Ground Control", "Not bad. The point is exactly how hard this is."];
    return ["Earthbound Explorer", "The disguises worked. That’s the whole idea."];
  }

  function startGame() {
    index = 0; score = 0;
    hide(intro); hide(end); show(play);
    preload();
    loadRound();
  }

  function onChoice(btn) {
    const round = ROUNDS[index];
    const picked = btn.dataset.pick;
    const correct = picked === round.answer;
    choiceBtns.forEach((b) => (b.disabled = true));
    if (correct) {
      btn.classList.add("is-correct");
      score += 1;
      if (!reduceMotion) {
        btn.animate(
          [{ transform: "scale(1)" }, { transform: "scale(1.12)" }, { transform: "scale(1)" }],
          { duration: 350, easing: "cubic-bezier(0.34,1.56,0.64,1)" }
        );
      }
    } else {
      btn.classList.add("is-wrong");
      const rightBtn = choiceBtns.find((b) => b.dataset.pick === round.answer);
      rightBtn.classList.add("is-correct");
    }
    scoreEl.textContent = `Score ${score}`;
    factEl.textContent = (correct ? "✦ Correct — " : "✖ Not quite — ") + round.fact;
    if (meterEl) meterEl.style.width = `${((index + 1) / ROUNDS.length) * 100}%`;
    nextBtn.textContent = index === ROUNDS.length - 1 ? "See results →" : "Next →";
    show(nextBtn);
  }

  function onNext() {
    if (index === ROUNDS.length - 1) {
      hide(play); show(end);
      const [title, line] = verdict(score);
      endTitle.textContent = title;
      endScore.textContent = `${score} / ${ROUNDS.length}`;
      endVerdict.textContent = line;
      if (score >= ROUNDS.length - 2) confettiBurst(110);
    } else {
      index += 1;
      loadRound();
    }
  }

  startBtn.addEventListener("click", startGame);
  againBtn.addEventListener("click", startGame);
  nextBtn.addEventListener("click", onNext);
  choiceBtns.forEach((b) => b.addEventListener("click", () => onChoice(b)));

  startStars();
})();
