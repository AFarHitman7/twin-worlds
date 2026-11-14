import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "../../hooks/useMediaQuery.js";
import s from "./Globe.module.css";

const RAD = Math.PI / 180;
// NASA Blue Marble, public domain (NASA Earth Observatory / Reto Stoeckli),
// 2048×1024 equirectangular, served from public/textures.
const TEXTURE_URL = `${import.meta.env.BASE_URL}textures/earth-blue-marble.jpg`;
const CAMERA_Z = 3.35;
// The brief keeps the globe between 60% and 115% of the stage. With this lens
// (38°) that ceiling is reached at z ≈ 2.72, so the near clamp stops there
// instead of cropping the sphere at 2.35.
const ZOOM_MIN = 2.75;
const ZOOM_MAX = 4.7;
const PITCH_LIMIT = 1.15;
const DRAG_SPEED = 0.0055;
const SPIN_STEP = 0.0012;
const VELOCITY_DECAY = 0.94;
const VELOCITY_STOP = 0.0004;
const FACING_MIN = 0.06;
const FOCUS_MS = 650;

// The opening view: the Atlantic, with Africa turning toward the camera and
// South America at the limb, so both oceans and several pins read at once.
const START_YAW = 4.65;
const START_PITCH = 0.16;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// Matches --ease-out, cubic-bezier(0.23, 1, 0.32, 1), closely enough for a
// camera move that ends at rest.
const easeOutCubic = (t) => 1 - (1 - t) ** 3;

