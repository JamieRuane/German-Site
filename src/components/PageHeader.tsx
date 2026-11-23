import type { ReactNode } from 'react'

type PageHeaderProps = {
  eyebrow: string
  title: string
  children?: ReactNode
  onBack?: () => void
  backLabel?: string
}

export function PageHeader({
  eyebrow,
  title,
  children,
  onBack,
  backLabel = 'Back',
}: PageHeaderProps) {
  return (
    <header className="page-header">
      {onBack && (
        <button className="back-button" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> {backLabel}
        </button>
      )}
      <div className="eyebrow">{eyebrow}</div>
      <h1 tabIndex={-1}>{title}</h1>
      {children && <div className="page-intro">{children}</div>}
    </header>
  )
}
