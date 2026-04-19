# ROLE
You are a Senior Frontend Engineer and Art Director. Your job is to build a
spotless, production-ready landing page for "Lumen Clean Co." — a premium
residential + commercial cleaning studio positioned 25% above market rate.
This site's only job is to convert visitors into quote requests.

## STEP 1 — INVOKE /frontend-design SKILL
# Run this first inside Claude Code before writing any code:
/frontend-design

Read the skill fully. Internalize: no Inter, no purple gradients, no stock
photos of women holding spray bottles. Commit to ONE bold aesthetic direction
before touching a file. The direction for this project is:

WARM-ORGANIC LUXURY — cream (#F7F2EC) base, sage green (#7A9E7E) as the
signature accent, terracotta (#C47B5A) as a hot accent used sparingly on CTAs
only. Think Aesop, Le Labo, Kinfolk magazine. The homepage should feel like it
belongs on a shelf next to premium soap, not a cleaning franchise.

## STEP 2 — FIRECRAWL COMPETITIVE RESEARCH
# Use the Firecrawl MCP to scrape these URLs before building:
- https://www.handy.com
- https://www.maidsailors.com
- https://www.thecleaningauthority.com
- https://www.getmaid.com

For each site, extract:
1. Color palette + hero image strategy
2. Social proof placement (above or below the fold?)
3. ONE thing they do well
4. ONE thing that reads template-y or generic

Summarize your findings in 8 bullets. Store the summary in README.md under
"## Competitive Research". Do NOT copy any of their choices. Use them as
anti-patterns to deliberately subvert.

## STEP 3 — STACK
- Next.js 15 App Router + TypeScript strict mode
- Tailwind CSS v4 with @theme directive (CSS variables, no JS config)
- Motion (npm install motion) for animations
- next/font — use Cormorant Garamond (display) + DM Sans (body)
- next/image for all images

## STEP 4 — PAGE SECTIONS (in order)
1. Nav — transparent on load, solid cream on scroll. Logo left, 3 links center, CTA right.
2. Hero — full-viewport. Oversized serif headline ("Your home, handled."),
   sub in DM Sans. BG is an abstract SVG that animates like a soft wipe on
   scroll (not a stock photo). Primary CTA: "Get your instant quote →"
3. Trust strip — 5-star ratings, "Insured & bonded", "Background-checked staff",
   "Eco-certified products". Single horizontal row, understated.
4. Services grid — 4 cards: Deep Clean / Regular Clean / Move In-Out / Commercial.
   Each card has a hand-drawn-style SVG icon (build these inline), a short
   title, one sentence, and a soft hover lift.
5. How it works — 3 steps: Book online → We clean → You verify. Step numbers
   in oversized Cormorant numerals. Horizontal on desktop, stacked on mobile.
6. Quote Calculator — interactive, client-side only. Inputs: bedrooms (1-6),
   bathrooms (1-4), frequency (one-time / weekly / bi-weekly). Output: price
   range estimate. No backend. Animate the number change with Motion.
7. Values section — "Why Lumen" — eco products, living wage staff, vetted + 
   insured. Asymmetric two-column layout. Feels editorial.
8. Testimonials — 3 quotes. NOT a carousel. Staggered card layout, one quote
   larger than the others. Real-sounding names.
9. FAQ accordion — 6 questions. Animate open/close with Motion layout animation.
10. Footer CTA — big centered headline, single CTA, muted footer links below.

## STEP 5 — QUALITY REQUIREMENTS
- Lighthouse score ≥ 95 on all four metrics
- WCAG AA — semantic HTML, focus-visible on all interactive elements
- prefers-reduced-motion: all animations fall back gracefully
- No any, no ts-ignore, no dead imports
- Mobile-first — test at 375px width
- All interactive elements have 44px minimum touch targets

## STEP 6 — WHAT MAKES THIS UNFORGETTABLE
The hero has ONE scroll-linked moment: an SVG shape (abstract curved form,
cream on sage) that "wipes" across the screen as the user scrolls down 80px,
revealing the headline beneath it. Subtle. Premium. Unexpected in this
industry. Implement with Motion's useScroll + useTransform.

## WHEN DONE
Print a summary: files created, Firecrawl findings (8 bullets), aesthetic
rationale, the "memorable moment" you built, commands to run dev server.
