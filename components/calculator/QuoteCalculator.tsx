// components/calculator/QuoteCalculator.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { animate } from 'motion'
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
