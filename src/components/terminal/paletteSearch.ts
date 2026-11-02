import { commandRegistry } from './commandRegistry'
import { sectionRegistry } from '../../data/sections'
import type { PortfolioSection } from '../../types/portfolio'

export interface PaletteItem {
  id: string
  label: string
  detail: string
  category: 'Command' | 'Section'
  command?: string
  href?: string
  keywords: readonly string[]
}

const items: readonly PaletteItem[] = [
  ...commandRegistry.map(command => ({
    id: `command:${command.name}`,
    label: command.usage,
    detail: command.summary,
    category: 'Command' as const,
    command: command.name,
    keywords: [command.name, ...(command.aliases ?? []), ...(command.keywords ?? [])],
  })),
  ...sectionRegistry.map((section: PortfolioSection) => ({
    id: `section:${section.id}`,
    label: section.label,
    detail: section.description,
    category: 'Section' as const,
    href: `#${section.id}`,
    keywords: [section.id, section.shortLabel ?? '', section.label],
  })),
]

export function searchPalette(query: string, recent: readonly string[] = []): PaletteItem[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) {
    const recentItems = recent.map(id => items.find(item => item.id === id)).filter((item): item is PaletteItem => Boolean(item))
    const remaining = items.filter(item => !recent.includes(item.id))
    return [...recentItems, ...remaining].slice(0, 8)
  }
  return items.filter(item =>
    [item.label, item.detail, ...item.keywords].some(value => value.toLowerCase().includes(normalized)),
  ).slice(0, 8)
}

export function nextPaletteIndex(current: number, length: number, direction: -1 | 1) {
  if (length === 0) return 0
  return (current + direction + length) % length
}

export function isPaletteShortcut(event: Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey'>) {
  return event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey
}
