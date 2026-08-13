import React, { useRef } from 'react';
import styles from './ExperienceSkills.module.css';
import { experience, skills } from '../../data/portfolioData';
import { useGsapReveal } from '../../hooks/useGsapReveal';

export default function ExperienceSkills() {
  const scopeRef = useGsapReveal();

  return (
    <>
      {/* Skills Section - First */}
      <section id="skills" className="section" ref={scopeRef}>
        <span className="eyebrow" data-reveal>
          Toolkit
        </span>
        <h2 className="sectionTitle" data-reveal data-reveal-delay="0.06">
          Skills
        </h2>

        <div className={styles.skillsCategories}>
          {Object.entries(skills).map(([category, items], i) => (
            <div className={styles.skillsCategory} key={category} data-reveal data-reveal-delay={0.1 + i * 0.05}>
              <span className={styles.skillsCategoryLabel}>{category}</span>
              <div className={styles.skillsPillRow}>
                {items.map((item) => (
                  <MagneticPill key={item} label={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section - Second */}
      <section id="experience" className="section">
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
    </>
  );
}

function MagneticPill({ label }) {
  const ref = useRef(null);

  function handleMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px) translateY(-6px) scale(1.06)`;
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  }

  return (
    <span
      ref={ref}
      className={styles.skillsPill}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </span>
  );
}
