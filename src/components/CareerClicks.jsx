import { useState, useEffect } from 'react';
import { careerClicksData } from '../data/portfolioData';

function CameraIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
    </svg>
  );
}

export default function CareerClicks() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPhoto]);

  const categories = ['All', ...new Set(careerClicksData.map((item) => item.category))];

  const filteredClicks = activeFilter === 'All'
    ? careerClicksData
    : careerClicksData.filter((item) => item.category === activeFilter);

  return (
    <section id="clicks">
      <div className="clicks-top rev">
        <div className="about-tag">Captured Moments</div>
        <h2 className="cl-heading">
          CAREER &amp; LIFE <br />
          <span className="outline">CLICKS.</span>
        </h2>
        <p className="cl-desc">
          Snapshots from campus hackathons, technical sessions, university life at UOK, developer meetups, and key milestones along the journey.
        </p>

        {/* Filter Pills */}
        <div className="clicks-filter-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`click-filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Collage Bento Grid */}
      <div className="clicks-grid">
        {filteredClicks.map((item, index) => (
          <div
            key={item.id}
            className={`click-card rev d${(index % 4) + 1} size-${item.size}`}
            onClick={() => setSelectedPhoto(item)}
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="click-img"
                loading="lazy"
              />
            ) : (
              /* High-end Dark Luxury Placeholder */
              <div className="click-placeholder">
                <div className="placeholder-pattern" />
                <div className="placeholder-content">
                  <div className="placeholder-icon-wrap">
                    <CameraIcon />
                  </div>
                  <span className="placeholder-label">Add Image Soon</span>
                  <span className="placeholder-sublabel">Drop photo path in portfolioData.js</span>
                </div>
              </div>
            )}

            {/* Subtle Gradient Overlay */}
            <div className="click-overlay" />

            {/* Top Badges */}
            <div className="click-top-badges">
              <span className="click-cat-badge">{item.category}</span>
              <span className="click-date-badge">{item.date}</span>
            </div>

            {/* Bottom Card Info */}
            <div className="click-card-info">
              <h3 className="click-title">{item.title}</h3>
              <p className="click-caption">{item.caption}</p>
            </div>

            {/* Hover Expand Trigger */}
            <div className="click-expand-btn" aria-hidden="true">
              <ExpandIcon />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="clicks-lightbox-backdrop"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="clicks-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close-btn"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close Preview"
            >
              &times;
            </button>

            <div className="lightbox-media-wrap">
              {selectedPhoto.image ? (
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="lightbox-img"
                />
              ) : (
                <div className="lightbox-placeholder">
                  <div className="placeholder-icon-wrap large">
                    <CameraIcon />
                  </div>
                  <h3>{selectedPhoto.title}</h3>
                  <p>Placeholder slot ready for image upload</p>
                </div>
              )}
            </div>

            <div className="lightbox-meta">
              <div className="lightbox-badges">
                <span className="click-cat-badge">{selectedPhoto.category}</span>
                <span className="click-date-badge">{selectedPhoto.date}</span>
              </div>
              <h3 className="lightbox-title">{selectedPhoto.title}</h3>
              <p className="lightbox-caption">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
