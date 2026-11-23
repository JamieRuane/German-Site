import { readings } from '../data/readings'
import type { Location } from '../lib/routes'
import { useProgress } from '../state/ProgressContext'

export function ContinueLearning({
  onNavigate,
}: {
  onNavigate: (location: Location) => void
}) {
  const { state } = useProgress()
  const reading =
    readings.find((item) => !state.readings[item.id]) ?? readings[0]
  const record = state.readings[reading.id]
  const featuredWord = reading.glossary[0]

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
          <span className="art-label">
            {reading.topic.split(' · ')[0].toUpperCase()} · LESESTÜCK
          </span>
        </div>
        <div className="featured-copy">
          <div className="featured-tags">
            <span className="level-tag">B2 → C1</span>
            <span className="reading-type">
              READING · {reading.minutes} MIN
            </span>
          </div>
          <h3 lang="de">{reading.title}</h3>
          <p>{reading.teaser}</p>
          <div className="featured-footer">
            <div className="feature-word">
              <span>KEY WORD</span>
              <strong lang="de">{featuredWord.phrase}</strong>
              <span>{featuredWord.meaning}</span>
            </div>
            <button
              className="primary-button"
              type="button"
              onClick={() => onNavigate({ route: 'reading', param: reading.id })}
            >
              {record ? 'Read again' : 'Start reading'}{' '}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <div className="featured-side-note">
          <span className="side-note-icon" aria-hidden="true">
            ✳
          </span>
          <span>ONE STEP CLOSER</span>
          <span>
            {reading.glossary.length} glossed words
            <br />
            {reading.questions.length} exam questions
          </span>
        </div>
      </article>
    </section>
  )
}
