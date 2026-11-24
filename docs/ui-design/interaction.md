# Interaction: Keyboard, Navigation, State, and Hydration

> Interaction conventions for this scaffold. Component behavior belongs to coss and Base UI primitives; this page covers what pages must do consistently.

## 1. Keyboard

- Tab order matches visual order. Do not allow focus into `display: none` elements.
- `Enter` and `Space` activate the focused button or link. Arrow keys and `Esc` inside menus, selects, tabs, and dialogs are handled by Base UI primitives; do not reimplement them.
- `Esc` closes the topmost overlay and returns focus to the trigger.
- Icon buttons need an accessible name. Keyboard hints use `Kbd` with `Tooltip`.
- Add a global shortcut only for a frequent action, and list it in help or settings.
- Custom shortcuts must not override common browser or input method combinations. Ignore single-letter shortcuts while an input is focused.
- When a list needs keyboard movement, use the primitive's roving tabindex or `aria-activedescendant`. Do not hand-write a focus loop.

## 2. Navigation

```tsx
// Internal link
<Link to="/settings">Settings</Link>

// Submit
const submit = useSubmit()
submit(data, { method: 'post' })

// Programmatic navigation
const navigate = useNavigate()
navigate('/settings')
```

- Use `<Link>`, `useSubmit()`, and `navigate()` for internal navigation. Do not use `<a href="/...">`, `form.submit()`, or `window.location.href`.
- A native `<a href>` is allowed only when an external download needs browser handling.
- The `ProgressBar` in `root.tsx` shows route transitions. Button-level submit state uses `useIsPending()`.
- Route-level errors are handled by the `ErrorBoundary` exported from the route module. Do not catch the same error again in every component.
- `ScrollRestoration` in `root.tsx` restores scroll position by pathname. Independent scroll areas save their own position.

## 3. URL and state

| State                       | Location                                                    | Example                     |
| --------------------------- | ----------------------------------------------------------- | --------------------------- |
| Filter, search, sort, page  | URL search params                                           | `?q=design&sort=new&page=2` |
| Current record, selection   | URL path or search param                                    | `/items/42`, `?id=42`       |
| Theme                       | `appConfig` store plus localStorage                         | `light`, `dark`, `system`   |
| Sidebar, view mode, density | Store or component state                                    | Survives reload             |
| Form draft                  | Component state; persist only when it must survive a reload | Not in the URL by default   |

- Filters that change the result set go into the URL so back navigation returns to the previous query.
- Display preferences stay out of the URL so shared links do not carry someone else's view.
- Clear selections tied to the old result set when a filter changes.
- Read and write search params with `useSearchParams`, keeping unrelated params.
- When a persisted store schema changes, increase `version` and write a migration. Use `useHydrated()` before the first render that depends on client state.

## 4. Overlays and focus

- Open one overlay per task. Use `AlertDialog` when a second confirmation is needed.
- Focus returns to the trigger on close; Base UI handles it, so do not force focus manually.
- Nested overlays keep one visual layer. Do not open a dialog inside a dialog.
- Keep the background recognizable while an overlay is open. Do not cover the page with an opaque backdrop.
- Destructive actions need confirmation; a normal save does not.
- Long tasks show progress in a sheet or a dedicated area. Whether the task continues after close is a product decision.

## 5. Hydration and the host

- During render, do not read `window`, `document`, `localStorage`, or `matchMedia`. Use `useEffect` or a client hook.
- To know whether the client has hydrated, use `useHydrated()`.
- `ThemeProvider` applies the `.dark` class on the client. `suppressHydrationWarning` on `<html>` in `root.tsx` covers only this case.
- Host capabilities are exposed through `internal/` and `mygo.Bind`. A browser preview has no `window.mygo`; check `isMyGo()` before calling a binding.
- Do not render `Date.now()`, random values, or browser-time-zone text on first paint. Render them on the client or use a fixed time zone.
- Declare icons and fonts in `root.tsx` `links`. Page-specific resources go in the route's `links` export.

## 6. Responsive layout and touch

- Mobile first: write the base layout, then enhance with `sm:`, `md:`, and `lg:`.
- Breakpoints come from the Tailwind config. `useMediaQuery` and `useIsMobile()` from `~/hooks/use-media-query` use `md` = 800 px, not Tailwind's 768 px. See [README.md § Current conventions](./README.md#current-conventions).
- Interactive elements give `active` feedback on touch. Hover is a pointer-device enhancement and never the only carrier of information.
- Touch targets are at least 44×44 px; the button component provides this through `pointer-coarse` styles.
- Use `dvh` for mobile viewport height. Do not fill the screen with a fixed `100vh`.
- Fixed bottom bars and safe areas use `env(safe-area-inset-bottom)`.
- Use `overflow-x-hidden` as a fallback, but fix the layout first. Do not hide problems with `overflow`.

## 7. Motion and preference

- Transitions last 150–350 ms. Entrances fade in with a small offset; exits reverse it.
- Under `prefers-reduced-motion: reduce`, keep fades and remove movement, scale, and decorative loops.
- Skeletons and spinners keep working under reduced motion, but avoid flicker.
- Overlay animation does not bounce. Spring motion is reserved for drawers and segmented indicators.

## 8. State restoration

- Theme: persisted in the `appConfig` store and applied by `ThemeProvider`.
- Route scroll: restored by `ScrollRestoration` per pathname.
- Filters and pagination: the URL.
- Sidebar and view mode: store or component state.
- Do not write one state into the URL, the store, and component state at the same time. Pick one source and derive the rest.
