# Reviews

Code review records. Findings are classified Z/R/E/U (see the template) and queued in the review queue of `docs/planning/backlog.md`.

## Conventions

- File name: `review-YYYY-MM-DD-<topic>.md`, copied from [TEMPLATE.md](./TEMPLATE.md).
- Timing: after a milestone, a stage, or a large refactor. Small changes do not need a record.
- Every finding has an ID, a file location, and a suggested fix.
- When a finding is fixed, tick it in the original record and note the commit.
- When the same finding recurs, promote it to a postmortem or a recurring risk.
- Record only facts: what was reviewed, what was found, what was fixed, and what remains.

## Checklist

- [ ] Follows [code-style.md](../engineering/code-style.md): no `any`, `catch` uses `unknown`, three states covered.
- [ ] Render safety: no `window`, `document`, or `localStorage` reads during render.
- [ ] Browser bundle safety: no server-only code leaks to the client.
- [ ] State uses selectors; persist migrations are explicit.
- [ ] Navigation uses `<Link>`, `useSubmit()`, or `navigate()`.
- [ ] Design tokens: no hardcoded colors; light and dark both hold.
- [ ] Accessibility: visible focus and accessible names for icon buttons.
- [ ] Tests can fail: breaking the implementation turns them red.
- [ ] No `skip`, `only`, empty runs, or source scans standing in for behavior assertions.
- [ ] Documentation updated: the `docs/README.md` index, related documents, and `CHANGELOG.md`.
- [ ] Documents and UI copy follow [writing-style.md](../writing-style.md).
- [ ] Paths, commands, and routes match the code; no dead links.
- [ ] A new bug pattern has a postmortem.

## Index

| Date       | Scope          | Branch / commit | Summary        |
| ---------- | -------------- | --------------- | -------------- |
| YYYY-MM-DD | (Review scope) | `main @ <hash>` | (One sentence) |

> No review records yet. Register the first one here.

## Method

- Review along several axes: security, authorization, correctness, resource discipline, engineering practice, and UI experience.
- Check the baseline risks in `docs/postmortem/README.md` for fixed or recurring issues.
- Verify each finding from the previous review so review does not stop at recording.
