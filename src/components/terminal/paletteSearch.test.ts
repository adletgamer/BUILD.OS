import { describe, expect, it } from 'vitest'
import { isPaletteShortcut, nextPaletteIndex, searchPalette } from './paletteSearch'

describe('command palette search', () => {
  it('finds commands and portfolio sections from the shared registry', () => {
    expect(searchPalette('cybersecurity').map(item => item.command)).toContain('skills')
    expect(searchPalette('missions').some(item => item.href === '#missions')).toBe(true)
    expect(searchPalette('linkedin').some(item => item.command === 'github')).toBe(true)
  })
  it('ranks recent actions first when the query is empty', () => {
    expect(searchPalette('', ['section:contact'])[0]?.id).toBe('section:contact')
  })
  it('wraps keyboard selection safely', () => {
    expect(nextPaletteIndex(0, 3, -1)).toBe(2)
    expect(nextPaletteIndex(2, 3, 1)).toBe(0)
    expect(nextPaletteIndex(0, 0, 1)).toBe(0)
  })
  it('recognizes only unmodified Ctrl/Cmd+K', () => {
    expect(isPaletteShortcut({ key: 'k', ctrlKey: true, metaKey: false, altKey: false, shiftKey: false })).toBe(true)
    expect(isPaletteShortcut({ key: 'K', ctrlKey: false, metaKey: true, altKey: false, shiftKey: false })).toBe(true)
    expect(isPaletteShortcut({ key: 'k', ctrlKey: true, metaKey: false, altKey: false, shiftKey: true })).toBe(false)
    expect(isPaletteShortcut({ key: 'k', ctrlKey: false, metaKey: false, altKey: false, shiftKey: false })).toBe(false)
  })
})
