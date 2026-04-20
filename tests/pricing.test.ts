// tests/pricing.test.ts
import { describe, it, expect } from 'vitest'
import { calculatePrice } from '@/components/calculator/pricing'

describe('calculatePrice', () => {
  it('returns a two-element tuple of numbers', () => {
    const result = calculatePrice(2, 1, 'one-time')
    expect(result).toHaveLength(2)
    expect(typeof result[0]).toBe('number')
    expect(typeof result[1]).toBe('number')
  })

  it('low is lower than high', () => {
    const [low, high] = calculatePrice(2, 1, 'one-time')
    expect(low).toBeLessThan(high)
  })

  it('one-time base for 2 bed / 1 bath is $160 ±10%', () => {
    // base = 60 + 2*30 + 1*20 = 160
    const [low, high] = calculatePrice(2, 1, 'one-time')
    expect(low).toBe(144)   // Math.round(160 * 0.9)
    expect(high).toBe(176)  // Math.round(160 * 1.1)
  })

  it('weekly applies 0.80 multiplier', () => {
    // base = 60 + 2*30 + 1*20 = 160 → 160 * 0.80 = 128
    const [low, high] = calculatePrice(2, 1, 'weekly')
    expect(low).toBe(115)   // Math.round(128 * 0.9)
    expect(high).toBe(141)  // Math.round(128 * 1.1)
  })

  it('bi-weekly applies 0.88 multiplier', () => {
    // base = 60 + 2*30 + 1*20 = 160 → 160 * 0.88 = 140.8
    const [low, high] = calculatePrice(2, 1, 'bi-weekly')
    expect(low).toBe(127)   // Math.round(140.8 * 0.9) = Math.round(126.72) = 127
    expect(high).toBe(155)  // Math.round(140.8 * 1.1) = Math.round(154.88) = 155
  })

  it('more bedrooms/bathrooms increases price', () => {
    const [low1] = calculatePrice(1, 1, 'one-time')
    const [low2] = calculatePrice(4, 3, 'one-time')
    expect(low2).toBeGreaterThan(low1)
  })
})
