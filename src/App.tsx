import { useEffect, useMemo, useState } from "react";
import { GradientCarousel } from "./GradientCarousel";

const FARIS_PORTRAIT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA_qtWXB7DAhXr-b2qSf1D-NIkcOPmjFkSNWxdelrLJePJbYEYjETcXHKYIetWNXGGbj1ItBU8QaaM3qnWeB6qvXg0wRWH4KU5xJCorhFz9Ac8xTEoBKKbw2Po5DpJSmyX6YcB0LGLaFHJRz_aL2MGyqsm03vlsVm1qA1M3So0JGzyc7y4MFgqaIS_auEjqLoDhwky2Ex0MwykvqdmzV4XFL9XaX1bdUcmB55ejswTItWsLPU0faf-reqUwRus7Ve82iaFwi8lnqjrN";

const carouselCards = [
  {
    image: "/1.png",
    line: "DIRECT & HONEST — NO ILLUSIONS",
    subline:
      "One-on-one time where you are truly seen and heard. We strip away modern distraction to find your core strength.",
    ctaLabel: "View About",
    ctaHref: "#about",
  },
  {
    image: "/2.png",
    line: "DIGITAL DISCIPLINE — GLOBAL REACH",
    subline:
      "Master the fundamentals from anywhere in the world. The same uncompromising standards delivered to your screen.",
    ctaLabel: "Explore Programs",
    ctaHref: "#programs",
  },
  {
    image: "/3.png",
    line: "PRACTICAL RESILIENCE — REAL SURVIVAL",
    subline:
      "Equip yourself with the physical and mental tools needed to thrive. Iron sharpens iron in the proving ground.",
    ctaLabel: "See Experiences",
    ctaHref: "#experiences",
  },
  {
    image: "/4.png",
    line: "INTO THE WILD — BEYOND THE SCREEN",
    subline:
      "Face physical exhaustion and stark isolation. With only the campfire as your witness, discover true foundational discipline.",
    ctaLabel: "Go to Camping",
    ctaHref: "#camping",
  },
  {
    image: "/2.png",
    line: "NOT A PREACHER — A WALKER",
    subline:
      "We do not trade in empty words or comfortable illusions. The path to discipline is forged through resistance.",
    ctaLabel: "Book Consultation",
    ctaHref: "#cta",
  },
];

const values = [
  "Authenticity over performance",
  "Islamic values as a foundation for strength",
  "Discipline as the path to lasting transformation",
];

const testimonials = [
  {
    quote:
      "Faris doesn't give hype. He gives structure. That's what changed me.",
    name: "AH",
    role: "Student",
  },
  {
    quote:
      "Group workshops built accountability in a way I never felt before.",
    name: "YM",
    role: "Workshop Member",
  },
  {
    quote:
      "Mentor-first energy. Athletic discipline as proof, not performance.",
    name: "SK",
    role: "Parent",
  },
];

const growColumns = [
  {
    num: "01",
    title: "Individual Sessions",
    desc: "Direct, honest, personalized time with Faris.",
  },
  {
    num: "02",
    title: "Group Workshops",
    desc: "Shared growth and community accountability.",
  },
  {
    num: "03",
    title: "Online Learning",
    desc: "Flexible structured courses at your own pace.",
  },
  {
    num: "04",
    title: "Camping with Faris",
    desc: "Nature as the ultimate classroom.",
  },
];

const chipItems = [
  "Leadership",
  "Self-Reliance",
  "Brotherhood",
  "Values in Action",
];

