import { useEffect, useRef, useState } from 'react'
import type { Question } from '../data/readings'

type ChoiceQuizProps = {
  questions: Question[]
  /** Shuffle answer options (keep off for fixed scales like richtig/falsch). */
  shuffle?: boolean
  onFinish: (score: number, total: number) => void
}

function shuffled<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function ChoiceQuiz({ questions, shuffle = false, onFinish }: ChoiceQuizProps) {
  const [orders] = useState(() =>
    questions.map((question) => {
      const indexes = question.options.map((_, index) => index)
      return shuffle ? shuffled(indexes) : indexes
    }),
  )
  const [position, setPosition] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const nextRef = useRef<HTMLButtonElement>(null)

  const question = questions[position]
  const answered = selected !== null
  const isCorrect = selected === question.answer
  const isLast = position === questions.length - 1

  useEffect(() => {
    if (answered) nextRef.current?.focus()
  }, [answered])

  function choose(optionIndex: number) {
    if (answered) return
    setSelected(optionIndex)
    if (optionIndex === question.answer) setScore((value) => value + 1)
  }

  function next() {
    if (isLast) {
      onFinish(score, questions.length)
      return
    }
    setPosition((value) => value + 1)
    setSelected(null)
  }

  return (
    <div className="quiz">
      <div className="quiz-meta">
        <span>
          Question {position + 1} of {questions.length}
        </span>
        <span>{score} correct</span>
      </div>
      <div
        className="quiz-progress"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={position + (answered ? 1 : 0)}
      >
        <span
          style={{
            width: `${((position + (answered ? 1 : 0)) / questions.length) * 100}%`,
          }}
        />
      </div>
      <fieldset className="quiz-question">
        <legend className="quiz-prompt" lang="de">
          {question.prompt}
        </legend>
        <div className="quiz-options">
          {orders[position].map((optionIndex) => {
            const state = !answered
              ? ''
              : optionIndex === question.answer
                ? ' is-correct'
                : optionIndex === selected
                  ? ' is-wrong'
                  : ' is-dimmed'
            return (
              <button
                key={optionIndex}
                type="button"
                className={`quiz-option${state}`}
                aria-pressed={selected === optionIndex}
                disabled={answered}
                lang="de"
                onClick={() => choose(optionIndex)}
              >
                {question.options[optionIndex]}
              </button>
            )
          })}
        </div>
      </fieldset>
      {answered && (
        <div
          className={`feedback ${isCorrect ? 'feedback-good' : 'feedback-bad'}`}
          role="status"
        >
          <strong>{isCorrect ? 'Richtig!' : 'Nicht ganz.'}</strong>{' '}
          <span>{question.explanation}</span>
        </div>
      )}
      {answered && (
        <button
          ref={nextRef}
          className="primary-button large-button"
          type="button"
          onClick={next}
        >
          {isLast ? 'See results' : 'Next question'}{' '}
          <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  )
}
