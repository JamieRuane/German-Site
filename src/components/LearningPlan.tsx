import { vocabById } from '../data/deck'
import { grammarTopics } from '../data/grammar'
import { readings } from '../data/readings'
import { writingPrompts } from '../data/writing'
import type { Location } from '../lib/routes'
import { buildQueue } from '../lib/srs'
import { useProgress } from '../state/ProgressContext'
import { deckIds, newAllowance } from '../state/progressStore'
import { Icon, type IconName } from './Icon'

type Activity = {
  title: string
  description: string
  duration: number
  example: string
  translation: string
  icon: IconName
  iconClass: string
  action: string
  done: boolean
  location: Location
}

function ActivityCard({
  activity,
  onNavigate,
}: {
  activity: Activity
  onNavigate: (location: Location) => void
}) {
  return (
    <article className={`plan-card${activity.done ? ' is-done' : ''}`}>
      <div className="plan-card-top">
        <span
          className={`activity-icon ${activity.iconClass}`}
          aria-hidden="true"
        >
          <Icon name={activity.icon} />
        </span>
        <span className="activity-time">
          {activity.done ? (
            <span className="done-label">✓ Done today</span>
          ) : (
            <>
              <Icon name="clock" />
              {activity.duration} min
            </>
          )}
        </span>
      </div>
      <h3>{activity.title}</h3>
      <p>{activity.description}</p>
      <div className="vocab-example" lang="de">
        <span>{activity.example}</span>
        <span lang="en">{activity.translation}</span>
      </div>
      <button
        className="activity-action"
        type="button"
        onClick={() => onNavigate(activity.location)}
      >
        {activity.action}
        <span aria-hidden="true">→</span>
      </button>
    </article>
  )
}

export function LearningPlan({
  onNavigate,
}: {
  onNavigate: (location: Location) => void
}) {
  const { state, today } = useProgress()

  const queue = buildQueue(deckIds(state), state.cards, today, newAllowance(state, today))
  const reviewedToday = (state.log[today]?.reviews ?? 0) > 0
  const nextCard = vocabById[queue[0] ?? 'in-betracht-ziehen']

  const nextReading =
    readings.find((item) => !state.readings[item.id]) ??
    [...readings].sort((a, b) =>
      state.readings[a.id].completedOn.localeCompare(state.readings[b.id].completedOn),
    )[0]
  const readToday = readings.some(
    (item) => state.readings[item.id]?.completedOn === today,
  )

  const weakestTopic = [...grammarTopics].sort((a, b) => {
    const scoreA = state.grammar[a.id] ? state.grammar[a.id].best / state.grammar[a.id].total : -1
    const scoreB = state.grammar[b.id] ? state.grammar[b.id].best / state.grammar[b.id].total : -1
    return scoreA - scoreB
  })[0]
  const grammarToday = grammarTopics.some(
    (topic) => state.grammar[topic.id]?.lastPracticed === today,
  )

  const nextPrompt =
    writingPrompts.find((item) => !state.writing[item.id]?.submissions) ??
    writingPrompts[0]
  const wroteToday = writingPrompts.some(
    (item) => state.writing[item.id]?.lastSubmitted === today,
  )

  const activities: Activity[] = [
    {
      title: 'Vocabulary review',
      description:
        queue.length > 0
          ? `${queue.length} card${queue.length === 1 ? '' : 's'} waiting: reviews and new C1 phrases.`
          : 'Nothing due — your deck is up to date.',
      duration: Math.max(3, Math.ceil(queue.length * 0.6)),
      example: nextCard.phrase,
      translation: nextCard.meaning,
      icon: 'vocabulary',
      iconClass: 'vocab-icon',
      action: queue.length > 0 ? 'Review vocabulary' : 'Open vocabulary',
      done: reviewedToday && queue.length === 0,
      location: { route: 'vocabulary' },
    },
    {
      title: 'Advanced reading',
      description: nextReading.teaser,
      duration: nextReading.minutes,
      example: nextReading.title,
      translation: nextReading.topic,
      icon: 'reading',
      iconClass: 'reading-icon',
      action: 'Start reading',
      done: readToday,
      location: { route: 'reading', param: nextReading.id },
    },
    {
      title: 'Grammar practice',
      description: weakestTopic.subtitle,
      duration: 8,
      example: weakestTopic.examples[0][1],
      translation: weakestTopic.title,
      icon: 'grammar',
      iconClass: 'grammar-icon',
      action: 'Practise grammar',
      done: grammarToday,
      location: { route: 'grammar', param: weakestTopic.id },
    },
    {
      title: 'Writing challenge',
      description: `${nextPrompt.kindLabel}: ${nextPrompt.minWords}–${nextPrompt.maxWords} words with live self-check.`,
      duration: nextPrompt.minutes,
      example: nextPrompt.title,
      translation: nextPrompt.kindLabel,
      icon: 'writing',
      iconClass: 'writing-icon',
      action: 'Try the prompt',
      done: wroteToday,
      location: { route: 'writing', param: nextPrompt.id },
    },
  ]

  const totalMinutes = activities
    .filter((activity) => !activity.done)
    .reduce((sum, activity) => sum + activity.duration, 0)

  return (
    <section className="plan-section" aria-labelledby="plan-title">
      <div className="section-heading">
        <div>
          <div className="eyebrow section-eyebrow">YOUR NEXT STEPS</div>
          <h2 id="plan-title">Today&apos;s learning plan</h2>
        </div>
        <span className="plan-total">
          <Icon name="clock" />
          {totalMinutes > 0 ? `${totalMinutes} min to go` : 'All done today'}
        </span>
      </div>
      <div className="plan-grid">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.title}
            activity={activity}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </section>
  )
}
