import { Command } from 'lucide-react'
import type { PortfolioSection } from '../../types/portfolio'

interface SectionNavigationProps {
  sections: readonly PortfolioSection[]
}

export function SectionNavigation({ sections }: SectionNavigationProps) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="BUILD.OS home">
        BUILD<span>.OS</span>
      </a>
      <nav aria-label="Primary navigation">
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.shortLabel ?? section.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <button className="command-button" type="button" disabled title="Available in Sprint 2">
        <Command aria-hidden="true" size={16} /> <span>CMD K</span>
      </button>
    </header>
  )
}
