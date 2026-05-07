# Al-Qudwah — Variant 2 PRD
## Design Pattern: Atelier Arc Aesthetic
**Client:** Faris Hammadi | **Brand:** Al-Qudwah / القدوة
**Variant:** 2 — Rounded, Glassmorphic, Warm-Dark Premium

---

## What This Variant Is

This variant takes the exact structural and visual DNA of the Atelier Arc code and re-skins it for Al-Qudwah. The layout logic, component architecture, and interaction patterns are borrowed directly from that codebase. The brand identity, content, color, typography, and imagery are Al-Qudwah's.

The result is a site that feels warmer and more approachable than Variant 1 — still premium and dark, but with softness in the geometry (rounded cards, glassmorphic nav, pill buttons) that makes it more accessible to the teenage and young adult audience.

---

## How Atelier Arc Maps to Al-Qudwah

| Atelier Arc Element | Al-Qudwah Equivalent |
|---|---|
| Floating glass pill nav | Same structure — Al-Qudwah logo + 3 links + "Book Consultation" pill CTA |
| Rounded hero container (2.5rem) | Full-screen rounded section — Faris thobe portrait as background |
| Hero centered text + two pill CTAs | "THE BODY IS JUST THE BEGINNING" headline + Arabic subtitle + two CTAs |
| Portfolio carousel overlapping hero (-mt-32) | Programs carousel overlapping hero with same negative margin trick |
| 3D card arrangement (left/center/right) | Same 3-scale card depth — center card is active program |
| Cards with hover gradient reveal | Program cards reveal title + description on hover |
| Dark background #1a1a1a | Near-black #080808 |
| White accent | Power green #2E8B57 |
| Space Grotesk font | Space Grotesk (keep) + Noto Kufi Arabic for Arabic elements |

---

## Design System

### Colors

| Token | Hex | Usage |
|---|---|---|
| Background | `#0A0A0A` | Page base — slightly warmer than pure black |
| Surface | `#161616` | Hero section, card backgrounds |
| Surface Elevated | `#1E1E1E` | Elevated cards, hover states |
| Power Green | `#2E8B57` | Primary CTA buttons, active states, key accents |
| Sage | `#9DC183` | Tags, labels, secondary accents |
| Warm Gold | `#C9A84C` | Arabic text, Islamic geometric accents only |
| White | `#F5F5F5` | Headlines |
| Dim White | `rgba(245,245,245,0.60)` | Body text, descriptions |
| Muted White | `rgba(245,245,245,0.30)` | Captions, nav links at rest |
| Glass Fill | `rgba(255,255,255,0.08)` | Nav glass, card glass overlays |
| Glass Border | `rgba(255,255,255,0.10)` | Nav border, glass card borders |
| Green Glow | `rgba(46,139,87,0.20)` | CTA button shadows, active card glow |

### Typography

| Role | Font | Notes |
|---|---|---|
| Display / Hero | Space Grotesk 700 | Same as Atelier Arc — bold, modern, youth-facing |
| Section Titles | Space Grotesk 600 | Slightly smaller than hero |
| Arabic Elements | Noto Kufi Arabic 700 | All Arabic text — sized 15% larger than Latin equivalent |
| Body | Space Grotesk 400 | Line height 1.75 |
| Labels / Tags | Space Grotesk 500 | 0.7rem, letter-spacing 0.15em, uppercase |
| Nav Links | Space Grotesk 500 | 0.85rem |

**Why Space Grotesk instead of Bebas Neue:**
The Atelier Arc codebase uses Space Grotesk throughout. For Variant 2, we keep it — it reads younger, rounder, more accessible than Bebas Neue, which suits the teenage audience better. Bebas Neue is reserved for Variant 1 (the harder, more cinematic direction).

### Border Radius System
Directly inherited from Atelier Arc:

| Element | Radius |
|---|---|
| Hero section container | `2.5rem` (40px) |
| Large program cards | `2.5rem` |
| Medium program cards | `2rem` |
| Navigation bar | `9999px` (full pill) |
| CTA buttons | `9999px` (full pill) |
| Stat cards | `1rem` |
| Testimonial cards | `1.5rem` |

Everything is rounded. This is the core visual difference from Variant 1. No sharp 2px corners anywhere.

---

## Component Specifications

### 1. Navigation — Glass Pill (Floating)

**Structure:** Directly from Atelier Arc nav code.

