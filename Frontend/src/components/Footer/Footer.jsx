import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  function scrollTop(e) {
    e.preventDefault();
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <p className={styles.title}>Designed &amp; Developed by Yash Khartode</p>
      <p className={styles.subtext}>
        Building intelligent software with AI, cloud, and modern web technologies.
      </p>
      <a href="#hero" className={styles.backTop} onClick={scrollTop}>
        ↑ Back to top
      </a>
    </footer>
  );
}