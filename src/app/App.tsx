import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { sectionRegistry } from '../data/sections'
import { HeroCanvasSlot } from '../components/hero/HeroCanvasSlot'
import { SectionNavigation } from '../components/navigation/SectionNavigation'
import { Badge, ButtonLink, SurfaceCard } from '../components/ui/Primitives'

export function App() {
  return (
    <div className="app-shell">
      <SectionNavigation />
      <main id="main-content">
        <section className="hero-shell" id="home" aria-labelledby="hero-title">
          <div className="hero-copy-block">
            <p className="eyebrow"><span className="eyebrow-line" /> THE BUILDER UNIVERSE / 001</p>
            <h1 id="hero-title">Build beyond<br /><em>the expected.</em></h1>
            <p className="hero-intro">An interactive space for building, exploring and sharing technology. Personal work and engineering stories will appear here once verified.</p>
            <div className="domain-list" aria-label="Technology domains"><Badge>Cloud</Badge><Badge>Web3</Badge><Badge>Emerging Tech</Badge><Badge>Community</Badge></div>
            <div className="hero-actions">
              <ButtonLink href="#universe">Explore the universe <ArrowUpRight size={18} aria-hidden="true" /></ButtonLink>
              <a className="text-link" href="#missions">View missions <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
          <HeroCanvasSlot />
          <a className="scroll-cue" href="#terminal"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} aria-hidden="true" /></a>
          <span className="hero-coordinate" aria-hidden="true">BUILD.OS / SYSTEM 01</span>
        </section>

        {sectionRegistry.slice(1).map((section, index) => (
          <section
            className="chapter"
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            key={section.id}
          >
            <div className="chapter-marker"><span>CHAPTER {String(index + 1).padStart(2, '0')}</span><span className="chapter-rule" /></div>
            <div className="chapter-body">
              <div><p className="eyebrow">BUILD.OS / {section.id.toUpperCase()}</p><h2 id={`${section.id}-title`}>{section.label}</h2><p>{section.description}</p></div>
              <SurfaceCard className="chapter-preview"><span className="preview-cross" aria-hidden="true">+</span><span>MODULE {String(index + 1).padStart(2, '0')}</span><strong>In development</strong></SurfaceCard>
            </div>
          </section>
        ))}
      </main>
      <footer className="site-footer">
        <span>BUILD. EXPLORE. SHARE.</span>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </div>
  )
}
