import Nav from '@/components/nav/Nav'

export default function Home() {
  return (
    <main>
      <Nav />
      <div className="h-[200vh] bg-cream flex items-center justify-center pt-32">
        <p className="font-display text-4xl text-ink">Scroll to test nav</p>
      </div>
    </main>
  )
}
