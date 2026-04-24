<div align="center">

# ✦ Lumen Clean Co.

**Your spaces, _illuminated._**

A premium cleaning service website built with Next.js — serving houses, inside buildings, and hotels.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12-FF0055?style=flat-square)](https://motion.dev/)

</div>

---

## About

**Lumen Clean Co.** is a modern, premium-designed landing page for a professional cleaning business that serves:

- 🏠 **Houses & Residential** — comprehensive cleaning for homes of all sizes
- 🏢 **Inside Buildings** — offices, multi-tenant buildings, and corporate spaces
- 🏨 **Hotels & Hospitality** — impeccable turnover and deep cleaning for guests
- ✨ **Deep Clean** — thorough cleaning of every surface for seasonal transformations

The site is designed to feel luxurious and alive — with cinematic hero animations, parallax scrolling, and a cohesive warm color palette that reflects the brand's commitment to quality.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with Turbopack |
| **React 19** | UI library |
| **Tailwind CSS 4** | Utility-first styling |
| **Motion (Framer Motion)** | Animations & scroll-linked effects |
| **TypeScript** | Type safety |
| **Vitest** | Unit testing |

---

## Features

- **Cinematic Hero Section** — full-bleed background image with parallax zoom, gradient overlay, and staggered text reveal animations
- **Adaptive Navigation** — transparent nav over the hero that transitions to a solid background on scroll, with a custom logo
- **Instant Quote Modal** — interactive calculator for visitors to get a cleaning estimate
- **Services Grid** — highlights each service area (houses, buildings, hotels, deep clean)
- **How It Works** — step-by-step process breakdown
- **Testimonials** — social proof from satisfied clients
- **FAQ Accordion** — answers to common questions
- **Trust Strip** — certifications and trust signals
- **Fully Responsive** — optimized for mobile, tablet, and desktop
- **Accessibility** — semantic HTML, focus-visible outlines, reduced-motion support

---

## Design Tokens

The brand uses a refined, warm palette:

| Token | Hex | Usage |
|---|---|---|
| `cream` | `#F7F2EC` | Backgrounds |
| `sage` | `#7A9E7E` | Accents, highlights |
| `terracotta` | `#C47B5A` | CTAs, warmth |
| `ink` | `#2C2C2A` | Text, dark elements |
| `muted` | `#8A8A82` | Secondary text |

**Typography:**
- Display: *Cormorant Garamond* (serif)
- Body: *DM Sans* (sans-serif)

---

## Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **npm** or your preferred package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Pclaws/Lumen.git
cd Lumen

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |

---

## Project Structure

```
Lumen/
├── app/
│   ├── globals.css          # Design tokens & base styles
│   ├── layout.tsx           # Root layout with fonts & modal provider
│   └── page.tsx             # Home page composition
├── components/
│   ├── calculator/          # Instant quote calculator
│   ├── faq/                 # FAQ accordion
│   ├── footer/              # Footer with CTA
│   ├── hero/                # Hero section with parallax
│   ├── how-it-works/        # Process steps
│   ├── modal/               # Quote modal & provider
│   ├── nav/                 # Adaptive navigation bar
│   ├── services/            # Services grid
│   ├── testimonials/        # Client testimonials
│   ├── trust/               # Trust signals strip
│   └── values/              # Company values
├── lib/                     # Utilities & font config
├── public/                  # Static assets (logo, hero image)
└── tests/                   # Test files
```

---

## License

This project is proprietary. All rights reserved.

---

<div align="center">

*Built with care by [Pclaws](https://github.com/Pclaws)*

</div>
