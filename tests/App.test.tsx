import { it, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

  describe('App component', () => {
    it('renders correct headings', () => {
      render(<App title=our first test />)
      expect(screen.getByRole('heading').textContent).toMatch(/our first test/i)
    })
  })
