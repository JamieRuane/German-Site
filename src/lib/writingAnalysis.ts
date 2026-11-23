import type { WritingKind } from '../data/writing'

export type CheckStatus = 'good' | 'tip'

export type WritingCheck = {
  id: string
  label: string
  status: CheckStatus
  detail: string
}

export type WritingAnalysis = {
  words: number
  sentences: number
  paragraphs: number
  connectors: string[]
  redemittel: string[]
  checks: WritingCheck[]
}

type PromptShape = {
  kind: WritingKind
  minWords: number
  maxWords: number
}

/** Connectors beyond B1 basics (und, aber, weil, dass …) that examiners reward at C1. */
const SINGLE_WORD_CONNECTORS = [
  'allerdings',
  'andererseits',
  'außerdem',
  'dadurch',
  'daher',
  'dagegen',
  'demnach',
  'dennoch',
  'deshalb',
  'desto',
  'einerseits',
  'falls',
  'ferner',
  'folglich',
  'hingegen',
  'indem',
  'infolgedessen',
  'insbesondere',
  'jedoch',
  'letztlich',
  'nichtsdestotrotz',
  'obgleich',
  'obwohl',
  'schließlich',
  'sodass',
  'sofern',
  'somit',
  'sowohl',
  'trotzdem',
  'umso',
  'während',
  'weder',
  'weshalb',
  'wodurch',
  'wohingegen',
  'zudem',
  'zwar',
]

const PHRASE_CONNECTORS = [
  'aus diesem grund',
  'darüber hinaus',
  'im gegensatz dazu',
  'nicht nur',
  'vor allem',
  'zum einen',
  'zum anderen',
]

const REDEMITTEL: [label: string, pattern: RegExp][] = [
  ['meines Erachtens', /meines erachtens/],
  ['meiner Meinung/Ansicht nach', /meiner (meinung|ansicht|auffassung) nach/],
  ['es lässt sich nicht leugnen', /lässt sich nicht (leugnen|bestreiten)/],
  ['dem ist entgegenzuhalten', /entgegenzuhalten/],
  ['… spricht (vor allem), dass', /spricht[^.]{0,30}dass/],
  ['ein weiteres Argument', /ein weiteres argument/],
  ['Kritiker wenden ein', /wenden[^.]{0,30}ein/],
  ['außer Acht lassen', /außer acht/],
  ['ausschlaggebend', /ausschlaggebend/],
  ['von entscheidender Bedeutung', /von (entscheidender|großer|zentraler) bedeutung/],
  ['auf der Hand liegen', /auf der hand/],
  ['beispielsweise / zum Beispiel', /beispielsweise|zum beispiel|ein gutes beispiel/],
  ['im Folgenden', /im folgenden/],
  ['die Vorteile überwiegen', /überwiegen/],
  ['zusammenfassend', /zusammenfassend/],
  ['abschließend', /abschließend/],
  ['in Betracht ziehen', /in betracht/],
  ['zur Folge haben', /zur folge/],
  ['Bezug nehmen auf', /bezug (auf|nehm)|nehme[^.]{0,20}bezug/],
  ['zur Verfügung stehen', /zur verfügung/],
]

const INFORMAL_PRONOUNS = new Set([
  'du',
  'dich',
  'dir',
  'dein',
  'deine',
  'deinen',
  'deinem',
  'deiner',
  'euch',
  'euer',
  'eure',
])

function tokens(text: string): string[] {
  return text.toLowerCase().match(/[a-zäöüß]+/g) ?? []
}

function countWords(text: string): number {
  return text.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => countWords(sentence) > 0)
}

