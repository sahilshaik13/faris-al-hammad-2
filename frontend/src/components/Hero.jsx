import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GradientCarousel } from './GradientCarousel';

function mod(n, m) { return ((n % m) + m) % m; }

const SLIDES = [
  { image: '/1.png', line: 'DIRECT & HONEST — NO ILLUSIONS',      subline: 'One-on-one time where you are truly seen and heard. Strip away modern distraction to find your core strength.' },
  { image: '/2.png', line: 'DIGITAL DISCIPLINE — GLOBAL REACH',   subline: 'Master the fundamentals from anywhere in the world. The same uncompromising standards, delivered to your screen.' },
  { image: '/3.png', line: 'PRACTICAL RESILIENCE — REAL SURVIVAL',subline: 'Equip yourself with the physical and mental tools needed to thrive. Iron sharpens iron in the proving ground.' },
  { image: '/2.png', line: 'INTO THE WILD — BEYOND THE SCREEN',   subline: 'Face physical exhaustion and stark isolation. With only the campfire as your witness, discover true discipline.' },
  { image: '/4.png', line: 'NOT A PREACHER — A WALKER',           subline: 'We do not trade in empty words or comfortable illusions. The path to discipline is forged through resistance.' },
];

const CARD_LABELS = [
  { num: '01', english: 'THE SCHOLAR',  arabic: 'العالم'   },
  { num: '02', english: 'DISCIPLINE',   arabic: 'الانضباط' },
  { num: '03', english: 'THE MENTOR',   arabic: 'المرشد'   },
  { num: '04', english: 'THE ATHLETE',  arabic: 'الرياضي'  },
  { num: '05', english: 'THE LEADER',   arabic: 'القائد'   },
];

