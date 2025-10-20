import React, { useState, useEffect, useCallback } from 'react'
import CalculatorDisplay from './CalculatorDisplay'
import CalculatorButtons from './CalculatorButtons'
import ThemeToggle from './ThemeToggle'

const Calculator = ({ theme, onToggleTheme }) => {
  // Calculator state
  const [currentInput, setCurrentInput] = useState('0')
  const [previousInput, setPreviousInput] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [isError, setIsError] = useState(false)
  const [hasDecimal, setHasDecimal] = useState(false)
  const [decimalPlaces, setDecimalPlaces] = useState(0)

  const maxDigits = 12

  // Format result with proper precision
  const formatResult = useCallback((result) => {
    if (!isFinite(result)) {
      return 'Error'
    }
    
    // Handle very large or very small numbers
    if (Math.abs(result) >= Math.pow(10, maxDigits)) {
      return result.toExponential(6)
    }
    
    // Round to avoid floating point precision issues
    const rounded = Math.round(result * Math.pow(10, 10)) / Math.pow(10, 10)
    
    // Format as string with appropriate precision
    let formatted = rounded.toString()
    
    // Remove trailing zeros and decimal point if not needed
    if (formatted.includes('.')) {
      formatted = formatted.replace(/\.?0+$/, '')
    }
    
    // Check length and truncate if necessary
    if (formatted.length > maxDigits) {
      const integerPart = Math.floor(Math.abs(rounded)).toString()
      const availableDecimals = maxDigits - integerPart.length
      
      if (availableDecimals > 0) {
        formatted = rounded.toFixed(availableDecimals).replace(/\.?0+$/, '')
      } else {
        formatted = Math.round(rounded).toString()
      }
    }
    
    return formatted
  }, [maxDigits])

  // Get current display length
  const getDisplayLength = useCallback(() => {
    return currentInput.replace(/\./g, '').length
  }, [currentInput])

  // Show error message
  const showError = useCallback((message) => {
    setIsError(true)
    setCurrentInput(message)
    
    // Auto-clear error after 2 seconds
    setTimeout(() => {
      setIsError(false)
      setCurrentInput('0')
      setPreviousInput(null)
      setOperator(null)
      setWaitingForOperand(false)
      setHasDecimal(false)
      setDecimalPlaces(0)
    }, 2000)
  }, [])

  // Clear all calculator state
  const clear = useCallback(() => {
    setCurrentInput('0')
    setPreviousInput(null)
    setOperator(null)
    setWaitingForOperand(false)
    setIsError(false)
    setHasDecimal(false)
    setDecimalPlaces(0)
  }, [])

  // Clear current entry
  const clearEntry = useCallback(() => {
    setCurrentInput('0')
    setHasDecimal(false)
    setDecimalPlaces(0)
  }, [])

  // Handle backspace
  const backspace = useCallback(() => {
    if (isError) {
      clear()
      return
    }
    
    if (currentInput.length > 1) {
      const lastChar = currentInput.slice(-1)
      const newInput = currentInput.slice(0, -1)
      setCurrentInput(newInput)
      
      if (lastChar === '.') {
        setHasDecimal(false)
        setDecimalPlaces(0)
      } else if (hasDecimal) {
        setDecimalPlaces(Math.max(0, decimalPlaces - 1))
      }
    } else {
      setCurrentInput('0')
      setHasDecimal(false)
      setDecimalPlaces(0)
    }
  }, [currentInput, isError, hasDecimal, decimalPlaces, clear])

  // Input a number
  const inputNumber = useCallback((number) => {
    if (isError) {
      clear()
    }
    
    if (waitingForOperand) {
      setCurrentInput(number)
      setWaitingForOperand(false)
      setHasDecimal(false)
      setDecimalPlaces(0)
    } else {
      if (currentInput === '0') {
        setCurrentInput(number)
      } else if (getDisplayLength() < maxDigits) {
        setCurrentInput(prev => prev + number)
      }
    }
  }, [isError, waitingForOperand, currentInput, getDisplayLength, maxDigits, clear])

  // Input decimal point
  const inputDecimal = useCallback(() => {
    if (isError) {
      clear()
    }
    
    if (waitingForOperand) {
      setCurrentInput('0.')
      setWaitingForOperand(false)
      setHasDecimal(true)
      setDecimalPlaces(0)
    } else if (!hasDecimal && getDisplayLength() < maxDigits) {
      setCurrentInput(prev => prev + '.')
      setHasDecimal(true)
    }
  }, [isError, waitingForOperand, hasDecimal, getDisplayLength, maxDigits, clear])

  // Input an operator
  const inputOperator = useCallback((op) => {
    if (isError) {
      return
    }
    
    const inputValue = parseFloat(currentInput)
    
    if (previousInput === null) {
      setPreviousInput(inputValue)
    } else if (operator) {
      const result = calculate()
      if (result !== null) {
        setCurrentInput(formatResult(result))
        setPreviousInput(result)
      }
    } else {
      setPreviousInput(inputValue)
    }
    
    setWaitingForOperand(true)
    setOperator(op)
  }, [isError, currentInput, previousInput, operator, formatResult])

  // Perform calculation
  const calculate = useCallback(() => {
    if (isError || operator === null || previousInput === null) {
      return null
    }
    
    const prev = previousInput
    const current = parseFloat(currentInput)
    let result
    
    try {
      switch (operator) {
        case '+':
          result = prev + current
          break
        case '−':
          result = prev - current
          break
        case '×':
          result = prev * current
          break
        case '÷':
          if (current === 0) {
            showError('Cannot divide by zero')
            return null
          }
          result = prev / current
          break
        default:
          return null
      }
      
      // Check for overflow
      if (!isFinite(result)) {
        showError('Overflow')
        return null
      }
      
      const formattedResult = formatResult(result)
      setCurrentInput(formattedResult)
      setPreviousInput(null)
      setOperator(null)
      setWaitingForOperand(true)
      setHasDecimal(formattedResult.includes('.'))
      setDecimalPlaces(formattedResult.includes('.') ? formattedResult.split('.')[1].length : 0)
      
      return result
    } catch (error) {
      showError('Error')
      return null
    }
  }, [isError, operator, previousInput, currentInput, formatResult, showError])

  // Handle keyboard input
  const handleKeyboard = useCallback((event) => {
    event.preventDefault()
    
    const key = event.key
    const keyCode = event.keyCode
    
    // Numbers
    if (key >= '0' && key <= '9') {
      inputNumber(key)
      return
    }
    
    // Operators
    switch (key) {
      case '+':
        inputOperator('+')
        break
      case '-':
        inputOperator('−')
        break
      case '*':
        inputOperator('×')
        break
      case '/':
        inputOperator('÷')
        break
      case '=':
      case 'Enter':
        calculate()
        break
      case '.':
        inputDecimal()
        break
      case 'Escape':
        clear()
        break
      case 'Backspace':
      case 'Delete':
        backspace()
        break
    }
    
    // Special keys
    if (keyCode === 8) { // Backspace
      backspace()
    } else if (keyCode === 46) { // Delete
      clearEntry()
    }
  }, [inputNumber, inputOperator, calculate, inputDecimal, clear, backspace, clearEntry])

  // Setup keyboard support
  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard)
    return () => {
      document.removeEventListener('keydown', handleKeyboard)
    }
  }, [handleKeyboard])

  // Get operation display text
  const getOperationDisplay = () => {
    if (previousInput !== null && operator) {
      const prev = formatResult(previousInput)
      return `${prev} ${operator}`
    }
    return ''
  }

  return (
    <div className="calculator-container">
      <header className="calculator-header">
        <h1 className="calculator-title">Calculator</h1>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </header>
      
      <main className="calculator-main">
        <CalculatorDisplay 
          currentInput={currentInput}
          operationDisplay={getOperationDisplay()}
          isError={isError}
        />
        
        <CalculatorButtons
          onNumberClick={inputNumber}
          onOperatorClick={inputOperator}
          onActionClick={{
            clear,
            'clear-entry': clearEntry,
            backspace,
            decimal: inputDecimal,
            equals: calculate
          }}
        />
      </main>
      
      <footer className="calculator-footer">
        <div className="keyboard-hint">
          <span>💡 Use keyboard for faster input</span>
        </div>
      </footer>
    </div>
  )
}

export default Calculator
