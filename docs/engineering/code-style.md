# Code Style

**Project**: starter-mygo-react-router | **Last updated**: 2026-11-24

## TypeScript and React

### Naming

| Kind                | Style                                | Example                                  |
| ------------------- | ------------------------------------ | ---------------------------------------- |
| Component, class    | PascalCase                           | `ProgressBar`, `ThemeProvider`           |
| Component file      | kebab-case                           | `progress-bar.tsx`, `error-boundary.tsx` |
| Hook                | `use` + camelCase                    | `useHydrated`, `useMediaQuery`           |
| Function, method    | camelCase                            | `generateSEOMeta`, `cn`                  |
| Constant            | UPPER_SNAKE_CASE                     | `SITE_CONFIG`                            |
| Variable, parameter | camelCase                            | `isDark`, `selectedItems`                |
| Type, interface     | PascalCase                           | `ButtonProps`, `AppConfigs`              |
| Generic parameter   | Single uppercase letter              | `T`, `K` (`T extends ...`)               |
| Package, directory  | lowercase with hyphens               | `app/components/ui/`, `app/lib/`         |
| Route file          | kebab-case (React Router convention) | `not-found.tsx`, `api.auth.ts`           |

### File organization

```ts
// 1. imports: external packages, then the ~ alias, then relative paths
import type * as React from 'react'
import { useNavigation } from 'react-router'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import type { Route } from './+types/home'

// 2. types and constants
// 3. component or function definitions
// 4. private helpers at the bottom of the file
```

### React rules

- Give every component an explicit props type and annotate all props.
- Lift state to the smallest level that needs it. Use Zustand only for state shared across pages.
- Use `useState` for client state. Keep `useEffect` dependency arrays complete.
- A data path covers three states: loading skeleton, empty component, and error with retry.
- Navigate with React Router APIs: `<Link>`, `useSubmit()`, or `navigate()`. A native `<a href>` is allowed only for external downloads.
- New coss components follow the existing pattern: Base UI `useRender` + `mergeProps` + cva variants + `cn()`.
- Name event callbacks `onXxx`: `onSelect`, `onDelete`.

### Forbidden

| Forbidden                                                   | Use instead                                                        |
| ----------------------------------------------------------- | ------------------------------------------------------------------ |
| `any`, including implicit `any`                             | A concrete type, or `unknown` plus narrowing                       |
| `window.location.href` or `location.reload()` in components | `useLocation()` or `useRevalidator()`                              |
| Hardcoded colors                                            | Design tokens: `bg-background`, `text-muted-foreground`, and so on |
| Reading `window` or `document` during render                | Effects or client-only hooks                                       |
| Wildcard imports                                            | Explicit imports                                                   |
| Debug `console.log` left in the diff                        | Remove it. ESLint does not block it (`no-console` is off).         |

## Tailwind and UI

- All colors come from CSS variables defined in `app/app.css`. Hex values and `rgb()` calls are forbidden in components. See [ui-design/visual.md](../ui-design/visual.md).
- Dark mode is first-class. Every component works in both themes through the `.dark` variable set.
- Reuse `~/components/ui/` before writing markup.
- Write mobile-first, then enhance with `sm:`, `md:`, and `lg:`.
- Keep interaction transitions between 150 and 350 ms.

## Testing

### Naming

`methodName_condition_expectedResult()`

```ts
describe('generateSEOMeta', () => {
  it('withTitle_overridesPageTitle', () => { /* ... */ })
})
```

### Structure

Given-When-Then:

```ts
it('generateTitle_withPageTitle_appendsSiteName', () => {
  // Given
  const pageTitle = 'Home'
  // When
  const result = generateTitle(pageTitle)
  // Then
  expect(result).toBe(`Home — ${siteConfig.name}`)
})
```

### Rules

- Prefer pure functions. Files in `app/lib/` are testable without mocks.
- Use fakes over mocks. Data-layer tests use real implementations or lightweight fakes.
- Colocate test files with the source: `*.spec.ts`. Configuration is in `vitest.config.ts`.
- The test environment is `node`; tests include `app/**/*.spec.ts`.

### Coverage

```bash
bun run test
bun run test:coverage
```

Coverage covers `app/lib/**/*.ts` and excludes `*.spec.ts` and `app/lib/env.server.ts`. All four thresholds (lines, functions, statements, branches) are 55%.

UI components and routes are outside the coverage gate. File-level coverage mixed with UI code produces misleading numbers.

## Verification and honesty

Tests only carry signal if they can fail. A green run means no assertion failed, not that the behavior works.

- **Red first, then green**: Confirm a new assertion fails against a wrong implementation before it passes.
- **Every `it` has at least one assertion**: No empty `describe` blocks, all-`skip` suites, `only`, or conditional assertions presented as passing.
- **Behavior first**: A source scan (`expect(source).toContain('literal')`) is a structural check, not evidence of behavior.
- **No red baseline**: Fix or remove a known failing check before merging.
- **Report honestly**: State which commands ran, whether they passed, and what did not run. Write "not verified" when unsure.

## Documentation and copy

- User-facing copy follows [writing-style.md](../writing-style.md).
- Empty states answer what this is, why it is empty, and what to do next. Errors give an executable next step.
- Paths, commands, routes, and field names in docs must match the code. Update docs in the same change.

## Lint and typecheck

```bash
bun run lint          # eslint . --max-warnings=0
bun run lint:fix      # eslint . --fix
bun run typecheck     # react-router typegen && tsc
```

- Do not skip lefthook hooks with `--no-verify`.
- Leave no `TODO()`. Use `FIXME` with a tracked issue.
