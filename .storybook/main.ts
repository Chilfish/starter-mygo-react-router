import type { StorybookConfig } from '@storybook/react-vite'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

const root = path.dirname(fileURLToPath(import.meta.url))
const app = path.resolve(root, '../app')

const config: StorybookConfig = {
  stories: ['../app/stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-vitest',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // The app's Vite config carries React Router's plugin, which expects to own
  // the build. Storybook uses its own minimal config instead.
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: path.join(root, 'storybook.vite.config.ts'),
      },
    },
  },
  docs: { defaultName: '文档' },
  async viteFinal(config) {
    config.plugins = [
      ...(config.plugins ?? []),
      tailwindcss(),
    ]
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '~': app,
      },
    }
    return config
  },
}

export default config
