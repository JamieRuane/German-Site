import type { Location, Route } from '../lib/routes'
import { routeLabels } from '../lib/routes'
import { useProgress } from '../state/ProgressContext'
import { dueCount, newAllowance } from '../state/progressStore'
import { Icon, type IconName } from './Icon'

const navigationItems: { route: Route; icon: IconName }[] = [
  { route: 'dashboard', icon: 'dashboard' },
  { route: 'vocabulary', icon: 'vocabulary' },
  { route: 'reading', icon: 'reading' },
  { route: 'writing', icon: 'writing' },
  { route: 'grammar', icon: 'grammar' },
  { route: 'progress', icon: 'progress' },
]

type SidebarProps = {
  isOpen: boolean
  currentRoute: Route
  onClose: () => void
  onNavigate: (location: Location) => void
}

export function Sidebar({
  isOpen,
  currentRoute,
  onClose,
  onNavigate,
}: SidebarProps) {
  const { state, today } = useProgress()
  const cardsWaiting = dueCount(state, today) + newAllowance(state, today)

  function go(route: Route) {
    onNavigate({ route })
    onClose()
  }

  return (
    <>
      <button
        className={`sidebar-backdrop${isOpen ? ' is-visible' : ''}`}
        type="button"
        aria-label="Dismiss navigation"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />
      <aside
        className={`sidebar${isOpen ? ' is-open' : ''}`}
        id="sidebar"
        aria-label="Main navigation"
      >
        <a
          className="brand"
          href="#/dashboard"
          aria-label="LinguaForge home"
          onClick={onClose}
        >
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" focusable="false">
              <path
                d="M7 24V8h5.4l3.6 6.1L19.6 8H25v16h-5v-8l-4 6-4-6v8H7Z"
                fill="currentColor"
              />
              <path
                d="m23.5 5 1.2 2.3L27 8.5l-2.3 1.2-1.2 2.3-1.2-2.3L20 8.5l2.3-1.2L23.5 5Z"
                fill="#F6BD65"
              />
            </svg>
          </span>
          <span className="brand-name">LinguaForge</span>
        </a>

        <p className="sidebar-label">YOUR LEARNING SPACE</p>
        <nav className="primary-nav" aria-label="Learning">
          {navigationItems.map(({ route, icon }) => {
            const isCurrent = route === currentRoute
            return (
              <button
                key={route}
                className={`nav-link${isCurrent ? ' is-active' : ''}`}
                type="button"
                aria-current={isCurrent ? 'page' : undefined}
                onClick={() => go(route)}
              >
                <Icon name={icon} />
                <span>{routeLabels[route]}</span>
                {route === 'vocabulary' && cardsWaiting > 0 && (
                  <span className="nav-count" aria-label={`${cardsWaiting} cards waiting`}>
                    {cardsWaiting}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <span className="tip-icon" aria-hidden="true">
              ✦
            </span>
            <p className="tip-eyebrow">A LITTLE REMINDER</p>
            <p>
              Kleine Schritte, <strong>starke Sprache.</strong>
            </p>
            <span className="tip-translation">Small steps, strong language.</span>
          </div>
          <button
            className={`nav-link settings-link${
              currentRoute === 'settings' ? ' is-active' : ''
            }`}
            type="button"
            aria-current={currentRoute === 'settings' ? 'page' : undefined}
            onClick={() => go('settings')}
          >
            <Icon name="settings" />
            <span>Settings</span>
          </button>
          <div className="profile">
            <div className="avatar" aria-hidden="true">
              J
            </div>
            <div className="profile-copy">
              <span className="profile-name">Jamie</span>
              <span className="profile-level">B2 → C1</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
