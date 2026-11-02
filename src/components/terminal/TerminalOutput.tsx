import type { CommandResult, TerminalEntry } from './terminalTypes'
import { useEffect, useRef } from 'react'

export function ResultBlocks({ result }: { result: CommandResult }) {
  return <div className="terminal-result">
    {result.blocks.map((block, index) => {
      const key = `${block.type}-${index}`
      if (block.type === 'heading') return <strong className="terminal-result-heading" key={key}>{block.text}</strong>
      if (block.type === 'list') return <ul key={key}>{block.items.map(item => <li key={item}>{item}</li>)}</ul>
      if (block.type === 'link') return <a key={key} href={block.href} target={block.href.startsWith('https://') ? '_blank' : undefined} rel={block.href.startsWith('https://') ? 'noopener noreferrer' : undefined}>{block.label} ↗</a>
      return <p key={key}>{block.text}</p>
    })}
  </div>
}

export function TerminalOutput({ entries }: { entries: readonly TerminalEntry[] }) {
  const output = useRef<HTMLDivElement>(null)
  useEffect(() => { output.current?.scrollTo({ top: output.current.scrollHeight }) }, [entries])
  return <div ref={output} className="terminal-output" role="log" aria-live="polite" aria-relevant="additions text">
    <p className="terminal-welcome">BUILD.OS TERMINAL / TYPE <span>HELP</span> TO EXPLORE</p>
    {entries.map(entry => <div className="terminal-entry" key={entry.id}>
      <div className="terminal-command"><span aria-hidden="true">›</span> {entry.input}</div>
      <ResultBlocks result={entry.result} />
    </div>)}
  </div>
}
