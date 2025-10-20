# 🧪 Testing Documentation

This document describes the comprehensive testing suite for the React Calculator application.

## 📋 Test Overview

The testing suite includes:
- **Unit Tests**: Individual component testing
- **Integration Tests**: Full calculator functionality testing
- **Accessibility Tests**: WCAG 2.2 AA compliance testing
- **Edge Case Tests**: Error handling and boundary condition testing

## 🚀 Running Tests

### Available Test Commands

```bash
# Run tests in watch mode (development)
npm test

# Run tests once
npm run test:run

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage

The test suite aims for:
- **80%+ code coverage** across all metrics
- **100% component coverage**
- **100% accessibility compliance**

## 📁 Test Structure

```
src/
├── __tests__/
│   ├── App.test.jsx                 # Main app integration tests
│   ├── accessibility.test.jsx       # Accessibility compliance tests
│   └── edge-cases.test.jsx          # Edge cases and error handling
├── components/
│   └── __tests__/
│       ├── Button.test.jsx          # Button component unit tests
│       ├── Calculator.test.jsx      # Calculator integration tests
│       ├── CalculatorButtons.test.jsx # Button grid tests
│       ├── CalculatorDisplay.test.jsx # Display component tests
│       └── ThemeToggle.test.jsx     # Theme toggle tests
└── test/
    └── setup.js                     # Test environment setup
```

## 🧩 Test Categories

### 1. Unit Tests

#### Button Component (`Button.test.jsx`)
- ✅ Renders different button types correctly
- ✅ Applies correct CSS classes
- ✅ Handles click events
- ✅ Shows backspace icon for backspace button
- ✅ Applies clear button styling for C/CE buttons

#### ThemeToggle Component (`ThemeToggle.test.jsx`)
- ✅ Renders correct icon for each theme
- ✅ Calls onToggle callback
- ✅ Has proper accessibility attributes

#### CalculatorDisplay Component (`CalculatorDisplay.test.jsx`)
- ✅ Renders current input correctly
- ✅ Shows operation display
- ✅ Applies error styling
- ✅ Has proper accessibility attributes

#### CalculatorButtons Component (`CalculatorButtons.test.jsx`)
- ✅ Renders all calculator buttons
- ✅ Calls correct callbacks for each button type
- ✅ Has proper accessibility attributes

### 2. Integration Tests

#### Calculator Component (`Calculator.test.jsx`)
- ✅ Performs basic arithmetic operations (+, -, ×, ÷)
- ✅ Handles decimal operations
- ✅ Manages calculator state correctly
- ✅ Handles keyboard input
- ✅ Enforces 12-digit limit
- ✅ Shows operation display
- ✅ Handles theme toggle

#### App Component (`App.test.jsx`)
- ✅ Renders calculator with theme
- ✅ Loads theme from localStorage
- ✅ Toggles theme and saves to localStorage
- ✅ Sets data-theme attribute
- ✅ Handles theme persistence

### 3. Accessibility Tests (`accessibility.test.jsx`)
- ✅ All buttons have proper ARIA labels
- ✅ Calculator has proper roles and structure
- ✅ Supports keyboard navigation
- ✅ Has proper focus management
- ✅ Provides screen reader announcements
- ✅ Supports high contrast mode
- ✅ Handles error states accessibly

### 4. Edge Cases Tests (`edge-cases.test.jsx`)
- ✅ Handles very large numbers (12-digit limit)
- ✅ Handles very small decimal numbers
- ✅ Prevents multiple decimal points
- ✅ Handles leading zeros
- ✅ Handles consecutive operators
- ✅ Handles division by zero
- ✅ Handles overflow in calculations
- ✅ Handles rapid button clicking
- ✅ Handles keyboard input during error state
- ✅ Handles localStorage errors gracefully

## 🎯 Test Scenarios

### Basic Operations
```javascript
// Addition
'2+3=' → '5'

// Subtraction  
'10-4=' → '6'

// Multiplication
'7*8=' → '56'

// Division
'15/3=' → '5'
```

### Decimal Operations
```javascript
// Decimal arithmetic
'3.14+2.86=' → '6'

// Decimal precision
'1/3=' → '0.3333333333'
```

### Error Handling
```javascript
// Division by zero
'5/0=' → 'Cannot divide by zero'

// Overflow
'999999999999*999999999999=' → '1e+23' or 'Overflow'
```

### Keyboard Support
```javascript
// Number input
'5' → '5'

// Operations
'5+3=' → '8'

// Clear
'{Escape}' → '0'