```
Position: fixed, top-6, centered (left-1/2 transform -translate-x-1/2)
Width: 90% of viewport, max-width 5xl
Background: rgba(255,255,255,0.08) — glass fill
Backdrop filter: blur(10px)
Border: 1px solid rgba(255,255,255,0.10)
Border radius: 9999px (full pill)
Padding: px-6 py-4
```

**Left:** Al-Qudwah | القدوة — logo text, Space Grotesk 600, white. The Arabic portion in warm gold `#C9A84C`.

**Center:** Three links — Programs · About · Camping

**Right:** "Book Consultation" — pill button, background `#2E8B57`, white text, hover darkens to `#256b44`

**Scroll behavior:** Nav starts with glass fill visible at all times (no transparency-to-solid transition needed — the glass already reads as floating). Add subtle green bottom border glow on scroll: `box-shadow: 0 4px 30px rgba(46,139,87,0.15)`.

---

### 2. Hero Section — Rounded Container

**Structure:** Directly from Atelier Arc hero section.

```
Width: full, max-width 7xl
Height: 85vh
Border radius: 2.5rem
Overflow: hidden
Margin top: mt-20 (clears the floating nav)
Position: relative
```

**Background image:** Faris thobe portrait (Image 14 — arms crossed, warm smile) as `object-cover`. This is the primary hero image for Variant 2. The rounded container and warm portrait together immediately establish the mentor-first, athlete-second identity.

**Overlays:**
- Dark overlay: `rgba(0,0,0,0.25)` — lighter than Variant 1, keeps the portrait visible and warm
- Gradient: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)` — same as Atelier Arc, darkens bottom for text legibility

**Hero content (centered, z-10):**

```
Tag line (above title):
— Font: Space Grotesk 500, 0.75rem, letter-spacing 0.18em, uppercase
— Color: #9DC183 (sage)
— Content: "Real Role Models · Real Lives"

Main headline:
— Font: Space Grotesk 700, clamp(3rem, 7vw, 6rem)
— Color: #F5F5F5
— Content: "THE BODY IS JUST THE BEGINNING"

Arabic subtitle:
— Font: Noto Kufi Arabic 700
— Color: #C9A84C (warm gold)
— Size: clamp(1.2rem, 3vw, 2rem)
— Content: القدوة في العمل لا في الكلام

Body text:
— Font: Space Grotesk 400, 1.05rem
— Color: rgba(245,245,245,0.65)
— Max width: 480px, centered
— Content: "Faris Hammadi walks the journey alongside you. Not a preacher. A walker."

