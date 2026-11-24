# Backlog

> Open task candidates and the current stage-plan index. Review findings, postmortem actions, and product requirements are registered here and scheduled from here.
> A stage plan gets its own `todo-*.md` file and moves to `archive/` when done. The backlog records status and priority only.

Status: `Todo`, `In progress`, `Done`, `Paused`, `Removed`.

## Candidates (unscheduled)

| ID  | Task            | Priority | Depends on | Source | Status |
| --- | --------------- | -------- | ---------- | ------ | ------ |
| —   | No entries yet. | —        | —          | —      | —      |

## Review queue

> Findings from `docs/reviews/` are numbered Z (security/authorization), R (resources), E (engineering), or U (UI/UX). Start a `todo-*` file when work begins.

| ID  | Finding         | Priority | Status |
| --- | --------------- | -------- | ------ |
| —   | No entries yet. | —        | —      |

## Removed

| ID  | Task | Reason |
| --- | ---- | ------ |
| —   | —    | —      |

## Completed

| ID  | Task | Completed | Stage plan |
| --- | ---- | --------- | ---------- |
| —   | —    | —         | —          |

## Gate

Every task passes the gates in [engineering/git-workflow.md](../engineering/git-workflow.md) before delivery:

```bash
bun run typecheck
bun run lint
bun run test
bun run build
```
