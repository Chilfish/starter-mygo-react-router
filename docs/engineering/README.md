# Engineering

Project-wide engineering rules and processes.

## Index

| Document                                       | Contents                                             | Read when             |
| ---------------------------------------------- | ---------------------------------------------------- | --------------------- |
| [code-map.md](./code-map.md)                   | Task intent to files, editing notes                  | Finding where to work |
| [code-style.md](./code-style.md)               | TypeScript, React, Tailwind, and testing conventions | Before writing code   |
| [git-workflow.md](./git-workflow.md)           | Branches, commit format, gates, review, release      | Every commit and PR   |
| [release-checklist.md](./release-checklist.md) | Release gates, smoke tests, documentation checks     | Before a milestone    |
| [writing-style.md](../writing-style.md)        | Tone, wording, UI copy, factual requirements         | Writing docs or copy  |

## Rules

1. Every commit and pull request passes the gates: `typecheck`, `lint`, `test`, `test:coverage`, `build`, plus `go build` and `go vet`.
2. Do not skip lefthook hooks with `--no-verify`. Fix the root cause.
3. Tests must be able to fail. Break the behavior on purpose and confirm the test turns red.
4. Write a postmortem for a new bug pattern, then update [postmortem/README.md](../postmortem/README.md).
5. When a subsystem (authentication, upload, sync) lands, add its engineering document here and update [docs/README.md](../README.md).
