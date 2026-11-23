import { createContext, useContext, type Dispatch } from 'react'
import type { DayKey } from '../lib/dates'
import type { ProgressAction, ProgressState } from './progressStore'

export type ProgressContextValue = {
  state: ProgressState
  dispatch: Dispatch<ProgressAction>
  today: DayKey
}

export const ProgressContext = createContext<ProgressContextValue | null>(null)

export function useProgress(): ProgressContextValue {
  const value = useContext(ProgressContext)
  if (!value) {
    throw new Error('useProgress must be used inside <ProgressProvider>')
  }
  return value
}
