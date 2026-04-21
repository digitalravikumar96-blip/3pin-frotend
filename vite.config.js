import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// const defaultApiTarget = 'https://3pin-backend-production.up.railway.app'
const defaultApiTarget = 'http://localhost:4000'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = (env.VITE_API_BASE_URL || defaultApiTarget).replace(/\/$/, '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': apiTarget,
      },
    },
  }
})
