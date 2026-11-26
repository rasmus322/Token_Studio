export interface ColorLiteral {
  hex: string // #rrggbb - always lowercase
  alpha?: number // 0..1
}

const HEX_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/

/**
 * Transforms HEX color into RGB
 * @param hex
 */
const toRgb = (hex: string): [number, number, number] => {
  return [
    Number.parseInt(hex.slice(1, 3), 16),
    Number.parseInt(hex.slice(3, 5), 16),
    Number.parseInt(hex.slice(5, 7), 16),
  ]
}

const linearize = (value: number): number => {
  const channel = value / 255

  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
}

/**
 * Examines hex-string. If string isn't color - return null
 * @param input
 */
export const parseColor = (input: string): ColorLiteral | null => {
  const value = input.trim().toLowerCase()
  const match = HEX_PATTERN.exec(value)

  if (!match || !match[1]) {
    return null
  }

  const digits = match[1]

  if (digits.length === 3) {
    const expanded = [...digits].map((char) => char + char).join('')

    return { hex: `#${expanded}` }
  }

  if (digits.length === 6) {
    return { hex: `#${digits}` }
  }

  // 8 chars: last 2 - alpha channel
  const alpha = Math.round((Number.parseInt(digits.slice(6, 8), 16) / 255) * 1000) / 1000

  return alpha >= 1 ? { hex: `#${digits.slice(0, 6)}` } : { hex: `#${digits.slice(0, 6)}`, alpha }
}

/**
 * Returns color in CSS values
 * @param color
 */
export const formatColor = (color: ColorLiteral): string => {
  if (color.alpha === undefined || color.alpha >= 1) {
    return color.hex
  }

  const [r, g, b] = toRgb(color.hex)

  return `rgba(${r}, ${g}, ${b}, ${color.alpha})`
}

/**
 * Calculates relative brightness (WGAC 2.x.)
 * @param color
 */
export const relativeLuminance = (color: ColorLiteral): number => {
  const [r, g, b] = toRgb(color.hex)

  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}
