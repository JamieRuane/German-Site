import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { STORAGE_KEY } from './state/progressStore'

beforeEach(() => {
  window.localStorage.clear()
  window.location.hash = ''
})
afterEach(cleanup)

describe('WortWise dashboard', () => {
  it('renders the daily plan and goal from real progress', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: /ready to reach c1/i }),
    ).toBeInTheDocument()
    const goal = screen.getByRole('progressbar', { name: 'Daily learning goal' })
    expect(goal).toHaveAttribute('aria-valuenow', '0')
    expect(goal).toHaveAttribute('aria-valuemax', '30')
    expect(screen.queryByText(/sample/i)).not.toBeInTheDocument()

    const learningPlan = screen.getByRole('region', {
      name: "Today's learning plan",
    })
    expect(within(learningPlan).getAllByRole('article')).toHaveLength(4)
    expect(
      within(learningPlan).getByText('8 cards waiting: reviews and new C1 phrases.'),
    ).toBeInTheDocument()
  })

  it('opens the mobile navigation and switches modules', async () => {
    const user = userEvent.setup()
    render(<App />)

    const menuButton = screen.getByRole('button', { name: 'Open navigation' })
    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    await user.click(screen.getByRole('button', { name: 'Grammar' }))
    expect(
      screen.getByRole('heading', { level: 1, name: 'Grammar' }),
    ).toBeInTheDocument()
    expect(window.location.hash).toBe('#/grammar')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })
})

describe('vocabulary review', () => {
  it('checks a typed answer, schedules the card and saves progress', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Review vocabulary' }))
    await user.click(screen.getByRole('button', { name: /start review · 8 cards/i }))

    // First new card: "Wir sollten auch andere Lösungen in Betracht ___."
    await user.type(screen.getByRole('textbox', { name: 'Missing word' }), 'ziehen{Enter}')
    expect(screen.getByText('Richtig!')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /good/i }))
    expect(screen.getByText('7 left')).toBeInTheDocument()

    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY)!)
    expect(saved.cards['in-betracht-ziehen']).toMatchObject({ box: 1, reps: 1 })
  })
})

describe('grammar practice', () => {
  it('gives feedback with an explanation and records the score', async () => {
    const user = userEvent.setup()
    window.location.hash = '#/grammar/konjunktiv-i'
    render(<App />)

    await user.click(screen.getByRole('button', { name: /start exercises/i }))
    await user.click(screen.getByRole('button', { name: 'sei' }))
    expect(screen.getByText('Richtig!')).toBeInTheDocument()
    expect(screen.getByText(/Konjunktiv I of sein/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /next question/i }))

    await user.click(screen.getByRole('button', { name: 'haben' }))
    expect(screen.getByText('Nicht ganz.')).toBeInTheDocument()
    expect(screen.getByText('1 correct')).toBeInTheDocument()
  })
})

describe('reading', () => {
  it('glosses words and adds them to the review deck', async () => {
    const user = userEvent.setup()
    window.location.hash = '#/reading/wem-gehoert-die-stadt'
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Leerstand' }))
    const panel = screen.getByText('vacancy (empty buildings or flats)').closest('div')!
    await user.click(within(panel).getByRole('button', { name: /add to review deck/i }))
    expect(within(panel).getByText(/in your review deck/i)).toBeInTheDocument()

    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY)!)
    expect(saved.addedCards).toEqual(['leerstand'])
  })
})

describe('writing', () => {
  it('counts words live and inserts Redemittel', async () => {
    const user = userEvent.setup()
    window.location.hash = '#/writing/autofreie-innenstadt'
    render(<App />)

    const editor = screen.getByRole('textbox', { name: 'Dein Text' })
    await user.type(editor, 'Autos sind laut.')
    expect(screen.getByText('3 words')).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Zusammenfassend lässt sich sagen, dass …' }),
    )
    expect(editor).toHaveValue('Autos sind laut. Zusammenfassend lässt sich sagen, dass ')
  })
})
