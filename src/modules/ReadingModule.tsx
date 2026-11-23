import { useState } from 'react'
import { ChoiceQuiz } from '../components/ChoiceQuiz'
import { PageHeader } from '../components/PageHeader'
import { parseParagraph, readings, type Reading } from '../data/readings'
import type { Location } from '../lib/routes'
import { useProgress } from '../state/ProgressContext'

type ReadingModuleProps = {
  readingId?: string
  navigate: (location: Location) => void
}

function ReadingView({
  reading,
  navigate,
}: {
  reading: Reading
  navigate: ReadingModuleProps['navigate']
}) {
  const { state, dispatch, today } = useProgress()
  const [activeGloss, setActiveGloss] = useState<string | null>(null)
  const [phase, setPhase] = useState<'reading' | 'quiz' | 'done'>('reading')
  const [result, setResult] = useState<{ score: number; total: number } | null>(
    null,
  )

  const gloss = reading.glossary.find((item) => item.id === activeGloss)
  const inDeck = (id: string) => state.addedCards.includes(id)
  const notYetAdded = reading.glossary.filter((item) => !inDeck(item.id))

  function finish(score: number, total: number) {
    dispatch({ type: 'finishReading', readingId: reading.id, score, total, today })
    setResult({ score, total })
    setPhase('done')
  }

  return (
    <div className="module">
      <PageHeader
        eyebrow={`LESEN · ${reading.topic.toUpperCase()}`}
        title={reading.title}
        onBack={() => navigate({ route: 'reading' })}
        backLabel="All texts"
      >
        Read the whole text once for gist. Then tap the{' '}
        <span className="gloss-sample">underlined words</span> for meanings and
        add the useful ones to your review deck.
      </PageHeader>

      <div className="reader-layout">
        <article className="panel reader-text" lang="de">
          {reading.paragraphs.map((paragraph, index) => (
            <p key={index}>
              {parseParagraph(paragraph).map((segment, segmentIndex) =>
                segment.kind === 'text' ? (
                  <span key={segmentIndex}>{segment.text}</span>
                ) : (
                  <button
                    key={segmentIndex}
                    type="button"
                    className={`gloss-word${
                      activeGloss === segment.glossId ? ' is-active' : ''
                    }${inDeck(segment.glossId) ? ' is-saved' : ''}`}
                    aria-expanded={activeGloss === segment.glossId}
                    aria-controls="gloss-panel"
                    onClick={() => setActiveGloss(segment.glossId)}
                  >
                    {segment.text}
                  </button>
                ),
              )}
            </p>
          ))}
        </article>

        <aside className="reader-side">
          <div
            className={`panel gloss-panel${gloss ? ' is-open' : ''}`}
            id="gloss-panel"
            aria-live="polite"
          >
            {gloss ? (
              <>
                <button
                  className="gloss-close"
                  type="button"
                  aria-label="Close word panel"
                  onClick={() => setActiveGloss(null)}
                >
                  ×
                </button>
                <span className="category-chip">Wortschatz</span>
                <h2 lang="de">{gloss.phrase}</h2>
                <p>{gloss.meaning}</p>
                {gloss.note && <p className="gloss-note">{gloss.note}</p>}
                {inDeck(gloss.id) ? (
                  <p className="saved-note">✓ In your review deck</p>
                ) : (
                  <button
                    className="primary-button"
                    type="button"
                    onClick={() => dispatch({ type: 'addCard', id: gloss.id })}
                  >
                    + Add to review deck
                  </button>
                )}
              </>
            ) : (
              <p className="gloss-empty">
                Tap an underlined word to see its meaning here.
              </p>
            )}
          </div>
          {notYetAdded.length > 0 && (
            <button
              className="ghost-button full-width"
              type="button"
              onClick={() =>
                notYetAdded.forEach((item) =>
                  dispatch({ type: 'addCard', id: item.id }),
                )
              }
            >
              Add all {notYetAdded.length} words to my deck
            </button>
          )}
          <div className="panel exam-tip">
            <strong>Exam tip</strong>
            <p>
              For <em>richtig / falsch / steht nicht im Text</em>, only what the
              text says counts — not what you know about the topic.
            </p>
          </div>
        </aside>
      </div>

      <section className="panel quiz-panel" aria-labelledby="comprehension-title">
        <h2 id="comprehension-title">Leseverstehen</h2>
        {phase === 'reading' && (
          <>
            <p>
              {reading.questions.length} exam-style questions. Answer from the
              text, then read the explanation.
            </p>
            <button
              className="primary-button large-button"
              type="button"
              onClick={() => setPhase('quiz')}
            >
              Check your understanding <span aria-hidden="true">→</span>
            </button>
          </>
        )}
        {phase === 'quiz' && (
          <ChoiceQuiz questions={reading.questions} onFinish={finish} />
        )}
        {phase === 'done' && result && (
          <div className="result-block" role="status">
            <p className="result-score">
              {result.score} / {result.total}
            </p>
            <p>
              {result.score === result.total
                ? 'Ausgezeichnet! Full marks.'
                : result.score >= result.total * 0.6
                  ? 'Gut gemacht. Reread the paragraphs behind the ones you missed.'
                  : 'Read the text again slowly, then retry the questions.'}
            </p>
            <div className="button-row">
              {reading.writingPromptId && (
                <button
                  className="primary-button large-button"
                  type="button"
                  onClick={() =>
                    navigate({ route: 'writing', param: reading.writingPromptId })
                  }
                >
                  Write about this topic <span aria-hidden="true">→</span>
                </button>
              )}
              <button
                className="ghost-button"
                type="button"
                onClick={() => {
                  setResult(null)
                  setPhase('quiz')
                }}
              >
                Try the questions again
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export function ReadingModule({ readingId, navigate }: ReadingModuleProps) {
  const { state } = useProgress()
  const reading = readings.find((item) => item.id === readingId)

  if (reading) {
    return <ReadingView key={reading.id} reading={reading} navigate={navigate} />
  }

  return (
    <div className="module">
      <PageHeader eyebrow="LESEN" title="Reading">
        Authentic-style C1 texts on topics that come up in Goethe and telc
        exams, with glossed vocabulary and exam-format questions.
      </PageHeader>
      <div className="card-list">
        {readings.map((item) => {
          const record = state.readings[item.id]
          return (
            <article className="panel list-card" key={item.id}>
              <div className="list-card-top">
                <span className="category-chip">{item.topic}</span>
                <span className="muted">{item.minutes} min</span>
              </div>
              <h2 lang="de">{item.title}</h2>
              <p>{item.teaser}</p>
              <div className="list-card-footer">
                <span className="muted">
                  {record
                    ? `Best score ${record.score}/${record.total}`
                    : `${item.glossary.length} glossed words · ${item.questions.length} questions`}
                </span>
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => navigate({ route: 'reading', param: item.id })}
                >
                  {record ? 'Read again' : 'Start reading'}{' '}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
