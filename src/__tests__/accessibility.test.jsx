import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import App from '../App'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
})

describe('Accessibility Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue('light')
  })

  it('has proper ARIA labels for all buttons', () => {
    render(<App />)
    
    // Check number buttons
    expect(screen.getByRole('button', { name: 'Zero' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'One' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Two' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Three' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Four' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Five' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Six' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Seven' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Eight' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Nine' })).toBeInTheDocument()
    
    // Check operator buttons
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Subtract' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Multiply' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Divide' })).toBeInTheDocument()
    
    // Check function buttons
    expect(screen.getByRole('button', { name: 'Clear all' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear entry' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Backspace' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Decimal point' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Equals' })).toBeInTheDocument()
    
    // Check theme toggle
    expect(screen.getByRole('button', { name: 'Toggle dark/light mode' })).toBeInTheDocument()
  }, 15000)

  it('has proper roles for calculator elements', () => {
    render(<App />)
    
    // Display should be a textbox
    expect(screen.getByRole('textbox', { name: 'Calculator display' })).toBeInTheDocument()
    
    // Buttons should be in a grid
    expect(screen.getByRole('grid', { name: 'Calculator buttons' })).toBeInTheDocument()
    
    // Operation display should be live region
    const operationDisplay = screen.getByRole('status')
    expect(operationDisplay).toHaveAttribute('aria-live', 'polite')
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Test keyboard input
    await user.keyboard('5+3=')
    expect(screen.getByRole('textbox')).toHaveTextContent('8')
    
    // Test escape to clear
    await user.keyboard('{Escape}')
    expect(screen.getByRole('textbox')).toHaveTextContent('0')
    
    // Test backspace
    await user.keyboard('123{Backspace}')
    expect(screen.getByRole('textbox')).toHaveTextContent('12')
  })

  it('has proper focus management', () => {
    render(<App />)
    
    const display = screen.getByRole('textbox', { name: 'Calculator display' })
    expect(display).toHaveAttribute('tabIndex', '0')
  })

  it('has proper semantic structure', () => {
    render(<App />)
    
    // Check for proper heading
    expect(screen.getByRole('heading', { name: 'Calculator' })).toBeInTheDocument()
    
    // Check for main content area
    expect(screen.getByRole('main')).toBeInTheDocument()
    
    // Check for header
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('provides screen reader announcements', () => {
    render(<App />)
    
    // The display should have proper ARIA attributes
    const display = screen.getByRole('textbox', { name: 'Calculator display' })
    expect(display).toHaveAttribute('aria-label', 'Calculator display')
    
    // Operation display should be a live region
    const operationDisplay = screen.getByRole('status')
    expect(operationDisplay).toHaveAttribute('aria-live', 'polite')
  })

  it('has proper button types', () => {
    render(<App />)
    
    // All buttons should have type="button"
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveAttribute('type', 'button')
    })
  })

  it('supports high contrast mode', () => {
    render(<App />)
    
    // Check that buttons have proper contrast classes
    const clearButton = screen.getByRole('button', { name: 'Clear all' })
    expect(clearButton).toHaveClass('btn-clear')
    
    const equalsButton = screen.getByRole('button', { name: 'Equals' })
    expect(equalsButton).toHaveClass('btn-equals')
  })

  it('handles error states with proper accessibility', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Trigger division by zero error
    await user.keyboard('5/0=')
    
    // Error should be displayed with proper styling
    const display = screen.getByRole('textbox')
    expect(display).toHaveTextContent('Cannot divide by zero')
    
    // Error should have proper color contrast
    const displayText = display.querySelector('.display-text')
    expect(displayText).toHaveClass('error')
  })

  it('supports reduced motion preferences', () => {
    render(<App />)
    
    // Check that buttons have transition classes that can be overridden
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveClass('btn')
    })
  })

  it('has proper form semantics', () => {
    render(<App />)
    
    // Calculator should be treated as a form-like interface
    const display = screen.getByRole('textbox', { name: 'Calculator display' })
    expect(display).toBeInTheDocument()
    
    // All interactive elements should be focusable
    const interactiveElements = screen.getAllByRole('button')
    interactiveElements.forEach(element => {
      expect(element).not.toHaveAttribute('disabled')
    })
  })
})