// Backspace
'123{Backspace}' → '12'
```

## 🔧 Test Configuration

### Vitest Configuration
- **Environment**: jsdom (browser-like environment)
- **Globals**: Enabled for cleaner test syntax
- **CSS**: Enabled for component styling tests
- **Setup**: Custom setup file for mocks and utilities

### Coverage Configuration
- **Provider**: v8 (fast and accurate)
- **Reporters**: text, json, html
- **Thresholds**: 80% minimum coverage
- **Exclusions**: test files, config files, node_modules

### Mock Setup
- **localStorage**: Mocked for theme persistence testing
- **matchMedia**: Mocked for responsive design tests
- **ResizeObserver**: Mocked for layout tests
- **Console**: Mocked to reduce test noise

## 🚨 Error Scenarios Tested

### Input Validation
- ✅ 12-digit input limit enforcement
- ✅ Single decimal point enforcement
- ✅ Leading zero handling
- ✅ Invalid input rejection

### Calculation Errors
- ✅ Division by zero handling
- ✅ Overflow detection and handling
- ✅ Invalid operation handling
- ✅ Precision loss handling

### State Management
- ✅ Error state auto-clear (2 seconds)
- ✅ State reset on error
- ✅ State persistence across operations
- ✅ State cleanup on clear

## 🎨 UI/UX Testing

### Visual Feedback
- ✅ Button press animations
- ✅ Error state styling
- ✅ Theme switching animations
- ✅ Focus indicators

### Responsive Design
- ✅ Mobile layout testing
- ✅ Tablet layout testing
- ✅ Desktop layout testing
- ✅ High DPI display testing

### Accessibility Features
- ✅ Screen reader compatibility
- ✅ Keyboard navigation
- ✅ High contrast mode
- ✅ Reduced motion support

## 📊 Performance Testing

### Load Performance
- ✅ Component render time
- ✅ State update performance
- ✅ Theme switch performance
- ✅ Error handling performance

### Memory Management
- ✅ Event listener cleanup
- ✅ State cleanup
- ✅ Component unmounting
- ✅ Memory leak prevention

## 🔍 Debugging Tests

### Test Debugging
```bash
# Run specific test file
npm test Button.test.jsx

# Run tests with verbose output
npm test -- --reporter=verbose

# Run tests in debug mode
npm test -- --inspect-brk
```

### Coverage Analysis
```bash
# Generate coverage report
npm run test:coverage

# View HTML coverage report
# (Linux)  
xdg-open coverage/index.html
# (macOS)
open coverage/index.html
# (Windows)
start coverage/index.html
```

## 🧯 Additional Notes

- Environment: Vitest v3 with jsdom, globals enabled, CSS support true; setup at `src/test/setup.js`.
- If you encounter `document is not defined` from async effects, ensure `useEffect` cleans up timeouts/intervals. `CalculatorDisplay` demonstrates this pattern with a timeout ref and cleanup.
- For expensive rendering tests (e.g., accessibility role checks), increase individual test timeout (e.g., `it('...', fn, 15000)`).
- The app handles missing `localStorage` gracefully: it falls back to light theme and logs a warning. Tests should not fail on warnings.

## 📝 Writing New Tests

### Test Structure
```javascript
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

describe('Component Name', () => {
  it('should do something', () => {
    // Arrange
    render(<Component />)
    
    // Act
    fireEvent.click(screen.getByRole('button'))
    
    // Assert
    expect(screen.getByText('Expected')).toBeInTheDocument()
  })
})
```

### Best Practices
- ✅ Use semantic queries (getByRole, getByLabelText)
- ✅ Test user interactions, not implementation details
- ✅ Use userEvent for realistic user interactions
- ✅ Mock external dependencies
- ✅ Test accessibility features
- ✅ Test error scenarios
- ✅ Use descriptive test names

## 🚀 Continuous Integration

### Pre-commit Hooks
- ✅ Run tests before commit
- ✅ Check coverage thresholds
- ✅ Lint test files
- ✅ Format test files

### CI Pipeline
- ✅ Install dependencies
- ✅ Run linting
- ✅ Run tests
- ✅ Generate coverage report
- ✅ Deploy on success

## 📈 Test Metrics

### Coverage Goals
- **Statements**: 80%+
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+

### Performance Goals
- **Test execution time**: < 30 seconds
- **Component render time**: < 100ms
- **State update time**: < 50ms
- **Theme switch time**: < 200ms

## 🆘 Troubleshooting

### Common Issues
1. **Tests failing due to localStorage**: Check mock setup
2. **Async operations not completing**: Use waitFor or userEvent
3. **Component not rendering**: Check import paths and mocks
4. **Coverage not updating**: Clear coverage directory and re-run

### Debug Commands
```bash
# Clear test cache
npm test -- --no-cache

# Run tests with debug output
DEBUG=* npm test

# Run specific test pattern
npm test -- --grep "specific test name"
```

---

**Testing ensures the calculator works reliably across all scenarios and maintains high quality standards.**
