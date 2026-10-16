import { roadmapData } from '../data/portfolioData';

function MilestoneIcon({ type }) {
  if (type === 'school') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    );
  }
  if (type === 'university') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
        <path d="M6 6h10"/>
        <path d="M6 10h10"/>
        <path d="M6 14h7"/>
      </svg>
    );
  }
  // Career / Professional
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  );
}

export default function CareerRoadmap() {
  return (
    <section id="roadmap">
      <div className="roadmap-top rev">
        <div className="about-tag">Career Roadmap</div>
        <h2 className="r-heading">
          ACADEMIC &amp; <br />
          <span className="outline">CAREER JOURNEY.</span>
        </h2>
        <p className="r-desc">
          From early school foundations in mathematics and logic to undergraduate university computer science, leading into full-stack development, mobile apps, DevOps, and cloud security.
        </p>
      </div>

      <div className="roadmap-container">
        {/* Luminous timeline center beam */}
        <div className="roadmap-beam" aria-hidden="true" />

        <div className="roadmap-list">
          {roadmapData.map((item, index) => (
            <div
              key={item.id}
              className={`roadmap-item rev d${index + 1} ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              {/* Center Node Badge with Logo / Icon */}
              <div className="roadmap-node" aria-hidden="true">
                <div className="node-icon-wrap">
                  <MilestoneIcon type={item.type} />
                </div>
                <div className="node-pulse" />
              </div>

              {/* Card Content */}
              <div className="roadmap-card">
                <div className="rc-header">
                  <div className="rc-badge-row">
                    <span className="rc-category">{item.category}</span>
                    <span className="rc-period">{item.period}</span>
                  </div>
                  <h3 className="rc-title">{item.title}</h3>
                  <div className="rc-institution">
                    <span className="rc-inst-icon">&#9672;</span>
                    {item.institution}
                  </div>
                  <div className="rc-subtitle">{item.subtitle}</div>
                </div>

                <p className="rc-desc">{item.description}</p>

                <div className="rc-skills">
                  {item.skills.map((skill) => (
                    <span key={skill} className="rc-skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
