# Changelog

All notable changes are documented here. The format follows [Conventional Commits](https://www.conventionalcommits.org/).

## Unreleased

### Added

- A cancellable `Searcher.Search` demo: Go takes a `context.Context` and the page aborts stale calls with `AbortSignal`.
- `doctor`, `dev:ios`, `dev:android`, `build:ios`, and `build:android` scripts.
- A tag-driven release workflow that builds macOS, Windows, and Linux installers.
- GitHub community files: a code of conduct, a security policy, a support guide, issue forms, and Dependabot updates.
- Editor and Git defaults: `.editorconfig` and `.gitattributes`.
- README badges, features, contributing, acknowledgements, and license sections.
- `docs/engineering/code-map.md`: intent-to-file map for common tasks.
- `docs/ui-design/information-density.md`: density rules, budgets, and review tests.

### Changed

- Upgrade MyGo from `v0.8.3` to `v0.10.0`; regenerated bindings use `bind` and support `.with({ signal })`.
- `mygo.config.ts` reads the app version from `package.json`.
- Documentation covers phone targets, cancellation, and releasing.
- Rewrote all documentation in English and aligned paths, commands, versions, and component names with the code.
- Condensed `AGENTS.md` to the rules that apply to every task and moved detail into `docs/`.

### Fixed

- Documented the real coverage thresholds (lines, functions, statements, and branches at 55%).
- Corrected the `useIsMobile` breakpoint note; `use-mobile.ts` uses 768 px and has no callers.
