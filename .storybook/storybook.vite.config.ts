import { defineConfig } from 'vite'

/**
 * Storybook runs its own minimal Vite config: the app's config owns React
 * Router, which expects to build the whole app. Plugins and aliases are added
 * in `.storybook/main.ts` via `viteFinal`.
 */
export default defineConfig({})
