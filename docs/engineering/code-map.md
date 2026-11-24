# Code Map

Use this page to find the files for a task. Architecture and data flow live in [planning/architecture.md](../planning/architecture.md); conventions live in [code-style.md](./code-style.md).

## Task intents

| Intent                             | Files                                                                       | Notes                                                                                                                     |
| ---------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Add or change a route              | `app/routes.ts` → `app/routes/<name>.tsx`                                   | Declare the route in `app/routes.ts`, then run `bun run typecheck` to refresh `+types/*`.                                 |
| Add a coss UI primitive            | `app/components/ui/`                                                        | Run `npx shadcn@latest add @coss/<component>` or follow the existing Base UI pattern. Check coss.com/ui/docs for the API. |
| Add a shared scaffold component    | `app/components/shared/`                                                    | Use `cn()` and design tokens.                                                                                             |
| Add a Go service                   | `internal/<name>/` → `mygo.Bind` in `main.go`                               | Run `bun run generate` to refresh `app/mygo.ts`.                                                                          |
| Change the theme                   | `app/stores/appConfig.ts`, `app/components/shared/ThemeProvider.tsx`        | Keep one data flow: store → provider → `.dark` class.                                                                     |
| Change colors, radii, or fonts     | `app/app.css`                                                               | Define tokens in `:root` and `.dark`; map them under `@theme inline`.                                                     |
| Write SEO metadata                 | `app/lib/seo.ts` and each route's `meta` export                             | Use `generateSEOMeta()`.                                                                                                  |
| Write pure logic                   | `app/lib/`                                                                  | Add a colocated `*.spec.ts`.                                                                                              |
| Add a React hook                   | `app/hooks/`                                                                | Import `useIsMobile` from `use-media-query.ts`; `use-mobile.ts` is unused.                                                |
| Write a Storybook story            | `app/stories/`                                                              | Run `bun run storybook`.                                                                                                  |
| Change the host window or bindings | `main.go`, `mygo.config.ts`                                                 | `mygo.config.ts` reads the version from `package.json` and holds the app name, dev URL, and output paths.                 |
| Build for phones                   | `package.json` scripts                                                      | `bun run dev:ios`, `bun run dev:android`, `bun run build:ios`, `bun run build:android`.                                   |
| Change CI, hooks, or releases      | `.github/workflows/ci.yml`, `.github/workflows/release.yml`, `lefthook.yml` | CI runs Go checks and the web gates; the release workflow builds five targets from a `v*` tag.                            |
| Update documentation               | `docs/`                                                                     | Start at [docs/README.md](../README.md); update the index after any move.                                                 |

## Routes and host plumbing

| Path                                    | Role                                                                            |
| --------------------------------------- | ------------------------------------------------------------------------------- |
| `app/routes/home.tsx`                   | Home page: coss component samples, the MyGo demo, and the search demo           |
| `app/routes/not-found.tsx`              | Catch-all route for unmatched paths                                             |
| `app/root.tsx`                          | Layout, `HydrateFallback`, `ErrorBoundary`, toast providers, `ProgressBar`      |
| `app/mygo.ts`                           | Generated TypeScript bindings. Do not edit; regenerate with `bun run generate`. |
| `internal/demo/demo.go`                 | `Greeter`, `System`, and the `tick` event                                       |
| `internal/demo/search.go`               | `Searcher.Search(ctx, query)`: a slow call that the page can abort              |
| `app/components/shared/mygo-demo.tsx`   | Calls `System.info()`, `Greeter.greet()`, and subscribes to `tick`              |
| `app/components/shared/search-demo.tsx` | Calls `Searcher.search.with({ signal })` and aborts the previous query          |

## Related documents

- [Architecture](../planning/architecture.md)
- [Code style](./code-style.md)
- [UI design system](../ui-design/README.md)
