import { describe, expect, it } from 'vitest'
import { getProjectBySlug, techDomains, verifiedProjects } from './techUniverse'

describe('Tech Universe content model', () => {
  it('provides four distinct, connected and selectable domains', () => {
    expect(techDomains.map(domain => domain.id)).toEqual(['cloud', 'web3', 'ai', 'product'])
    for (const domain of techDomains) {
      expect(domain.connectedTo.length).toBeGreaterThan(0)
      expect(domain.projectSlugs.length).toBeGreaterThan(0)
      expect(domain.position.x).toBeGreaterThan(0)
      expect(domain.position.y).toBeGreaterThan(0)
    }
  })

  it('links every related project to an indexed public GitHub repository', () => {
    for (const domain of techDomains) {
      for (const slug of domain.projectSlugs) {
        const project = getProjectBySlug(slug)
        expect(project).toBeDefined()
        expect(project?.url).toMatch(/^https:\/\/github\.com\/adletgamer\/[^/]+$/)
        expect(project?.evidence).toBeTruthy()
      }
    }
    expect(new Set(verifiedProjects.map(project => project.slug)).size).toBe(verifiedProjects.length)
  })
})
