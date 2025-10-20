import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Ensure built asset paths are relative so dist/index.html works when opened directly
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    css: true
  }
})
