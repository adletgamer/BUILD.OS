import type { CommandDefinition, CommandResult, OutputBlock } from './terminalTypes'

const text = (value: string): OutputBlock => ({ type: 'text', text: value })
const heading = (value: string): OutputBlock => ({ type: 'heading', text: value })
const link = (label: string, href: string): OutputBlock => ({ type: 'link', label, href })
const section = (title: string, description: string, href: string): CommandResult => ({
  blocks: [heading(title), text(description), link('Open section', href)],
  navigateTo: href,
})
const noArgs = (args: readonly string[], usage: string): CommandResult | null =>
  args.length ? { blocks: [text(`Unexpected arguments. Usage: ${usage}`)] } : null

export const commandRegistry: readonly CommandDefinition[] = [
  { name: 'help', aliases: ['?'], summary: 'Show available commands', usage: 'help', category: 'System',
    handler: ({ args }) => noArgs(args, 'help') ?? { blocks: [heading('Available commands'), { type: 'list', items: ['help · clear · whoami · skills · projects', 'mission <slug> · leadership · journey', 'github · life · contact · sudo reveal'] }, text('Type a command or choose a suggestion. Tab completes a command.')] } },
  { name: 'clear', aliases: ['cls'], summary: 'Clear terminal output', usage: 'clear', category: 'System',
    handler: ({ args }) => noArgs(args, 'clear') ?? { blocks: [], clear: true } },
  { name: 'whoami', aliases: ['about'], summary: 'About this builder space', usage: 'whoami', category: 'Explore', keywords: ['about'],
    handler: ({ args }) => noArgs(args, 'whoami') ?? section('About BUILD.OS', 'An interactive portfolio for verified work, engineering decisions and community building. Personal biography is awaiting confirmation.', '#home') },
  { name: 'skills', aliases: ['stack'], summary: 'Explore technology domains', usage: 'skills', category: 'Explore', keywords: ['blockchain', 'web3', 'ai', 'cloud', 'cybersecurity', 'it'],
    handler: ({ args }) => noArgs(args, 'skills') ?? section('Technology domains', 'Cloud, Web3, emerging technology and community are the current themes. Specific skills will be verified in the Tech Universe.', '#universe') },
  { name: 'projects', aliases: ['missions'], summary: 'Explore project missions', usage: 'projects', category: 'Navigate', keywords: ['project missions'],
    handler: ({ args }) => noArgs(args, 'projects') ?? section('Project missions', 'Verified projects and engineering decisions will appear here.', '#missions') },
  { name: 'mission', summary: 'Inspect a mission by slug', usage: 'mission <slug>', category: 'Navigate',
    handler: ({ args }) => args.length !== 1
      ? { blocks: [text('Provide one mission slug. Usage: mission <slug>. Try projects to view the mission section.')] }
      : !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(args[0] ?? '')
        ? { blocks: [text('Mission slugs use letters, numbers and single hyphens only. Example: mission cloud-project.')] }
      : { blocks: [heading(`Mission: ${args[0]}`), text('No verified mission matches this slug yet. Project data will be added in Sprint 3.'), link('View project missions', '#missions')] } },
  { name: 'leadership', summary: 'Explore leadership and community', usage: 'leadership', category: 'Navigate',
    handler: ({ args }) => noArgs(args, 'leadership') ?? section('Leadership & community', 'Verified leadership and community work will appear here.', '#leadership') },
  { name: 'journey', summary: 'Explore the builder journey', usage: 'journey', category: 'Explore',
    handler: ({ args }) => noArgs(args, 'journey') ?? section('Builder journey', 'The timeline and personal milestones are awaiting verification.', '#journey') },
  { name: 'github', aliases: ['social'], summary: 'Open the verified GitHub repository', usage: 'github', category: 'Navigate', keywords: ['linkedin', 'youtube', 'social media'],
    handler: ({ args }) => noArgs(args, 'github') ?? { blocks: [heading('Find BUILD.OS'), link('GitHub · adletgamer/BUILD.OS', 'https://github.com/adletgamer/BUILD.OS'), text('LinkedIn and YouTube links are pending verification.')] } },
  { name: 'life', aliases: ['telemetry'], summary: 'Explore life telemetry', usage: 'life', category: 'Navigate',
    handler: ({ args }) => noArgs(args, 'life') ?? section('Life telemetry', 'Personal interests and telemetry will appear after verification.', '#telemetry') },
  { name: 'contact', summary: 'Find verified contact channels', usage: 'contact', category: 'Navigate',
    handler: ({ args }) => noArgs(args, 'contact') ?? section('Contact', 'Verified contact channels will appear here before launch.', '#contact') },
  { name: 'sudo reveal', summary: 'Discover a hidden signal', usage: 'sudo reveal', category: 'System', keywords: ['easter egg'],
    handler: ({ args }) => noArgs(args, 'sudo reveal') ?? { blocks: [heading('Signal found'), text('The hidden layer is under construction. Return in Sprint 4.')] } },
]
