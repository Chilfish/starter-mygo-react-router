# Component Usage

> **Rule:** Prefer the coss components in `~/components/ui/`. Do not hand-build a `<div>` or `<button>` that mimics an existing component.
>
> **Base:** Base UI primitives plus Tailwind CSS and CVA variants. Components ship with accessibility, focus management, and default styles.
>
> **Reference:** <https://coss.com/ui/llms.txt>

## 0. Global rules

### 0.1 Import path

Import every UI component from `~/components/ui/<name>`. Never import from a relative path or from `node_modules`.

```tsx
// Correct
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Card, CardHeader, CardPanel } from '~/components/ui/card'

// Wrong
import { Button } from '@/components/ui/button'   // do not use @/
import { Input } from '../components/ui/input'    // no relative paths
```

### 0.2 Class merging

Merge class names with `cn()` from `~/lib/utils` (wrapper around `clsx` and `tailwind-merge`).

```tsx
import { cn } from '~/lib/utils'

<div className={cn('base-class', condition && 'conditional-class', className)} />
```

### 0.3 Do not add padding around coss components

Base UI components handle their own spacing. Extra padding on the wrapper breaks internal alignment.

## 1. Button

Import path: `~/components/ui/button`

### 1.1 Variants

| Variant               | Classes                                                                 | Use                                                         |
| --------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------- |
| `default`             | `border-primary bg-primary text-primary-foreground` plus a small shadow | The single primary action on a page (submit, confirm, save) |
| `secondary`           | `bg-secondary text-secondary-foreground`                                | Secondary actions (cancel, back, reset)                     |
| `outline`             | `border-input bg-popover text-foreground`                               | Neutral actions with a border (export, preview)             |
| `ghost`               | `border-transparent hover:bg-accent`                                    | Toolbar icon buttons, inline actions                        |
| `destructive`         | `bg-destructive text-white`                                             | Irreversible actions (delete, clear)                        |
| `destructive-outline` | Border plus destructive text                                            | Low-emphasis destructive actions                            |
| `link`                | `underline-offset-4 hover:underline`                                    | Text-link style button                                      |

### 1.2 Sizes

| Size                  | Mobile height        | From `sm` up  | Use                                      |
| --------------------- | -------------------- | ------------- | ---------------------------------------- |
| `xs`                  | `h-7`                | `h-6`         | Compact table rows, batch bars           |
| `sm`                  | `h-8`                | `h-7`         | Toolbars, card footers                   |
| `default`             | `h-9`                | `h-8`         | Most common; form submit, dialog confirm |
| `lg`                  | `h-10`               | `h-9`         | Large card call to action                |
| `xl`                  | `h-11`               | `h-10`        | Sign-in and landing page primary button  |
| `icon-xs` … `icon-xl` | `size-7` … `size-11` | One step down | Icon-only buttons                        |

The `pointer-coarse` styles expand the touch area to 44×44 px. Do not add padding in the page.

### 1.3 Usage

```tsx
// Standard buttons
<Button variant="default">Submit</Button>
<Button variant="ghost" size="icon-sm" aria-label="Settings"><SettingsIcon /></Button>

// Loading state
<Button loading>Saving</Button>

// Press feedback on a primary action
<Button className="active:scale-[0.97]">Confirm payment</Button>

// Wrong: hand-built button
<button className="rounded bg-blue-500 px-4 py-2 text-white">Confirm</button>
```

## 2. Input

Import path: `~/components/ui/input`

### 2.1 Standard usage

```tsx
import { Input } from '~/components/ui/input'

<Input placeholder="Username" size="default" />   // "sm" | "default" | "lg"

<Input disabled placeholder="Read only" />

<Input type="file" />
```

### 2.2 InputGroup for icons and affixes

Use `InputGroup` instead of absolute positioning an icon inside a wrapper.

```tsx
import { InputGroup, InputGroupAddon, InputGroupInput } from '~/components/ui/input-group'
import { SearchIcon } from 'lucide-react'

// Correct
<InputGroup>
  <InputGroupAddon align="inline-start">
    <SearchIcon className="size-4 text-muted-foreground" />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search" />
</InputGroup>

// Wrong
<div className="relative">
  <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2" />
  <Input className="pl-8" />
</div>
```

- Icons use `size-4` (16 px) and `text-muted-foreground`.
- `InputGroupAddon` accepts `align`: `inline-start` (default), `inline-end`, `block-start`, and `block-end`.

### 2.3 Borderless input in a settings row

There is no `SettingsItem` component. Build the row with `FramePanel` or a plain container, then neutralize the input when it sits in the row.

```tsx
<Input
  className="h-8 w-[200px] border-none bg-transparent px-0 text-right shadow-none focus-visible:ring-0"
  defaultValue="Alice"
/>
```

## 3. Card

Import path: `~/components/ui/card`

### 3.1 Usage

```tsx
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from '~/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardPanel>
    {/* Content */}
  </CardPanel>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </CardFooter>
</Card>
```

