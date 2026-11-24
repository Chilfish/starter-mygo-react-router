# Page and Component Structure

> Start here when adding a page, splitting a page, or adding a component. Visual values are in [visual.md](./visual.md), state details in [feedback.md](./feedback.md), density rules in [information-density.md](./information-density.md), and engineering rules in [code-style.md](../engineering/code-style.md).

## 0. Information budget

Before writing markup, answer in one sentence: **who opens this page, what do they need to know, and what do they do next?** Anything that does not serve that sentence goes into a dialog, sheet, or secondary page.

- Give the answer on the first screen: status, key numbers, pending work. Notes and details follow.
- Keep one primary action per view (filled button). Secondary actions use `ghost` or `outline`; low-frequency actions go into a menu.
- Show at most four key numbers per screen. Full statistics belong in a dialog or secondary page.
- Move complex configuration into a dialog or sheet. The page keeps a summary and an entry point.
- A section does one thing. Do not render an empty section or an empty card.
- Show each fact once; delete repeated notes.
- Check: remove a section. If the page still answers the core question, delete that section.

## 1. Page skeleton

The page fills the available height. The toolbar stays fixed; the content area scrolls.

```tsx
<div className="flex h-dvh min-h-0 flex-col bg-background">
  <header className="flex shrink-0 items-center gap-2 border-b px-4 py-2">
    {/* Title, count, search, or filters */}
    <div className="ml-auto flex items-center gap-1">{/* At most three control clusters */}</div>
  </header>

  <ScrollArea className="min-h-0 flex-1">
    {/* List or content */}
  </ScrollArea>
</div>
```

- The page container handles data, route parameters, and composition. Keep it under 250 lines.
- Shared components live in `app/components/shared/`. Sections private to one page live in a `<name>/` directory beside the route.
- Pure logic lives in `app/lib/` with a colocated `*.spec.ts`.
- Presentational components receive props; they do not read route data directly.
- `ScrollArea` sets `size-full min-h-0`; its parent needs a definite height.

## 2. Page types

| Type            | Structure                                                               | Use                                |
| --------------- | ----------------------------------------------------------------------- | ---------------------------------- |
| List            | Title row (title, count, search) + list + bottom loading                | Records, logs, notifications       |
| List and detail | List on the left, detail on the right; narrow screens use a full page   | Mail, messages, datasets           |
| Grid            | Title row + groups + grid; toolbar stays on one line                    | Images, files, card collections    |
| Overview        | Status + primary action + at most four numbers + recent items           | Home, dashboard                    |
| Form            | Title + `Field` / `Fieldset` + bottom submit bar                        | Settings, create, edit             |
| Settings        | Category rail + `FramePanel` groups + row controls                      | Preferences, account, integrations |
| Result          | State icon + title + explanation + one primary and one secondary action | Success, failure, 404, no access   |

**Long lists**

- Prefer `ScrollArea` with pagination or cursor loading. Add a virtual list only when hundreds of rows render at once.
- Match the first-screen skeleton count to the visible rows to reduce layout shift.
- Load more with a `Spinner` and "Loading"; show "End of list" at the bottom.
- Put pagination in the URL so a back navigation returns to the same page.

**Filters and the URL**

- Filters that change the result set go into the URL: `?q=`, `?status=`, `?page=`, `?sort=`.
- Display preferences (view mode, density, sidebar state) go into the `appConfig` store or component state and survive reloads.
- When a filter changes, clear selections tied to the old result set.
- Read and write search params with `useSearchParams`. Navigate with `<Link>` or `navigate()`.

## 3. Toolbar

- Left: page name and total count. Use `tabular-nums` for the count.
- Right: up to three control clusters, in priority order:
  1. one primary control (search, filter, or primary button);
  2. a frequent toggle (`SegmentedControl`, `ToggleGroup`);
  3. an overflow menu (`DropdownMenu`) for low-frequency and maintenance actions.
- When more than three mutually exclusive options exist, put a labeled control group in a `Popover`. Show a small dot on the trigger while a filter is active.
- Icon buttons use `size="icon-sm"` and provide both `aria-label` and `title`.
- During batch selection, replace the whole toolbar with a batch bar. Order: select all, primary action, secondary action, cancel.
- Use `Toolbar` for grouped controls in a header. It is a bordered control container, not a replacement for the page `<header>`.

## 4. Rows and cards

**List rows**

