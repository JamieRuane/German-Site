import { PageHeader } from '../components/PageHeader'
import { WeeklyChart } from '../components/WeeklyChart'
import { grammarTopics } from '../data/grammar'
import { readings } from '../data/readings'
import { writingPrompts } from '../data/writing'
import { lastDays } from '../lib/dates'
import type { Location } from '../lib/routes'
import { useProgress } from '../state/ProgressContext'
import {
  deckIds,
  grammarMastery,
  learnedCount,
  masteredCount,
  minutesOn,
  streak,
} from '../state/progressStore'

type SkillRow = {
  label: string
  value: number
  detail: string
  location: Location
}

export function ProgressModule({
  navigate,
}: {
  navigate: (location: Location) => void
}) {
  const { state, today } = useProgress()
  const deckSize = deckIds(state).length
  const learned = learnedCount(state)
  const readingsDone = readings.filter((item) => state.readings[item.id])
  const readingAverage =
    readingsDone.length === 0
      ? 0
      : readingsDone.reduce(
          (sum, item) =>
            sum + state.readings[item.id].score / state.readings[item.id].total,
          0,
        ) / readings.length
  const writingDone = writingPrompts.filter(
    (item) => (state.writing[item.id]?.submissions ?? 0) > 0,
  ).length
  const weekMinutes = lastDays(today, 7).reduce(
    (sum, day) => sum + minutesOn(state, day),
    0,
  )

  const skills: SkillRow[] = [
    {
      label: 'Vocabulary',
      value: deckSize === 0 ? 0 : learned / deckSize,
      detail: `${learned} of ${deckSize} cards learned · ${masteredCount(state)} mastered`,
      location: { route: 'vocabulary' },
    },
    {
      label: 'Grammar',
      value: grammarMastery(state),
      detail: `${grammarTopics.filter((topic) => state.grammar[topic.id]).length} of ${grammarTopics.length} topics practised`,
      location: { route: 'grammar' },
    },
    {
      label: 'Reading',
      value: readingAverage,
      detail: `${readingsDone.length} of ${readings.length} texts completed`,
      location: { route: 'reading' },
    },
    {
      label: 'Writing',
      value: writingDone / writingPrompts.length,
      detail: `${writingDone} of ${writingPrompts.length} tasks finished`,
      location: { route: 'writing' },
    },
  ]
  const weakest = [...skills].sort((a, b) => a.value - b.value)[0]

  return (
    <div className="module">
      <PageHeader eyebrow="FORTSCHRITT" title="Progress">
        Everything here is tracked on this device as you study. Time only
        counts while you are active in a learning module.
      </PageHeader>

      <div className="stat-tiles">
        <div className="panel stat-tile">
          <span>Current streak</span>
          <strong>
            {streak(state, today)} <small>days</small>
          </strong>
        </div>
        <div className="panel stat-tile">
          <span>Today</span>
          <strong>
            {minutesOn(state, today)} <small>/ {state.dailyGoalMinutes} min</small>
          </strong>
        </div>
        <div className="panel stat-tile">
          <span>Last 7 days</span>
          <strong>
            {weekMinutes} <small>min</small>
          </strong>
        </div>
        <div className="panel stat-tile">
          <span>Words learned</span>
          <strong>
            {learned} <small>/ {deckSize}</small>
          </strong>
        </div>
      </div>

      <section className="panel" aria-labelledby="skills-title">
        <h2 id="skills-title" className="panel-title">
          Road to C1
        </h2>
        <ul className="skill-list">
          {skills.map((skill) => (
            <li key={skill.label}>
              <div className="skill-head">
                <button
                  type="button"
                  className="text-link"
                  onClick={() => navigate(skill.location)}
                >
                  {skill.label}
                </button>
                <span>{Math.round(skill.value * 100)}%</span>
              </div>
              <div
                className="skill-track"
                role="progressbar"
                aria-label={`${skill.label} progress`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(skill.value * 100)}
              >
                <span style={{ width: `${skill.value * 100}%` }} />
              </div>
              <span className="muted">{skill.detail}</span>
            </li>
          ))}
        </ul>
        <p className="next-step">
          <strong>Suggested focus:</strong> {weakest.label}.{' '}
          <button
            type="button"
            className="text-link"
            onClick={() => navigate(weakest.location)}
          >
            Go there now →
          </button>
        </p>
      </section>

      <section className="panel" aria-labelledby="week-title">
        <h2 id="week-title" className="panel-title">
          Study time this week
        </h2>
        <WeeklyChart large />
      </section>

      <section className="panel" aria-labelledby="grammar-progress-title">
        <h2 id="grammar-progress-title" className="panel-title">
          Grammar topics
        </h2>
        <ul className="topic-table">
          {grammarTopics.map((topic) => {
            const record = state.grammar[topic.id]
            return (
              <li key={topic.id}>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => navigate({ route: 'grammar', param: topic.id })}
                >
                  {topic.title}
                </button>
                <span className="muted">
                  {record
                    ? `best ${record.best}/${record.total} · ${record.attempts} attempt${record.attempts === 1 ? '' : 's'}`
                    : 'not started'}
                </span>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
