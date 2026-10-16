import { worksData } from '../data/portfolioData';

function WorkCardPattern({ type }) {
  if (type === 'circles') {
    return (
      <svg className="work-pattern" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
        <circle cx="400" cy="100" r="150" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <circle cx="400" cy="100" r="100" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <circle cx="400" cy="100" r="50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <line x1="0" y1="0" x2="600" y2="450" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <line x1="600" y1="0" x2="0" y2="450" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      </svg>
    );
  }
  if (type === 'dots') {
    return (
      <svg className="work-pattern" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="work-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="1" fill="rgba(255,255,255,0.1)" />
          </pattern>
        </defs>
        <rect width="600" height="450" fill="url(#work-dots)" />
      </svg>
    );
  }
  if (type === 'hatch') {
    return (
      <svg className="work-pattern" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="work-hatch" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="20" x2="20" y2="0" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="600" height="450" fill="url(#work-hatch)" />
      </svg>
    );
  }
  if (type === 'polygons') {
    return (
      <svg className="work-pattern" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
        <polygon points="300,30 570,420 30,420" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <polygon points="300,90 510,400 90,400" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <polygon points="300,150 450,390 150,390" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      </svg>
    );
  }
  return null;
}

export default function Works() {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="works">
      <div className="works-top rev">
        <div>
          <div className="about-tag">Portfolio</div>
          <h2 className="w-heading">
            SELECTED
            <br />
            <span className="outline">WORKS.</span>
          </h2>
        </div>
        <a
          href="#contact"
          className="btn-ghost"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '.62rem',
            letterSpacing: '.2em',
            textTransform: 'uppercase'
          }}
          onClick={handleScrollToContact}
        >
          All Projects &rarr;
        </a>
      </div>

      <div className="works-grid">
        {worksData.map((project, index) => (
          <div key={project.id} className={`work-item rev d${index}`}>
            <div className={`work-bg ${project.bgClass}`}>
              <WorkCardPattern type={project.patternType} />
            </div>
            <div className="work-info">
              <div className="wi-cat">{project.category}</div>
              <div className="wi-title">{project.title}</div>
              <div className="wi-desc">{project.description}</div>
            </div>
            <div className="work-foot">
              <span className="wf-name">{project.footerName}</span>
              <div className="wf-arrow">&#8599;</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
