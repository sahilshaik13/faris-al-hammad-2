import React, { useEffect, useRef, useState } from 'react';

const IMAGES_TO_CACHE = ['/1.png', '/2.png', '/3.png', '/4.png'];
const CACHE_KEY = 'aq_assets_v2_ready';
const CACHE_TIMESTAMP_KEY = 'aq_assets_v2_cached_at';
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const CACHE_STORE_NAME = 'aq-assets-v2';

async function warmPersistentCache(urls) {
  if (!('caches' in window)) return;
  try {
    const cache = await caches.open(CACHE_STORE_NAME);
    await Promise.all(
      urls.map(async (src) => {
        const request = new Request(src, { cache: 'reload' });
        const existing = await cache.match(request);
        if (existing) return;
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
      })
    );
  } catch {
    // Non-blocking: cache priming is best-effort only.
  }
}

async function preloadAndDecodeImages(urls, onProgress) {
  let loaded = 0;
  const total = urls.length || 1;

  const bump = () => {
    loaded += 1;
    onProgress?.(loaded, total);
  };

  await Promise.all(
    urls.map((src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = async () => {
          try { await img.decode?.(); } catch {}
          const mem = window.__aqImageMemory || (window.__aqImageMemory = new Map());
          mem.set(src, img);
          bump();
          resolve();
        };
        img.onerror = () => {
          bump();
          resolve();
        };
        img.src = src;
      })
    )
  );
}

export default function LoadingScreen({ onDone }) {
  const barRef  = useRef(null);
  const rootRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let finish = null;
    let doneTimeout = null;
    const cachedAt = Number(localStorage.getItem(CACHE_TIMESTAMP_KEY) || '0');
    const cacheFresh = localStorage.getItem(CACHE_KEY) === 'true' && Date.now() - cachedAt < CACHE_TTL_MS;

    if (cacheFresh) {
      // Keep transitions smooth while avoiding a full loader on warm visits.
      preloadAndDecodeImages(IMAGES_TO_CACHE).finally(() => {
        if (cancelled) return;
        requestAnimationFrame(() => {
          if (!cancelled) onDone();
        });
      });
      return () => {
        cancelled = true;
        if (finish) clearInterval(finish);
        if (doneTimeout) clearTimeout(doneTimeout);
      };
    }

    let prog = 0;
    const total = IMAGES_TO_CACHE.length;
    let loaded = 0;

    // Tick progress to 30 while images load
    const ticker = setInterval(() => {
      if (prog < 30) { prog += 2; setProgress(prog); }
    }, 40);

    preloadAndDecodeImages(IMAGES_TO_CACHE, (done, all) => {
      if (cancelled) return;
      loaded = done;
      const p = Math.round(30 + (loaded / all) * 65);
      prog = Math.max(prog, p);
      setProgress(prog);
    }).then(async () => {
      if (cancelled) return;
      clearInterval(ticker);
      localStorage.setItem(CACHE_KEY, 'true');
      localStorage.setItem(CACHE_TIMESTAMP_KEY, String(Date.now()));
      await warmPersistentCache(IMAGES_TO_CACHE);
      if (cancelled) return;

      // Race to 100 then fade out
      let p = prog;
      finish = setInterval(() => {
        p = Math.min(100, p + 4);
        setProgress(p);
        if (p >= 100) {
          clearInterval(finish);
          // Fade out the screen
          if (rootRef.current) {
            rootRef.current.style.transition = 'opacity 520ms ease';
            rootRef.current.style.opacity = '0';
            doneTimeout = setTimeout(() => {
              if (!cancelled) onDone();
            }, 560);
          }
        }
      }, 16);
    });

    return () => {
      cancelled = true;
      clearInterval(ticker);
      if (finish) clearInterval(finish);
      if (doneTimeout) clearTimeout(doneTimeout);
    };
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      data-testid="loading-screen"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      {/* Geometric watermark */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Noto Kufi Arabic', sans-serif",
        fontSize: 'clamp(120px, 25vw, 280px)',
        color: 'rgba(26,107,60,0.04)',
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        القدوة
      </div>

      {/* Logo mark */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        position: 'relative',
        zIndex: 1,
        animation: 'aq-pulse 2s ease-in-out infinite',
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '18px',
          background: 'rgba(26,107,60,0.15)',
          border: '1px solid rgba(26,107,60,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Noto Kufi Arabic', sans-serif",
          fontSize: '28px',
          color: '#1A6B3C',
        }}>
          ق
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.8rem',
            letterSpacing: '0.15em',
            color: '#F5F5F0',
            lineHeight: 1,
          }}>
            AL-QUDWAH
          </div>
          <div style={{
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontSize: '0.85rem',
            color: 'rgba(201,168,76,0.7)',
            marginTop: '4px',
          }}>
            القدوة
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: 'min(280px, 70vw)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: '100%',
          height: '2px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div
            ref={barRef}
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #1A6B3C, #22894e)',
              borderRadius: '2px',
              transition: 'width 80ms ease',
            }}
          />
        </div>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '11px',
          color: 'rgba(245,245,245,0.3)',
          letterSpacing: '0.12em',
        }}>
          {progress < 100 ? 'Loading...' : 'Ready'}
        </div>
      </div>

      <style>{`
        @keyframes aq-pulse {
          0%, 100% { opacity: 0.8; transform: translateY(0); }
          50%       { opacity: 1;   transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
