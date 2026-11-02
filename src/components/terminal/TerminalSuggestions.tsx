import type { CommandDefinition } from './terminalTypes'

export function TerminalSuggestions({ suggestions, onSelect }: {
  suggestions: readonly CommandDefinition[]
  onSelect: (command: string) => void
}) {
  return <div className="terminal-suggestions" aria-label="Suggested commands">
    {suggestions.slice(0, 5).map(command =>
      <button type="button" key={command.name} onClick={() => onSelect(command.name)}>{command.name}</button>,
    )}
  </div>
}
