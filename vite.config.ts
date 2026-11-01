import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
  ],
  server: {
    // Must match `devUrl` in mygo.config.ts.
    port: 5173,
    strictPort: true,
    watch: {
      ignored: ['**/.mygo/**', '**/build/**', '**/release/**'],
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(root, 'app'),
    },
  },
})
