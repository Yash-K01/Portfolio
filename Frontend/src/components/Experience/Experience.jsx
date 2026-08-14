import React from 'react';
import styles from './Experience.module.css';
import { experience } from '../../data/portfolioData';
import { useGsapReveal } from '../../hooks/useGsapReveal';

export default function ExperienceSection() {
  const scopeRef = useGsapReveal();

  return (
    <section id="experience" className="section" ref={scopeRef}>
      <span className="eyebrow" data-reveal>
        Where I&apos;ve Worked
      </span>
      <h2 className="sectionTitle" data-reveal data-reveal-delay="0.06">
        Experience
      </h2>

      <div className={styles.expTimeline}>
        {experience.map((job, i) => (
          <div className={styles.expItem} key={job.id} data-reveal data-reveal-delay={0.1 + i * 0.08}>
            <span className={styles.expDot} />
            <div className={`glassPanel ${styles.expCard}`}>
              <div className={styles.expCardTop}>
                <h3 className={styles.expRole}>
                  {job.role} · <span className={styles.expOrg}>{job.org}</span>
                </h3>
                <span className={styles.expDuration}>{job.duration}</span>
              </div>
              <p className={styles.expMeta}>{job.meta}</p>
              <ul className={styles.expPoints}>
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