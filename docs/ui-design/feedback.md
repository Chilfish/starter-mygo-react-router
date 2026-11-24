# Empty, Loading, Error, and Feedback

> Shared rules for states and feedback. Choose components and copy from this page when adding a page. Page structure is in [patterns.md](./patterns.md); component APIs are in [GENERAL.md](./GENERAL.md).

## 1. Empty states

An empty state answers three questions:

1. What is this area?
2. Why is it empty now?
3. What is the next step?

```tsx
import { InboxIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '~/components/ui/empty'

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <InboxIcon aria-hidden="true" />
    </EmptyMedia>
    <EmptyTitle>No records yet</EmptyTitle>
    <EmptyDescription>The first record will appear here.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>New record</Button>
  </EmptyContent>
</Empty>
```

| Case                | Title                        | Description                                                           | Action        |
| ------------------- | ---------------------------- | --------------------------------------------------------------------- | ------------- |
| First use           | No records yet               | The first record will appear here.                                    | New record    |
| Filtered to nothing | No records match this filter | Clear the filter to see all records.                                  | Clear filters |
| Search with no hits | No results for "keyword"     | Use fewer words or a different keyword.                               | Clear search  |
| No permission       | No access                    | Sign in with an account that has access, or contact an administrator. | Go back       |
| Feature disabled    | This feature is turned off   | Turn it on in settings and content will appear here.                  | Open settings |

- State facts. Do not apologize or write emotional copy.
- Match the empty state to the cause: no session means sign in, no data means create, no filter match means clear.
- Small areas may omit `EmptyMedia` and keep the title, description, and one action.
- Do not fill an empty state with fake data, placeholder cards, or gray skeletons.

## 2. Loading

| Case                 | Form                                                 |
| -------------------- | ---------------------------------------------------- |
| First list paint     | Several `Skeleton` rows, close to the visible count  |
| First grid paint     | `Skeleton` blocks shaped like the tiles              |
| Paging               | `Spinner` and "Loading" at the end of the list       |
| Button action        | `<Button loading>`, keeping the button width         |
| Route transition     | `ProgressBar` in `root.tsx`                          |
| Work over one second | `Progress` or a progress label                       |
| Icon loading         | A small inline `Spinner` that does not change layout |

```tsx
// First paint
<div className="space-y-3">
  {Array.from({ length: 6 }, (_, index) => (
    <Skeleton key={index} className="h-16 w-full" />
  ))}
</div>

// Button loading
<Button loading>Saving</Button>
```

- Match the skeleton count to the visible rows to reduce layout shift.
- Long tasks show processed and total counts, for example "1,204 of 3,000 processed".
- Do not replace the whole page with a centered spinner. Keep the title and toolbar and show loading in the content area.
- Add a text label after one second. After five seconds, offer cancel or retry.

## 3. Errors

Errors have three levels:

| Level | Location                                    | Component                                                           |
| ----- | ------------------------------------------- | ------------------------------------------------------------------- |
| Route | Whole page                                  | Export `ErrorBoundary` from the route module; render `ErrorDisplay` |
| Block | Top of the content area or inside the block | `Alert variant="error"` plus a retry button                         |
| Field | Below the form field                        | `FieldError`                                                        |

```tsx
<Alert variant="error">
  <AlertCircleIcon aria-hidden="true" />
  <AlertTitle>Could not load</AlertTitle>
  <AlertDescription>
    The request did not finish. Check the connection and retry.
    <Button variant="link" onClick={retry}>Retry</Button>
  </AlertDescription>
</Alert>
```

- The interface shows what happened and the next action. Stacks, error codes, and response bodies go to the log.
- Show errors inline where possible so the rest of the page stays usable.
- Keep already loaded content during a retry instead of replacing it with an empty area.
- Form errors sit beside the field. A submit failure adds one summary at the top of the form.
- Do not treat `0` as a failed load or a missing value. Failure shows failure; empty shows empty.
- Error copy offers an action: retry, check configuration, sign in again, go back to the list, copy diagnostics.

## 4. Overlays

| Form           | Use                                         | Component                                        |
| -------------- | ------------------------------------------- | ------------------------------------------------ |
| `Dialog`       | A task, detail, or preview that needs focus | `Dialog` + `DialogPopup` (alias `DialogContent`) |
| `AlertDialog`  | Irreversible or high-risk confirmation      | `AlertDialog` + `AlertDialogPopup`               |
| `Sheet`        | Self-contained task, filters, batch actions | `Sheet` + `SheetPopup` (right by default)        |
| `Drawer`       | Mobile bottom panel, gesture dismissal      | `Drawer` + `DrawerPopup` (`position="bottom"`)   |
| `Popover`      | Light filters, dates, supplementary detail  | `Popover`                                        |
| `DropdownMenu` | Low-frequency and overflow actions          | `DropdownMenu`                                   |
| `ContextMenu`  | Row or card right-click actions             | `ContextMenu`                                    |
| `Command`      | Command palette, quick navigation           | `Command`                                        |

- `Dialog` and `AlertDialog` stick to the bottom on mobile (`bottomStickOnMobile`). Pass `bottomStickOnMobile={false}` to center them.
- `Sheet` enters from the right. On narrow screens pass `side="bottom"`. It does not switch by width automatically.
- Open one overlay per task. Use `AlertDialog` when a second confirmation is needed.
- Focus returns to the trigger when an overlay closes.
- Keep a clear title, description, and close affordance inside the overlay. Do not rely on `Esc` alone.
- Destructive actions use a `destructive` primary button; cancel uses `ghost` or `outline`.

## 5. Success and notifications

- Use a toast for completed saves, copies, and exports: `toastManager.add({ title: 'Saved', type: 'success' })`.
- For persistent status use an inline `Alert`, `Badge`, or status text, not a toast.
- Put one-off notes next to the action and remove them with the action.
- Include counts and units: "Exported 1,204 files".
- Never notify twice for one event. If the page already shows the state, do not add a toast.

## 6. Copy rules

- Buttons and labels use a verb or a noun phrase: `Save settings`, `Clear filters`, `Start sync`.
- Numbers carry units: `1,891 records`, `29,010 items`, `1.6 GB`, `150 ms`.
- Time states the format or time zone; relative time is used only within seven days.
- One number gets one note.
- Empty, error, and confirmation copy follow [writing-style.md](../writing-style.md).
- Do not stop at "No data" or "Something went wrong". Add the cause and the next step.

## 7. State matrix

Fill this table before building a page. A missing column means the state is not designed.

| Surface       | Loading               | Empty                         | Failure                       | Success                           |
| ------------- | --------------------- | ----------------------------- | ----------------------------- | --------------------------------- |
| List          | Row skeletons         | Empty state plus create entry | Block `Alert` plus retry      | List plus tail loading            |
| Detail        | Detail skeleton       | "Record not found" plus back  | Block `Alert` plus retry      | Detail content                    |
| Form          | Submit button loading | Not applicable                | Field errors plus top summary | Toast plus close or redirect      |
| Overview      | Number skeletons      | Prompt to create or import    | Block `Alert` plus retry      | Status, numbers, and recent items |
| Search result | Result skeletons      | "No results" plus clear       | Block `Alert` plus retry      | Results plus count                |
