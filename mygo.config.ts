import { defineConfig } from 'mygo-cli'
import pkg from './package.json' with { type: 'json' }

export default defineConfig({
  name: 'Starter MyGo React Router',
  // Used for installer and executable names; keep it ASCII.
  slug: 'starter-mygo-react-router',
  identifier: 'com.example.startermygoreactrouter',
  // One source of truth for the app version and the release tag.
  version: pkg.version,
  // `mygo dev` runs devCommand and loads devUrl; `mygo build` runs
  // buildCommand and embeds frontendDist into the app.
  devUrl: 'http://localhost:5173',
  devCommand: 'bun run dev:web',
  buildCommand: 'bun run build:web',
  // React Router writes the SPA to build/client; installers go to release/.
  frontendDist: 'build/client',
  bindings: 'app/mygo.ts',
  out: 'release',
})
