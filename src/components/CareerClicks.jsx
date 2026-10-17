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

function ReelIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export default function CareerClicks() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('reel'); // 'reel' | 'grid'
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [cardImageIndices, setCardImageIndices] = useState({});
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
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

  const getCategoryCount = (cat) => {
    if (cat === 'All') return careerClicksData.length;
    return careerClicksData.filter((item) => item.category === cat).length;
  };

  const getItemImages = (item) => {
    if (!item) return [];
    if (item.images && item.images.length > 0) return item.images;
    if (item.image) return [item.image];
    return [];
  };

  const getActiveImageIndex = (item) => cardImageIndices[item?.id] || 0;

  const getActiveImage = (item) => {
    const list = getItemImages(item);
    const idx = getActiveImageIndex(item);
    return list[idx] || item?.image;
  };

  const handleCardImagePrev = (e, item) => {
    e.stopPropagation();
    const list = getItemImages(item);
    if (list.length <= 1) return;
    const current = getActiveImageIndex(item);
    const nextIdx = (current - 1 + list.length) % list.length;
    setCardImageIndices((prev) => ({ ...prev, [item.id]: nextIdx }));
  };

  const handleCardImageNext = (e, item) => {
    e.stopPropagation();
    const list = getItemImages(item);
    if (list.length <= 1) return;
    const current = getActiveImageIndex(item);
    const nextIdx = (current + 1) % list.length;
    setCardImageIndices((prev) => ({ ...prev, [item.id]: nextIdx }));
  };

  const handleCardDotClick = (e, item, idx) => {
    e.stopPropagation();
    setCardImageIndices((prev) => ({ ...prev, [item.id]: idx }));
  };

  const handleOpenLightbox = (item) => {
    setSelectedPhoto(item);
    setLightboxImageIndex(getActiveImageIndex(item));
  };

  const selectedImages = selectedPhoto ? getItemImages(selectedPhoto) : [];
  const currentLightboxImg = selectedImages[lightboxImageIndex] || selectedPhoto?.image;

  const handleLightboxPrev = (e) => {
    if (e) e.stopPropagation();
    if (selectedImages.length <= 1) return;
    setLightboxImageIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length);
  };

  const handleLightboxNext = (e) => {
    if (e) e.stopPropagation();
    if (selectedImages.length <= 1) return;
    setLightboxImageIndex((prev) => (prev + 1) % selectedImages.length);
  };

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
  }, [filteredClicks, viewMode]);

  const handleScroll = (direction) => {
    const el = reelRef.current;
    if (!el) return;
    const card = el.querySelector('.click-card');
    const scrollStep = card ? card.clientWidth + 20 : 320;
    el.scrollBy({
      left: direction === 'left' ? -scrollStep : scrollStep,
      behavior: 'smooth'
    });
  };

  const handleProgressClick = (e) => {
    const el = reelRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = (e.clientX - rect.left) / rect.width;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: clickRatio * maxScroll, behavior: 'smooth' });
  };

  // Mouse drag handlers for reel
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

  // Close lightbox on Escape key & arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
      if (e.key === 'ArrowLeft') handleLightboxPrev();
      if (e.key === 'ArrowRight') handleLightboxNext();
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
  }, [selectedPhoto, selectedImages.length]);

  return (
    <section id="clicks">
      {/* Top Header Row with Controls */}
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

        {/* Top Control Bar: View Switcher (Reel vs Grid) & Navigation Arrows */}
        <div className="clicks-nav-controls">
          <div className="clicks-view-switcher" role="group" aria-label="Layout view mode">
            <button
              type="button"
              className={`clicks-view-btn ${viewMode === 'reel' ? 'active' : ''}`}
              onClick={() => setViewMode('reel')}
              aria-label="Horizontal Reel View"
              title="Horizontal Reel View"
            >
              <ReelIcon />
              <span>Reel</span>
            </button>
            <button
              type="button"
              className={`clicks-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
              title="Grid View"
            >
              <GridIcon />
              <span>Grid</span>
            </button>
          </div>

          {viewMode === 'reel' && (
            <div className="clicks-nav-arrows">
              <button
                className={`clicks-nav-btn prev ${!canScrollLeft ? 'disabled' : ''}`}
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous photos"
                title="Scroll Left"
              >
                <ChevronLeft />
              </button>
              <button
                className={`clicks-nav-btn next ${!canScrollRight ? 'disabled' : ''}`}
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Next photos"
                title="Scroll Right"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category Filter Tabs with Item Count */}
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
            <span>{cat}</span>
            <span className="filter-count">{getCategoryCount(cat)}</span>
          </button>
        ))}
      </div>

      {/* Photos Display: Reel View OR Grid View */}
      {viewMode === 'reel' ? (
        <div
          className="clicks-reel-container"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div className="clicks-reel" ref={reelRef}>
            {filteredClicks.map((item, index) => {
              const imagesList = getItemImages(item);
              const activeIdx = getActiveImageIndex(item);
              const activeImgSrc = getActiveImage(item);
              const hasMultiple = imagesList.length > 1;

              return (
                <div
                  key={item.id}
                  className={`click-card rev d${(index % 3) + 1}`}
                  onClick={() => handleOpenLightbox(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleOpenLightbox(item); }}
                  aria-label={`View ${item.title}`}
                >
                  {/* Image Media Frame — Compact, balanced, landscape proportion */}
                  <div className="click-card-media">
                    {activeImgSrc ? (
                      <img
                        src={activeImgSrc}
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
                      <div style={{ display: 'flex', gap: '.4rem', alignItems: 'center' }}>
                        {hasMultiple && (
                          <span className="click-multi-badge">
                            📸 {activeIdx + 1}/{imagesList.length}
                          </span>
                        )}
                        <span className="click-date-badge">{item.date}</span>
                      </div>
                    </div>

                    {/* Multi-Photo Card Navigation Arrows */}
                    {hasMultiple && (
                      <>
                        <button
                          type="button"
                          className="click-card-arrow prev"
                          onClick={(e) => handleCardImagePrev(e, item)}
                          aria-label="Previous photo in album"
                        >
                          <ChevronLeft />
                        </button>
                        <button
                          type="button"
                          className="click-card-arrow next"
                          onClick={(e) => handleCardImageNext(e, item)}
                          aria-label="Next photo in album"
                        >
                          <ChevronRight />
                        </button>
                        <div className="click-card-dots">
                          {imagesList.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              type="button"
                              className={`click-card-dot ${dotIdx === activeIdx ? 'active' : ''}`}
                              onClick={(e) => handleCardDotClick(e, item, dotIdx)}
                              aria-label={`Show photo ${dotIdx + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Subtle Hover Zoom Overlay & Click Pill */}
                    <div className="click-media-overlay">
                      <span className="click-zoom-pill">
                        <ExpandIcon />
                        <span>View Photo</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body — Placed neatly UNDER the image */}
                  <div className="click-card-body">
                    <h3 className="click-title">{item.title}</h3>
                    <p className="click-caption">{item.caption}</p>
                    <div className="click-card-footer">
                      <span className="click-card-hint">Click to enlarge</span>
                      <span className="click-expand-action">
                        Full View ↗
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Responsive Grid View */
        <div className="clicks-grid-container rev d2">
          <div className="clicks-grid">
            {filteredClicks.map((item, index) => {
              const imagesList = getItemImages(item);
              const activeIdx = getActiveImageIndex(item);
              const activeImgSrc = getActiveImage(item);
              const hasMultiple = imagesList.length > 1;

              return (
                <div
                  key={item.id}
                  className={`click-card rev d${(index % 3) + 1}`}
                  onClick={() => handleOpenLightbox(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleOpenLightbox(item); }}
                  aria-label={`View ${item.title}`}
                >
                  <div className="click-card-media">
                    {activeImgSrc ? (
                      <img
                        src={activeImgSrc}
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

                    <div className="click-top-badges">
                      <span className="click-cat-badge">{item.category}</span>
                      <div style={{ display: 'flex', gap: '.4rem', alignItems: 'center' }}>
                        {hasMultiple && (
                          <span className="click-multi-badge">
                            📸 {activeIdx + 1}/{imagesList.length}
                          </span>
                        )}
                        <span className="click-date-badge">{item.date}</span>
                      </div>
                    </div>

                    {hasMultiple && (
                      <>
                        <button
                          type="button"
                          className="click-card-arrow prev"
                          onClick={(e) => handleCardImagePrev(e, item)}
                          aria-label="Previous photo in album"
                        >
                          <ChevronLeft />
                        </button>
                        <button
                          type="button"
                          className="click-card-arrow next"
                          onClick={(e) => handleCardImageNext(e, item)}
                          aria-label="Next photo in album"
                        >
                          <ChevronRight />
                        </button>
                        <div className="click-card-dots">
                          {imagesList.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              type="button"
                              className={`click-card-dot ${dotIdx === activeIdx ? 'active' : ''}`}
                              onClick={(e) => handleCardDotClick(e, item, dotIdx)}
                              aria-label={`Show photo ${dotIdx + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    <div className="click-media-overlay">
                      <span className="click-zoom-pill">
                        <ExpandIcon />
                        <span>View Photo</span>
                      </span>
                    </div>
                  </div>

                  <div className="click-card-body">
                    <h3 className="click-title">{item.title}</h3>
                    <p className="click-caption">{item.caption}</p>
                    <div className="click-card-footer">
                      <span className="click-card-hint">Click to enlarge</span>
                      <span className="click-expand-action">
                        Full View ↗
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Progress Indicator Bar (Only in Reel View) */}
      {viewMode === 'reel' && (
        <div className="clicks-progress-wrapper rev d2">
          <div
            className="clicks-progress-track"
            onClick={handleProgressClick}
            title="Click to seek photos"
            role="progressbar"
            aria-valuenow={Math.round(scrollProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="clicks-progress-fill"
              style={{ width: `${Math.max(scrollProgress, 16)}%` }}
            />
          </div>
          <div className="clicks-progress-hint">
            <span>&larr; Drag or use arrows to navigate · {filteredClicks.length} Moments &rarr;</span>
          </div>
        </div>
      )}

      {/* Lightbox Modal (Click to open full high-resolution view) */}
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
            <div className="lightbox-top-bar">
              <span className="lightbox-shortcut-hint">Esc to Close · ← → to Navigate</span>
              <button
                className="lightbox-close-btn"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close Preview"
              >
                &times;
              </button>
            </div>

            <div className="lightbox-media-wrap">
              {currentLightboxImg && (
                <img
                  src={currentLightboxImg}
                  alt={selectedPhoto.title}
                  className="lightbox-img"
                />
              )}

              {/* Lightbox Prev / Next Arrows */}
              {selectedImages.length > 1 && (
                <>
                  <button
                    type="button"
                    className="lightbox-arrow prev"
                    onClick={handleLightboxPrev}
                    aria-label="Previous image"
                    title="Previous Photo"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    type="button"
                    className="lightbox-arrow next"
                    onClick={handleLightboxNext}
                    aria-label="Next image"
                    title="Next Photo"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip inside Lightbox */}
            {selectedImages.length > 1 && (
              <div className="lightbox-thumb-strip">
                {selectedImages.map((thumbSrc, tIdx) => (
                  <button
                    key={tIdx}
                    type="button"
                    className={`lightbox-thumb-btn ${tIdx === lightboxImageIndex ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImageIndex(tIdx);
                    }}
                    aria-label={`Thumbnail ${tIdx + 1}`}
                  >
                    <img src={thumbSrc} alt={`Thumbnail ${tIdx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            <div className="lightbox-meta">
              <div className="lightbox-badges">
                <span className="click-cat-badge">{selectedPhoto.category}</span>
                {selectedImages.length > 1 && (
                  <span className="click-multi-badge">
                    📸 {lightboxImageIndex + 1} / {selectedImages.length}
                  </span>
                )}
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
