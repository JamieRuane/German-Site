export function WelcomeSection() {
  return (
    <section className="welcome-grid" aria-labelledby="welcome-title">
      <div className="welcome-copy">
        <div className="eyebrow">
          <span className="eyebrow-line" />
          SATURDAY, OCTOBER 17, 2026
        </div>
        <h1 id="welcome-title">
          Ready to reach <span>C1?</span>
        </h1>
        <p>
          Your next chapter in German starts with today&apos;s small wins. Let&apos;s
          make them count.
        </p>
        <div className="welcome-quote">
          <span className="quote-mark" aria-hidden="true">
            “
          </span>
          <span>Wer rastet, der rostet.</span>
          <span className="quote-translation">You snooze, you lose.</span>
        </div>
      </div>

      <article className="goal-card" aria-labelledby="goal-title">
        <div className="goal-topline">
          <span className="goal-icon" aria-hidden="true">
            ✳
          </span>
          <span>YOUR DAILY GOAL</span>
          <span className="sample-tag">SAMPLE</span>
        </div>
        <h2 id="goal-title">A little progress goes a long way.</h2>
        <div className="goal-progress-copy">
          <strong>
            35 <span>min</span>
          </strong>
          <span>of 60 min goal</span>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Daily learning goal"
          aria-valuemin={0}
          aria-valuemax={60}
          aria-valuenow={35}
        >
          <span className="progress-fill" />
        </div>
        <div className="goal-footnote">
          <span>
            <span className="goal-check" aria-hidden="true">
              ✓
            </span>
            You&apos;re over halfway there!
          </span>
          <span>58%</span>
        </div>
      </article>
    </section>
  )
}
