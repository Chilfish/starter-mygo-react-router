import type { Platform } from '~/platform/types'

import { platform as web } from '~/platform/web'

type StorybookPlatform = 'desktop' | 'web'

const scope = globalThis as typeof globalThis & {
  __STORYBOOK_PLATFORM_KIND__?: StorybookPlatform
}

/** Set by the Storybook toolbar before a story renders. */
export function setStorybookPlatform(kind: StorybookPlatform): void {
  scope.__STORYBOOK_PLATFORM_KIND__ = kind
}

const desktopPaths = {
  userData: 'C:\\Users\\you\\AppData\\Roaming\\Weibo Archiver',
  logs: 'C:\\Users\\you\\AppData\\Roaming\\Weibo Archiver\\logs',
  pictures: 'C:\\Users\\you\\Pictures',
  database: 'C:\\Users\\you\\AppData\\Roaming\\Weibo Archiver\\archive.db',
  mediaRoot: 'C:\\Users\\you\\Pictures\\WeiboArchive',
}

/**
 * Desktop rendering without the MyGo runtime.
 *
 * Components branch on `platform.kind`, so desktop stories need that value.
 * Reads used while rendering (paths, info, settings) return desktop-shaped
 * fixtures instead of throwing "runtime not found". Real host behavior —
 * opening folders, the Settings window, updates — belongs to `WA_SHOTS` and
 * the running app.
 */
const desktopRender: Platform = {
  ...web,
  kind: 'desktop',
  archive: {
    ...web.archive,
    path: async () => desktopPaths.database,
  },
  log: {
    ...web.log,
    path: async () => `${desktopPaths.logs}\\app.log`,
  },
  system: {
    ...web.system,
    info: async () => ({
      ...(await web.system.info()),
      name: 'Weibo Archiver',
      version: '0.1.0',
      os: 'windows',
      arch: 'amd64',
      goVersion: 'go1.25',
      ...desktopPaths,
    }),
  },
}

function active(): Platform {
  return scope.__STORYBOOK_PLATFORM_KIND__ === 'web'
    ? web
    : desktopRender
}

export const platform: Platform = new Proxy(desktopRender, {
  get(_target, property) {
    const current = active()
    const value = Reflect.get(current, property, current)
    return typeof value === 'function'
      ? value.bind(current)
      : value
  },
})

export type { Platform }
