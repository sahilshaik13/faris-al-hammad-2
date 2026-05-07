# Al-Qudwah — فارس حمادي
## Complete Project Document
**Client:** Faris Hammadi | **Brand:** Al-Qudwah / القدوة
**Prepared by:** Your Agency | **Date:** May 2026

---

# 1. Brand Identity

| Property | Value |
|---|---|
| Client Name | Faris Hammadi |
| Brand Name | Al-Qudwah / القدوة |
| Tagline | القدوة في العمل لا في الكلام |
| Tagline (EN) | Role models are defined by actions, not words |
| Positioning | Islamic Andrew Tate — elite, disciplined, values-grounded |
| Target Audience | Teenagers and young adults (16–28) |
| Tone | Raw, disciplined, cinematic, elite — not soft or corporate |

---

## Color System

| Name | Hex | Usage |
|---|---|---|
| Power Green | `#2E8B57` | Primary action color — buttons, accents, underlines only |
| Sage Accent | `#9DC183` | Labels, tags, secondary accents — never buttons |
| Near Black | `#080808` | Page background |
| Surface 2 | `#111111` | Section backgrounds |
| Surface 3 | `#181818` | Card backgrounds |
| Hover | `#202020` | Hover states |
| White | `#F5F5F5` | Headlines |
| Dim White | `rgba(245,245,245,0.55)` | Body text |
| Muted White | `rgba(245,245,245,0.30)` | Labels, captions |
| Border | `rgba(255,255,255,0.07)` | Card/section borders |
| Green Glow | `rgba(46,139,87,0.20)` | Box shadows, glows |

**Rules:**
- `#2E8B57` means "click me." Use it for nothing decorative.
- `#9DC183` is for labels only. Never for buttons.
- Never use pure black `#000000` — it looks flat and harsh.
- Body text on dark backgrounds must be dim white, not full white. Full white causes eye fatigue.

---

## Typography

| Role | Font | Size | Weight |
|---|---|---|---|
| Display / Hero | Bebas Neue | clamp(5rem, 10vw, 10rem) | 400 |
| Section Titles | Bebas Neue | clamp(3rem, 6vw, 5.5rem) | 400 |
| Arabic Elements | Noto Kufi Arabic | +15% larger than Latin equivalent | 400–700 |
| Body | Inter | 16px minimum | 300–400 |
| Labels / Tags | Inter | 0.7rem | 500–600 |
| Nav Links | Inter | 0.78rem | 500 |

**Rules:**
- Two fonts maximum: Bebas Neue + Inter. Arabic gets Noto Kufi Arabic as the third only.
- Bebas Neue is for headlines only — never body text.
- Arabic text needs to be 10–15% larger than its Latin equivalent at the same pixel size — it renders visually smaller.
- Line height for body text: 1.75–1.85 on dark backgrounds.

---

# 2. Website Structure

## Page Sections (in order)

### Section 1 — Navigation (Fixed, Sticky)
- Logo: Al-Qudwah | القدوة
- Links: Programs · About · Experiences · Camping
- CTA button: "Book Consultation" — sharp corners, green fill
- Behavior: transparent on load → solid dark `rgba(8,8,8,0.95)` + blur on scroll
- Mobile: hamburger menu with label

---

### Section 2 — Hero (Full Screen, Cinematic)
- Height: 100vh minimum
- Background: near-black with animated green radial glow pulse + rotating ring lines
- Floating particle dots drifting upward
- Headline: **FARIS / HAMMADI** — one word solid white, one word outlined (ghost stroke)
- Arabic subtitle in green: القدوة في العمل لا في الكلام
- Short bio line beneath
- Two CTAs: "Explore Programs" (solid green) + "Who is Faris?" (ghost link)
- Side counter element: 01 / 05
- Bottom scroll indicator: animated line with "Scroll" label
- **Hero photo:** Kettlebell swing (Image 4) — vertical, arms up, intense face. Darkened with green-tinted overlay.
- **Alternative hero photo:** Deadlift starting position (Image 9) — upward gaze, powerful and almost spiritual.

