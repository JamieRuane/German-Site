/** A calendar day in the learner's local time zone, formatted YYYY-MM-DD. */
export type DayKey = string

export function toDayKey(date: Date): DayKey {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function todayKey(): DayKey {
  return toDayKey(new Date())
}

/** Adds whole days to a day key. Uses UTC arithmetic so DST never shifts the result. */
export function addDays(day: DayKey, amount: number): DayKey {
  const [year, month, date] = day.split('-').map(Number)
  const next = new Date(Date.UTC(year, month - 1, date + amount))
  return next.toISOString().slice(0, 10)
}

/** The last `count` days ending with (and including) `end`, oldest first. */
export function lastDays(end: DayKey, count: number): DayKey[] {
  return Array.from({ length: count }, (_, index) =>
    addDays(end, index - count + 1),
  )
}

export function weekdayShort(day: DayKey): string {
  const [year, month, date] = day.split('-').map(Number)
  return new Date(year, month - 1, date).toLocaleDateString('en-GB', {
    weekday: 'short',
  })
}

/** Days studied in a row, counting back from today (or yesterday if today is still empty). */
export function computeStreak(
  activeDays: Set<DayKey>,
  today: DayKey,
): number {
  let cursor = activeDays.has(today) ? today : addDays(today, -1)
  let streak = 0
  while (activeDays.has(cursor)) {
    streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}

export function formatMinutes(total: number): string {
  const hours = Math.floor(total / 60)
  const minutes = total % 60
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
}

export function formatLongDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
