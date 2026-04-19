import Nav from '@/components/nav/Nav'
import Hero from '@/components/hero/Hero'
import TrustStrip from '@/components/trust/TrustStrip'
import ServicesGrid from '@/components/services/ServicesGrid'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <div className="h-screen bg-cream" />
    </main>
  )
}
