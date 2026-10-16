import { useEffect, useRef, useState } from 'react';
import { personalData } from '../data/portfolioData';

function AnimatedCounter({ target, unit, label, delayClass }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const dur = 1600;
          const start = performance.now();

          const tick = (now) => {
            const t = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - t, 4);
            setCount(Math.floor(ease * target));
            if (t < 1) {
              requestAnimationFrame(tick);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className={`rev ${delayClass}`} ref={counterRef}>
      <span className="counter-num">{count}</span>
      <span className="counter-unit">{unit}</span>
      <div className="counter-lbl">{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about">
      <div className="rev">
        <div className="about-tag">{personalData.aboutTag}</div>
        <h2 className="about-heading">
          {personalData.aboutHeading.line1}
          <br />
          <span className="gray-txt">{personalData.aboutHeading.line2}</span>
          <br />
          {personalData.aboutHeading.line3}
        </h2>
        {personalData.aboutParagraphs.map((para, idx) => (
          <p key={idx} className="about-body">
            {para}
          </p>
        ))}

        <div className="about-counter-row">
          {personalData.stats.map((st, i) => (
            <AnimatedCounter
              key={st.label}
              target={st.target}
              unit={st.unit}
              label={st.label}
              delayClass={`d${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="avatar-box rev d2">
        <div className="avatar-frame">
          <img
            src={personalData.profileImage || '/profile.jpg'}
            alt={personalData.name}
            className="avatar-img"
            loading="lazy"
          />
          <div className="avatar-overlay" aria-hidden="true" />
          <div className="avatar-reflection" aria-hidden="true" />
        </div>
        <div className="avatar-border-tl" />
        <div className="avatar-border-br" />
        <div className="avatar-badge">
          <div className="badge-num">{personalData.badgeTitle || 'UOK'}</div>
          <div className="badge-lbl">{personalData.badgeSubtitle || 'CS · Cyber Security'}</div>
        </div>
      </div>
    </section>
  );
}
