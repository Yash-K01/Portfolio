"use client";

import { useRef } from "react";
import styles from "./Projects.module.css";
import { projects } from "@/data/portfolioData";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export default function Projects() {
  const scopeRef = useGsapReveal();

  return (
    <section id="projects" className="section" ref={scopeRef}>
      <span className="eyebrow" data-reveal>
        Selected Work
      </span>
      <h2 className="sectionTitle" data-reveal data-reveal-delay="0.06">
        Projects
      </h2>

      <div className={styles.grid}>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} delay={0.1 + i * 0.05} />
        ))}
      </div>
    </section>
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
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <article
      ref={cardRef}
      className={`glassPanel ${styles.card}`}
      data-reveal
      data-reveal-delay={delay}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cardGlow} />
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <span className={styles.cardDuration}>{project.duration}</span>
      </div>

      <ul className={styles.cardPoints}>
        {project.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <div className={styles.stack}>
        {project.stack.map((tech) => (
          <span key={tech} className={styles.stackPill}>
            {tech}
          </span>
        ))}
      </div>

      <div className={styles.cardActions}>
        <a
          className={styles.actionBtn}
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className={`${styles.actionBtn} ${styles.primary}`}
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
