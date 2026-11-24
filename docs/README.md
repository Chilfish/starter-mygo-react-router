# Documentation

> Single entry point. Read this page before a task, then open the documents listed in the navigation table. Do not read the whole directory first.

## Layout

```
docs/
├── README.md                 This page (single entry point)
├── writing-style.md          Rules for docs, UI copy, and commit messages
├── requirements/             Source of truth for product requirements
├── planning/                 Architecture decisions and backlog
├── engineering/              Code map, code style, Git workflow, release checklist
├── ui-design/                Design tokens, page structure, states, interaction, density
├── postmortem/               Incident reviews and recurring failure patterns
├── reviews/                  Code review records
├── development-log/          Daily implementation log
└── archive/                  Completed plans (not read proactively)
```

## Task navigation

| Task                                   | Read first                                                                                                                            | Why                                                 |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Add a feature or check scope           | [requirements-spec.md](./requirements/requirements-spec.md), [user-stories.md](./requirements/user-stories.md)                        | Requirements, acceptance criteria, boundaries       |
| Find the files for a task              | [engineering/code-map.md](./engineering/code-map.md)                                                                                  | Intent-to-file map                                  |
| Change architecture                    | [planning/architecture.md](./planning/architecture.md)                                                                                | Existing ADRs and constraints                       |
| Plan the next stage                    | [planning/backlog.md](./planning/backlog.md)                                                                                          | Open tasks, dependencies, sources                   |
| Write code                             | [engineering/code-style.md](./engineering/code-style.md), [writing-style.md](./writing-style.md)                                      | Naming, types, tests, copy                          |
| Commit or open a PR                    | [engineering/git-workflow.md](./engineering/git-workflow.md), [.github/PULL_REQUEST_TEMPLATE.md](../.github/PULL_REQUEST_TEMPLATE.md) | Commit rules, gates, review checklist               |
| Cut a release                          | [engineering/release-checklist.md](./engineering/release-checklist.md)                                                                | Gates, smoke tests, documentation checks            |
| Prevent a known failure                | [postmortem/README.md](./postmortem/README.md)                                                                                        | Baseline risks and recurring failure patterns       |
| Review code                            | [reviews/README.md](./reviews/README.md), [reviews/TEMPLATE.md](./reviews/TEMPLATE.md)                                                | Review axes, severity, hand-off                     |
| Build or change UI                     | [ui-design/README.md](./ui-design/README.md), then [visual.md](./ui-design/visual.md) and [patterns.md](./ui-design/patterns.md)      | Tokens, page skeleton, component map                |
| Design loading, empty, or error states | [ui-design/feedback.md](./ui-design/feedback.md), [ui-design/interaction.md](./ui-design/interaction.md)                              | State matrix, overlays, navigation                  |
| Review information density             | [ui-design/information-density.md](./ui-design/information-density.md)                                                                | What to cut before adding more                      |
| Write docs or UI copy                  | [writing-style.md](./writing-style.md)                                                                                                | Tone, wording, facts, counterexamples               |
| Report a vulnerability                 | [SECURITY.md](../SECURITY.md)                                                                                                         | Supported versions, scope, reporting channel        |
| Understand a past decision             | [development-log/](./development-log/), [archive/](./archive/)                                                                        | Historical records; archive is not read proactively |

## Lifecycle

```
requirements → planning → engineering → code → feedback → archive
```

| Event                      | Action                                                                                 |
| -------------------------- | -------------------------------------------------------------------------------------- |
| New feature or requirement | Update `requirements/` and `planning/backlog.md` before implementation                 |
| Architecture decision      | Append an ADR to `planning/architecture.md`                                            |
| New bug pattern or rework  | Write `postmortem/0NN-*.md`; add the lesson to the recurring patterns section          |
| Code review                | Write `reviews/review-YYYY-MM-DD-<topic>.md`; log findings in the backlog review queue |
| End of day                 | Write `development-log/YYYY-MM-DD.md`                                                  |
| Completed stage plan       | `git mv` it to `archive/` and update this page                                         |
| Milestone release          | Follow `engineering/release-checklist.md`                                              |

## Conventions

1. **Language**: English for documentation, code comments, UI copy, and commit messages.
2. **Single entry point**: Update the tables on this page when a document is added, moved, or removed. List only existing files.
3. **Docs are facts**: Paths, commands, routes, and field names must match the current code. Clean up references when the code changes.
4. **No plans presented as state**: Unfinished work belongs in the backlog or a `todo-*.md` file.
5. **Writing**: Follow [writing-style.md](./writing-style.md). State facts, keep numbers with units, and name link targets.
6. **Blameless reviews**: Attribute incidents to system conditions, not to individuals.
7. **Archive is not read proactively**: `archive/` is historical reference only.

## Verification gates

Every commit and pull request passes these gates (enforced by lefthook and CI):

```bash
go build ./... && go vet ./...
bun run typecheck
bun run lint
bun run test
bun run test:coverage   # app/lib line coverage ≥ 55%
bun run build
```

- CI entry points: `lefthook.yml` and [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)
- Do not skip hooks with `--no-verify`. Fix the root cause.
- Do not accept an existing red baseline.
- Tests must be able to fail: break the behavior on purpose and confirm the test turns red. See [engineering/code-style.md](./engineering/code-style.md#verification-and-honesty).

## Root documents

| Document                                    | Purpose                                                 |
| ------------------------------------------- | ------------------------------------------------------- |
| [README.md](../README.md)                   | Project overview, stack, quick start                    |
| [AGENTS.md](../AGENTS.md)                   | Agent instructions: constraints, workflow, verification |
| [CONTRIBUTING.md](../CONTRIBUTING.md)       | Human contributor guide                                 |
| [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) | Community standards and enforcement                     |
| [SECURITY.md](../SECURITY.md)               | Vulnerability reporting, scope, and hardening           |
| [SUPPORT.md](../SUPPORT.md)                 | Where to ask questions and how to get help              |
| [CHANGELOG.md](../CHANGELOG.md)             | Change log                                              |
| [LICENSE](../LICENSE)                       | License                                                 |
