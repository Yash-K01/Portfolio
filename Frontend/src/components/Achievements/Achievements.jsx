import React from 'react';
import styles from './Achievements.module.css';
import { achievements } from '../../data/portfolioData';
import { useGsapReveal } from '../../hooks/useGsapReveal';

export default function AchievementsSection() {
  const scopeRef = useGsapReveal();

  return (
    <section id="achievements" className="section" ref={scopeRef}>
      <span className="eyebrow" data-reveal>
        Recognition
      </span>
      <h2 className="sectionTitle" data-reveal data-reveal-delay="0.06">
        Achievements
      </h2>

      <div className={styles.achGrid}>
        {achievements.map((item, i) => (
          <div className={`glassPanel ${styles.achCard}`} key={item.id} data-reveal data-reveal-delay={0.1 + i * 0.04}>
            <span className={styles.badge}>
              <TrophyIcon />
            </span>
            <div className={styles.body}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.meta}>
                <span className={styles.issuer}>{item.issuer}</span> · {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrophyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 5H4a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4M17 5h3a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}