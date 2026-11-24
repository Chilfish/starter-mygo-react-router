# Planning

Architecture decisions (ADRs) and task planning. Relationship to other directories:

```
requirements/   what to build
planning/       how to build it and how far it has progressed
  ├── architecture.md   architecture overview and ADRs
  ├── backlog.md        unscheduled candidates and the review queue
  └── todo-*.md         current stage plans
```

## Index

| Document                             | Contents                                           | Read when                  |
| ------------------------------------ | -------------------------------------------------- | -------------------------- |
| [architecture.md](./architecture.md) | System overview and decision records               | Before a structural change |
| [backlog.md](./backlog.md)           | Open tasks, review queue, completed items          | Planning the next stage    |
| `todo-*.md`                          | Current stage plan (register it here when created) | Current stage              |

## Conventions

1. Record decisions as `ADR-NNN` and append them to `architecture.md`.
2. Name stage plans `todo-<kebab-case>.md`. Move completed or cancelled plans to `archive/` with `git mv`.
3. Carry review findings into the backlog or a `todo-*` file. Mark them `Done` with the commit hash when delivered.
4. **A plan is not current state**: The main text states only what is already true. Open or in-progress work belongs in the backlog or a `todo-*` file.
5. Register a task before implementing it and name the source: requirement, review, postmortem, or user feedback.
6. Backlog status values: `Todo`, `In progress`, `Done`, `Paused`, `Removed`.
7. Documents and UI copy follow [writing-style.md](../writing-style.md).
