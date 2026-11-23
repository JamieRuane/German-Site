import { addDays, type DayKey } from './dates'

export type Rating = 'again' | 'hard' | 'good' | 'easy'

export type CardState = {
  /** Leitner box, 1–6. Higher boxes are reviewed less often. */
  box: number
  due: DayKey
  reps: number
  lapses: number
  firstSeen: DayKey
  lastReviewed: DayKey
}

/** Days until the next review for each box (index = box). */
export const BOX_INTERVALS = [0, 1, 3, 7, 16, 35, 75]
export const MAX_BOX = BOX_INTERVALS.length - 1
/** A card counts as "learned" once it survives a week without review. */
export const LEARNED_BOX = 3
export const MASTERED_BOX = 5

function nextBox(box: number, rating: Rating): number {
  switch (rating) {
    case 'again':
      return 1
    case 'hard':
      return Math.max(1, box)
    case 'good':
      return Math.min(MAX_BOX, box + 1)
    case 'easy':
      return Math.min(MAX_BOX, box + 2)
  }
}

/** Days until the card is shown again after the given rating. */
export function intervalFor(
  previous: CardState | undefined,
  rating: Rating,
): number {
  const box = previous?.box ?? 0
  if (rating === 'again') return 0
  if (rating === 'hard') {
    return Math.max(1, Math.round(BOX_INTERVALS[Math.max(1, box)] / 2))
  }
  return BOX_INTERVALS[nextBox(box, rating)]
}

export function schedule(
  previous: CardState | undefined,
  rating: Rating,
  today: DayKey,
): CardState {
  const box = nextBox(previous?.box ?? 0, rating)
  return {
    box,
    due: addDays(today, intervalFor(previous, rating)),
    reps: (previous?.reps ?? 0) + 1,
    lapses: (previous?.lapses ?? 0) + (rating === 'again' && previous ? 1 : 0),
    firstSeen: previous?.firstSeen ?? today,
    lastReviewed: today,
  }
}

export function isDue(card: CardState, today: DayKey): boolean {
  return card.due <= today
}

/**
 * Builds today's review queue: cards that are due (most overdue first), then
 * up to `newAllowance` cards that have never been studied.
 */
export function buildQueue(
  deck: string[],
  cards: Record<string, CardState>,
  today: DayKey,
  newAllowance: number,
): string[] {
  const due = deck
    .filter((id) => cards[id] && isDue(cards[id], today))
    .sort((a, b) => cards[a].due.localeCompare(cards[b].due))
  const fresh = deck
    .filter((id) => !cards[id])
    .slice(0, Math.max(0, newAllowance))
  return [...due, ...fresh]
}

export function formatInterval(days: number): string {
  if (days === 0) return 'again today'
  if (days === 1) return '1 day'
  if (days < 30) return `${days} days`
  const months = Math.round(days / 30)
  return months === 1 ? '1 month' : `${months} months`
}
