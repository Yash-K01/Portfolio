import React, { useState } from 'react';
import styles from './Contact.module.css';
import { profile } from '../../data/portfolioData';
import { useGsapReveal } from '../../hooks/useGsapReveal';

export default function Contact() {
  const scopeRef = useGsapReveal();
  const [copiedKey, setCopiedKey] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', text: '' });

  async function handleCopy(key, value) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // Clipboard API unavailable — fail silently
    }
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'loading', text: '' });
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus({ state: 'success', text: "Message sent — thank you! I'll reply soon." });
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus({
        state: 'error',
        text: "Couldn't send right now. Please email me directly instead.",
      });
    }
  }

  return (
    <section id="contact" className="section" ref={scopeRef}>
      <span className="eyebrow" data-reveal>
        Let&apos;s Connect
      </span>
      <h2 className="sectionTitle" data-reveal data-reveal-delay="0.06">
        Contact
      </h2>

      <div className={styles.grid}>
        <div className={`glassPanel ${styles.infoCard}`} data-reveal data-reveal-delay="0.12">
          <h3 className={styles.name}>{profile.name.first} {profile.name.last}</h3>

          <div className={styles.rows}>
            <button
              type="button"
              className={`${styles.row} ${styles.clickable}`}
              onClick={() => handleCopy('email', profile.email)}
            >
              <span className={styles.rowIcon}><MailIcon /></span>
              <span className={styles.rowText}>
                <span className={styles.rowLabel}>Email</span>
                <span className={styles.rowValue}>{profile.email}</span>
              </span>
              {copiedKey === 'email' && <span className={styles.copiedTag}>Copied</span>}
            </button>

            <button
              type="button"
              className={`${styles.row} ${styles.clickable}`}
              onClick={() => handleCopy('phone', profile.phone)}
            >
              <span className={styles.rowIcon}><PhoneIcon /></span>
              <span className={styles.rowText}>
                <span className={styles.rowLabel}>Phone</span>
                <span className={styles.rowValue}>{profile.phone}</span>
              </span>
              {copiedKey === 'phone' && <span className={styles.copiedTag}>Copied</span>}
            </button>

            <div className={styles.row}>
              <span className={styles.rowIcon}><PinIcon /></span>
              <span className={styles.rowText}>
                <span className={styles.rowLabel}>Location</span>
                <span className={styles.rowValue}>{profile.location}</span>
              </span>
            </div>
          </div>

          <div className={styles.socials}>
            <a className={styles.socialBtn} href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className={styles.socialBtn} href={profile.links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className={styles.socialBtn} href={profile.links.portfolio} target="_blank" rel="noopener noreferrer">
              Portfolio
            </a>
          </div>
        </div>

        <form className={`glassPanel ${styles.formCard}`} onSubmit={handleSubmit} data-reveal data-reveal-delay="0.18">
          <h3 className={styles.formTitle}>Send a message</h3>

          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Your name" />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" />
          </div>

          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required value={form.message} onChange={handleChange} placeholder="Tell me about your project or role..." />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={status.state === 'loading'}>
            {status.state === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {status.text && (
            <p className={`${styles.statusMsg} ${status.state === 'success' ? styles.success : styles.error}`}>
              {status.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}