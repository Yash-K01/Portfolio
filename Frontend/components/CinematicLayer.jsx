"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * CinematicLayer
 * A transparent, GPU-light Three.js canvas of warm ember + cool-white
 * bokeh particles drifting on slow sine-wave paths, with subtle camera
 * parallax that follows the pointer. Meant to sit above the video as
 * an ambient atmosphere layer — never interactive, never blocking.
 */
export default function CinematicLayer({ className }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // ---- Scene / camera / renderer -------------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // ---- Soft radial-gradient sprite texture (drawn once) --------------
    const spriteCanvas = document.createElement("canvas");
    const sSize = 128;
    spriteCanvas.width = sSize;
    spriteCanvas.height = sSize;
    const ctx = spriteCanvas.getContext("2d");
    const gradient = ctx.createRadialGradient(
      sSize / 2,
      sSize / 2,
      0,
      sSize / 2,
      sSize / 2,
      sSize / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,255,255,0.55)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, sSize, sSize);
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

    // ---- Particle field ---------------------------------------------
    const COUNT = window.innerWidth < 700 ? 70 : 160;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const basePos = new Float32Array(COUNT * 3);
    const phase = new Float32Array(COUNT);
    const speed = new Float32Array(COUNT);
    const amp = new Float32Array(COUNT);

    const ember = new THREE.Color("#ff8a3d");
    const emberDeep = new THREE.Color("#c24e1d");
    const white = new THREE.Color("#fff4e8");
    const monitor = new THREE.Color("#6f9bff");

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 140;
      const y = (Math.random() - 0.5) * 90;
      const z = (Math.random() - 0.5) * 90 - 10;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = z;

      phase[i] = Math.random() * Math.PI * 2;
      speed[i] = 0.08 + Math.random() * 0.15;
      amp[i] = 2 + Math.random() * 5;

      // Weighted color mix: mostly warm ember/white, occasional cool blue
      const roll = Math.random();
      let c;
      if (roll < 0.5) c = ember;
      else if (roll < 0.75) c = white;
      else if (roll < 0.92) c = emberDeep;
      else c = monitor;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 1.2 + Math.random() * 3.2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 2.4,
      map: spriteTexture,
      transparent: true,
      opacity: 0.55,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ---- Pointer parallax ---------------------------------------------
    const pointer = { x: 0, y: 0 };
    const targetCam = { x: 0, y: 0 };

    function handlePointerMove(e) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.x = nx;
      pointer.y = ny;
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // ---- Resize ---------------------------------------------------------
    function handleResize() {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", handleResize);

    // ---- Visibility guard (pause when tab hidden) -----------------------
    let isVisible = true;
    function handleVisibility() {
      isVisible = document.visibilityState === "visible";
    }
    document.addEventListener("visibilitychange", handleVisibility);

    // ---- Animation loop ---------------------------------------------
    const clock = new THREE.Clock();
    let rafId;

    function animate() {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      const posAttr = geometry.attributes.position;

      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        posAttr.array[ix] =
          basePos[ix] + Math.sin(t * speed[i] + phase[i]) * amp[i] * 0.6;
        posAttr.array[ix + 1] =
          basePos[ix + 1] + Math.cos(t * speed[i] * 0.8 + phase[i]) * amp[i];
        posAttr.array[ix + 2] =
          basePos[ix + 2] + Math.sin(t * speed[i] * 0.5 + phase[i]) * amp[i] * 0.4;
      }
      posAttr.needsUpdate = true;

      // Smooth camera parallax toward pointer target
      targetCam.x += (pointer.x * 6 - targetCam.x) * 0.02;
      targetCam.y += (-pointer.y * 4 - targetCam.y) * 0.02;
      camera.position.x = targetCam.x;
      camera.position.y = targetCam.y;
      camera.lookAt(0, 0, 0);

      points.rotation.y = Math.sin(t * 0.02) * 0.05;

      renderer.render(scene, camera);
    }
    animate();

    // ---- Cleanup ---------------------------------------------------------
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      geometry.dispose();
      material.dispose();
      spriteTexture.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
