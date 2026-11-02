export type OutputBlock =
  | { type: 'text'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: readonly string[] }
  | { type: 'link'; label: string; href: string }

export interface CommandResult {
  blocks: readonly OutputBlock[]
  navigateTo?: string
  clear?: boolean
}

export interface CommandContext {
  args: readonly string[]
  raw: string
}

export interface CommandDefinition {
  name: string
  aliases?: readonly string[]
  summary: string
  usage: string
  category: 'Explore' | 'Navigate' | 'System'
  keywords?: readonly string[]
  handler: (context: CommandContext) => CommandResult
}

export interface ParsedCommand {
  name: string
  args: string[]
}

export interface TerminalEntry {
  id: number
  input: string
  result: CommandResult
}
