const steps = [
  { number: '01', title: 'Book online', body: 'Choose your service, pick a time, and confirm in under two minutes.' },
  { number: '02', title: 'We clean', body: 'Your vetted, background-checked cleaner arrives on time with eco-certified supplies.' },
  { number: '03', title: 'You verify', body: 'Walk through with our satisfaction guarantee — not happy? We come back, free.' },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-6 md:px-12 bg-sage/5 overflow-hidden"
      aria-labelledby="how-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="how-heading"
          className="font-display text-4xl md:text-5xl text-ink mb-16 text-center"
        >
          How it works
        </h2>
        <ol
          className="relative flex flex-col md:flex-row gap-12 md:gap-0"
          role="list"
        >
          {steps.map((step, i) => (
            <li
              key={step.number}
              className="relative flex-1 flex flex-col md:items-center md:text-center px-0 md:px-8"
            >
              {/* Connector line on desktop */}
              {i < steps.length - 1 && (
                <span
                  className="hidden md:block absolute top-8 left-[calc(50%+3rem)] right-[-calc(50%-3rem)] h-px border-t border-dashed border-sage/40"
                  aria-hidden="true"
                />
              )}
              {/* Step number */}
              <span
                className="font-display text-[8rem] md:text-[10rem] leading-none text-sage/15 select-none pointer-events-none absolute -top-6 left-0 md:left-1/2 md:-translate-x-1/2"
                aria-hidden="true"
              >
                {step.number}
              </span>
              {/* Content */}
              <div className="relative pt-8 md:pt-12">
                <h3 className="font-display text-2xl text-ink mb-3">{step.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed max-w-xs">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
