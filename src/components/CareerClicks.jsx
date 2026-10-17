import { useState, useRef, useEffect } from 'react';
import { careerClicksData } from '../data/portfolioData';

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  );
}

export default function CareerClicks() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const reelRef = useRef(null);

  // Drag to scroll state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const categories = ['All', ...new Set(careerClicksData.map((item) => item.category))];

  const filteredClicks = activeFilter === 'All'
    ? careerClicksData
    : careerClicksData.filter((item) => item.category === activeFilter);

  const updateScrollState = () => {
    const el = reelRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 15);
    setCanScrollRight(el.scrollLeft < maxScroll - 15);
    setScrollProgress(maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0);
  };

  useEffect(() => {
    const el = reelRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [filteredClicks]);

  const handleScroll = (direction) => {
    const el = reelRef.current;
    if (!el) return;
    const card = el.querySelector('.click-card');
    const scrollStep = card ? card.clientWidth + 24 : 380;
    el.scrollBy({
      left: direction === 'left' ? -scrollStep : scrollStep,
      behavior: 'smooth'
    });
  };

  // Mouse drag handlers
  const onMouseDown = (e) => {
    const el = reelRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftPos.current = el.scrollLeft;
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = reelRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeftPos.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

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

  return (
    <section id="clicks">
      {/* Top Header Row with Navigation Controls */}
      <div className="clicks-header-wrap rev">
        <div className="clicks-heading-block">
          <div className="about-tag">Captured Moments</div>
          <h2 className="cl-heading">
            CAMPUS &amp; LIFE <br />
            <span className="outline">CLICKS.</span>
          </h2>
          <p className="cl-desc">
            Visual diary from faculty life at University of Kelaniya, hackathon builds, cybersecurity labs, and key tech milestones.
          </p>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="clicks-nav-controls">
          <button
            className={`clicks-nav-btn prev ${!canScrollLeft ? 'disabled' : ''}`}
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous photos"
          >
            <ChevronLeft />
          </button>
          <button
            className={`clicks-nav-btn next ${!canScrollRight ? 'disabled' : ''}`}
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Next photos"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="clicks-filter-row rev d1">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`click-filter-btn ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => {
              setActiveFilter(cat);
              if (reelRef.current) reelRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Horizontal Scroll Reel */}
      <div
        className="clicks-reel-container"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="clicks-reel" ref={reelRef}>
          {filteredClicks.map((item, index) => (
            <div
              key={item.id}
              className={`click-card rev d${(index % 3) + 1}`}
              onClick={() => setSelectedPhoto(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setSelectedPhoto(item); }}
              aria-label={`View ${item.title}`}
            >
              {/* Image Media Frame — 100% visible, crystal clear, no text covering face */}
              <div className="click-card-media">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="click-img"
                    loading="lazy"
                  />
                ) : (
                  <div className="click-placeholder">
                    <CameraIcon />
                    <span>No Image</span>
                  </div>
                )}

                {/* Floating Top Badges */}
                <div className="click-top-badges">
                  <span className="click-cat-badge">{item.category}</span>
                  <span className="click-date-badge">{item.date}</span>
                </div>

                {/* Subtle Hover Zoom Overlay & Icon */}
                <div className="click-media-overlay">
                  <span className="click-zoom-icon">
                    <ExpandIcon />
                  </span>
                </div>
              </div>

              {/* Card Body — Placed neatly UNDER the image */}
              <div className="click-card-body">
                <h3 className="click-title">{item.title}</h3>
                <p className="click-caption">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Progress Indicator Bar */}
      <div className="clicks-progress-wrapper rev d2">
        <div className="clicks-progress-track">
          <div
            className="clicks-progress-fill"
            style={{ width: `${Math.max(scrollProgress, 14)}%` }}
          />
        </div>
        <div className="clicks-progress-hint">
          <span>&larr; Scroll horizontally to explore photos &rarr;</span>
        </div>
      </div>

      {/* Lightbox Modal (Click to open full high-resolution view if desired) */}
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
              {selectedPhoto.image && (
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="lightbox-img"
                />
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
