import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import CinematicLayer from '../CinematicLayer/CinematicLayer';
import styles from './VideoHero.module.css';
import videoSrc from '/portfolio-video.mp4?url';

const NAV_LINKS = ['About','Projects', 'Skills', 'Experience', 'Education', 'Achievements', 'Contact'];

// Mute/Unmute Icons
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

// Custom hook for video mute functionality
export function useVideoMute(fgVideoRef) {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = useCallback((event) => {
    event?.preventDefault();

    const fg = fgVideoRef.current;
    if (!fg) return;

    fg.muted = !fg.muted;
    setIsMuted(fg.muted);
  }, [fgVideoRef]);

  return { isMuted, toggleMute };
}

// Mute Button Component
function MuteButton({ isMuted, toggleMute }) {
  return (
    <button
      type="button"
      className={styles.muteButton}
      onClick={(event) => toggleMute(event)}
      aria-label={isMuted ? "Unmute video" : "Mute video"}
    >
      {isMuted ? <MutedIcon /> : <UnmutedIcon />}
    </button>
  );
}

export default function VideoHero() {
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const fgVideoRef = useRef(null);
  const taglineRef = useRef(null);
  const nameRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Use the custom hook
  const { isMuted, toggleMute } = useVideoMute(fgVideoRef);

  useEffect(() => {
    const fg = fgVideoRef.current;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1.1 })
      .fromTo(navRef.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.6')
      .fromTo(taglineRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
      .fromTo(nameRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.35')
      .fromTo(ctaRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Foreground video */}
      <video
        ref={fgVideoRef}
        className={styles.fgVideo}
        src={videoSrc}
        playsInline
        preload="auto"
        muted
        loop
        autoPlay
      />

      {/* Mute/Unmute Button */}
      <MuteButton isMuted={isMuted} toggleMute={toggleMute} />

      {/* Rest of your UI */}
      <div className={styles.vignette} />
      <div className={styles.gradientBottom} />
      <div className={styles.gradientTop} />
      <CinematicLayer />

      <nav ref={navRef} className={styles.nav}>
        <div className={styles.logo}>YK</div>
        <div>Yash Khartode</div>
        <ul className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className={styles.navLink}>
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.content}>
        <div ref={taglineRef} className={styles.tagline}>
          <span className={styles.dot} />
          AI/ML Engineer &nbsp;·&nbsp; Web Developer
        </div>
        <h1 ref={nameRef} className={styles.name}>
          Yash Khartode
        </h1>
        <div ref={ctaRef} className={styles.ctaRow}>
          <a href="#projects" className={styles.exploreBtn}>
            Explore
          </a>
          <a href="#contact" className={styles.contactBtn}>
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}