---

### Section 3 — Marquee Strip
- Full-width green `#2E8B57` band
- Continuous scroll, no pause
- Items: Character Building · Personal Mentorship · Camping with Faris · Online Courses · Group Consultations · Life Skills · تنمية الشخصية · قيادة الشباب

---

### Section 4 — Programs Carousel (THE SHOWSTOPPER)
- Dark background, perspective: 1200px
- Active center card: full scale, no rotation, full opacity
- Neighboring cards: scaled 96%, rotated 3deg on Y axis, 60% opacity
- Card size: 340px wide × 520px tall
- On hover: card zooms slightly, description slides up, arrow appears
- On active: description text visible, glare/shine follows mouse
- Navigation: Prev/Next arrow buttons + dot progress indicator
- Swipe on mobile

**5 Cards:**

| # | Title | Subtitle Tag | Photo |
|---|---|---|---|
| 01 | Character Building | Foundation | Quran reading photo (Image 15) |
| 02 | Personal Consultation | 1-on-1 & Group | Speaking at mic/table (Image 16) |
| 03 | Online Courses | Digital Learning | Barbell overhead press (Image 7 or 8) |
| 04 | Life Skills Workshop | Group Program | Kettlebell squat position (Image 6) |
| 05 | Camping with Faris | The Journey | Rowing machine (Image 13) — replace with outdoor photo when available |

---

### Section 5 — About Faris
- Two-column layout: left = visual, right = text
- **Left:** Tall image frame with two floating stat cards overlapping the image
  - Stat card 1 (top right): **500+** / Youth Mentored
  - Stat card 2 (bottom left): **7+** / Years on the Path
  - Stat numbers animate counting up from zero on scroll entry
- **Photo:** Thobe portrait, arms crossed, warm smile (Image 14) — keep bright, do NOT apply dark treatment here
- **Right:**
  - Tag: The Man Behind the Mission
  - Headline: NOT A PREACHER — A WALKER
  - Two bio paragraphs
  - Three value rows with small icon boxes:
    - Authenticity over performance
    - Islamic values as a foundation for strength
    - Discipline as the path to lasting transformation
- **The duality story:** Same man, same presence — two worlds. The contrast between the gym photos and thobe photos IS the brand narrative. Never apply the same treatment to both.

---

### Section 6 — How We Grow (4-Column Strip)
- Full-width horizontal bordered grid
- Each column has a faded giant number, title, description, arrow link
- Green underline sweeps left to right on hover per column
- Background: dark `#111111`

| # | Column Title | Description |
|---|---|---|
| 01 | Individual Sessions | Direct, honest, personalized. One-on-one time with Faris where you're truly seen and heard. |
| 02 | Group Workshops | Shared experiences that build community and accountability. |
| 03 | Online Learning | Flexible, structured courses at your own pace with community support. |
| 04 | Outdoor Expeditions | Camping with Faris — nature as the ultimate classroom for leadership and resilience. |

---

### Section 7 — Camping with Faris
- Two-column layout: left = cinematic visual, right = text
- Background: `#111111` with border top and bottom
- **Left:** Dark gradient background with SVG mountain/tent/campfire art (placeholder until real camping photos arrive)
- **Right:**
  - Tag: Beyond the Screen
  - Headline: CAMPING WITH FARIS
  - Description of the outdoor program
  - Feature list: Leadership · Self-Reliance · Values in Action · Brotherhood
  - CTA: "Join the Next Camp"
- **⚠ Note to client:** This section urgently needs a dedicated outdoor photoshoot. Nature is non-negotiable for the Camping program's visual identity.

---

### Section 8 — Testimonials
- 3-column dark card grid
- Card: `#111111` background, `rgba(255,255,255,0.07)` border, sharp 4px radius
- Hover: card lifts 4px, border turns `rgba(46,139,87,0.4)`
- Large quote mark in green (opacity 0.4), testimonial text, avatar initials circle + name + role

