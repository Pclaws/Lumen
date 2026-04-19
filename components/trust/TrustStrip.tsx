// components/trust/TrustStrip.tsx
const items = [
  { label: '500+ five-star reviews', prefix: '★★★★★' },
  { label: 'Insured & bonded' },
  { label: 'Background-checked staff' },
  { label: 'Eco-certified products' },
  { label: 'Satisfaction guaranteed' },
]

export default function TrustStrip() {
  return (
    <section
      className="bg-cream border-y border-sage/20 py-5 overflow-x-auto"
      aria-label="Trust indicators"
    >
      <ul
        className="flex items-center justify-center gap-0 min-w-max mx-auto px-6"
        role="list"
      >
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center">
            <span className="font-body text-xs tracking-[0.12em] uppercase text-ink/60 px-6 whitespace-nowrap">
              {item.prefix && (
                <span className="text-sage mr-2 tracking-normal" aria-hidden="true">
                  {item.prefix}
                </span>
              )}
              {item.label}
            </span>
            {i < items.length - 1 && (
              <span className="w-px h-3 bg-sage/30" aria-hidden="true" />
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
