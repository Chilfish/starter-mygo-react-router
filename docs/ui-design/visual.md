# Visual System: Color, Type, Spacing, and Motion

> Reusable visual rules. Values come from [`app/app.css`](../../app/app.css). Component usage is in [GENERAL.md](./GENERAL.md), page structure in [patterns.md](./patterns.md), and rationale in [research.md](./research.md).

## Design language

**Answer first, then list.** A screen starts with the current status and the next action. Details live in a secondary area. Design the first screen for a five-second scan.

**Hierarchy comes from choices.** Each view keeps one primary action and one set of key numbers. Secondary actions use `ghost` or `outline`; low-frequency actions go into a menu.

**Keep surfaces simple.** Group with whitespace and section titles; add one divider where a boundary is needed. A card holds one independent object, the screen keeps one elevation level, and cards never nest. Visible shadows appear only on overlays; cards use at most a very light shadow.

**Limit color.** One primary color, one neutral scale, and three semantic colors. Semantic colors express state only; decoration comes from the content. Surfaces use solid colors; gradients are reserved for brand artwork or media placeholders.

**Typography sets rhythm.** Adjacent type sizes differ by at least 2 px. Use weight and color for hierarchy, not small size adjustments.

**Motion explains change.** Entrances fade in with a small offset, exits reverse it. Looping animation is for loading only.

## 1. Color

### 1.1 Tokens

Every color is mapped through Tailwind v4 `@theme inline` to a `color-*` token. Light values live in `:root`; dark values live in `.dark`.

| Token                          | Light                                            | Dark                                                       | Use                                     |
| ------------------------------ | ------------------------------------------------ | ---------------------------------------------------------- | --------------------------------------- |
| `background`                   | `white`                                          | `neutral-950` 95% + white                                  | Page base                               |
| `foreground`                   | `neutral-800`                                    | `neutral-100`                                              | Body text and headings                  |
| `card`                         | `white`                                          | `background` 98% + white                                   | Cards and panels                        |
| `popover`                      | `white`                                          | `background` 98% + white                                   | Overlays, menus, popups                 |
| `primary`                      | `rgb(29, 155, 240)`                              | `rgb(29, 155, 240)`                                        | Primary action, selection, focus ring   |
| `primary-foreground`           | `white`                                          | `white`                                                    | Text on primary                         |
| `secondary`                    | `black` 4%                                       | `white` 4%                                                 | Secondary buttons and areas             |
| `muted`                        | `black` 4%                                       | `white` 4%                                                 | Skeletons, low-emphasis backgrounds     |
| `muted-foreground`             | `neutral-500` 90% + black                        | `neutral-500` 90% + white                                  | Captions, placeholders, secondary icons |
| `accent`                       | `black` 4%                                       | `white` 4%                                                 | Hover and selected highlight            |
| `destructive`                  | `red-500`                                        | `red-500` 90% + white                                      | Delete and error                        |
| `destructive-foreground`       | `red-700`                                        | `red-400`                                                  | Destructive text and icons              |
| `border`                       | `black` 8%                                       | `white` 6%                                                 | Card borders and dividers               |
| `input`                        | `black` 10%                                      | `white` 8%                                                 | Input and control borders               |
| `ring`                         | `primary`                                        | `primary`                                                  | `focus-visible` ring                    |
| `info` / `success` / `warning` | `blue-500` / `emerald-500` / `amber-500`         | Same                                                       | Status colors                           |
| `sidebar`                      | `neutral-50`                                     | `neutral-950` 97% + white                                  | Sidebar background                      |
| `chart-1` … `chart-5`          | orange / teal / cyan-900 / amber-400 / amber-500 | blue-700 / emerald-500 / amber-500 / purple-500 / rose-500 | Chart categories                        |

Full values are in [`app/app.css`](../../app/app.css). Add a token before using a new color; never write a one-off value in a component.

### 1.2 Usage

```tsx
// Correct: semantic tokens
<div className="bg-background text-foreground">
  <p className="text-muted-foreground">Secondary note</p>
  <Button>Confirm</Button>
</div>

// Wrong: hardcoded colors
<div className="bg-white text-black">
  <p className="text-gray-500">Secondary note</p>
  <button className="bg-blue-500 text-white">Confirm</button>
</div>

// Wrong: light mode only
<div className="bg-white">...</div>
```