---

### Section 9 — CTA (Final Push)
- Full-width dark section
- Giant Arabic watermark text "القدوة" behind at 25vw, 4% opacity
- Green radial glow from bottom center
- Headline: READY TO WALK THE PATH?
- Sub-copy
- Two buttons: "Book Consultation" (solid green) + "Browse Programs" (outline)

---

### Section 10 — Footer
- Logo left, nav links center, copyright right
- Minimal, one line, dark

---

# 3. Interactions & Effects

| Effect | Location | Tool |
|---|---|---|
| Custom dot cursor + expanding ring on hover | Global | Vanilla JS |
| Floating particles drifting upward | Hero background | Vanilla JS |
| Rotating ring lines | Hero background | CSS animation |
| Smooth scroll physics | Global | Lenis |
| Scroll-driven section reveal (fadeUp) | All sections | GSAP ScrollTrigger |
| 3D perspective carousel with card tilt | Programs | Swiper.js coverflow |
| Card shine/glare follows mouse | Program cards | Vanilla JS mousemove |
| Stat counter animation on scroll entry | About section | GSAP ScrollTrigger |
| Continuous marquee | Strip section | CSS animation |
| Nav link animated underline sweep | Nav | CSS |
| Column underline sweep on hover | How We Grow | CSS |
| Letter-by-letter hero title reveal | Hero | Splitting.js + GSAP |

---

# 4. Photo Assignment

## Available Photos — Full Assignment

| Image | Description | Assigned To | Treatment |
|---|---|---|---|
| Image 1 | Push-up low position | Supporting / Social proof | Dark green grade |
| Image 2 | Push-up face down | Secondary gym content | Dark green grade |
| Image 3 | Push-up side view | Secondary gym content | Dark green grade |
| Image 4 | Kettlebell swing arms up | **HERO — Primary** | Dark overlay + green tint |
| Image 5 | Kettlebell side swing | Programs card / alternate hero | Dark green grade |
| Image 6 | Kettlebell squat low | **Life Skills Workshop card** | Dark overlay |
| Image 7 | Barbell overhead press | **Online Courses card** | Dark overlay |
| Image 8 | Barbell overhead press 2 | Alternate for Courses card | Dark overlay |
| Image 9 | Deadlift starting position | **Alternate hero** — upward gaze | Dark overlay + green tint |
| Image 10 | Deadlift squat position | Secondary gym content | Dark green grade |
| Image 11 | Standing barbell hold | Supporting content | Dark green grade |
| Image 12 | Pull-up bar hang | Supporting content | Dark green grade |
| Image 13 | Rowing machine | **Camping card (temp placeholder)** | Dark overlay |
| Image 14 | Thobe portrait, arms crossed | **About section — main portrait** | Keep bright — NO dark treatment |
| Image 15 | Reading Quran | **Character Building card** | Warm light treatment |
| Image 16 | Speaking at mic/tablet | **Personal Consultation card** | Natural light treatment |

## Photo Editing Rules

**Gym photos (Images 1–13):**
- Bring blacks down significantly
- Add subtle green color grade on shadows (blend mode: multiply, `#2E8B57` at 15% opacity)
- The white t-shirt pops beautifully against dark treatment — don't fight it
- Remove or darken the bright white gym walls where possible

**Thobe/Islamic photos (Images 14–16):**
- Keep natural light and warmth
- Do NOT apply dark treatment
- The visual temperature difference between sections tells the dual-identity story passively

**The Duality Rule:**
The same man in two completely different visual worlds = the entire brand story told without words. A teenager who sees both will instantly understand: this man is built AND guided. Strong in the dunya AND the deen.

## Missing Photos — Urgent
- [ ] Outdoor/nature/camping photos — required before launch
- [ ] Group session / workshop photos
- [ ] Portrait photos with youth (permission required)

---

# 5. UI/UX Rules

