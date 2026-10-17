import { useState } from 'react';
import { personalData } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [whatsappDirectUrl, setWhatsappDirectUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Please fill in your name and email address.');
      return;
    }

    // Format the WhatsApp message nicely with emojis and line breaks
    const messageLines = [
      '👋 *New Portfolio Inquiry*',
      '',
      `👤 *Name:* ${formData.name.trim()}`,
      `📧 *Email:* ${formData.email.trim()}`,
      `💼 *Project Type:* ${formData.projectType.trim() || 'General Inquiry'}`,
      '',
      '📝 *Message:*',
      formData.message.trim() || 'No additional details provided.'
    ];

    const encodedMessage = encodeURIComponent(messageLines.join('\n'));
    const whatsappUrl = `https://wa.me/${personalData.contact.whatsapp}?text=${encodedMessage}`;

    setWhatsappDirectUrl(whatsappUrl);
    setSubmitted(true);

    // Try to open WhatsApp automatically in a new window/tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Reset form after a few seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', projectType: '', message: '' });
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section id="contact">
      <div className="contact-split">
        <div className="rev">
          <div className="about-tag">Get In Touch</div>
          <h2 className="c-big">
            LET'S
            <br />
            <span className="outline">BUILD</span>
            <br />
            TOGETHER.
          </h2>
          <p className="c-intro">
            Whether you have a defined brief or just an exciting idea, I'd love to explore how we can create something exceptional together. Send me a direct message or reach out via any link below.
          </p>

          <div className="c-links">
            {/* WhatsApp Link */}
            <a
              href={`https://wa.me/${personalData.contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="c-link"
            >
              <div className="c-icon whatsapp-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.94 7.44 8.68 7.5 8.46 7.74C8.24 7.97 7.6 8.57 7.6 9.81C7.6 11.04 8.5 12.23 8.63 12.4C8.76 12.56 10.4 15.09 12.9 16.17C13.5 16.43 13.96 16.58 14.32 16.7C14.92 16.89 15.47 16.86 15.91 16.8C16.4 16.72 17.41 16.18 17.62 15.58C17.83 14.98 17.83 14.47 17.77 14.37C17.71 14.26 17.54 14.2 17.28 14.07C17.02 13.94 15.75 13.31 15.51 13.23C15.28 13.14 15.11 13.1 14.94 13.35C14.77 13.6 14.29 14.16 14.14 14.33C14 14.5 13.85 14.52 13.59 14.39C13.34 14.26 12.51 13.99 11.53 13.11C10.77 12.43 10.25 11.59 10.11 11.34C9.96 11.08 10.09 10.95 10.22 10.82C10.34 10.7 10.48 10.51 10.61 10.36C10.74 10.21 10.78 10.11 10.87 9.94C10.95 9.77 10.91 9.62 10.85 9.5C10.78 9.37 10.27 8.12 10.06 7.61C9.85 7.11 9.64 7.18 9.48 7.17C9.33 7.16 9.16 7.16 8.99 7.16" />
                </svg>
              </div>
              <div className="c-link-content">
                <span className="c-link-label">WhatsApp Direct</span>
                <span className="c-link-val">{personalData.contact.whatsappDisplay || '+94 77 221 1681'}</span>
              </div>
              <span className="c-link-arrow">&#8599;</span>
            </a>

            {/* Email Link */}
            <a href={`mailto:${personalData.contact.email}`} className="c-link">
              <div className="c-icon email-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div className="c-link-content">
                <span className="c-link-label">Direct Email</span>
                <span className="c-link-val">{personalData.contact.email}</span>
              </div>
              <span className="c-link-arrow">&#8599;</span>
            </a>

            {/* LinkedIn Link */}
            <a
              href={personalData.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="c-link"
            >
              <div className="c-icon linkedin-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                </svg>
              </div>
              <div className="c-link-content">
                <span className="c-link-label">LinkedIn</span>
                <span className="c-link-val">{personalData.contact.linkedinLabel || 'LinkedIn Profile'}</span>
              </div>
              <span className="c-link-arrow">&#8599;</span>
            </a>

            {/* GitHub Link */}
            <a
              href={personalData.contact.github}
              target="_blank"
              rel="noreferrer"
              className="c-link"
            >
              <div className="c-icon github-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </div>
              <div className="c-link-content">
                <span className="c-link-label">GitHub Portfolio</span>
                <span className="c-link-val">{personalData.contact.githubLabel || 'GitHub Profile'}</span>
              </div>
              <span className="c-link-arrow">&#8599;</span>
            </a>
          </div>
        </div>

        <form className="c-form rev d1" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="form-feedback">
              ✓ Redirecting to WhatsApp to send your message to <strong>+94 77 221 1681</strong>...
              {whatsappDirectUrl && (
                <div style={{ marginTop: '.6rem' }}>
                  If WhatsApp didn't open automatically,{' '}
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#fff', textDecoration: 'underline', fontWeight: 600 }}
                  >
                    Click here to open WhatsApp &rarr;
                  </a>
                </div>
              )}
            </div>
          ) : null}

          <div className="fg">
            <input
              className="fi"
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <div className="f-line" />
          </div>

          <div className="fg">
            <input
              className="fi"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="f-line" />
          </div>

          <div className="fg">
            <input
              className="fi"
              type="text"
              name="projectType"
              placeholder="Project Type (e.g. Web App, E-Commerce, UI/UX)"
              value={formData.projectType}
              onChange={handleChange}
            />
            <div className="f-line" />
          </div>

          <div className="fg">
            <textarea
              className="fi"
              name="message"
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={handleChange}
              rows="4"
            />
            <div className="f-line" />
          </div>

          <button type="submit" className="btn-send">
            <span>Send Message via WhatsApp &rarr;</span>
          </button>
        </form>
      </div>
    </section>
  );
}
