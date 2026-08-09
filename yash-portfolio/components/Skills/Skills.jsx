"use client";

import { useRef } from "react";
import styles from "./Skills.module.css";
import { skills } from "@/data/portfolioData";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export default function Skills() {
  const scopeRef = useGsapReveal();

  return (
    <section id="skills" className="section" ref={scopeRef}>
      <span className="eyebrow" data-reveal>
        Toolkit
      </span>
      <h2 className="sectionTitle" data-reveal data-reveal-delay="0.06">
        Skills
      </h2>

      <div className={styles.categories}>
        {Object.entries(skills).map(([category, items], i) => (
          <div className={styles.category} key={category} data-reveal data-reveal-delay={0.1 + i * 0.05}>
            <span className={styles.categoryLabel}>{category}</span>
            <div className={styles.pillRow}>
              {items.map((item) => (
                <MagneticPill key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
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
    el.style.transform = "";
  }

  return (
    <span
      ref={ref}
      className={styles.pill}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </span>
  );
}
