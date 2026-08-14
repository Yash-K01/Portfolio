import React from 'react';
import styles from './Skills.module.css';
import { skills } from '../../data/portfolioData';
import { useGsapReveal } from '../../hooks/useGsapReveal';

// Maps each skill name from portfolioData to its Simple Icons slug so a
// matching logo can be rendered. Skills without a recognized brand mark
// (generic terms like "SQL") simply render without a logo image — no
// skill is ever dropped from the list.
const SKILL_ICON_SLUGS = {
  Python: 'python',
  JavaScript: 'javascript',
  HTML5: 'html5',
  CSS3: 'css',
  'React.js': 'react',
  'Node.js': 'nodedotjs',
  'Express.js': 'express',
  Streamlit: 'streamlit',
  NumPy: 'numpy',
  Pandas: 'pandas',
  'Scikit-Learn': 'scikitlearn',
  MongoDB: 'mongodb',
  MySQL: 'mysql',
  Git: 'git',
  GitHub: 'github',
  'VS Code': null,
  'Power BI': null,
  'Jupyter Notebook': 'jupyter',
  Vercel: 'vercel',
  Render: 'render',
  'Streamlit Community Cloud': 'streamlit',
};

// Flattens every skill from every category (nothing removed, nothing
// renamed) into one list, then deals them round-robin into 3 rows so the
// marquee lanes stay visually balanced.
function buildSkillRows(skillsData) {
  const flat = Object.values(skillsData).flat();
  const rows = [[], [], []];
  flat.forEach((item, i) => rows[i % 3].push(item));
  return rows;
}

export default function SkillsSection() {
  const scopeRef = useGsapReveal();
  const skillRows = buildSkillRows(skills);
  const rowDirections = ['dirLeft', 'dirRight', 'dirLeft'];

  return (
    <section id="skills" className="section" ref={scopeRef}>
      <span className="eyebrow" data-reveal>
        Toolkit
      </span>
      <h2 className="sectionTitle" data-reveal data-reveal-delay="0.06">
        Skills
      </h2>

      <div className={styles.marqueeWrap} data-reveal data-reveal-delay="0.1">
        {skillRows.map((row, i) => (
          <div className={styles.marqueeRow} key={i}>
            <div className={`${styles.marqueeTrack} ${styles[rowDirections[i]]}`}>
              {/* Row rendered twice back-to-back for a seamless scroll loop */}
              {[...row, ...row].map((item, j) => (
                <SkillLogoPill key={`${item}-${j}`} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillLogoPill({ label }) {
  const slug = SKILL_ICON_SLUGS[label];
  const iconSrc = slug ? `https://cdn.simpleicons.org/${slug}?logoColor=ffffff` : null;

  return (
    <span className={styles.skillLogoPill}>
      {iconSrc && (
        <img
          className={styles.skillLogoIcon}
          src={iconSrc}
          alt=""
          loading="lazy"
          aria-hidden="true"
        />
      )}
      <span className={styles.skillLogoLabel}>{label}</span>
    </span>
  );
}