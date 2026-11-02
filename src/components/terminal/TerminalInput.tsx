import { useRef } from 'react'

export function TerminalInput({ value, onChange, onSubmit, onHistory, onComplete }: {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onHistory: (direction: -1 | 1) => void
  onComplete: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  return <form className="terminal-input-row" onSubmit={event => { event.preventDefault(); onSubmit() }} onClick={() => inputRef.current?.focus()}>
    <label htmlFor="terminal-command-input" className="terminal-prompt">build.os <span>›</span></label>
    <input ref={inputRef} id="terminal-command-input" value={value} onChange={event => onChange(event.target.value)}
      onKeyDown={event => {
        if (event.key === 'ArrowUp') { event.preventDefault(); onHistory(-1) }
        if (event.key === 'ArrowDown') { event.preventDefault(); onHistory(1) }
        if (event.key === 'Tab') { event.preventDefault(); onComplete() }
      }}
      autoComplete="off" autoCapitalize="off" spellCheck={false}
      aria-describedby="terminal-input-hint" placeholder="Type a command…" />
    <button type="submit" aria-label="Run command">RUN ↵</button>
    <span className="sr-only" id="terminal-input-hint">Press Enter to run, Tab to complete, and arrow keys to browse history.</span>
  </form>
}
