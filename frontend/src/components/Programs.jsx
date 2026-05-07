import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROGRAMS = [
  {
    id: 1,
    tag: 'Core Program',
    tagAr: 'البرنامج الأساسي',
    title: 'Character Building',
    titleAr: 'بناء الشخصية',
    description: 'A 90-day journey that transforms discipline, faith, and physical strength into a unified identity.',
    img: '/3.png',
    span: 'col-span-2',
    height: '420px',
    objectPosition: 'center center',
    fallback: 'https://images.unsplash.com/photo-1761039808517-3ef249e3b605?crop=entropy&cs=srgb&fm=jpg&q=80&w=600&h=420&fit=crop',
  },
  {
    id: 2,
    tag: 'Outdoors',
    tagAr: 'الخارج',
    title: 'Camping Retreats',
    titleAr: 'المخيمات',
    description: 'Wilderness camps that build brotherhood, resilience, and spiritual clarity away from screens.',
    img: 'https://images.unsplash.com/photo-1772289838390-0512d71300c3?crop=entropy&cs=srgb&fm=jpg&q=80&w=400&h=420&fit=crop',
    span: 'col-span-1',
    height: '420px',
  },
  {
    id: 3,
    tag: 'One-on-One',
    tagAr: 'فردي',
    title: 'Consultation',
    titleAr: 'الاستشارة',
    description: 'Personal mentorship sessions to map your unique path forward.',
    img: '/2.png',
    span: 'col-span-1',
    height: '280px',
    fallback: 'https://images.unsplash.com/photo-1640094310214-f2a57897faeb?crop=entropy&cs=srgb&fm=jpg&q=80&w=400&h=280&fit=crop',
  },
  {
    id: 4,
    tag: 'Skills',
    tagAr: 'المهارات',
    title: 'Life Skills',
    titleAr: 'مهارات الحياة',
    description: 'Practical workshops on communication, time management, and purposeful living.',
    img: '/3.png',
    span: 'col-span-1',
    height: '280px',
    fallback: 'https://images.unsplash.com/photo-1647188098573-1a822335669f?crop=entropy&cs=srgb&fm=jpg&q=80&w=400&h=280&fit=crop',
  },
  {
    id: 5,
    tag: 'Digital',
    tagAr: 'رقمي',
    title: 'Online Courses',
    titleAr: 'الدورات',
    description: 'Structured programs for those who want to start the journey from anywhere in the world.',
    img: '/4.png',
    span: 'col-span-1',
    height: '280px',
    fallback: 'https://images.unsplash.com/photo-1600677396341-16965cbe9224?crop=entropy&cs=srgb&fm=jpg&q=80&w=400&h=280&fit=crop',
  },
];

export default function Programs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.prog-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      gsap.fromTo('.prog-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.prog-grid', start: 'top 75%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="programs"
      ref={sectionRef}
      data-testid="programs-section"
      style={{
        padding: 'clamp(28px, 4vh, 56px) clamp(20px, 4vw, 60px)',
        background: 'var(--color-bg)',
      }}
    >
      {/* Header */}
      <div className="prog-heading" style={{ marginBottom: '24px' }}>
        <span style={{
          color: '#9dc183',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontFamily: "'Space Grotesk', sans-serif",
          display: 'block',
          marginBottom: '8px',
        }}>
          Chapter 04 · Programs
        </span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2rem, 4.7vw, 3.5rem)',
            letterSpacing: '0.03em',
            lineHeight: 0.95,
            color: '#F5F5F0',
            margin: 0,
          }}>
            THE PATH HAS <span style={{ color: '#2e8b57' }}>MANY DOORS.</span>
          </h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '15px',
            color: 'rgba(245,245,240,0.5)',
            maxWidth: '320px',
            lineHeight: 1.7,
            margin: 0,
          }}>
            Five ways to walk with Faris — each designed for a different stage of your journey.
          </p>
        </div>
      </div>

      {/* Bento Grid — columns controlled by CSS */}
      <div
        className="prog-grid"
        style={{
          display: 'grid',
          gap: '14px',
        }}
      >
        {PROGRAMS.map((prog, i) => (
          <div
            key={prog.id}
            className="prog-card bento-card"
            data-testid={`program-card-${prog.id}`}
            style={{
              gridColumn: prog.span === 'col-span-2' ? 'span 2' : 'span 1',
              height: prog.height,
              background: 'var(--color-surface)',
              cursor: 'pointer',
            }}
          >
            <img
              src={prog.img}
              alt={prog.title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: prog.objectPosition || 'top center',
                transition: 'transform 0.7s ease',
              }}
              onError={(e) => {
                if (prog.fallback) e.target.src = prog.fallback;
              }}
            />
            {/* Dark overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
            }} />

            {/* Category tag */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'rgba(26,107,60,0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(26,107,60,0.4)',
              borderRadius: '100px',
              padding: '5px 12px',
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              color: '#fff',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {prog.tag}
            </div>

            {/* Arrow */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(245,245,240,0.7)',
              transition: 'background 0.3s ease, border-color 0.3s ease',
            }}
              className="prog-arrow"
            >
              <ArrowUpRight size={14} />
            </div>

            {/* Bottom content */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
            }}>
              <div style={{
                fontFamily: 'var(--font-arabic)',
                fontSize: '14px',
                color: 'rgba(245,245,240,0.3)',
                direction: 'rtl',
                textAlign: 'right',
                marginBottom: '4px',
              }}>
                {prog.titleAr}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: prog.span === 'col-span-2' ? '28px' : '20px',
                letterSpacing: '-0.02em',
                color: '#F5F5F0',
                marginBottom: '10px',
              }}>
                {prog.title}
              </h3>
              <div className="desc-overlay" style={{
                position: 'relative',
                transform: 'none',
                background: 'none',
                padding: 0,
              }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'rgba(245,245,240,0.6)',
                  lineHeight: 1.6,
                  maxWidth: prog.span === 'col-span-2' ? '400px' : '100%',
                }}>
                  {prog.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* Desktop default: 3-col */
        .prog-grid { grid-template-columns: repeat(3, 1fr); }

        /* Tablet (641–1024px): 2-col strict */
        @media (max-width: 1024px) and (min-width: 641px) {
          .prog-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .prog-card:first-child {
            grid-column: span 2 !important;
            height: 320px !important;
          }
          .prog-card:not(:first-child) {
            grid-column: span 1 !important;
            height: 240px !important;
          }
        }
        /* Mobile: single column */
        @media (max-width: 640px) {
          .prog-grid { grid-template-columns: 1fr !important; }
          .prog-card { grid-column: span 1 !important; height: 220px !important; }
        }
        .prog-card:hover img { transform: scale(1.06); }
        .prog-card:hover .prog-arrow {
          background: var(--color-green) !important;
          border-color: var(--color-green) !important;
          color: #fff !important;
        }
      `}</style>
    </section>
  );
}
