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
