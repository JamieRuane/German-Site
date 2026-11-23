import { useCallback, useEffect, useRef, useState } from 'react'
import { ContinueLearning } from './components/ContinueLearning'
import { DashboardHeader } from './components/DashboardHeader'
import { LearningPlan } from './components/LearningPlan'
import { ProgressSection } from './components/ProgressSection'
import { Sidebar } from './components/Sidebar'
import { WelcomeSection } from './components/WelcomeSection'
import { formatLongDate } from './lib/dates'
import { routeLabels, useHashLocation, type Location } from './lib/routes'
import { useStudyTimer } from './lib/useStudyTimer'
import { GrammarModule } from './modules/GrammarModule'
import { ProgressModule } from './modules/ProgressModule'
import { ReadingModule } from './modules/ReadingModule'
import { SettingsModule } from './modules/SettingsModule'
import { VocabularyModule } from './modules/VocabularyModule'
import { WritingModule } from './modules/WritingModule'
import { useProgress } from './state/ProgressContext'
import { ProgressProvider } from './state/ProgressProvider'
import { dueCount, newAllowance } from './state/progressStore'

const STUDY_ROUTES = new Set(['vocabulary', 'reading', 'writing', 'grammar'])

function AppShell() {
  const { state, dispatch, today } = useProgress()
  const [location, navigate] = useHashLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [message, setMessage] = useState('')
  const timeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const isFirstRender = useRef(true)

  const dateLabel = formatLongDate(new Date(`${today}T12:00:00`))
  const pending = dueCount(state, today) + newAllowance(state, today)

  function showMessage(nextMessage: string) {
    setMessage(nextMessage)
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => setMessage(''), 3200)
  }

  const addStudyTime = useCallback(
    (seconds: number) => dispatch({ type: 'addSeconds', seconds, today }),
    [dispatch, today],
  )
  useStudyTimer(STUDY_ROUTES.has(location.route), addStudyTime)

  useEffect(() => {
    if (!isSidebarOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false)
        menuToggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isSidebarOpen])

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Move focus to the new page heading so keyboard and screen-reader users
  // know the view changed.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (typeof window.scrollTo === 'function' && !navigator.userAgent.includes('jsdom')) {
      window.scrollTo({ top: 0 })
    }
    mainRef.current?.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true })
  }, [location.route, location.param])

  function go(next: Location) {
    navigate(next)
    setIsSidebarOpen(false)
  }

  let page
  switch (location.route) {
    case 'vocabulary':
      page = <VocabularyModule />
      break
    case 'reading':
      page = <ReadingModule readingId={location.param} navigate={go} />
      break
    case 'grammar':
      page = <GrammarModule topicId={location.param} navigate={go} />
      break
    case 'writing':
      page = <WritingModule promptId={location.param} navigate={go} />
      break
    case 'progress':
      page = <ProgressModule navigate={go} />
      break
    case 'settings':
      page = <SettingsModule onMessage={showMessage} />
      break
    default:
      page = (
        <>
          <WelcomeSection dateLabel={dateLabel} />
          <LearningPlan onNavigate={go} />
          <ProgressSection />
          <ContinueLearning onNavigate={go} />
        </>
      )
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="app-shell">
        <Sidebar
          isOpen={isSidebarOpen}
          currentRoute={location.route}
          onClose={() => setIsSidebarOpen(false)}
          onNavigate={go}
        />
        <main id="main-content" className="main-content" ref={mainRef}>
          <DashboardHeader
            pageLabel={routeLabels[location.route]}
            dateLabel={dateLabel}
            pendingCount={pending}
            isSidebarOpen={isSidebarOpen}
            menuToggleRef={menuToggleRef}
            onMenuToggle={() => setIsSidebarOpen((isOpen) => !isOpen)}
            onNotification={() =>
              showMessage(
                pending > 0
                  ? `${pending} vocabulary card${pending === 1 ? ' is' : 's are'} waiting for you.`
                  : "You're all caught up — nothing is due right now.",
              )
            }
          />
          <div className="dashboard">
            {page}
            <footer className="page-footer">
              <span>Made for the words you're still learning.</span>
              <span>
                <span className="footer-mark" aria-hidden="true">
                  ✳
                </span>{' '}
                WortWise <span className="footer-separator">·</span> A
                LinguaForge concept
              </span>
            </footer>
          </div>
        </main>
      </div>
      <div
        className={`toast${message ? ' is-visible' : ''}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        data-testid="toast"
      >
        {message}
      </div>
    </>
  )
}

function App() {
  return (
    <ProgressProvider>
      <AppShell />
    </ProgressProvider>
  )
}

export default App
