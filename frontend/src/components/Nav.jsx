import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About',        href: '#philosophy' },
  { label: 'Programs',     href: '#programs'   },
  { label: 'Camping',      href: '#camping'    },
  { label: 'Consultation', href: '#cta'         },
];

export default function Nav() {
  const navRef   = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
    const handleScroll = () => setScrolled(window.scrollY > 60);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollTo = (e, href) => {
    if (!href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    setMenuOpen(false);
    const startY  = window.scrollY;
    const targetY = target.getBoundingClientRect().top + window.scrollY - 80;
    const duration = 900;
    const start    = performance.now();
    const ease = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
    const step = now => {
      const p = Math.min(1, (now - start) / duration);
      window.scrollTo(0, startY + (targetY - startY) * ease(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <>
      <nav
        ref={navRef}
        data-testid="main-nav"
        style={{
          position: 'fixed',
          top: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(96%, 1260px)',
          padding: '0.8rem 1.2rem',
          borderRadius: '9999px',
          zIndex: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: scrolled ? 'rgba(10,10,10,0.94)' : 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.10)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          transition: 'background 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          data-testid="nav-logo"
          onClick={e => scrollTo(e, '#hero')}
          style={{
            color: '#F5F5F0',
            textDecoration: 'none',
            fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          Al-Qudwah
          <span style={{
            color: '#c9a84c',
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontSize: '0.95rem',
          }}>القدوة</span>
        </a>

        {/* Desktop Links */}
        {!isMobile && (
          <div data-testid="nav-links" style={{
            display: 'flex', gap: '1.4rem', alignItems: 'center',
          }}>
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                onClick={e => scrollTo(e, link.href)}
                style={{
                  color: 'rgba(245,245,245,0.88)',
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  fontFamily: "'Space Grotesk', sans-serif",
                  transition: 'color 0.25s',
                }}
                onMouseEnter={e => (e.target.style.color = '#F5F5F0')}
                onMouseLeave={e => (e.target.style.color = 'rgba(245,245,245,0.88)')}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              data-testid="nav-cta-btn"
              onClick={e => scrollTo(e, '#cta')}
              style={{
                color: '#fff',
                background: '#1A6B3C',
                borderRadius: '9999px',
                padding: '0.52rem 1.1rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif",
                textDecoration: 'none',
                transition: 'background 0.25s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#22894e'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1A6B3C'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Book Now
            </a>
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            data-testid="nav-mobile-menu-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              color: '#F5F5F0',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          data-testid="nav-mobile-menu"
          style={{
            position: 'fixed',
            top: '4.2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(96%, 480px)',
            background: 'rgba(10,10,10,0.97)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '1.2rem',
            padding: '1.2rem',
            zIndex: 59,
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={e => scrollTo(e, link.href)}
              style={{
                color: 'rgba(245,245,245,0.88)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: 500,
                fontFamily: "'Space Grotesk', sans-serif",
                padding: '0.7rem 0.8rem',
                borderRadius: '0.6rem',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(26,107,60,0.12)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={e => scrollTo(e, '#cta')}
            data-testid="nav-mobile-book-btn"
            style={{
              color: '#fff',
              background: '#1A6B3C',
              borderRadius: '9999px',
              padding: '0.7rem 1.2rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              textDecoration: 'none',
              textAlign: 'center',
              marginTop: '0.4rem',
            }}
          >
            Book Now
          </a>
        </div>
      )}

    </>
  );
}
