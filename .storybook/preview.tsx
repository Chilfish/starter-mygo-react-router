import type { Preview } from '@storybook/react-vite'

import { useEffect } from 'react'
import { MemoryRouter } from 'react-router'
import '../app/app.css'

const preview: Preview = {
  // Every story file that declares a `component` gets an Autodocs page.
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    controls: { expanded: true },
    docs: { toc: true },
    // Report accessibility violations on every story; flip to 'error' once
    // the existing components are clean.
    a11y: { test: 'todo' },
  },
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: '主题',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: '浅色' },
          { value: 'dark', title: '深色' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'dark'
        ? 'dark'
        : 'light'
      useEffect(() => {
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)

        const { body } = document
        body.classList.add('bg-background', 'text-foreground')
        return () => {
          body.classList.remove('bg-background', 'text-foreground')
        }
      }, [theme])

      return (
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      )
    },
  ],
}

export default preview
