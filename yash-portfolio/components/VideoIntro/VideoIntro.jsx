"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./VideoIntro.module.css";
import CinematicLayer from "../CinematicLayer/CinematicLayer";
import { profile } from "@/data/portfolioData";

/**
 * Cinematic hero: foreground talking-head video (Yash's uploaded clip)
 * layered over its own blurred, tinted duplicate as ambient background.
 *
 * Drop your own clip at /public/videos/hero.mp4 to replace the sample —
 * everything below (autoplay, blur duplicate, controls) works unchanged.
 */
export default function VideoIntro() {
  const heroRef = useRef(null);
  const fgVideoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showTapBadge, setShowTapBadge] = useState(true);

  // Entrance animation — GSAP staggered fade/rise timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(`.${styles.fgVideoFrame}`, { opacity: 1, duration: 1.4 })
        .to(`.${styles.tagline}`, { opacity: 1, y: 0, duration: 0.9 }, "-=0.9")
        .fromTo(
          `.${styles.nameLine}`,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.14 },
          "-=0.6"
        )
        .to(`.${styles.subtitle}`, { opacity: 1, y: 0, duration: 0.9 }, "-=0.5")
        .to(`.${styles.description}`, { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")
        .to(`.${styles.controls}`, { opacity: 1, duration: 0.7 }, "-=0.5")
        .to(`.${styles.scrollIndicator}`, { opacity: 1, duration: 0.7 }, "-=0.4");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Auto-hide the "tap for sound" badge after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTapBadge(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  // Keep foreground + background video in sync
  useEffect(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;

    const syncBg = () => {
      if (Math.abs(bg.currentTime - fg.currentTime) > 0.15) {
        bg.currentTime = fg.currentTime;
      }
    };
    fg.addEventListener("timeupdate", syncBg);
    return () => fg.removeEventListener("timeupdate", syncBg);
  }, []);

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
    setShowTapBadge(false);
  }

  function handleScrollDown() {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="hero" ref={heroRef} className={styles.hero} aria-label="Introduction">
      {/* Ambient blurred duplicate background */}
      <div className={styles.bgVideoWrap}>
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className={styles.bgTint} />
      </div>

      {/* Three.js bokeh / particle atmosphere */}
      <CinematicLayer />

      {/* Foreground talking-head video */}
      <div className={styles.fgStage}>
        <div className={styles.fgVideoFrame}>
          <video
            ref={fgVideoRef}
            className={styles.fgVideo}
            src="/videos/hero.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            aria-label="Yash Khartode introduction video"
          />
          <div className={styles.fgGradient} />
          <div className={styles.fgEdgeGlow} />
        </div>
      </div>

      <div className={styles.overlay} />
      <div className={styles.vignette} />
      <div className={styles.grain} />

      {/* Text content */}
      <div className={styles.content}>
        <p className={styles.tagline}>{profile.tagline}</p>
        <div className={styles.nameStack}>
          <span className={styles.nameLine}>{profile.name.first}</span>
          <span className={styles.nameLine}>{profile.name.last}</span>
        </div>
        <p className={styles.subtitle}>{profile.subtitle}</p>
        <p className={styles.description}>{profile.description}</p>
      </div>

      {/* Tap for sound badge */}
      <div className={`${styles.tapBadge} ${!showTapBadge ? styles.hidden : ""}`}>
        <span className={styles.tapDot} />
        Tap for sound
      </div>

      {/* Glassmorphism controls */}
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <IconPause /> : <IconPlay />}
        </button>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <IconMuted /> : <IconSound />}
        </button>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        className={styles.scrollIndicator}
        onClick={handleScrollDown}
        aria-label="Scroll to explore"
      >
        <span className={styles.scrollLabel}>Scroll to explore</span>
        <span className={styles.scrollLine} />
      </button>
    </section>
  );
}

function IconPlay() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function IconPause() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}
function IconSound() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12z" />
    </svg>
  );
}
function IconMuted() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 10v4h4l5 5V5L7 10H3zm13.59 2 2.7-2.71-1.41-1.41-2.7 2.7-2.7-2.7-1.41 1.41L13.77 12l-2.7 2.71 1.41 1.41 2.7-2.7 2.7 2.7 1.41-1.41z" />
    </svg>
  );
}
