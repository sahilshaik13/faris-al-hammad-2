import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Compass, Users, Heart, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { icon: Compass, title: 'Leadership', desc: 'Navigate challenges with clarity and conviction' },
  { icon: Star, title: 'Self-Reliance', desc: 'Build unshakeable confidence from within' },
  { icon: Users, title: 'Brotherhood', desc: 'Form bonds that last a lifetime' },
  { icon: Heart, title: 'Values in Action', desc: 'Live your beliefs, not just preach them' },
];

export default function Camping() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.camping-tag',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
        }
      );

      gsap.fromTo('.camping-h1',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }
        }
      );

      gsap.fromTo('.camping-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'back.out(1.3)',
          scrollTrigger: { trigger: '.camping-cards', start: 'top 70%' }
        }
      );

      gsap.fromTo('.camping-cta',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.camping-cards', start: 'top 50%' }
        }
      );

      // Subtle parallax on background
      gsap.to('.camping-bg',
        {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // Stars twinkle
      gsap.to('.star-particle',
        {
          opacity: 0.2,
          scale: 0.5,
          duration: 'random(1.5, 3)',
          stagger: { each: 0.2, from: 'random' },
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Generate star positions
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 50}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.6 + 0.2,
  }));

  return (
    <section
      id="camping"
      ref={sectionRef}
      data-testid="camping-section"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(50px, 7vh, 100px) clamp(20px, 4vw, 60px) clamp(40px, 5vh, 80px)',
      }}
    >
      {/* Background image */}
      <div
        className="camping-bg"
        style={{
          position: 'absolute',
          inset: '-15%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1772289838390-0512d71300c3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Dark gradient overlays */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(5,15,10,0.7) 0%, rgba(5,15,10,0.4) 40%, rgba(5,15,10,0.85) 100%)',
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(26,107,60,0.08) 0%, transparent 60%)',
        zIndex: 1,
      }} />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star-particle"
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            background: '#fff',
            opacity: star.opacity,
            zIndex: 1,
          }}
        />
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Top label */}
        <div className="camping-tag" style={{ marginBottom: '20px' }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(26,107,60,0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(26,107,60,0.4)',
            borderRadius: '100px',
            padding: '6px 16px',
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
            color: '#fff',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            Beyond the Screen
          </span>
        </div>

        {/* Headline */}
        <div className="camping-h1" style={{ marginBottom: '16px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(44px, 7vw, 96px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            color: '#F5F5F0',
            marginBottom: '12px',
          }}>
            CAMPING<br />
            <span style={{ color: 'var(--color-green)' }}>WITH FARIS.</span>
          </h2>
          <div style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: 'clamp(20px, 3vw, 32px)',
            color: 'rgba(245,245,240,0.4)',
            direction: 'rtl',
            marginBottom: '40px',
          }}>
            تخييم مع فارس
          </div>
        </div>

        {/* Floating cards */}
        <div
          className="camping-cards"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            maxWidth: '900px',
            marginBottom: '48px',
          }}
        >
          {CARDS.map((card, i) => {
            const IconComp = card.icon;
            return (
              <div
                key={i}
                className="camping-card glass-card"
                data-testid={`camping-card-${i + 1}`}
                style={{
                  padding: '20px',
                  transition: 'transform 0.4s ease, border-color 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(26,107,60,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <IconComp
                  size={20}
                  style={{ color: 'var(--color-green)', marginBottom: '10px' }}
                />
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: '#F5F5F0',
                  marginBottom: '6px',
                }}>
                  {card.title}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'rgba(245,245,240,0.5)',
                  lineHeight: 1.5,
                }}>
                  {card.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="camping-cta">
          <a
            href="#cta"
            data-testid="camping-cta-btn"
            onClick={(e) => { e.preventDefault(); document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--color-green)',
              color: '#fff',
              padding: '16px 32px',
              borderRadius: '100px',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
              transition: 'transform 0.25s ease, background 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.background = '#22894e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'var(--color-green)';
            }}
          >
            Join the Next Camp <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .camping-cards { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .camping-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
