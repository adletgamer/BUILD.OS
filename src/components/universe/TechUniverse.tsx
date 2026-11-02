import { ArrowUpRight, Boxes, BrainCircuit, Cloud, Workflow } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { techDomains, getProjectBySlug, type DomainId, type TechDomain } from '../../data/techUniverse'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const icons = { cloud: Cloud, web3: Boxes, ai: BrainCircuit, product: Workflow }
const edges = techDomains.flatMap((domain, index) =>
  domain.connectedTo
    .filter(id => techDomains.findIndex(candidate => candidate.id === id) > index)
    .map(id => ({ from: domain, to: techDomains.find(candidate => candidate.id === id)! })),
)

function DomainButton({ domain, active, selected, onSelect, onPreview, onLeave }: {
  domain: TechDomain
  active: boolean
  selected: boolean
  onSelect: () => void
  onPreview: () => void
  onLeave: () => void
}) {
  const Icon = icons[domain.id]
  const style = { '--node-x': `${domain.position.x}%`, '--node-y': `${domain.position.y}%` } as CSSProperties
  return <button
    type="button"
    className={`universe-node universe-node--${domain.shape} ${active ? 'is-active' : ''} ${selected ? 'is-selected' : ''}`}
    style={style}
    aria-pressed={selected}
    aria-controls="universe-panel"
    onClick={onSelect}
    onMouseEnter={onPreview}
    onMouseLeave={onLeave}
    onFocus={onPreview}
    onBlur={onLeave}
  >
    <span className="universe-node-symbol"><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></span>
    <span className="universe-node-copy"><small>{domain.index} / DOMAIN</small><strong>{domain.shortName}</strong><span className="universe-node-mobile-description">{domain.description}</span></span>
    <span className="universe-node-hint" aria-hidden="true">{domain.name}</span>
  </button>
}

export function TechUniverse() {
  const [selectedId, setSelectedId] = useState<DomainId>('cloud')
  const [hoveredId, setHoveredId] = useState<DomainId | null>(null)
  const reducedMotion = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const focusedId = hoveredId ?? selectedId
  const selected = techDomains.find(domain => domain.id === selectedId) ?? techDomains[0]
  if (!selected) throw new Error('Tech Universe requires at least one domain')

  useEffect(() => {
    if (reducedMotion || !root.current) return
    const context = gsap.context(() => {
      gsap.fromTo('.universe-node', { autoAlpha: 0, y: 24 }, {
        autoAlpha: 1, y: 0, duration: .65, stagger: .12, ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 78%', once: true },
      })
    }, root)
    return () => context.revert()
  }, [reducedMotion])

  return <div className="universe-layout" ref={root}>
    <div className="universe-heading">
      <div><p className="eyebrow">CONNECTED DOMAINS / VERIFIED WORK</p><h2 id="universe-title">Tech Universe</h2></div>
      <p>Select a domain to inspect the technologies and public repositories behind it.</p>
    </div>
    <div className="universe-body">
      <div className="universe-map" aria-label="Technology domain constellation">
        <div className="universe-map-grid" aria-hidden="true" />
        <svg className="universe-connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {edges.map(({ from, to }) => <line key={`${from.id}-${to.id}`} x1={from.position.x} y1={from.position.y} x2={to.position.x} y2={to.position.y} className={from.id === focusedId || to.id === focusedId ? 'is-lit' : ''} />)}
        </svg>
        {techDomains.map(domain => <DomainButton key={domain.id} domain={domain} selected={domain.id === selectedId} active={domain.id === focusedId}
          onSelect={() => setSelectedId(domain.id)} onPreview={() => setHoveredId(domain.id)} onLeave={() => setHoveredId(null)} />)}
        <span className="universe-map-axis universe-map-axis--x" aria-hidden="true">EXPLORE / BUILD / CONNECT</span>
      </div>
      <aside className="universe-panel" id="universe-panel" aria-label={`${selected.name} details`} aria-live="polite">
        <div className="universe-panel-top"><span>DOMAIN {selected.index} / 04</span><span className="universe-panel-status">REPOSITORY EVIDENCE</span></div>
        <h3>{selected.name}</h3>
        <p>{selected.description}</p>
        <div className="universe-panel-section"><h4>TECHNOLOGIES IN THE REPOSITORIES</h4><div className="universe-tech-list">{selected.technologies.map(technology => <span key={technology}>{technology}</span>)}</div></div>
        <div className="universe-panel-section"><h4>RELATED PROJECTS</h4><ul className="universe-projects">
          {selected.projectSlugs.map(slug => {
            const project = getProjectBySlug(slug)
            if (!project) return null
            return <li key={slug}><a href={project.url} target="_blank" rel="noopener noreferrer"><span><strong>{project.name}</strong><small>{project.summary}</small></span><ArrowUpRight size={17} aria-hidden="true" /></a></li>
          })}
        </ul></div>
        <p className="universe-evidence-note">Descriptions reflect linked public repository documentation. Product status is stated where the repository distinguishes prototypes or sandbox flows.</p>
      </aside>
    </div>
  </div>
}
