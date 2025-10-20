import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CalculatorDisplay from '../CalculatorDisplay'

// Mock useEffect to avoid issues with screen reader announcements
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useEffect: vi.fn()
  }
})

describe('CalculatorDisplay Component', () => {
  it('renders current input correctly', () => {
    render(
      <CalculatorDisplay
        currentInput="123"
        operationDisplay=""
        isError={false}
      />
    )
    
    const display = screen.getByRole('textbox', { name: 'Calculator display' })
    expect(display).toBeInTheDocument()
    expect(display).toHaveTextContent('123')
  })

  it('renders operation display when provided', () => {
    render(
      <CalculatorDisplay
        currentInput="5"
        operationDisplay="10 +"
        isError={false}
      />
    )
    
    const operationDisplay = screen.getByText('10 +')
    expect(operationDisplay).toBeInTheDocument()
    expect(operationDisplay).toHaveClass('operation-display')
  })

  it('applies error styling when isError is true', () => {
    render(
      <CalculatorDisplay
        currentInput="Error"
        operationDisplay=""
        isError={true}
      />
    )
    
    const displayText = screen.getByText('Error')
    expect(displayText).toHaveClass('error')
    expect(displayText).toHaveStyle({
      color: '#dc3545',
      fontWeight: '600'
    })
  })

  it('has correct accessibility attributes', () => {
    render(
      <CalculatorDisplay
        currentInput="0"
        operationDisplay=""
        isError={false}
      />
    )
    
    const display = screen.getByRole('textbox', { name: 'Calculator display' })
    expect(display).toHaveAttribute('aria-label', 'Calculator display')
    expect(display).toHaveAttribute('tabIndex', '0')
    
    const operationDisplay = screen.getByRole('status')
    expect(operationDisplay).toHaveAttribute('aria-live', 'polite')
  })

  it('renders with default values', () => {
    render(
      <CalculatorDisplay
        currentInput="0"
        operationDisplay=""
        isError={false}
      />
    )
    
    const display = screen.getByRole('textbox')
    expect(display).toHaveTextContent('0')
  })

  it('handles long numbers correctly', () => {
    const longNumber = '123456789012'
    render(
      <CalculatorDisplay
        currentInput={longNumber}
        operationDisplay=""
        isError={false}
      />
    )
    
    const display = screen.getByRole('textbox')
    expect(display).toHaveTextContent(longNumber)
  })

  it('handles decimal numbers correctly', () => {
    render(
      <CalculatorDisplay
        currentInput="3.14159"
        operationDisplay=""
        isError={false}
      />
    )
    
    const display = screen.getByRole('textbox')
    expect(display).toHaveTextContent('3.14159')
  })
})
