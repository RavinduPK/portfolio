import { useState, useEffect } from 'react';

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isHide, setIsHide] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const next = Math.min(prev + Math.floor(Math.random() * 12) + 4, 100);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsHide(true);
            setTimeout(() => {
              setIsRemoved(true);
              if (onComplete) onComplete();
            }, 900);
          }, 400);
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <div id="loader" className={isHide ? 'hide' : ''} aria-hidden="true">
      <div className="loader-num" id="loaderNum">
        {String(count).padStart(3, '0')}
      </div>
      <div className="loader-bar-wrap">
        <div className="loader-bar" style={{ width: `${count}%` }} />
      </div>
    </div>
  );
}
