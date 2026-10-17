import { personalData } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrap">
      <div className="footer-left">
        <a href="#hero" className="f-logo" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
          {personalData.shortName}
        </a>
        <div className="f-tagline">
          University of Kelaniya · Cyber Security Special
        </div>
      </div>

      <div className="footer-center">
        <div className="f-copy">&copy; {currentYear} {personalData.name}</div>
        <div className="f-subcopy">Engineered with precision, responsiveness &amp; security</div>
      </div>

      <div className="footer-right">
        <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Scroll back to top">
          <span>Back to Top</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
      </div>
    </footer>
  );
}
