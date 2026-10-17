import { useState, useEffect } from 'react';
import { personalData, navLinks } from '../data/portfolioData';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')}>
          {personalData.shortName}
        </a>

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
