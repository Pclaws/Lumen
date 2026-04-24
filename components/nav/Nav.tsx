'use client'

import { useScroll, useMotionValueEvent } from 'motion/react'
import { useState } from 'react'
import { useModal } from '@/components/modal/ModalProvider'
import Image from 'next/image'

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
          className={`flex items-center gap-2 font-display italic text-xl tracking-wide transition-colors ${solid ? 'text-ink hover:text-sage' : 'text-cream hover:text-sage/80'}`}
          aria-label="Lumen Clean Co. — home"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <Image 
              src="/logo.png" 
              alt="Lumen Logo" 
              fill 
              sizes="32px"
              className={`object-cover transition-all duration-300 ${solid ? 'mix-blend-multiply' : 'invert mix-blend-screen'}`}
            />
          </div>
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
                className={`font-body text-sm transition-colors tracking-wide ${solid ? 'text-ink/70 hover:text-ink' : 'text-cream/80 hover:text-cream'}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => openModal()}
          className={`min-h-[44px] min-w-[44px] px-5 py-2 font-body text-sm font-medium tracking-wide rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 ${solid ? 'bg-terracotta text-cream hover:bg-terracotta/90 focus-visible:ring-terracotta' : 'bg-cream text-ink hover:bg-cream/90 focus-visible:ring-cream'}`}
        >
          Get a quote
        </button>
      </nav>
    </header>
  )
}
