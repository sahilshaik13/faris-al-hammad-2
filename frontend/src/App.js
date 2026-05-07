import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './components/LoadingScreen';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Programs from './components/Programs';
import ProofStrip from './components/ProofStrip';
import Camping from './components/Camping';
import VoiceTicker from './components/VoiceTicker';
import CTAFooter from './components/CTAFooter';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef   = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const handleLoadDone = () => setLoaded(true);

  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const onTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Entrance animation for the whole page
    gsap.fromTo('#app-page',
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: 'power2.out' }
    );

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [loaded]);

  return (
    <>
      {!loaded && <LoadingScreen onDone={handleLoadDone} />}

      {loaded && (
        <div
          id="app-page"
          data-testid="app-root"
          style={{ background: '#0A0A0A', minHeight: '100vh' }}
        >
          <Nav />
          <main className="main-content">
            <Hero />
            <Philosophy />
            <Programs />
            <ProofStrip />
            <Camping />
            <VoiceTicker />
          </main>
          <CTAFooter />
        </div>
      )}
    </>
  );
}
