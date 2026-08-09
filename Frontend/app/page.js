import VideoIntro from "../components/VideoIntro";

export default function Home() {
  return (
    <main>
      <VideoIntro
        eyebrow="Frontend Engineer · Interaction Design"
        firstName="Aarav"
        lastName="Mehta"
        subtitle="I build motion-driven interfaces where code, film, and light behave like one material — for teams who want their product to feel as considered as it performs."
        videoSrc="/videos/portfolio-vid.mp4"
      />

      {/* Next section — scroll indicator target */}
      <section id="next-section" className="next-section">
        <div className="next-section-inner">
          <span className="next-section-eyebrow">Selected Work</span>
          <h2 className="next-section-heading">
            The rest of the story lives below the fold.
          </h2>
          <p className="next-section-copy">
            This anchor is where your case studies, process, and contact
            sections continue. Swap this block for your own content — the
            hero above will scroll cleanly out of the way.
          </p>
        </div>
      </section>

      <style>{`
        .next-section {
          min-height: 100vh;
          background: linear-gradient(180deg, #08080a 0%, #0c0c10 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8vh 6vw;
        }
        .next-section-inner {
          max-width: 640px;
        }
        .next-section-eyebrow {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-ember);
          margin-bottom: 1.2rem;
        }
        .next-section-heading {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.8rem, 4vw, 3rem);
          line-height: 1.15;
          margin-bottom: 1.2rem;
          color: var(--color-paper);
        }
        .next-section-copy {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--color-mist);
        }
      `}</style>
    </main>
  );
}
