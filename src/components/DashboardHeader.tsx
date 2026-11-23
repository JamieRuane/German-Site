import type { RefObject } from 'react'
import { Icon } from './Icon'

type DashboardHeaderProps = {
  pageLabel: string
  dateLabel: string
  pendingCount: number
  isSidebarOpen: boolean
  menuToggleRef: RefObject<HTMLButtonElement | null>
  onMenuToggle: () => void
  onNotification: () => void
}

export function DashboardHeader({
  pageLabel,
  dateLabel,
  pendingCount,
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
        <strong>{pageLabel}</strong>
      </div>
      <div className="topbar-right">
        <span className="today-date">
          <span className="date-dot" aria-hidden="true" />
          {dateLabel}
        </span>
        <button
          className="icon-button notification-button"
          type="button"
          aria-label={
            pendingCount > 0
              ? `Notifications — ${pendingCount} cards due`
              : 'Notifications — nothing due'
          }
          onClick={onNotification}
        >
          <Icon name="notification" />
          {pendingCount > 0 && (
            <span className="notification-dot" aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  )
}
