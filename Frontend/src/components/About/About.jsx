import React from 'react';
import styles from './About.module.css';
import { profile, projects, skills } from '../../data/portfolioData';
import { useGsapReveal } from '../../hooks/useGsapReveal';

const skillCount = Object.values(skills).flat().length;

export default function About() {
  const scopeRef = useGsapReveal();

  return (
    <section id="about" className={`section ${styles.about}`} ref={scopeRef}>
      <span className="eyebrow" data-reveal>
        Who I Am
      </span>
      <h2 className="sectionTitle" data-reveal data-reveal-delay="0.08">
        About Me
      </h2>

      <div className={styles.grid}>
        <p className={styles.copy} data-reveal data-reveal-delay="0.16">
          {profile.about}
        </p>

        <div className={`glassPanel ${styles.statsPanel}`} data-reveal data-reveal-delay="0.22">
          <div className={styles.stat}>
            <span className={styles.statValue}>{projects.length}</span>
            <span className={styles.statLabel}>Projects Shipped</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{skillCount}+</span>
            <span className={styles.statLabel}>Technologies</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>2</span>
            <span className={styles.statLabel}>Internships</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>5</span>
            <span className={styles.statLabel}>Certifications</span>
          </div>
        </div>
      </div>
    </section>
  );
}