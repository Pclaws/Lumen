// components/values/Values.tsx
const pillars = [
  {
    initial: 'E',
    label: 'Eco products only',
    body: 'We use plant-based, biodegradable cleaning solutions — safe for your family, your pets, and the planet.',
  },
  {
    initial: 'L',
    label: 'Living wage staff',
    body: 'Every Lumen cleaner earns above the living wage. Better pay means better care.',
  },
  {
    initial: 'V',
    label: 'Vetted & insured',
    body: 'Full background checks, liability insurance, and ongoing training. You open the door with confidence.',
  },
]

export default function Values() {
  return (
    <section
      className="py-24 px-6 md:px-12 bg-sage/5"
      aria-labelledby="values-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Left — editorial pull-quote (60% = 3/5 cols) */}
          <div className="md:col-span-3">
            <span className="font-body text-xs tracking-[0.14em] uppercase text-sage mb-6 block">
              Why Lumen
            </span>
            <blockquote className="font-display italic text-4xl md:text-5xl lg:text-6xl text-ink leading-tight">
              &ldquo;We clean as if<br />
              it&rsquo;s our own home.&rdquo;
            </blockquote>
            <p className="font-body text-sm text-muted mt-6 max-w-sm leading-relaxed">
              Lumen was founded on a simple belief: the standard for cleaning should be the same whether it&rsquo;s your home or ours.
            </p>
          </div>

          {/* Right — three value pillars (40% = 2/5 cols) */}
          <div className="md:col-span-2 space-y-8">
            {pillars.map((p) => (
              <div key={p.initial} className="flex gap-4 items-start">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="font-display text-sage text-sm">{p.initial}</span>
                </div>
                <div>
                  <h3 className="font-body text-sm font-semibold text-ink mb-1">{p.label}</h3>
                  <p className="font-body text-sm text-muted leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
