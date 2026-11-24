# Architecture

> System overview and decision records for starter-mygo-react-router. After forking, extend this page as the product takes shape.

## Stack

| Layer           | Choice                                                            | Version                          |
| --------------- | ----------------------------------------------------------------- | -------------------------------- |
| Host            | [MyGo](https://mygo.egoist.dev/) (Go process plus system WebView) | Go module `v0.10.0`              |
| Tooling         | `mygo-cli`, `mygo-runtime`                                        | `0.10.x`                         |
| Go              | Go toolchain                                                      | `1.27.3`                         |
| UI framework    | React + React Router (framework mode, SPA: `ssr: false`)          | React `19.3`, React Router `8.5` |
| Styling         | Tailwind CSS v4 plus CSS variable tokens                          | `4.3`                            |
| Components      | coss on Base UI (`app/components/ui/`)                            | Base UI `1.9`                    |
| Client state    | Zustand with localStorage persistence                             | `5.1`                            |
| Build           | Vite; packaging through `mygo build`                              | Vite `8.3`                       |
| Language        | TypeScript                                                        | `6.0`                            |
| Package manager | Bun                                                               | —                                |

## Directory structure

```
main.go         MyGo window, bindings, and events
mygo.config.ts  MyGo build configuration (devUrl, frontendDist, bindings, out)
internal/       Go services (demo: System, Greeter, Searcher)
app/
  components/
    ui/         coss components (Base UI + cva + cn())
    shared/     scaffold components (ThemeProvider, ProgressBar, Spinner, demo cards)
  hooks/        useHydrated, useMediaQuery, useIsMobile, useNonce, useIsPending
  lib/          pure logic (cn, seo) with colocated *.spec.ts
  routes/       pages declared in app/routes.ts
  stores/       Zustand stores (appConfig theme)
  stories/      Storybook stories
  app.css       global styles and design tokens
  root.tsx      layout, ErrorBoundary, HydrateFallback
  mygo.ts       generated Go bindings (do not edit)
public/         static assets (icon, manifest)
```

## Data flow

- **Go → frontend**: A service lives in `internal/<name>/`. `main.go` binds it with `mygo.Bind`, and `bun run generate` writes typed functions to `app/mygo.ts`. React calls those functions. Host capabilities exist only inside a MyGo window: check `isMyGo()` first.
- **Cancellable calls**: A method whose first parameter is a `context.Context` is canceled when its page navigates away, closes, or the client aborts it with `.with({ signal })`. The scaffold's `Searcher.Search` shows the pattern.
- **Host events**: The Go side declares an event with `mygo.NewEvent`. The frontend subscribes with `events.<name>.on()`. `Tick` in `main.go` is the demo.
- **Page data**: The app is a static SPA, so there is no server loader. Use `clientLoader` and `clientAction` when a route needs data, or call a binding from an effect.
- **Packaging and phones**: `mygo build` embeds `build/client` into desktop and phone apps from the same Go binary; `mygo dev -platform ios|android` runs the app on a simulator, emulator, or device.

## Decision records

### ADR-001: Design tokens and dark mode

- **Decision**: All colors are CSS variables in `app/app.css` (`--background` and so on), mapped to Tailwind tokens under `@theme inline`. Dark mode switches the variable set through the `.dark` class on `<html>`.
- **Reason**: Tokens prevent hardcoded colors. Variable overrides make dark mode first-class without a `dark:` prefix on every component.
- **Consequences**: Hardcoded `bg-[#xxx]` is forbidden. A new color is defined in both `:root` and `.dark`.

### ADR-002: Central route configuration

- **Decision**: Routes are declared in `app/routes.ts` with `index`, `route`, and a catch-all, not by file-system convention.
- **Reason**: The template is forked and edited by hand, so an explicit, enumerable route table is easier to review.
- **Consequences**: Adding a route changes `app/routes.ts`, then `react-router typegen` refreshes `+types/*` through `bun run typecheck`.

### ADR-003: Path alias `~/*`

- **Decision**: `tsconfig.json` `paths` and Vite `resolve.alias` map `~/*` to `app/*`. Vitest mirrors the alias.
- **Reason**: One import form (`~/components/ui/<name>`) avoids deep relative paths.
- **Consequences**: New directories are imported through `~`. A new alias must be added to all three configuration files.

### ADR-004: Single documentation entry, English prose

- **Decision**: `docs/README.md` is the only entry point and navigates by task. Documents are layered as requirements → planning → engineering → feedback → archive. All documentation, code comments, UI copy, and commit messages are English.
- **Reason**: Forked templates drift. One entry point gives new documents a place, lets outdated ones be archived, and keeps the index consistent. A single language avoids half-translated documents and UI.
- **Consequences**: Adding, moving, or deleting a document updates the index. Main text states only established facts; planned work lives in the backlog. `docs/writing-style.md` governs every copy review.

### ADR-005: Verification must be able to fail

- **Decision**: Tests and gates are accepted only when breaking the behavior on purpose turns them red. Empty runs, all-`skip` suites, conditional assertions, and source scans are not accepted as behavior evidence.
- **Reason**: A green run only means no assertion failed. False green removes the signal from later changes.
- **Consequences**: Write acceptance criteria and a failing test before implementation. The review checklist verifies that tests can fail. Coverage counts only `app/lib/**`.

---

## ADR template

Copy this structure when adding a decision:

```markdown
### ADR-00N: {Title}

- **Decision**: (what was chosen)
- **Reason**: (why, including rejected alternatives)
- **Consequences**: (positive and negative effects, follow-up work)
```
