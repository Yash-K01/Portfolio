import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './SplashScreen.module.css';

/**
 * Cinematic splash / preloader.
 * Counts 1 -> 100, fills a progress bar in lockstep, then reveals a
 * "Welcome" message before handing off to the main experience.
 *
 * Props:
 *  - onComplete: () => void   called once the exit transition finishes
 */
export default function SplashScreen({ onComplete }) {
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const welcomeRef = useRef(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const counter = { value: 1 };
    const tl = gsap.timeline();

    // 1 -> 100 count, driving both the number and the progress bar
    tl.to(counter, {
      value: 100,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(counter.value);
        setCount(v);
        if (barRef.current) barRef.current.style.width = `${v}%`;
      },
    })
      // brief hold, number settles
      .to(countRef.current, {
        scale: 0.92,
        opacity: 0,
        duration: 0.35,
        ease: 'power1.out',
      })
      // welcome fades/rises in
      .fromTo(
        welcomeRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.1'
      )
      .to({}, { duration: 0.55 }) // hold on welcome
      // whole splash fades + lifts away
      .to(rootRef.current, {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: () => onComplete?.(),
      });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={rootRef} className={styles.splash} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.center}>
        <div ref={countRef} className={styles.count}>
          {String(count).padStart(2, '0')}
        </div>
        <div ref={welcomeRef} className={styles.welcome}>
          Welcome
        </div>
      </div>

      <div className={styles.barTrack}>
        <div ref={barRef} className={styles.barFill} style={{ width: '1%' }} />
      </div>

      <div className={styles.caption}>Loading the workspace</div>
    </div>
  );
}
