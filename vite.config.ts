import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Only set base path for production builds (GitHub Pages deployment)
  base: "/club-bruin-pop"
})