function renderHeading(line) {
  const parts = line.split('—');
  if (parts.length < 2) return <>{line}</>;
  const left  = parts[0].trimEnd();
  const right = parts.slice(1).join('—').trimStart();
  return (
    <>
      {left} —{' '}
      <span style={{ fontFamily: "'Playfair Display', serif", color: 'transparent', WebkitTextStroke: '0.9px rgba(245,245,245,0.92)' }}>
        {right}
      </span>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CrossfadeBg — overlay approach: new image fades IN on top,
   old image stays underneath. No blending seam.
───────────────────────────────────────────────────────────────── */
function CrossfadeBg({ src, objectPosition = 'center 40%' }) {
  const [base, setBase]         = useState(src);
  const [overlay, setOverlay]   = useState(null);
  const [overlayOn, setOverlayOn] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (src === base) return;

    // Load new image first to avoid flash
    const img = new Image();
    img.src = src;
    const go = () => {
      clearTimeout(timerRef.current);
      setOverlay(src);
      setOverlayOn(false);

      // Let browser paint the overlay at opacity-0, then fade it in
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setOverlayOn(true);
          // After transition ends, promote overlay → base and hide it
          timerRef.current = setTimeout(() => {
            setBase(src);
            setOverlay(null);
            setOverlayOn(false);
          }, 380);
        })
      );
    };
    if (img.complete) go();
    else { img.onload = go; img.onerror = go; }

    return () => clearTimeout(timerRef.current);
  }, [src, base]);

  return (
    <>
      {/* Base — always visible underneath */}
      <img
        src={base}
        alt=""
        aria-hidden
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition,
          zIndex: 0, opacity: 1,
          pointerEvents: 'none',
        }}
      />
      {/* Overlay — fades in on top, then promoted to base */}
      {overlay && (
        <img
          src={overlay}
          alt=""
          aria-hidden
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition,
            zIndex: 1,
            opacity: overlayOn ? 1 : 0,
            transition: 'opacity 320ms ease',
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MOBILE HERO — pure swipe slideshow, NO GradientCarousel visible
───────────────────────────────────────────────────────────────── */
function MobileHero() {
  const total = SLIDES.length;
  const [current, setCurrent] = useState(0);
  const [textPhase, setTextPhase] = useState('idle');
  const touchStartX = useRef(0);
  const touchStartTime = useRef(0);
  const autoRef = useRef(null);

  const goTo = useCallback((next) => {
    const idx = mod(next, total);
    setTextPhase('out');
    setTimeout(() => {
      setCurrent(idx);
      setTextPhase('in');
      setTimeout(() => setTextPhase('idle'), 300);
    }, 180);
  }, [total]);

  // Auto-advance every 4s
  useEffect(() => {
    autoRef.current = setInterval(() => goTo(current + 1), 4000);
    return () => clearInterval(autoRef.current);
  }, [current, goTo]);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => goTo(current + 1), 4000);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
  };
  const handleTouchEnd = (e) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dt = Date.now() - touchStartTime.current;
    if (Math.abs(dx) > 38 && dt < 500) {
      resetAuto();
      goTo(dx > 0 ? current + 1 : current - 1);
    }
  };

  const slide = SLIDES[current];
  const label = CARD_LABELS[current];

  return (
    <section
      id="hero"
      data-testid="hero-section"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        height: '88vh',
        minHeight: '500px',
        overflow: 'hidden',
        borderRadius: '0.8rem',
        border: '1px solid rgba(255,255,255,0.06)',
        userSelect: 'none',
      }}
    >
      {/* Background — clean crossfade */}
      <CrossfadeBg src={slide.image} objectPosition="center 30%" />

      {/* Dark gradient — lighter top, heavy bottom */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.65) 65%, rgba(0,0,0,0.92) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Slide label — top right */}
      <div style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 4,
        display: 'flex', alignItems: 'center', gap: '7px',
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(8px)',
        borderRadius: '100px',
        padding: '5px 10px',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <span style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontSize: '11px', color: '#c9a84c' }}>
          {label.arabic}
        </span>
        <span style={{ width: '1px', height: '10px', background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', color: 'rgba(245,245,245,0.85)', letterSpacing: '0.08em' }}>
          {label.english}
        </span>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', color: 'rgba(245,245,245,0.35)', letterSpacing: '0.05em' }}>
          {label.num}
        </span>
      </div>

      {/* Bottom text */}
      <div
        data-testid="hero-card-copy"
        className={`hero-card-copy hero-card-copy--${textPhase}`}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          zIndex: 4, padding: '1rem 1.1rem 1.3rem',
        }}
      >
        <h2 style={{
          margin: 0,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(1.55rem, 5.5vw, 2.1rem)',
          lineHeight: 1,
          letterSpacing: '0.02em',
          color: '#F5F5F0',
        }}>
          {renderHeading(slide.line)}
        </h2>
        <p style={{
          margin: '0.35rem 0 0.9rem',
          color: 'rgba(245,245,245,0.68)',
          fontSize: '0.8rem',
          lineHeight: 1.5,
          fontFamily: "'Space Grotesk', sans-serif",
          maxWidth: '340px',
        }}>
          {slide.subline}
        </p>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { resetAuto(); goTo(i); }}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === current ? '#1A6B3C' : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 300ms ease, background 300ms ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DESKTOP / TABLET HERO — GradientCarousel, fixed crossfade
