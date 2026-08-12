import React from 'react';
import styles from './Experience.module.css';
import { experience } from '../../data/portfolioData';
import { useGsapReveal } from '../../hooks/useGsapReveal';

export default function Experience() {
  const scopeRef = useGsapReveal();

  return (
    <section id="experience" className="section" ref={scopeRef}>
      <span className="eyebrow" data-reveal>
        Where I&apos;ve Worked
      </span>
      <h2 className="sectionTitle" data-reveal data-reveal-delay="0.06">
        Experience
      </h2>

      <div className={styles.timeline}>
        {experience.map((job, i) => (
          <div className={styles.item} key={job.id} data-reveal data-reveal-delay={0.1 + i * 0.08}>
            <span className={styles.dot} />
            <div className={`glassPanel ${styles.card}`}>
              <div className={styles.cardTop}>
                <h3 className={styles.role}>
                  {job.role} · <span className={styles.org}>{job.org}</span>
                </h3>
                <span className={styles.duration}>{job.duration}</span>
              </div>
              <p className={styles.meta}>{job.meta}</p>
              <ul className={styles.points}>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}