import type { Preview } from '@storybook/react-vite'

import { Fragment, useEffect } from 'react'
import { MemoryRouter } from 'react-router'
import { sb } from 'storybook/test'

import { setStorybookPlatform } from './platform-switchable'
import '../app/app.css'

// Preview components read Weibo directly; stories supply fixed pages instead.
sb.mock(import('../app/features/preview/api.ts'), { spy: true })

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
    platform: {
      description: 'Host platform',
      toolbar: {
        title: '平台',
        icon: 'browser',
        items: [
          { value: 'desktop', title: '桌面' },
          { value: 'web', title: '网页' },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
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
    platform: 'desktop',
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const platform = context.globals.platform === 'web'
        ? 'web'
        : 'desktop'
      // Components read `platform.kind` during render. Set it before the story
      // renders, and remount the subtree when the toolbar changes so
      // useIsWeb() takes a fresh snapshot (its store subscribe is a no-op).
      setStorybookPlatform(platform)
      const theme = context.globals.theme === 'dark'
        ? 'dark'
        : 'light'
      useEffect(() => {
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)

        // Storybook's centered layout makes the story root a shrink-to-fit
        // flex item, so a wrapper div with min-h-screen paints a tall column
        // and pins the story to its top. The page background belongs on body:
        // it covers the viewport under every layout and leaves the story root
        // to Storybook's own centering.
        const { body } = document
        body.classList.add('bg-background', 'text-foreground')
        return () => {
          body.classList.remove('bg-background', 'text-foreground')
        }
      }, [theme])

      return (
        <MemoryRouter>
          <Fragment key={platform}>
            <Story />
          </Fragment>
        </MemoryRouter>
      )
    },
  ],
}

export default preview
