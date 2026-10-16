import { personalData } from '../data/portfolioData';

export default function Hero() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero">
      {/* Floating orbs */}
      <div className="orb orb1" aria-hidden="true" />
      <div className="orb orb2" aria-hidden="true" />
      <div className="orb orb3" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-eyebrow">
          <span className="eyebrow-line" />
          {personalData.eyebrow}
        </div>

        <h1 className="hero-title">
          {personalData.heroTitle.map((word, idx) => (
            <span key={idx} className="char-row">
              <span>{word}</span>
            </span>
          ))}
        </h1>

        <div className="hero-sub-row">
          <p className="hero-desc">{personalData.heroDescription}</p>
          <div className="hero-actions">
            <a
              href="#works"
              className="btn-main"
              onClick={(e) => handleScrollTo(e, '#works')}
            >
              <span>View Projects</span>
            </a>
            <a
              href="#contact"
              className="btn-ghost"
              onClick={(e) => handleScrollTo(e, '#contact')}
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="scroll-txt">Scroll</span>
        <div className="scroll-bar" />
      </div>
    </section>
  );
}
