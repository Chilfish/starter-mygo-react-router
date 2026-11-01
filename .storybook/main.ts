import type { StorybookConfig } from '@storybook/react-vite'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

const root = path.dirname(fileURLToPath(import.meta.url))
const app = path.resolve(root, '../app')

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
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
    // `~/platform` resolves to a switchable adapter so the toolbar can render
    // desktop and web branches without touching product code.
    config.resolve = {
      ...config.resolve,
      alias: [
        {
          find: /^~\/platform$/,
          replacement: path.join(root, 'platform-switchable.ts'),
        },
        {
          find: '~',
          replacement: app,
        },
      ],
    }
    return config
  },
}

export default config
