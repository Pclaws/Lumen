import Nav from '@/components/nav/Nav'
import Hero from '@/components/hero/Hero'
import TrustStrip from '@/components/trust/TrustStrip'
import ServicesGrid from '@/components/services/ServicesGrid'
import HowItWorks from '@/components/how-it-works/HowItWorks'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <HowItWorks />
      <div className="h-screen bg-cream" />
    </main>
  )
}
