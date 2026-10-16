import { processSteps } from '../data/portfolioData';

export default function Process() {
  return (
    <section id="process">
      <div className="proc-top rev">
        <div className="about-tag" style={{ justifyContent: 'center' }}>
          How I Work
        </div>
        <h2 className="p-heading">
          <span className="outline">MY </span>PROCESS.
        </h2>
      </div>

      <div className="proc-grid">
        {processSteps.map((step, idx) => (
          <div key={step.title} className={`proc-card rev d${idx}`}>
            <div className="pc-num">{step.stepNum}</div>
            <div className="pc-icon">{step.icon}</div>
            <div className="pc-title">{step.title}</div>
            <p className="pc-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
