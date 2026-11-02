import { describe, expect, it } from 'vitest'
import { getSectionHref } from './navigation'

describe('getSectionHref', () => {
  it('creates a safe section fragment from a label', () => {
    expect(getSectionHref('Project Missions')).toBe('#project-missions')
  })
})
