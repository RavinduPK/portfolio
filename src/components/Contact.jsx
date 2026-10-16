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
              <div className="c-icon">wa</div>
              {personalData.contact.whatsappDisplay || '+94 77 221 1681'}
            </a>

            {/* Email Link */}
            <a href={`mailto:${personalData.contact.email}`} className="c-link">
              <div className="c-icon">@</div>
              {personalData.contact.email}
            </a>

            {/* LinkedIn Link */}
            <a
              href={personalData.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="c-link"
            >
              <div className="c-icon">in</div>
              {personalData.contact.linkedinLabel || 'LinkedIn Profile'}
            </a>

            {/* GitHub Link */}
            <a
              href={personalData.contact.github}
              target="_blank"
              rel="noreferrer"
              className="c-link"
            >
              <div className="c-icon">gh</div>
              {personalData.contact.githubLabel || 'GitHub Profile'}
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
