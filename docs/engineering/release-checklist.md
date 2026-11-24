# Release Checklist

**Project**: starter-mygo-react-router | **Last updated**: 2026-11-24

> `mygo build` packages the desktop app and writes installers to `release/`. Go through this list before a milestone release so the packaged build passes in a real environment.

## Versioning

- The version lives in `package.json`. `mygo.config.ts` imports it, so the app version and the release tag stay in one place. Use SemVer 2.0.0.
- `release.yml` checks that the pushed tag equals `v` plus the `package.json` version. A mismatch fails the build.
- Tag only after every gate passes: `git tag v0.1.0 && git push --tags`.
- Increase the version on every release. Do not move it backwards.
- Move the Unreleased entries in `CHANGELOG.md` into the version section before tagging.

## Gates

- [ ] `bun run typecheck` passes.
- [ ] `bun run lint` passes.
- [ ] `go build ./... && go vet ./...` passes.
- [ ] `bun run build` passes (`mygo build`, installers in `release/`).
- [ ] `bun run test` passes.
- [ ] `bun run test:coverage` meets the threshold (`app/lib` ≥ 55%).
- [ ] Critical tests can fail: breaking the behavior turns them red.
- [ ] No `skip`, `only`, or empty runs presented as passing.
- [ ] No lefthook pre-commit or pre-push hook skipped.

## Smoke tests

Run these in `bun run dev` and in the packaged app from `bun run build`. Check the box and record the date.

### Scaffold basics

- [ ] Home page loads with visible first-screen content and no white flash.
- [ ] Route change (`/` → 404) shows the top progress bar.
- [ ] The 404 page renders and returns to the home page.
- [ ] The error boundary shows a message and a retry action when an error is simulated.
- [ ] The MyGo panel shows system information, and `Greeter` returns the Go-side result.
- [ ] Typing in the search card cancels the previous Go call and shows matching topics.
- [ ] `bun run dev:web` shows the "Go bindings unavailable" message without errors.

### Theme and responsive layout

- [ ] Light, dark, and system themes switch and persist across reloads.
- [ ] Every component renders correctly in dark mode.
- [ ] The layout works below 768 px.

### Accessibility

- [ ] Keyboard focus is visible (focus-visible ring).
- [ ] Interactive elements have accessible names (ARIA).

## Documentation consistency

- [ ] Every index link in `docs/README.md` opens.
- [ ] Changed paths, commands, routes, and field names match the code.
- [ ] Added, moved, and deleted documents are reflected in the index.
- [ ] Completed stage plans were moved to `docs/archive/`.
- [ ] `CHANGELOG.md` has a version section for this release.
- [ ] The pre-commit checks in `docs/writing-style.md` were reviewed.
- [ ] The changes were checked against the recurring patterns in `docs/postmortem/README.md`.

## Stability

- [ ] The page does not go blank on network failure or an error response.
- [ ] The console has no errors or warnings.
- [ ] Lighthouse basics pass (optional).

## Steps

1. Update `CHANGELOG.md` (Unreleased → version section).
2. Update the `docs/README.md` index and the consistency checklist when documents changed.
3. Merge to `main` and let CI pass.
4. Run the smoke tests in the dev build and the packaged app.
5. Tag: `git tag v0.1.0 && git push --tags`.
6. Let `.github/workflows/release.yml` build the macOS, Windows, and Linux targets from the tag.
7. Create the release from the uploaded artifacts: `gh release create v0.1.0 --generate-notes`.

> The maintainer runs the device and environment checks before release, then records the date.
