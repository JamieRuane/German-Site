import { useEffect, useRef, useState, type FormEvent, type RefObject } from 'react'
import { PageHeader } from '../components/PageHeader'
import { vocabById } from '../data/deck'
import { GAP, type VocabItem } from '../data/vocabulary'
import { checkAnswer, type AnswerCheck } from '../lib/answers'
import {
  buildQueue,
  formatInterval,
  intervalFor,
  LEARNED_BOX,
  MASTERED_BOX,
  type CardState,
  type Rating,
} from '../lib/srs'
import { useProgress } from '../state/ProgressContext'
import {
  deckIds,
  dueCount,
  learnedCount,
  masteredCount,
  newAllowance,
} from '../state/progressStore'

const ratings: { rating: Rating; label: string }[] = [
  { rating: 'again', label: 'Again' },
  { rating: 'hard', label: 'Hard' },
  { rating: 'good', label: 'Good' },
  { rating: 'easy', label: 'Easy' },
]

function suggestedRating(check: AnswerCheck | null, revealed: boolean): Rating {
  if (revealed || !check || check.result === 'wrong') return 'again'
  if (check.result === 'close') return 'hard'
  return 'good'
}

function statusLabel(card: CardState | undefined): string {
  if (!card) return 'New'
  if (card.box >= MASTERED_BOX) return 'Mastered'
  if (card.box >= LEARNED_BOX) return 'Learned'
  return 'Learning'
}

function GapSentence({
  item,
  value,
  onChange,
  disabled,
  inputRef,
}: {
  item: VocabItem
  value: string
  onChange: (value: string) => void
  disabled: boolean
  inputRef: RefObject<HTMLInputElement | null>
}) {
  const [before, after] = item.sentence.split(GAP)
  const width = Math.max(6, item.answers[0].length + 2)
  return (
    <p className="gap-sentence" lang="de">
      {before}
      <input
        ref={inputRef}
        className="gap-input"
        aria-label="Missing word"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        value={value}
        disabled={disabled}
        style={{ width: `${width}ch` }}
        onChange={(event) => onChange(event.target.value)}
      />
      {after}
    </p>
  )
}

