import type { CSSProperties } from 'react'

const studyMinutes = [
  { day: 'Mon', minutes: 20, height: 28 },
  { day: 'Tue', minutes: 30, height: 42 },
  { day: 'Wed', minutes: 25, height: 35 },
  { day: 'Thu', minutes: 40, height: 56 },
  { day: 'Fri', minutes: 30, height: 42 },
  { day: 'Sat', minutes: 45, height: 63 },
  { day: 'Sun', minutes: 15, height: 21 },
]

const chartDescription = `Sample study minutes this week: ${studyMinutes
  .map(({ day, minutes }) => `${day} ${minutes}`)
  .join(', ')}. Total: 3 hours 25 minutes.`

export function ProgressSection() {
  return (
    <section className="progress-section" aria-labelledby="progress-title">
      <div className="section-heading progress-heading">
        <div>
          <div className="eyebrow section-eyebrow">THE BIG PICTURE</div>
          <h2 id="progress-title">Your progress</h2>
        </div>
        <span className="sample-caption">
          <span className="sample-dot" aria-hidden="true" />
          All figures are sample data
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
            284 <span>words</span>
          </div>
          <div className="stat-trend">
            <span className="trend-up">↗ 12%</span>
            <span>vs. last week</span>
          </div>
          <div className="stat-bottom">
            <span>NEW THIS WEEK</span>
            <strong>+18 words</strong>
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
            9 <span>days</span>
          </div>
          <div className="stat-trend streak-note">
            <span>Du bist in Schwung!</span> You&apos;re on a roll!
          </div>
          <div
            className="streak-dots"
            aria-label="Sample streak: nine consecutive days"
          >
            {Array.from({ length: 9 }, (_, index) => (
              <span key={index} />
            ))}
            <i />
          </div>
        </article>

        <article className="stat-card chart-card">
          <div className="stat-heading">
            <span>
              STUDY TIME <span className="stat-period">THIS WEEK</span>
            </span>
            <span className="chart-total">3h 25m</span>
          </div>
          <div
            className="activity-chart"
            role="img"
            aria-label={chartDescription}
          >
            {studyMinutes.map(({ day, height }) => (
              <div
                className={`chart-column${day === 'Sat' ? ' is-today' : ''}`}
                key={day}
              >
                <span
                  className="chart-bar"
                  style={{ '--bar-height': `${height}%` } as CSSProperties}
                />
                <span>{day}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
