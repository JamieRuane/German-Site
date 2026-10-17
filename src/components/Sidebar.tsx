import { Icon, type IconName } from './Icon'

type NavigationItem = {
  label: string
  icon: IconName
}

const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', icon: 'dashboard' },
  { label: 'Vocabulary', icon: 'vocabulary' },
  { label: 'Reading', icon: 'reading' },
  { label: 'Writing', icon: 'writing' },
  { label: 'Grammar', icon: 'grammar' },
  { label: 'Progress', icon: 'progress' },
]

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
  onMessage: (message: string) => void
}

export function Sidebar({ isOpen, onClose, onMessage }: SidebarProps) {
  function handleNavigation(label: string) {
    if (label !== 'Dashboard') {
      onMessage(
        `${label} is part of the WortWise learning plan, but isn't available yet.`,
      )
    }
    onClose()
  }

  return (
    <>
      <button
        className={`sidebar-backdrop${isOpen ? ' is-visible' : ''}`}
        type="button"
        aria-label="Dismiss navigation"
        onClick={onClose}
      />
      <aside
        className={`sidebar${isOpen ? ' is-open' : ''}`}
        id="sidebar"
        aria-label="Main navigation"
      >
        <a className="brand" href="#main-content" aria-label="LinguaForge home">
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
          {navigationItems.map(({ label, icon }) => {
            const isCurrent = label === 'Dashboard'
            return (
              <button
                key={label}
                className={`nav-link${isCurrent ? ' is-active' : ''}`}
                type="button"
                aria-current={isCurrent ? 'page' : undefined}
                onClick={() => handleNavigation(label)}
              >
                <Icon name={icon} />
                <span>{label}</span>
                {label === 'Vocabulary' && (
                  <span className="nav-count">12</span>
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
              Small steps, <strong>starke Sprache.</strong>
            </p>
            <span className="tip-translation">Small steps, strong language.</span>
          </div>
          <button
            className="nav-link settings-link"
            type="button"
            onClick={() => handleNavigation('Settings')}
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
              <span className="profile-level">B2 learner</span>
            </div>
            <span className="profile-menu" aria-hidden="true">
              ···
            </span>
          </div>
        </div>
      </aside>
    </>
  )
}
