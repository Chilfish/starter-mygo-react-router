# UI Design System

> Entry point for interface rules: design tokens, page structure, state feedback, interaction, and information density.
> Scope: pages, components, and styles under `app/`. Read this page before adding a page or component, then open the document for the task.

## Document map

| Document                                           | Contents                                                       | Read when                            |
| -------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------ |
| [visual.md](./visual.md)                           | Color, type, spacing, radius, elevation, motion, component map | Styling, tokens, visual review       |
| [patterns.md](./patterns.md)                       | Information budget, page skeleton, page types, toolbars, lists | Adding a page, splitting a component |
| [information-density.md](./information-density.md) | What to cut, budgets, overstuffed-page signals, review tests   | Reviewing a dense screen             |
| [feedback.md](./feedback.md)                       | Empty, loading, error, overlays, toasts, copy patterns         | Wiring data and states               |
| [interaction.md](./interaction.md)                 | Keyboard, navigation, URL state, persistence, hydration, touch | Interaction and state                |
| [GENERAL.md](./GENERAL.md)                         | Button, Input, Card, Dialog, Toast, and icon usage             | Using `~/components/ui/`             |
| [research.md](./research.md)                       | Sources, adopted rules, trade-offs, review method              | Changing a rule or adding a pattern  |

This directory holds reusable rules only. Page progress belongs in [planning/backlog.md](../planning/backlog.md); implementation notes belong in [development-log/](../development-log/).

## Design stance

1. **Answer first**: The first screen states the current status and the next action. Details go into a secondary area.
2. **Hierarchy comes from choices**: Each view keeps one primary action and one set of key numbers. Everything else is demoted.
3. **Keep surfaces simple**: Use whitespace and dividers to group. A card holds one independent object; never nest cards.
4. **Tokens are the only color source**: Colors and radii come from `app/app.css`. Components contain no one-off hex or `rgb()`. Overlays and shadows may use `black` or `white` with opacity.
5. **Mobile first**: Write the base layout, then enhance with `sm:`, `md:`, and `lg:`. Touch targets are at least 44 px.
6. **Primitives first**: Interaction uses `~/components/ui/` (coss on Base UI). Tailwind handles layout.
7. **States are explicit**: Loading, empty, and error are separate states. `0` appears only when the value is really zero.
8. **Docs are facts**: Paths, component names, and tokens match the current code. Update docs with the code.

## Pre-generation checklist

- [ ] Check `~/components/ui/` for an existing component before writing new markup.
- [ ] Use tokens only: `bg-background`, `text-muted-foreground`, `border-input`. No `#fff` or `bg-[#...]`.
- [ ] Light and dark both hold. Do not override colors with `dark:` in components.
- [ ] Interactive elements have hover (pointer), active (touch), and `focus-visible` states.
- [ ] Data paths cover loading, empty, and error.
- [ ] Internal navigation uses `<Link>`; submissions use `useSubmit()`; redirects use `navigate()`.
- [ ] Class names are merged with `cn()`, not concatenated by hand.
- [ ] Icon buttons have `aria-label`; decorative icons use `aria-hidden`.
- [ ] New routes are registered in `app/routes.ts`, then `bun run typecheck` refreshes `+types/*`.

## Current conventions

| Item        | Value                                                                                                |
| ----------- | ---------------------------------------------------------------------------------------------------- |
| Stack       | React 19 + React Router v8 SPA + Tailwind CSS v4 + coss / Base UI, hosted by MyGo                    |
| Theme       | `.dark` class plus CSS variables; light, dark, and system modes persist through `appConfig`          |
| Fonts       | `Inter` (`--font-sans`, `--font-heading`); `Geist Mono` (`--font-mono`)                              |
| Primary     | `rgb(29, 155, 240)`                                                                                  |
| Radius      | `--radius: 0.625rem` (10 px)                                                                         |
| Breakpoints | Tailwind defaults for CSS; `useMediaQuery` uses `sm` 640, `md` 800, `lg` 1024, `xl` 1280, `2xl` 1536 |
| Mobile hook | `useIsMobile()` from `~/hooks/use-media-query` (< 800 px). `app/hooks/use-mobile.ts` is unused.      |
| Layout      | Single column on mobile; sidebar or two columns from `md`; a narrow detail view becomes a full page  |
| Feedback    | `Empty`, `Skeleton`, `Spinner`, `Alert`, `toastManager`                                              |
| Overlays    | `Dialog`, `AlertDialog`, `Sheet`, `Drawer`, `Popover`, `DropdownMenu`                                |

Note: Tailwind's default `md` is 768 px, while `useMediaQuery('md')` switches at 800 px. A `md:` class and a `useMediaQuery` check do not change at the same width.

## Maintenance

- Update this page and [docs/README.md](../README.md) when a document is added, moved, or removed.
- Change the document before changing the code. The template keeps no one-off page plans or dated redesign logs.
- Review in the order listed in [research.md § Review method](./research.md#review-method).
