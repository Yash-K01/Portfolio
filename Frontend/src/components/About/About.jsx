import React from 'react';
import styles from './About.module.css';
import { profile, projects, skills } from '../../data/portfolioData';
import { useGsapReveal } from '../../hooks/useGsapReveal';

const skillCount = Object.values(skills).flat().length;

export default function AboutSection() {
  const scopeRef = useGsapReveal();

  return (
    <section id="about" className={`section ${styles.about}`} ref={scopeRef}>
      <span className="eyebrow" data-reveal>
        Who I Am
      </span>
      <h2 className="sectionTitle" data-reveal data-reveal-delay="0.08">
        About Me
      </h2>

      <div className={styles.aboutGrid}>
        <p className={styles.aboutCopy} data-reveal data-reveal-delay="0.16">
          {profile.about}
        </p>

        <div className={`glassPanel ${styles.aboutStatsPanel}`} data-reveal data-reveal-delay="0.22">
          <div className={styles.aboutStat}>
            <span className={styles.aboutStatValue}>{projects.length}</span>
            <span className={styles.aboutStatLabel}>Projects Shipped</span>
          </div>
          <div className={styles.aboutStat}>
            <span className={styles.aboutStatValue}>{skillCount}+</span>
            <span className={styles.aboutStatLabel}>Technologies</span>
          </div>
          <div className={styles.aboutStat}>
            <span className={styles.aboutStatValue}>2</span>
            <span className={styles.aboutStatLabel}>Internships</span>
          </div>
          <div className={styles.aboutStat}>
            <span className={styles.aboutStatValue}>5</span>
            <span className={styles.aboutStatLabel}>Certifications</span>
          </div>
        </div>
      </div>
    </section>
  );
}