import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Calculator from '../Calculator'

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

describe('Calculator Integration Tests', () => {
  const mockTheme = 'light'
  const mockOnToggleTheme = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue('light')
  })

  it('renders calculator with all components', () => {
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    expect(screen.getByText('Calculator')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Calculator display' })).toBeInTheDocument()
    expect(screen.getByRole('grid', { name: 'Calculator buttons' })).toBeInTheDocument()
    expect(screen.getByText('💡 Use keyboard for faster input')).toBeInTheDocument()
  })

  it('performs basic arithmetic operations', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Test addition: 2 + 3 = 5
    await user.click(screen.getByRole('button', { name: 'Two' }))
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await user.click(screen.getByRole('button', { name: 'Three' }))
    await user.click(screen.getByRole('button', { name: 'Equals' }))
    
    expect(screen.getByRole('textbox')).toHaveTextContent('5')
  }, 10000)

  it('performs subtraction correctly', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Test subtraction: 10 - 4 = 6
    await user.click(screen.getByRole('button', { name: 'One' }))
    await user.click(screen.getByRole('button', { name: 'Zero' }))
    await user.click(screen.getByRole('button', { name: 'Subtract' }))
    await user.click(screen.getByRole('button', { name: 'Four' }))
    await user.click(screen.getByRole('button', { name: 'Equals' }))
    
    expect(screen.getByRole('textbox')).toHaveTextContent('6')
  })

  it('performs multiplication correctly', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Test multiplication: 7 × 8 = 56
    await user.click(screen.getByRole('button', { name: 'Seven' }))
    await user.click(screen.getByRole('button', { name: 'Multiply' }))
    await user.click(screen.getByRole('button', { name: 'Eight' }))
    await user.click(screen.getByRole('button', { name: 'Equals' }))
    
    expect(screen.getByRole('textbox')).toHaveTextContent('56')
  })

  it('performs division correctly', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Test division: 15 ÷ 3 = 5
    await user.click(screen.getByRole('button', { name: 'One' }))
    await user.click(screen.getByRole('button', { name: 'Five' }))
    await user.click(screen.getByRole('button', { name: 'Divide' }))
    await user.click(screen.getByRole('button', { name: 'Three' }))
    await user.click(screen.getByRole('button', { name: 'Equals' }))
    
    expect(screen.getByRole('textbox')).toHaveTextContent('5')
  })

  it('handles decimal operations correctly', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Test decimal: 3.14 + 2.86 = 6
    await user.click(screen.getByRole('button', { name: 'Three' }))
    await user.click(screen.getByRole('button', { name: 'Decimal point' }))
    await user.click(screen.getByRole('button', { name: 'One' }))
    await user.click(screen.getByRole('button', { name: 'Four' }))
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await user.click(screen.getByRole('button', { name: 'Two' }))
    await user.click(screen.getByRole('button', { name: 'Decimal point' }))
    await user.click(screen.getByRole('button', { name: 'Eight' }))
    await user.click(screen.getByRole('button', { name: 'Six' }))
    await user.click(screen.getByRole('button', { name: 'Equals' }))
    
    expect(screen.getByRole('textbox')).toHaveTextContent('6')
  })

  it('handles division by zero error', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Test division by zero: 5 ÷ 0 = Error
    await user.click(screen.getByRole('button', { name: 'Five' }))
    await user.click(screen.getByRole('button', { name: 'Divide' }))
    await user.click(screen.getByRole('button', { name: 'Zero' }))
    await user.click(screen.getByRole('button', { name: 'Equals' }))
    
    expect(screen.getByRole('textbox')).toHaveTextContent('Cannot divide by zero')
  })

  it('clears calculator state with C button', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Enter some numbers
    await user.click(screen.getByRole('button', { name: 'One' }))
    await user.click(screen.getByRole('button', { name: 'Two' }))
    await user.click(screen.getByRole('button', { name: 'Three' }))
    
    expect(screen.getByRole('textbox')).toHaveTextContent('123')
    
    // Clear all
    await user.click(screen.getByRole('button', { name: 'Clear all' }))
    
    expect(screen.getByRole('textbox')).toHaveTextContent('0')
  })

  it('clears current entry with CE button', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Enter some numbers
    await user.click(screen.getByRole('button', { name: 'One' }))
    await user.click(screen.getByRole('button', { name: 'Two' }))
    await user.click(screen.getByRole('button', { name: 'Three' }))
    
    expect(screen.getByRole('textbox')).toHaveTextContent('123')
    
    // Clear entry
    await user.click(screen.getByRole('button', { name: 'Clear entry' }))
    
    expect(screen.getByRole('textbox')).toHaveTextContent('0')
  })

  it('handles backspace correctly', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Enter some numbers
    await user.click(screen.getByRole('button', { name: 'One' }))
    await user.click(screen.getByRole('button', { name: 'Two' }))
    await user.click(screen.getByRole('button', { name: 'Three' }))
    
    expect(screen.getByRole('textbox')).toHaveTextContent('123')
    
    // Backspace
    await user.click(screen.getByRole('button', { name: 'Backspace' }))
    
    expect(screen.getByRole('textbox')).toHaveTextContent('12')
  })

  it('handles keyboard input correctly', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Test keyboard input: 5 + 3 = 8
    await user.keyboard('5+3=')
    
    expect(screen.getByRole('textbox')).toHaveTextContent('8')
  })

  it('handles keyboard escape to clear', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Enter some numbers
    await user.keyboard('123')
    expect(screen.getByRole('textbox')).toHaveTextContent('123')
    
    // Press Escape to clear
    await user.keyboard('{Escape}')
    
    expect(screen.getByRole('textbox')).toHaveTextContent('0')
  })

  it('handles keyboard backspace', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Enter some numbers
    await user.keyboard('123')
    expect(screen.getByRole('textbox')).toHaveTextContent('123')
    
    // Press Backspace
    await user.keyboard('{Backspace}')
    
    expect(screen.getByRole('textbox')).toHaveTextContent('12')
  })

  it('enforces 12-digit limit', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Try to enter 13 digits
    await user.keyboard('1234567890123')
    
    // Should only accept 12 digits
    expect(screen.getByRole('textbox')).toHaveTextContent('123456789012')
  })

  it('handles multiple operations in sequence', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Test: 2 + 3 × 4 = 20 (should follow order of operations)
    await user.keyboard('2+3*4=')
    
    // Note: This calculator doesn't follow order of operations, it calculates left to right
    // So 2 + 3 × 4 = (2 + 3) × 4 = 5 × 4 = 20
    expect(screen.getByRole('textbox')).toHaveTextContent('20')
  })

  it('displays operation in operation display', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Enter first number and operator
    await user.click(screen.getByRole('button', { name: 'Five' }))
    await user.click(screen.getByRole('button', { name: 'Add' }))
    
    // Check operation display
    expect(screen.getByText('5 +')).toBeInTheDocument()
  })

  it('handles theme toggle', async () => {
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    const themeToggle = screen.getByRole('button', { name: 'Toggle dark/light mode' })
    await userEvent.click(themeToggle)
    
    expect(mockOnToggleTheme).toHaveBeenCalledTimes(1)
  })

  it('auto-clears error after timeout', async () => {
    const user = userEvent.setup()
    render(<Calculator theme={mockTheme} onToggleTheme={mockOnToggleTheme} />)
    
    // Trigger division by zero error
    await user.keyboard('5/0=')
    
    expect(screen.getByRole('textbox')).toHaveTextContent('Cannot divide by zero')
    
    // Wait for auto-clear (2 seconds)
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveTextContent('0')
    }, { timeout: 3000 })
  })
})
