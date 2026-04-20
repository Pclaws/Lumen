// app/page.tsx
import Nav from '@/components/nav/Nav'
import Hero from '@/components/hero/Hero'
import TrustStrip from '@/components/trust/TrustStrip'
import ServicesGrid from '@/components/services/ServicesGrid'
import HowItWorks from '@/components/how-it-works/HowItWorks'
import QuoteCalculator from '@/components/calculator/QuoteCalculator'
import Values from '@/components/values/Values'
import Testimonials from '@/components/testimonials/Testimonials'
import FAQ from '@/components/faq/FAQ'
import FooterCTA from '@/components/footer/FooterCTA'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <ServicesGrid />
        <HowItWorks />
        <QuoteCalculator />
        <Values />
        <Testimonials />
        <FAQ />
      </main>
      <FooterCTA />
    </>
  )
}
