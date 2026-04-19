# Lumen Clean Co. Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready Next.js 15 landing page for Lumen Clean Co. that converts visitors into quote-modal submissions, with a warm-organic-luxury aesthetic (cream/sage/terracotta), scroll-linked hero animation, interactive quote calculator, and zero backend.

**Architecture:** Single-page App Router application; all 10 sections are React Server Components except Nav, Hero, QuoteCalculator, FAQ (client, need state/scroll), and QuoteModal/ModalProvider (client context). ModalProvider wraps the root layout so any CTA anywhere can trigger the modal without prop drilling.

**Tech Stack:** Next.js 15 App Router, TypeScript strict, Tailwind CSS v4 (`@theme` directive), Motion (`motion/react`), next/font (Cormorant Garamond + DM Sans), Vitest + Testing Library (calculator unit tests).

---

## File Map

| File | Responsibility |
|---|---|
| `app/layout.tsx` | Root layout — fonts, metadata, wraps children in `ModalProvider`, renders `QuoteModal` |
| `app/page.tsx` | Assembles all 10 section components in order |
| `app/globals.css` | `@import "tailwindcss"`, `@theme` tokens, base reset |
| `postcss.config.mjs` | Tailwind v4 PostCSS plugin |
| `components/modal/ModalProvider.tsx` | Context + state for modal open/prefill |
| `components/nav/Nav.tsx` | Fixed nav, scroll-triggered bg, opens modal |
| `components/hero/Hero.tsx` | Full-viewport hero, scroll-linked SVG wipe |
| `components/trust/TrustStrip.tsx` | Five-item trust bar (server) |
| `components/services/ServicesGrid.tsx` | 2×2 cards with inline SVG icons (server) |
| `components/how-it-works/HowItWorks.tsx` | Three-step section (server) |
| `components/calculator/QuoteCalculator.tsx` | Interactive price calculator (client) |
| `components/calculator/pricing.ts` | Pure price logic — testable in isolation |
| `components/values/Values.tsx` | Asymmetric editorial layout (server) |
| `components/testimonials/Testimonials.tsx` | Staggered 3-quote grid (server) |
| `components/faq/FAQ.tsx` | Motion accordion (client) |
| `components/footer/FooterCTA.tsx` | Big CTA + footer links (server) |
| `components/modal/QuoteModal.tsx` | Slide-up/center dialog (client) |
| `lib/fonts.ts` | next/font instances exported once, imported in layout |
| `tests/pricing.test.ts` | Unit tests for `calculatePrice` |
| `README.md` | Competitive research + dev commands |

---

## Task 1: Scaffold Next.js 15 Project

**Files:**
- Create: project root (all scaffold files)

- [ ] **Step 1: Scaffold with create-next-app (no Tailwind — we add v4 manually)**

```bash
cd /c/Users/Phinees/OneDrive/Desktop/Business/clone
npx create-next-app@latest . --typescript --app --no-src-dir --no-import-alias --no-tailwind --eslint
```

When prompted:
- Would you like to use Turbopack? → **Yes**

- [ ] **Step 2: Install Tailwind v4 + PostCSS plugin**

```bash
npm install tailwindcss @tailwindcss/postcss
```

- [ ] **Step 3: Install Motion**

```bash
npm install motion
```

- [ ] **Step 4: Install Vitest + Testing Library**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @types/testing-library__jest-dom
```

- [ ] **Step 5: Install Cormorant Garamond + DM Sans via next/font (they're Google Fonts — no extra install needed; confirm they're available)**

They are part of `next/font/google`. No install needed.

- [ ] **Step 6: Delete the default scaffold noise**

```bash
rm -f app/page.tsx app/globals.css public/next.svg public/vercel.svg
```

- [ ] **Step 7: Create `postcss.config.mjs`**

```js
// postcss.config.mjs
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
export default config
```

- [ ] **Step 8: Create `vitest.config.ts`**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
})
```

- [ ] **Step 9: Create `tests/setup.ts`**

```typescript
// tests/setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 10: Add test script to package.json**

Open `package.json` and add to the `"scripts"` block:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 11: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js 15 + Tailwind v4 + Motion + Vitest"
```

---

## Task 2: Design Tokens + Global CSS

**Files:**
- Create: `app/globals.css`
- Create: `lib/fonts.ts`
- Modify: `app/layout.tsx` (minimal shell — full layout in Task 4)

- [ ] **Step 1: Create `app/globals.css`**

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-cream: #F7F2EC;
  --color-sage: #7A9E7E;
  --color-terracotta: #C47B5A;
  --color-ink: #2C2C2A;
  --color-muted: #8A8A82;

  --font-display: var(--font-cormorant), "Cormorant Garamond", serif;
  --font-body: var(--font-dm-sans), "DM Sans", sans-serif;

  --radius-card: 2px;
  --shadow-card: 0 2px 16px 0 rgba(44, 44, 42, 0.08);
  --shadow-card-hover: 0 8px 32px 0 rgba(44, 44, 42, 0.14);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  background-color: var(--color-cream);
  color: var(--color-ink);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

::selection {
  background-color: var(--color-sage);
  color: var(--color-cream);
}

/* Focus visible only on keyboard nav */
:focus-visible {
  outline: 2px solid var(--color-sage);
  outline-offset: 3px;
}
```

- [ ] **Step 2: Create `lib/fonts.ts`**

```typescript
// lib/fonts.ts
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})
```

- [ ] **Step 3: Create minimal `app/layout.tsx` shell (full version in Task 4)**

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { cormorant, dmSans } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lumen Clean Co. — Premium Residential & Commercial Cleaning',
  description:
    'Professional cleaning, thoughtfully done. Insured, eco-certified, and background-checked staff serving your home and office.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Create placeholder `app/page.tsx` to verify dev server**

```typescript
// app/page.tsx
export default function Home() {
  return <main className="min-h-screen bg-cream flex items-center justify-center">
    <p className="font-display text-4xl text-ink">Lumen Clean Co.</p>
  </main>
}
```

- [ ] **Step 5: Start dev server and verify cream background + Cormorant font renders**

```bash
npm run dev
```

Open `http://localhost:3000` — should see "Lumen Clean Co." in Cormorant Garamond on a cream background. No purple, no white, no system font.

