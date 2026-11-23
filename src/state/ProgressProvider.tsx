import { useEffect, useMemo, useReducer, useState, type ReactNode } from 'react'
import { todayKey } from '../lib/dates'
import { ProgressContext } from './ProgressContext'
import { loadProgress, progressReducer, saveProgress } from './progressStore'

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(progressReducer, undefined, loadProgress)
  const [today, setToday] = useState(todayKey)

  useEffect(() => {
    saveProgress(state)
  }, [state])

  // Roll over to a new day if the app stays open past midnight.
  useEffect(() => {
    const id = window.setInterval(() => setToday(todayKey()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  const value = useMemo(() => ({ state, dispatch, today }), [state, today])
  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  )
}
