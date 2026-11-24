# Postmortems

> **Blameless**: attribute an incident to the system conditions that allowed it, not to a person.
>
> **Read the baseline and recurring risks below before writing code** to avoid repeating a known failure.

## Severity

| Level | Criteria                                                                                           |
| ----- | -------------------------------------------------------------------------------------------------- |
| SEV-0 | Irreversible data loss, or the build or product is completely unusable with no same-day workaround |
| SEV-1 | A core user-visible feature fails or data is corrupted; a wrong conclusion is adopted as fact      |
| SEV-2 | A user-visible feature degrades with a workaround; part of development is blocked; medium rework   |
| SEV-3 | Local or experience-level issue with limited impact that still exposes a systemic gap              |

## Status

- **Active**: The root cause remains, so the failure can recur.
- **Mitigated**: The specific gap is closed and prevention is in place or enforced by a gate.

## Index

| ID  | Topic           | Level | Category | Status | Root cause (one sentence) |
| --- | --------------- | ----- | -------- | ------ | ------------------------- |
| —   | No entries yet. | —     | —        | —      | —                         |

> There is no postmortem yet. After the first incident, add one from [TEMPLATE.md](./TEMPLATE.md) and register it here.
> Distill the lesson into the matching category under recurring risks.

## Baseline risks

> These risks ship with the scaffold. They do not come from an incident. Hit counts start with the first real postmortem.

### 1. React and hydration

| Rule                             | Check                                                          | Fix                                                   |
| -------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------- |
| No browser APIs during render    | Is `window`, `document`, or `localStorage` on the render path? | Move it to an effect or a client hook (`useHydrated`) |
| Persisted stores stay consistent | Does the first render read a persisted value directly?         | Use a hydration flag; render after hydration          |
| Host code stays out of render    | Are `mygo` bindings called during render?                      | Guard with `isMyGo()` inside an effect                |
| First output is reproducible     | Are time, random values, or `Date.now()` rendered directly?    | Fix the time zone or render on the client             |

### 2. State and data

| Rule                            | Check                                    | Fix                                                       |
| ------------------------------- | ---------------------------------------- | --------------------------------------------------------- |
| Use selectors with Zustand      | Is it `const { x } = useStore()`?        | `useStore(s => s.x)`; use `useShallow` for several fields |
| Persist migrations are explicit | Does a schema change increase `version`? | Write the migration and check `partialize` for new fields |
| Data fetching has three states  | Are loading, empty, and error covered?   | Skeleton, empty state, error with retry                   |
| Null is handled explicitly      | Are `null` and `undefined` treated as 0? | Skip or show a placeholder; never default silently to 0   |

### 3. Styling and UI

| Rule                       | Check                                           | Fix                                                  |
| -------------------------- | ----------------------------------------------- | ---------------------------------------------------- |
| No hardcoded colors        | Any `#fff`, `rgb()`, or `bg-[#...]`?            | Use tokens: `bg-background`, `text-muted-foreground` |
| No `dark:` color patches   | Is `dark:` used to override a color?            | The `.dark` variable set already switches values     |
| No single-line CSS patches | Is z-index or margin used to hide a layout bug? | Fix the layout structure first                       |
| Verify mobile behavior     | Was only the width breakpoint tested?           | Check touch, safe areas, scroll locking, and `dvh`   |
| Accessibility              | Do icon buttons have names and visible focus?   | `aria-label` plus `focus-visible:ring-2`             |

### 4. Routes and build

| Rule                            | Check                                                | Fix                                                   |
| ------------------------------- | ---------------------------------------------------- | ----------------------------------------------------- |
| Run typegen after route changes | Are `+types/*` files refreshed after adding a route? | Run `bun run typecheck` after editing `app/routes.ts` |
| Keep aliases in sync            | Was only `tsconfig` updated?                         | Update `tsconfig`, `vite.config`, and `vitest.config` |
| Check cross-major upgrades      | Does a caret dependency cross a major version?       | Run `bun run build` locally; pin when needed          |
| Respect the host boundary       | Are browser APIs on the render path?                 | See section 1                                         |

### 5. Verification and process

| Rule                          | Check                                                  | Fix                                                 |
| ----------------------------- | ------------------------------------------------------ | --------------------------------------------------- |
| No false green                | Any test without assertions, empty run, or all `skip`? | Break the behavior and confirm red; no empty passes |
| No source scans as assertions | Does the AC only check a literal in source?            | Use behavior tests; scans are supporting checks     |
| Plans are not current state   | Do docs present unfinished work as done?               | Put open work in the backlog or `todo-*`            |
| No documentation drift        | Do paths, commands, and routes still match the code?   | Update docs with the code; search for old forms     |
| No dead links                 | Does the index point to a missing file?                | Open every link before merging                      |
| No red baseline               | Is a known failure merged?                             | Fix or remove it; do not accept it                  |

## Recurring risks

> Empty until the first incident. Add one from [TEMPLATE.md](./TEMPLATE.md), then distill the lesson into the matching category above.
> When the same rule recurs, update its hit count and promote it to a process rule or a gate.

### Common root causes

1. **No spike or verification**: An assumption was never tested in isolation.
2. **No shared template or checklist**: The same items are missed each time.
3. **Implicit API boundaries**: Undocumented contracts are easy to ignore.
4. **Verification without signal**: Green only means no assertion failed.

### What worked

1. **Reproduce before fixing**: Locate the root cause with a reproducible command.
2. **Fix the condition, not the case**: Write prevention back into a rule or gate.

## Adding a postmortem

See the process at the end of [TEMPLATE.md](./TEMPLATE.md): copy the template, fill the metadata, write the sections, update the index, distill the recurring risk, and sync process-level prevention to `AGENTS.md`.
