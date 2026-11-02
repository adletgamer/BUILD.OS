import { describe, expect, it } from 'vitest'
import { addHistory, completeCommand, executeCommand, historyAt, parseCommand, suggestCommands } from './TerminalEngine'
import { commandRegistry } from './commandRegistry'

describe('terminal command registry', () => {
  it.each(commandRegistry.map(command => [command.name, command]))('runs %s through the allowlist', (_name, command) => {
    const input = command.name === 'mission' ? 'mission example' : command.name
    const result = executeCommand(input)
    expect(result.blocks.some(block => block.type === 'text' && block.text.startsWith('Unknown command'))).toBe(false)
  })
  it('parses arguments and compound commands', () => {
    expect(parseCommand('  mission   example-project  ')).toEqual({ name: 'mission', args: ['example-project'] })
    expect(parseCommand('sudo reveal')).toEqual({ name: 'sudo reveal', args: [] })
    const first = executeCommand('mission').blocks[0]
    expect(first?.type).toBe('text')
    if (first?.type === 'text') expect(first.text).toContain('Usage')
  })
  it('supports aliases and rejects arbitrary input', () => {
    expect(executeCommand('about')).toEqual(executeCommand('whoami'))
    expect(executeCommand('cls').clear).toBe(true)
    const invalid = executeCommand('window.alert(1)').blocks[0]
    expect(invalid?.type).toBe('text')
    if (invalid?.type === 'text') expect(invalid.text).toContain('Unknown command')
  })
  it('returns real section actions and a verified external link', () => {
    expect(executeCommand('projects').navigateTo).toBe('#missions')
    expect(executeCommand('contact').navigateTo).toBe('#contact')
    expect(executeCommand('github').blocks).toContainEqual({ type: 'link', label: 'GitHub · adletgamer/BUILD.OS', href: 'https://github.com/adletgamer/BUILD.OS' })
  })
  it('validates extra arguments', () => {
    const invalid = executeCommand('contact extra').blocks[0]
    expect(invalid?.type).toBe('text')
    if (invalid?.type === 'text') expect(invalid.text).toContain('Unexpected arguments')
  })
})

describe('terminal history and suggestions', () => {
  it('moves through history and returns to the draft position', () => {
    const history = addHistory(addHistory([], 'help'), 'projects')
    expect(historyAt(history, history.length, -1)).toEqual({ cursor: 1, value: 'projects' })
    expect(historyAt(history, 1, -1)).toEqual({ cursor: 0, value: 'help' })
    expect(historyAt(history, 1, 1)).toEqual({ cursor: 2, value: '' })
  })
  it('completes commands and searches aliases or topic keywords', () => {
    expect(completeCommand('proj')).toBe('projects')
    expect(completeCommand('sudo r')).toBe('sudo reveal')
    expect(suggestCommands('cybersecurity').map(command => command.name)).toContain('skills')
    expect(suggestCommands('linkedin').map(command => command.name)).toContain('github')
  })
})
