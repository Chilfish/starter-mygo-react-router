---
id: 00X
topic: (One sentence describing the incident or decision)
date: YYYY-MM-DD
severity: SEV-0 / SEV-1 / SEV-2 / SEV-3
category: Architecture / Process / Defect / Dependency / Change
status: Active / Mitigated
root_cause: Missing process / Late decision / Design modeling / Tool feedback
---

# 00X — (Title)

## Summary

Three to five sentences: what happened, why it happened, and how it was fixed. Focus on **system conditions** (what allowed it), not on people.

## Impact

Cover user-visible impact, rework, and hidden risk. Quantify where possible: changed lines, commits, duration.

## Timeline

| Date / commit | Event |
| ------------- | ----- |

## Root cause (blameless)

List contributing factors. Do not force a single cause. Use 5 Whys when useful. Attribute to system conditions, not individuals.

## Trigger

What activated the latent defect: a specific input, an environment variable, an upstream change, or timing.

## Detection

How it was found, and why it was not found earlier. Where is the detection blind spot?

## Response

How it was stopped, what changed, and whether a temporary workaround was used.

## What worked

Behavior worth keeping.

## Action items

### Mitigation (the specific gap)

- [ ] P0/P1/P2 plus owner, scoped to the gap exposed by this incident.

### Prevention (the class of problem)

- [ ] Addresses the whole class. Sync process-level prevention to `AGENTS.md` or `docs/engineering/git-workflow.md`.
- [ ] Where a gate is possible, add a test or lint rule and confirm that breaking the behavior turns it red.

## Lessons

One or two actionable conclusions. Add the check to [README.md](./README.md) under recurring risks.

## Changed files

```
path/to/changed-file
```

## Related reports

- Related or recurring postmortem IDs
- Related review records

---

## Writing requirements

- No emoji.
- No filler such as "it is worth noting" or "in summary".
- Separate facts from guesses. Write "unconfirmed" rather than inventing a time or number.
- Name the real owner of an action item. On a solo project, write "maintainer", not a dash.

## Adding a postmortem

1. Copy this template to `docs/postmortem/0NN-<kebab-case>.md` with the next ID.
2. Fill the metadata: ID, topic, date, severity, category, status, root cause.
3. Write each section. Attribute the root cause to system conditions, not to a person.
4. Add a row to the index in [README.md](./README.md).
5. Distill the lesson into one check under recurring risks.
6. If prevention is process-level, sync it to `AGENTS.md` or `docs/engineering/git-workflow.md`.
