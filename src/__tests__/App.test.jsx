import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
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

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue('light')
  })

  it('renders calculator with light theme by default', () => {
    render(<App />)
    
    expect(screen.getByText('Calculator')).toBeInTheDocument()
    expect(screen.getByText('🌙')).toBeInTheDocument() // Light theme shows moon icon
  })

  it('loads theme from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('dark')
    render(<App />)
    
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('calculator-theme')
    expect(screen.getByText('☀️')).toBeInTheDocument() // Dark theme shows sun icon
  })

  it('uses light theme as fallback when localStorage is empty', () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    render(<App />)
    
    expect(screen.getByText('🌙')).toBeInTheDocument()
  })

  it('toggles theme and saves to localStorage', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const themeToggle = screen.getByRole('button', { name: 'Toggle dark/light mode' })
    
    // Initially light theme
    expect(screen.getByText('🌙')).toBeInTheDocument()
    
    // Click to toggle to dark
    await user.click(themeToggle)
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('calculator-theme', 'dark')
    expect(screen.getByText('☀️')).toBeInTheDocument()
    
    // Click again to toggle back to light
    await user.click(themeToggle)
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('calculator-theme', 'light')
    expect(screen.getByText('🌙')).toBeInTheDocument()
  })

  it('sets data-theme attribute on document element', () => {
    render(<App />)
    
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
  })

  it('updates data-theme attribute when theme changes', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    
    const themeToggle = screen.getByRole('button', { name: 'Toggle dark/light mode' })
    await user.click(themeToggle)
    
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('renders calculator with all functionality', () => {
    render(<App />)
    
    // Check that calculator is fully functional
    expect(screen.getByRole('textbox', { name: 'Calculator display' })).toBeInTheDocument()
    expect(screen.getByRole('grid', { name: 'Calculator buttons' })).toBeInTheDocument()
    expect(screen.getByText('💡 Use keyboard for faster input')).toBeInTheDocument()
  })

  it('handles theme persistence across re-renders', () => {
    mockLocalStorage.getItem.mockReturnValue('dark')
    
    const { rerender } = render(<App />)
    expect(screen.getByText('☀️')).toBeInTheDocument()
    
    // Re-render the component
    rerender(<App />)
    
    expect(screen.getByText('☀️')).toBeInTheDocument()
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('calculator-theme')
  })
})
