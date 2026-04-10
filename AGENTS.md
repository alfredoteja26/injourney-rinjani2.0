# Agent guidance (Rinjani Integrated)

## Design system routing

There are two valid design-system routes in this repo:

- **Repo-native implementation route** for agents editing code, tokens, or shared components in this repository.
- **Stage prompt route** for `.stitch` assets used to prepare prompts for Google Stage from Cursor.

### Repo-native implementation route

When implementing or changing **UI, layout, color, typography, or new composite components in the repository**, use this order when sources conflict:

1. Product decisions in `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM_BLUEPRINT.md` (if present for the topic).
2. **Runtime tokens** in `packages/shared-ui/src/theme.css` (CSS variables consumed by Tailwind / `@theme`).
3. `**docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM.md`** and `**docs/design-system-overhaul-2026-04-07/COMPONENT_LIBRARY.md**` (human-readable spec and component taxonomy).
4. `**@rinjani/shared-ui**` primitives and patterns (prefer existing components over one-off markup).
5. InJourney brand book as **rationale**, not an automatic override of `theme.css`.
6. `**.stitch/DESIGN.md`** and Stitch exports: **condensed / generative reference only**. Do not treat Stitch as the token authority; reconcile any new palette or rule into `theme.css` and the overhaul docs first.

### Repo-native update routing

- If the task changes a **design rule**, update `DESIGN_SYSTEM.md` first.
- If the task changes **component usage, taxonomy, or introduces a new shared component**, update `COMPONENT_LIBRARY.md`.
- If the task changes **runtime tokens or semantic classes**, update `packages/shared-ui/src/theme.css`.
- Only update `.stitch/DESIGN.md` after the canonical docs above are aligned, and only as a condensed downstream summary for Stitch/Stage generation.
- When in doubt, prefer the overhaul docs over `.stitch` files.

### Stage prompt route

- Files under `.stitch/` support the `Cursor -> Google Stage` workflow.
- In that workflow, `.stitch/DESIGN.md` is the prompt-facing design brief and may be used directly.
- `.stitch/next-prompt.md` should continue to reference `.stitch/DESIGN.md`.
- Do not treat `.stitch/DESIGN.md` as the repo-native implementation authority unless the task explicitly targets the Stage prompt workflow.

### Implementation rules

- Prefer **semantic Tailwind classes** wired to the theme: `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-muted`, `text-secondary`, etc., instead of **raw hex** (e.g. `#006573`) in feature code.
- **Avoid** ad hoc `text-[#...]`, `bg-[#...]`, `border-[#...]` in app and package feature modules unless documented as an exception (e.g. third-party embeds, one-off charts pending token mapping).
- For audits of drift, see `docs/design-system-overhaul-2026-04-07/AUDIT_HARDCODED_COLOR.md` (updated when audits run).

## Repo-specific engineering

- Match existing patterns in the package you touch; keep changes scoped to the task.
- Run `npm run build` (workspace app) after non-trivial UI changes when feasible.

