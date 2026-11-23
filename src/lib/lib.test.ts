import { describe, expect, it } from 'vitest'
import { coreVocabulary, GAP } from '../data/vocabulary'
import { readings, parseParagraph } from '../data/readings'
import { grammarTopics } from '../data/grammar'
import { writingPrompts } from '../data/writing'
import { checkAnswer } from './answers'
import { addDays, computeStreak, lastDays } from './dates'
import { buildQueue, schedule } from './srs'
import { analyzeWriting } from './writingAnalysis'

describe('dates', () => {
  it('adds days across month and year boundaries', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01')
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28')
    expect(lastDays('2026-11-23', 3)).toEqual([
      '2026-11-21',
      '2026-11-22',
      '2026-11-23',
    ])
  })

  it('counts a streak that is still alive from yesterday', () => {
    const days = new Set(['2026-11-20', '2026-11-21', '2026-11-22'])
    expect(computeStreak(days, '2026-11-23')).toBe(3)
    expect(computeStreak(days, '2026-11-24')).toBe(0)
  })
})

describe('spaced repetition', () => {
  const today = '2026-11-23'

  it('moves a card up the boxes and back to the start on a lapse', () => {
    const first = schedule(undefined, 'good', today)
    expect(first).toMatchObject({ box: 1, due: '2026-11-24', reps: 1, lapses: 0 })

    const second = schedule(first, 'good', '2026-11-24')
    expect(second).toMatchObject({ box: 2, due: '2026-11-27' })

    const lapse = schedule(second, 'again', '2026-11-27')
    expect(lapse).toMatchObject({ box: 1, due: '2026-11-27', lapses: 1 })
    expect(lapse.firstSeen).toBe(today)
  })

  it('queues due cards before a limited number of new ones', () => {
    const cards = {
      a: schedule(undefined, 'good', '2026-11-20'),
      b: schedule(undefined, 'easy', today),
    }
    const queue = buildQueue(['a', 'b', 'c', 'd', 'e'], cards, today, 2)
    expect(queue).toEqual(['a', 'c', 'd'])
  })
})

describe('answer checking', () => {
  it('accepts exact answers and umlaut transcriptions', () => {
    expect(checkAnswer(' ziehen ', ['ziehen']).result).toBe('correct')
    expect(checkAnswer('Naegeln', ['Nägeln']).result).toBe('correct')
  })

  it('flags capitalisation slips and small typos as close', () => {
    expect(checkAnswer('betracht', ['Betracht']).result).toBe('close')
    expect(checkAnswer('Anpsruch', ['Anspruch']).result).toBe('close')
    expect(checkAnswer('nehmen', ['Anspruch']).result).toBe('wrong')
    expect(checkAnswer('', ['Anspruch']).result).toBe('wrong')
  })
})

describe('writing self-check', () => {
  const essay = writingPrompts.find((prompt) => prompt.kind === 'essay')!
  const email = writingPrompts.find((prompt) => prompt.kind === 'formal-email')!

  it('rates the model essay well on every check', () => {
    const analysis = analyzeWriting(essay.modelAnswer, essay)
    expect(analysis.words).toBeGreaterThanOrEqual(essay.minWords)
    expect(analysis.words).toBeLessThanOrEqual(essay.maxWords)
    expect(analysis.checks.filter((check) => check.status === 'tip')).toEqual([])
  })

  it('gives useful tips for a short, informal email', () => {
    const analysis = analyzeWriting(
      'Hallo, ich finde deinen Kurs schlecht. Ich will Geld zurück. Ich bin sauer. Ich warte.',
      email,
    )
    const tips = Object.fromEntries(
      analysis.checks.map((check) => [check.id, check.status]),
    )
    expect(tips).toMatchObject({
      length: 'tip',
      structure: 'tip',
      greeting: 'tip',
      'sie-form': 'tip',
      variety: 'tip',
    })
  })
})

describe('learning content', () => {
  it('has exactly one gap per card and a matching answer', () => {
    const allCards = [
      ...coreVocabulary,
      ...readings.flatMap((reading) => reading.glossary),
    ]
    for (const card of allCards) {
      expect(card.sentence.split(GAP), card.id).toHaveLength(2)
      expect(card.answers.length, card.id).toBeGreaterThan(0)
    }
    expect(new Set(allCards.map((card) => card.id)).size).toBe(allCards.length)
  })

  it('only links glossed words to glossary entries that exist', () => {
    for (const reading of readings) {
      const ids = new Set(reading.glossary.map((item) => item.id))
      const used = reading.paragraphs
        .flatMap(parseParagraph)
        .flatMap((segment) => (segment.kind === 'gloss' ? [segment.glossId] : []))
      for (const id of used) expect(ids.has(id), id).toBe(true)
      for (const id of ids) expect(used, id).toContain(id)
    }
  })

  it('has valid answer indexes in every quiz', () => {
    const questions = [
      ...readings.flatMap((reading) => reading.questions),
      ...grammarTopics.flatMap((topic) => topic.exercises),
    ]
    for (const question of questions) {
      expect(question.options[question.answer], question.prompt).toBeDefined()
    }
  })
})