function hasWebGL() {
  try {
    const probe = document.createElement("canvas");
    const context = probe.getContext("webgl2") || probe.getContext("webgl");
    if (!context) return false;
    // Give the probe context back; devices with a small context budget should
    // not lose one to a feature check.
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/**
 * Equirectangular site position on the unit sphere, in the planet's own frame.
 * This is the inverse of the SphereGeometry UV mapping, so a texture whose left
 * edge is 180°W lines up with the coastline under every pin.
 */
function siteVector(site) {
  const phi = (90 - site.lat) * RAD;
  const theta = (site.lon + 180) * RAD;
  return new THREE.Vector3(
    -Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta)
  );
}

function targetKind(targets = []) {
  const mars = targets.includes("mars");
  const moon = targets.includes("moon");
  if (mars && moon) return "both";
  return moon ? "moon" : "mars";
}

function targetLabel(targets = []) {
  const kind = targetKind(targets);
  if (kind === "both") return "Mars and Moon analogue";
  return kind === "moon" ? "Moon analogue" : "Mars analogue";
}

export default function Globe({ sites = [], selected = null, onSelect, filter = "all" }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const pinRefs = useRef([]);
  const apiRef = useRef(null);
  const didDragRef = useRef(0);
  const sitesRef = useRef(sites);
  const selectedRef = useRef(selected);
  const reducedRef = useRef(false);
  const [status, setStatus] = useState("loading");
  const [dragging, setDragging] = useState(false);
  const reduced = useReducedMotion();

  // Props the render loop reads without being re-created for each render.
  useEffect(() => {
    sitesRef.current = sites;
  }, [sites]);
  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);
  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  // Keep the clock still for people who asked for less motion.
  useEffect(() => {
    if (!reduced) return undefined;
    const api = apiRef.current;
    api?.settle();
    return undefined;
  }, [reduced]);

  // A selection from outside turns the chosen site to face the camera.
  useEffect(() => {
    if (!selected) return;
    apiRef.current?.focus(selected);
  }, [selected]);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return undefined;

    if (!hasWebGL()) {
      setStatus("error");
      return undefined;
    }

    let disposed = false;
    let loaded = false;
    let failed = false;
    let running = false;
    let rafId = 0;
    let lastTime = 0;
    let width = 1;
    let height = 1;
    let inView = true;
    let pageVisible = !document.hidden;
    let interacted = false;
    let zoom = CAMERA_Z;
    let zoomTarget = CAMERA_Z;
    let focusAnim = null;
    let pointerId = null;
    let pointerDown = false;
    let pointerMoved = false;
    let captured = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let yawVelocity = 0;
    let pitchVelocity = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, CAMERA_Z);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearAlpha(0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // --- planet -----------------------------------------------------------
    const globeGroup = new THREE.Group();
    globeGroup.rotation.order = "YXZ";
    globeGroup.quaternion.setFromEuler(
      new THREE.Euler(START_PITCH, START_YAW, 0, "YXZ")
    );
    scene.add(globeGroup);

    const geometry = new THREE.SphereGeometry(1, 96, 64);
    const material = new THREE.MeshStandardMaterial({
      roughness: 0.92,
      metalness: 0.02,
    });
    const globe = new THREE.Mesh(geometry, material);
    globeGroup.add(globe);

    // Air, borrowed from the page palette rather than invented.
    const css = getComputedStyle(document.documentElement);
    const earthColor = new THREE.Color(
      css.getPropertyValue("--earth").trim() || "#6aa8ff"
    );
    const atmosphereGeometry = new THREE.SphereGeometry(1.035, 48, 32);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: earthColor } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec3 vNormal;
        void main() {
          float rim = pow(max(0.0, 0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
          gl_FragColor = vec4(uColor, rim * 0.34);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    const sun = new THREE.DirectionalLight(0xffffff, 2.1);
    sun.position.set(-2.4, 1.6, 2.2);
    scene.add(sun);
    scene.add(new THREE.AmbientLight(0x2a3444, 0.55));

    // --- pins -------------------------------------------------------------
    const vectors = new Map();
    const vectorFor = (site) => {
      let vector = vectors.get(site.slug);
      if (!vector) {
        vector = siteVector(site);
        vectors.set(site.slug, vector);
      }
      return vector;
    };

    const forward = new THREE.Vector3(0, 0, 1);
    const world = new THREE.Vector3();
    const screen = new THREE.Vector3();
    const spin = new THREE.Quaternion();
    const delta = new THREE.Quaternion();
    const axisY = new THREE.Vector3(0, 1, 0);
    const turn = new THREE.Euler(0, 0, 0, "YXZ");
    const check = new THREE.Euler(0, 0, 0, "YXZ");
    const before = new THREE.Quaternion();

    const hidePin = (pin) => {
      if (pin.dataset.hidden === "true") return;
      pin.style.visibility = "hidden";
      pin.dataset.hidden = "true";
      pin.tabIndex = -1;
    };

    const showPin = (pin) => {
      if (pin.dataset.hidden === "false") return;
      pin.style.visibility = "visible";
      pin.dataset.hidden = "false";
      pin.tabIndex = 0;
    };

    const placePins = () => {
      const list = sitesRef.current;
      const pins = pinRefs.current;
      const current = selectedRef.current;

      for (let index = 0; index < list.length; index += 1) {
        const pin = pins[index];
        const site = list[index];
        if (!pin || !site) continue;

        if (!loaded) {
          hidePin(pin);
          continue;
        }

        world.copy(vectorFor(site)).applyQuaternion(globeGroup.quaternion);
        if (world.z <= FACING_MIN) {
          hidePin(pin);
          continue;
        }

        screen.copy(world).project(camera);
        const x = (screen.x * 0.5 + 0.5) * width;
        const y = (-screen.y * 0.5 + 0.5) * height;

        if (x < -16 || x > width + 16 || y < -16 || y > height + 16) {
          hidePin(pin);
          continue;
        }

        showPin(pin);
        pin.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%)`;
        pin.style.zIndex = String(10 + Math.round(world.z * 100));

        if (site.slug === current) {
          const flipX = x < 100 ? "start" : x > width - 100 ? "end" : "center";
          const flipY = y > height - 96 ? "up" : "down";
          if (pin.dataset.flipX !== flipX) pin.dataset.flipX = flipX;
          if (pin.dataset.flipY !== flipY) pin.dataset.flipY = flipY;
        }
      }
    };

    // --- camera and rotation helpers --------------------------------------
    const rotateBy = (pitch, yaw) => {
      before.copy(globeGroup.quaternion);
      turn.set(pitch, yaw, 0, "YXZ");
      delta.setFromEuler(turn);
      globeGroup.quaternion.premultiply(delta).normalize();

      check.setFromQuaternion(globeGroup.quaternion, "YXZ");
      if (Math.abs(check.x) > PITCH_LIMIT) {
        // Refuse movement that pushes further past the pole, but always allow
        // a drag that brings the globe back inside the limit.
        const next = Math.abs(check.x);
        check.setFromQuaternion(before, "YXZ");
        const previous = Math.abs(check.x);
        if (next > previous + 1e-6) {
          globeGroup.quaternion.copy(before);
          return false;
        }
      }
      return true;
    };

    // --- sizing -----------------------------------------------------------
    const resize = () => {
      const rect = stage.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    resize();

    // --- texture ----------------------------------------------------------
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      TEXTURE_URL,
      (map) => {
        if (disposed) {
          map.dispose();
          return;
        }
        map.colorSpace = THREE.SRGBColorSpace;
        map.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
        material.map = map;
        material.needsUpdate = true;
        loaded = true;
        setStatus("ready");
      },
      undefined,
      () => {
        if (disposed) return;
        failed = true;
        stop();
        setStatus("error");
      }
    );

    // --- frame loop -------------------------------------------------------
    const frame = (time) => {
      if (!running) return;
      rafId = requestAnimationFrame(frame);

      const deltaMs = lastTime ? Math.min(50, time - lastTime) : 16.67;
      lastTime = time;
      const step = clamp(deltaMs / 16.67, 0.5, 2);

      zoom += (zoomTarget - zoom) * Math.min(1, 0.18 * step);
      camera.position.z = zoom;

      if (focusAnim) {
        const progress = clamp((time - focusAnim.start) / FOCUS_MS, 0, 1);
        globeGroup.quaternion.slerpQuaternions(
          focusAnim.from,
          focusAnim.to,
          easeOutCubic(progress)
        );
        if (progress >= 1) focusAnim = null;
      } else if (!interacted && !pointerDown && !reducedRef.current) {
        spin.setFromAxisAngle(axisY, SPIN_STEP * step);
        globeGroup.quaternion.premultiply(spin).normalize();
      }

      if (
        !pointerDown &&
        (Math.abs(yawVelocity) > VELOCITY_STOP ||
          Math.abs(pitchVelocity) > VELOCITY_STOP)
      ) {
        const kept = rotateBy(pitchVelocity * step, yawVelocity * step);
        if (!kept) {
          yawVelocity = 0;
          pitchVelocity = 0;
        } else {
          yawVelocity *= VELOCITY_DECAY ** step;
          pitchVelocity *= VELOCITY_DECAY ** step;
        }
      } else if (!pointerDown) {
        yawVelocity = 0;
        pitchVelocity = 0;
      }

      camera.updateMatrixWorld();
      placePins();
      renderer.render(scene, camera);
    };

    const start = () => {
      if (running || disposed || failed) return;
      running = true;
      lastTime = 0;
      rafId = requestAnimationFrame(frame);
    };

    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    }

    const syncLoop = () => {
      if (inView && pageVisible) start();
      else stop();
    };

    const intersection = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        syncLoop();
      },
      { rootMargin: "120px" }
    );
    intersection.observe(stage);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      syncLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // --- pointer: drag, inertia, pinch-free zoom --------------------------
    const onPointerDown = (event) => {
      if (pointerDown || (event.pointerType === "mouse" && event.button !== 0)) {
        return;
      }
      pointerDown = true;
      pointerMoved = false;
      captured = false;
      pointerId = event.pointerId;
      startX = lastX = event.clientX;
      startY = lastY = event.clientY;
      interacted = true;
      focusAnim = null;
      yawVelocity = 0;
      pitchVelocity = 0;
      didDragRef.current = 0;
      setDragging(true);
    };

    const onPointerMove = (event) => {
      if (!pointerDown || event.pointerId !== pointerId) return;

      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;

      if (!captured) {
        const travel = Math.hypot(event.clientX - startX, event.clientY - startY);
        if (travel < 4) return;
        captured = true;
        pointerMoved = true;
        didDragRef.current = performance.now();
        // Capture only once a real drag starts, so a plain click still
        // reaches the pin button underneath the pointer.
        try {
          stage.setPointerCapture(event.pointerId);
        } catch {
          captured = false;
        }
      }

      // Dragging right pushes the surface right: the globe turns the other way.
      const yaw = dx * DRAG_SPEED;
      const pitch = dy * DRAG_SPEED;
      if (rotateBy(pitch, yaw)) {
        yawVelocity = yaw;
        pitchVelocity = pitch;
      }
    };

    const endPointer = (event) => {
      if (!pointerDown) return;
      if (event.pointerId !== pointerId) return;
      if (captured) {
        try {
          stage.releasePointerCapture(event.pointerId);
        } catch {
          // Already released by the browser.
        }
      }
      pointerDown = false;
      captured = false;
      pointerId = null;
      setDragging(false);
      if (!pointerMoved) {
        yawVelocity = 0;
        pitchVelocity = 0;
      }
    };

    const onLostCapture = () => {
      if (!pointerDown) return;
      pointerDown = false;
      captured = false;
      pointerId = null;
      setDragging(false);
    };

    const onWheel = (event) => {
      event.preventDefault();
      interacted = true;
      const unit =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 100 : 1;
      zoomTarget = clamp(
        zoomTarget + event.deltaY * unit * 0.0012,
        ZOOM_MIN,
        ZOOM_MAX
      );
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", endPointer);
    stage.addEventListener("pointercancel", endPointer);
    stage.addEventListener("lostpointercapture", onLostCapture);
    stage.addEventListener("wheel", onWheel, { passive: false });
    // Safety net: a drag that loses capture but not the pointer still ends.
    window.addEventListener("pointerup", endPointer);
    window.addEventListener("pointercancel", endPointer);

    const onContextLost = (event) => {
      event.preventDefault();
      if (disposed) return;
      failed = true;
      stop();
      setStatus("error");
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    // --- external control -------------------------------------------------
    apiRef.current = {
      focus(slug) {
        const site = sitesRef.current.find((entry) => entry.slug === slug);
        if (!site) return;
        const target = new THREE.Quaternion().setFromUnitVectors(
          vectorFor(site),
          forward
        );
        interacted = true;
        yawVelocity = 0;
        pitchVelocity = 0;
        if (reducedRef.current) {
          globeGroup.quaternion.copy(target);
          focusAnim = null;
        } else {
          focusAnim = {
            from: globeGroup.quaternion.clone(),
            to: target,
            start: performance.now(),
          };
        }
      },
      settle() {
        if (!focusAnim) return;
        globeGroup.quaternion.copy(focusAnim.to);
        focusAnim = null;
      },
    };

    // A selected site that arrives with the first render (a deep link) still
    // gets its close-up, once the globe exists to turn.
    if (selectedRef.current) apiRef.current.focus(selectedRef.current);

    if (inView && pageVisible) start();

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", endPointer);
      stage.removeEventListener("pointercancel", endPointer);
      stage.removeEventListener("lostpointercapture", onLostCapture);
      stage.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerup", endPointer);
      window.removeEventListener("pointercancel", endPointer);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      if (apiRef.current) apiRef.current = null;
      texture.dispose();
      geometry.dispose();
      material.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={s.wrap}>
      <div
        ref={stageRef}
        className={s.stage}
        data-status={status}
        data-dragging={dragging ? "true" : "false"}
        role="group"
        aria-label="Earth globe, analogue sites"
        aria-busy={status === "loading"}
      >
        <div className={s.glow} aria-hidden="true" />
        <canvas ref={canvasRef} className={s.canvas} aria-hidden="true" />

        <div className={s.overlay}>
          {sites.map((site, index) => {
            const isSelected = selected === site.slug;
            const dim = filter !== "all" && !site.targets.includes(filter);
            return (
              <button
                key={site.slug}
                ref={(element) => {
                  pinRefs.current[index] = element;
                }}
                type="button"
                className={s.pin}
                style={{ "--pin-delay": `${(index % 6) * 0.37}s` }}
                data-targets={targetKind(site.targets)}
                data-dim={dim ? "true" : "false"}
                data-selected={isSelected ? "true" : "false"}
                data-hidden="true"
                tabIndex={-1}
                aria-label={`${site.name}, ${targetLabel(site.targets)}`}
                onClick={() => {
                  // A drag that ends over a pin must not also select it; a
                  // keyboard click after the drag is still allowed.
                  if (performance.now() - didDragRef.current < 350) return;
                  onSelect?.(site.slug);
                }}
              >
                <span className={s.pulse} aria-hidden="true" />
                <span className={s.dot} aria-hidden="true" />
                {isSelected ? <span className={s.chip}>{site.name}</span> : null}
              </button>
            );
          })}
        </div>

        <div className={s.skeleton} aria-hidden="true">
          <span className={s.skeletonLabel}>Acquiring Earth…</span>
        </div>

        {status === "error" ? (
          <div className={s.failed}>
            <p>Globe unavailable on this device</p>
            <a href="#sites">See all sites</a>
          </div>
        ) : null}
      </div>
      <p className={s.caption}>Drag to rotate · scroll to zoom</p>
    </div>
  );
}
