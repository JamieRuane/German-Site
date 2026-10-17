import { useEffect, useRef, useState } from 'react'
import { ContinueLearning } from './components/ContinueLearning'
import { DashboardHeader } from './components/DashboardHeader'
import { LearningPlan } from './components/LearningPlan'
import { ProgressSection } from './components/ProgressSection'
import { Sidebar } from './components/Sidebar'
import { WelcomeSection } from './components/WelcomeSection'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [message, setMessage] = useState('')
  const timeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null)
  const menuToggleRef = useRef<HTMLButtonElement>(null)

  function showMessage(nextMessage: string) {
    setMessage(nextMessage)
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => setMessage(''), 3200)
  }

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

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

  function handleActivity(activity: string) {
    showMessage(
      `${activity} is a preview. Learning activities aren't available yet.`,
    )
  }

  return (
    <>
      <div className="app-shell">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          onMessage={showMessage}
        />
        <main id="main-content" className="main-content">
          <DashboardHeader
            isSidebarOpen={isSidebarOpen}
            menuToggleRef={menuToggleRef}
            onMenuToggle={() => setIsSidebarOpen((isOpen) => !isOpen)}
            onNotification={() =>
              showMessage("You're all caught up — no new notifications.")
            }
          />
          <div className="dashboard">
            <WelcomeSection />
            <LearningPlan onActivity={handleActivity} />
            <ProgressSection />
            <ContinueLearning onActivity={handleActivity} />
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
      <div className="toast" role="status" aria-live="polite" aria-atomic="true">
        {message}
      </div>
    </>
  )
}

export default App
