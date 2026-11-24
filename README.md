# Starter MyGo React Router

[![CI](https://github.com/Chilfish/starter-mygo-react-router/actions/workflows/ci.yml/badge.svg)](https://github.com/Chilfish/starter-mygo-react-router/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![MyGo 0.10](https://img.shields.io/badge/MyGo-0.10-blue)](https://mygo.egoist.dev/)
[![Listed on Awesome MyGo](https://awesomemygo.dev/badge.svg)](https://awesomemygo.dev/templates)

A desktop app starter built with [MyGo](https://mygo.egoist.dev/) 0.10, React Router v8 (SPA), [coss UI](https://coss.com/ui/), Tailwind CSS v4, and Bun. The same Go and React code also runs on iPhone, iPad and Android.

The frontend lives in `app/`; Go services live in `internal/` and are bound from `main.go`. `mygo generate` writes the typed TypeScript client to `app/mygo.ts`.

Use [this template](https://github.com/Chilfish/starter-mygo-react-router/generate) for a new app, or clone it with `gh repo clone Chilfish/starter-mygo-react-router`.

## Features

- A Go host with typed TypeScript bindings, typed events, and cancellable calls.
- A React Router v8 SPA (`ssr: false`) with client-only data loading.
- coss components on Base UI, Tailwind CSS v4 design tokens, and first-class dark mode.
- Storybook for component work, Vitest for pure logic, ESLint, and lefthook gates.
- Desktop installers through `mygo build`; the same code runs on iPhone, iPad and Android.
- A tag-driven release workflow for macOS, Windows and Linux.

## Prerequisites

- Go 1.27+
- [Bun](https://bun.sh/)
- Windows 10 needs the WebView2 Runtime (Windows 11 includes it)
- Phones only: Xcode and an iOS simulator on macOS, or Android Studio with an SDK and NDK. `bun run doctor` reports what is missing.

## Quick start

```bash
bun install
bun run doctor     # Check the toolchain: Go, Bun, WebView2, NSIS, phone tools
bun run dev        # MyGo dev: Go restarts, frontend hot reloads
bun run dev:web    # Frontend only, in a browser (Go bindings unavailable)
bun run generate   # Regenerate app/mygo.ts from Go
bun run typecheck
bun run lint
bun run test
bun run storybook  # Component workbench
bun run build      # Package the current platform into release/
```

## Go ↔ frontend demo

`internal/demo` exposes three services:

- `System.Info()` returns the app name, version, OS/arch, Go version, and user-data directory.
- `Greeter.Greet(name)` returns a greeting built in Go.
- `Searcher.Search(query)` answers after a short delay and stops when the page cancels the call.

`main.go` also emits the `tick` event every second.

The home page calls them when it runs inside a MyGo window. In a plain browser (`bun run dev:web`) it shows a note instead, because `window.mygo` is absent.

To add a service, define a struct and its methods in `internal/`, bind it in `main.go`, then run `bun run generate`.

## Cancellable calls

A method whose first parameter is a `context.Context` gets a context that is canceled when the page aborts the call. The generated client exposes `.with({ signal })`:

```go
func (Searcher) Search(ctx context.Context, query string) ([]string, error) {
    select {
    case <-time.After(500 * time.Millisecond):
    case <-ctx.Done():
        return nil, ctx.Err()
    }
    // ...
}
```

```tsx
const controller = new AbortController()
const matches = await Searcher.search.with({ signal: controller.signal })('channel')
// controller.abort() cancels ctx in Go and rejects the promise with the signal's reason
```

`app/components/shared/search-demo.tsx` aborts the previous call on every keystroke.

## Phones and tablets

The same app runs in the system web view on iPhone, iPad and Android:

```bash
bun run dev:ios       # iOS simulator; add -device <name> to pick one
bun run dev:android   # Android emulator or connected device
bun run build:ios     # Signed .ipa (needs macOS and a signing profile)
bun run build:android # .apk and .aab
```

`mygo devices` lists the simulators, emulators and devices.

## Releasing

`version` in `mygo.config.ts` comes from `package.json`. Push a matching tag and [`.github/workflows/release.yml`](.github/workflows/release.yml) builds macOS, Windows and Linux installers as workflow artifacts:

```bash
git tag v0.1.0
git push origin v0.1.0
```

Those builds are unsigned. Add signing identities and `updates` to `mygo.config.ts` to notarize macOS apps, sign Windows apps and publish auto-updates; see [distribution](https://mygo.egoist.dev/docs/distribution.md) and [auto-updates](https://mygo.egoist.dev/docs/updates.md).

## Project structure

```
main.go              MyGo window, bindings, and events
internal/demo/       Go services callable from the frontend
app/                 React Router SPA
  components/        coss UI primitives and shared components
  hooks/             Generic React hooks
  lib/               Pure logic and tests (*.spec.ts)
  routes/            Pages declared in app/routes.ts
  stores/            Zustand stores
  stories/           Storybook stories
  app.css            Design tokens and Tailwind v4 entry
  mygo.ts            Generated Go bindings (do not edit)
public/              Static assets (icon, manifest)
.github/workflows/   CI and tag builds
docs/                Project documentation (see docs/README.md)
```

## Documentation

- [docs/README.md](docs/README.md): documentation entry point
- [docs/engineering/code-map.md](docs/engineering/code-map.md): task to file map
- [AGENTS.md](AGENTS.md): agent instructions
- [CONTRIBUTING.md](CONTRIBUTING.md): contributor guide
- [CHANGELOG.md](CHANGELOG.md): release history

Documentation, code comments, UI copy, and commit messages are written in English. See [docs/writing-style.md](docs/writing-style.md).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for setup, conventions, and the verification gates. By participating, you agree to the [Code of Conduct](CODE_OF_CONDUCT.md). Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).

## Acknowledgements

- [MyGo](https://github.com/egoist/mygo): the Go desktop host and the `mygo` CLI.
- [coss UI](https://coss.com/ui/) and [Base UI](https://base-ui.com/): the component layer.
- [React Router](https://reactrouter.com/), [Tailwind CSS](https://tailwindcss.com/), [Storybook](https://storybook.js.org/), and [Bun](https://bun.sh/).

## License

[MIT](LICENSE) © Chilfish
