export type AnswerResult = 'correct' | 'close' | 'wrong'

export type AnswerCheck = {
  result: AnswerResult
  note?: string
}

function tidy(value: string): string {
  return value
    .trim()
    .replace(/[.,;:!?„“"'()]/g, '')
    .replace(/\s+/g, ' ')
}

/** Folds case and German special letters so „Nägeln“ matches "naegeln". */
export function foldGerman(value: string): string {
  return tidy(value)
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
}

/** Edit distance that also counts swapping two neighbouring letters as one typo. */
export function editDistance(a: string, b: string): number {
  const rows = a.length + 1
  const cols = b.length + 1
  const d: number[][] = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  )
  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1)
      }
    }
  }
  return d[a.length][b.length]
}

/**
 * Compares a typed answer against the accepted answers.
 * - Exact matches (ignoring punctuation and spacing) are correct.
 * - Umlaut transcriptions (ae, oe, ue, ss) are accepted as correct.
 * - A capitalisation slip or a single typo in a longer word is "close".
 */
export function checkAnswer(input: string, answers: string[]): AnswerCheck {
  const typed = tidy(input)
  if (!typed) return { result: 'wrong' }

  for (const answer of answers) {
    if (typed === tidy(answer)) return { result: 'correct' }
  }

  for (const answer of answers) {
    const sameLetters = foldGerman(typed) === foldGerman(answer)
    if (!sameLetters) continue
    const caseOnly = typed.toLowerCase() === tidy(answer).toLowerCase()
    if (caseOnly) {
      return {
        result: 'close',
        note: 'Almost — check the capitalisation. German nouns start with a capital letter.',
      }
    }
    return {
      result: 'correct',
      note: 'Accepted. Try typing the umlaut or ß next time.',
    }
  }

  const folded = foldGerman(typed)
  for (const answer of answers) {
    const target = foldGerman(answer)
    if (target.length >= 5 && editDistance(folded, target) === 1) {
      return { result: 'close', note: 'Almost — there is a small spelling slip.' }
    }
  }

  return { result: 'wrong' }
}
