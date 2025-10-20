import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CalculatorButtons from '../CalculatorButtons'

describe('CalculatorButtons Component', () => {
  const mockProps = {
    onNumberClick: vi.fn(),
    onOperatorClick: vi.fn(),
    onActionClick: {
      clear: vi.fn(),
      'clear-entry': vi.fn(),
      backspace: vi.fn(),
      decimal: vi.fn(),
      equals: vi.fn()
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all calculator buttons', () => {
    render(<CalculatorButtons {...mockProps} />)
    
    // Check for number buttons
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
    
    // Check for operator buttons
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Subtract' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Multiply' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Divide' })).toBeInTheDocument()
    
    // Check for action buttons
    expect(screen.getByRole('button', { name: 'Clear all' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear entry' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Backspace' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Decimal point' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Equals' })).toBeInTheDocument()
  }, 10000)

  it('calls onNumberClick when number button is clicked', () => {
    render(<CalculatorButtons {...mockProps} />)
    
    const button5 = screen.getByRole('button', { name: 'Five' })
    fireEvent.click(button5)
    
    expect(mockProps.onNumberClick).toHaveBeenCalledWith('5')
  })

  it('calls onOperatorClick when operator button is clicked', () => {
    render(<CalculatorButtons {...mockProps} />)
    
    const addButton = screen.getByRole('button', { name: 'Add' })
    fireEvent.click(addButton)
    
    expect(mockProps.onOperatorClick).toHaveBeenCalledWith('+')
  })

  it('calls correct action when action button is clicked', () => {
    render(<CalculatorButtons {...mockProps} />)
    
    const clearButton = screen.getByRole('button', { name: 'Clear all' })
    fireEvent.click(clearButton)
    
    expect(mockProps.onActionClick.clear).toHaveBeenCalledTimes(1)
  })

  it('calls equals action when equals button is clicked', () => {
    render(<CalculatorButtons {...mockProps} />)
    
    const equalsButton = screen.getByRole('button', { name: 'Equals' })
    fireEvent.click(equalsButton)
    
    expect(mockProps.onActionClick.equals).toHaveBeenCalledTimes(1)
  })

  it('calls decimal action when decimal button is clicked', () => {
    render(<CalculatorButtons {...mockProps} />)
    
    const decimalButton = screen.getByRole('button', { name: 'Decimal point' })
    fireEvent.click(decimalButton)
    
    expect(mockProps.onActionClick.decimal).toHaveBeenCalledTimes(1)
  })

  it('calls backspace action when backspace button is clicked', () => {
    render(<CalculatorButtons {...mockProps} />)
    
    const backspaceButton = screen.getByRole('button', { name: 'Backspace' })
    fireEvent.click(backspaceButton)
    
    expect(mockProps.onActionClick.backspace).toHaveBeenCalledTimes(1)
  })

  it('calls clear-entry action when CE button is clicked', () => {
    render(<CalculatorButtons {...mockProps} />)
    
    const clearEntryButton = screen.getByRole('button', { name: 'Clear entry' })
    fireEvent.click(clearEntryButton)
    
    expect(mockProps.onActionClick['clear-entry']).toHaveBeenCalledTimes(1)
  })

  it('has correct accessibility attributes', () => {
    render(<CalculatorButtons {...mockProps} />)
    
    const container = screen.getByRole('grid', { name: 'Calculator buttons' })
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('buttons-container')
  })

  it('renders backspace button with icon', () => {
    render(<CalculatorButtons {...mockProps} />)
    
    const backspaceButton = screen.getByRole('button', { name: 'Backspace' })
    const icon = backspaceButton.querySelector('.backspace-icon')
    expect(icon).toBeInTheDocument()
  })

  it('renders zero button with correct classes', () => {
    render(<CalculatorButtons {...mockProps} />)
    
    const zeroButton = screen.getByRole('button', { name: 'Zero' })
    expect(zeroButton).toHaveClass('btn-zero')
  })
})
