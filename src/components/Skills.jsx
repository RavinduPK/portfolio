import { useEffect, useRef, useState } from 'react';
import { skillsData } from '../data/portfolioData';

function SkillRow({ item, index }) {
  const rowRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`skill-row rev d${(index % 3) + 1}`}
    >
      <div className="sk-num">{item.num}</div>
      <div className="sk-name">{item.name}</div>
      <div className="sk-bar">
        <div
          className={`sk-fill ${inView ? 'go' : ''}`}
          style={{ '--target-scale': item.percentage / 100 }}
        />
      </div>
      <div className="sk-pct">{item.percentage}%</div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="skills-intro">
        <div className="rev">
          <div className="about-tag">My Expertise</div>
          <h2 className="s-heading">
            SKILLS &amp;
            <br />
            TOOLS.
          </h2>
        </div>
        <p className="s-body rev d1">
          A refined arsenal built through years of real projects — from pixel-pushing design to performance-obsessed front-end engineering.
        </p>
      </div>

      <div className="skills-list">
        {skillsData.map((skill, index) => (
          <SkillRow key={skill.num} item={skill} index={index} />
        ))}
      </div>
    </section>
  );
}
