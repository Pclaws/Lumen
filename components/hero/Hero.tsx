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
        <p className="font-body text-base md:text-lg text-ink/70 max-w-md mx-auto mb-10 tracking-wide">
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
