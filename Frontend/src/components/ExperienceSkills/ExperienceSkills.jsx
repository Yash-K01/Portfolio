import React from 'react';
import styles from './ExperienceSkills.module.css';
import { experience, skills } from '../../data/portfolioData';
import { useGsapReveal } from '../../hooks/useGsapReveal';

// Maps each skill name from portfolioData to its Simple Icons slug so a
// matching logo can be rendered. Skills without a recognized brand mark
// (generic terms like "SQL") simply render without a logo image — no
// skill is ever dropped from the list.
const SKILL_ICON_SLUGS = {
  Python: 'python',
  JavaScript: 'javascript',
  HTML5: 'html5',
  CSS3: 'css3',
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
  'VS Code': 'visualstudiocode',
  'Power BI': 'powerbi',
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

export default function ExperienceSkills() {
  const scopeRef = useGsapReveal();
  const skillRows = buildSkillRows(skills);
  const rowDirections = ['dirLeft', 'dirRight', 'dirLeft'];

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

function SkillLogoPill({ label }) {
  const slug = SKILL_ICON_SLUGS[label];

  return (
    <span className={styles.skillLogoPill}>
      {slug && (
        <img
          className={styles.skillLogoIcon}
          src={`https://cdn.simpleicons.org/${slug}/ffffff`}
          alt=""
          loading="lazy"
          aria-hidden="true"
        />
      )}
      <span className={styles.skillLogoLabel}>{label}</span>
    </span>
  );
}
