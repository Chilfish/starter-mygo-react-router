# Design Research

> Compiled 2026-11-01, revised 2026-11-24. This page records the sources behind the interface rules and separates platform guidance, usability research, and practitioner opinion. The rules themselves are in [visual.md](./visual.md), [patterns.md](./patterns.md), [feedback.md](./feedback.md), and [information-density.md](./information-density.md).
>
> Scope: a MyGo desktop app with a React Router v8 SPA, coss and Base UI components, and Tailwind CSS v4. The scaffold ships no product pages; examples below illustrate trade-offs, not existing screens.

## 1. Method

- **Source priority**: platform guidance (Apple HIG, W3C) → usability research with a stated method (NN/g) → component library documentation (coss, Base UI) → practitioner critique.
- **Evidence type**: platform guidance says what should happen, research says why, practitioner articles supply default patterns and counterexamples.
- **Freshness**: Apple HIG and component libraries change with releases. Usability findings age more slowly, but their examples and terminology go stale. Verify the current version before citing.
- **Platform differences**: this is a MyGo desktop app with a WebView frontend. HIG informs structure and behavior; materials, window chrome, and the menu bar come from MyGo.
- **Scope**: this page covers the interface layer. Feature scope, data contracts, and APIs belong to `docs/requirements/` and `docs/planning/`.

## 2. Conclusions

