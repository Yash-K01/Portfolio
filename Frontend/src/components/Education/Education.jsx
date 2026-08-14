import React from 'react';
import styles from './Education.module.css';
import { education } from '../../data/portfolioData';
import { useGsapReveal } from '../../hooks/useGsapReveal';

export default function EducationSection() {
  const scopeRef = useGsapReveal();

  return (
    <section id="education" className="section" ref={scopeRef}>
      <span className="eyebrow" data-reveal>
        Academics
      </span>
      <h2 className="sectionTitle" data-reveal data-reveal-delay="0.06">
        Education
      </h2>

      <div className={styles.eduGrid}>
        {education.map((item, i) => (
          <div className={`glassPanel ${styles.eduCard}`} key={item.id} data-reveal data-reveal-delay={0.1 + i * 0.05}>
            <h3 className={styles.degree}>{item.degree}</h3>
            <p className={styles.school}>{item.school}</p>
            <p className={styles.location}>{item.location}</p>
            <div className={styles.metaRow}>
              <span className={styles.duration}>{item.duration}</span>
              <span className={styles.score}>{item.score}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}