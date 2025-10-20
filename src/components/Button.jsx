import React from 'react'

const Button = ({ 
  type, 
  label, 
  ariaLabel, 
  onClick, 
  isZero = false, 
  isEquals = false, 
  isBackspace = false,
  action
}) => {
  const getButtonClass = () => {
    let baseClass = 'btn'
    
    if (type === 'number') {
      baseClass += ' btn-number'
      if (isZero) baseClass += ' btn-zero'
    } else if (type === 'operator') {
      baseClass += ' btn-operator'
    } else if (type === 'action') {
      if (isEquals) {
        baseClass += ' btn-equals'
      } else if (action === 'clear' || action === 'clear-entry') {
        baseClass += ' btn-function btn-clear'
      } else {
        baseClass += ' btn-function'
      }
    }
    
    return baseClass
  }

  return (
    <button
      className={getButtonClass()}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
    >
      {isBackspace ? (
        <span className="backspace-icon"></span>
      ) : (
        label
      )}
    </button>
  )
}

export default Button
