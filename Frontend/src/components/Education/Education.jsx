import React from 'react';
import styles from './EducationAchievements.module.css';
import { education, achievements } from '../../data/portfolioData';
import { useGsapReveal } from '../../hooks/useGsapReveal';

export default function EducationAchievements() {
  const scopeRef = useGsapReveal();

  return (
    <>
      {/* Education Section */}
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

      {/* Achievements Section */}
      <section id="achievements" className="section">
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
    </>
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
