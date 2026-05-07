import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QUOTE_LINES = [
  { text: '"The strongest version of yourself', highlight: false },
  { text: 'is the one who fears Allah', highlight: true },
  { text: 'more than he fears failure."', highlight: false },
];

export default function Philosophy() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading
      gsap.fromTo('.phil-eyebrow',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      // Quote lines stagger
      gsap.fromTo('.phil-line',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: quoteRef.current, start: 'top 70%' }
        }
      );

      // Glow pulse
      gsap.to('.phil-glow',
        {
          scale: 1.15,
          opacity: 0.6,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }
      );

      // Attribution + rule
      gsap.fromTo('.phil-attribution',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: quoteRef.current, start: 'top 55%' }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      data-testid="philosophy-section"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#0A0A0A',
        padding: '3.2rem 1.2rem',
        borderTop: '1px solid rgba(46,139,87,0.24)',
        borderBottom: '1px solid rgba(46,139,87,0.24)',
      }}
    >
      {/* Islamic geometric pattern */}
      <div
        className="geometric-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
        }}
      />

      {/* Green radial glow */}
      <div
        className="phil-glow"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(26,107,60,0.18) 0%, transparent 70%)',
          borderRadius: '50%',
          opacity: 0.5,
        }}
      />

      {/* Arabic watermark */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-arabic)',
        fontSize: 'clamp(120px, 20vw, 260px)',
        color: 'rgba(26,107,60,0.04)',
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        direction: 'rtl',
      }}>
        القدوة
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '880px' }}>
        {/* Eyebrow */}
        <div className="phil-eyebrow" style={{ marginBottom: '24px' }}>
          <span style={{
            color: '#9dc183',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>✦</span>
        </div>

        {/* Quote */}
        <div ref={quoteRef} style={{ marginBottom: '32px' }}>
          <blockquote style={{
            margin: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
            lineHeight: 1.85,
            color: 'rgba(245,245,245,0.78)',
            maxWidth: '760px',
          }}
            className="phil-line"
          >
            "The strongest version of yourself is the one who fears Allah more than he fears failure."
          </blockquote>
        </div>

        {/* Attribution */}
        <div className="phil-attribution">
          <p style={{
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            color: '#c9a84c',
            margin: '1rem 0 0',
            fontSize: '1rem',
          }}>
            — Faris Hammadi | فارس حمادي
          </p>
        </div>
      </div>
    </section>
  );
}