- [ ] **Step 6: Stop dev server (Ctrl+C), commit**

```bash
git add -A
git commit -m "feat: Tailwind v4 @theme tokens + next/font setup"
```

---

## Task 3: Firecrawl Competitive Research

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Use the firecrawl skill to scrape each site**

Invoke `firecrawl:firecrawl` skill and scrape these four URLs one at a time:
1. `https://www.handy.com`
2. `https://www.maidsailors.com`
3. `https://www.thecleaningauthority.com`
4. `https://www.getmaid.com`

For each site extract: color palette, hero image strategy, social proof placement (above/below fold), one thing done well, one thing that's generic.

- [ ] **Step 2: Create `README.md` with 8-bullet competitive research summary**

```markdown
# Lumen Clean Co.

## Competitive Research

- **Handy:** Heavy navy/teal palette with white backgrounds. Hero uses smiling-person stock photos above the fold. Well: instant online booking flow. Generic: every cleaning brand uses the same "hand on spray bottle" imagery — we avoid photos entirely.
- **Maid Sailors:** Bright blue (#0057FF) + white. Social proof (review count) is above the fold. Well: clear pricing tiers. Generic: templated card layout identical to a dozen competitors.
- **The Cleaning Authority:** Forest green + white. Trust signals (bonded/insured) buried below the fold. Well: local franchise feel. Generic: stock photography of spotless kitchens with no people, no personality.
- **GetMaid:** Orange CTAs on white, very corporate SaaS aesthetic. Social proof is a rotating testimonial carousel above fold. Well: clean mobile nav. Generic: SaaS pricing table pattern dropped into a cleaning context — zero warmth.
- **Anti-pattern #1:** Stock photos of women holding spray bottles appear on every competitor site — we use abstract SVG illustration only.
- **Anti-pattern #2:** All four use blue or green as primary palette on white — we use cream as the base, making sage an accent rather than a dominant color.
- **Anti-pattern #3:** Carousel testimonials are universal — we use a staggered static grid, which reads as more editorial and credible.
- **Anti-pattern #4:** Social proof is treated as a badge/widget — we integrate it into typography and layout so it feels native, not bolted on.

## Dev Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm test         # Run Vitest unit tests
npm run build    # Production build
npm run lint     # ESLint
```
```

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: competitive research anti-patterns in README"
```

---

## Task 4: ModalProvider + Full Root Layout

**Files:**
- Create: `components/modal/ModalProvider.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/modal/ModalProvider.tsx`**

```typescript
// components/modal/ModalProvider.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface ModalPrefill {
  service?: string
  bedrooms?: number
  bathrooms?: number
  frequency?: 'one-time' | 'bi-weekly' | 'weekly'
}

interface ModalContextType {
  open: boolean
  prefill: ModalPrefill
  openModal: (prefill?: ModalPrefill) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [prefill, setPrefill] = useState<ModalPrefill>({})

  function openModal(p: ModalPrefill = {}) {
    setPrefill(p)
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  return (
    <ModalContext.Provider value={{ open, prefill, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal(): ModalContextType {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}
```

- [ ] **Step 2: Update `app/layout.tsx` with ModalProvider (QuoteModal added in Task 15)**

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { cormorant, dmSans } from '@/lib/fonts'
import { ModalProvider } from '@/components/modal/ModalProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lumen Clean Co. — Premium Residential & Commercial Cleaning',
  description:
    'Professional cleaning, thoughtfully done. Insured, eco-certified, and background-checked staff serving your home and office.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: ModalProvider context for quote modal state"
```

---

## Task 5: Nav Component

**Files:**
- Create: `components/nav/Nav.tsx`

- [ ] **Step 1: Create `components/nav/Nav.tsx`**

```typescript
// components/nav/Nav.tsx
'use client'

import { useScroll, useMotionValueEvent } from 'motion/react'
import { useState } from 'react'
import { useModal } from '@/components/modal/ModalProvider'

export default function Nav() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const { openModal } = useModal()

  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 80))

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        solid
          ? 'bg-cream/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(122,158,126,0.2)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav
        className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="/"
          className="font-display italic text-xl text-ink tracking-wide hover:text-sage transition-colors"
          aria-label="Lumen Clean Co. — home"
        >
          Lumen
        </a>

        {/* Center links */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {[
            { label: 'Services', href: '#services' },
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'FAQ', href: '#faq' },
          ].map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="font-body text-sm text-ink/70 hover:text-ink transition-colors tracking-wide"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => openModal()}
          className="min-h-[44px] min-w-[44px] px-5 py-2 bg-terracotta text-cream font-body text-sm font-medium tracking-wide rounded-sm hover:bg-terracotta/90 transition-colors focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
        >
          Get a quote
        </button>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Add Nav to `app/page.tsx` and verify in browser**

```typescript
// app/page.tsx
import Nav from '@/components/nav/Nav'

export default function Home() {
  return (
    <main>
      <Nav />
      <div className="h-[200vh] bg-cream flex items-center justify-center pt-32">
        <p className="font-display text-4xl text-ink">Scroll to test nav</p>
      </div>
    </main>
  )
}
```

