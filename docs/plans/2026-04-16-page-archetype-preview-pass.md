# Preview Page Archetypes In Design System

This ExecPlan is a living document. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` up to date as work proceeds.

## Purpose / Big Picture

Rinjani needs more layout variation across modules, but applying those changes directly to active Portal, Talent, and Performance screens would mix design exploration with production-like route changes. This phase creates a safer design sandbox inside the admin-only `/#/design-system` route so page archetypes can be reviewed, iterated, and approved before any live module rollout begins.

After this phase, reviewers should be able to open the Design System page and compare realistic previews for the four target archetypes, understand the intended filter/content relationship for each, and see which live modules are likely rollout candidates later.

## Context and Orientation

- Existing preview hub:
  - `apps/rinjani/src/design-system-page.tsx`
- Current shared layout primitives:
  - `packages/shared-ui/src/page-layout.tsx`
  - `packages/shared-ui/src/index.ts`
- Canonical design-system docs to align:
  - `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM.md`
  - `docs/design-system-overhaul-2026-04-07/COMPONENT_LIBRARY.md`
- Root build command:
  - `npm run build`

Relevant repo facts discovered before implementation:

- The Design System page already has a `layout` tab and is the correct place to add preview-first composition work.
- The component library docs already contain documentation-first variation labels (`dashboard hub`, `workspace explorer`, `governance cockpit`) but they are not yet previewable runtime patterns.
- Current shared layout primitives promote consistent page framing, but not enough compositional variation to showcase distinct archetypes cleanly.

## Scope and Approach

This implementation will:

- add a dedicated archetype preview area inside the existing Design System page
- create shared preview-safe layout helpers for archetype framing, section rhythm, and filter placement demos
- render realistic preview compositions for:
  - Dashboard Hub
  - Workspace Explorer
  - Governance Cockpit
  - Detail Workspace
- explicitly demonstrate inline, side-rail, and hybrid filter models
- document rollout candidates without modifying live modules
- update the canonical design-system docs so the preview-first workflow is recorded as the official next step

This implementation will not:

- refactor active Portal, Talent, or Performance routes
- change route access, module manifests, or production-like workflow logic
- redefine the shell, token palette, or typography system

## Milestones

### Milestone 1 — Establish The Preview Contract

Add an ExecPlan and align on the Design System page as the sandbox for archetype review. The runtime result is still unchanged, but the implementation target and validation path become explicit.

### Milestone 2 — Add Shared Archetype Preview Helpers

Introduce small shared-ui helpers for archetype frames and content regions so the Design System page can compose realistic previews without duplicating ad hoc layout markup for every example.

Validation:

- Shared-ui exports compile cleanly
- Helpers remain presentational and preview-safe

### Milestone 3 — Build The Design System Archetype Lab

Extend the Design System route so reviewers can switch between archetypes, inspect rationale and usage guidance, and compare filter placement models against realistic enterprise content.

Validation:

- All four archetypes render distinctly
- Filter/content relationship is visually obvious
- Candidate rollout mapping is present without touching live routes

### Milestone 4 — Align Canonical Docs

Update the design-system docs so the new archetype previews are documented as preview-phase patterns and the rollout order stays explicit.

Validation:

- `DESIGN_SYSTEM.md` and `COMPONENT_LIBRARY.md` describe the archetypes, default filter model, and preview-first rollout path

## Validation

- `npm run build`
- Manual check on `/#/design-system`:
  - `Page Archetypes` is easy to find from the Design System page
  - Each archetype preview is structurally distinct
  - Inline, side-rail, and hybrid filter models are demonstrated clearly
  - Preview copy and mock data feel like believable Rinjani enterprise screens
- Manual regression check:
  - no active live-module route changes
  - Design System route remains admin-only

## Progress

- [x] Reviewed the current Design System page, shared layout primitives, and canonical design docs.
- [x] Added shared preview-safe archetype helpers and extended the Design System route with a dedicated `Page Archetypes` review tab.
- [x] Updated canonical design-system docs for preview-phase archetype guidance and filter-model defaults.
- [x] Ran build validation successfully with `npm run build`.
- [ ] Manual browser review of `/#/design-system` archetype previews is still pending.

## Surprises & Discoveries

- The existing Design System page already had enough tab structure and content density to support a preview lab without introducing a separate admin route.
- `COMPONENT_LIBRARY.md` already names three page variation labels, which means this phase is formalizing and operationalizing prior direction rather than introducing a brand-new concept.
- The lightest-weight path was to add preview-focused helpers in `shared-ui` rather than forcing the existing `PageHeader` and `FilterRail` primitives to carry every archetype-specific responsibility.

## Decision Log

- Decision: Keep the archetype lab inside the existing Design System page instead of creating a new admin route.
  Rationale: Reviewers already use `/#/design-system` as the admin-only preview hub, so adding the lab there lowers navigation cost and keeps exploration centralized.
  Date/Author: 2026-04-16 / Codex

- Decision: Treat shared archetype helpers as presentational preview primitives, not live module contracts yet.
  Rationale: The immediate goal is to explore and validate composition, not to force premature live-route adoption.
  Date/Author: 2026-04-16 / Codex

## Outcomes & Retrospective

What landed in this phase:

- The admin-only Design System route now includes a dedicated `Page Archetypes` tab with switchable previews for Dashboard Hub, Workspace Explorer, Governance Cockpit, and Detail Workspace.
- Shared-ui now includes preview-safe archetype composition helpers for frame, toolbar, sidebar, and section rhythm.
- The Design System page now demonstrates inline, side-rail, and hybrid filter models explicitly, along with “apply later” rollout candidates for future live-module adoption.
- Canonical docs now record the preview-first workflow, the new `detail workspace` archetype, default filter-model guidance, and the rule that live-module redesign follows preview approval.

Validation completed:

- `npm run build` succeeded from `integrated-rinjani`.

Remaining gap:

- Manual browser review of the `/#/design-system` archetype previews is still needed to confirm final visual quality, spacing, and responsive behavior.
