import { useState, useEffect, useRef, useCallback } from 'react';
import { cyberAudio } from '../utils/cyberAudio';

const TARGET_TEXT = "KALHARA.DEV";
const CYBER_POOL = "0101#@$%&*<>[]_{}/~!?+XYZ09";

export default function CyberLogo({ onClick }) {
  const [displayText, setDisplayText] = useState(TARGET_TEXT);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [resolvedIndices, setResolvedIndices] = useState(new Set(Array.from({ length: TARGET_TEXT.length }, (_, i) => i)));

  const isRunningRef = useRef(false);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const lastResolvedCountRef = useRef(0);
  const tickCountRef = useRef(0);

  // Global unlock listener on first user interaction (browser audio policy)
  useEffect(() => {
    const handleFirstGesture = () => {
      cyberAudio.unlock();
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('pointerdown', handleFirstGesture, { passive: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  const startCyberCycle = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    setIsGlitching(true);
    setIsBlinking(true);

    lastResolvedCountRef.current = 0;
    tickCountRef.current = 0;

    // Play cyber glitch burst sound on cycle start
    cyberAudio.playGlitchBurst();

    // Initial strobe blink phase (180ms)
    setTimeout(() => {
      setIsBlinking(false);
    }, 180);

    let iteration = 0;
    const totalSteps = TARGET_TEXT.length;
    const currentResolved = new Set();

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      // Advance resolved letters
      iteration += 0.35;
      const resolvedCount = Math.floor(iteration);
      tickCountRef.current += 1;

      // Play character lock sound when a letter locks in place
      if (resolvedCount > lastResolvedCountRef.current && resolvedCount <= totalSteps) {
        lastResolvedCountRef.current = resolvedCount;
        cyberAudio.playCharLock(resolvedCount);
      } else if (tickCountRef.current % 2 === 0 && resolvedCount < totalSteps) {
        // Scramble chatter sound during decoding
        cyberAudio.playScrambleTick();
      }

      currentResolved.clear();
      for (let i = 0; i < resolvedCount && i < totalSteps; i++) {
        currentResolved.add(i);
      }
      setResolvedIndices(new Set(currentResolved));

      setDisplayText(() => {
        return TARGET_TEXT.split('').map((targetChar, idx) => {
          if (targetChar === '.' || targetChar === ' ') return targetChar;
          if (idx < resolvedCount) {
            return targetChar;
          }
          // Pick a random cyber symbol
          return CYBER_POOL[Math.floor(Math.random() * CYBER_POOL.length)];
        }).join('');
      });

      if (iteration >= totalSteps + 1) {
        clearInterval(intervalRef.current);
        setDisplayText(TARGET_TEXT);
        setResolvedIndices(new Set(Array.from({ length: TARGET_TEXT.length }, (_, i) => i)));
        setIsGlitching(false);
        setIsBlinking(false);
        isRunningRef.current = false;

        // Play resolution completion chime!
        cyberAudio.playResolveChime();

        // Schedule next cycle after a 3.2-second steady rest
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(startCyberCycle, 3200);
      }
    }, 42);
  }, []);

  useEffect(() => {
    // Initial delay before first cyber loop
    timeoutRef.current = setTimeout(startCyberCycle, 1800);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [startCyberCycle]);

  const handleMouseEnter = () => {
    cyberAudio.unlock();
    if (!isRunningRef.current) {
      clearTimeout(timeoutRef.current);
      startCyberCycle();
    }
  };

  const handleLogoClick = (e) => {
    cyberAudio.unlock();
    if (!isRunningRef.current) {
      clearTimeout(timeoutRef.current);
      startCyberCycle();
    }
    if (onClick) onClick(e);
  };

  return (
    <a
      href="#hero"
      className={`nav-logo cyber-logo-wrap ${isGlitching ? 'glitching' : ''} ${isBlinking ? 'blinking' : ''}`}
      onClick={handleLogoClick}
      onMouseEnter={handleMouseEnter}
      aria-label="KALHARA.DEV Homepage"
    >
      <span className="cyber-logo-text">
        {displayText.split('').map((char, index) => {
          const isResolved = resolvedIndices.has(index);
          const isDevPart = index >= 7; // index 7 is '.', 8 is 'D', 9 is 'E', 10 is 'V'
          const isDot = char === '.';

          return (
            <span
              key={index}
              className={`cyber-char ${isResolved ? 'resolved' : 'scrambling'} ${isDevPart ? 'cyber-dev' : ''} ${isDot ? 'cyber-dot' : ''}`}
              data-char={char}
            >
              {char}
            </span>
          );
        })}
      </span>

      {/* Cyber Terminal Blinking Underscore */}
      <span className="cyber-cursor" aria-hidden="true">_</span>
    </a>
  );
}