| Topic                  | Source consensus                                                                                   | How this scaffold applies it                                                            | Where it lives                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Information hierarchy  | Answer first; keep contrast and size to a few steps                                                | First screen shows status, one primary action, at most four numbers                     | [patterns.md § 0](./patterns.md#0-information-budget)           |
| Progressive disclosure | Keep frequent items on the first screen; expand on request; one secondary level                    | Configuration moves into a dialog or sheet; the page keeps a summary                    | [patterns.md](./patterns.md)                                    |
| Cards                  | Cards are browsing entry points for heterogeneous content; homogeneous content uses lists or grids | Independent objects use `Card`; homogeneous records use lists or tables                 | [visual.md](./visual.md)                                        |
| Surfaces               | Material belongs to the navigation layer; content stays readable                                   | Solid surfaces on the web; overlays separated by shadow and fill                        | [visual.md](./visual.md)                                        |
| Color                  | Limit hues; semantic colors express state; text must meet contrast                                 | One primary, one neutral scale, three semantic colors; status also uses text or an icon | [visual.md § 1](./visual.md#1-color)                            |
| Type and spacing       | Spread the type scale; build on a 4/8 px base                                                      | 4 px grid; at least 2 px between type steps                                             | [visual.md](./visual.md)                                        |
| Component source       | Use existing primitives and their accessibility behavior                                           | coss and Base UI; Tailwind for layout only                                              | [GENERAL.md](./GENERAL.md)                                      |
| Accessibility          | Contrast, focus, target size, reduced motion                                                       | `focus-visible` ring; 44 px targets; reduced motion                                     | [interaction.md](./interaction.md)                              |
| Density                | Uncertainty produces excessive information; cut before adding                                      | One question per screen; a fixed budget; one deletion round                             | [information-density.md](./information-density.md)              |
| Generated UI           | Specific prompts help; human review and rules are still required                                   | Define tokens, components, and structure first; review details                          | [§ 5](#5-review-method)                                         |
| Hydration              | Make the client and host boundaries explicit; first output is reproducible                         | Browser APIs are read in effects or client hooks                                        | [interaction.md § 5](./interaction.md#5-hydration-and-the-host) |

## 3. Sources

### 3.1 Apple Human Interface Guidelines

**Type**: platform guidance. **Status**: changes with OS releases; accessed 2026-11-01. **Scope**: design direction, not a pixel specification.

**Long-standing direction**

- **Content first**: the interface serves the content; controls step back and hierarchy comes from position, size, contrast, and material.
- **Clarity**: text is legible, icons are distinguishable, state is explicit; decoration serves comprehension.
- **Platform consistency**: use platform controls and conventions for scrolling, focus, and keyboard paths.
- **User control**: destructive actions need confirmation; system preferences (appearance, text size, reduced motion, increased contrast) are respected.

**Layout and type**

- Use safe areas and layout margins. Reflow at breakpoints; a narrow screen turns a detail view into a full page.
- Group with proximity and whitespace. Containers appear only where a stronger boundary is needed; avoid layers of wrapping.
- One primary action per screen. Secondary actions sit near related content; low-frequency actions go into a menu or dialog.
- Prefer the system font stack. Use a few type steps for hierarchy and keep body line height generous.
- Numbers use tabular figures; technical values (IDs, paths) use a monospaced font.

**Color and controls**

- Use semantic colors instead of hardcoded values; colors adapt to light and dark appearance.
- Keep text contrast sufficient. Express state with text or an icon; color supports it.
- Brand color goes to primary actions and selection, over a small area.
- Modals are for tasks that need focus. Destructive confirmation uses a dialog. Feedback appears near the action.
- Icon buttons carry labels; keyboard focus is visible; pointer targets are large enough.

**Adopted here**: semantic color tokens; 4 px spacing and a fixed type scale; one primary action; overlay focus management; touch targets; reduced motion. **Limits**: HIG targets native controls. The web frontend approximates them with CSS. Materials, window chrome, and the menu bar are out of scope.

### 3.2 Visual hierarchy (NN/g, 2021-01-17)

**Type**: usability research article. **Core finding**: visual hierarchy sets reading order. It comes from color and contrast, size, and grouping, not from decoration.

- Keep the palette to about two dominant colors and two supporting colors; use no more than three contrast steps.
- Reserve warm, saturated colors (red, orange) for warnings and errors. Use neutrals for ordinary information.
- Color is never the only carrier of information; express state with text or an icon too.
- Keep sizes to about three steps, with at most two large elements.
- Proximity and whitespace are the preferred grouping tools; containers reinforce grouping only when whitespace is not enough.
- Squint test: blur the interface 5–10 px. The element that appears first should be the one the reader needs first.

**Adopted here**: one primary action and one set of numbers on the first screen; a fixed type scale; state colors paired with text; grouping by whitespace and a single divider.

### 3.3 Progressive disclosure and complex applications (NN/g, 2006 and 2020)

**Progressive disclosure** (Jakob Nielsen, 2006-12-03)

- The first screen holds frequent, core options; the rest appear on request.
- Two judgments matter: does the split between first and second level cover common tasks, and is the path to the second level visible and clearly labeled?
- The print dialog is the classic example: copies, range, and printer first; scaling and reverse order behind advanced options.
- Keep the secondary level to one. If a third is needed, simplify the design or group by topic.
- The payoff is learnability, efficiency, and fewer errors: newcomers see only what they need, experts skip irrelevant items.

**Designing complex applications** (Kate Kaplan, 2020-11-08)

1. **Learn while doing**: let people start immediately, keep actions reversible, and show results in place.
2. **Guide faster paths**: surface shortcuts and quicker routes in context instead of relying on tutorials.
3. **Flexible paths**: allow skipping, going back, and moving between steps.
4. **Help remember progress**: long tasks keep history and checkpoints to reduce working-memory load.
5. **Coordinate tool switches**: provide export and copy points so work does not need to be moved by hand.
6. **Remove clutter without losing capability**: advanced parameters appear only after the relevant option is enabled.
7. **Ease the move between first and second level**: use overlays, hints, and side panels instead of leaving the current screen.
8. **Make important information visually prominent**: deleting irrelevant elements and decoration works as well as adding emphasis.

**Adopted here**: filters, creation, and import live in dialogs or sheets; the page keeps a summary and an entry point; full statistics on an overview move to a secondary area.

### 3.4 Cards (NN/g, 2016-11-06)

**Definition**: a card groups a small amount of related information into one visual unit, usually with an image, title, summary, and an entry point to the detail.

**Four properties**

1. Groups related information blocks.
2. Summary plus link: the card is the entry point, and the full content lives on a detail page.
3. Looks like a physical card: border, background, and shadow signal that it is clickable.
4. Flexible layout: different cards can hold different amounts of information.

**Good fit**

- Browsing heterogeneous content such as mixed media or unrelated data modules.
- Sets where one object maps to one entry point.
- Content too varied for a consistent column structure.

**Poor fit**

- Homogeneous content that must be scanned or compared quickly; stable column positions in a list or table are cheaper to read.
- Photo libraries: the image is self-contained, and a border adds nothing.
- Content where order or rank matters; variable card sizes weaken the ordering signal.

**Adopted here**: independent objects with a detail entry use `Card`; homogeneous records use lists or tables; image sets use a plain grid; cards never nest.

### 3.5 Dashboards and preattentive processing (NN/g, 2017-06-18)

**Definition**: a dashboard is a single screen where a quick glance yields the key information and the next action. It supports fast judgment, not full exploration.

- People perceive length, 2D position, area, angle, and color quickly, without focused attention.
- Length and 2D position encode quantity well: bar length and line position support fast comparison.
- Area and angle do not: pie charts, donuts, and treemaps cost more attention.
- Color suits categories, not quantities. Color vision differences affect about 8% of men and 0.5% of women.
- 3D charts distort length and area and reduce reading accuracy.
- A decorative icon per metric increases visual search cost.

**Adopted here**: overviews use text and labels for numbers. When charts are needed, prefer bars and lines, and use color only as a category aid. No decorative charts.

### 3.6 Evaluating AI-generated interfaces (NN/g, 2025-10-24, rechecked 2026-08-19)

**Method**: participants redesigned a real profile page using design generation, code prototyping, and a general chatbot, with three prompt types: broad description, detailed text specification, and text plus a design reference.

**Findings**

- More specific prompts produced results closer to human design. A design reference was most accurate, but the design decisions had already been made by a person.
- Even detailed prompts produced missing hierarchy and grouping, too many colors, weak contrast, and inconsistent spacing.
- Broad prompts produced template mismatch: the page was read as a different familiar page type.
- Without visual rules, output converges on a generic style: sans-serif type, minimal palette, common component library. It looks fine at a distance and weak up close.
- Conclusion: AI suits early exploration and testable prototypes. Production needs human judgment, rules, and iteration.

**Adopted here**: write tokens, components, and page structure into documents first, then make the implementation match. Review hierarchy, grouping, spacing, and contrast, not only the overall screenshot.

### 3.7 Practitioner discussion of "AI slop"

**Type**: design blogs, tool documentation, and community guides. **Nature**: experience and opinion. This page adopts only parts that can be checked.

**Common causes**

- Without constraints, output converges on the statistical center of the training data: purple-blue gradients, one sans-serif, three equal-weight cards, a border and shadow on every card, a compressed type scale, dark mode by default.
- Prompts lack direction; models favor safe, average output; templates dominate the corpus.
- Prescription: limit the palette, fix the type scale, lock spacing, default to no container, keep one elevation, supply a real reference.

**Four dashboard symptoms**

1. **No answer at the top**: a row of equal-weight stat cards gives no order of reading.
2. **Everything at the same volume**: one color per card, one size per metric.
3. **The page never goes quiet**: a permanent warning badge trains people to ignore all alerts.
4. **Zero lies**: a failed load and a real zero look identical.

**Actionable rules**

- Name the three most generic things on the page first: palette, layout, type, component treatment.
- Choose one direction, then write tokens, component states, and a forbidden list.
- Rebuild section by section and check hierarchy, responsiveness, accessibility, and consistency, not just the first-screen screenshot.
- Common list: oversized radii, decorative icons, a badge on every screen, cards inside cards, gradient buttons, flat rows of stat cards, dark mode by default.

**Adopted here**: the first screen gives the answer; numbers are capped at four; state is reported honestly; no container by default; a fixed type scale; no decorative icons in metric areas. The checklist is in [visual.md § 7](./visual.md#7-common-anti-patterns), and the density rules are in [information-density.md](./information-density.md).

### 3.8 Component systems: coss and Base UI

**Type**: component library documentation and source. **Date**: continuously updated; accessed 2026-11-01.

- coss builds on Base UI and provides primitives and composition examples for buttons, dialogs, menus, selects, forms, and toasts.
- Primitives handle focus management, keyboard interaction, overlay positioning, and accessibility semantics. Styling is expressed through tokens and Tailwind.
- Compose before rewriting: look for a primitive or particle before writing a page-level component, and keep one implementation per interaction.
- New components follow the existing pattern: `useRender`, `mergeProps`, cva variants, `cn()`.

**Adopted here**: `app/components/ui/` is the only primitive source. Check for a primitive before adding an interaction. Component conventions are in [GENERAL.md](./GENERAL.md).

### 3.9 Accessibility

**Type**: W3C specifications and platform capability. WCAG 2.2 became a W3C Recommendation in October 2023.

- Body text contrast is at least 4.5:1; large text at least 3:1; interface components and graphics at least 3:1.
- Focus is visible, every action is reachable by keyboard, and focus returns to the trigger when an overlay closes.
- Pointer targets are at least 24×24 CSS px (WCAG 2.2 AA). Platform guidance for touch targets is 44×44 pt.
- Reduced motion is respected: keep fades, remove movement and scale.
- Layout stays readable when text is enlarged; long text wraps and scrolls.
- Color is never the only carrier of information.

**Adopted here**: color tokens; a `focus-visible` ring; `aria-label` on icon buttons; 44 px touch targets; `prefers-reduced-motion`. **Note**: the current primary `rgb(29, 155, 240)` is roughly 3:1 against white. It suits large text and graphics. Body text and small buttons need `foreground` or a darker brand variant.

## 4. Examples

| Case               | Wrong                                                           | Right                                                                      | Basis                                              |
| ------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------- |
| First screen       | Six cards, nine permanent metrics, an expanded config form      | Status, one primary action, four numbers; statistics and config in dialogs | NN/g hierarchy, progressive disclosure             |
| Top numbers        | A row of equal-weight stat cards without a conclusion           | A one-line answer and next action, then numbers                            | AI slop dashboard symptoms                         |
| Failed data        | A load failure shows `0`, identical to a real zero              | "Could not load", last known value, timestamp, retry                       | NN/g system status; AI slop                        |
| Color weight       | One accent color per card                                       | Color only the answer; keep the rest neutral                               | NN/g color limits                                  |
| Containers         | Every card bordered and shadowed; cards inside cards            | No container by default, group with whitespace, one divider where needed   | NN/g grouping; AI slop                             |
| Homogeneous list   | Twenty similar records as large cards                           | A list or table; photos in a plain grid                                    | NN/g card fit                                      |
| Advanced options   | Target account, time range, and toggles all on the first screen | Keep a summary and one entry point; options in a dialog                    | NN/g print dialog example                          |
| Chart choice       | Donut, treemap, or 3D charts for quick comparison               | Bars and lines; length and 2D position encode quantity                     | NN/g preattentive processing                       |
| Empty state        | "No data"                                                       | What this is, why it is empty, what to do next                             | [feedback.md](./feedback.md)                       |
| Generated UI       | Broad prompt straight to output; hierarchy and spacing collapse | Define tokens, components, and structure first; review details             | NN/g AI prototyping evaluation                     |
| State expression   | Color alone separates success from failure                      | Color plus text or an icon; contrast meets the minimum                     | NN/g; WCAG 2.2                                     |
| Number decoration  | A decorative icon per metric                                    | Remove decoration and let the number stand out                             | NN/g complex applications § 8                      |
| Mobile interaction | Only a hover state; touch gets no feedback                      | Provide `active` and `focus-visible` together                              | Touch platform conventions                         |
| Filter state       | Filters live only in component state and vanish on reload       | Result filters go in the URL; display preferences go in the store          | Shareable, restorable links                        |
| Dense screens      | Every available field gets a section and a caption              | Set a budget, cut one element, one question per screen                     | [information-density.md](./information-density.md) |

## 5. Review method

Work through this order for every interface change:

1. **Five-second test**: after five seconds, can someone state the current status and the next action?
2. **Squint test**: blur 5–10 px and check where the eye lands. Adjust size, contrast, or color if the focus is unexpected.
3. **Three-stage read**: five seconds for anomalies, thirty seconds for location, a few minutes for causes and detail. Each layer needs a place to land.
4. **Token audit**: count uses of colors, type sizes, radii, shadows, and borders. A one-off value or radius sends you back to [visual.md](./visual.md).
5. **Accessibility**: walk the main flow with a keyboard; check focus, contrast, target size, and reduced motion.
6. **Responsive**: check 360, 768, and 1280 px. Content does not overflow and detail is not lost.
7. **Density**: run the delete test and the three-second test from [information-density.md](./information-density.md).
8. **Usability test**: three to five target users perform a real task; record blockers, misclicks, and confusing copy.

Narrow the token audit with search:

```bash
# One-off colors in components
rg -n "#[0-9a-fA-F]{3,8}|rgb\(|hsl\(|bg-\[|text-\[" app --glob '!app.css'

# dark: color overrides in components
rg -n "dark:(bg|text|border)-" app --glob '!app.css'
```

Review each hit by hand: token definitions, third-party component internals, and genuine one-off values need different handling.

## 6. Adopted and rejected

| Recommendation                  | What this scaffold does                                       | Reason and limit                                                       |
| ------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Semantic color tokens           | All colors come from `app/app.css`                            | Light and dark switch automatically; one-off values are unmaintainable |
| Simple surfaces                 | Whitespace and dividers; cards for independent objects        | The web has no system material; shadows go to overlays                 |
| Cards for heterogeneous content | `Card` for independent objects; lists for homogeneous content | Cards raise browsing cost; lists compare better                        |
| One primary action              | One primary button; other actions demoted                     | Reduces equal-weight competition                                       |
| At most four key numbers        | Full statistics move to a dialog or secondary page            | The first screen answers "how is it now", not full analysis            |
| Fixed type and spacing          | 4 px grid; at least 2 px between type steps                   | Hierarchy survives blurring                                            |
| Semantic colors are state only  | `info`, `success`, `warning`, `destructive`                   | Decoration belongs to content and brand color                          |
| Components from primitives      | `~/components/ui/`; Tailwind for layout                       | Consistent interaction and accessibility                               |
| Honest state                    | Loading, failure, and empty are separate states               | `0` appears only when the value is really zero                         |
| Expert screens stay dense       | Tables and search results use compact rows                    | The task is scanning and comparison                                    |
| Mobile first                    | Base styles serve narrow screens; breakpoints enhance         | Touch and safe areas need separate verification                        |
| Explicit hydration boundary     | Browser APIs are read in effects or client hooks              | Avoids hydration mismatches and host errors                            |

## 7. Disagreements and limits

- **Platform differences**: HIG targets native controls. Scrolling, focus, and material on the web are approximations.
- **Source nature**: practitioner articles are experience reports without published samples or methods. NN/g articles state a method, but some conclusions come from 2006–2021 cases whose examples are now dated.
- **Cards**: practitioner writing tends to reject cards outright; NN/g separates heterogeneous from homogeneous content. This scaffold follows NN/g.
- **Density**: an overview needs calm; expert lists and tables need density. One rule does not fit every page.
- **AI prototyping research**: the NN/g evaluation used a single profile-page task. Its conclusion favors specific prompts; transfer to other tasks needs its own check.
- **Contrast**: the primary color is about 3:1 against white, and the `default` `Button` uses it directly. A real product needs a WCAG AA review for small text.
- **Template status**: the scaffold has no product pages, so the rules still need validation on real screens. This page does not present plans as current state.
- **Freshness**: Apple HIG and component libraries keep changing. Update this page when a source changes.

## 8. Open questions

- The three-to-five person usability test has not run. The information budget and card trade-offs need a real task to validate.
- Primary color contrast in light mode needs a full audit before small text and links are finalized.
- Dark mode needs a screenshot pass by page type, especially for borders, shadows, and status colors.
- If charts are introduced, chart type, density, and color-vision accessibility need a separate review.
- The density checklist can join the pull request template as an item for interface changes.
- `app/hooks/use-mobile.ts` duplicates `useIsMobile` from `app/hooks/use-media-query.ts` at 768 px instead of 800 px. It has no callers; delete it or keep the single entry point documented in [GENERAL.md § 6.2](./GENERAL.md#62-usemediaquery-and-useismobile).

## 9. References

> External links accessed 2026-11-01. Apple documentation changes with OS releases; check the current version before citing.

### Platform guidance

| Source                           | Type     | Link                                                                          |
| -------------------------------- | -------- | ----------------------------------------------------------------------------- |
| Apple Human Interface Guidelines | Platform | <https://developer.apple.com/design/human-interface-guidelines/>              |
| HIG: Layout                      | Platform | <https://developer.apple.com/design/human-interface-guidelines/layout>        |
| HIG: Typography                  | Platform | <https://developer.apple.com/design/human-interface-guidelines/typography>    |
| HIG: Color                       | Platform | <https://developer.apple.com/design/human-interface-guidelines/color>         |
| HIG: Materials                   | Platform | <https://developer.apple.com/design/human-interface-guidelines/materials>     |
| HIG: Accessibility               | Platform | <https://developer.apple.com/design/human-interface-guidelines/accessibility> |
| WCAG 2.2                         | Standard | <https://www.w3.org/TR/WCAG22/>                                               |

### Usability research

| Source                                                           | Type    | Date                           | Link                                                               |
| ---------------------------------------------------------------- | ------- | ------------------------------ | ------------------------------------------------------------------ |
| Visual Hierarchy in UX: Definition (NN/g)                        | Article | 2021-01-17                     | <https://www.nngroup.com/articles/visual-hierarchy-ux-definition/> |
| Progressive Disclosure (NN/g)                                    | Article | 2006-12-03                     | <https://www.nngroup.com/articles/progressive-disclosure/>         |
| 8 Design Guidelines for Complex Applications (NN/g)              | Article | 2020-11-08                     | <https://www.nngroup.com/articles/complex-application-design/>     |
| Cards: UI-Component Definition (NN/g)                            | Article | 2016-11-06                     | <https://www.nngroup.com/articles/cards-component/>                |
| Dashboards: Making Charts and Graphs Easier to Understand (NN/g) | Article | 2017-06-18                     | <https://www.nngroup.com/articles/dashboards-preattentive/>        |
| Good from Afar, But Far from Good: AI Prototyping (NN/g)         | Article | 2025-10-24, checked 2026-08-19 | <https://www.nngroup.com/articles/ai-prototyping/>                 |
| State of UX 2026 (NN/g)                                          | Report  | 2026-01                        | <https://www.nngroup.com/articles/state-of-ux-2026/>               |

### Practitioner critique and checklists

| Source                                                | Type        | Date       | Link                                                                                              |
| ----------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------- |
| Good Dashboard Design vs AI Slop                      | Article     | 2026-10-07 | <https://ssicevs.com/blog/good-dashboard-design-vs-ai-slop>                                       |
| What is AI slop UI                                    | Terminology | 2026-07-04 | <https://uiscanner.com/blog/what-is-ai-slop-ui>                                                   |
| Avoid AI Slop (StyleKit)                              | Docs        | 2026-10-31 | <https://www.stylekit.top/en/avoid-ai-slop>                                                       |
| Escaping AI Slop: 4 Overused Patterns                 | Article     | 2026       | <https://noqta.tn/en/blog/ai-design-slop-overused-ui-patterns-fix-2026>                           |
| AI Slop Web Design Guide                              | Article     | 2026       | <https://www.925studios.co/blog/ai-slop-web-design-guide>                                         |
| Why AI Interfaces Fail Users                          | Article     | 2026       | <https://foundey.com/blog/ai-slop-in-ux-design>                                                   |
| How to Fix AI-Generated UI Designs (BSWEN)            | Article     | 2026-03-20 | <https://docs.bswen.com/blog/2026-03-20-ai-generated-ui-anti-patterns/>                           |
| Spot the Slop (Kosta Canatselis)                      | Article     | —          | <https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c> |
| 7 Signs a UI Has Been Vibe Coded (Fountain Institute) | Article     | —          | <https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui>                                   |
| Hacker News: AI-generated pages                       | Discussion  | —          | <https://news.ycombinator.com/item?id=50196368>                                                   |
| Tufte's principles for graphical integrity            | Article     | —          | <https://chartbuddy.io/blog/tuftes-principles-for-graphical-integrity>                            |

### Components and tooling

| Source          | Type       | Link                            |
| --------------- | ---------- | ------------------------------- |
| coss UI docs    | Library    | <https://coss.com/ui>           |
| coss particles  | Examples   | <https://coss.com/ui/particles> |
| Base UI         | Primitives | <https://base-ui.com/>          |
| Tailwind CSS v4 | Styling    | <https://tailwindcss.com/>      |
