# Git Workflow

**Project**: starter-mygo-react-router | **Last updated**: 2026-11-24

## Branch model

Trunk-based development with short-lived branches:

```
main ─────●─────●─────●─────●──→ always deployable
           \     /
feat/xxx ──●───●
```

| Branch       | Format                     | Purpose            | Lifetime           |
| ------------ | -------------------------- | ------------------ | ------------------ |
| `main`       | —                          | Stable, deployable | Permanent          |
| `feat/*`     | `feat/settings-page`       | Feature work       | Delete after merge |
| `fix/*`      | `fix/theme-flash`          | Bug fix            | Delete after merge |
| `refactor/*` | `refactor/extract-hooks`   | Refactor           | Delete after merge |
| `docs/*`     | `docs/adopt-doc-structure` | Documentation      | Delete after merge |
| `test/*`     | `test/add-seo-spec`        | Tests              | Delete after merge |

## Commit format

Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/).

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

| Type       | Purpose                    | Example                                   |
| ---------- | -------------------------- | ----------------------------------------- |
| `feat`     | New feature                | `feat(ui): add settings layout`           |
| `fix`      | Bug fix                    | `fix(theme): persist system preference`   |
| `refactor` | Behavior-preserving change | `refactor(hooks): extract useMediaQuery`  |
| `test`     | Tests                      | `test(seo): add generateSEOMeta coverage` |
| `docs`     | Documentation              | `docs: rewrite documentation in English`  |
| `style`    | Formatting                 | `style: apply eslint --fix`               |
| `chore`    | Build or tooling           | `chore(build): add vitest config`         |
| `perf`     | Performance                | `perf(ui): memoize heavy rows`            |

Scope is a module or feature name: `ui`, `seo`, `theme`, `routes`, `docs`, `build`, `test`.

Rules:

- Write the description in imperative English: `add`, `fix`, `remove`.
- Start lowercase, omit the trailing period, and stay under 72 characters.
- Mark a breaking change in the footer: `BREAKING CHANGE: description`.

## Commit discipline

> Decide the commit message before writing the code.

1. Pick the Conventional Commit message first.
2. Keep the diff inside that message's scope. Move out-of-scope work to the next commit.
3. Split when the diff exceeds 10 files or 200 lines.
4. Each commit passes verification on its own (`typecheck`, `lint`, `test`).
5. Keep module creation, feature work, configuration, and documentation in separate commits.

## Gates

Every commit and pull request passes:

```bash
go build ./... && go vet ./...
bun run typecheck
bun run lint
bun run test
bun run test:coverage   # app/lib ≥ 55%
bun run build
```

Local hooks:

- `pre-commit`: ESLint with `--fix` on staged JavaScript, TypeScript, JSON, and CSS files.
- `pre-push`: `typecheck`, `lint`, `test`, and `build`. Go checks run in CI, not in the hook.

CI (`.github/workflows/ci.yml`) runs:

- Go job: `go build ./...`, `go vet ./...`, `go test ./...`.
- Web job: `bun install --frozen-lockfile`, `lint`, `typecheck`, `generate` plus a `git diff` check on `app/mygo.ts`, `test`, and `build:web`.

The release workflow (`.github/workflows/release.yml`) runs on a `v*` tag. It fails when the tag does not equal `v` plus the `package.json` version, then builds macOS, Windows x64, Windows arm64, Linux x64, and Linux arm64 installers as artifacts. Phone builds (`build:ios`, `build:android`) are not part of it; they need a macOS runner and signing profiles.

Do not use `--no-verify` to bypass hooks. Fix the root cause.

### Verification honesty

- A test must be able to fail. Break the behavior on purpose and confirm the test turns red.
- Do not commit `skip`, `only`, empty `describe` blocks, or zero-match runs as passing.
- A source scan is a structural check, not a behavior assertion.
- Do not accept an existing red baseline. Fix or remove a known failure.
- Report the command and the result. Mark checks that did not run as "not verified".

## Code review

1. Open a pull request using [`.github/PULL_REQUEST_TEMPLATE.md`](../../.github/PULL_REQUEST_TEMPLATE.md), then pass the gates.
2. Require one approval. Run an automated review first when AI assistance is used.
3. Log review findings in the review queue of `docs/planning/backlog.md`.
4. Merge after all checks pass. Keep the atomic commits.
5. Delete the feature branch.

### Review checklist

- [ ] Logic is correct and covers boundary cases.
- [ ] New behavior and pure functions have tests; no regressions.
- [ ] Tests can fail: breaking the implementation turns the relevant tests red.
- [ ] No `skip`, `only`, empty runs, or source scans standing in for behavior assertions.
- [ ] Follows [code-style.md](./code-style.md).
- [ ] No hardcoded colors, no `any`, no leftover TODO.
- [ ] Render safety: no `window`, `document`, or `localStorage` reads during render.
- [ ] Navigation uses `<Link>`, `useSubmit()`, or `navigate()` where applicable.
- [ ] Data paths cover loading, empty, and error.
- [ ] Accessibility: visible focus and accessible names for icon buttons.
- [ ] UI changes include a screenshot from a browser run.
- [ ] Documentation is updated (`docs/`, the index, `CHANGELOG.md`).
- [ ] Documents and UI copy follow [writing-style.md](../writing-style.md).
- [ ] Paths, commands, and routes still match the code; no dead links.
- [ ] A new bug pattern has a postmortem.

## Release

The starter ships as a desktop app through `mygo build`: the frontend goes to `build/client`, and installers go to `release/`.

- Pushing to `main` triggers CI (Go and web gates).
- Run `bun run build` locally to verify the installer for the current platform.
- Set `version` in `package.json`. `mygo.config.ts` imports it, so the app version and the release tag share one source.

Milestone release:

1. Move the `CHANGELOG.md` Unreleased entries into a version section.
2. Run the smoke tests in [release-checklist.md](./release-checklist.md).
3. Tag and push: `git tag v0.1.0 && git push --tags`.
4. Let `.github/workflows/release.yml` build the platform installers.
5. Create the release from those artifacts: `gh release create v0.1.0 --generate-notes`.

## AI collaboration

- Use the `gh` CLI for the GitHub flow when available.
- Update the backlog or the relevant plan before writing code.
- Write acceptance criteria and a test that can fail before implementation.
- Verify cross-system assumptions with a small spike first, for example a five-line check of a new library API.
- Write a postmortem for a new bug pattern, then add the preventive rule to this document or `AGENTS.md`.
- Follow [writing-style.md](../writing-style.md) for documents and UI copy.