Available exports: `Card`, `CardFrame`, `CardFrameHeader`, `CardFrameTitle`, `CardFrameDescription`, `CardFrameAction`, `CardFrameFooter`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardPanel` (alias `CardContent`), and `CardFooter`.

### 3.2 Rules

- Never nest a `Card` inside a `Frame` or `FramePanel`. Use `FramePanel` directly for a settings group.
- Never nest a `Card` inside `CardPanel`. Split with `Frame`, a divider, or sibling cards.
- Do not use cards for homogeneous records. Lists and tables scan and compare faster.

## 4. Overlays

### 4.1 Dialog

Import path: `~/components/ui/dialog`

```tsx
import { Dialog, DialogDescription, DialogHeader, DialogPopup, DialogTitle } from '~/components/ui/dialog'

<Dialog open={open} onOpenChange={setOpen}>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Edit name</DialogTitle>
      <DialogDescription>The name appears in lists and search results.</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogPopup>
</Dialog>
```

- `DialogPopup` is also exported as `DialogContent`; the two names are equivalent.
- It includes `backdrop-blur-sm` and enter/exit animation.
- `bottomStickOnMobile` defaults to `true`. Pass `false` to center the dialog on mobile.
- Use `AlertDialog` for irreversible actions such as delete or cancel.

### 4.2 Drawer and Sheet

Import path: `~/components/ui/drawer` or `~/components/ui/sheet`

- `Drawer` accepts `position="bottom" | "top" | "left" | "right"` (default `bottom`) and supports swipe dismissal. `showBar` renders the drag handle. `showCloseButton` defaults to `false`.
- `Sheet` accepts `side="right" | "left" | "top" | "bottom"` and defaults to `right`. It shows a close button by default.
- Neither switches form with viewport width. Choose the form in the page, or use a `Dialog` with `bottomStickOnMobile`.

### 4.3 Toast

Import path: `~/components/ui/toast`

`root.tsx` mounts `<ToastProvider>` and `<AnchoredToastProvider>`. Components call `toastManager.add()`; anchored messages use `anchoredToastManager`.

```tsx
import { toastManager } from '~/components/ui/toast'

toastManager.add({ title: 'Saved', type: 'success' })
```

- `ToastProvider` defaults to `bottom-right`. Set `position` in `root.tsx`, not per page.
- Types: `success`, `error`, `info`, `warning`, and `loading`. Icons and colors come from the component.
- Do not restyle the toast with one-off colors.
- Use `Alert` or `Badge` for persistent state. A toast is not a status display.

## 5. Icons

- Library: `lucide-react`.
- Default size: `size-4` (16 px).
- Icons inside `Button` are sized by the button variant. Mobile uses `size-4.5`; from `sm` up it uses `size-4`; `xl` and `icon-xl` use `size-5`.
- Micro icons: `size-3.5` (14 px) for metadata.
- Color: icons inherit `currentColor`. Secondary icons use `text-muted-foreground`. Never use pure black or white.

```tsx
<SearchIcon className="size-4 text-muted-foreground" />
<SettingsIcon className="size-5" />

// Wrong
<SearchIcon className="size-4 text-black dark:text-white" />
```

## 6. Utilities

### 6.1 `cn()`

```tsx
import { cn } from '~/lib/utils'

<div className={cn('base-style', variant === 'primary' && 'text-primary', className)} />
```

### 6.2 `useMediaQuery` and `useIsMobile`

Import from `~/hooks/use-media-query`. `app/hooks/use-mobile.ts` is an unused duplicate; do not add new references to it.

```tsx
import { useIsMobile, useMediaQuery } from '~/hooks/use-media-query'

const isMobile = useIsMobile()                        // below 800 px
const isDesktop = useMediaQuery('lg')                 // 1024 px and up
const isTouch = useMediaQuery({ pointer: 'coarse' })  // touch input
```

- Breakpoints: `sm` 640, `md` 800, `lg` 1024, `xl` 1280, `2xl` 1536.
- A raw CSS media query string also works.
- The server snapshot is always `false`. Do not render unique content from it on first paint.

## 7. Anti-patterns

| Wrong                                                           | Correct                                                                  |
| --------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `<button className="rounded bg-blue-500 px-4 py-2 text-white">` | `<Button>`                                                               |
| `<div className="absolute left-2 top-1/2"><Icon /></div>`       | `<InputGroup><InputGroupAddon><Icon /></InputGroupAddon></InputGroup>`   |
| `<div className="rounded-xl bg-white p-6 shadow">`              | `<Card><CardPanel>...</CardPanel></Card>`                                |
| `className="border-b border-gray-200"` in a settings list       | `Frame` + `FramePanel`, with `Separator` or `border-border` between rows |
| `text-black dark:text-white`                                    | `text-foreground`                                                        |
| `bg-white dark:bg-gray-900`                                     | `bg-background` or `bg-card`                                             |
| `<hr />` between sections                                       | `<Separator />` from `~/components/ui/separator`                         |
| Importing `@/components/ui/button`                              | Importing `~/components/ui/button`                                       |