Run `npm run dev`, open `http://localhost:3000`, scroll — nav should go from transparent to cream/blurred. CTA button should appear terracotta. Nav links should be centered on desktop.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: Nav with scroll-triggered bg + modal CTA"
```

---

## Task 6: Hero Component (Scroll-Linked SVG Wipe)

**Files:**
- Create: `components/hero/Hero.tsx`

- [ ] **Step 1: Create `components/hero/Hero.tsx`**

```typescript
// components/hero/Hero.tsx
'use client'

import { useScroll, useTransform, motion } from 'motion/react'
import { useModal } from '@/components/modal/ModalProvider'

export default function Hero() {
  const { scrollY } = useScroll()
  const x = useTransform(scrollY, [0, 80], ['0%', '110%'])
  const { openModal } = useModal()

  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-cream"
      aria-label="Hero"
    >
      {/* SVG noise texture */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.03]"
        aria-hidden="true"
      >
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Scroll-linked SVG curtain — reveals headline */}
      <motion.div
        style={{ x }}
        className="pointer-events-none absolute inset-0 z-10 motion-reduce:hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 900"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0 0 Q360 200 720 0 Q1080 -200 1440 0 L1440 900 Q1080 700 720 900 Q360 1100 0 900 Z"
            fill="#7A9E7E"
            fillOpacity="0.18"
          />
          <path
            d="M0 100 Q400 350 800 150 Q1100 0 1440 200 L1440 900 L0 900 Z"
            fill="#7A9E7E"
            fillOpacity="0.10"
          />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-ink leading-none tracking-tight mb-6">
          Your home,
          <br />
          <em className="italic">handled.</em>
        </h1>
        <p className="font-body text-base md:text-lg text-muted max-w-md mx-auto mb-10 tracking-wide">
          Professional cleaning, thoughtfully done.
        </p>
        <button
          onClick={() => openModal()}
          className="group inline-flex items-center gap-2 min-h-[48px] px-8 py-3 bg-terracotta text-cream font-body text-sm font-medium tracking-wide rounded-sm hover:bg-terracotta/90 transition-colors focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
        >
          Get your instant quote
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
        </button>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <div className="w-px h-12 bg-sage/40 animate-[pulse_2s_ease-in-out_infinite]" />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Hero to `app/page.tsx` and verify in browser**

```typescript
// app/page.tsx
import Nav from '@/components/nav/Nav'
import Hero from '@/components/hero/Hero'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <div className="h-screen bg-cream" />
    </main>
  )
}
```

Test: scroll 80px down — sage SVG shape should animate off-screen right, revealing the headline. On a reduced-motion system/preference, headline is always visible.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: Hero with scroll-linked SVG curtain wipe"
```

---

## Task 7: Trust Strip

**Files:**
- Create: `components/trust/TrustStrip.tsx`

- [ ] **Step 1: Create `components/trust/TrustStrip.tsx`**

```typescript
// components/trust/TrustStrip.tsx
const items = [
  { label: '500+ five-star reviews', prefix: '★★★★★' },
  { label: 'Insured & bonded' },
  { label: 'Background-checked staff' },
  { label: 'Eco-certified products' },
  { label: 'Satisfaction guaranteed' },
]

