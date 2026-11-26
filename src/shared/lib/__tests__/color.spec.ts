import { describe, expect, it } from 'vitest'

import { formatColor, parseColor, relativeLuminance } from '../color'

describe('parseColor', () => {
  it('parses a 6-digit hex', () => {
    expect(parseColor('#ffffff')).toEqual({ hex: '#ffffff' })
  })

  it('normalizes uppercase to lowercase', () => {
    expect(parseColor('#FFFFFF')).toEqual({ hex: '#ffffff' })
  })

  it('expands a 3-digit hex', () => {
    expect(parseColor('#fff')).toEqual({ hex: '#ffffff' })
  })

  it('splits and 8-digit hex into hex and alpha', () => {
    expect(parseColor('#0000000f')).toEqual({ hex: '#000000', alpha: 0.059 })
  })

  it('drops alpha when color is fully visible', () => {
    expect(parseColor('#000000ff')).toEqual({ hex: '#000000' })
  })

  it('ignores whitespaces', () => {
    expect(parseColor('   #ffffff  ')).toEqual({ hex: '#ffffff' })
  })

  it.each(['', '#', '#ab', '#abcde', '#gggggg', '4f46e5', 'red'])('rejects %j', (input) => {
    expect(parseColor(input)).toBeNull()
  })
})

describe('formatColor', () => {
  it('returns hex when the color is fully visible', () => {
    expect(formatColor({ hex: '#000000' })).toBe('#000000')
  })

  it('return rgba when the color has alpha', () => {
    expect(formatColor({ hex: '#000000', alpha: 0.06 })).toBe('rgba(0, 0, 0, 0.06)')
  })
})

describe('relativeLuminance', () => {
  it('returns 1 for white and 0 for black', () => {
    expect(relativeLuminance({ hex: '#ffffff' })).toBeCloseTo(1, 6)
    expect(relativeLuminance({ hex: '#000000' })).toBeCloseTo(0, 6)
  })

  it('uses WCAG channel weights', () => {
    expect(relativeLuminance({ hex: '#4f46e5' })).toBeCloseTo(0.117, 3)
    expect(relativeLuminance({ hex: '#94a3b8' })).toBeCloseTo(0.3595, 4)
  })
})
