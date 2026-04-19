'use client'

import { useModal } from '@/components/modal/ModalProvider'

export default function ServiceCTA({ service }: { service: string }) {
  const { openModal } = useModal()

  return (
    <button
      onClick={() => openModal({ service })}
      className="font-body text-sm text-terracotta tracking-wide hover:underline underline-offset-4 min-h-[44px] flex items-center focus-visible:outline-none focus-visible:underline"
    >
      Get a quote →
    </button>
  )
}
