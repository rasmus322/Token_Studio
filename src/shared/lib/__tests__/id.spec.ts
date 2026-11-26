import { describe, expect, it } from 'vitest'

import { createId } from '../id'

describe('createId', () => {
  it('returns a uuid', () => {
    expect(createId()).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('adds the prefix with an underscore', () => {
    expect(createId('tok')).toMatch(/^tok_[0-9a-f-]{36}$/)
  })

  it('doesnt repeat', () => {
    const ids = new Set(Array.from({ length: 1000 }, () => createId()))

    expect(ids.size).toBe(1000)
  })
})
