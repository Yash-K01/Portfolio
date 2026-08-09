"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A slow, dreamy bokeh/particle field rendered with Three.js.
 * Warm ember + soft white points, additive blending, mouse parallax.
 * Designed to feel like a movie title card — not a game effect.
 */
export default function CinematicLayer({ particleCount = 140 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Build particle geometry -------------------------------------
    const count = prefersReducedMotion ? Math.round(particleCount * 0.4) : particleCount;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count); // per-particle phase offset
    const sizes = new Float32Array(count);
    const colorMix = new Float32Array(count); // 0 = ember, 1 = white

    const emberColor = new THREE.Color("#ff8a3d");
    const whiteColor = new THREE.Color("#fff3e6");
    const blueColor = new THREE.Color("#8fc7ff");

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 22; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
      seeds[i] = Math.random() * Math.PI * 2;
      sizes[i] = Math.random() * 2.6 + 0.6;
      colorMix[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Soft circular sprite generated on a canvas (cheap, no image asset needed)
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = 64;
    spriteCanvas.height = 64;
    const ctx = spriteCanvas.getContext("2d");
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,220,180,0.55)");
    gradient.addColorStop(1, "rgba(255,180,120,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

    const material = new THREE.PointsMaterial({
      size: 0.55,
      map: spriteTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      opacity: 0.85,
    });

    // Assign per-particle colors (ember / warm-white / a rare cool blue accent)
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = colorMix[i];
      const base = t > 0.88 ? blueColor : t > 0.5 ? whiteColor : emberColor;
      colors[i * 3 + 0] = base.r;
      colors[i * 3 + 1] = base.g;
      colors[i * 3 + 2] = base.b;
    }
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Mouse parallax -------------------------------------------------
    const mouse = { x: 0, y: 0 };
    const targetCamera = { x: 0, y: 0 };

    function handlePointerMove(e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    // --- Resize -----------------------------------------------------------
    function handleResize() {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", handleResize);

    // --- Animate ----------------------------------------------------------
    let rafId;
    const clock = new THREE.Clock();
    const posAttr = geometry.getAttribute("position");

    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        for (let i = 0; i < count; i++) {
          const seed = seeds[i];
          const baseY = positions[i * 3 + 1];
          const baseX = positions[i * 3 + 0];
          posAttr.array[i * 3 + 1] = baseY + Math.sin(t * 0.25 + seed) * 0.6;
          posAttr.array[i * 3 + 0] = baseX + Math.cos(t * 0.18 + seed) * 0.4;
        }
        posAttr.needsUpdate = true;

        targetCamera.x += (mouse.x * 0.8 - targetCamera.x) * 0.02;
        targetCamera.y += (-mouse.y * 0.5 - targetCamera.y) * 0.02;
        camera.position.x = targetCamera.x;
        camera.position.y = targetCamera.y;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    }
    animate();

    // --- Cleanup ------------------------------------------------------------
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      geometry.dispose();
      material.dispose();
      spriteTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [particleCount]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        mixBlendMode: "screen",
      }}
    />
  );
}
