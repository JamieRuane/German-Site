import { coreDeckIds, vocabById } from '../data/deck'
import { grammarTopics } from '../data/grammar'
import { computeStreak, type DayKey } from '../lib/dates'
import {
  LEARNED_BOX,
  MASTERED_BOX,
  isDue,
  schedule,
  type CardState,
  type Rating,
} from '../lib/srs'

export type DayLog = {
  seconds: number
  reviews: number
  exercises: number
}

export type GrammarRecord = {
  best: number
  lastScore: number
  total: number
  attempts: number
  lastPracticed?: DayKey
}

export type ReadingRecord = {
  score: number
  total: number
  completedOn: DayKey
}

export type WritingRecord = {
  draft: string
  words: number
  submissions: number
  lastSubmitted?: DayKey
}

export type ProgressState = {
  version: 1
  dailyGoalMinutes: number
  newCardsPerDay: number
  cards: Record<string, CardState>
  /** Reading glossary cards the learner chose to add to their deck. */
  addedCards: string[]
  log: Record<DayKey, DayLog>
  grammar: Record<string, GrammarRecord>
  readings: Record<string, ReadingRecord>
  writing: Record<string, WritingRecord>
}

export type ProgressAction =
  | { type: 'reviewCard'; id: string; rating: Rating; today: DayKey }
  | { type: 'addCard'; id: string }
  | { type: 'addSeconds'; seconds: number; today: DayKey }
  | { type: 'finishGrammar'; topicId: string; score: number; total: number; today: DayKey }
  | { type: 'finishReading'; readingId: string; score: number; total: number; today: DayKey }
  | { type: 'saveDraft'; promptId: string; draft: string; words: number }
  | { type: 'submitWriting'; promptId: string; draft: string; words: number; today: DayKey }
  | { type: 'setDailyGoal'; minutes: number }
  | { type: 'setNewCardsPerDay'; count: number }
  | { type: 'reset' }

export const STORAGE_KEY = 'wortwise-progress-v1'

export function createInitialState(): ProgressState {
  return {
    version: 1,
    dailyGoalMinutes: 30,
    newCardsPerDay: 8,
    cards: {},
    addedCards: [],
    log: {},
    grammar: {},
    readings: {},
    writing: {},
  }
}

export function loadProgress(): ProgressState {
  const initial = createInitialState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return initial
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    if (parsed.version !== 1) return initial
    return { ...initial, ...parsed }
  } catch {
    return initial
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage can be unavailable (private mode, quota). Progress then lasts for the session only.
  }
}

function bumpLog(
  state: ProgressState,
  today: DayKey,
  change: Partial<DayLog>,
): Record<DayKey, DayLog> {
  const current = state.log[today] ?? { seconds: 0, reviews: 0, exercises: 0 }
  return {
    ...state.log,
    [today]: {
      seconds: current.seconds + (change.seconds ?? 0),
      reviews: current.reviews + (change.reviews ?? 0),
      exercises: current.exercises + (change.exercises ?? 0),
    },
  }
}

export function progressReducer(
  state: ProgressState,
  action: ProgressAction,
): ProgressState {
  switch (action.type) {
    case 'reviewCard':
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.id]: schedule(state.cards[action.id], action.rating, action.today),
        },
        log: bumpLog(state, action.today, { reviews: 1 }),
      }
    case 'addCard':
      if (state.addedCards.includes(action.id) || !vocabById[action.id]) {
        return state
      }
      return { ...state, addedCards: [...state.addedCards, action.id] }
    case 'addSeconds':
      return {
        ...state,
        log: bumpLog(state, action.today, { seconds: action.seconds }),
      }
    case 'finishGrammar': {
      const previous = state.grammar[action.topicId]
      return {
        ...state,
        grammar: {
          ...state.grammar,
          [action.topicId]: {
            best: Math.max(previous?.best ?? 0, action.score),
            lastScore: action.score,
            total: action.total,
            attempts: (previous?.attempts ?? 0) + 1,
            lastPracticed: action.today,
          },
        },
        log: bumpLog(state, action.today, { exercises: 1 }),
      }
    }
    case 'finishReading': {
      const previous = state.readings[action.readingId]
      return {
        ...state,
        readings: {
          ...state.readings,
          [action.readingId]: {
            score: Math.max(previous?.score ?? 0, action.score),
            total: action.total,
            completedOn: action.today,
          },
        },
        log: bumpLog(state, action.today, { exercises: 1 }),
      }
    }
    case 'saveDraft': {
      const previous = state.writing[action.promptId]
      return {
        ...state,
        writing: {
          ...state.writing,
          [action.promptId]: {
            submissions: previous?.submissions ?? 0,
            lastSubmitted: previous?.lastSubmitted,
            draft: action.draft,
            words: action.words,
          },
        },
      }
    }
    case 'submitWriting': {
      const previous = state.writing[action.promptId]
      return {
        ...state,
        writing: {
          ...state.writing,
          [action.promptId]: {
            draft: action.draft,
            words: action.words,
            submissions: (previous?.submissions ?? 0) + 1,
            lastSubmitted: action.today,
          },
        },
        log: bumpLog(state, action.today, { exercises: 1 }),
      }
    }
    case 'setDailyGoal':
      return { ...state, dailyGoalMinutes: action.minutes }
    case 'setNewCardsPerDay':
      return { ...state, newCardsPerDay: action.count }
    case 'reset':
      return createInitialState()
  }
}

// ---------- Selectors ----------

export function deckIds(state: ProgressState): string[] {
  return [...coreDeckIds, ...state.addedCards]
}

export function dueCount(state: ProgressState, today: DayKey): number {
  return deckIds(state).filter(
    (id) => state.cards[id] && isDue(state.cards[id], today),
  ).length
}

export function newIntroducedToday(state: ProgressState, today: DayKey): number {
  return Object.values(state.cards).filter((card) => card.firstSeen === today)
    .length
}

export function newAllowance(state: ProgressState, today: DayKey): number {
  const unseen = deckIds(state).filter((id) => !state.cards[id]).length
  return Math.min(
    unseen,
    Math.max(0, state.newCardsPerDay - newIntroducedToday(state, today)),
  )
}

export function learnedCount(state: ProgressState): number {
  return Object.values(state.cards).filter((card) => card.box >= LEARNED_BOX)
    .length
}

export function masteredCount(state: ProgressState): number {
  return Object.values(state.cards).filter((card) => card.box >= MASTERED_BOX)
    .length
}

export function minutesOn(state: ProgressState, day: DayKey): number {
  return Math.floor((state.log[day]?.seconds ?? 0) / 60)
}

export function isActiveDay(log: DayLog | undefined): boolean {
  if (!log) return false
  return log.seconds >= 60 || log.reviews > 0 || log.exercises > 0
}

export function streak(state: ProgressState, today: DayKey): number {
  const active = new Set(
    Object.entries(state.log)
      .filter(([, log]) => isActiveDay(log))
      .map(([day]) => day),
  )
  return computeStreak(active, today)
}

/** 0–1 share of grammar exercises answered correctly at best, across all topics. */
export function grammarMastery(state: ProgressState): number {
  const total = grammarTopics.reduce(
    (sum, topic) => sum + topic.exercises.length,
    0,
  )
  const best = grammarTopics.reduce(
    (sum, topic) => sum + (state.grammar[topic.id]?.best ?? 0),
    0,
  )
  return total === 0 ? 0 : best / total
}
