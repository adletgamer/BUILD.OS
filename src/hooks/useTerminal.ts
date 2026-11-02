import { useCallback, useRef, useState } from 'react'
import { addHistory, completeCommand, executeCommand, historyAt, suggestCommands } from '../components/terminal/TerminalEngine'
import type { TerminalEntry } from '../components/terminal/terminalTypes'

export function useTerminal() {
  const [entries, setEntries] = useState<TerminalEntry[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(0)
  const [input, setInput] = useState('')
  const nextId = useRef(0)

  const execute = useCallback((raw: string) => {
    if (!raw.trim()) return
    const result = executeCommand(raw)
    setHistory(current => {
      const next = addHistory(current, raw)
      setCursor(next.length)
      return next
    })
    nextId.current += 1
    const id = nextId.current
    setEntries(current => result.clear ? [] : [...current, { id, input: raw.trim(), result }])
    setInput('')
    if (result.navigateTo) {
      window.location.hash = result.navigateTo
      document.getElementById(result.navigateTo.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const browseHistory = (direction: -1 | 1) => {
    const next = historyAt(history, cursor, direction)
    setCursor(next.cursor)
    setInput(next.value)
  }
  const complete = () => setInput(current => completeCommand(current))
  const changeInput = (value: string) => {
    setInput(value)
    setCursor(history.length)
  }

  return { entries, history, input, execute, browseHistory, complete, changeInput, suggestions: suggestCommands(input) }
}
