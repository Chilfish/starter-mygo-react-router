# Information Density

Rules for deciding what appears on a screen. Applies to pages built on the scaffold, especially dashboards, overviews, and lists.

Page structure is in [patterns.md](./patterns.md), state copy is in [feedback.md](./feedback.md), and visual values are in [visual.md](./visual.md).

## Principle

**Data can be dense; explanation must be sparse.**

The usual failure is not too many fields. It is uniform importance: every field gets a card, a caption, and a footnote, so the reader has no order of attention.

## Signals

| Signal                | What it looks like                                                                    | Effect on the reader                        |
| --------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------- |
| Duplicated figure     | The same number in a card title, a metric row, and a footer                           | The reader cannot tell which one is correct |
| Methodology footnote  | A block explaining date ranges, weighting, or column meaning                          | The screen cannot be read without the note  |
| Self-referential link | Repeated "View details" or "Open profile" entries                                     | The page looks like it is proving its value |
| Field-driven section  | Every field in the data model gets a panel or chart                                   | No one knows what to read first             |
| Uniform density       | Every section has the same size, weight, and spacing                                  | The eye has no landing point                |
| Explanatory subtitle  | A subtitle that restates the title, such as "Other members / sorted by recent update" | The reader reads the same fact twice        |

These signals usually appear together. Each component looks reasonable on its own; the page as a whole has no hierarchy.

## Why it happens

1. **Uncertainty favors more information.** When the model does not know what the reader needs, the highest-information output looks more complete and is harder to criticize for missing something.
2. **Explanation is the default register.** Wording from documentation and code comments leaks into the interface.
3. **Generation is component by component.** No one owns the page-level attention budget.
4. **Omission and over-inclusion are not symmetric.** A missing field is visible; an extra field is not. The safe-looking choice is to add.

## Budget

Set the budget before the layout.

| Item                          | Limit |
| ----------------------------- | ----- |
| Questions this screen answers | 1     |
| Key numbers                   | 4     |
| Primary actions               | 1     |
| Toolbar clusters              | 3     |
| Actions per section           | 1     |
| Elevation layers              | 1     |
| Methodology notes on screen   | 0     |

Anything beyond the budget needs a destination: a detail page, an expandable area, a dialog, or a data document.

## Rules

1. **Write the question first.** One sentence: who opens this screen, what they need to know, and what they do next. A section that does not serve that sentence is removed.
2. **Pick three to five metrics that answer the question.** Put the rest behind a detail view or an export.
3. **State each fact once.** Do not repeat a number in the title, the row, and the footer. Keep the location the reader checks first.
4. **Remove numbers that need a footnote.** Move the definition to the data document. A number that cannot be read without an explanation does not belong on this screen.
5. **Link the title instead of adding a link.** A section title that opens the detail view removes one row of navigation.
6. **Delete explanatory subtitles.** Keep only subtitles that change a decision.
7. **Use progressive disclosure.** First screen gives the answer; configuration, filters, and full tables move to a dialog, sheet, or secondary page.
8. **Do not use `0` for unknown.** Show loading, empty, or error explicitly. A real zero is a fact; a failed request is not.
9. **Delete before adding.** A change that only adds lines needs a reason why the new information must appear at the same time.

## When density is appropriate

Dense screens work when all of these hold:

- The user is an expert performing a known task.
- Positions are stable across visits, so repeat use builds muscle memory.
- Alignment is strict: monospace numbers, right alignment, fixed units.
- Hierarchy comes from position and weight, not from more labels.

Terminals, log viewers, observability panels, and financial tables fit this description. A dashboard does not.

## Review

- **Three-second test**: After three seconds, can a reader say what the screen is for?
- **Squint test**: Blur the screen by 5–10 px. Is there one obvious main element?
- **Delete test**: Remove every caption and footnote one at a time. Does the screen still make sense?
- **Net line count**: A change that only adds lines needs an explanation.
- **One deletion round**: Finish a screen, then remove at least one element before review.

## Related rules

- Page skeleton and section budget: [patterns.md](./patterns.md)
- Empty, loading, and error copy: [feedback.md](./feedback.md)
- Color and type limits: [visual.md](./visual.md)
- Sources and trade-offs: [research.md](./research.md)

## References

Source review compiled 2026-11-07 from public posts and design discussions. Mechanism notes are practitioner observations, not controlled experiments.

| Source                                                                                                                                                | Use                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [Hacker News discussion on AI-generated pages](https://news.ycombinator.com/item?id=50196368)                                                         | Reader reports of duplicated information and missing focus     |
| [Spot the Slop — Kosta Canatselis](https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c)                   | Everything visible at once; uniform density; no pause to judge |
| [Why AI-generated dashboards feel overstuffed — Claude Design Me](https://claudedesign-me.com/en/prompt-examples/ai-dashboard-prompt-mistakes-fixes/) | Uncertainty leads to maximum information                       |
| [7 Signs a UI Has Been Vibe Coded — Fountain Institute](https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui)                                | Locally fine, globally chaotic                                 |
| [How to Fix AI-Generated UI Designs — BSWEN](https://docs.bswen.com/blog/2026-03-20-ai-generated-ui-anti-patterns/)                                   | Negative constraints work better than adjectives               |
| [Tufte's principles for graphical integrity — Chartbuddy](https://chartbuddy.io/blog/tuftes-principles-for-graphical-integrity)                       | Data-ink ratio; repeated data ink                              |
| [Apple HIG: Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles)                                       | Clarity, deference, depth                                      |
| [What is "AI slop" UI — uiscanner](https://uiscanner.com/blog/what-is-ai-slop-ui)                                                                     | Regression to the statistical average without constraints      |
