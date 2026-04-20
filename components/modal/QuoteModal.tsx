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
      className="m-auto w-full max-w-lg bg-cream border border-sage/30 rounded-[var(--radius-card)] p-0 backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
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
                  We&apos;ll be in touch within 2 hours.
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