export default function TrustStrip() {
  return (
    <section
      className="bg-cream border-y border-sage/20 py-5 overflow-x-auto"
      aria-label="Trust indicators"
    >
      <ul
        className="flex items-center justify-center gap-0 min-w-max mx-auto px-6"
        role="list"
      >
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center">
            <span className="font-body text-xs tracking-[0.12em] uppercase text-ink/60 px-6 whitespace-nowrap">
              {item.prefix && (
                <span className="text-sage mr-2 tracking-normal" aria-hidden="true">
                  {item.prefix}
                </span>
              )}
              {item.label}
            </span>
            {i < items.length - 1 && (
              <span className="w-px h-3 bg-sage/30" aria-hidden="true" />
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx` and visually verify**

```typescript
// app/page.tsx
import Nav from '@/components/nav/Nav'
import Hero from '@/components/hero/Hero'
import TrustStrip from '@/components/trust/TrustStrip'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TrustStrip />
      <div className="h-screen bg-cream" />
    </main>
  )
}
```

Should be a single horizontal row of items with sage dividers, all caps, understated.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: Trust strip — five trust indicators"
```

---

## Task 8: Services Grid

**Files:**
- Create: `components/services/ServicesGrid.tsx`

- [ ] **Step 1: Create `components/services/ServiceCTA.tsx` (client — needs useModal)**

```typescript
// components/services/ServiceCTA.tsx
'use client'

import { useModal } from '@/components/modal/ModalProvider'

export default function ServiceCTA({ service }: { service: string }) {
  const { openModal } = useModal()

  return (
    <button
      onClick={() => openModal({ service })}
      className="font-body text-sm text-terracotta tracking-wide hover:underline underline-offset-4 min-h-[44px] flex items-center focus-visible:outline-none focus-visible:underline"
    >
      Get a quote →
    </button>
  )
}
```

- [ ] **Step 2: Create `components/services/ServicesGrid.tsx`**

```typescript
// components/services/ServicesGrid.tsx
import ServiceCTA from './ServiceCTA'

const services = [
  {
    id: 'deep',
    title: 'Deep Clean',
    description: 'A thorough clean of every surface, corner, and crevice — perfect for first-time clients.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 stroke-sage fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 38 Q18 20 28 14" />
        <path d="M28 14 Q32 12 34 16 Q36 20 30 24 Q26 28 22 30" />
        <path d="M22 30 Q18 32 16 36" />
        <circle cx="36" cy="12" r="2" />
        <path d="M8 40 L12 36" />
      </svg>
    ),
  },
  {
    id: 'regular',
    title: 'Regular Clean',
    description: 'Consistent maintenance cleaning on your schedule — weekly or bi-weekly.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 stroke-sage fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="10" y="12" width="28" height="26" rx="2" />
        <path d="M10 20 L38 20" />
        <path d="M18 8 L18 16" />
        <path d="M30 8 L30 16" />
        <path d="M26 32 Q28 28 32 30" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'move',
    title: 'Move In / Out',
    description: 'Leave your old place spotless or welcome yourself into a fresh, clean home.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 stroke-sage fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="12" y="18" width="24" height="18" rx="1" />
        <path d="M12 18 L24 10 L36 18" />
        <path d="M16 36 L16 24 L24 24 L24 36" />
        <path d="M28 28 L32 28 M28 32 L32 32" />
      </svg>
    ),
  },
  {
    id: 'commercial',
    title: 'Commercial',
    description: 'Office and retail spaces kept pristine — flexible scheduling around your business hours.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 stroke-sage fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="8" y="16" width="32" height="24" rx="1" />
        <path d="M8 16 L24 6 L40 16" />
        <path d="M16 40 L16 28 L22 28 L22 40" />
        <path d="M26 28 L32 28 L32 36 L26 36 Z" />
        <path d="M12 22 L14 22 M20 22 L22 22 M28 22 L30 22 M36 22 L38 22" />
      </svg>
    ),
  },
]

export default function ServicesGrid() {
  return (
    <section
      id="services"
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto"
      aria-labelledby="services-heading"
    >
      <h2
        id="services-heading"
        className="font-display text-4xl md:text-5xl text-ink mb-16 text-center"
      >
        What we do
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((service) => (
          <article
            key={service.id}
            className="group relative p-8 bg-cream border border-ink/[0.08] rounded-[var(--radius-card)] transition-all duration-300 hover:-translate-y-1 hover:border-sage/50 hover:shadow-[var(--shadow-card-hover)] focus-within:border-sage/50"
          >
            <div className="mb-6">{service.icon}</div>
            <h3 className="font-display text-2xl text-ink mb-2">{service.title}</h3>
            <p className="font-body text-sm text-muted leading-relaxed mb-6">
              {service.description}
            </p>
            <ServiceCTA service={service.title} />
          </article>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add ServicesGrid to `app/page.tsx` and verify hover lift + sage border**

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Services grid — inline SVG icons + client CTA"
```

---

## Task 9: How It Works

**Files:**
- Create: `components/how-it-works/HowItWorks.tsx`

- [ ] **Step 1: Create `components/how-it-works/HowItWorks.tsx`**

```typescript
// components/how-it-works/HowItWorks.tsx
const steps = [
  { number: '01', title: 'Book online', body: 'Choose your service, pick a time, and confirm in under two minutes.' },
  { number: '02', title: 'We clean', body: 'Your vetted, background-checked cleaner arrives on time with eco-certified supplies.' },
  { number: '03', title: 'You verify', body: 'Walk through with our satisfaction guarantee — not happy? We come back, free.' },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-6 md:px-12 bg-sage/5 overflow-hidden"
      aria-labelledby="how-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="how-heading"
          className="font-display text-4xl md:text-5xl text-ink mb-16 text-center"
        >
          How it works
        </h2>
        <ol
          className="relative flex flex-col md:flex-row gap-12 md:gap-0"
          role="list"
        >
          {steps.map((step, i) => (
            <li
              key={step.number}
              className="relative flex-1 flex flex-col md:items-center md:text-center px-0 md:px-8"
            >
              {/* Connector line on desktop */}
              {i < steps.length - 1 && (
                <span
                  className="hidden md:block absolute top-8 left-[calc(50%+3rem)] right-[-calc(50%-3rem)] h-px border-t border-dashed border-sage/40"
                  aria-hidden="true"
                />
              )}
              {/* Step number */}
              <span
                className="font-display text-[8rem] md:text-[10rem] leading-none text-sage/15 select-none pointer-events-none absolute -top-6 left-0 md:left-1/2 md:-translate-x-1/2"
                aria-hidden="true"
              >
                {step.number}
              </span>
              {/* Content */}
              <div className="relative pt-8 md:pt-12">
                <h3 className="font-display text-2xl text-ink mb-3">{step.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed max-w-xs">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx` and verify oversized numerals render correctly behind content, connector line visible on desktop**

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: How It Works — three steps with oversized Cormorant numerals"
```

---

## Task 10: Quote Calculator (with unit tests)

**Files:**
- Create: `components/calculator/pricing.ts`
- Create: `tests/pricing.test.ts`
- Create: `components/calculator/QuoteCalculator.tsx`

- [ ] **Step 1: Write the failing test first**

```typescript
// tests/pricing.test.ts
import { describe, it, expect } from 'vitest'
import { calculatePrice } from '@/components/calculator/pricing'

describe('calculatePrice', () => {
  it('returns a two-element tuple of numbers', () => {
    const result = calculatePrice(2, 1, 'one-time')
    expect(result).toHaveLength(2)
    expect(typeof result[0]).toBe('number')
    expect(typeof result[1]).toBe('number')
  })

  it('low is lower than high', () => {
    const [low, high] = calculatePrice(2, 1, 'one-time')
    expect(low).toBeLessThan(high)
  })

  it('one-time base for 2 bed / 1 bath is $160 ±10%', () => {
    // base = 60 + 2*30 + 1*20 = 160
    const [low, high] = calculatePrice(2, 1, 'one-time')
    expect(low).toBe(144)   // Math.round(160 * 0.9)
    expect(high).toBe(176)  // Math.round(160 * 1.1)
  })

  it('weekly applies 0.80 multiplier', () => {
    // base = 60 + 2*30 + 1*20 = 160 → 160 * 0.80 = 128
    const [low, high] = calculatePrice(2, 1, 'weekly')
    expect(low).toBe(115)   // Math.round(128 * 0.9)
    expect(high).toBe(141)  // Math.round(128 * 1.1)
  })

  it('bi-weekly applies 0.88 multiplier', () => {
    // base = 60 + 2*30 + 1*20 = 160 → 160 * 0.88 = 140.8
    const [low, high] = calculatePrice(2, 1, 'bi-weekly')
    expect(low).toBe(127)   // Math.round(140.8 * 0.9) = Math.round(126.72) = 127
    expect(high).toBe(155)  // Math.round(140.8 * 1.1) = Math.round(154.88) = 155
  })

  it('more bedrooms/bathrooms increases price', () => {
    const [low1] = calculatePrice(1, 1, 'one-time')
    const [low2] = calculatePrice(4, 3, 'one-time')
    expect(low2).toBeGreaterThan(low1)
  })
})
```

- [ ] **Step 2: Run test — expect failure (module not found)**

```bash
npm test
```

Expected: `Cannot find module '@/components/calculator/pricing'`

- [ ] **Step 3: Implement `components/calculator/pricing.ts`**

```typescript
// components/calculator/pricing.ts
export type Frequency = 'one-time' | 'bi-weekly' | 'weekly'

const MULTIPLIERS: Record<Frequency, number> = {
  'one-time': 1.0,
  'bi-weekly': 0.88,
  'weekly': 0.80,
}

export function calculatePrice(
  bedrooms: number,
  bathrooms: number,
  frequency: Frequency,
): [number, number] {
  const base = (60 + bedrooms * 30 + bathrooms * 20) * MULTIPLIERS[frequency]
  return [Math.round(base * 0.9), Math.round(base * 1.1)]
}
```

- [ ] **Step 4: Run tests — expect all pass**

```bash
npm test
```

Expected output: `5 passed`

- [ ] **Step 5: Create `components/calculator/QuoteCalculator.tsx`**

```typescript
// components/calculator/QuoteCalculator.tsx
'use client'

import { useState } from 'react'
import { animate } from 'motion'
import { useEffect, useRef } from 'react'
import { calculatePrice, type Frequency } from './pricing'
import { useModal } from '@/components/modal/ModalProvider'

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)

  useEffect(() => {
    if (!ref.current) return
    const from = prev.current
    const to = value
    prev.current = value
    const ctrl = animate(from, to, {
      duration: 0.4,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `$${Math.round(v)}`
      },
    })
    return () => ctrl.stop()
  }, [value])

  return <span ref={ref}>${value}</span>
}

