import { useState } from 'react';
import { personalData, cvExperience, cvSkills } from '../data/portfolioData';

export default function Resume() {
  const [toastMessage, setToastMessage] = useState('');

  const handleDownload = (e) => {
    e.preventDefault();
    setToastMessage('✓ Downloading Ravindu_Kalhara_CV.pdf (Technical Resume · CS & Security)...');
    
    // Create temporary anchor to trigger download if file exists or simulate clean resume
    const link = document.createElement('a');
    link.href = '/Ravindu_Kalhara_CV.pdf';
    link.download = personalData.cv.downloadFileName || 'Ravindu_Kalhara_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setToastMessage('');
    }, 4500);
  };

  return (
    <section id="cv">
      <div className="cv-inner">
        {/* Left: text + download */}
        <div className="rev">
          <div className="about-tag">My Resume</div>
          <h2 className="cv-heading">
            DOWNLOAD
            <br />
            <span className="outline">MY CV.</span>
          </h2>
          <p className="cv-desc">{personalData.cv.description}</p>

          <div className="cv-btn-row">
            <a
              href="#cv"
              className="cv-download-btn"
              onClick={handleDownload}
            >
              <span>Download CV</span>
              <div className="cv-dl-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 1v9M8 10l-3-3M8 10l3-3M1 13h14"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
            <a
              href="#cv"
              className="cv-preview-btn"
              onClick={(e) => {
                e.preventDefault();
                const card = document.querySelector('.cv-card');
                if (card) {
                  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            >
              Preview Online &#8599;
            </a>
          </div>

          {toastMessage && (
            <div className="cv-download-toast" role="status">
              {toastMessage}
            </div>
          )}

          <div className="cv-file-info">
            {personalData.cv.meta.map((m) => (
              <div key={m} className="cv-file-meta">
                {m}
              </div>
            ))}
          </div>
        </div>

        {/* Right: resume preview card */}
        <div className="cv-card rev d1">
          <div className="cv-card-header">
            <div className="cv-name-block">
              <div className="cv-card-name">{personalData.name}</div>
              <div className="cv-card-role">{personalData.role}</div>
            </div>
            <div className="cv-card-badge">
              <span className="cv-status-pulse" />
              Open to Work
            </div>
          </div>

          <div className="cv-exp-list">
            {cvExperience.map((exp) => (
              <div key={exp.title} className="cv-exp-row">
                <div>
                  <div className="cv-exp-title">{exp.title}</div>
                  <div className="cv-exp-company">{exp.company}</div>
                </div>
                <div className="cv-exp-year">{exp.year}</div>
              </div>
            ))}
          </div>

          <div className="cv-card-footer">
            {cvSkills.map((skill) => (
              <div key={skill} className="cv-pill">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
