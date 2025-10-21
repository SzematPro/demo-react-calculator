# Live Demo: https://react-calc.szemat.pro

# 🧮 React Demo Web Calculator

A React version of the production-ready demo web calculator, featuring 12-digit precision, mobile-first responsive design, and comprehensive accessibility support.

## ✨ Features

### Core Functionality
- **12-digit precision** with overflow protection
- **Basic arithmetic operations**: Addition, Subtraction, Multiplication, Division
- **Decimal point support** with proper validation
- **Error handling** for division by zero and overflow conditions
- **Clear and backspace** functionality

### User Experience
- **Mobile-first responsive design** that works on all devices
- **Dark/Light theme toggle** with persistent storage
- **Smooth animations** and micro-interactions
- **Keyboard support** for all operations
- **Touch-friendly interface** with visual feedback

### Accessibility (WCAG 2.2 AA Compliant)
- **Screen reader support** with proper ARIA labels
- **Keyboard navigation** for all functions
- **High contrast mode** support
- **Reduced motion** support for users with vestibular disorders
- **Focus management** and visual indicators

### Technical Excellence
- **React 18** with modern hooks
- **Vite** for fast development and building
- **CSS Custom Properties** for theming
- **Component-based architecture**
- **Progressive enhancement** approach
- **Cross-browser compatibility**

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with JavaScript enabled

### Installation

1. **Navigate to the React calculator directory**:
   ```bash
   cd demo-react-calculator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 Usage

### Basic Operations
- **Numbers**: Click number buttons or use keyboard (0-9)
- **Operations**: Click operator buttons or use keyboard (+, -, *, /)
- **Equals**: Click = button or press Enter
- **Clear**: Click C button or press Escape
- **Backspace**: Click ⌫ button or press Backspace
- **Decimal**: Click . button or press . key

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `0-9` | Input numbers |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `=` or `Enter` | Calculate result |
| `.` | Decimal point |
| `Escape` | Clear all |
| `Backspace` | Delete last digit |

### Theme Toggle
- Click the 🌙/☀️ button in the top-right corner
- Theme preference is automatically saved in localStorage

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── Calculator.jsx          # Main calculator logic
│   ├── CalculatorDisplay.jsx    # Display component
│   ├── CalculatorButtons.jsx   # Button grid
│   ├── Button.jsx              # Individual button
│   └── ThemeToggle.jsx         # Theme switcher
├── App.jsx                      # Main app component
├── App.css                     # Calculator styles
├── index.css                   # Global styles
└── main.jsx                    # Entry point
```

### State Management
- **React Hooks**: useState, useEffect, useCallback
- **Local state** for calculator operations
- **localStorage** for theme persistence
- **Event-driven** updates with proper re-rendering

### Styling System
- **CSS Custom Properties** for theming
- **Mobile-first** responsive design
- **Component-scoped** styles
- **Theme switching** with data attributes

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests in watch mode (Vitest + RTL)
- `npm run test:run` - Run the full test suite once (CI-friendly)
- `npm run test:ui` - Open Vitest UI for an interactive run
- `npm run test:coverage` - Generate coverage report (text, json, html)

### Development Features
- **Hot Module Replacement** for fast development
- **ES6+ support** with Vite
- **Component-based** architecture
- **Modern React patterns**

## 📱 Browser Support

### Supported Browsers
- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+
- **Mobile browsers** (iOS Safari, Chrome Mobile)

### Progressive Enhancement
- **Core functionality** works without JavaScript (basic HTML structure)
- **Enhanced experience** with React
- **Graceful degradation** for older browsers

## 🚀 Deployment

### Static Hosting
The React calculator is designed for static hosting and works with:
- **Vercel**
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Any web server** serving static files

### Production Deployment
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` directory** to your hosting provider

3. **Configure your server** to serve `index.html` for all routes (SPA routing)

## 🔒 Security Considerations

### Client-Side Security
- **Input validation** to prevent XSS
- **Output sanitization** for display
- **No external dependencies** to reduce attack surface
- **Content Security Policy** ready

### Best Practices
- **HTTPS deployment** recommended
- **Regular security audits** of dependencies
- **Input length limits** enforced
- **Error handling** without information disclosure

## 📊 Performance Metrics

### Target Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimization Features
- **Vite bundling** for optimal bundle size
- **React optimization** with proper hooks usage
- **CSS optimization** with custom properties
- **Responsive images** (if applicable)

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the functionality
5. Submit a pull request

### Code Standards
- **React 18+** with modern hooks
- **Functional components** only
- **CSS Custom Properties** for styling
- **Accessibility-first** approach
- **Mobile-first** responsive design

### Testing Requirements
- **All functionality** must work correctly
- **Accessibility compliance** must be maintained
- **Cross-browser testing** recommended
- **Mobile responsiveness** verified

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

### Common Issues
1. **Calculator not working**: Check JavaScript is enabled
2. **Styling issues**: Clear browser cache
3. **Keyboard not working**: Ensure focus is on calculator
4. **Theme not saving**: Check localStorage is enabled

### Getting Help
- **Check the browser console** for error messages
- **Test in different browsers** for compatibility issues
- **Validate React components** using React DevTools

---

**Built with ❤️ using React**

*React Demo Web calculator solution meeting standards for scalability, security, performance, and user experience.*
