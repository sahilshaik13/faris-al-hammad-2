import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  { id: 1, role: 'Scholar', img: '/2.png', label: 'THE SCHOLAR', arabic: 'العالم', color: 'from-black/80 to-transparent' },
  { id: 2, role: 'Discipline', img: '/3.png', label: 'DISCIPLINE', arabic: 'الانضباط', color: 'from-green/20 to-transparent' },
  { id: 3, role: 'Mentor', img: '/2.png', label: 'THE MENTOR', arabic: 'المرشد', color: 'from-black/80 to-transparent' },
  { id: 4, role: 'Athlete', img: '/3.png', label: 'THE ATHLETE', arabic: 'الرياضي', color: 'from-black/70 to-transparent' },
  { id: 5, role: 'Leader', img: '/4.png', label: 'THE LEADER', arabic: 'القائد', color: 'from-black/80 to-transparent' },
  { id: 6, role: 'Community', img: '/2.png', label: 'COMMUNITY', arabic: 'المجتمع', color: 'from-black/70 to-transparent' },
  { id: 7, role: 'Faith', img: '/3.png', label: 'FAITH FIRST', arabic: 'الإيمان', color: 'from-black/80 to-transparent' },
  { id: 8, role: 'Role Model', img: '/4.png', label: 'ROLE MODEL', arabic: 'القدوة', color: 'from-black/80 to-transparent' },
];

const FALLBACK_URLS = [
  'https://images.unsplash.com/photo-1763665533832-bc3dc90a3a4e?crop=entropy&cs=srgb&fm=jpg&q=80&w=400&h=560&fit=crop',
  'https://images.unsplash.com/photo-1610682624805-fd7cbc4b1f8f?crop=entropy&cs=srgb&fm=jpg&q=80&w=400&h=560&fit=crop',
  'https://images.unsplash.com/photo-1727819689786-ced19d4ccb87?crop=entropy&cs=srgb&fm=jpg&q=80&w=400&h=560&fit=crop',
];

export default function IdentityReel() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    // Section entrance
    gsap.fromTo(sectionRef.current.querySelector('.reel-heading'),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Panels stagger entrance
    gsap.fromTo('.reel-panel',
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top 85%',
        }
      }
    );
  }, []);

  // Drag-to-scroll
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.parentElement.offsetLeft;
    scrollLeft.current = trackRef.current.parentElement.scrollLeft;
    trackRef.current.parentElement.style.cursor = 'grabbing';
  };
  const onMouseLeave = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.parentElement.style.cursor = 'grab';
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.parentElement.style.cursor = 'grab';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.parentElement.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.parentElement.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section
      id="identity"
      ref={sectionRef}
      data-testid="identity-reel-section"
      style={{
        padding: '40px 0',
        background: 'var(--color-bg)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: '0 clamp(24px, 5vw, 72px)', marginBottom: '56px' }}>
        <div className="reel-heading">
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-green)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px',
          }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--color-green)' }} />
            Chapter 02 · Identity
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(36px, 4.5vw, 64px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            color: '#F5F5F0',
          }}>
            ONE MAN,<br />
            <span style={{ color: 'var(--color-green)' }}>MANY WORLDS.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'rgba(245,245,240,0.5)',
            maxWidth: '420px',
            lineHeight: 1.7,
            marginTop: '16px',
          }}>
            Drag to explore the dimensions of Faris Hammadi — scholar, athlete, mentor, and more.
          </p>
        </div>
      </div>

      {/* Scrollable Reel */}
      <div
        data-testid="identity-reel-track"
        className="reel-outer"
        style={{
          overflowX: 'auto',
          paddingLeft: 'clamp(24px, 5vw, 72px)',
          paddingRight: 'clamp(24px, 5vw, 72px)',
          paddingBottom: '20px',
          cursor: 'grab',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <div
          ref={trackRef}
          className="reel-track"
          style={{
            display: 'flex',
            gap: '16px',
            width: 'max-content',
          }}
        >
          {PANELS.map((panel, i) => (
            <div
              key={panel.id}
              className="reel-panel"
              data-testid={`reel-panel-${i + 1}`}
              style={{
                flexShrink: 0,
                width: i % 3 === 0 ? '320px' : '280px',
                height: '480px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '20px',
                background: 'var(--color-surface)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <img
                src={panel.img}
                alt={panel.role}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  transition: 'transform 0.6s ease',
                  userSelect: 'none',
                }}
                onError={(e) => {
                  e.target.src = FALLBACK_URLS[i % FALLBACK_URLS.length];
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
              }} />
              {/* Text */}
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
                <div style={{
                  fontFamily: 'var(--font-arabic)',
                  fontSize: '28px',
                  color: 'rgba(245,245,240,0.3)',
                  marginBottom: '6px',
                  direction: 'rtl',
                  textAlign: 'right',
                }}>
                  {panel.arabic}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '22px',
                  letterSpacing: '-0.02em',
                  color: '#F5F5F0',
                }}>
                  {panel.label}
                </div>
                <div style={{
                  width: '32px',
                  height: '2px',
                  background: 'var(--color-green)',
                  marginTop: '10px',
                  borderRadius: '1px',
                }} />
              </div>

              {/* Panel number */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                fontFamily: 'var(--font-display)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: 'rgba(245,245,240,0.4)',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .reel-outer::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
