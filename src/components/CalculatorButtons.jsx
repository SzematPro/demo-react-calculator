import React from 'react'
import Button from './Button'

const CalculatorButtons = ({ onNumberClick, onOperatorClick, onActionClick }) => {
  const buttonConfig = [
    // Row 1: Clear and operations
    { type: 'action', action: 'clear', label: 'C', ariaLabel: 'Clear all' },
    { type: 'action', action: 'clear-entry', label: 'CE', ariaLabel: 'Clear entry' },
    { type: 'action', action: 'backspace', label: '', ariaLabel: 'Backspace', isBackspace: true },
    { type: 'operator', operator: '÷', label: '÷', ariaLabel: 'Divide' },
    
    // Row 2: Numbers 7-9 and multiply
    { type: 'number', number: '7', label: '7', ariaLabel: 'Seven' },
    { type: 'number', number: '8', label: '8', ariaLabel: 'Eight' },
    { type: 'number', number: '9', label: '9', ariaLabel: 'Nine' },
    { type: 'operator', operator: '×', label: '×', ariaLabel: 'Multiply' },
    
    // Row 3: Numbers 4-6 and subtract
    { type: 'number', number: '4', label: '4', ariaLabel: 'Four' },
    { type: 'number', number: '5', label: '5', ariaLabel: 'Five' },
    { type: 'number', number: '6', label: '6', ariaLabel: 'Six' },
    { type: 'operator', operator: '−', label: '−', ariaLabel: 'Subtract' },
    
    // Row 4: Numbers 1-3 and add
    { type: 'number', number: '1', label: '1', ariaLabel: 'One' },
    { type: 'number', number: '2', label: '2', ariaLabel: 'Two' },
    { type: 'number', number: '3', label: '3', ariaLabel: 'Three' },
    { type: 'operator', operator: '+', label: '+', ariaLabel: 'Add' },
    
    // Row 5: Zero, decimal, and equals
    { type: 'number', number: '0', label: '0', ariaLabel: 'Zero', isZero: true },
    { type: 'action', action: 'decimal', label: '.', ariaLabel: 'Decimal point' },
    { type: 'action', action: 'equals', label: '=', ariaLabel: 'Equals', isEquals: true }
  ]

  const handleClick = (button) => {
    switch (button.type) {
      case 'number':
        onNumberClick(button.number)
        break
      case 'operator':
        onOperatorClick(button.operator)
        break
      case 'action':
        onActionClick[button.action]()
        break
    }
  }

  return (
    <div className="buttons-container" role="grid" aria-label="Calculator buttons">
      {buttonConfig.map((button, index) => (
        <Button
          key={index}
          {...button}
          onClick={() => handleClick(button)}
        />
      ))}
    </div>
  )
}

export default CalculatorButtons
