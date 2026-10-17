import type { ReactNode } from 'react'

export type IconName =
  | 'dashboard'
  | 'vocabulary'
  | 'reading'
  | 'writing'
  | 'grammar'
  | 'progress'
  | 'settings'
  | 'clock'
  | 'menu'
  | 'notification'

const iconPaths: Record<IconName, ReactNode> = {
  dashboard: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="5" rx="1.5" />
      <rect x="13.5" y="12.5" width="7" height="8" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    </>
  ),
  vocabulary: (
    <>
      <path d="M5 4.5h10a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3v-12Z" />
      <path d="M18 19.5h1a1 1 0 0 0 1-1v-11a3 3 0 0 0-3-3h-2M8 9h6m-6 4h6" />
    </>
  ),
  reading: (
    <>
      <path d="M12 6.5c-2.7-2-5.7-2-9-1v13c3.3-1 6.3-1 9 1m0-13c2.7-2 5.7-2 9-1v13c-3.3-1-6.3-1-9 1m0-13v13" />
    </>
  ),
  writing: (
    <>
      <path d="m14 5 5 5M4 20l4.2-.8L19 8.4a2.1 2.1 0 0 0-3-3L5.2 16.2 4 20Z" />
      <path d="M12 20h8" />
    </>
  ),
  grammar: (
    <>
      <path d="M5 5h14M5 12h14M5 19h14M8 3v4m8 3v4m-5 3v4" />
    </>
  ),
  progress: (
    <>
      <path d="M4 19V9m5 10V5m5 14v-7m5 7V3" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="m19.4 15 .1.1a1.7 1.7 0 1 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 1 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 1 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 1 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 1 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V4a1.7 1.7 0 1 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 1 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 1 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2.9Z" />
    </>
  ),
  clock: (
    <>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 6v4l2.5 1.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  notification: (
    <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4" />
  ),
}

type IconProps = {
  name: IconName
  className?: string
}

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox={name === 'clock' ? '0 0 20 20' : '0 0 24 24'}
      fill="none"
      focusable="false"
    >
      {iconPaths[name]}
    </svg>
  )
}