Two CTAs (pill buttons):
— Primary: "Explore Programs" — white background, black text, pill — same as Atelier Arc primary CTA
— Secondary: "Who is Faris?" — glass style (rgba(255,255,255,0.15) bg, white text, glass border) — same as Atelier Arc secondary CTA
```

**Subtle background detail:** Islamic geometric pattern SVG at 5% opacity overlaid on top of the image. Sits between the image and the dark overlay. Adds cultural depth without competing with the portrait.

---

### 3. Programs Carousel — Overlapping the Hero

**Structure:** Directly from Atelier Arc portfolio carousel. This is the section that makes both sites feel cinematic.

```
Position: relative
Margin top: -mt-32 (overlaps hero by 8rem)
z-index: 20
Max width: 1400px
Perspective: 1000px
```

**Card arrangement (same 3D logic as Atelier Arc):**

```
card-3d-left:   rotateY(15deg) translateZ(-50px) — dimmed, smaller
card-3d-center: rotateY(0deg) translateZ(0) — dominant, full opacity, green border glow
card-3d-right:  rotateY(-15deg) translateZ(-50px) — dimmed, smaller
```

**5 Program Cards:**

| Position | Card Title | Arabic | Tag | Background Photo | Card Size |
|---|---|---|---|---|---|
| Far Left | Character Building | بناء الشخصية | Foundation | Image 15 (Quran reading) | 280×400px |
| Left | Life Skills | مهارات الحياة | Workshop | Image 6 (Kettlebell squat) | 260×360px |
| **Center** | **Camping with Faris** | **المخيم مع فارس** | **Signature Program** | Image 13 (Rowing — temp) | **320×480px** |
| Right | Consultation | استشارة | 1-on-1 & Group | Image 16 (Speaking at mic) | 260×360px |
| Far Right | Online Courses | الدورات | Digital | Image 7 (Barbell overhead) | 280×400px |

**Center card specifics (the featured program):**
```
Border: 1px solid rgba(46,139,87,0.35)
Box shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(46,139,87,0.15)
Border radius: 2.5rem
```

Center card always shows full content — tag, Arabic title, Latin title, short description. Side cards reveal on hover only (same as Atelier Arc hover opacity transition).

**Card hover behavior:**
```
transform: translateY(-10px) scale(1.02)
box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(46,139,87,0.12)
transition: 0.3s ease
```

**Navigation:** Prev/Next arrow buttons (not from Atelier Arc — add these). Positioned outside the carousel track, vertically centered on the card row. Style: glass pill buttons matching the nav aesthetic.

**Mobile:** Horizontal scroll with `snap-x snap-mandatory` — same as Atelier Arc. Cards become single-column swipe.

---

### 4. About Section

**Deviation from Atelier Arc — this section is custom.** Two columns, not a carousel.

**Left column:** Rounded image container (2rem radius) containing Image 14 (thobe portrait). Two floating glass stat cards overlapping the image:
- Top right: "500+" in Power Green, "Youth Mentored" label
- Bottom left: "7+" in Power Green, "Years on the Path" label

Stat cards style: `rgba(10,10,10,0.85)` background, `backdrop-filter: blur(12px)`, `border: 1px solid rgba(255,255,255,0.10)`, `border-radius: 1rem`.

**Right column:**
- Sage tag: "The Man Behind the Mission"
- Space Grotesk 700 headline: "Not a Preacher. A Walker."
- Two bio paragraphs in dim white
- Three value rows: small rounded icon box + text
- Pill CTA: "Learn His Story"

---

### 5. Philosophy Pull Quote Section

Full-width dark section. Center-aligned. No images. Pure typography.

```
Background: #0A0A0A
Padding: 6rem vertical
Islamic geometric pattern: SVG watermark at 4% opacity
```

**Quote:**
```
Font: Space Grotesk 500, clamp(1.2rem, 2.5vw, 1.8rem)
Color: rgba(245,245,245,0.75)
Max width: 700px, centered
Line height: 1.85

"The strongest version of yourself
is the one who fears Allah
more than he fears failure."
```

Attribution line:
```
Font: Noto Kufi Arabic 600 + Space Grotesk 500
Color: #C9A84C (warm gold)
Content: — Faris Hammadi | فارس حمادي
```

Thin horizontal lines left and right of the quote block in `rgba(46,139,87,0.25)`. Islamic geometric icon centered above the quote at 30px size, in sage green.

---

### 6. How We Grow — 4 Column Grid

```
Background: #161616
Border top and bottom: 1px solid rgba(255,255,255,0.07)
```

Each column: large faded number, bold title, description, green arrow link.

On hover: green pill tag appears at top of column reading the column category. Column background lightens slightly to `#1E1E1E`. Bottom border sweeps left to right in green.

| Column | Title | Content |
|---|---|---|
| 01 | Individual Sessions | Direct, honest, personalized time with Faris |
| 02 | Group Workshops | Shared growth and community accountability |
| 03 | Online Learning | Flexible structured courses at your pace |
| 04 | Camping with Faris | Nature as the ultimate classroom |

---

### 7. Camping Section

Two-column layout. Same roundedness as the hero.

**Left:** Rounded image container (2rem radius). Dark atmospheric art — mountains, tent, night sky in green tones. Placeholder until real outdoor photos are available. Small badge overlay: "Next Camp: Register Now" — pill shape, green background.

**Right:**
- Sage tag: "Beyond the Screen"
- Headline: "Camping with Faris"
- Description
- 4 feature pills (not bullet points — pill chips): Leadership · Self-Reliance · Brotherhood · Values in Action
- CTA pill button: "Join the Next Camp" — Power Green

Feature pills style: `rgba(46,139,87,0.15)` background, `1px solid rgba(46,139,87,0.3)` border, `border-radius: 9999px`, sage green text.

---

### 8. Testimonials

3-column grid on mobile → stacked single column.

Card style: `#161616` background, `border-radius: 1.5rem`, `border: 1px solid rgba(255,255,255,0.07)`. Hover: border becomes `rgba(46,139,87,0.3)`, card translates up 6px.

Large decorative quote mark in Power Green (opacity 0.3). Testimonial text. Avatar circle (gradient green) + name + role.

---

### 9. CTA Section

```
Background: #0A0A0A
Large Arabic watermark: القدوة at 3% opacity, 20vw font size
Green radial glow from bottom: radial-gradient(ellipse at 50% 100%, rgba(46,139,87,0.18) 0%, transparent 65%)
```

