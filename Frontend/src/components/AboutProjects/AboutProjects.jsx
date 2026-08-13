import React, { useRef } from 'react';
import styles from './AboutProjects.module.css';
import { profile, projects, skills } from '../../data/portfolioData';
import { useGsapReveal } from '../../hooks/useGsapReveal';

const skillCount = Object.values(skills).flat().length;

export default function AboutProjects() {
  const scopeRef = useGsapReveal();

  return (
    <>
      {/* About Section - First */}
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

      {/* Projects Section - Second */}
      <section id="projects" className="section">
        <span className="eyebrow" data-reveal>
          Selected Work
        </span>
        <h2 className="sectionTitle" data-reveal data-reveal-delay="0.06">
          Projects
        </h2>

        <div className={styles.projectsGrid}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={0.1 + i * 0.05} />
          ))}
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project, delay }) {
  const cardRef = useRef(null);

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -6;
    const rotateY = ((x - rect.width / 2) / rect.width) * 6;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  }

  return (
    <article
      ref={cardRef}
      className={`glassPanel ${styles.projectCard}`}
      data-reveal
      data-reveal-delay={delay}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.projectCardGlow} />
      <div className={styles.projectCardHeader}>
        <h3 className={styles.projectCardTitle}>{project.title}</h3>
        <span className={styles.projectCardDuration}>{project.duration}</span>
      </div>

      <ul className={styles.projectCardPoints}>
        {project.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <div className={styles.projectStack}>
        {project.stack.map((tech) => (
          <span key={tech} className={styles.projectStackPill}>
            {tech}
          </span>
        ))}
      </div>

      <div className={styles.projectCardActions}>
        <a
          className={styles.projectActionBtn}
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className={`${styles.projectActionBtn} ${styles.projectActionBtnPrimary}`}
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
        >
          Live Demo
        </a>
      </div>
    </article>
  );
}
