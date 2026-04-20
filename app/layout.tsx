// app/layout.tsx
import type { Metadata } from 'next'
import { cormorant, dmSans } from '@/lib/fonts'
import { ModalProvider } from '@/components/modal/ModalProvider'
import QuoteModal from '@/components/modal/QuoteModal'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lumen Clean Co. — Premium Residential & Commercial Cleaning',
  description:
    'Professional cleaning, thoughtfully done. Insured, eco-certified, and background-checked staff serving your home and office.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <ModalProvider>
          {children}
          <QuoteModal />
        </ModalProvider>
      </body>
    </html>
  )
}