Centered content:
- Sage tag: "The Journey Starts Here"
- Headline Space Grotesk 700: "Ready to Walk the Path?"
- Sub-copy dim white
- Two pill CTAs: "Book Consultation" (green fill) + "Browse Programs" (glass style)

---

### 10. Footer

Minimal single row: Logo left · Links center · Copyright right.
Thin top border: `rgba(255,255,255,0.07)`.

---

## Implementation Notes for the Developer

### CSS Classes to Port from Atelier Arc

These classes from the Atelier Arc code are reused directly. Rename them to match Al-Qudwah's context:

```css
/* Keep as-is — just update the color values */
.glass-nav {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.10);
}

/* Keep as-is */
.carousel-container {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.carousel-container::-webkit-scrollbar {
  display: none;
}

/* Update hover to include green glow */
.carousel-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.carousel-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(46,139,87,0.12);
}

/* Keep 3D card system — just update active card border */
.perspective-container {
  perspective: 1000px;
}
.card-3d-left {
  transform: rotateY(15deg) translateZ(-50px);
  opacity: 0.65;
}
.card-3d-center {
  transform: rotateY(0deg) translateZ(0);
  z-index: 10;
  border: 1px solid rgba(46,139,87,0.35); /* green instead of white */
}
.card-3d-right {
  transform: rotateY(-15deg) translateZ(-50px);
  opacity: 0.65;
}
```

### Structural Changes from Atelier Arc

