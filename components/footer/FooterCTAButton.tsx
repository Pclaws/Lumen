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
      Get your instant quote &rarr;
    </button>
  )
}
