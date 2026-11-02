export type DomainId = 'cloud' | 'web3' | 'ai' | 'product'

export interface VerifiedProject {
  slug: string
  name: string
  summary: string
  technologies: readonly string[]
  url: string
  evidence: string
}

export interface TechDomain {
  id: DomainId
  index: string
  name: string
  shortName: string
  description: string
  shape: 'hexagon' | 'octagon' | 'diamond' | 'square'
  technologies: readonly string[]
  projectSlugs: readonly string[]
  position: { x: number; y: number }
  connectedTo: readonly DomainId[]
}

export const verifiedProjects: readonly VerifiedProject[] = [
  {
    slug: 'aviso-andino',
    name: 'Aviso Andino',
    summary: 'The repository documents an AWS event pipeline for weather alerts and school notification flows.',
    technologies: ['AWS CDK', 'Lambda', 'SQS', 'DynamoDB'],
    url: 'https://github.com/adletgamer/AvisoAndino',
    evidence: 'README.md · architecture and deployment sections',
  },
  {
    slug: 'defi-tracker',
    name: 'DeFi Portfolio Tracker',
    summary: 'An event driven portfolio tracker with local AWS emulators and CDK deployment configuration.',
    technologies: ['EventBridge', 'SQS', 'Lambda', 'DynamoDB'],
    url: 'https://github.com/adletgamer/DeFi-Portfolio-Tracker-event-drive',
    evidence: 'README.md · overview and architecture',
  },
  {
    slug: 'amaruid',
    name: 'AmaruID',
    summary: 'An offline first verifiable credential prototype with periodic Stellar testnet anchoring.',
    technologies: ['Stellar', 'Verifiable credentials', 'Offline first'],
    url: 'https://github.com/adletgamer/AmaruID',
    evidence: 'README.md · project overview',
  },
  {
    slug: 'fondealo',
    name: 'Fondealo',
    summary: 'A Stellar and Soroban business identity and financing application; KYB and financing remain sandbox flows.',
    technologies: ['Stellar', 'Soroban', 'Next.js', 'PostgreSQL'],
    url: 'https://github.com/adletgamer/Fondeal0',
    evidence: 'README.md · product status and repository',
  },
  {
    slug: 'urban-recycle',
    name: 'Urban Recycle Tokens',
    summary: 'Solidity contracts for token rewards and NFT certificates tied to recycling events.',
    technologies: ['Solidity', 'ERC-20', 'ERC-721', 'Hardhat'],
    url: 'https://github.com/adletgamer/urban-recycle-tokens',
    evidence: 'README.md · contracts and system overview',
  },
  {
    slug: 'accessai',
    name: 'AccessAI',
    summary: 'A career guidance application described with profile analysis, embeddings and vector matching.',
    technologies: ['FastAPI', 'Embeddings', 'PostgreSQL', 'pgvector'],
    url: 'https://github.com/adletgamer/AccessAi',
    evidence: 'README.md · system architecture and core features',
  },
  {
    slug: 'emotion-detector',
    name: 'Emotion Detector',
    summary: 'A Python webcam project using OpenCV and the FER library for emotion detection.',
    technologies: ['Python', 'OpenCV', 'FER'],
    url: 'https://github.com/adletgamer/Emotion-Detector',
    evidence: 'README.md · tech stack and features',
  },
  {
    slug: 'punku',
    name: 'Punku',
    summary: 'A mobile focused business identity prototype; the README labels its MVP data and capture flows as simulated.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Mobile UX'],
    url: 'https://github.com/adletgamer/Punku',
    evidence: 'README.md · user flow and stack',
  },
  {
    slug: 'atria',
    name: 'Atria',
    summary: 'A React and TypeScript consignment readiness interface with evidence tracking documented in its repository.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    url: 'https://github.com/adletgamer/Atria',
    evidence: 'README.md · solution and technical stack',
  },
  {
    slug: 'build-os',
    name: 'BUILD.OS',
    summary: 'This portfolio application uses React, TypeScript, GSAP and an interactive command interface.',
    technologies: ['React', 'TypeScript', 'GSAP', 'R3F'],
    url: 'https://github.com/adletgamer/BUILD.OS',
    evidence: 'README.md and current source',
  },
]

export const techDomains: readonly TechDomain[] = [
  {
    id: 'cloud', index: '01', name: 'Cloud & AWS', shortName: 'Cloud',
    description: 'Event driven services, data pipelines and infrastructure described in public AWS repositories.',
    shape: 'hexagon', technologies: ['AWS CDK', 'Lambda', 'EventBridge', 'SQS', 'DynamoDB'],
    projectSlugs: ['aviso-andino', 'defi-tracker'],
    position: { x: 24, y: 28 }, connectedTo: ['web3', 'ai', 'product'],
  },
  {
    id: 'web3', index: '02', name: 'Web3 & Blockchain', shortName: 'Web3',
    description: 'Identity, verifiable evidence and token systems built around public chain primitives.',
    shape: 'octagon', technologies: ['Stellar', 'Soroban', 'Solidity', 'Verifiable credentials'],
    projectSlugs: ['amaruid', 'fondealo', 'urban-recycle'],
    position: { x: 75, y: 22 }, connectedTo: ['cloud', 'product'],
  },
  {
    id: 'ai', index: '03', name: 'AI & Data', shortName: 'AI & Data',
    description: 'Applied machine learning interfaces and data retrieval flows documented in public repositories.',
    shape: 'diamond', technologies: ['FastAPI', 'Embeddings', 'pgvector', 'OpenCV'],
    projectSlugs: ['accessai', 'emotion-detector'],
    position: { x: 27, y: 75 }, connectedTo: ['cloud', 'product'],
  },
  {
    id: 'product', index: '04', name: 'Product Engineering', shortName: 'Product',
    description: 'User flows, responsive interfaces and full stack prototypes shaped around concrete problems.',
    shape: 'square', technologies: ['React', 'TypeScript', 'Next.js', 'Responsive UX'],
    projectSlugs: ['punku', 'atria', 'build-os'],
    position: { x: 75, y: 73 }, connectedTo: ['cloud', 'web3', 'ai'],
  },
]

export function getProjectBySlug(slug: string) {
  return verifiedProjects.find(project => project.slug === slug)
}
