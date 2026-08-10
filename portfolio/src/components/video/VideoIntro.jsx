"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CinematicLayer from "../cinematic/CinematicLayer";
import styles from "./VideoIntro.module.css";

export default function VideoIntro({
  eyebrow,
  firstName,
  lastName,
  subtitle,
  videoSrc,
}) {
  const sectionRef = useRef(null);
  const fgVideoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const hintRef = useRef(null);
  const rootTl = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hintVisible, setHintVisible] = useState(true);

  // ---- GSAP entrance sequence ------------------------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.set(sectionRef.current, { opacity: 0 })
        .to(sectionRef.current, { opacity: 1, duration: 1.1 })
        .from(
          `.${styles.frame}`,
          { scale: 1.06, duration: 1.8, ease: "power2.out" },
          "<"
        )
        .from(
          `.${styles.eyebrow}`,
          { y: 16, opacity: 0, duration: 0.7 },
          "-=1.1"
        )
        .from(
          `.${styles.nameLine}`,
          { y: "110%", opacity: 0, duration: 1, stagger: 0.12, ease: "power4.out" },
          "-=0.4"
        )
        .from(
          `.${styles.subtitle}`,
          { y: 14, opacity: 0, duration: 0.8 },
          "-=0.5"
        )
        .from(
          `.${styles.controls}`,
          { y: 10, opacity: 0, duration: 0.6 },
          "-=0.4"
        )
        .from(
          `.${styles.scrollIndicator}`,
          { y: 10, opacity: 0, duration: 0.6 },
          "-=0.3"
        )
        .from(
          `.${styles.soundHint}`,
          { y: 8, opacity: 0, duration: 0.5 },
          "-=0.3"
        );

      rootTl.current = tl;
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ---- Auto-hide the "tap for sound" hint --------------------------------
  useEffect(() => {
    const timer = setTimeout(() => {
      setHintVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hintRef.current) return;
    gsap.to(hintRef.current, {
      opacity: hintVisible ? 1 : 0,
      y: hintVisible ? 0 : 8,
      duration: 0.5,
      ease: "power2.out",
      pointerEvents: hintVisible ? "auto" : "none",
    });
  }, [hintVisible]);

  // ---- Controls -----------------------------------------------------------
  function togglePlay() {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg) return;

    if (isPlaying) {
      fg.pause();
      bg?.pause();
    } else {
      fg.play();
      bg?.play();
    }
    setIsPlaying(!isPlaying);
  }

  function toggleMute() {
    const fg = fgVideoRef.current;
    if (!fg) return;
    fg.muted = !fg.muted;
    setIsMuted(fg.muted);
    setHintVisible(false);
  }

  function handleScrollDown() {
    const target = document.getElementById("next-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.frame}>
        {/* Blurred ambient background layer */}
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />

        {/* Foreground video */}
        <video
          ref={fgVideoRef}
          className={styles.fgVideo}
          src={videoSrc}
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />

        {/* Cinematic gradient overlays */}
        <div className={styles.vignette} />
        <div className={styles.gradientBottom} />
        <div className={styles.gradientTop} />
        <div className={styles.grain} />

        {/* Three.js ambient particle layer */}
        <CinematicLayer className={styles.particleLayer} />

        {/* Content */}
        <div className={styles.content}>
          <span className={styles.eyebrow}>{eyebrow}</span>

          <h1 className={styles.name} aria-label={`${firstName} ${lastName}`}>
            <span className={styles.nameLineWrap}>
              <span className={styles.nameLine}>{firstName}</span>
            </span>
            <span className={styles.nameLineWrap}>
              <span className={styles.nameLine}>{lastName}</span>
            </span>
          </h1>

          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.glassButton}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            className={styles.glassButton}
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <MutedIcon /> : <UnmutedIcon />}
          </button>
        </div>

        {/* Tap for sound badge */}
        <button
          ref={hintRef}
          type="button"
          className={styles.soundHint}
          onClick={toggleMute}
        >
          <span className={styles.soundHintPulse} />
          <span className={styles.soundHintLabel}>Tap for sound</span>
        </button>

        {/* Scroll indicator */}
        <button
          type="button"
          className={styles.scrollIndicator}
          onClick={handleScrollDown}
          aria-label="Scroll to next section"
        >
          <span className={styles.scrollLabel}>Scroll</span>
          <span className={styles.scrollTrack}>
            <span className={styles.scrollPulse} />
          </span>
        </button>
      </div>
    </section>
  );
}

/* ---- Inline icon set (no external deps) ------------------------------- */

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 2.5v11l10-5.5-10-5.5z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3.5" y="2.5" width="3" height="11" rx="0.8" fill="currentColor" />
      <rect x="9.5" y="2.5" width="3" height="11" rx="0.8" fill="currentColor" />
    </svg>
  );
}

function UnmutedIcon() {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
      <path
        d="M2 6h2.8L9 3v10L4.8 10H2V6z"
        fill="currentColor"
      />
      <path
        d="M11.2 5.2a4 4 0 0 1 0 5.6M13 3.4a7 7 0 0 1 0 9.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
      <path d="M2 6h2.8L9 3v10L4.8 10H2V6z" fill="currentColor" />
      <path
        d="M11.5 6.2 15 9.8M15 6.2l-3.5 3.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