- The `.dark` variable set switches light and dark values. Components do not override colors with `dark:`.
- Express state with text or an icon as well as color.
- `primary` against white is approximately 3:1. It suits large text, graphics, and focus rings. Body text and small buttons need higher contrast: use `foreground`, or define a darker brand variant in the product.
- Charts use `chart-*`; do not derive chart colors from the brand color on the fly.

## 2. Typography

| Item         | Value                                                  |
| ------------ | ------------------------------------------------------ |
| Body font    | `Inter` (`--font-sans`)                                |
| Heading font | `Inter` (`--font-heading`)                             |
| Mono font    | `Geist Mono` (`--font-mono`), for IDs, paths, and code |
| Numbers      | `tabular-nums`, for statistics, time, and money        |

`@fontsource-variable/noto-sans` is imported in `app/app.css` but no token references it yet.

### 2.1 Type scale

| Level           | Tailwind                          | Use                                   |
| --------------- | --------------------------------- | ------------------------------------- |
| Page title      | `text-2xl font-bold` / `text-3xl` | Route-level title                     |
| Section title   | `text-xl font-semibold`           | Section and empty-state title         |
| Card title      | `text-lg font-semibold`           | `CardTitle`, dialog title             |
| Emphasized body | `text-base font-medium`           | Key notes, mobile buttons             |
| Body            | `text-sm`                         | Default body                          |
| Secondary text  | `text-xs text-muted-foreground`   | Descriptions, timestamps, field notes |
| Micro text      | `text-[0.6875rem]`                | Very small metadata                   |

- Body line height is 1.5. Long text wraps and scrolls; do not fix its height.
- Buttons use `text-base` on mobile and `text-sm` from `sm` up. This is built into the component.
- Numbers and times use tabular figures; technical fields use `font-mono`.

## 3. Spacing and radius

### 3.1 Spacing

Base unit: 4 px (Tailwind `1` = 0.25rem).

| Value | Pixels | Use                                          |
| ----- | ------ | -------------------------------------------- |
| `1`   | 4 px   | Icon-to-text gap                             |
| `2`   | 8 px   | List row padding, label spacing              |
| `3`   | 12 px  | Control padding, compact sections            |
| `4`   | 16 px  | Card padding, content area                   |
| `6`   | 24 px  | Section spacing                              |
| `8`   | 32 px  | Large page sections                          |
| `12`  | 48 px  | Page top padding, empty-state vertical space |

### 3.2 Radius

Based on `--radius: 0.625rem` (10 px).

| Token          | Value | Use                              |
| -------------- | ----- | -------------------------------- |
| `rounded-sm`   | 6 px  | Small badges, skeletons          |
| `rounded-md`   | 8 px  | Compact buttons, menu items      |
| `rounded-lg`   | 10 px | Default buttons, inputs, toasts  |
| `rounded-xl`   | 14 px | Alerts, `FramePanel`             |
| `rounded-2xl`  | 18 px | Cards, dialogs, sheets, drawers  |
| `rounded-3xl`  | 22 px | Large containers                 |
| `rounded-4xl`  | 26 px | Full-bleed visual containers     |
| `rounded-full` | Full  | Avatars, progress bars, switches |

- Keep radii concentric: the outer radius is roughly the inner radius plus the padding.
- Media blocks use `rounded-lg`; avatars are fully round.
- Do not invent a one-off radius for a single page.

## 4. Elevation

| Layer         | Expression                                   | Use                                  |
| ------------- | -------------------------------------------- | ------------------------------------ |
| Page          | No shadow                                    | `background`                         |
| Section       | Whitespace plus optional `border-b`          | Content grouping                     |
| Card          | `border` plus a very light shadow (built in) | Independent objects, settings panels |
| Overlay       | `shadow-lg/5` plus backdrop blur             | Dialogs, sheets, menus               |
| Dragged layer | Overlay shadow plus offset                   | Drawers                              |

One elevation level per screen. Do not place a shadowed card inside a card; use `Frame` / `FramePanel` or a divider instead.

## 5. Motion

