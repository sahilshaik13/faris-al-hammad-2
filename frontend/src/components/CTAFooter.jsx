import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Instagram, Youtube, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTAFooter() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-tag',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );

      gsap.fromTo('.cta-h1 .cta-line',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
        }
      );

      gsap.fromTo('.cta-sub',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 55%' }
        }
      );

      gsap.fromTo('.cta-btns',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 48%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* CTA Section */}
      <section
        id="cta"
        ref={sectionRef}
        data-testid="cta-section"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 80px)',
          background: '#F5F5F0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle geometric pattern (light version) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%231A6B3C' stroke-width='0.5' opacity='0.07'%3E%3Cpolygon points='60,10 110,40 110,80 60,110 10,80 10,40'/%3E%3Cpolygon points='60,25 95,45 95,75 60,95 25,75 25,45'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Icon */}
          <div className="cta-tag" style={{ marginBottom: '32px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '1px solid rgba(26,107,60,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontFamily: 'var(--font-arabic)',
              fontSize: '20px',
              color: 'var(--color-green)',
            }}>
              ق
            </div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-green)',
            }}>
              THE NEXT STEP
            </span>
          </div>

          {/* Headline */}
          <div className="cta-h1" style={{ overflow: 'hidden', marginBottom: '16px' }}>
            <h2 className="cta-line" style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(42px, 6vw, 88px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#0A0A0A',
            }}>
              Are you ready
            </h2>
            <h2 className="cta-line" style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(42px, 6vw, 88px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: 'var(--color-green)',
            }}>
              to walk the path?
            </h2>
          </div>

          {/* Arabic equivalent */}
          <div style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: 'clamp(18px, 2.5vw, 28px)',
            color: 'rgba(10,10,10,0.3)',
            direction: 'rtl',
            marginBottom: '40px',
          }}>
            هل أنت مستعد لتسلك الطريق؟
          </div>

          {/* Body */}
          <p className="cta-sub" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            lineHeight: 1.7,
            color: 'rgba(10,10,10,0.55)',
            maxWidth: '420px',
            margin: '0 auto 48px',
          }}>
            Faris offers personal consultations to help you find the right starting point. No pressure — just a genuine conversation about where you are and where you want to go.
          </p>

          {/* CTAs */}
          <div className="cta-btns" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <a
              href="#"
              data-testid="cta-book-btn"
              onClick={(e) => e.preventDefault()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'var(--color-green)',
                color: '#fff',
                padding: '18px 40px',
                borderRadius: '100px',
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
                boxShadow: '0 12px 40px rgba(26,107,60,0.3)',
                transition: 'transform 0.25s ease, box-shadow 0.3s ease, background 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(26,107,60,0.4)';
                e.currentTarget.style.background = '#22894e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(26,107,60,0.3)';
                e.currentTarget.style.background = 'var(--color-green)';
              }}
            >
              Book a Consultation <ArrowRight size={18} />
            </a>
            <a
              href="#programs"
              data-testid="cta-browse-btn"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#programs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'rgba(10,10,10,0.45)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-green)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(10,10,10,0.45)')}
            >
              Or browse programs first <ArrowRight size={14} />
            </a>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
              {[
                { Icon: Instagram, label: 'Instagram', testid: 'cta-instagram-link' },
                { Icon: Youtube, label: 'YouTube', testid: 'cta-youtube-link' },
                { Icon: Twitter, label: 'Twitter', testid: 'cta-twitter-link' },
              ].map(({ Icon, label, testid }) => (
                <a
                  key={label}
                  href="#"
                  data-testid={testid}
                  onClick={(e) => e.preventDefault()}
                  aria-label={label}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid rgba(10,10,10,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(10,10,10,0.45)',
                    textDecoration: 'none',
                    transition: 'border-color 0.3s ease, color 0.3s ease, background 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-green)';
                    e.currentTarget.style.color = 'var(--color-green)';
                    e.currentTarget.style.background = 'rgba(26,107,60,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(10,10,10,0.1)';
                    e.currentTarget.style.color = 'rgba(10,10,10,0.45)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        data-testid="footer"
        style={{
          background: '#0A0A0A',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '40px clamp(24px, 5vw, 72px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        {/* Logo */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '20px',
          color: '#F5F5F0',
          letterSpacing: '-0.03em',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span style={{
            display: 'inline-flex',
            width: '32px',
            height: '32px',
            background: 'var(--color-green)',
            borderRadius: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}>
            ق
          </span>
          Al-Qudwah
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Programs', 'About', 'Camping', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              data-testid={`footer-link-${link.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${link === 'About' ? 'philosophy' : link === 'Contact' ? 'cta' : link.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(245,245,240,0.4)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--color-green)')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(245,245,240,0.4)')}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'rgba(245,245,240,0.25)',
          letterSpacing: '0.02em',
        }}>
          © 2025 Al-Qudwah. All rights reserved.
        </div>
      </footer>
    </>
  );
}
