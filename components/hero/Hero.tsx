'use client'

import { useScroll, useTransform, motion } from 'motion/react'
import { useModal } from '@/components/modal/ModalProvider'
import Image from 'next/image'

export default function Hero() {
  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 500], [0, 150])
  const opacityFade = useTransform(scrollY, [0, 300], [1, 0])
  const bgScale = useTransform(scrollY, [0, 500], [1, 1.15])

  const { openModal } = useModal()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0, filter: 'blur(10px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  }

  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Image with parallax zoom */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: bgScale }}
      >
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark gradient overlay for text legibility */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70" />

      {/* Noise Texture Overlay */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.05] z-[2]"
        aria-hidden="true"
      >
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: yParallax, opacity: opacityFade }}
      >
        <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cream/20 bg-cream/10 backdrop-blur-md">
          <span className="font-body text-xs font-semibold tracking-widest uppercase text-cream/90">Premium Cleaning Services</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-cream leading-[0.95] tracking-tight mb-8"
        >
          Your spaces,
          <br />
          <span className="relative inline-block">
            <em className="italic text-sage">illuminated.</em>
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-terracotta/60" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 10 Q50 20 100 10" fill="transparent" stroke="currentColor" strokeWidth="4" />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-body text-base md:text-xl text-cream/80 max-w-2xl mx-auto mb-10 tracking-wide leading-relaxed"
        >
          Professional cleaning with a touch of brilliance. We take care of <strong className="font-semibold text-cream">houses, inside buildings, and hotels</strong>, transforming every environment into a pristine sanctuary.
        </motion.p>

        <motion.div variants={itemVariants}>
          <button
            onClick={() => openModal()}
            className="group relative inline-flex items-center gap-3 min-h-[56px] px-10 py-4 bg-cream text-ink font-body text-sm font-medium tracking-wide rounded-full overflow-hidden transition-all hover:shadow-2xl hover:shadow-cream/20 focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2"
          >
            <span className="relative z-10">Get your instant quote</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            <div className="absolute inset-0 bg-sage scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        aria-hidden="true"
      >
        <span className="font-body text-[10px] uppercase tracking-widest text-cream/50">Scroll to explore</span>
        <div className="w-px h-16 bg-gradient-to-b from-cream/40 to-transparent animate-[pulse_2s_ease-in-out_infinite]" />
      </motion.div>
    </section>
  )
}

