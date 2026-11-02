import { commandRegistry } from './commandRegistry'
import type { CommandDefinition, CommandResult, ParsedCommand } from './terminalTypes'

const byName = new Map<string, CommandDefinition>()
for (const command of commandRegistry) {
  byName.set(command.name, command)
  for (const alias of command.aliases ?? []) byName.set(alias, command)
}

export function parseCommand(raw: string): ParsedCommand {
  const words = raw.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean)
  const name = words[0]?.toLowerCase() ?? ''
  if (name === 'sudo') return { name: words.slice(0, 2).join(' ').toLowerCase(), args: words.slice(2) }
  return { name, args: words.slice(1) }
}

export function executeCommand(raw: string): CommandResult {
  const parsed = parseCommand(raw)
  if (!parsed.name) return { blocks: [] }
  const command = byName.get(parsed.name)
  if (!command) return { blocks: [{ type: 'text', text: `Unknown command: ${parsed.name}. Type help to see valid commands.` }] }
  return command.handler({ args: parsed.args, raw })
}

export function completeCommand(raw: string): string {
  const query = raw.trimStart().toLowerCase()
  if (!query || query.includes(' ') && !'sudo reveal'.startsWith(query)) return raw
  const match = commandRegistry.find(command =>
    command.name.startsWith(query) || command.aliases?.some(alias => alias.startsWith(query)),
  )
  return match?.name ?? raw
}

export function suggestCommands(query: string, limit = 5): readonly CommandDefinition[] {
  const value = query.trim().toLowerCase()
  if (!value) return commandRegistry.slice(0, limit)
  return commandRegistry.filter(command =>
    [command.name, command.summary, command.category, ...(command.aliases ?? []), ...(command.keywords ?? [])]
      .some(term => term.toLowerCase().includes(value)),
  ).slice(0, limit)
}

export function historyAt(history: readonly string[], cursor: number, direction: -1 | 1) {
  const next = Math.max(0, Math.min(history.length, cursor + direction))
  return { cursor: next, value: history[next] ?? '' }
}

export function addHistory(history: readonly string[], value: string): string[] {
  const trimmed = value.trim()
  if (!trimmed) return [...history]
  return [...history, trimmed].slice(-50)
}
