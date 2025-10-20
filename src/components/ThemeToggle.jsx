import React from 'react'

const ThemeToggle = ({ theme, onToggle }) => {
  const themeIcon = theme === 'light' ? '🌙' : '☀️'

  return (
    <button 
      className="theme-toggle btn" 
      onClick={onToggle}
      aria-label="Toggle dark/light mode"
      title="Toggle theme"
      type="button"
    >
      <span className="theme-icon">{themeIcon}</span>
    </button>
  )
}

export default ThemeToggle