function renderCarouselHeading(line: string) {
  const parts = line.split("—");
  if (parts.length < 2) return line;

  const left = parts[0].trimEnd();
  const right = parts.slice(1).join("—").trimStart();

  return (
    <>
      {left} — <span className="hollow-tail">{right}</span>
    </>
  );
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function App() {
  const prepared = useMemo(() => carouselCards.map((card) => card.image), []);
  const [activeCard, setActiveCard] = useState(0);
  const [displayCard, setDisplayCard] = useState(
    mod(-1, carouselCards.length)
  );
  const [textPhase, setTextPhase] = useState<"idle" | "out" | "in">("idle");
  const [heroImageCurrent, setHeroImageCurrent] = useState(
    carouselCards[displayCard].image
  );
  const [heroImagePrev, setHeroImagePrev] = useState<string | null>(null);
  const [heroImageFading, setHeroImageFading] = useState(false);

  useEffect(() => {
    const previousCard = mod(activeCard - 1, carouselCards.length);
    if (previousCard === displayCard) return;

    setTextPhase("out");

    const swapTimer = window.setTimeout(() => {
      setDisplayCard(previousCard);
      setTextPhase("in");
    }, 170);

    const settleTimer = window.setTimeout(() => {
      setTextPhase("idle");
    }, 430);

    return () => {
      window.clearTimeout(swapTimer);
      window.clearTimeout(settleTimer);
    };
  }, [activeCard, displayCard]);

  useEffect(() => {
    const nextImage = carouselCards[displayCard].image;
    if (nextImage === heroImageCurrent) return;

    setHeroImagePrev(heroImageCurrent);
    setHeroImageCurrent(nextImage);
    setHeroImageFading(true);

    const t = window.setTimeout(() => {
      setHeroImagePrev(null);
      setHeroImageFading(false);
    }, 420);
    return () => window.clearTimeout(t);
  }, [carouselCards, displayCard, heroImageCurrent]);

  const handleSectionJump = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();

    const startY = window.scrollY;
    const targetY =
      target.getBoundingClientRect().top + window.scrollY - 84;
    const duration = 900;
    const start = performance.now();
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const y = startY + (targetY - startY) * ease(p);
      window.scrollTo(0, y);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="site-root">
      <nav className="main-nav">
        <a aria-label="Home" className="home-icon" href="#">
          Al-Qudwah <span>القدوة</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#programs">Programs</a>
          <a href="#camping">Camping</a>
          <a href="#cta">Consultation</a>
        </div>
      </nav>

      <main className="main-content">
        <section className="hero-banner" id="hero">
          {heroImagePrev ? (
            <img
              src={heroImagePrev}
              alt="Faris Hammadi hero previous"
              className={`hero-bg hero-bg-prev ${heroImageFading ? "is-fading" : ""}`}
            />
          ) : null}
          <img
            src={heroImageCurrent}
            alt="Faris Hammadi hero"
            className={`hero-bg hero-bg-current ${heroImageFading ? "is-fading" : ""}`}
          />
          <div className="hero-overlay" />
          <div className="hero-content-overlay">
            <div className="hero-layout">
              <div className="hero-copy-left">
                <div className="hero-left-stack">
                  <div className={`hero-card-copy hero-card-copy--${textPhase}`}>
                    <h2>{renderCarouselHeading(carouselCards[displayCard].line)}</h2>
                    <p>{carouselCards[displayCard].subline}</p>
                    <a
                      href={carouselCards[displayCard].ctaHref}
                      className="hero-card-link"
                      onClick={(e) =>
                        handleSectionJump(e, carouselCards[displayCard].ctaHref)
                      }
                    >
                      {carouselCards[displayCard].ctaLabel}
                    </a>
                  </div>
                </div>
              </div>
              <div className="hero-carousel-right">
                <p className="hero-right-name">Faris Al Hammadi</p>
                <div className="hero-inline-carousel" id="programs">
                  <GradientCarousel
                    images={prepared}
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
                    enableKeyboard
                    showBackground={false}
                    activeAlign="left"
                    leftInsetPx={20}
                    activeOffsetCards={0}
                    onCardChange={setActiveCard}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="quote-section">
          <div className="quote-icon">✦</div>
          <blockquote>
            “The strongest version of yourself is the one who fears Allah more
            than he fears failure.”
          </blockquote>
          <p className="quote-author">— Faris Hammadi | فارس حمادي</p>
        </section>

        <section className="about-section" id="about">
          <div className="about-content">
            <p className="label">The Man Behind the Mission</p>
            <h2>Not a Preacher. A Walker.</h2>
            <p>
              Faris represents a rare balance: built through discipline and
              grounded in values. His message is direct, practical, and rooted
              in real life.
            </p>
            <p>
              This is not performance. It is consistency. Strength in the dunya
              and clarity in the deen.
            </p>
            <ul>{values.map((v) => <li key={v}>{v}</li>)}</ul>
            <a href="#" className="btn-primary">
              Learn His Story
            </a>
          </div>
          <div className="about-image-wrap">
            <img src={FARIS_PORTRAIT_IMAGE} alt="Faris portrait" />
          </div>
        </section>

        <section className="grow-grid" id="experiences">
          {growColumns.map((col) => (
            <article key={col.num} className="grow-card">
              <span className="num">{col.num}</span>
              <h3>{col.title}</h3>
              <p>{col.desc}</p>
            <span className="grow-pill">Category</span>
              <a href="#">Learn more →</a>
            </article>
          ))}
        </section>

        <section className="camping" id="camping">
          <div className="camp-visual">
            <img src="/4.png" alt="Camping with Faris" />
            <span className="camp-badge">Next Camp: Register Now</span>
          </div>
          <div className="camp-content">
            <p className="label">Beyond the Screen</p>
            <h2>CAMPING WITH FARIS</h2>
            <p>
              Outdoor programs designed to build leadership, self-reliance, and
              brotherhood through shared challenge and presence.
            </p>
            <div className="chip-row">
              {chipItems.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
            <a href="#" className="btn-primary">
              Join the Next Camp
            </a>
          </div>
        </section>

        <section className="testimonials">
          {testimonials.map((item) => (
            <article key={item.name}>
              <span>“</span>
              <p>{item.quote}</p>
              <h4>
                {item.name} · {item.role}
              </h4>
            </article>
          ))}
        </section>

        <section className="final-cta" id="cta">
          <div className="watermark">القدوة</div>
          <p className="label">The Journey Starts Here</p>
          <h2>READY TO WALK THE PATH?</h2>
          <p>
            Are you serious about your character? Apply for consultation and
            take the first real step.
          </p>
          <div className="hero-actions">
            <a href="#" className="btn-primary">
              Book Consultation
            </a>
            <a href="#programs" className="btn-glass">
              Browse Programs
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Al-Qudwah | القدوة</p>
        <div>
          <a href="#programs">Programs</a>
          <a href="#about">About</a>
          <a href="#camping">Camping</a>
        </div>
        <small>© 2026 Al-Qudwah. All rights reserved.</small>
      </footer>
    </div>
  );
}

