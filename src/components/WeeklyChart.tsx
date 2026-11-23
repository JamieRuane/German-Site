import type { CSSProperties } from 'react'
import { formatMinutes, lastDays, weekdayShort } from '../lib/dates'
import { useProgress } from '../state/ProgressContext'
import { minutesOn } from '../state/progressStore'

export function WeeklyChart({ large = false }: { large?: boolean }) {
  const { state, today } = useProgress()
  const week = lastDays(today, 7).map((day) => ({
    day,
    label: weekdayShort(day),
    minutes: minutesOn(state, day),
  }))
  const max = Math.max(state.dailyGoalMinutes, ...week.map((d) => d.minutes))
  const total = week.reduce((sum, d) => sum + d.minutes, 0)
  const description = `Study minutes over the last 7 days: ${week
    .map(({ label, minutes }) => `${label} ${minutes}`)
    .join(', ')}. Total: ${formatMinutes(total)}.`

  return (
    <div
      className={`activity-chart${large ? ' is-large' : ''}`}
      role="img"
      aria-label={description}
    >
      {week.map(({ day, label, minutes }) => (
        <div
          className={`chart-column${day === today ? ' is-today' : ''}`}
          key={day}
        >
          {large && <span className="chart-value">{minutes}</span>}
          <span
            className="chart-bar"
            style={
              { '--bar-height': `${(minutes / max) * 100}%` } as CSSProperties
            }
          />
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
