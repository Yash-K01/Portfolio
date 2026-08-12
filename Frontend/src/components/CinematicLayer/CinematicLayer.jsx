import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './CinematicLayer.module.css';

const PARTICLE_COUNT = 140;

/**
 * Transparent, full-viewport Three.js overlay that renders slow-floating
 * warm-orange / white bokeh particles with additive blending and a gentle
 * mouse-parallax camera drift. Purely decorative — pointer-events: none.
 */
export default function CinematicLayer() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // --- scene / camera / renderer -----------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // --- soft radial-gradient sprite for bokeh dots -------------------
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 128;
    spriteCanvas.height = 128;
    const ctx = spriteCanvas.getContext('2d');
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.35, 'rgba(255,255,255,0.55)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

    // --- particle geometry ---------------------------------------------
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT); // for sine offsets
    const speeds = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const warmOrange = new THREE.Color('#c24e1d');
    const softWhite = new THREE.Color('#fff4e8');
    const mint = new THREE.Color('#6f9bff');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 34;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 18;

      seeds[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.15 + Math.random() * 0.25;

      // mostly warm tones, a rare mint accent for depth
      const mixColor =
        Math.random() < 0.12 ? mint : warmOrange.clone().lerp(softWhite, Math.random());
      colors[i3] = mixColor.r;
      colors[i3 + 1] = mixColor.g;
      colors[i3 + 2] = mixColor.b;

      sizes[i] = 0.6 + Math.random() * 1.8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 1,
      map: spriteTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const basePositions = positions.slice();

    // --- mouse parallax state ------------------------------------------
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };

    const handlePointerMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // --- resize ----------------------------------------------------------
    const handleResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // --- render loop -------------------------------------------------------
    let frameId;
    const clock = new THREE.Clock();

    const tick = () => {
      const t = clock.getElapsedTime();
      const posAttr = geometry.attributes.position;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const s = seeds[i];
        const sp = speeds[i];
        posAttr.array[i3] = basePositions[i3] + Math.sin(t * sp + s) * 1.4;
        posAttr.array[i3 + 1] = basePositions[i3 + 1] + Math.sin(t * sp * 0.7 + s * 1.3) * 1.1;
        posAttr.array[i3 + 2] = basePositions[i3 + 2] + Math.cos(t * sp * 0.5 + s) * 0.8;
      }
      posAttr.needsUpdate = true;

      // smooth camera parallax drift toward pointer
      eased.x += (pointer.x - eased.x) * 0.02;
      eased.y += (pointer.y - eased.y) * 0.02;
      camera.position.x = eased.x * 1.6;
      camera.position.y = -eased.y * 1.0;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };
    tick();

    // --- cleanup -------------------------------------------------------
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      spriteTexture.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={styles.layer} />;
}
