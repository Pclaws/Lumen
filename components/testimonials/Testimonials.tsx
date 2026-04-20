// components/testimonials/Testimonials.tsx
const testimonials = [
  {
    id: 'margaret',
    quote:
      'I\u2019ve tried four cleaning services in the last two years. Lumen is the first one where I actually felt like they cared about the result, not just finishing the job.',
    name: 'Margaret L.',
    location: 'Tribeca',
    large: true,
  },
  {
    id: 'james',
    quote: 'Reliable, thorough, and the eco products are a genuine plus. Our apartment has never felt cleaner.',
    name: 'James & Priya K.',
    location: 'Park Slope',
    large: false,
  },
  {
    id: 'sofia',
    quote: 'Moved in to a place that had been empty for eight months. Lumen made it feel like home in one visit.',
    name: 'Sofia R.',
    location: 'Hoboken',
    large: false,
  },
]

export default function Testimonials() {
  return (
    <section
      className="py-24 px-6 md:px-12"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="testimonials-heading"
          className="font-display text-4xl md:text-5xl text-ink mb-16 text-center"
        >
          What clients say
        </h2>

        {/* Staggered grid: large card left spanning 2 rows, two smaller cards right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className={[
                'p-8 bg-cream border border-ink/[0.08] rounded-[var(--radius-card)]',
                'shadow-[var(--shadow-card)]',
                t.large ? 'md:row-span-2' : '',
              ].join(' ')}
            >
              <p
                className={[
                  'font-display italic text-ink leading-snug mb-6',
                  t.large ? 'text-2xl md:text-3xl' : 'text-lg',
                ].join(' ')}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="flex flex-col">
                <cite className="font-body text-sm font-semibold text-ink not-italic">
                  {t.name}
                </cite>
                <span className="font-body text-xs text-muted mt-0.5">{t.location}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