| Case              | Duration   | Easing                           |
| ----------------- | ---------- | -------------------------------- |
| Hover and focus   | 150 ms     | `ease-out`                       |
| Fade              | 200–250 ms | `--ease-apple`                   |
| Dialog and sheet  | 200 ms     | `ease-in-out`                    |
| Drawer            | 450 ms     | `cubic-bezier(0.32, 0.72, 0, 1)` |
| Segmented control | 200 ms     | `ease-in-out`                    |
| Skeleton          | 2 s loop   | `linear`                         |

```tsx
// Standard transition
<div className="transition-colors duration-200 ease-out hover:bg-accent/50" />

// Spring only for drawers and segmented indicators
<div className="transition-transform duration-300 ease-[var(--ease-spring)]" />
```

- Custom motion stays between 150 and 350 ms. Above 500 ms, interaction feels slow.
- Under `prefers-reduced-motion: reduce`, keep fades and drop movement and scale.
- Looping animation is for loading only, never for decoration.

## 6. Component map

| Need                     | Component                                                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Buttons                  | `button.tsx`: `default`, `secondary`, `outline`, `ghost`, `destructive`, `destructive-outline`, `link`                  |
| Inputs and search        | `input.tsx`; with icons, use `input-group.tsx`                                                                          |
| Form structure           | `field.tsx`, `fieldset.tsx`, `form.tsx`                                                                                 |
| Choice                   | `select.tsx`, `combobox.tsx`, `autocomplete.tsx`, `checkbox.tsx`, `checkbox-group.tsx`, `radio-group.tsx`, `switch.tsx` |
| Segmented and toggles    | `segmented-control.tsx`, `toggle-group.tsx`, `toggle.tsx`                                                               |
| Cards and panels         | `card.tsx`, `frame.tsx`, `group.tsx`                                                                                    |
| Sidebar and toolbar      | `sidebar.tsx`, `toolbar.tsx`, `breadcrumb.tsx`                                                                          |
| Tabs                     | `tabs.tsx`                                                                                                              |
| Data display             | `table.tsx`, `badge.tsx`, `avatar.tsx`, `pagination.tsx`, `progress.tsx`, `meter.tsx`                                   |
| Empty and loading        | `empty.tsx`, `skeleton.tsx`, `spinner.tsx`                                                                              |
| Feedback                 | `alert.tsx`, `toast.tsx`, `tooltip.tsx`, `kbd.tsx`                                                                      |
| Overlays                 | `dialog.tsx`, `alert-dialog.tsx`, `sheet.tsx`, `drawer.tsx`                                                             |
| Menus                    | `dropdown-menu.tsx`, `context-menu.tsx`, `command.tsx`, `menu.tsx`                                                      |
| Popup content            | `popover.tsx`, `preview-card.tsx`                                                                                       |
| Scrolling and disclosure | `scroll-area.tsx`, `collapsible.tsx`, `accordion.tsx`                                                                   |
| Media                    | `media.tsx`                                                                                                             |
| Specialized input        | `calendar.tsx`, `number-field.tsx`, `otp-field.tsx`, `slider.tsx`, `textarea.tsx`                                       |

Import every component from `~/components/ui/<name>`. APIs and counterexamples are in [GENERAL.md](./GENERAL.md).

## 7. Common anti-patterns

| Symptom                                       | Rule                                                                         |
| --------------------------------------------- | ---------------------------------------------------------------------------- |
| Purple-blue gradients, decorative glow        | Primary plus neutrals; gradients only for brand art or media placeholders    |
| Every card has a border and a shadow          | Default to no container; group with whitespace or one divider                |
| A card inside a card                          | One surface; split with `FramePanel` or a divider                            |
| Every section has the same weight             | One primary action, one set of key numbers, the rest demoted                 |
| A row of equal-weight stat cards              | Start with the conclusion and the next action; cap numbers at four           |
| Type sizes differ by 1–2 px                   | Use the fixed scale; keep at least 2 px between steps                        |
| Empty data shown as `0`                       | Show loading, error, or empty with a next step                               |
| Every screen filled with configuration        | Move configuration into a dialog or sheet; keep a summary and an entry point |
| Hand-written `<div>` buttons and inputs       | Use `Button`, `Input`, `InputGroup`                                          |
| Color alone distinguishes success and failure | Color plus text or an icon                                                   |

## 8. References

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [NN/g: Visual Hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
- [NN/g: Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
- [NN/g: Cards](https://www.nngroup.com/articles/cards-component/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [coss UI](https://coss.com/ui) / [Base UI](https://base-ui.com/)