## Visual Hierarchy
- One element dominates per section. Never two things competing for attention.
- Size, weight, color are the only three tools. Use them consistently.
- Every section: one dominant element + one supporting element + breathing room. Nothing more.

## Spacing — 8px Grid
- Every gap, padding, margin is a multiple of 8px.
- Section vertical padding: 96–120px desktop, 64–80px mobile.
- The whitespace IS the design. Especially on dark sites.

## Dark Site Specific Rules
- Never pure black `#000000` — use `#080808`. Pure black looks flat.
- Four levels of depth: `#080808` → `#111111` → `#181818` → `#202020`
- Shadows on dark: use glow instead — `box-shadow: 0 0 40px rgba(46,139,87,0.2)`
- Borders: `rgba(255,255,255,0.07)` — nearly invisible but structurally essential

## Animation Rules
- Duration: 400–700ms for section transitions, 150–250ms for micro-interactions
- Easing: always `cubic-bezier` — never `ease` or `linear`
- Every moving element must feel like it has weight — cards are heavy, text is light
- Always include `prefers-reduced-motion` media query

## Carousel Rules
- Active card scale difference minimum 4–5%
- Side cards: 3–5deg Y rotation, 0.6 opacity
- Navigation dots: 48×48px touch target minimum even if visually small
- No autoplay without pause button

## Mobile Rules
- 3D carousel becomes horizontal swipe carousel — no perspective tricks on mobile
- Hero title clamped: `clamp(3.5rem, 10vw, 9rem)` — never fixed px
- Navigation collapses to hamburger with "Menu" label
- Touch targets minimum 48×48px

## Copy Rules
- Avoid: "journey," "empower," "transform" unless used sparingly
- CTAs should feel like applications, not signups — "Apply for Consultation" not "Book Now"
- Challenge the reader: "Are you serious about your character?" hits harder than "Join us today"

---

# 6. Tech Stack

## Framework
**Next.js** (React) — for SEO, fast first load, easy multi-page expansion, Vercel deployment

Alternative for single-page only: plain HTML + vanilla CSS + vanilla JS (zero overhead, maximum control)

**Do NOT use:** WordPress, Webflow, Wix, Squarespace — these produce the generic AI energy the client explicitly rejected.

## CSS
**Vanilla CSS with custom properties** — no Tailwind for this project.
Tailwind fights you when building cinematic custom animations, complex transforms, and dark-mode layering. Full control wins here.

## Scripts & Libraries

| Library | Purpose | Cost |
|---|---|---|
| **GSAP** | All animations and timelines | Free |
| **ScrollTrigger** (GSAP plugin) | Scroll-driven animations | Free |
| **Lenis** | Smooth scroll physics | Free |
| **Swiper.js** | 3D card carousel | Free |
| **Splitting.js** | Letter-by-letter text animation | Free |
| **Google Fonts** | Bebas Neue + Inter + Noto Kufi Arabic | Free |

Total external dependencies: 6. Keep it lean.

## Hosting
**Vercel** — free tier, instant deploys, custom domain, automatic HTTPS, shareable preview URLs per deploy.

---

# 7. How to Make the Client Love It

1. **Show the brand, not a website.** Faris must look at the screen and say "that's me." Every decision must feel like his personality.
2. **Present it like a pitch, not a preview.** Walk him through it section by section. Explain WHY each decision was made. Clients who understand the reasoning become believers.
3. **Nail the hero first.** If the first 3 seconds don't land emotionally, nothing else matters. Show the hero, get his reaction, then continue.
4. **Get his input early, not late.** Show a rough version before it's polished. Clients who shape the process never reject the outcome.
5. **Point out the details.** The custom cursor, the hover states, the Arabic typography, the scroll animation — these tell him this was built specifically for him. Name them.
6. **The dual-world story.** Explain to him explicitly: "We're showing two versions of you — the athlete and the scholar — and letting the contrast speak for itself." He will love this framing.

---

# 8. Stitch Prompts (Google Stitch — Visual Mockup Only)