export function analyzeWriting(
  text: string,
  prompt: PromptShape,
): WritingAnalysis {
  const lower = text.toLowerCase().replace(/\s+/g, ' ')
  const words = countWords(text)
  const sentenceList = splitSentences(text)
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((paragraph) => countWords(paragraph) > 0).length
  const wordTokens = tokens(text)
  const tokenSet = new Set(wordTokens)

  const connectors = [
    ...SINGLE_WORD_CONNECTORS.filter((word) => tokenSet.has(word)),
    ...PHRASE_CONNECTORS.filter((phrase) => lower.includes(phrase)),
  ]
  const redemittel = REDEMITTEL.filter(([, pattern]) => pattern.test(lower)).map(
    ([label]) => label,
  )

  const checks: WritingCheck[] = []

  // Length
  if (words < prompt.minWords) {
    checks.push({
      id: 'length',
      label: 'Length',
      status: 'tip',
      detail: `${words} words — about ${prompt.minWords - words} more to reach the ${prompt.minWords}–${prompt.maxWords} target.`,
    })
  } else if (words > prompt.maxWords) {
    checks.push({
      id: 'length',
      label: 'Length',
      status: 'tip',
      detail: `${words} words — ${words - prompt.maxWords} over the target. Tighten it: precision is a C1 skill too.`,
    })
  } else {
    checks.push({
      id: 'length',
      label: 'Length',
      status: 'good',
      detail: `${words} words — within the ${prompt.minWords}–${prompt.maxWords} target.`,
    })
  }

  // Structure
  checks.push(
    paragraphs >= 3
      ? {
          id: 'structure',
          label: 'Structure',
          status: 'good',
          detail: `${paragraphs} paragraphs — the text has a clear shape.`,
        }
      : {
          id: 'structure',
          label: 'Structure',
          status: 'tip',
          detail:
            'Use at least three paragraphs (introduction, main part, conclusion). Leave an empty line between them.',
        },
  )

  // Connectors
  const connectorTarget = prompt.kind === 'essay' ? 5 : 3
  checks.push(
    connectors.length >= connectorTarget
      ? {
          id: 'connectors',
          label: 'Cohesion',
          status: 'good',
          detail: `${connectors.length} different C1 connectors: ${connectors.join(', ')}.`,
        }
      : {
          id: 'connectors',
          label: 'Cohesion',
          status: 'tip',
          detail: `${connectors.length} of ${connectorTarget} C1 connectors. Link ideas with e.g. „zudem“, „dennoch“, „folglich“, „darüber hinaus“, „zwar … aber“.`,
        },
  )

  // Redemittel
  if (prompt.kind !== 'formal-email') {
    checks.push(
      redemittel.length >= 3
        ? {
            id: 'redemittel',
            label: 'Argument phrases',
            status: 'good',
            detail: `Found: ${redemittel.join(' · ')}.`,
          }
        : {
            id: 'redemittel',
            label: 'Argument phrases',
            status: 'tip',
            detail: `${redemittel.length} found. Use at least three Redemittel from the panel to signal opinion, counter-argument and conclusion.`,
          },
    )
  }

  // Sentence length
  if (sentenceList.length >= 3) {
    const average = words / sentenceList.length
    if (average < 9) {
      checks.push({
        id: 'sentences',
        label: 'Sentence complexity',
        status: 'tip',
        detail: `Sentences average ${average.toFixed(0)} words. Combine ideas with relative clauses, participles or subordinate clauses.`,
      })
    } else if (average > 28) {
      checks.push({
        id: 'sentences',
        label: 'Sentence complexity',
        status: 'tip',
        detail: `Sentences average ${average.toFixed(0)} words. Split very long sentences so the reader can follow.`,
      })
    } else {
      checks.push({
        id: 'sentences',
        label: 'Sentence complexity',
        status: 'good',
        detail: `Sentences average ${average.toFixed(0)} words — a good balance.`,
      })
    }

    const openers = new Map<string, number>()
    for (const sentence of sentenceList) {
      const first = tokens(sentence)[0]
      if (first) openers.set(first, (openers.get(first) ?? 0) + 1)
    }
    const [topOpener, topCount] = [...openers.entries()].sort(
      (a, b) => b[1] - a[1],
    )[0] ?? ['', 0]
    const share = topCount / sentenceList.length
    checks.push(
      share > 0.4 && topCount >= 3
        ? {
            id: 'variety',
            label: 'Word order variety',
            status: 'tip',
            detail: `${topCount} of ${sentenceList.length} sentences start with „${topOpener}“. Start with an adverb, object or subordinate clause instead (inversion!).`,
          }
        : {
            id: 'variety',
            label: 'Word order variety',
            status: 'good',
            detail: 'Your sentence openings are varied.',
          },
    )
  }

  // Register
  if (prompt.kind === 'formal-email') {
    const hasGreeting = /sehr geehrte/.test(lower)
    const hasClosing = /mit freundlichen grüßen|mit freundlichem gruß|freundliche grüße/.test(
      lower,
    )
    checks.push({
      id: 'greeting',
      label: 'Formal greeting & closing',
      status: hasGreeting && hasClosing ? 'good' : 'tip',
      detail:
        hasGreeting && hasClosing
          ? 'Opens with „Sehr geehrte …“ and closes formally.'
          : 'Open with „Sehr geehrte Damen und Herren,“ and close with „Mit freundlichen Grüßen“.',
    })
    const informal = wordTokens.filter((word) => INFORMAL_PRONOUNS.has(word))
    checks.push({
      id: 'sie-form',
      label: 'Sie-Form',
      status: informal.length === 0 ? 'good' : 'tip',
      detail:
        informal.length === 0
          ? 'Consistently formal — no du/ihr forms.'
          : `Informal forms found (${[...new Set(informal)].join(', ')}). Use Sie / Ihnen / Ihr in a formal email.`,
    })
  } else if (prompt.kind === 'essay' && words >= 40) {
    const nominal = wordTokens.filter((word) =>
      /(ung|heit|keit|tion|tät)(en)?$/.test(word),
    ).length
    const density = (nominal / words) * 100
    checks.push(
      density >= 3
        ? {
            id: 'register',
            label: 'Formal register',
            status: 'good',
            detail: `${nominal} abstract nouns (-ung, -heit, -keit …) — a suitably formal style.`,
          }
        : {
            id: 'register',
            label: 'Formal register',
            status: 'tip',
            detail:
              'Few abstract nouns. Try Nominalstil: „weil die Mieten steigen“ → „aufgrund steigender Mieten“.',
          },
    )
  }

  return {
    words,
    sentences: sentenceList.length,
    paragraphs,
    connectors,
    redemittel,
    checks,
  }
}