───────────────────────────────────────────────────────────────── */
function DesktopHero() {
  const prepared = useMemo(() => SLIDES.map(c => c.image), []);
  const [activeCard, setActiveCard]   = useState(0);
  const [displayCard, setDisplayCard] = useState(0);
  const [textPhase, setTextPhase]     = useState('idle');

  // Text swap
  useEffect(() => {
    if (activeCard === displayCard) return;
    setTextPhase('out');
    const t1 = setTimeout(() => { setDisplayCard(activeCard); setTextPhase('in'); }, 160);
    const t2 = setTimeout(() => setTextPhase('idle'), 380);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [activeCard, displayCard]);

  const card = SLIDES[displayCard];

  return (
    <section
      id="hero"
      data-testid="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '88vh',
        border: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
        borderRadius: '1.2rem',
      }}
    >
      {/* Background — clean overlay crossfade */}
      <CrossfadeBg src={card.image} objectPosition="center 42%" />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.18) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', alignItems: 'center',
        padding: '0 clamp(1rem, 3vw, 2.5rem)',
      }}>
        <div className="hero-layout-grid" style={{ width: '100%', maxWidth: '1600px', margin: '0 auto' }}>

          {/* Left: text */}
          <div className="hero-left-col">
            <div
              data-testid="hero-card-copy"
              className={`hero-card-copy hero-card-copy--${textPhase}`}
            >
              <h2 style={{
                margin: 0,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(1.6rem, 3.2vw, 4.2rem)',
                lineHeight: 0.97,
                letterSpacing: '0.03em',
                color: '#F5F5F0',
              }}>
                {renderHeading(card.line)}
              </h2>
              <p style={{
                margin: '0.5rem 0 0',
                color: 'rgba(245,245,245,0.75)',
                fontSize: 'clamp(0.76rem, 1.1vw, 0.96rem)',
                lineHeight: 1.58,
                fontFamily: "'Space Grotesk', sans-serif",
                maxWidth: '320px',
              }}>
                {card.subline}
              </p>
            </div>
          </div>

          {/* Right: name + carousel */}
          <div className="hero-right-col">
            <p data-testid="hero-right-name" style={{
              margin: '0 0 0.3rem',
              width: '100%',
              textAlign: 'right',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(0.9rem, 1.5vw, 1.5rem)',
              letterSpacing: '0.14em',
              color: 'rgba(245,245,245,0.78)',
            }}>
              Faris Al Hammadi
            </p>
            <div data-testid="hero-carousel-container" style={{ width: '100%', height: 'clamp(360px, 55vh, 540px)' }}>
              <GradientCarousel
                images={prepared}
                cardLabels={CARD_LABELS}
                maxRotationDegrees={4}
                maxDepthPx={170}
                minScale={0.86}
                cardGap={47}
                frictionFactor={0.86}
                wheelSensitivity={0.0015}
                dragSensitivity={0.008}
                backgroundBlur={20}
                gradientIntensity={0.68}
                gradientSize={0.9}
                cardAspectRatio={340 / 520}
                initialIndex={0}
                snapStrength={0.14}
                snapThreshold={0.018}
                enableKeyboard={true}
                showBackground={false}
                activeAlign="left"
                leftInsetPx={20}
                activeOffsetCards={0}
                cardWidthVw={18.315}
                cardMaxWidthPx={226}
                onCardChange={setActiveCard}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-layout-grid {
          display: grid;
          grid-template-columns: 0.75fr 1.4fr;
          column-gap: clamp(1rem, 2.5vw, 3.5rem);
          align-items: center;
        }
        .hero-left-col  { grid-column: 1; align-self: center; display: flex; justify-content: flex-start; }
        .hero-right-col { grid-column: 2; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; }
        @media (max-width: 900px) and (min-width: 641px) {
          .hero-layout-grid { grid-template-columns: 1fr 1.3fr; column-gap: 1.2rem; }
        }
        .hero-card-copy { opacity: 1; transform: translateY(0); }
        .hero-card-copy--out { animation: heroOut 160ms ease both; }
        .hero-card-copy--in  { animation: heroIn  240ms ease both; }
        @keyframes heroOut { from { opacity:1; transform:translateY(0);    } to { opacity:0; transform:translateY(-10px); } }
        @keyframes heroIn  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0);    } }

        /* GradientCarousel */
        .gc-root { position:relative; width:100%; height:100%; cursor:grab; overflow:visible; background:transparent; }
        .gc-root:active { cursor:grabbing; }
        .gc-canvas { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }
        .gc-stage  { position:absolute; inset:0; transform-style:preserve-3d; z-index:2; }
        .gc-card-wrap { position:absolute; top:50%; left:50%; transform-style:preserve-3d; will-change:transform; }
        .gc-card { width:100%; height:100%; object-fit:cover; border-radius:1.2rem; border:1px solid rgba(26,107,60,0.22); box-shadow:0 18px 40px rgba(0,0,0,0.5); display:block; }
        .gc-card-label { position:absolute; inset:0; border-radius:1.2rem; overflow:hidden; pointer-events:none; }
        .gc-card-label-bg { position:absolute; bottom:0; left:0; right:0; height:50%; background:linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%); }
        .gc-card-label-content { position:absolute; bottom:0; left:0; right:0; padding:0 0.8rem 0.7rem; }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ROOT — switch based on viewport width
───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return isMobile ? <MobileHero /> : <DesktopHero />;
}
