"use client";

import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { navItems } from "@/data/portfolioData";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = navItems.map((item) => item.href.replace("#", ""));
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(e, href) {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <a
            href="#hero"
            className={styles.logo}
            onClick={(e) => handleNavClick(e, "#hero")}
          >
            <span className={styles.logoDot} />
            YK
          </a>

          <nav className={styles.links}>
            {navItems.slice(1).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.link} ${
                  activeId === item.href.replace("#", "") ? styles.active : ""
                }`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className={styles.menuToggle}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`${styles.link} ${
                activeId === item.href.replace("#", "") ? styles.active : ""
              }`}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label === "YK" ? "Home" : item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
