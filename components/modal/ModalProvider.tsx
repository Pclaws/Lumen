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
