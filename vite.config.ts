import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: true // Needed for Docker to expose the port correctly
  }
  // Usually, no 'base' is needed unless you're serving from a subfolder
})