const FREQUENCIES: { value: Frequency; label: string }[] = [
  { value: 'one-time', label: 'One-time' },
  { value: 'bi-weekly', label: 'Bi-weekly' },
  { value: 'weekly', label: 'Weekly' },
]

export default function QuoteCalculator() {
  const [bedrooms, setBedrooms] = useState(2)
  const [bathrooms, setBathrooms] = useState(1)
  const [frequency, setFrequency] = useState<Frequency>('one-time')
  const { openModal } = useModal()

  const [low, high] = calculatePrice(bedrooms, bathrooms, frequency)

  return (
    <section
      id="calculator"
      className="py-24 px-6 md:px-12"
      aria-labelledby="calc-heading"
    >
      <div className="max-w-2xl mx-auto">
        <h2
          id="calc-heading"
          className="font-display text-4xl md:text-5xl text-ink mb-4 text-center"
        >
          Estimate your clean
        </h2>
        <p className="font-body text-sm text-muted text-center mb-12">
          Adjust below for an instant price range — no commitment required.
        </p>

        <div className="space-y-8">
          {/* Bedrooms */}
          <fieldset>
            <legend className="font-body text-xs tracking-[0.12em] uppercase text-muted mb-3">
              Bedrooms
            </legend>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Number of bedrooms">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <button
                  key={n}
                  onClick={() => setBedrooms(n)}
                  aria-pressed={bedrooms === n}
                  className={[
                    'min-w-[44px] min-h-[44px] px-4 font-body text-sm rounded-sm border transition-colors',
                    bedrooms === n
                      ? 'bg-sage text-cream border-sage'
                      : 'bg-cream text-ink border-ink/15 hover:border-sage',
                  ].join(' ')}
                >
                  {n}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Bathrooms */}
          <fieldset>
            <legend className="font-body text-xs tracking-[0.12em] uppercase text-muted mb-3">
              Bathrooms
            </legend>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Number of bathrooms">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setBathrooms(n)}
                  aria-pressed={bathrooms === n}
                  className={[
                    'min-w-[44px] min-h-[44px] px-4 font-body text-sm rounded-sm border transition-colors',
                    bathrooms === n
                      ? 'bg-sage text-cream border-sage'
                      : 'bg-cream text-ink border-ink/15 hover:border-sage',
                  ].join(' ')}
                >
                  {n}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Frequency */}
          <fieldset>
            <legend className="font-body text-xs tracking-[0.12em] uppercase text-muted mb-3">
              Frequency
            </legend>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Cleaning frequency">
              {FREQUENCIES.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setFrequency(value)}
                  aria-pressed={frequency === value}
                  className={[
                    'min-h-[44px] px-5 font-body text-sm rounded-sm border transition-colors',
                    frequency === value
                      ? 'bg-sage text-cream border-sage'
                      : 'bg-cream text-ink border-ink/15 hover:border-sage',
                  ].join(' ')}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Price output */}
        <div className="mt-12 p-8 border border-sage/30 rounded-[var(--radius-card)] text-center">
          <p className="font-body text-xs tracking-[0.12em] uppercase text-muted mb-2">
            Estimated range
          </p>
          <p className="font-display text-5xl md:text-6xl text-ink" aria-live="polite" aria-atomic="true">
            <AnimatedNumber value={low} />
            <span className="text-muted mx-1">–</span>
            <AnimatedNumber value={high} />
          </p>
          <p className="font-body text-xs text-muted mt-2">Final price confirmed before booking</p>
          <button
            onClick={() => openModal({ bedrooms, bathrooms, frequency })}
            className="mt-6 min-h-[48px] px-8 py-3 bg-terracotta text-cream font-body text-sm font-medium tracking-wide rounded-sm hover:bg-terracotta/90 transition-colors focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
          >
            Book this clean →
          </button>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Add to `app/page.tsx` and verify: toggling inputs animates the price, "Book this clean" would open modal**

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: Quote calculator with animated price + unit tests"
```

---

## Task 11: Values Section

**Files:**
- Create: `components/values/Values.tsx`

- [ ] **Step 1: Create `components/values/Values.tsx`**

```typescript
// components/values/Values.tsx
const pillars = [
  {
    initial: 'E',
    label: 'Eco products only',
    body: 'We use plant-based, biodegradable cleaning solutions — safe for your family, your pets, and the planet.',
  },
  {
    initial: 'L',
    label: 'Living wage staff',
    body: 'Every Lumen cleaner earns above the living wage. Better pay means better care.',
  },
  {
    initial: 'V',
    label: 'Vetted & insured',
    body: 'Full background checks, liability insurance, and ongoing training. You open the door with confidence.',
  },
]

