import React from 'react';

const ROW1 = [
  { text: 'Faris changed how I see myself.', name: 'Khalid A.', avatar: 'K' },
  { text: 'The discipline I gained extends far beyond sport.', name: 'Ibrahim S.', avatar: 'I' },
  { text: 'Best investment I ever made in myself.', name: 'Tariq H.', avatar: 'T' },
  { text: 'He makes you believe transformation is possible.', name: 'Bilal M.', avatar: 'B' },
  { text: 'The camping retreat was a spiritual reset.', name: 'Hamza R.', avatar: 'H' },
  { text: 'My mindset completely shifted in 90 days.', name: 'Adam F.', avatar: 'A' },
  { text: 'I found my purpose through Al-Qudwah.', name: 'Ziad N.', avatar: 'Z' },
  { text: 'More than fitness — it is a whole life approach.', name: 'Samir L.', avatar: 'S' },
];

const ROW2 = [
  { text: 'I stopped making excuses after meeting Faris.', name: 'Youssef K.', avatar: 'Y' },
  { text: 'Al-Qudwah gave me direction and brotherhood.', name: 'Faisal A.', avatar: 'F' },
  { text: 'His consistency inspired mine.', name: 'Nasser D.', avatar: 'N' },
  { text: 'I recommend this to every Muslim youth I know.', name: 'Majid T.', avatar: 'M' },
  { text: 'The program is hard — and that is the point.', name: 'Rayan B.', avatar: 'R' },
  { text: 'Changed my relationship with my faith too.', name: 'Amir P.', avatar: 'A' },
  { text: 'A mentor who truly walks the talk.', name: 'Yasir G.', avatar: 'Y' },
  { text: 'Worth every second and every dirham.', name: 'Moussa C.', avatar: 'M' },
];

function QuoteChip({ text, name, avatar }) {
  return (
    <div style={{
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      background: 'var(--color-surface)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '100px',
      padding: '12px 20px 12px 14px',
      margin: '0 8px',
      whiteSpace: 'nowrap',
      transition: 'border-color 0.3s ease',
    }}>
      <div style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--color-green), #0d4a27)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 700,
        color: '#fff',
        fontFamily: 'var(--font-display)',
        flexShrink: 0,
      }}>
        {avatar}
      </div>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        color: 'rgba(245,245,240,0.8)',
        fontStyle: 'italic',
      }}>
        "{text}"
      </span>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '12px',
        fontWeight: 600,
        color: 'rgba(245,245,240,0.35)',
        borderLeft: '1px solid rgba(255,255,255,0.1)',
        paddingLeft: '12px',
      }}>
        — {name}
      </span>
    </div>
  );
}

export default function VoiceTicker() {
  const row1Double = [...ROW1, ...ROW1];
  const row2Double = [...ROW2, ...ROW2];

  return (
    <section
      id="voices"
      data-testid="voice-ticker-section"
      className="marquee-wrapper"
      style={{
        padding: 'clamp(40px, 5vh, 72px) 0',
        background: 'var(--color-bg)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Section header */}
      <div style={{ padding: '0 clamp(24px, 5vw, 72px)', marginBottom: '40px', textAlign: 'center' }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-green)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--color-green)' }} />
          Chapter 07 · Voices
          <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--color-green)' }} />
        </span>
        <h2
          data-testid="voice-ticker-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            letterSpacing: '-0.04em',
            color: '#F5F5F0',
            marginTop: '12px',
          }}
        >
          What People Are <span style={{ color: 'var(--color-green)' }}>Saying.</span>
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div style={{ overflow: 'hidden', marginBottom: '16px' }}>
        <div
          className="marquee-track-left"
          style={{ display: 'flex', width: 'max-content' }}
        >
          {row1Double.map((item, i) => (
            <QuoteChip key={i} {...item} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div style={{ overflow: 'hidden' }}>
        <div
          className="marquee-track-right"
          style={{ display: 'flex', width: 'max-content' }}
        >
          {row2Double.map((item, i) => (
            <QuoteChip key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
