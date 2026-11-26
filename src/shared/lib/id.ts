/**
 * Generates a unique id
 * If prefix given - generates id like 'prefix_1f9c...'
 */
export const createId = (prefix?: string): string => {
  const id = crypto.randomUUID()

  return prefix ? `${prefix}_${id}` : id
}