function ReviewSession({
  initialQueue,
  onExit,
}: {
  initialQueue: string[]
  onExit: () => void
}) {
  const { state, dispatch, today } = useProgress()
  const [queue, setQueue] = useState(initialQueue)
  const [position, setPosition] = useState(0)
  const [typed, setTyped] = useState('')
  const [check, setCheck] = useState<AnswerCheck | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [results, setResults] = useState({ reviewed: 0, correct: 0 })
  const inputRef = useRef<HTMLInputElement>(null)
  const ratingRef = useRef<HTMLButtonElement>(null)

  const id = queue[position]
  const item = id ? vocabById[id] : undefined
  const isAnswered = check !== null || revealed

  useEffect(() => {
    if (!isAnswered) inputRef.current?.focus()
    else ratingRef.current?.focus()
  }, [isAnswered, position])

  if (!item) {
    return (
      <div className="panel session-summary" role="status">
        <div className="summary-mark" aria-hidden="true">
          ✓
        </div>
        <h2>Session complete</h2>
        <p>
          You reviewed {results.reviewed} card
          {results.reviewed === 1 ? '' : 's'} and recalled {results.correct}{' '}
          on the first try.
        </p>
        <button className="primary-button large-button" type="button" onClick={onExit}>
          Back to vocabulary
        </button>
      </div>
    )
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (isAnswered || !item) return
    if (!typed.trim()) {
      setRevealed(true)
      return
    }
    setCheck(checkAnswer(typed, item.answers))
  }

  function rate(rating: Rating) {
    if (!id) return
    dispatch({ type: 'reviewCard', id, rating, today })
    const firstTry = check?.result === 'correct' && !revealed
    setResults((current) => ({
      reviewed: current.reviewed + 1,
      correct: current.correct + (firstTry ? 1 : 0),
    }))
    if (rating === 'again') setQueue((current) => [...current, id])
    setPosition((value) => value + 1)
    setTyped('')
    setCheck(null)
    setRevealed(false)
  }

  const suggestion = suggestedRating(check, revealed)
  const fullSentence = item.sentence.split(GAP)
  const remaining = queue.length - position

  return (
    <div className="panel review-card">
      <div className="review-meta">
        <span className="category-chip">{item.category}</span>
        <span>{remaining} left</span>
      </div>
      <p className="review-meaning">
        <span className="review-label">Meaning</span>
        {item.meaning}
      </p>
      <form onSubmit={submit}>
        <GapSentence
          item={item}
          value={typed}
          onChange={setTyped}
          disabled={isAnswered}
          inputRef={inputRef}
        />
        {!isAnswered && (
          <div className="review-actions">
            <button className="primary-button large-button" type="submit">
              Check <span aria-hidden="true">↵</span>
            </button>
            <button
              className="ghost-button"
              type="button"
              onClick={() => setRevealed(true)}
            >
              Show answer
            </button>
          </div>
        )}
      </form>

      {isAnswered && (
        <>
          <div
            className={`feedback ${
              check?.result === 'correct'
                ? 'feedback-good'
                : check?.result === 'close'
                  ? 'feedback-close'
                  : 'feedback-bad'
            }`}
            role="status"
          >
            <strong>
              {check?.result === 'correct'
                ? 'Richtig!'
                : check?.result === 'close'
                  ? 'Fast!'
                  : revealed
                    ? 'Here is the answer:'
                    : 'Not quite.'}
            </strong>{' '}
            {check?.note && <span>{check.note} </span>}
            <span lang="de" className="answer-sentence">
              {fullSentence[0]}
              <mark>{item.answers[0]}</mark>
              {fullSentence[1]}
            </span>
          </div>
          <div className="phrase-card" lang="de">
            <strong>{item.phrase}</strong>
            <span lang="en">{item.meaning}</span>
            {item.note && <small lang="en">{item.note}</small>}
          </div>
          <div className="rating-row" role="group" aria-label="How well did you know it?">
            {ratings.map(({ rating, label }) => (
              <button
                key={rating}
                ref={rating === suggestion ? ratingRef : undefined}
                className={`rating-button rating-${rating}${
                  rating === suggestion ? ' is-suggested' : ''
                }`}
                type="button"
                onClick={() => rate(rating)}
              >
                <strong>{label}</strong>
                <span>{formatInterval(intervalFor(state.cards[id], rating))}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function VocabularyModule() {
  const { state, today } = useProgress()
  const [session, setSession] = useState<string[] | null>(null)

  const deck = deckIds(state)
  const due = dueCount(state, today)
  const allowance = newAllowance(state, today)
  const unseen = deck.filter((id) => !state.cards[id]).length
  const queue = buildQueue(deck, state.cards, today, allowance)

  if (session) {
    return (
      <div className="module">
        <PageHeader
          eyebrow="SPACED REPETITION"
          title="Vocabulary review"
          onBack={() => setSession(null)}
          backLabel="End session"
        >
          Type the missing word. Producing the word, not just recognising it, is
          what moves vocabulary from passive to active.
        </PageHeader>
        <ReviewSession initialQueue={session} onExit={() => setSession(null)} />
      </div>
    )
  }

  return (
    <div className="module">
      <PageHeader eyebrow="WORTSCHATZ" title="Vocabulary">
        C1 German lives in its fixed expressions: Nomen-Verb-Verbindungen,
        genitive prepositions and Redemittel. Cards come back just before you
        would forget them.
      </PageHeader>

      <section className="panel vocab-hero" aria-label="Today's review">
        <div className="hero-stats">
          <div>
            <strong>{due}</strong>
            <span>due for review</span>
          </div>
          <div>
            <strong>{allowance}</strong>
            <span>new today</span>
          </div>
          <div>
            <strong>{learnedCount(state)}</strong>
            <span>learned</span>
          </div>
          <div>
            <strong>{masteredCount(state)}</strong>
            <span>mastered</span>
          </div>
        </div>
        {queue.length > 0 ? (
          <button
            className="primary-button large-button"
            type="button"
            onClick={() => setSession(queue)}
          >
            Start review · {queue.length} card{queue.length === 1 ? '' : 's'}{' '}
            <span aria-hidden="true">→</span>
          </button>
        ) : (
          <div className="all-done">
            <p>
              <strong>Alles erledigt!</strong> Nothing is due right now.
            </p>
            {unseen > 0 && (
              <button
                className="ghost-button"
                type="button"
                onClick={() =>
                  setSession(buildQueue(deck, state.cards, today, 5))
                }
              >
                Learn 5 extra new cards
              </button>
            )}
          </div>
        )}
      </section>

      <details className="panel deck-list">
        <summary>
          Your deck <span>{deck.length} cards</span>
        </summary>
        <ul>
          {deck.map((id) => {
            const item = vocabById[id]
            const card = state.cards[id]
            const label = statusLabel(card)
            return (
              <li key={id}>
                <span lang="de">{item.phrase}</span>
                <span>{item.meaning}</span>
                <span className={`status-pill status-${label.toLowerCase()}`}>
                  {label}
                </span>
              </li>
            )
          })}
        </ul>
      </details>
    </div>
  )
}
