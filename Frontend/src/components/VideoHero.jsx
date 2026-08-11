import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import CinematicLayer from './CinematicLayer';
import styles from './VideoHero.module.css';
import videoSrc from '/portfolio-video.mp4?url';

const NAV_LINKS = ['Projects', 'Skills', 'Experience', 'Education', 'Achievements', 'Contact'];

export default function VideoHero({ isActive }) {
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const fgVideoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const taglineRef = useRef(null);
  const nameRef = useRef(null);
  const ctaRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Toggle mute/unmute
  const toggleMute = () => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (fg && bg) {
      fg.muted = !fg.muted;
      bg.muted = !bg.muted;
      setIsMuted(fg.muted);
    }
  };

  useEffect(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;

    // Start video muted (always allowed by browser)
    const startVideos = async () => {
      try {
        if (fg) {
          fg.muted = true;
          fg.currentTime = 0;
          await fg.play();
        }
        if (bg) {
          bg.muted = true;
          bg.currentTime = 0;
          await bg.play();
        }
      } catch (error) {
        console.error('Failed to start video:', error);
      }
    };

    // Unmute when splash screen is done
    const unmuteVideos = () => {
      if (fg && bg && isActive) {
        fg.muted = false;
        bg.muted = false;
        setIsMuted(false);
      }
    };

    // Start playing muted immediately
    startVideos();

    // Unmute when splash completes
    if (isActive) {
      unmuteVideos();
    }

    // Stop at last frame when video ends
    const holdLastFrame = (video) => () => {
      if (!video) return;
      video.pause();
      video.currentTime = Math.max(0, video.duration - 0.05);
    };
    
    const fgHandler = holdLastFrame(fg);
    const bgHandler = holdLastFrame(bg);
    fg?.addEventListener('ended', fgHandler);
    bg?.addEventListener('ended', bgHandler);

    // Animation sequence
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1.1 })
      .fromTo(navRef.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.6')
      .fromTo(taglineRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
      .fromTo(nameRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.35')
      .fromTo(ctaRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');

    return () => {
      fg?.removeEventListener('ended', fgHandler);
      bg?.removeEventListener('ended', bgHandler);
      tl.kill();
      fg?.pause();
      bg?.pause();
    };
  }, [isActive]);

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Background video */}
      <video
        ref={bgVideoRef}
        className={styles.bgVideo}
        src={videoSrc}
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Foreground video */}
      <video
        ref={fgVideoRef}
        className={styles.fgVideo}
        src={videoSrc}
        playsInline
        preload="auto"
      />

      {/* Mute/Unmute Button - Top Right Corner */}
      <button 
        onClick={toggleMute} 
        className={styles.muteButton}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      {/* Rest of your UI */}
      <div className={styles.vignette} />
      <div className={styles.gradientBottom} />
      <div className={styles.gradientTop} />
      <CinematicLayer />

      <nav ref={navRef} className={styles.nav}>
        <div className={styles.logo}>YK</div>
        <ul className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className={styles.navLink}>
                {link}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className={styles.connectBtn}>
          Connect
        </a>
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