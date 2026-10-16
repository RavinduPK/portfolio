export default function Marquee({ items = [], reverse = false }) {
  // Duplicate array for seamless infinite looping
  const displayItems = [...items, ...items, ...items];

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
        {displayItems.map((item, index) => (
          <span key={index} className={`m-item ${index % 3 === 2 ? 'lit' : ''}`}>
            <span className="m-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