Use these prompts at stitch.withgoogle.com to generate the visual face of the site before development.

---

## Setup Before Opening Stitch
Have ready:
- Photos of Faris (upload directly to Stitch)
- Color codes: `#2E8B57` · `#9DC183` · `#080808` · `#F5F5F5`
- Reference: Arctic Voyage and Globe Express site aesthetics

---

## Prompt 1 — Hero Section

```
Dark cinematic personal branding landing page for Faris Hammadi, 
an Islamic mentor and athlete. Full-screen hero section on #080808 
near-black background. Large bold display font headline "FARIS 
HAMMADI" — first word solid white, second word outlined ghost stroke. 
Arabic subtitle underneath in #2E8B57 green. Short motivational 
tagline in dim white below. Two CTAs: solid #2E8B57 green button 
"Explore Programs" with sharp 2px corners, and a ghost text link 
"Who is Faris?". Fixed navbar at top: logo left reading "Al-Qudwah 
| القدوة", nav links center, green outlined CTA button right. 
Subtle green radial glow in background behind text. Premium, 
cinematic, Nike-meets-Islamic-values aesthetic. Sharp geometry, 
no rounded pill shapes, no gradients on text.
```

---

## Prompt 2 — Programs Carousel Section

```
Dark section on #080808 background showing a horizontal 3D card 
carousel for programs. Section heading "OUR PROGRAMS" in large 
Bebas Neue white, with "PROGRAMS" in #2E8B57 green. Five tall 
portrait cards (340px wide, 520px tall) arranged horizontally. 
Center card is dominant: full size, full opacity, slight green 
glow shadow. Side cards slightly scaled down and dimmed. Each 
card has a full-bleed dark photo background, category tag in 
#9DC183 sage green, large white card title, short description 
text. Card titles: "Character Building", "Personal Consultation", 
"Online Courses", "Life Skills Workshop", "Camping with Faris". 
Prev/Next navigation arrows. Dot progress indicators below. 
Dark, premium, cinematic aesthetic.
```

---

## Prompt 3 — About Section

```
Two-column about section on dark #080808 background. Left column: 
tall portrait image frame with sharp corners, a floating dark stat 
card overlapping top-right showing "500+" in large #2E8B57 green 
with label "Youth Mentored", another floating stat card bottom-left 
showing "7+" with label "Years on the Path". Right column: small 
tag label "The Man Behind the Mission" in #9DC183, large Bebas Neue 
headline "NOT A PREACHER — A WALKER" in white, two paragraphs of 
body text in dim white, three icon rows with small square icon 
boxes in dark green and short value statements. Premium dark 
aesthetic, sharp geometry.
```

---

## Prompt 4 — Programs Grid Strip

```
Full-width four-column horizontal grid section on #111111 dark 
background. Top and bottom border lines in rgba white 7% opacity. 
Each column separated by thin border lines. Each column contains: 
large faded number (01, 02, 03, 04) in very low opacity white, 
bold white column title, body text in dim white, small green arrow 
link at bottom. Column titles: "Individual Sessions", "Group 
Workshops", "Online Learning", "Outdoor Expeditions". Clean, 
dark, editorial grid layout. No rounded corners.
```

---

## Prompt 5 — Camping Section

```
Two-column feature section on dark #111111 background. Left column: 
dark atmospheric full-height visual with deep green gradient 
suggesting mountains and night sky, tent silhouette, campfire glow 
in #2E8B57 green tones. Right column: small tag "Beyond the Screen" 
in #9DC183, large Bebas Neue headline "CAMPING WITH FARIS" in white, 
paragraph description, four bullet points with small green dots 
(Leadership, Self-Reliance, Values in Action, Brotherhood), 
solid green CTA button "Join the Next Camp". Premium dark 
cinematic feel.
```

---

## Prompt 6 — Full Page (Run This Last)

