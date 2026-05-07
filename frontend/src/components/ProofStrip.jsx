import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    id: 1,
    quote: 'Before Al-Qudwah, I was fit physically but empty inside. Faris helped me understand that true strength comes from purpose and faith.',
    name: 'Ahmed K.',
    role: 'Program Graduate, 2023',
    avatar: 'A',
    context: 'Joined the 90-day Character Building program',
  },
  {
    id: 2,
    quote: 'The camping retreat was the most transformative week of my life. I came back a different person — more grounded, more focused.',
    name: 'Omar R.',
    role: 'Camping Retreat Alumni',
    avatar: 'O',
    context: 'Attended the Winter Wilderness Camp',
  },
  {
    id: 3,
    quote: 'Faris does not just mentor you — he walks alongside you. His consistency and belief in you makes you believe in yourself.',
    name: 'Yusuf M.',
    role: 'Mentorship Client',
    avatar: 'Y',
    context: '6-month personal mentorship program',
  },
];

export default function ProofStrip() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.proof-heading',
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );

      gsap.fromTo('.proof-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.proof-cards', start: 'top 75%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proof"
      ref={sectionRef}
      data-testid="proof-section"
      style={{
        padding: 'clamp(28px, 4vh, 56px) clamp(20px, 4vw, 60px)',
        background: 'var(--color-surface)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '80px',
        alignItems: 'start',
      }}
        className="proof-grid"
      >
        {/* Sticky Left */}
        <div className="proof-sticky proof-heading">
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
            marginBottom: '24px',
          }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--color-green)' }} />
            Chapter 05 · Impact
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(36px, 3.5vw, 52px)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: '#F5F5F0',
            marginBottom: '24px',
          }}>
            THE PROOF<br />
            IS IN THE<br />
            <span style={{ color: 'var(--color-green)' }}>PEOPLE.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'rgba(245,245,240,0.5)',
            lineHeight: 1.7,
            maxWidth: '280px',
            marginBottom: '40px',
          }}>
            Real stories from real people who chose to walk the path — and never looked back.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { num: '500+', label: 'Youth Mentored' },
              { num: '7+', label: 'Years of Experience' },
              { num: '95%', label: 'Report Life Change' },
            ].map((stat) => (
              <div key={stat.num} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '32px',
                  color: 'var(--color-green)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}>
                  {stat.num}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'rgba(245,245,240,0.5)',
                  lineHeight: 1.4,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrolling Right */}
        <div className="proof-cards" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="proof-card"
              data-testid={`testimonial-card-${t.id}`}
              style={{
                background: 'var(--color-bg)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '20px',
                padding: 'clamp(20px, 3vw, 40px)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.4s ease, transform 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(26,107,60,0.25)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Quote mark */}
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '28px',
                color: 'rgba(26,107,60,0.35)',
                lineHeight: 1,
                marginBottom: '10px',
                letterSpacing: '-0.02em',
              }}>
                "
              </div>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(13px, 1.4vw, 15px)',
                lineHeight: 1.65,
                color: 'rgba(245,245,240,0.85)',
                marginBottom: '18px',
                fontStyle: 'italic',
              }}>
                {t.quote}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-green), #0d4a27)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '16px',
                  color: '#fff',
                  flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '15px',
                    color: '#F5F5F0',
                  }}>
                    {t.name}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'var(--color-green)',
                  }}>
                    {t.role}
                  </div>
                </div>
                <div style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'rgba(245,245,240,0.3)',
                  maxWidth: '180px',
                  textAlign: 'right',
                  lineHeight: 1.5,
                }}>
                  {t.context}
                </div>
              </div>

              {/* Corner decoration */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '80px',
                height: '80px',
                background: 'radial-gradient(circle at bottom right, rgba(26,107,60,0.1), transparent)',
                borderRadius: '24px 0 24px 0',
              }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Desktop & tablet (≥641px): always side-by-side */
        .proof-grid {
          grid-template-columns: 1fr 2fr;
          gap: 48px;
        }
        /* Mobile only (<640px): stack, compact */
        @media (max-width: 640px) {
          .proof-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .proof-sticky { position: static !important; }
        }
        /* Tablet: tighten gap, keep side-by-side */
        @media (max-width: 1024px) and (min-width: 641px) {
          .proof-grid { gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
