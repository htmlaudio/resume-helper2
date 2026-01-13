import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Usually, no 'base' is needed unless you're serving from a subfolder
})
