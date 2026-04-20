// components/footer/FooterCTA.tsx
import FooterCTAButton from './FooterCTAButton'

export default function FooterCTA() {
  return (
    <footer className="bg-cream border-t border-sage/20">
      {/* Big CTA band */}
      <div className="py-24 px-6 md:px-12 text-center">
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-ink mb-8 leading-tight">
          Ready for a<br />
          <em className="italic">cleaner home?</em>
        </h2>
        <FooterCTAButton />
      </div>

      {/* Footer links */}
      <div className="border-t border-sage/10 py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display italic text-ink/60 text-sm">Lumen Clean Co.</span>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-6" role="list">
              {[
                { label: 'Services', href: '#services' },
                { label: 'Privacy', href: '#' },
                { label: 'Instagram', href: '#' },
                { label: 'Contact', href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-body text-xs tracking-wide text-muted hover:text-ink transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <span className="font-body text-xs text-muted">&copy; 2025 Lumen Clean Co.</span>
        </div>
      </div>
    </footer>
  )
}
