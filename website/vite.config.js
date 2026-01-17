import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: path.join(process.env.TEMP || 'C:/Temp', 'vite-cache-hos'),
  optimizeDeps: {
    force: true,
  },
})