```
Complete dark cinematic personal branding landing page. Client: 
Faris Hammadi, Islamic mentor and athlete. Brand: Al-Qudwah. 
Color palette: #080808 near-black background, #2E8B57 power green 
accents, #9DC183 sage for labels, #F5F5F5 white headlines. 
Typography: Bebas Neue for all display headlines, Inter for body.
Sections in order: (1) fixed dark navbar with logo and green CTA, 
(2) full-screen cinematic hero with large bold headline, Arabic 
subtitle, green glow background, (3) full-width green marquee 
strip scrolling text, (4) horizontal 3D card carousel for 5 
programs, (5) two-column about section with floating stat cards, 
(6) four-column grid strip with numbered columns, (7) two-column 
camping feature section, (8) three-column testimonial cards, 
(9) full-width CTA section with large Arabic watermark behind, 
(10) minimal dark footer. Nike-meets-Islamic-values premium 
aesthetic. Sharp corners, no pill shapes, cinematic quality.
```

---

## Stitch Tips

- **Run Prompt 6 first** to see the full layout, then run individual section prompts to refine each one
- **Upload Faris's photos directly** — Stitch accepts image inputs and will use them in the generated design
- **Use the URL feature:** paste https://linktr.ee/farishammadi so Stitch understands his existing brand presence
- **Iterate with follow-up prompts:** after each generation, type follow-up corrections like "make the background darker", "increase the headline size", "remove rounded corners from buttons"
- **Export as HTML/TailwindCSS** — hand this to yourself as a visual reference, not as production code
- **350 free generations per month** — use Standard mode (Gemini 2.5 Flash) for speed, Pro mode for quality on the final version

---

## What Stitch Gives You vs. What You Build

| | Stitch Output | Your Real Build |
|---|---|---|
| Purpose | Visual blueprint for client approval | Production site |
| Hero layout | ✅ Generates it | ✅ You code it |
| Color system | ✅ Approximates it | ✅ You define it precisely |
| 3D carousel | ❌ Flat mockup only | ✅ Swiper.js coverflow |
| Scroll animations | ❌ Static | ✅ GSAP ScrollTrigger |
| Smooth scroll | ❌ None | ✅ Lenis |
| Custom cursor | ❌ None | ✅ Vanilla JS |
| Arabic typography | ⚠️ Basic | ✅ Noto Kufi Arabic tuned |
| Production code | ❌ Scaffold only | ✅ Next.js / HTML |
| Client presentation | ✅ Perfect for this | ❌ Too early |

---

# 9. Development Phases

## Phase 1 — Visual Design (Stitch)
- Generate all 6 prompts
- Upload Faris's photos
- Iterate until layout feels right
- Export and present to client
- Get written approval on design direction

## Phase 2 — Foundation
- Set up Next.js project or plain HTML
- Define all CSS custom properties (full token system)
- Google Fonts import
- Base layout and responsive grid
- Nav component

## Phase 3 — Hero & Marquee
- Full-screen hero with background effects
- Splitting.js + GSAP letter reveal
- Lenis smooth scroll setup
- Marquee strip

## Phase 4 — Carousel
- Swiper.js 3D coverflow setup
- Custom card design with photo backgrounds
- Mouse shine/glare effect
- Mobile swipe

## Phase 5 — Content Sections
- About section with stat counters (GSAP ScrollTrigger)
- How We Grow grid
- Camping section
- Testimonials

## Phase 6 — Motion & Polish
- GSAP ScrollTrigger on all sections
- Custom cursor
- Floating particles
- All hover states
- Performance optimization

## Phase 7 — Launch
- Mobile testing (all breakpoints)
- Speed audit (target under 2 seconds)
- Vercel deployment
- Custom domain setup
- Share preview link with client

---

# 10. Client Socials Reference

- **Linktree:** https://linktr.ee/farishammadi
- Check active platforms before launch to ensure social links in footer are correct
- If he is active on Instagram/TikTok/YouTube — embed or link those feeds for social proof

---

*Document version 1.0 — Al-Qudwah Project — May 2026*
