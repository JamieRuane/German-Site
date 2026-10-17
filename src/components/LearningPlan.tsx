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
}

const activities: Activity[] = [
  {
    title: 'Vocabulary review',
    description: 'Revisit 12 words and useful collocations.',
    duration: 10,
    example: 'etwas in Betracht ziehen',
    translation: 'to consider something',
    icon: 'vocabulary',
    iconClass: 'vocab-icon',
    action: 'Review vocabulary',
  },
  {
    title: 'Advanced reading',
    description: 'Explore how cities are rethinking public space.',
    duration: 15,
    example: 'eine Debatte anstoßen',
    translation: 'to spark a debate',
    icon: 'reading',
    iconClass: 'reading-icon',
    action: 'Start reading',
  },
  {
    title: 'Grammar practice',
    description: 'Sharpen your feel for adjective declensions.',
    duration: 8,
    example: 'angesichts der steigenden Kosten',
    translation: 'in view of rising costs',
    icon: 'grammar',
    iconClass: 'grammar-icon',
    action: 'Practice grammar',
  },
  {
    title: 'Writing challenge',
    description: 'Make a thoughtful point in 100 German words.',
    duration: 12,
    example: 'die Tragweite erfassen',
    translation: 'to grasp the implications',
    icon: 'writing',
    iconClass: 'writing-icon',
    action: 'Try the prompt',
  },
]

type LearningPlanProps = {
  onActivity: (activity: string) => void
}

function ActivityCard({
  activity,
  onActivity,
}: {
  activity: Activity
  onActivity: LearningPlanProps['onActivity']
}) {
  return (
    <article className="plan-card">
      <div className="plan-card-top">
        <span
          className={`activity-icon ${activity.iconClass}`}
          aria-hidden="true"
        >
          <Icon name={activity.icon} />
        </span>
        <span className="activity-time">
          <Icon name="clock" />
          {activity.duration} min
        </span>
      </div>
      <h3>{activity.title}</h3>
      <p>{activity.description}</p>
      <div className="vocab-example">
        <span>{activity.example}</span>
        <span>{activity.translation}</span>
      </div>
      <button
        className="activity-action"
        type="button"
        onClick={() => onActivity(activity.title)}
      >
        {activity.action}
        <span aria-hidden="true">→</span>
      </button>
    </article>
  )
}

export function LearningPlan({ onActivity }: LearningPlanProps) {
  return (
    <section className="plan-section" aria-labelledby="plan-title">
      <div className="section-heading">
        <div>
          <div className="eyebrow section-eyebrow">YOUR NEXT STEPS</div>
          <h2 id="plan-title">Today&apos;s learning plan</h2>
        </div>
        <span className="plan-total">
          <Icon name="clock" />
          45 min total
        </span>
      </div>
      <div className="plan-grid">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.title}
            activity={activity}
            onActivity={onActivity}
          />
        ))}
      </div>
    </section>
  )
}
