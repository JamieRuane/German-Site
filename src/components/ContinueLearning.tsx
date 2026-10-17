type ContinueLearningProps = {
  onActivity: (activity: string) => void
}

export function ContinueLearning({ onActivity }: ContinueLearningProps) {
  return (
    <section className="continue-section" aria-labelledby="continue-title">
      <div className="section-heading continue-heading">
        <div>
          <div className="eyebrow section-eyebrow">
            PICK UP WHERE YOU LEFT OFF
          </div>
          <h2 id="continue-title">Continue learning</h2>
        </div>
        <span className="preview-label">
          <span aria-hidden="true">✦</span> CURATED FOR YOU
        </span>
      </div>
      <article className="featured-card">
        <div className="featured-art" aria-hidden="true">
          <div className="art-sun" />
          <div className="art-building art-building-one" />
          <div className="art-building art-building-two" />
          <div className="art-building art-building-three" />
          <div className="art-ground" />
          <span className="art-label">STADTLEBEN · LESESTÜCK</span>
        </div>
        <div className="featured-copy">
          <div className="featured-tags">
            <span className="level-tag">B2 → C1</span>
            <span className="reading-type">READING · 12 MIN</span>
          </div>
          <h3>Wem gehört die Stadt?</h3>
          <p>
            How shared spaces, local voices and changing neighbourhoods are
            reshaping modern city life.
          </p>
          <div className="featured-footer">
            <div className="feature-word">
              <span>UP NEXT</span>
              <strong>der Wandel</strong>
              <span>change · transformation</span>
            </div>
            <button
              className="primary-button"
              type="button"
              onClick={() =>
                onActivity('Wem gehört die Stadt? — reading exercise')
              }
            >
              Start reading <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <div className="featured-side-note">
          <span className="side-note-icon" aria-hidden="true">
            ✳
          </span>
          <span>ONE STEP CLOSER</span>
          <span>
            You&apos;re building
            <br />
            something great.
          </span>
        </div>
      </article>
    </section>
  )
}
