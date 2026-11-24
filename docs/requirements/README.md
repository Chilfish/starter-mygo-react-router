# Requirements

Requirements for starter-mygo-react-router: specification, user stories, and acceptance criteria. **This directory is the source of truth for product requirements.** The backlog and stage plans derive from it.

## Index

| Document                                       | Contents                                                                                   | Read when                                |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------- |
| [requirements-spec.md](./requirements-spec.md) | Product scope, functional requirements (FR IDs), non-functional requirements, traceability | Adding a feature, checking scope         |
| [user-stories.md](./user-stories.md)           | User stories grouped by epic, each with status and acceptance criteria                     | Understanding users, designing a feature |

## Conventions

1. All requirement documents are English.
2. FR format: `FR-{module}-{number}`. FR IDs describe stable requirements; backlog IDs describe moving tasks.
3. Every FR has a unique ID, priority (P0/P1/P2), status (`Done`, `Planned`, `Paused`, `Removed`), acceptance criteria, and a source.
4. When a requirement changes, update `requirements-spec.md` and record the date.
5. Append new user stories to the matching epic in `user-stories.md`.
6. Version numbers increase as `v1.0` → `v1.1` for increments and `v2.0` for a breaking scope change.

### Acceptance criteria

- **Write AC before implementation**: An AC describes observable behavior and the expected result, not implementation details.
- Format: `AC-{module}-{number}`. When a test exists, its name matches one-to-one (`it('AC-SEO-001: ...')`).
- An AC must be able to fail: breaking the behavior turns the matching test red.
- A source scan (checking that a file contains a string) is a supporting check, never the pass condition for an AC.
- When an AC changes, update the test and `requirements-spec.md`, and record the reason in the development log.
