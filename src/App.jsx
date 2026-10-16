import { useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import Works from './components/Works';
import Process from './components/Process';
import CareerRoadmap from './components/CareerRoadmap';
import CareerClicks from './components/CareerClicks';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { marqueeRow1, marqueeRow2 } from './data/portfolioData';

export default function App() {
  useEffect(() => {
    // Scroll reveal observer for .rev elements
    const revEls = document.querySelectorAll('.rev');
    const revObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
          }
        });
      },
      { threshold: 0.12 }
    );

    revEls.forEach((el) => revObs.observe(el));

    return () => revObs.disconnect();
  }, []);

  return (
    <>
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Intro Loader */}
      <Loader />

      {/* Animated BG Grid */}
      <div className="bg-grid" aria-hidden="true">
        <svg className="bg-grid-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0H0V60" fill="none" stroke="white" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Navigation */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Marquee Ribbon 1 */}
        <Marquee items={marqueeRow1} />

        {/* About Section */}
        <About />

        {/* Marquee Ribbon 2 (Reverse) */}
        <Marquee items={marqueeRow2} reverse />

        {/* Skills Section */}
        <Skills />

        {/* Selected Works */}
        <Works />

        {/* Process Section */}
        <Process />

        {/* Career & Academic Roadmap */}
        <CareerRoadmap />

        {/* Career Clicks Collage */}
        <CareerClicks />

        {/* Resume / CV Section */}
        <Resume />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
