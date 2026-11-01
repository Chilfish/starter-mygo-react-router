import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(root, 'app'),
    },
  },
  test: {
    environment: 'node',
    include: ['app/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['app/lib/**/*.ts'],
      exclude: ['app/lib/**/*.spec.ts', 'app/lib/env.server.ts'],
      thresholds: {
        lines: 55,
        functions: 55,
        statements: 55,
        branches: 55,
      },
    },
  },
})
