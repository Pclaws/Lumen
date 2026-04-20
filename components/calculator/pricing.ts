// components/calculator/pricing.ts
export type Frequency = 'one-time' | 'bi-weekly' | 'weekly'

const MULTIPLIERS: Record<Frequency, number> = {
  'one-time': 1.0,
  'bi-weekly': 0.88,
  'weekly': 0.80,
}

export function calculatePrice(
  bedrooms: number,
  bathrooms: number,
  frequency: Frequency,
): [number, number] {
  const base = (80 + bedrooms * 30 + bathrooms * 20) * MULTIPLIERS[frequency]
  return [Math.round(base * 0.9), Math.round(base * 1.1)]
}
