import { Command, Search, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { useTerminal } from '../../hooks/useTerminal'
import { executeCommand } from './TerminalEngine'
import { isPaletteShortcut, nextPaletteIndex, searchPalette, type PaletteItem } from './paletteSearch'

type TerminalState = ReturnType<typeof useTerminal>

function Highlight({ text, query }: { text: string; query: string }) {
  const index = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1
  if (index < 0) return <>{text}</>
  return <>{text.slice(0, index)}<mark>{text.slice(index, index + query.length)}</mark>{text.slice(index + query.length)}</>
}

export function GlobalCommandPalette({ terminal }: { terminal: TerminalState }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const [recent, setRecent] = useState<string[]>([])
  const input = useRef<HTMLInputElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const results = searchPalette(query, recent)

  const show = useCallback(() => {
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setQuery('')
    setSelected(0)
    setOpen(true)
  }, [])
  const close = useCallback(() => {
    setOpen(false)
    previousFocus.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (isPaletteShortcut(event)) {
        event.preventDefault()
        if (open) close()
        else show()
      } else if (open && event.key === 'Escape') {
        event.preventDefault()
        close()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, show, close])

  useEffect(() => {
    if (open) input.current?.focus()
  }, [open])

  const activate = (item: PaletteItem) => {
    setRecent(current => [item.id, ...current.filter(id => id !== item.id)].slice(0, 5))
    close()
    if (item.command) {
      terminal.execute(item.command)
      if (!executeCommand(item.command).navigateTo) document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' })
    } else if (item.href) {
      window.location.hash = item.href
      document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return <>
    <button type="button" className="palette-launcher" onClick={show} aria-label="Open command palette" aria-keyshortcuts="Control+K Meta+K"><Search size={17} aria-hidden="true" /><span>Search</span><kbd>⌘ K</kbd></button>
    {open && <div className="palette-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) close() }}>
      <div className="palette-dialog" role="dialog" aria-modal="true" aria-label="BUILD.OS command palette" onKeyDown={event => {
        if (event.key !== 'Tab') return
        const focusables = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('input, button:not([disabled])'))
        const first = focusables[0]
        const last = focusables.at(-1)
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }}>
        <div className="palette-search-row"><Command size={19} aria-hidden="true" /><input ref={input} value={query} onChange={event => { setQuery(event.target.value); setSelected(0) }} onKeyDown={event => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setSelected(index => nextPaletteIndex(index, results.length, event.key === 'ArrowDown' ? 1 : -1)) }
          if (event.key === 'Enter' && results[selected]) { event.preventDefault(); activate(results[selected]) }
        }} role="combobox" aria-expanded="true" aria-controls="palette-results" aria-activedescendant={results[selected]?.id} aria-autocomplete="list" placeholder="Search commands and sections…" />
          <button type="button" onClick={close} aria-label="Close command palette"><X size={18} aria-hidden="true" /></button></div>
        <div className="palette-results" id="palette-results" role="listbox" aria-label="Search results">
          {results.length ? results.map((item, index) => <button type="button" role="option" aria-selected={index === selected} id={item.id} className={index === selected ? 'is-selected' : ''} key={item.id} onMouseMove={() => setSelected(index)} onClick={() => activate(item)}>
            <span className="palette-item-main"><Highlight text={item.label} query={query} /><small>{item.detail}</small></span><span className="palette-item-category">{item.category}</span>
          </button>) : <p className="palette-empty">No match. Try help, skills, missions or contact.</p>}
        </div>
        <div className="palette-footer"><span>↑↓ Navigate</span><span>↵ Select</span><span>ESC Close</span></div>
      </div>
    </div>}
  </>
}
