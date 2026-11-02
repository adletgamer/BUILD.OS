import { TerminalInput } from './TerminalInput'
import { TerminalOutput } from './TerminalOutput'
import { TerminalSuggestions } from './TerminalSuggestions'
import type { useTerminal } from '../../hooks/useTerminal'

type TerminalState = ReturnType<typeof useTerminal>

export function Terminal({ terminal }: { terminal: TerminalState }) {
  return <div className="terminal-frame" aria-label="Interactive BUILD.OS terminal">
    <div className="terminal-toolbar"><span className="terminal-status" aria-hidden="true" /> <span>BUILD.OS / INTERACTIVE TERMINAL</span><span className="terminal-toolbar-end">SAFE MODE</span></div>
    <TerminalOutput entries={terminal.entries} />
    <TerminalInput value={terminal.input} onChange={terminal.changeInput} onSubmit={() => terminal.execute(terminal.input)} onHistory={terminal.browseHistory} onComplete={terminal.complete} />
    <TerminalSuggestions suggestions={terminal.suggestions} onSelect={terminal.execute} />
  </div>
}
