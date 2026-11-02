export type SectionId =
  | 'home'
  | 'terminal'
  | 'universe'
  | 'missions'
  | 'leadership'
  | 'telemetry'
  | 'contact'

export interface PortfolioSection {
  id: SectionId
  label: string
  shortLabel?: string
  description: string
}

export interface ProjectMission {
  id: string
  title: string
  summary: string
  technologies: readonly string[]
  repositoryUrl?: string
  liveUrl?: string
}
