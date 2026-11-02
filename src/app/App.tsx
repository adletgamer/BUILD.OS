import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { sectionRegistry } from '../data/sections'
import { HeroCanvasSlot } from '../components/hero/HeroCanvasSlot'
import { SectionNavigation } from '../components/navigation/SectionNavigation'
import { Badge, ButtonLink, SurfaceCard } from '../components/ui/Primitives'
import { Terminal } from '../components/terminal/Terminal'
import { GlobalCommandPalette } from '../components/terminal/GlobalCommandPalette'
import { TechUniverse } from '../components/universe/TechUniverse'
import { useTerminal } from '../hooks/useTerminal'
import { useEffect } from 'react'

export function App() {
  const terminal = useTerminal()
  useEffect(() => {
    if (window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
  }, [])
  return (
    <div className="app-shell">
      <SectionNavigation />
      <GlobalCommandPalette terminal={terminal} />
      <main id="main-content">
        <section className="hero-shell" id="home" aria-labelledby="hero-title">
          <div className="hero-copy-block">
            <p className="eyebrow"><span className="eyebrow-line" /> THE BUILDER UNIVERSE / 001</p>
            <h1 id="hero-title">Build beyond<br /><em>the expected.</em></h1>
            <p className="hero-intro">An interactive space for building, exploring and sharing technology through documented public projects.</p>
            <div className="domain-list" aria-label="Technology domains"><Badge>Cloud & AWS</Badge><Badge>Web3 & Blockchain</Badge><Badge>AI & Data</Badge><Badge>Product Engineering</Badge></div>
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
            className={`chapter ${section.id === 'terminal' ? 'chapter--terminal' : ''} ${section.id === 'universe' ? 'chapter--universe' : ''}`}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            key={section.id}
          >
            <div className="chapter-marker"><span>CHAPTER {String(index + 1).padStart(2, '0')}</span><span className="chapter-rule" /></div>
            {section.id === 'universe' ? <TechUniverse /> : <div className="chapter-body">
              <div><p className="eyebrow">BUILD.OS / {section.id.toUpperCase()}</p><h2 id={`${section.id}-title`}>{section.label}</h2><p>{section.description}</p></div>
              {section.id === 'terminal'
                ? <Terminal terminal={terminal} />
                : <SurfaceCard className="chapter-preview"><span className="preview-cross" aria-hidden="true">+</span><span>MODULE {String(index + 1).padStart(2, '0')}</span><strong>In development</strong></SurfaceCard>}
            </div>}
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
