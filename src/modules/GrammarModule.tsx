import { useState } from 'react'
import { ChoiceQuiz } from '../components/ChoiceQuiz'
import { PageHeader } from '../components/PageHeader'
import { grammarTopics, type GrammarTopic } from '../data/grammar'
import type { Location } from '../lib/routes'
import { useProgress } from '../state/ProgressContext'

type GrammarModuleProps = {
  topicId?: string
  navigate: (location: Location) => void
}

function TopicView({
  topic,
  navigate,
}: {
  topic: GrammarTopic
  navigate: GrammarModuleProps['navigate']
}) {
  const { state, dispatch, today } = useProgress()
  const [phase, setPhase] = useState<'rules' | 'quiz' | 'done'>('rules')
  const [attempt, setAttempt] = useState(0)
  const [score, setScore] = useState(0)
  const record = state.grammar[topic.id]

  const index = grammarTopics.findIndex((item) => item.id === topic.id)
  const nextTopic = grammarTopics[index + 1]

  function finish(newScore: number, total: number) {
    dispatch({ type: 'finishGrammar', topicId: topic.id, score: newScore, total, today })
    setScore(newScore)
    setPhase('done')
  }

  return (
    <div className="module">
      <PageHeader
        eyebrow="GRAMMATIK · C1"
        title={topic.title}
        onBack={() => navigate({ route: 'grammar' })}
        backLabel="All topics"
      >
        {topic.subtitle}
      </PageHeader>

      <section className="panel rule-card" aria-labelledby="rules-title">
        <h2 id="rules-title">Die Regeln</h2>
        <ul className="rule-list">
          {topic.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
        <div className="example-list" lang="de">
          {topic.examples.map(([before, after]) => (
            <div className="example-pair" key={before}>
              <span>{before}</span>
              <span aria-hidden="true">→</span>
              <strong>{after}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="panel quiz-panel" aria-labelledby="practice-title">
        <h2 id="practice-title">Übungen</h2>
        {phase === 'rules' && (
          <>
            <p>
              {topic.exercises.length} exercises with explanations.
              {record && ` Your best so far: ${record.best}/${record.total}.`}
            </p>
            <button
              className="primary-button large-button"
              type="button"
              onClick={() => setPhase('quiz')}
            >
              Start exercises <span aria-hidden="true">→</span>
            </button>
          </>
        )}
        {phase === 'quiz' && (
          <ChoiceQuiz
            key={attempt}
            questions={topic.exercises}
            shuffle
            onFinish={finish}
          />
        )}
        {phase === 'done' && (
          <div className="result-block" role="status">
            <p className="result-score">
              {score} / {topic.exercises.length}
            </p>
            <p>
              {score === topic.exercises.length
                ? 'Perfekt! This structure is ready for your own writing.'
                : 'Review the rules above and try again — mistakes now save points in the exam.'}
            </p>
            <div className="button-row">
              <button
                className="ghost-button"
                type="button"
                onClick={() => {
                  setAttempt((value) => value + 1)
                  setPhase('quiz')
                }}
              >
                Practise again
              </button>
              {nextTopic && (
                <button
                  className="primary-button large-button"
                  type="button"
                  onClick={() => navigate({ route: 'grammar', param: nextTopic.id })}
                >
                  Next: {nextTopic.title} <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export function GrammarModule({ topicId, navigate }: GrammarModuleProps) {
  const { state } = useProgress()
  const topic = grammarTopics.find((item) => item.id === topicId)

  if (topic) {
    return <TopicView key={topic.id} topic={topic} navigate={navigate} />
  }

  return (
    <div className="module">
      <PageHeader eyebrow="GRAMMATIK" title="Grammar">
        The six structures that most separate B2 from C1 writing and reading.
        Each topic has a compact rule summary and exam-style exercises.
      </PageHeader>
      <div className="topic-grid">
        {grammarTopics.map((item) => {
          const record = state.grammar[item.id]
          const percent = record ? Math.round((record.best / record.total) * 100) : 0
          return (
            <button
              key={item.id}
              className="panel topic-card"
              type="button"
              onClick={() => navigate({ route: 'grammar', param: item.id })}
            >
              <strong>{item.title}</strong>
              <span>{item.subtitle}</span>
              <span className="mini-track" aria-hidden="true">
                <span style={{ width: `${percent}%` }} />
              </span>
              <span className="muted">
                {record ? `Best ${record.best}/${record.total}` : 'Not started'}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
