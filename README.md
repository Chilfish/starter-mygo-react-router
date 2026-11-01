# Starter MyGo React Router

A desktop app starter built with [MyGo](https://mygo.egoist.dev/), React Router v8 (SPA), [coss UI](https://coss.com/ui/), Tailwind CSS v4, and Bun.

The frontend lives in `app/`; Go services live in `internal/` and are bound from `main.go`. `mygo generate` writes the typed TypeScript client to `app/mygo.ts`.

## Prerequisites

- Go 1.27+
- [Bun](https://bun.sh/)
- Windows 10 needs the WebView2 Runtime (Windows 11 includes it)

## Quick start

```bash
bun install
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

`internal/demo` exposes two services:

- `System.Info()` returns the app name, version, OS/arch, Go version, and user-data directory.
- `Greeter.Greet(name)` returns a greeting built in Go.

The home page calls both when it runs inside a MyGo window. In a plain browser (`bun run dev:web`) it shows a note instead, because `window.mygo` is absent.

To add a service, define a struct and its methods in `internal/`, bind it in `main.go`, then run `bun run generate`.

## Project structure

```
main.go              MyGo window, bindings, and events
internal/demo/       Demo Go services callable from the frontend
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
docs/                Project documentation (see docs/README.md)
```

## Documentation

- [docs/README.md](docs/README.md): documentation entry point
- [AGENTS.md](AGENTS.md): AI agent collaboration guide
- [CONTRIBUTING.md](CONTRIBUTING.md): human contributor guide
