import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ThemeToggle from '../ThemeToggle'

describe('ThemeToggle Component', () => {
  it('renders light theme icon when theme is light', () => {
    const mockOnToggle = vi.fn()
    render(<ThemeToggle theme="light" onToggle={mockOnToggle} />)
    
    const button = screen.getByRole('button', { name: 'Toggle dark/light mode' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('title', 'Toggle theme')
    
    const icon = screen.getByText('🌙')
    expect(icon).toBeInTheDocument()
  })

  it('renders dark theme icon when theme is dark', () => {
    const mockOnToggle = vi.fn()
    render(<ThemeToggle theme="dark" onToggle={mockOnToggle} />)
    
    const button = screen.getByRole('button', { name: 'Toggle dark/light mode' })
    expect(button).toBeInTheDocument()
    
    const icon = screen.getByText('☀️')
    expect(icon).toBeInTheDocument()
  })

  it('calls onToggle when clicked', () => {
    const mockOnToggle = vi.fn()
    render(<ThemeToggle theme="light" onToggle={mockOnToggle} />)
    
    const button = screen.getByRole('button', { name: 'Toggle dark/light mode' })
    fireEvent.click(button)
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1)
  })

  it('has correct accessibility attributes', () => {
    const mockOnToggle = vi.fn()
    render(<ThemeToggle theme="light" onToggle={mockOnToggle} />)
    
    const button = screen.getByRole('button', { name: 'Toggle dark/light mode' })
    expect(button).toHaveAttribute('aria-label', 'Toggle dark/light mode')
    expect(button).toHaveAttribute('title', 'Toggle theme')
    expect(button).toHaveAttribute('type', 'button')
  })
})
