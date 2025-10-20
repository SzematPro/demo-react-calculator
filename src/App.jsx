import React, { useState, useEffect, useCallback } from 'react'
import Calculator from './components/Calculator'
import './App.css'

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('calculator-theme') || 'light'
    } catch (error) {
      console.warn('localStorage not available, using default theme:', error)
      return 'light'
    }
  })

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    try {
      localStorage.setItem('calculator-theme', newTheme)
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error)
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="app">
      <Calculator theme={theme} onToggleTheme={toggleTheme} />
    </div>
  )
}

export default App
