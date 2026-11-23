import { useCallback, useEffect, useState } from 'react'

export const routes = [
  'dashboard',
  'vocabulary',
  'reading',
  'writing',
  'grammar',
  'progress',
  'settings',
] as const

export type Route = (typeof routes)[number]

export type Location = {
  route: Route
  /** Optional item inside a module, e.g. a reading or grammar topic id. */
  param?: string
}

export const routeLabels: Record<Route, string> = {
  dashboard: 'Dashboard',
  vocabulary: 'Vocabulary',
  reading: 'Reading',
  writing: 'Writing',
  grammar: 'Grammar',
  progress: 'Progress',
  settings: 'Settings',
}

export function parseHash(hash: string): Location {
  const [name, param] = hash.replace(/^#\/?/, '').split('/')
  const route = (routes as readonly string[]).includes(name)
    ? (name as Route)
    : 'dashboard'
  return param ? { route, param: decodeURIComponent(param) } : { route }
}

export function toHash({ route, param }: Location): string {
  return param ? `#/${route}/${encodeURIComponent(param)}` : `#/${route}`
}

/** Minimal hash router so modules are linkable and the back button works. */
export function useHashLocation(): [Location, (next: Location) => void] {
  const [location, setLocation] = useState(() => parseHash(window.location.hash))

  useEffect(() => {
    function handleHashChange() {
      setLocation(parseHash(window.location.hash))
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = useCallback((next: Location) => {
    const hash = toHash(next)
    if (window.location.hash !== hash) {
      window.location.hash = hash
    }
    setLocation(next)
  }, [])

  return [location, navigate]
}
