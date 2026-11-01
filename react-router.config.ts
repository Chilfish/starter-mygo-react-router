import type { Config } from '@react-router/dev/config'

// The app ships as static files inside MyGo: no Node server at runtime.
const config: Config = {
  ssr: false,
}

export default config