- Row height 56–80 px; horizontal padding 16 px.
- Arrange content as primary information, secondary information, then right-side actions.
- Hover changes background or opacity without changing size. Selection uses a 2 px primary outline or `bg-accent`.
- Truncate overflowing text. Right-align numeric columns.

**Cards**

- Use `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardPanel` (`CardContent` is an alias), and `CardFooter`.
- A card holds one independent object and its detail entry point. Homogeneous content belongs in a list or table.
- The component supplies its radius (`rounded-2xl`). Do not override it.
- Never nest cards. Use `Frame` / `FramePanel` or a divider for grouping.
- Settings pages use `Frame` plus `FramePanel`, not one card per row.

## 5. Three states

| State   | Components                                                                             | Rule                                                                         |
| ------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Empty   | `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, `EmptyContent` | Say what this is, why it is empty, and the next step                         |
| Loading | `Skeleton`, `Spinner`, `Button loading`, `ProgressBar`                                 | Skeleton for first paint, tail spinner for paging, loading on button actions |
| Failure | `ErrorBoundary`, `ErrorDisplay`, `Alert`                                               | Explain the cause and offer retry; stacks go to the log                      |

Full rules and copy examples are in [feedback.md](./feedback.md).

## 6. Data and state

- Client data fetching uses `clientLoader` and `clientAction`. This is a static SPA: never export a server `loader` or `action`.
- Client interaction state uses `useState`. Use Zustand (`app/stores/`) only for state shared across pages.
- Every data path covers loading, empty, and error.
- Declare request and result types explicitly. Do not use `any`.
- Submit forms with `useSubmit()` or `<Form>`; never call `form.submit()`.
- Route transitions use the `ProgressBar` in `root.tsx`. Button-level pending state uses `useIsPending()`.
- When a persisted store schema changes, increase `version` and write a migration. Check `useHydrated()` before rendering persisted values.

## 7. Accessibility

- Give every icon button an `aria-label`; mark decorative icons `aria-hidden="true"`.
- Use headings in order: `h1` → `h2` → `h3`. Do not skip a level.
- Tab order matches visual order. `Esc` closes the top overlay and focus returns to the trigger.
- Use `focus-visible:ring-2`. Never remove the outline without a replacement.
- Pair color states with text or an icon.
- Touch targets are at least 44×44 px. The button component handles this with `pointer-coarse` styles.
- Respect `prefers-reduced-motion`; keep fades when motion is reduced.

## 8. New page checklist

- [ ] The route is registered in `app/routes.ts` and exports `meta`.
- [ ] The route module imports `import type { Route } from './+types/<name>'`.
- [ ] The page container stays under 250 lines; data fetching and logic are extracted.
- [ ] Empty, loading, and failure states exist.
- [ ] The toolbar has at most three clusters and one primary action.
- [ ] Filters go into the URL; display preferences go into the store.
- [ ] Internal navigation uses `<Link>`, submissions use `useSubmit()`, redirects use `navigate()`.
- [ ] Icon buttons have `aria-label`; the keyboard path works.
- [ ] Spacing, radius, and type match [visual.md](./visual.md).
- [ ] Pure logic has a colocated `*.spec.ts`, and the test can fail.
- [ ] `bun run typecheck`, `bun run lint`, `bun run test`, and `bun run build` pass.

## 9. Component cheat sheet

| Need                        | Component                                 |
| --------------------------- | ----------------------------------------- |
| Single choice (2–4 options) | `SegmentedControl`                        |
| Icon toggle                 | `ToggleGroup` / `Toggle`                  |
| Dropdown choice             | `Select`                                  |
| Searchable choice           | `Combobox` / `Autocomplete` / `Command`   |
| Labeled filter panel        | `Popover` + `Select` / `SegmentedControl` |
| Low-frequency actions       | `DropdownMenu` / `ContextMenu`            |
| Inline notice               | `Alert`                                   |
| Destructive confirmation    | `AlertDialog`                             |
| Self-contained task         | `Sheet` / `Dialog`                        |
| Mobile bottom panel         | `Drawer` (`position="bottom"`)            |
| Search input                | `InputGroup` + `InputGroupInput`          |
| Short labels and status     | `Badge`                                   |
| Keyboard hints              | `Kbd` / `Tooltip`                         |
| Loading                     | `Skeleton` / `Spinner` / `Progress`       |
| Empty state                 | `Empty`                                   |
| Long scrolling content      | `ScrollArea`                              |

Full import paths and APIs are in [GENERAL.md](./GENERAL.md).