| Atelier Arc | Al-Qudwah Variant 2 | Change |
|---|---|---|
| Logo = home SVG icon | Logo = "Al-Qudwah \| القدوة" text | Replace SVG with text logo |
| 3 nav links: Work · Studio · Journal | 3 nav links: Programs · About · Camping | Content swap |
| CTA: "Collaborate" pill | CTA: "Book Consultation" pill | Content + color swap |
| Hero bg: desert landscape stock | Hero bg: Image 14 (Faris thobe portrait) | Real photo |
| Hero headline: "Atelier Arc" | Hero headline: "The Body Is Just The Beginning" | Full content rework |
| Hero CTA 1: "Portfolio" white pill | Hero CTA 1: "Explore Programs" white pill | Content swap |
| Hero CTA 2: "Approach" glass pill | Hero CTA 2: "Who is Faris?" glass pill | Content swap |
| -mt-32 portfolio carousel | -mt-32 programs carousel | Same negative margin trick |
| 5 architecture photo cards | 5 program cards with Faris photos | Photo + content swap |
| bg-[#1a1a1a] | bg-[#0a0a0a] | Slightly deeper dark |
| White accent throughout | Green #2E8B57 accent throughout | Color system swap |

### Additional Sections Not in Atelier Arc (Build Fresh)

These sections don't exist in the Atelier Arc code and need to be built from scratch — but styled consistently with the same rounded, glass, warm-dark aesthetic:

1. Marquee strip (below hero, above carousel)
2. About section (two-column)
3. Philosophy quote section
4. How We Grow grid
5. Camping section
6. Testimonials
7. CTA section
8. Footer

---

## Photo Assignment — Variant 2

| Section | Photo | Treatment |
|---|---|---|
| Hero background | Image 14 — thobe, arms crossed, warm smile | Light dark overlay (0.25 opacity), keep warmth |
| Carousel — Center card | Image 13 — rowing machine | Dark overlay — replace with outdoor photo at launch |
| Carousel — Far Left | Image 15 — reading Quran | Warm treatment, keep light quality |
| Carousel — Left | Image 6 — kettlebell squat | Dark green grade |
| Carousel — Right | Image 16 — speaking at mic | Natural light, slight warmth |
| Carousel — Far Right | Image 7 — barbell overhead press | Dark green grade |
| About section | Image 14 — thobe portrait | Keep bright, no dark treatment |

---

## Stitch Prompts — Variant 2

### Prompt 1 — Full Page Layout

```
Dark premium personal branding landing page for Islamic mentor 
Faris Hammadi, brand name Al-Qudwah. Based on the Atelier Arc 
aesthetic: rounded hero container (40px border radius), floating 
glassmorphic pill navigation, portfolio-style card carousel that 
overlaps the hero with negative margin. Dark background #0A0A0A. 
Colors: #2E8B57 green for primary actions, #9DC183 sage for 
labels, #C9A84C warm gold for Arabic text, white for headlines. 
Font: Space Grotesk bold for headlines.

Navigation: floating glass pill centered at top, "Al-Qudwah" 
logo left, three links center (Programs, About, Camping), 
green pill CTA button "Book Consultation" right.

Hero: large rounded container 85vh, background is portrait of 
confident man in white traditional Arab thobe arms crossed. 
Dark gradient overlay bottom. Centered text: large bold headline 
"THE BODY IS JUST THE BEGINNING", Arabic subtitle in warm gold 
below, short tagline in dim white, two pill CTAs.

Below hero: horizontal card carousel overlapping hero with 
negative margin. Five tall portrait cards in 3D perspective 
arrangement — center card largest with green glow border, 
side cards smaller and rotated. Cards show mentor and fitness 
program names: Character Building, Life Skills, Camping with 
Faris (center/featured), Consultation, Online Courses.

Premium, warm-dark, youthful, mentor brand. NOT a fitness app. 
Islamic mentorship platform with athletic discipline as context.
```

### Prompt 2 — Hero Only

```
Rounded hero section for personal brand Al-Qudwah / Faris Hammadi. 
Container: 85vh tall, rounded corners 40px, overflow hidden, 
background is real portrait of man in white traditional Arab thobe 
with full white beard, arms crossed, smiling confidently. 
Image covers full container. Dark gradient overlay from bottom 
60% opacity. On top of gradient, centered vertically offset 
slightly upward: small sage green uppercase tag 
"REAL ROLE MODELS · REAL LIVES". Then large bold Space Grotesk 
headline "THE BODY IS JUST THE BEGINNING" in white. 
Below: Arabic text القدوة في العمل لا في الكلام in warm gold 
#C9A84C. Below: short dim white body sentence. Two pill buttons: 
white fill "Explore Programs" and glass/transparent "Who is Faris?". 
Dark background #0A0A0A surrounds the rounded container. 
Subtle Islamic geometric pattern texture at 4% opacity over image.
```

### Prompt 3 — Carousel Section

```
Dark section showing horizontal 3D card carousel for programs. 
5 tall portrait cards in perspective view. Background #0A0A0A. 
Center card: 320×480px, border-radius 40px, border 1px green 
rgba(46,139,87,0.35), green glow box shadow, full opacity. 
Shows: "Camping with Faris" title, "المخيم مع فارس" Arabic 
subtitle, "Signature Program" tag in sage green, short description, 
dark atmospheric photo background. Side cards: 260×360px, 
rotated 15 degrees on Y axis, 65% opacity, no border. 
Far side cards: 280×400px, more rotated, 50% opacity. 
Glass pill prev/next navigation buttons. All cards fully rounded. 
Warm dark premium aesthetic, green accent color.
```

---

## Variant Comparison

| | Variant 1 | Variant 2 |
|---|---|---|
| **Feel** | Raw, cinematic, hard-hitting | Warm, premium, approachable |
| **Geometry** | Sharp, 2px corners | Rounded, pill shapes, 40px radius |
| **Nav** | Flat dark bar | Floating glass pill |
| **Hero** | Full-bleed, no container | Rounded container (Atelier Arc style) |
| **Typography** | Bebas Neue — aggressive display | Space Grotesk — modern, youth-friendly |
| **Color accent** | Pure green on deep black | Green + warm gold on warm dark |
| **Arabic text** | Geometric (Noto Kufi) | Geometric (Noto Kufi) + gold color |
| **Carousel cards** | Sharp rectangular | Fully rounded (2–2.5rem) |
| **Buttons** | Sharp 2px radius | Full pill (9999px) |
| **Primary image** | Gym action shot (kettle swing) | Thobe portrait (arms crossed) |
| **Tone** | Nike Pro / Athletic first | Mentor first / Athletic as proof |
| **Best for** | Older youth 18–25, more alpha energy | Teenagers 14–20, more accessible |
| **Code base** | Next.js + GSAP + Lenis + Swiper | Tailwind CSS + Atelier Arc patterns |

---

## Recommendation

Present both variants to the client simultaneously. Variant 1 is the harder-edged, cinematic direction. Variant 2 is the warmer, more accessible direction built on the Atelier Arc structural pattern. They are the same brand, same content, same sections — different visual personality.

Let Faris choose. His gut reaction in the first 10 seconds will tell you which version of himself he wants to present to the world.

---

*Document version 1.0 — Al-Qudwah Variant 2 — May 2026*
