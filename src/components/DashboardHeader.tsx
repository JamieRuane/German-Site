import type { RefObject } from 'react'
import { Icon } from './Icon'

type DashboardHeaderProps = {
  isSidebarOpen: boolean
  menuToggleRef: RefObject<HTMLButtonElement | null>
  onMenuToggle: () => void
  onNotification: () => void
}

export function DashboardHeader({
  isSidebarOpen,
  menuToggleRef,
  onMenuToggle,
  onNotification,
}: DashboardHeaderProps) {
  return (
    <header className="topbar">
      <button
        ref={menuToggleRef}
        className="menu-toggle"
        type="button"
        aria-label={isSidebarOpen ? 'Close navigation' : 'Open navigation'}
        aria-controls="sidebar"
        aria-expanded={isSidebarOpen}
        onClick={onMenuToggle}
      >
        <Icon name="menu" />
      </button>
      <div className="breadcrumb">
        <span>YOUR SPACE</span>
        <span className="breadcrumb-divider">/</span>
        <strong>Dashboard</strong>
      </div>
      <div className="topbar-right">
        <span className="today-date">
          <span className="date-dot" aria-hidden="true" />
          Saturday, October 17
        </span>
        <button
          className="icon-button notification-button"
          type="button"
          aria-label="Notifications — no new notifications"
          onClick={onNotification}
        >
          <Icon name="notification" />
          <span className="notification-dot" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
