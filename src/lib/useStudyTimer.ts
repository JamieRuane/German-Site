import { useEffect, useRef } from 'react'

const TICK_SECONDS = 15
const IDLE_AFTER_MS = 120_000

/**
 * Counts study time while `active` is true, the tab is visible and the learner
 * has interacted in the last two minutes. Reports in 15-second steps.
 */
export function useStudyTimer(
  active: boolean,
  onTick: (seconds: number) => void,
): void {
  const lastInteraction = useRef(0)
  const tickRef = useRef(onTick)

  useEffect(() => {
    tickRef.current = onTick
  }, [onTick])

  useEffect(() => {
    if (!active) return
    lastInteraction.current = Date.now()

    function markInteraction() {
      lastInteraction.current = Date.now()
    }
    const events = ['pointerdown', 'keydown', 'scroll', 'input'] as const
    for (const event of events) {
      window.addEventListener(event, markInteraction, { passive: true })
    }

    const id = window.setInterval(() => {
      const visible = document.visibilityState === 'visible'
      const recent = Date.now() - lastInteraction.current < IDLE_AFTER_MS
      if (visible && recent) tickRef.current(TICK_SECONDS)
    }, TICK_SECONDS * 1000)

    return () => {
      window.clearInterval(id)
      for (const event of events) {
        window.removeEventListener(event, markInteraction)
      }
    }
  }, [active])
}
