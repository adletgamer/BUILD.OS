import { ArrowUpRight, Terminal } from 'lucide-react'

const links = [
  { href: '#universe', label: 'Explore' },
  { href: '#missions', label: 'Missions' },
  { href: '#contact', label: 'Contact' },
] as const

export function SectionNavigation() {
  return <header className="site-header">
    <a className="brand" href="#home" aria-label="BUILD.OS home">BUILD<span>.OS</span></a>
    <nav aria-label="Primary navigation">{links.map(({ href, label }) => <a href={href} key={href}>{label}</a>)}</nav>
    <a className="terminal-link" href="#terminal" aria-label="Open Terminal"><Terminal size={16} aria-hidden="true" /><span>Open Terminal</span><ArrowUpRight size={14} aria-hidden="true" /></a>
  </header>
}
