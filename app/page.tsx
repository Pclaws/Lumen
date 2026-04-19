import Nav from '@/components/nav/Nav'
import Hero from '@/components/hero/Hero'
import TrustStrip from '@/components/trust/TrustStrip'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TrustStrip />
      <div className="h-screen bg-cream" />
    </main>
  )
}
