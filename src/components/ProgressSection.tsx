import { formatMinutes, lastDays } from '../lib/dates'
import { useProgress } from '../state/ProgressContext'
import {
  deckIds,
  isActiveDay,
  learnedCount,
  minutesOn,
  streak,
} from '../state/progressStore'
import { WeeklyChart } from './WeeklyChart'

export function ProgressSection() {
  const { state, today } = useProgress()
  const learned = learnedCount(state)
  const deckSize = deckIds(state).length
  const currentStreak = streak(state, today)
  const week = lastDays(today, 7)
  const weekTotal = week.reduce((sum, day) => sum + minutesOn(state, day), 0)
  const reviewsThisWeek = week.reduce(
    (sum, day) => sum + (state.log[day]?.reviews ?? 0),
    0,
  )

  return (
    <section className="progress-section" aria-labelledby="progress-title">
      <div className="section-heading progress-heading">
        <div>
          <div className="eyebrow section-eyebrow">THE BIG PICTURE</div>
          <h2 id="progress-title">Your progress</h2>
        </div>
        <span className="sample-caption">
          <span className="sample-dot" aria-hidden="true" />
          Saved on this device
        </span>
      </div>
      <div className="progress-grid">
        <article className="stat-card">
          <div className="stat-heading">
            <span>WORDS LEARNED</span>
            <span className="stat-icon stat-vocab" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 4.5h10a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3v-12Z" />
                <path d="M8 9h6m-6 4h6" />
              </svg>
            </span>
          </div>
          <div className="stat-value">
            {learned} <span>of {deckSize}</span>
          </div>
          <div className="stat-trend">
            <span>Learned = remembered for 7+ days</span>
          </div>
          <div className="stat-bottom">
            <span>REVIEWS THIS WEEK</span>
            <strong>{reviewsThisWeek}</strong>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-heading">
            <span>CURRENT STREAK</span>
            <span className="stat-icon stat-streak" aria-hidden="true">
              ✳
            </span>
          </div>
          <div className="stat-value">
            {currentStreak} <span>day{currentStreak === 1 ? '' : 's'}</span>
          </div>
          <div className="stat-trend streak-note">
            {currentStreak >= 3 ? (
              <>
                <span lang="de">Du bist in Schwung!</span> You&apos;re on a roll!
              </>
            ) : (
              <>
                <span lang="de">Dranbleiben!</span> Study daily to build a streak.
              </>
            )}
          </div>
          <div
            className="streak-dots"
            role="img"
            aria-label={`Study days in the last 7 days: ${
              week.filter((day) => isActiveDay(state.log[day])).length
            } of 7`}
          >
            {week.map((day) =>
              isActiveDay(state.log[day]) ? (
                <span key={day} />
              ) : (
                <i key={day} />
              ),
            )}
          </div>
        </article>

        <article className="stat-card chart-card">
          <div className="stat-heading">
            <span>
              STUDY TIME <span className="stat-period">LAST 7 DAYS</span>
            </span>
            <span className="chart-total">{formatMinutes(weekTotal)}</span>
          </div>
          <WeeklyChart />
        </article>
      </div>
    </section>
  )
}
