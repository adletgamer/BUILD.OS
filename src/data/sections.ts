import type { PortfolioSection } from '../types/portfolio'

export const sectionRegistry = [
  { id: 'home', label: 'Home', description: 'Cinematic entry point.' },
  {
    id: 'terminal',
    label: 'Interactive Terminal',
    shortLabel: 'Terminal',
    description: 'A safe command interface for exploring this portfolio. Type help or choose a shortcut to begin.',
  },
  {
    id: 'universe',
    label: 'Tech Universe',
    shortLabel: 'Universe',
    description: 'Verified technologies and relationships will be mapped in Sprint 3.',
  },
  {
    id: 'missions',
    label: 'Project Missions',
    shortLabel: 'Missions',
    description: 'Verified projects and engineering decisions will be presented in Sprint 3.',
  },
  {
    id: 'leadership',
    label: 'Leadership & Community',
    shortLabel: 'Leadership',
    description: 'Verified leadership and community work will be added in Sprint 3.',
  },
  {
    id: 'journey',
    label: 'Builder Journey',
    description: 'Verified personal milestones and decisions will be added here.',
  },
  {
    id: 'telemetry',
    label: 'Life Telemetry',
    shortLabel: 'Telemetry',
    description: 'Personal interests and telemetry will be designed in Sprint 4.',
  },
  {
    id: 'contact',
    label: 'Contact',
    description: 'Verified contact channels will be added before launch.',
  },
] as const satisfies readonly PortfolioSection[]
