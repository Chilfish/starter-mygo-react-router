# Writing Style

Applies to `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `docs/`, UI copy, pull requests, and issues. The goal is to state facts and actions clearly.

All prose in this repository is English: documentation, code comments, UI copy, and commit messages.

## Tone

- State what exists, why it works that way, and how to use it. Do not write vision statements or slogans.
- One idea per sentence. If a sentence passes 25 words, split it or turn it into a list.
- Name the concrete subject: page, script, route, component, store, service. Avoid "we" and "the system".
- Do not draw conclusions for the reader. State limits and trade-offs, then let the reader decide.
- Mark uncertain numbers, effects, and performance figures with a date. If a figure cannot be verified, leave it out.

## Wording

- Do not stack adjectives: seamless, powerful, intuitive, effortless, robust, revolutionary, world-class, cutting-edge, game-changing, perfect.
- Do not use product or design jargon: leverage, synergy, unlock, empower, north star, narrative, alignment (as a verb), guardrail.
- Do not write paired slogans: "not just X, but Y", "more than X, it is Y".
- Do not write filler: "it is worth noting", "as we all know", "needless to say", "in today's fast-paced world".
- Do not translate idioms literally. Describe the observed behavior instead.
- Put code, commands, field names, and paths in backticks.

## Sentences and punctuation

- Prefer the active voice and the present tense: "The route renders the list", not "the list is rendered by the route".
- Use a colon or a comma where a dash would be decorative. Avoid em dashes.
- Headings are noun or verb phrases, not questions: "Release steps", not "How do I release?".
- List items keep the same grammar and carry one idea each.
- Link text names the target: `docs/engineering/git-workflow.md`, not "click here" or "see above".

## UI copy

- Buttons and labels use a verb or a noun phrase: `Save settings`, `Clear filters`, `Retry`.
- An empty state answers three questions: what this area is, why it is empty, and what to do next. "No data" is not enough.
- An error message gives the next action: retry, check configuration, sign in again, open the log.
- Do not explain obvious interactions. Do not write two notes for the same number.
- Numbers carry units: `3 records`, `1.2 MB`, `150 ms`.

## Terminology

Use one word per concept, in both docs and UI.

| Use                  | Avoid                       | Meaning                                                       |
| -------------------- | --------------------------- | ------------------------------------------------------------- |
| page                 | screen, view (mixed)        | A full route output                                           |
| component            | widget, control             | A UI unit under `app/components/`                             |
| route                | page path, link             | A path declared in `app/routes.ts`                            |
| design token         | color variable, theme color | A CSS variable in `app/app.css`                               |
| gate                 | check, validation (mixed)   | The fixed combination of typecheck, lint, test, and build     |
| acceptance criterion | test point, checklist item  | An observable assertion that can fail                         |
| data fetching        | request, pull (mixed)       | `clientLoader`, `clientAction`, or an explicit client request |
| host                 | backend, server             | The MyGo process that owns the window and Go services         |
| bindings             | API, bridge                 | The generated `app/mygo.ts` client                            |

## Docs are facts

- Every path, command, route, and field name in a document must exist in the current code. Run the command before writing it down.
- When you delete a file, rename a route, or change a script, search for the old form before committing: `rg "<old path|old command>" README.md CONTRIBUTING.md docs`.
- Do not present plans as current state. Unfinished work belongs in `docs/planning/backlog.md` or a `todo-*.md` file.
- Date screenshots, numbers, and performance claims. Replace or remove outdated images; leave no broken links.
- The index lists only files that exist. Update `docs/README.md` when a document is added, moved, or removed.

## Counterexamples

| Weak                                           | Rewrite                                                 |
| ---------------------------------------------- | ------------------------------------------------------- |
| A seamless, powerful starter for modern apps.  | A starter with routing, theming, components, and tests. |
| It is worth noting that the loader runs first. | The loader runs before the page renders.                |
| No data.                                       | No records yet. The first record will appear here.      |
| Click here to open settings.                   | Open settings.                                          |
| Not just a template, but a workflow.           | A template with a documented workflow.                  |

## AI collaboration

- Do not restate what the reader can see. Do not write "summary below" or similar transitions.
- Report verification as it happened: which commands ran, whether they passed, and what did not run.
- Write "not verified" for anything unchecked. Do not guess numbers, durations, or effects.
- Do not use "done" to hide an unverified part.

## Pre-commit checks

```bash
# Hype words and filler; review each hit instead of rewriting mechanically.
rg -n "\b(seamless|powerful|intuitive|effortless|robust|revolutionary|world-class|cutting-edge|game-changing|leverage|synergy|unlock|empower)\b" README.md CONTRIBUTING.md docs
rg -n "it is worth noting|as we all know|needless to say" README.md CONTRIBUTING.md docs

# Stale paths: compare document links against the files on disk.
rg -n "docs/|\.md\)" README.md CONTRIBUTING.md docs
```

Before committing:

- Can the new paragraph be summarized in one sentence? If not, split it.
- Can any adjective be removed without losing information? Remove it.
- Does each UI string say what happened and what to do next?
- Does every number carry a unit, a date, or a source?
- Do the paths, commands, and routes still match the code?
