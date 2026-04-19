# Lumen Clean Co. — Landing Page Design Spec

**Date:** 2026-04-19  
**Status:** Approved  
**Goal:** Convert visitors into quote requests for a premium residential + commercial cleaning studio positioned 25% above market rate.

---

## Aesthetic Direction

**WARM-ORGANIC LUXURY** — Aesop meets Kinfolk. The site should feel like it belongs on a shelf next to premium soap, not a cleaning franchise.

| Token | Value | Role |
|---|---|---|
| `--color-cream` | `#F7F2EC` | Base background |
| `--color-sage` | `#7A9E7E` | Signature accent, borders, numerals |
| `--color-terracotta` | `#C47B5A` | CTAs only — used sparingly |
| `--font-display` | Cormorant Garamond | Headlines, numerals, pull-quotes |
| `--font-body` | DM Sans | Body, labels, UI text |

No Inter. No purple gradients. No stock photos.

---

## Stack

- **Framework:** Next.js 15 App Router + TypeScript strict mode
- **Styling:** Tailwind CSS v4 with `@theme` directive (CSS variables only, no JS config)
- **Animation:** Motion (`npm install motion`) — `useScroll`, `useTransform`, `layout` animations
- **Fonts:** `next/font` — Cormorant Garamond (display) + DM Sans (body)
- **Images:** `next/image` for all raster images

---

## Project Structure

```
clone/
├── app/
│   ├── layout.tsx          # fonts, metadata, ModalProvider
│   ├── page.tsx            # assembles all 10 sections
│   └── globals.css         # @theme directive — all CSS vars
├── components/
│   ├── nav/Nav.tsx
│   ├── hero/Hero.tsx
│   ├── trust/TrustStrip.tsx
│   ├── services/ServicesGrid.tsx
│   ├── how-it-works/HowItWorks.tsx
│   ├── calculator/QuoteCalculator.tsx
│   ├── values/Values.tsx
│   ├── testimonials/Testimonials.tsx
│   ├── faq/FAQ.tsx
│   ├── footer/FooterCTA.tsx
│   └── modal/QuoteModal.tsx
└── README.md
```

---

## Implementation Approach

**Section-by-section with checkpoints** in three groups:

1. **Group 1:** Nav + Hero + Trust Strip
2. **Group 2:** Services Grid + How It Works + Quote Calculator
3. **Group 3:** Values + Testimonials + FAQ + Footer CTA + Quote Modal

---

## Section Specifications

### 1. Nav
- `position: fixed`, full width
- Transparent on load → `bg-cream/95 backdrop-blur-sm` after 80px scroll (Motion `useScroll`)
- Logo: wordmark in Cormorant Garamond italic, left-aligned
- Center: three links — Services, How It Works, FAQ
- Right: "Get a quote" button in terracotta — opens `QuoteModal`

### 2. Hero
- Full viewport (`100svh`)
- Background: cream + subtle SVG noise texture overlay
- **Scroll-linked moment:** Abstract sage green SVG blob sits over the headline. As user scrolls 0→80px, `useScroll` + `useTransform` slides blob off-screen right (curtain wipe), revealing headline beneath
- Headline: "Your home, handled." — Cormorant Garamond ~8xl, centered
- Sub-copy: "Professional cleaning, thoughtfully done." — DM Sans, muted, below headline
- Primary CTA: "Get your instant quote →" terracotta — opens `QuoteModal`
- `prefers-reduced-motion`: blob hidden from load, headline always visible

### 3. Trust Strip
- Full-width single row, cream bg, sage dividers
- Five items: ⭐⭐⭐⭐⭐ "500+ five-star reviews" · "Insured & bonded" · "Background-checked staff" · "Eco-certified products" · "Satisfaction guaranteed"
- DM Sans small caps, understated

### 4. Services Grid
- 2×2 desktop, 1-column mobile
- Cards: cream bg, sage border on hover, `translateY(-4px)` + shadow lift
- Each card: inline SVG icon (hand-drawn loose strokes), Cormorant Garamond title, one DM Sans sentence, terracotta "Get a quote →" — opens `QuoteModal` pre-filled with that service type
- Icons: broom swirl (Deep Clean), calendar+leaf (Regular Clean), open box (Move In-Out), building outline (Commercial)

### 5. How It Works
- Three steps: "01 Book online" → "02 We clean" → "03 You verify"
- Oversized Cormorant Garamond step numbers (~12xl) in sage, decorative behind content
- Horizontal on desktop with thin dashed sage connector line; stacked on mobile

### 6. Quote Calculator (client component)
- **Inputs:**
  - Bedrooms: pill toggles 1–6
  - Bathrooms: pill toggles 1–4
  - Frequency: One-time / Bi-weekly / Weekly
- **Price logic (client-side only, no backend):**
  - Base: `$60 + (bedrooms × $30) + (bathrooms × $20)`
  - Multipliers: One-time ×1.0, Bi-weekly ×0.88, Weekly ×0.80
  - Output: range ±10% (e.g. "$180–$220")
- Animated number change via Motion `animate`
- CTA: "Book this clean →" opens `QuoteModal` pre-filled with selections

### 7. Values ("Why Lumen")
- Asymmetric two-column: 60% left / 40% right
- Left: editorial pull-quote in large Cormorant italic — "We clean as if it's our own home."
- Right: three stacked blocks — sage circle initial + DM Sans bold label + one sentence
  - "Eco products only" · "Living wage staff" · "Vetted & insured"

### 8. Testimonials
- NOT a carousel. Staggered CSS grid layout.
- One large card spanning 2 columns (top-left): quote in Cormorant italic ~2xl
- Two smaller cards stacked right: DM Sans body size
- All cards: cream bg, thin sage border, subtle shadow
- Names: "Margaret L., Tribeca" · "James & Priya K., Park Slope" · "Sofia R., Hoboken"

### 9. FAQ Accordion
- Six questions covering: frequency, eco products, inclusions, rescheduling, background checks, satisfaction guarantee
- Motion `layout` animation on expand/collapse (height, not opacity flash)
- Sage "+" icon right-aligned, rotates to "×" when open

### 10. Footer CTA
- Full-width cream, centered
- Cormorant Garamond headline: "Ready for a cleaner home?"
- Single terracotta button
- Muted DM Sans footer links: Services · Privacy · Instagram · Contact · © 2025 Lumen Clean Co.

### Quote Modal
- Slides up from bottom on mobile, centered dialog on desktop
- Cream background, sage border
- Fields: Name, Email, Phone, Address, Service type (pre-filled from calculator), Preferred date, Notes
- Submit: terracotta button
- No backend — on submit shows: "We'll be in touch within 2 hours." → auto-closes after 3s
- State managed via `ModalProvider` context in `layout.tsx`

---

## Quality Requirements

- Lighthouse ≥ 95 on all four metrics
- WCAG AA — semantic HTML, `focus-visible` on all interactive elements
- `prefers-reduced-motion` fallbacks on all animations
- No `any`, no `ts-ignore`, no dead imports
- Mobile-first — test at 375px width
- All interactive elements ≥ 44px touch targets

---

## Competitive Research

*(To be completed via Firecrawl before build — see prompt.md Step 2)*

Sites to scrape: handy.com, maidsailors.com, thecleaningauthority.com, getmaid.com  
Use findings as anti-patterns to deliberately subvert. Store 8-bullet summary here.
