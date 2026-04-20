import ServiceCTA from './ServiceCTA'

const services = [
  {
    id: 'deep',
    title: 'Deep Clean',
    description: 'A thorough clean of every surface, corner, and crevice — perfect for first-time clients.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 stroke-sage fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 38 Q18 20 28 14" />
        <path d="M28 14 Q32 12 34 16 Q36 20 30 24 Q26 28 22 30" />
        <path d="M22 30 Q18 32 16 36" />
        <circle cx="36" cy="12" r="2" />
        <path d="M8 40 L12 36" />
      </svg>
    ),
  },
  {
    id: 'regular',
    title: 'Regular Clean',
    description: 'Consistent maintenance cleaning on your schedule — weekly or bi-weekly.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 stroke-sage fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="10" y="12" width="28" height="26" rx="2" />
        <path d="M10 20 L38 20" />
        <path d="M18 8 L18 16" />
        <path d="M30 8 L30 16" />
        <path d="M26 32 Q28 28 32 30" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'move',
    title: 'Move In / Out',
    description: 'Leave your old place spotless or welcome yourself into a fresh, clean home.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 stroke-sage fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="12" y="18" width="24" height="18" rx="1" />
        <path d="M12 18 L24 10 L36 18" />
        <path d="M16 36 L16 24 L24 24 L24 36" />
        <path d="M28 28 L32 28 M28 32 L32 32" />
      </svg>
    ),
  },
  {
    id: 'commercial',
    title: 'Commercial',
    description: 'Office and retail spaces kept pristine — flexible scheduling around your business hours.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 stroke-sage fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="8" y="16" width="32" height="24" rx="1" />
        <path d="M8 16 L24 6 L40 16" />
        <path d="M16 40 L16 28 L22 28 L22 40" />
        <path d="M26 28 L32 28 L32 36 L26 36 Z" />
        <path d="M12 22 L14 22 M20 22 L22 22 M28 22 L30 22 M36 22 L38 22" />
      </svg>
    ),
  },
]

export default function ServicesGrid() {
  return (
    <section
      id="services"
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto"
      aria-labelledby="services-heading"
    >
      <h2
        id="services-heading"
        className="font-display text-4xl md:text-5xl text-ink mb-16 text-center"
      >
        What we do
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((service) => (
          <article
            key={service.id}
            className="group relative p-8 bg-cream border border-ink/[0.08] rounded-[var(--radius-card)] transition-all duration-300 hover:-translate-y-1 hover:border-sage/50 hover:shadow-[var(--shadow-card-hover)] focus-within:border-sage/50"
          >
            <div className="mb-6">{service.icon}</div>
            <h3 className="font-display text-2xl text-ink mb-2">{service.title}</h3>
            <p className="font-body text-sm text-ink/70 leading-relaxed mb-6">
              {service.description}
            </p>
            <ServiceCTA service={service.title} />
          </article>
        ))}
      </div>
    </section>
  )
}
