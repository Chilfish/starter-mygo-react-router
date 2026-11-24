# Contributing

This document covers local setup, code conventions, the commit workflow, and the quality gates for starter-mygo-react-router.

## Prerequisites

- [Bun](https://bun.sh/)
- Go 1.27+
- TypeScript 6.0+ (installed by `bun install`)
- Windows 10 needs the WebView2 Runtime (Windows 11 includes it)

## Setup

```bash
# Install dependencies
bun install

# Check the toolchain (Go, Bun, WebView2, NSIS, phone tooling)
bun run doctor

# Start the MyGo app (Go restarts, frontend hot reloads)
bun run dev

# Start the frontend only, in a browser
bun run dev:web

# Regenerate app/mygo.ts from Go
bun run generate

# Build and package the current platform
bun run build

# Phone targets (iOS needs macOS; Android needs an SDK and NDK)
bun run dev:ios
bun run dev:android
bun run build:ios
bun run build:android

# Typecheck
bun run typecheck

# Lint
bun run lint

# Test
bun run test

# Storybook
bun run storybook
```

## Project structure

```
main.go               MyGo window, bindings, and events
internal/demo/        Demo Go services callable from the frontend
app/
  components/ui/      coss components (Base UI + cva)
  components/shared/  scaffold components (ThemeProvider, ProgressBar, ...)
  hooks/              generic hooks
  lib/                pure logic (cn, seo)
  routes/             pages declared in app/routes.ts
  stores/             Zustand stores
  stories/            Storybook stories
  app.css             design tokens and Tailwind v4 entry
  mygo.ts             generated Go bindings (do not edit)
public/               static assets (icon, manifest)
docs/                 project documentation (see docs/README.md)
```

The intent-to-file map is in [docs/engineering/code-map.md](./docs/engineering/code-map.md).

## Commit convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

**Types**: `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `chore`, `style`

**Scopes**: `ui`, `seo`, `theme`, `routes`, `docs`, `build`, `test`, ...

Examples:

```
feat(ui): add settings layout
fix(theme): persist system preference
docs: rewrite documentation in English
```

Rules:

- Imperative English description, lowercase, 72 characters or fewer, no trailing period
- One commit per logical change; split when a change exceeds 10 files or 200 lines

## Code style

The full specification is in [docs/engineering/code-style.md](./docs/engineering/code-style.md).

### TypeScript

- `strict: true`; no `any` (use `unknown` plus narrowing)
- Explicit types on parameters and return values
- Path alias `~/*` maps to `app/*`

### UI and CSS

- **CSS variables only**: `bg-background`, `text-muted-foreground`, `border-input`
- **No hardcoded colors**: no `#fff`, no `rgb()` in components
- **Dark mode is first-class**: every component works in both themes via the `.dark` class
- Mobile-first; enhance with `sm:`, `md:`, and `lg:`
- Reuse `~/components/ui/` (coss) before writing markup
- Transitions last 150–350 ms

### Navigation (React Router)

| Use               | Avoid                        |
| ----------------- | ---------------------------- |
| `<Link to={...}>` | `<a href={...}>`             |
| `useSubmit()`     | `form.submit()`              |
| `navigate(url)`   | `window.location.href = url` |

Exception: a native download of an external resource may use `<a href>`.

### Three states

Every data-fetching path covers `loading` with a skeleton or spinner, `empty` with a described empty state, and `error` with a message and retry.

## Quality gates

Every commit and pull request passes the gates below. lefthook and CI enforce them.

```bash
go build ./... && go vet ./...
bun run typecheck
bun run lint
bun run test
bun run test:coverage
bun run build
```

- Never skip hooks with `--no-verify`; fix the root cause
- Coverage gate: `app/lib/**` at 55% or more for lines, functions, statements, and branches (see `vitest.config.ts`)
- Do not accept an existing red baseline; fix or remove the failing check
- Tests must be able to fail: break the behavior on purpose and confirm the test turns red
- Do not treat source scans (`toContain('literal')`) as behavior assertions
- No `skip`, `only`, or empty runs presented as passing

## Testing

- Pure functions in `app/lib/` are testable without mocks
- Test files sit next to the source: `*.spec.ts`
- Naming: `methodName_condition_expectedResult()`
- Structure: Given-When-Then
- See [docs/engineering/code-style.md § Testing](./docs/engineering/code-style.md#testing)

## Documentation

[docs/README.md](./docs/README.md) is the single entry point. Read it before a task, and update it when a document is added, moved, or removed.

- Writing rules: [docs/writing-style.md](./docs/writing-style.md) (tone, wording, UI copy, examples)
- New feature or requirement change: update `docs/requirements/` and `docs/planning/backlog.md` before implementation
- Architecture change: append an ADR to `docs/planning/architecture.md`
- New bug pattern: write a postmortem from [docs/postmortem/TEMPLATE.md](./docs/postmortem/TEMPLATE.md)
- Code review: write `docs/reviews/review-YYYY-MM-DD-<topic>.md` and log findings in the backlog review queue
- Development log: write `docs/development-log/YYYY-MM-DD.md`
- Every pull request updates the Unreleased section of `CHANGELOG.md`

Documentation rules:

- Docs are facts: paths, commands, routes, and field names must match the current code
- Do not present plans as current state; unfinished work belongs in the backlog or a `todo-*.md` file
- No dead links; check relative links when removing or renaming files
- Empty states and error messages follow the same writing rules as docs
- Documentation, code comments, UI copy, and commit messages are English

## Code of conduct

Participation in this project is covered by [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## Security

Do not open a public issue for a vulnerability. Report it privately as described in [SECURITY.md](./SECURITY.md).
