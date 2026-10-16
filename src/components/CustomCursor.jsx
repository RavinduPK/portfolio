import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    // Check if pointer is fine (mouse, trackpad) rather than touch
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    document.body.classList.add('has-custom-cursor');

    const onMouseMove = (e) => {
      posRef.current.mx = e.clientX;
      posRef.current.my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animRing = () => {
      const { mx, my } = posRef.current;
      posRef.current.rx += (mx - posRef.current.rx) * 0.11;
      posRef.current.ry += (my - posRef.current.ry) * 0.11;

      if (ringRef.current) {
        ringRef.current.style.left = `${posRef.current.rx}px`;
        ringRef.current.style.top = `${posRef.current.ry}px`;
      }
      animFrameRef.current = requestAnimationFrame(animRing);
    };

    const onMouseEnterInteractive = () => document.body.classList.add('hovered');
    const onMouseLeaveInteractive = () => document.body.classList.remove('hovered');

    const attachHoverListeners = () => {
      const interactiveEls = document.querySelectorAll(
        'a, button, .work-item, .proc-card, .skill-row, .cv-download-btn, .cv-preview-btn, .cv-pill, .cv-exp-row, input, textarea, [data-hover]'
      );
      interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
      return interactiveEls;
    };

    window.addEventListener('mousemove', onMouseMove);
    animFrameRef.current = requestAnimationFrame(animRing);

    // Initial attach & mutation observer for dynamic elements
    const elements = attachHoverListeners();
    const observer = new MutationObserver(() => {
      attachHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.body.classList.remove('has-custom-cursor', 'hovered');
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cur-dot" ref={dotRef} aria-hidden="true" />
      <div id="cur-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
