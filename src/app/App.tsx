import { ArrowDown, Sparkles } from 'lucide-react'
import { sectionRegistry } from '../data/sections'
import { SectionNavigation } from '../components/navigation/SectionNavigation'

export function App() {
  return (
    <div className="app-shell">
      <SectionNavigation sections={sectionRegistry} />
      <main id="main-content">
        <section className="hero-shell" id="home" aria-labelledby="hero-title">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow"><Sparkles aria-hidden="true" size={16} /> Builder system online</p>
            <h1 id="hero-title">Build beyond the expected.</h1>
            <p className="hero-copy">
              BUILD.OS is the foundation for an interactive builder universe. Verified portfolio
              content will be added in later sprints.
            </p>
            <a className="primary-link" href="#terminal">
              Explore the system <ArrowDown aria-hidden="true" size={18} />
            </a>
          </div>
        </section>

        {sectionRegistry.slice(1).map((section, index) => (
          <section
            className="foundation-section"
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            key={section.id}
          >
            <p className="section-index">0{index + 1}</p>
            <div>
              <p className="eyebrow">Foundation placeholder</p>
              <h2 id={`${section.id}-title`}>{section.label}</h2>
              <p>{section.description}</p>
            </div>
          </section>
        ))}
      </main>
      <footer className="site-footer">
        <span>BUILD. EXPLORE. SHARE.</span>
        <span>BUILD.OS</span>
      </footer>
    </div>
  )
}
