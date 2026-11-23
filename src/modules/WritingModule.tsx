import { useEffect, useMemo, useRef, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { writingPrompts, type WritingPrompt } from '../data/writing'
import type { Location } from '../lib/routes'
import { analyzeWriting } from '../lib/writingAnalysis'
import { useProgress } from '../state/ProgressContext'

type WritingModuleProps = {
  promptId?: string
  navigate: (location: Location) => void
}

function WritingEditor({
  prompt,
  navigate,
}: {
  prompt: WritingPrompt
  navigate: WritingModuleProps['navigate']
}) {
  const { state, dispatch, today } = useProgress()
  const record = state.writing[prompt.id]
  const [text, setText] = useState(record?.draft ?? '')
  const [covered, setCovered] = useState<boolean[]>(() =>
    prompt.points.map(() => false),
  )
  const [showModel, setShowModel] = useState(false)
  const [justSubmitted, setJustSubmitted] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const analysis = useMemo(() => analyzeWriting(text, prompt), [text, prompt])
  const savedDraft = record?.draft ?? ''

  // Autosave the draft shortly after typing stops.
  useEffect(() => {
    if (text === savedDraft) return
    const id = window.setTimeout(() => {
      dispatch({
        type: 'saveDraft',
        promptId: prompt.id,
        draft: text,
        words: analysis.words,
      })
    }, 600)
    return () => window.clearTimeout(id)
  }, [text, savedDraft, prompt.id, analysis.words, dispatch])

  function insertPhrase(phrase: string) {
    const textarea = textareaRef.current
    const start = textarea?.selectionStart ?? text.length
    const end = textarea?.selectionEnd ?? text.length
    const before = text.slice(0, start)
    const needsSpace = before.length > 0 && !/\s$/.test(before)
    const insert = `${needsSpace ? ' ' : ''}${phrase.replace(/ …$/, ' ')}`
    const next = before + insert + text.slice(end)
    setText(next)
    window.requestAnimationFrame(() => {
      if (!textarea) return
      textarea.focus()
      const caret = before.length + insert.length
      textarea.setSelectionRange(caret, caret)
    })
  }

  function submit() {
    dispatch({
      type: 'submitWriting',
      promptId: prompt.id,
      draft: text,
      words: analysis.words,
      today,
    })
    setJustSubmitted(true)
    setShowModel(true)
  }

  const ratio = Math.min(1, analysis.words / prompt.minWords)
  const lengthState =
    analysis.words > prompt.maxWords
      ? 'is-over'
      : analysis.words >= prompt.minWords
        ? 'is-good'
        : ''
  const goodChecks = analysis.checks.filter((check) => check.status === 'good')

  return (
    <div className="module">
      <PageHeader
        eyebrow={`SCHREIBEN · ${prompt.kindLabel.toUpperCase()}`}
        title={prompt.title}
        onBack={() => navigate({ route: 'writing' })}
        backLabel="All tasks"
      >
        Exam time: about {prompt.minutes} minutes · {prompt.minWords}–
        {prompt.maxWords} words. Your draft is saved automatically on this
        device.
      </PageHeader>

      <section className="panel task-card" aria-labelledby="task-title" lang="de">
        <h2 id="task-title">Aufgabe</h2>
        <p>{prompt.situation}</p>
        <fieldset className="points-list">
          <legend lang="en">Tick each point once you have covered it:</legend>
          {prompt.points.map((point, index) => (
            <label key={point}>
              <input
                type="checkbox"
                checked={covered[index]}
                onChange={(event) =>
                  setCovered((current) =>
                    current.map((value, i) =>
                      i === index ? event.target.checked : value,
                    ),
                  )
                }
              />
              <span>{point}</span>
            </label>
          ))}
        </fieldset>
      </section>

      <div className="writing-layout">
        <div className="writing-main">
          <label className="editor-label" htmlFor="writing-editor">
            Dein Text
          </label>
          <textarea
            id="writing-editor"
            ref={textareaRef}
            className="writing-editor"
            lang="de"
            spellCheck
            value={text}
            placeholder="Schreiben Sie hier Ihren Text …"
            onChange={(event) => {
              setText(event.target.value)
              setJustSubmitted(false)
            }}
          />
          <div className="word-meter">
            <span className={`word-count ${lengthState}`}>
              {analysis.words} words
            </span>
            <span className="meter-track" aria-hidden="true">
              <span className={lengthState} style={{ width: `${ratio * 100}%` }} />
            </span>
            <span className="muted">
              target {prompt.minWords}–{prompt.maxWords}
            </span>
          </div>

          <section className="panel self-check" aria-labelledby="check-title">
            <div className="self-check-heading">
              <h2 id="check-title">Self-check</h2>
              {analysis.words > 0 && (
                <span className="muted">
                  {goodChecks.length}/{analysis.checks.length} looking good
                </span>
              )}
            </div>
            {analysis.words === 0 ? (
              <p className="muted">Start writing to see live feedback.</p>
            ) : (
              <ul className="check-list">
                {analysis.checks.map((check) => (
                  <li key={check.id} className={`check-${check.status}`}>
                    <span className="check-icon" aria-hidden="true">
                      {check.status === 'good' ? '✓' : '!'}
                    </span>
                    <div>
                      <strong>{check.label}</strong>
                      <span>{check.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <p className="check-disclaimer">
              These checks look at length, structure, connectors and register —
              not at grammar accuracy or content. Compare with the model answer,
              or ask a teacher or tandem partner to correct your text.
            </p>
          </section>

          <div className="button-row">
            <button
              className="primary-button large-button"
              type="button"
              disabled={analysis.words < 30}
              onClick={submit}
            >
              Finish & compare with model <span aria-hidden="true">→</span>
            </button>
            {!showModel && (
              <button
                className="ghost-button"
                type="button"
                onClick={() => setShowModel(true)}
              >
                Peek at the model answer
              </button>
            )}
          </div>
          {justSubmitted && (
            <p className="saved-note" role="status">
              ✓ Saved as finished. Compare your text with the model below — what
              structures could you borrow?
            </p>
          )}

          {showModel && (
            <section className="panel model-answer" aria-labelledby="model-title">
              <h2 id="model-title">Musterlösung</h2>
              <div lang="de">
                {prompt.modelAnswer.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="panel redemittel-panel" aria-labelledby="redemittel-title">
          <h2 id="redemittel-title">Redemittel</h2>
          <p className="muted">Click a phrase to insert it at the cursor.</p>
          {prompt.redemittel.map((group) => (
            <div className="redemittel-group" key={group.label}>
              <h3>{group.label}</h3>
              <div className="phrase-chips">
                {group.phrases.map((phrase) => (
                  <button
                    key={phrase}
                    type="button"
                    className="phrase-chip"
                    lang="de"
                    onClick={() => insertPhrase(phrase)}
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}

export function WritingModule({ promptId, navigate }: WritingModuleProps) {
  const { state } = useProgress()
  const prompt = writingPrompts.find((item) => item.id === promptId)

  if (prompt) {
    return <WritingEditor key={prompt.id} prompt={prompt} navigate={navigate} />
  }

  return (
    <div className="module">
      <PageHeader eyebrow="SCHREIBEN" title="Writing">
        C1 writing tasks in the formats used by Goethe and telc: argumentative
        essays, formal emails and forum posts — with Redemittel, a live
        self-check and a model answer.
      </PageHeader>
      <div className="card-list">
        {writingPrompts.map((item) => {
          const record = state.writing[item.id]
          return (
            <article className="panel list-card" key={item.id}>
              <div className="list-card-top">
                <span className="category-chip">{item.kindLabel}</span>
                <span className="muted">
                  {item.minutes} min · {item.minWords}–{item.maxWords} words
                </span>
              </div>
              <h2 lang="de">{item.title}</h2>
              <p lang="de">{item.situation}</p>
              <div className="list-card-footer">
                <span className="muted">
                  {record?.submissions
                    ? `Finished ${record.submissions}× · ${record.words} words`
                    : record?.draft
                      ? `Draft · ${record.words} words`
                      : 'Not started'}
                </span>
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => navigate({ route: 'writing', param: item.id })}
                >
                  {record?.draft ? 'Continue writing' : 'Start writing'}{' '}
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
