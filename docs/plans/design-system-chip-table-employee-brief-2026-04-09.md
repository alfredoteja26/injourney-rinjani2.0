# Refine Chip, Table, and Employee Brief Patterns

This ExecPlan is a living document. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` up to date as work proceeds.

## Purpose / Big Picture

The current shared design system needs tighter guidance and more explicit primitives for compact identity and data-heavy UI. The immediate product questions are whether chip/badge text should always render in uppercase, how rounded and padded shared tables should be, and how to represent one employee across primary and secondary assignments without inventing ad hoc profile cards in each module.

After this phase, the shared system should clearly distinguish badge versus action-chip usage, preserve normal capitalization by default, standardize a more rounded table container and cell padding rhythm, and expose a reusable `EmployeeBriefCard` component that supports primary, talent-mobility, and project-assignment contexts.

## Context and Orientation

- Design-system source of truth:
  - `.stitch/DESIGN.md`
  - `apps/rinjani/src/design-system-page.tsx`
- Shared primitives to adjust:
  - `packages/shared-ui/src/badge.tsx`
  - `packages/shared-ui/src/action-chip.tsx`
  - `packages/shared-ui/src/table.tsx`
  - `packages/shared-ui/src/data-table.tsx`
  - `packages/shared-ui/src/profile-summary.tsx`
- New shared primitive to add:
  - `packages/shared-ui/src/employee-brief-card.tsx`
  - `packages/shared-ui/src/index.ts`

## Scope and Approach

This implementation will:
- clarify badge and action-chip capitalization guidance in the shared design-system documentation
- make badge and action-chip primitives default to normal sentence/title case instead of forced uppercase styling
- standardize the shared table wrapper, radius, and horizontal/vertical padding for headers and rows
- add a reusable employee brief card for compact assignment identity display
- update the design-system showcase page to demonstrate the new guidance and component

This implementation will not:
- refactor every package-local badge usage across legacy prototype screens
- redesign profile detail flows outside the shared component library
- introduce a new assignment data model beyond what the card itself needs to render

## Validation

- `npm run build`
- Manual check on the design-system page:
  - badge and action chip examples preserve normal capitalization
  - table headers and rows show the updated rounded container and padding rhythm
  - employee brief card preview clearly shows primary and secondary assignment states

## Progress

- [x] Reviewed the current shared badge, action-chip, table, data-table, and profile-summary implementations.
- [x] Confirmed the shared `Badge` primitive does not force uppercase today, but the shared table header does force uppercase and the design guidance is still ambiguous for AI-generated output.
- [x] Updated `.stitch/DESIGN.md` so badge/chip casing and table containment rules are explicit.
- [x] Updated shared badge/action-chip/table primitives to preserve normal casing and use a more rounded table container with standardized cell padding.
- [x] Added `EmployeeBriefCard` and design-system demos for primary, talent-mobility, and project-assignment use cases.
- [x] Ran build validation successfully with `npm.cmd run build`.

## Surprises & Discoveries

- The shared `Badge` primitive currently uses wider tracking but no explicit `uppercase`; the all-caps behavior is more likely coming from prompt interpretation or upstream screen-level classes.
- The shared `TableHead` primitive does explicitly enforce `uppercase`, which conflicts with the typography guidance that all-caps should be used sparingly.
- The current shared table primitive has no built-in rounded border container, so density and edge spacing depend too much on each caller.

## Decision Log

- Decision: Make badge and action-chip capitalization default to `normal-case`.
  Rationale: Status and assignment labels should read naturally in Indonesian and English. All-caps remains an exception for deliberate metadata labels, not the default component behavior.
  Date/Author: 2026-04-09 / Codex

- Decision: Standardize shared tables as contained rounded surfaces with equal horizontal inset for headers and rows.
  Rationale: The product request is not just "more rounded corners" but consistent distance between cell content and the table outline. Putting this into the base primitive prevents screen-by-screen drift.
  Date/Author: 2026-04-09 / Codex

- Decision: Add a dedicated `EmployeeBriefCard` instead of overloading `ProfileSummary`.
  Rationale: `ProfileSummary` is intentionally generic, while the new requirement is domain-specific and assignment-aware. A separate primitive avoids muddying the simpler identity-summary use case.
  Date/Author: 2026-04-09 / Codex

## Outcomes & Retrospective

What landed in this phase:
- Badge and action-chip guidance now explicitly says authored casing should be preserved by default.
- Shared badge and action-chip primitives now enforce `normal-case` so parent styles and AI-generated markup are less likely to produce accidental all-caps labels.
- Shared table primitives now render inside a rounded bordered container, with `px-5` horizontal padding on both headers and body cells and slightly taller body rows.
- A reusable `EmployeeBriefCard` now exists in `shared-ui` for compact employee identity plus assignment context.
- The design-system showcase page now demonstrates chip guidance, table spacing guidance, and three employee-card cases.

Validation completed:
- `npm.cmd run build` succeeded from the workspace root.

Residual follow-up items:
- Legacy package-local badge/table implementations in non-shared prototype folders still have their own styling and may continue to show uppercase or older spacing until they are migrated to shared primitives.