export default function Values() {
  return (
    <section
      className="py-24 px-6 md:px-12 bg-sage/5"
      aria-labelledby="values-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Left — editorial pull-quote (60% = 3/5 cols) */}
          <div className="md:col-span-3">
            <span className="font-body text-xs tracking-[0.14em] uppercase text-sage mb-6 block">
              Why Lumen
            </span>
            <blockquote className="font-display italic text-4xl md:text-5xl lg:text-6xl text-ink leading-tight">
              "We clean as if<br />
              it's our own home."
            </blockquote>
            <p className="font-body text-sm text-muted mt-6 max-w-sm leading-relaxed">
              Lumen was founded on a simple belief: the standard for cleaning should be the same whether it's your home or ours.
            </p>
          </div>

          {/* Right — three value pillars (40% = 2/5 cols) */}
          <div className="md:col-span-2 space-y-8">
            {pillars.map((p) => (
              <div key={p.initial} className="flex gap-4 items-start">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="font-display text-sage text-sm">{p.initial}</span>
                </div>
                <div>
                  <h3 className="font-body text-sm font-semibold text-ink mb-1">{p.label}</h3>
                  <p className="font-body text-sm text-muted leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx` and verify asymmetric editorial layout on desktop, stacked on mobile**

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: Values — asymmetric editorial layout"
```

---

## Task 12: Testimonials

**Files:**
- Create: `components/testimonials/Testimonials.tsx`

- [ ] **Step 1: Create `components/testimonials/Testimonials.tsx`**

```typescript
// components/testimonials/Testimonials.tsx
const testimonials = [
  {
    id: 'margaret',
    quote:
      'I've tried four cleaning services in the last two years. Lumen is the first one where I actually felt like they cared about the result, not just finishing the job.',
    name: 'Margaret L.',
    location: 'Tribeca',
    large: true,
  },
  {
    id: 'james',
    quote: 'Reliable, thorough, and the eco products are a genuine plus. Our apartment has never felt cleaner.',
    name: 'James & Priya K.',
    location: 'Park Slope',
    large: false,
  },
  {
    id: 'sofia',
    quote: 'Moved in to a place that had been empty for eight months. Lumen made it feel like home in one visit.',
    name: 'Sofia R.',
    location: 'Hoboken',
    large: false,
  },
]

export default function Testimonials() {
  return (
    <section
      className="py-24 px-6 md:px-12"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="testimonials-heading"
          className="font-display text-4xl md:text-5xl text-ink mb-16 text-center"
        >
          What clients say
        </h2>

        {/* Staggered grid: large card left spanning 2 rows, two smaller cards right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className={[
                'p-8 bg-cream border border-ink/[0.08] rounded-[var(--radius-card)]',
                'shadow-[var(--shadow-card)]',
                t.large ? 'md:row-span-2' : '',
              ].join(' ')}
            >
              <p
                className={[
                  'font-display italic text-ink leading-snug mb-6',
                  t.large ? 'text-2xl md:text-3xl' : 'text-lg',
                ].join(' ')}
              >
                "{t.quote}"
              </p>
              <footer className="flex flex-col">
                <cite className="font-body text-sm font-semibold text-ink not-italic">
                  {t.name}
                </cite>
                <span className="font-body text-xs text-muted mt-0.5">{t.location}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx` and verify: large quote spans two rows on desktop, all three visible on mobile as a column**

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: Testimonials — staggered grid, no carousel"
```

---

## Task 13: FAQ Accordion

**Files:**
- Create: `components/faq/FAQ.tsx`

- [ ] **Step 1: Create `components/faq/FAQ.tsx`**

```typescript
// components/faq/FAQ.tsx
'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const faqs = [
  {
    q: 'How often should I have my home cleaned?',
    a: 'Most clients choose bi-weekly for ongoing maintenance. If your household is busy or has pets, weekly cleaning keeps things consistently fresh. We offer one-time cleans for special occasions or first-time deep cleans.',
  },
  {
    q: 'What eco-certified products do you use?',
    a: 'We use a curated set of plant-based, biodegradable cleaners — all free from harsh chemicals, bleach, and synthetic fragrances. They are safe for children, pets, and allergy-sensitive households.',
  },
  {
    q: 'What is included in a standard clean?',
    a: 'A standard clean covers all living areas, bedrooms, bathrooms, and kitchen: vacuuming, mopping, surface wipe-downs, toilet and sink scrubbing, and appliance exteriors. Deep cleans add inside-oven, inside-fridge, baseboards, and window sills.',
  },
  {
    q: 'How do I reschedule or cancel a booking?',
    a: 'You can reschedule or cancel up to 24 hours before your appointment at no charge via the link in your confirmation email. Late cancellations within 24 hours incur a 50% service fee.',
  },
  {
    q: 'Are your cleaners background-checked?',
    a: 'Yes. Every Lumen team member passes a full criminal background check, identity verification, and reference check before their first booking. Our team is also fully insured and bonded.',
  },
  {
    q: 'What if I am not satisfied with the clean?',
    a: 'We stand behind our work with a 100% satisfaction guarantee. If you are not happy with any area, contact us within 24 hours and we will return to re-clean it at no cost.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="py-24 px-6 md:px-12 bg-sage/5"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          id="faq-heading"
          className="font-display text-4xl md:text-5xl text-ink mb-16 text-center"
        >
          Questions
        </h2>
        <dl className="divide-y divide-ink/[0.08]">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i}>
                <dt>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 py-5 min-h-[52px] text-left focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    <span className="font-body text-sm font-medium text-ink">{faq.q}</span>
                    <span
                      className={[
                        'flex-shrink-0 w-5 h-5 text-sage transition-transform duration-200',
                        isOpen ? 'rotate-45' : '',
                      ].join(' ')}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-sm text-muted leading-relaxed pb-5">
                        {faq.a}
                      </p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx` and verify: clicking a question smoothly expands/collapses, "+" rotates to "×", only one open at a time**

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: FAQ accordion with Motion AnimatePresence"
```

---

## Task 14: Footer CTA

**Files:**
- Create: `components/footer/FooterCTA.tsx`

- [ ] **Step 1: Create `components/footer/FooterCTA.tsx`**

```typescript
// components/footer/FooterCTA.tsx
import FooterCTAButton from './FooterCTAButton'

export default function FooterCTA() {
  return (
    <footer className="bg-cream border-t border-sage/20">
      {/* Big CTA band */}
      <div className="py-24 px-6 md:px-12 text-center">
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-ink mb-8 leading-tight">
          Ready for a<br />
          <em className="italic">cleaner home?</em>
        </h2>
        <FooterCTAButton />
      </div>

      {/* Footer links */}
      <div className="border-t border-sage/10 py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display italic text-ink/60 text-sm">Lumen Clean Co.</span>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-6" role="list">
              {[
                { label: 'Services', href: '#services' },
                { label: 'Privacy', href: '#' },
                { label: 'Instagram', href: '#' },
                { label: 'Contact', href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-body text-xs tracking-wide text-muted hover:text-ink transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <span className="font-body text-xs text-muted">© 2025 Lumen Clean Co.</span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Create `components/footer/FooterCTAButton.tsx` (client, needs modal)**

```typescript
// components/footer/FooterCTAButton.tsx
'use client'

import { useModal } from '@/components/modal/ModalProvider'

export default function FooterCTAButton() {
  const { openModal } = useModal()
  return (
    <button
      onClick={() => openModal()}
      className="min-h-[52px] px-10 py-4 bg-terracotta text-cream font-body text-sm font-medium tracking-wide rounded-sm hover:bg-terracotta/90 transition-colors focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
    >
      Get your instant quote →
    </button>
  )
}
```

- [ ] **Step 3: Add to `app/page.tsx` and verify footer CTA renders, links visible, italic "Lumen Clean Co." wordmark**

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Footer CTA + footer navigation"
```

---

## Task 15: Quote Modal

**Files:**
- Create: `components/modal/QuoteModal.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/modal/QuoteModal.tsx`**

```typescript
// components/modal/QuoteModal.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useModal } from './ModalProvider'

export default function QuoteModal() {
  const { open, prefill, closeModal } = useModal()
  const [submitted, setSubmitted] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal()
      setSubmitted(false)
    } else {
      dialogRef.current?.close()
    }
  }, [open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => closeModal(), 3000)
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) closeModal()
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onKeyDown={(e) => e.key === 'Escape' && closeModal()}
      className="m-auto mt-auto sm:mt-auto w-full max-w-lg bg-cream border border-sage/30 rounded-[var(--radius-card)] p-0 backdrop:bg-ink/40 backdrop:backdrop-blur-sm open:flex open:flex-col"
      aria-labelledby="modal-title"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="p-8 w-full"
          >
            {submitted ? (
              <div className="py-8 text-center">
                <p className="font-display italic text-3xl text-ink mb-3">Thank you.</p>
                <p className="font-body text-sm text-muted">
                  We'll be in touch within 2 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-8">
                  <h2
                    id="modal-title"
                    className="font-display text-3xl text-ink"
                  >
                    Get your quote
                  </h2>
                  <button
                    onClick={closeModal}
                    aria-label="Close quote form"
                    className="text-muted hover:text-ink transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center -mt-1 -mr-2"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Name" name="name" type="text" required />
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Phone" name="phone" type="tel" />
                    <Field label="Address" name="address" type="text" required />
                  </div>

                  <div>
                    <label className="font-body text-xs tracking-[0.1em] uppercase text-muted block mb-1.5">
                      Service
                    </label>
                    <select
                      name="service"
                      defaultValue={prefill.service ?? ''}
                      className="w-full min-h-[44px] px-3 bg-cream border border-ink/15 rounded-[var(--radius-card)] font-body text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                    >
                      <option value="">Select a service</option>
                      <option value="Deep Clean">Deep Clean</option>
                      <option value="Regular Clean">Regular Clean</option>
                      <option value="Move In / Out">Move In / Out</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  <Field label="Preferred date" name="date" type="date" />

                  <div>
                    <label className="font-body text-xs tracking-[0.1em] uppercase text-muted block mb-1.5">
                      Notes (optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      className="w-full px-3 py-2 bg-cream border border-ink/15 rounded-[var(--radius-card)] font-body text-sm text-ink resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[52px] bg-terracotta text-cream font-body text-sm font-medium tracking-wide rounded-sm hover:bg-terracotta/90 transition-colors focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                  >
                    Send my request
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  )
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string
  name: string
  type: string
  required?: boolean
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-body text-xs tracking-[0.1em] uppercase text-muted block mb-1.5"
      >
        {label}
        {required && <span className="text-terracotta ml-0.5" aria-hidden="true">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full min-h-[44px] px-3 bg-cream border border-ink/15 rounded-[var(--radius-card)] font-body text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      />
    </div>
  )
}
```

- [ ] **Step 2: Update `app/layout.tsx` to render QuoteModal inside ModalProvider**

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { cormorant, dmSans } from '@/lib/fonts'
import { ModalProvider } from '@/components/modal/ModalProvider'
import QuoteModal from '@/components/modal/QuoteModal'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lumen Clean Co. — Premium Residential & Commercial Cleaning',
  description:
    'Professional cleaning, thoughtfully done. Insured, eco-certified, and background-checked staff serving your home and office.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <ModalProvider>
          {children}
          <QuoteModal />
        </ModalProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify modal: click any CTA → modal slides up, form fills correctly, submit → confirmation message → closes after 3s. Escape key and backdrop click close it.**

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Quote modal with animation + confirmation state"
```

---

## Task 16: Assemble Full Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx` with full assembly**

```typescript
// app/page.tsx
import Nav from '@/components/nav/Nav'
import Hero from '@/components/hero/Hero'
import TrustStrip from '@/components/trust/TrustStrip'
import ServicesGrid from '@/components/services/ServicesGrid'
import HowItWorks from '@/components/how-it-works/HowItWorks'
import QuoteCalculator from '@/components/calculator/QuoteCalculator'
import Values from '@/components/values/Values'
import Testimonials from '@/components/testimonials/Testimonials'
import FAQ from '@/components/faq/FAQ'
import FooterCTA from '@/components/footer/FooterCTA'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <ServicesGrid />
        <HowItWorks />
        <QuoteCalculator />
        <Values />
        <Testimonials />
        <FAQ />
      </main>
      <FooterCTA />
    </>
  )
}
```

- [ ] **Step 2: Run dev server and do a full page walkthrough**

```bash
npm run dev
```

Walk through at 375px width (Chrome DevTools mobile emulation):
- [ ] Nav transparent → solid on scroll
- [ ] Hero SVG wipes on scroll
- [ ] Trust strip scrolls horizontally on small screens
- [ ] Services grid 1-column on mobile
- [ ] How It Works stacked on mobile
- [ ] Calculator pill toggles hit 44px min
- [ ] Values stacked on mobile
- [ ] Testimonials single column on mobile
- [ ] FAQ accordion opens/closes
- [ ] Footer CTA button visible
- [ ] Every CTA opens the modal correctly

- [ ] **Step 3: Run TypeScript check — zero errors allowed**

```bash
npx tsc --noEmit
```

Expected: no output (no errors).

- [ ] **Step 4: Run tests**

```bash
npm test
```

Expected: all pricing tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: assemble full landing page — all 10 sections"
```

---

## Task 17: Quality Pass

**Files:**
- Modify: `app/globals.css` (if any gap found)
- Modify: any component where a11y or touch target issues are found

- [ ] **Step 1: WCAG AA check — run axe DevTools or browser accessibility audit**

In Chrome DevTools → Lighthouse → Accessibility. Target: 100. Fix any flagged issues:
- Missing `alt` on images (we use SVGs with `aria-hidden` — verify each)
- Missing labels on form fields in modal
- Color contrast: sage (#7A9E7E) on cream (#F7F2EC) — contrast ratio ~3.2:1. This passes AA for large text (≥18pt) but not small text. **Apply to headings/display text only; body text uses `text-ink` (#2C2C2A) for full contrast.**

- [ ] **Step 2: Check all interactive elements are ≥ 44×44px**

In DevTools, inspect: Nav CTA, Nav links, calculator pills, FAQ buttons, modal close, modal submit, service card CTAs, footer CTA. All should have `min-h-[44px]` or `min-h-[44px] min-w-[44px]`.

- [ ] **Step 3: Verify `prefers-reduced-motion` fallbacks**

In Chrome DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`.

- Hero: SVG blob should be hidden, headline visible immediately
- Nav: transition should still apply (it's a color change, not motion — acceptable)
- FAQ: AnimatePresence will still animate slightly — add a CSS media query override if needed

If needed, add to `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Run production build to check for any build errors**

```bash
npm run build
```

Expected: `✓ Compiled successfully`. Zero errors.

- [ ] **Step 5: Run Lighthouse (Production build)**

```bash
npm run start
```

Open Chrome → DevTools → Lighthouse → run on `http://localhost:3000`.
Target: Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO ≥ 95.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "quality: a11y pass, reduced-motion, touch targets, build verified"
```

---

## Summary

**Dev commands:**
```bash
npm run dev      # Start dev server at http://localhost:3000
npm test         # Run Vitest unit tests (pricing logic)
npm run build    # Production build
npm run start    # Serve production build for Lighthouse
npx tsc --noEmit # TypeScript check
```

**Build order:** Tasks 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13 → 14 → 15 → 16 → 17

**Checkpoint groups:**
- After Task 7: Group 1 done (Nav + Hero + Trust Strip) — review in browser
- After Task 10: Group 2 done (Services + How It Works + Calculator) — review in browser
- After Task 16: Group 3 done (Values + Testimonials + FAQ + Footer + Modal) — full walkthrough
- After Task 17: Ship-ready
