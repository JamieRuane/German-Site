import { useProgress } from '../state/ProgressContext'
import { minutesOn } from '../state/progressStore'

const quotes: [german: string, english: string][] = [
  ['Wer rastet, der rostet.', 'Use it or lose it.'],
  ['Übung macht den Meister.', 'Practice makes perfect.'],
  ['Aller Anfang ist schwer.', 'Every beginning is hard.'],
  ['Steter Tropfen höhlt den Stein.', 'Constant dripping wears away the stone.'],
  ['Ohne Fleiß kein Preis.', 'No pain, no gain.'],
  ['Gut Ding will Weile haben.', 'Good things take time.'],
  ['Morgenstund hat Gold im Mund.', 'The early bird catches the worm.'],
]

export function WelcomeSection({ dateLabel }: { dateLabel: string }) {
  const { state, today } = useProgress()
  const minutes = minutesOn(state, today)
  const goal = state.dailyGoalMinutes
  const percent = Math.min(100, Math.round((minutes / goal) * 100))
  const dayNumber = Number(today.slice(-2))
  const [quote, translation] = quotes[dayNumber % quotes.length]

  const footnote =
    minutes >= goal
      ? 'Daily goal reached — sehr gut!'
      : minutes === 0
        ? 'Start any activity to begin the clock.'
        : percent >= 50
          ? "You're over halfway there!"
          : 'A good start — keep going.'

  return (
    <section className="welcome-grid" aria-labelledby="welcome-title">
      <div className="welcome-copy">
        <div className="eyebrow">
          <span className="eyebrow-line" />
          {dateLabel.toUpperCase()}
        </div>
        <h1 id="welcome-title" tabIndex={-1}>
          Ready to reach <span>C1?</span>
        </h1>
        <p>
          Your next chapter in German starts with today&apos;s small wins.
          Let&apos;s make them count.
        </p>
        <div className="welcome-quote" lang="de">
          <span className="quote-mark" aria-hidden="true">
            “
          </span>
          <span>{quote}</span>
          <span className="quote-translation" lang="en">
            {translation}
          </span>
        </div>
      </div>

      <article className="goal-card" aria-labelledby="goal-title">
        <div className="goal-topline">
          <span className="goal-icon" aria-hidden="true">
            ✳
          </span>
          <span>YOUR DAILY GOAL</span>
        </div>
        <h2 id="goal-title">A little progress goes a long way.</h2>
        <div className="goal-progress-copy">
          <strong>
            {minutes} <span>min</span>
          </strong>
          <span>of {goal} min goal</span>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Daily learning goal"
          aria-valuemin={0}
          aria-valuemax={goal}
          aria-valuenow={Math.min(minutes, goal)}
        >
          <span className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <div className="goal-footnote">
          <span>
            <span className="goal-check" aria-hidden="true">
              ✓
            </span>
            {footnote}
          </span>
          <span>{percent}%</span>
        </div>
      </article>
    </section>
  )
}
