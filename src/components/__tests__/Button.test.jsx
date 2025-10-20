import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from '../Button'

describe('Button Component', () => {
  it('renders number button correctly', () => {
    render(
      <Button
        type="number"
        label="5"
        ariaLabel="Five"
        onClick={vi.fn()}
      />
    )
    
    const button = screen.getByRole('button', { name: 'Five' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('5')
    expect(button).toHaveClass('btn', 'btn-number')
  })

  it('renders operator button correctly', () => {
    render(
      <Button
        type="operator"
        label="+"
        ariaLabel="Add"
        onClick={vi.fn()}
      />
    )
    
    const button = screen.getByRole('button', { name: 'Add' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('+')
    expect(button).toHaveClass('btn', 'btn-operator')
  })

  it('renders function button correctly', () => {
    render(
      <Button
        type="action"
        label="C"
        ariaLabel="Clear all"
        onClick={vi.fn()}
        action="clear"
      />
    )
    
    const button = screen.getByRole('button', { name: 'Clear all' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('C')
    expect(button).toHaveClass('btn', 'btn-function', 'btn-clear')
  })

  it('renders equals button correctly', () => {
    render(
      <Button
        type="action"
        label="="
        ariaLabel="Equals"
        onClick={vi.fn()}
        isEquals={true}
      />
    )
    
    const button = screen.getByRole('button', { name: 'Equals' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('=')
    expect(button).toHaveClass('btn', 'btn-equals')
  })

  it('renders zero button with correct classes', () => {
    render(
      <Button
        type="number"
        label="0"
        ariaLabel="Zero"
        onClick={vi.fn()}
        isZero={true}
      />
    )
    
    const button = screen.getByRole('button', { name: 'Zero' })
    expect(button).toHaveClass('btn', 'btn-number', 'btn-zero')
  })

  it('renders backspace button with icon', () => {
    render(
      <Button
        type="action"
        label=""
        ariaLabel="Backspace"
        onClick={vi.fn()}
        isBackspace={true}
      />
    )
    
    const button = screen.getByRole('button', { name: 'Backspace' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('btn', 'btn-function')
    
    const icon = button.querySelector('.backspace-icon')
    expect(icon).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const mockOnClick = vi.fn()
    render(
      <Button
        type="number"
        label="5"
        ariaLabel="Five"
        onClick={mockOnClick}
      />
    )
    
    const button = screen.getByRole('button', { name: 'Five' })
    fireEvent.click(button)
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('applies clear button styling for clear actions', () => {
    render(
      <Button
        type="action"
        label="CE"
        ariaLabel="Clear entry"
        onClick={vi.fn()}
        action="clear-entry"
      />
    )
    
    const button = screen.getByRole('button', { name: 'Clear entry' })
    expect(button).toHaveClass('btn-clear')
  })
})
