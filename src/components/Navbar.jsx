import { useState, useEffect } from 'react';
import { personalData, navLinks } from '../data/portfolioData';
import CyberLogo from './CyberLogo';
import { cyberAudio } from '../utils/cyberAudio';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(cyberAudio.isMuted);

  useEffect(() => {
    return cyberAudio.subscribe((muted) => {
      setIsMuted(muted);
    });
  }, []);

  const handleToggleSound = (e) => {
    e.preventDefault();
    cyberAudio.unlock();
    const muted = cyberAudio.toggleMute();
    setIsMuted(muted);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 250) {
          current = s.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is active & listen for Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="navbar-container">
        <CyberLogo onClick={(e) => handleNavClick(e, '#hero')} />


        {/* Desktop Menu */}
        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={activeSection === link.href.substring(1) ? 'active' : ''}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          {/* Cyber SFX Mute/Unmute Toggle Button */}
          <button
            type="button"
            className={`nav-sfx-btn ${isMuted ? 'muted' : 'active'}`}
            onClick={handleToggleSound}
            title={isMuted ? "Sound is Muted (Click to Unmute)" : "Sound is Active (Click to Mute)"}
            aria-label={isMuted ? "Unmute cyber sound effects" : "Mute cyber sound effects"}
          >
            {isMuted ? (
              <svg className="sfx-speaker-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.25" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <span className="sfx-bars" aria-hidden="true">
                <span className="sfx-bar bar1" />
                <span className="sfx-bar bar2" />
                <span className="sfx-bar bar3" />
              </span>
            )}
            <span className="sfx-text">{isMuted ? "SFX OFF" : "SFX ON"}</span>
          </button>

          <a
            href="#contact"
            className="nav-cta"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Hire Me
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="mobile-drawer-status">
            <span className="drawer-status-dot" />
            <span>Available for Builds &amp; Roles</span>
          </div>

          <button
            type="button"
            className={`drawer-sfx-btn ${isMuted ? 'muted' : 'active'}`}
            onClick={handleToggleSound}
            aria-label="Toggle Cyber Sound Effects"
          >
            {isMuted ? "🔇 SFX OFF" : "🔊 SFX ON"}
          </button>
        </div>

        <ul className="mobile-nav-list">
          {navLinks.map((link, idx) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={activeSection === link.href.substring(1) ? 'active' : ''}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <span className="mobile-nav-num">0{idx + 1}</span>
                <span className="mobile-nav-text">{link.label}</span>
              </a>
            </li>
          ))}
          <li className="mobile-nav-cta-item">
            <a
              href="#contact"
              className="btn-main"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              <span>Hire Me &rarr;</span>
            </a>
          </li>
        </ul>

        <div className="mobile-drawer-footer">
          <a href={`mailto:${personalData.contact.email}`} className="drawer-email-link">
            {personalData.contact.email}
          </a>
          <div className="drawer-social-row">
            <a href={`https://wa.me/${personalData.contact.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
            <span>·</span>
            <a href={personalData.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <span>·</span>
            <a href={personalData.contact.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </>
  );
}
