import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

describe('WortWise dashboard', () => {
  it('renders the daily learning plan, goal, and sample progress', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: /ready to reach c1/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('progressbar', { name: 'Daily learning goal' }),
    ).toHaveAttribute('aria-valuenow', '35')
    expect(screen.getByText('All figures are sample data')).toBeInTheDocument()

    const learningPlan = screen.getByRole('region', {
      name: "Today's learning plan",
    })
    expect(within(learningPlan).getAllByRole('article')).toHaveLength(4)
    expect(
      within(learningPlan).getByText('etwas in Betracht ziehen'),
    ).toBeInTheDocument()
  })

  it('opens the mobile navigation and explains unavailable modules', async () => {
    const user = userEvent.setup()
    render(<App />)

    const menuButton = screen.getByRole('button', { name: 'Open navigation' })
    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    await user.click(screen.getByRole('button', { name: 'Grammar' }))
    expect(
      screen.getByRole('status'),
    ).toHaveTextContent(
      "Grammar is part of the WortWise learning plan, but isn't available yet.",
    )
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('shows a preview message when a learner starts an activity', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole('button', { name: 'Review vocabulary' }),
    )

    expect(screen.getByRole('status')).toHaveTextContent(
      "Vocabulary review is a preview. Learning activities aren't available yet.",
    )
  })
})
