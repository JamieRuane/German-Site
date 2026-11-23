import { PageHeader } from '../components/PageHeader'
import { useProgress } from '../state/ProgressContext'

const goalOptions = [10, 20, 30, 45, 60]
const newCardOptions = [4, 8, 12, 16]

export function SettingsModule({ onMessage }: { onMessage: (message: string) => void }) {
  const { state, dispatch } = useProgress()

  function reset() {
    const confirmed = window.confirm(
      'Reset all progress? Your review history, scores and writing drafts on this device will be deleted. This cannot be undone.',
    )
    if (!confirmed) return
    dispatch({ type: 'reset' })
    onMessage('All progress has been reset.')
  }

  return (
    <div className="module">
      <PageHeader eyebrow="EINSTELLUNGEN" title="Settings">
        Tune your daily workload. Consistency beats intensity: 30 focused
        minutes a day is a realistic pace for moving from B2 to C1.
      </PageHeader>

      <section className="panel settings-panel">
        <div className="setting-row">
          <label htmlFor="daily-goal">
            <strong>Daily goal</strong>
            <span className="muted">Active study minutes per day</span>
          </label>
          <select
            id="daily-goal"
            value={state.dailyGoalMinutes}
            onChange={(event) =>
              dispatch({ type: 'setDailyGoal', minutes: Number(event.target.value) })
            }
          >
            {goalOptions.map((minutes) => (
              <option key={minutes} value={minutes}>
                {minutes} minutes
              </option>
            ))}
          </select>
        </div>
        <div className="setting-row">
          <label htmlFor="new-cards">
            <strong>New cards per day</strong>
            <span className="muted">
              More new cards means more reviews later on
            </span>
          </label>
          <select
            id="new-cards"
            value={state.newCardsPerDay}
            onChange={(event) =>
              dispatch({
                type: 'setNewCardsPerDay',
                count: Number(event.target.value),
              })
            }
          >
            {newCardOptions.map((count) => (
              <option key={count} value={count}>
                {count} cards
              </option>
            ))}
          </select>
        </div>
        <div className="setting-row">
          <div>
            <strong>Reset progress</strong>
            <span className="muted">
              Progress is stored only in this browser
            </span>
          </div>
          <button className="danger-button" type="button" onClick={reset}>
            Reset…
          </button>
        </div>
      </section>
    </div>
  )
}
