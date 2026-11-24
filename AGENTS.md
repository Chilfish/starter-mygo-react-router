# AGENTS.md

Starter for MyGo desktop apps: a Go host in `main.go` and `internal/`, a React Router v8 SPA in `app/`, coss UI on Base UI, Tailwind CSS v4, and Bun for scripts. Installers are built with `mygo build`.

## Read first

| Task          | Start here                                                                  |
| ------------- | --------------------------------------------------------------------------- |
| Any task      | [docs/README.md](./docs/README.md)                                          |
| Find files    | [docs/engineering/code-map.md](./docs/engineering/code-map.md)              |
| Architecture  | [docs/planning/architecture.md](./docs/planning/architecture.md)            |
| Code rules    | [docs/engineering/code-style.md](./docs/engineering/code-style.md)          |
| UI rules      | [docs/ui-design/README.md](./docs/ui-design/README.md)                      |
| Writing rules | [docs/writing-style.md](./docs/writing-style.md)                            |
| MyGo APIs     | `.agents/skills/mygo-maintenance/SKILL.md` when the host or bindings change |

## Non-negotiable constraints

- **SPA**: `react-router.config.ts` sets `ssr: false`. Do not export `loader` or `action` from a route; use `clientLoader` and `clientAction`.
- **Go ↔ frontend**: services live in `internal/`, bind in `main.go` with `mygo.Bind`, then run `bun run generate` to refresh `app/mygo.ts`. Check `isMyGo()` before calling a binding; a browser preview has no `window.mygo`.
- **Design tokens**: colors come from `app/app.css` (`bg-background`, `text-muted-foreground`, `border-input`). No hex, `rgb()`, or `dark:` color overrides in components.
- **Components first**: reuse `~/components/ui/` (coss on Base UI). Do not hand-build buttons, inputs, or overlays.
- **Three states**: every data path covers loading, empty, and error with a retry.
- **Navigation**: internal links use `<Link>`, submissions use `useSubmit()`, programmatic navigation uses `navigate()`. A native `<a href>` is only for external downloads.
- **Hydration**: never read `window`, `document`, or `localStorage` during render. Use effects or `useHydrated()`.
- **Tests carry signal**: break the behavior on purpose and confirm the test turns red. No empty runs, `skip`, `only`, or source scans presented as behavior tests.
- **Language**: English for documentation, code comments, UI copy, and commit messages.

## Workflow

1. Read [docs/README.md](./docs/README.md) and the documents it points to for the task.
2. For a feature, state acceptance criteria before implementation.
3. Write the smallest change that satisfies the criteria. Update the documents the change invalidates.
4. Run the verification commands below and fix failures before moving on.
5. Commit in logical units with Conventional Commits.

## Verification

```bash
go build ./... && go vet ./...
bun run typecheck       # react-router typegen && tsc
bun run lint
bun run test
bun run test:coverage   # app/lib ≥ 55%
bun run build           # mygo build, installers in release/
```

lefthook runs ESLint on commit and typecheck, lint, test, and build on push. CI also runs `go test ./...`, checks that `app/mygo.ts` is regenerated, and builds the frontend.

## Maintain this file

- Keep it under 80 lines. Details belong in `docs/`.
- Add a rule only after the same agent mistake occurs twice. Delete rules the model now follows by default.
- Keep one home per rule. Fix contradictions before adding more.
- Do not add directory trees, dependency lists, or multi-step procedures here.
