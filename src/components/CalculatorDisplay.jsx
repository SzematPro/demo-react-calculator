import React, { useEffect, useRef } from 'react'

const CalculatorDisplay = ({ currentInput, operationDisplay, isError }) => {
  const displayRef = useRef(null)
  const timeoutRef = useRef(null)

  // Announce changes to screen readers
  useEffect(() => {
    if (displayRef.current && typeof document !== 'undefined') {
      const announcement = document.createElement('div')
      announcement.setAttribute('aria-live', 'polite')
      announcement.setAttribute('aria-atomic', 'true')
      announcement.className = 'sr-only'
      announcement.textContent = currentInput
      
      document.body.appendChild(announcement)
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        if (typeof document !== 'undefined' && document.body && document.body.contains(announcement)) {
          document.body.removeChild(announcement)
        }
      }, 1000)
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentInput])

  return (
    <div className="display-container">
      <div 
        className="display" 
        role="textbox" 
        aria-label="Calculator display" 
        tabIndex="0"
        ref={displayRef}
      >
        <span 
          className={`display-text ${isError ? 'error' : ''}`}
          style={{
            color: isError ? '#dc3545' : '',
            fontWeight: isError ? '600' : ''
          }}
        >
          {currentInput}
        </span>
      </div>
      <div className="operation-display" aria-live="polite" role="status">
        {operationDisplay}
      </div>
    </div>
  )
}

export default CalculatorDisplay
