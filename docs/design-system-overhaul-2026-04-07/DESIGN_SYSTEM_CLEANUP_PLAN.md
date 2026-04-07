# Design System Cleanup Plan

## Purpose

This document defines how to clean up design-system residue after the Rinjani 2.0 shared design-system implementation. The goal is to prevent competing token systems, duplicated component libraries, and stale documentation from confusing follow-up agents.

This is not a delete-everything plan. Several legacy surfaces are still active in the integrated prototype, especially Talent screens that import local `components/ui` primitives.

## Source Of Truth

Active source of truth:

- Global CSS entry: `apps/rinjani/src/index.css`
- Token and Tailwind theme source: `packages/shared-ui/src/theme.css`
- Shared component library: `packages/shared-ui/src`
- Global AppShell: `packages/shell/src/app-shell.tsx`
- Admin-only preview hub: `apps/rinjani/src/design-system-page.tsx`
- Active design-system documentation: `docs/design-system-overhaul-2026-04-07`

Rules:

- New UI should import reusable primitives from `@rinjani/shared-ui`.
- New global chrome work should be implemented in `@rinjani/shell`.
- `.stitch/DESIGN.md` remains deferred until the parallel Stitch/Cursor work is stable.
- Package-local `components/ui` folders are legacy migration targets, not the new source of truth.

## Current Residue Audit

### Package-local UI copies

The repo still contains full local `components/ui` folders:

- `packages/portal/src/components/ui`: 48 files.
- `packages/talent/src/components/ui`: 48 files.
- `packages/performance/src/components/ui`: 48 files.

Current import scan:

- `packages/talent`: 366 imports matching `components/ui` or `@/components/ui`.
- `packages/portal`: 0 direct matches in the scan.
- `packages/performance`: 0 direct matches in the scan.

Interpretation:

- Talent local UI cannot be deleted yet because active integrated Talent routes still import it.
- Portal and Performance local UI folders look like likely stale copies, but they should still be validated with build and route smoke checks before deletion because generated imports or alias paths can hide usage.

### Package-local global CSS

The repo still contains package-local CSS entries:

- `packages/portal/src/index.css` imports `packages/portal/src/styles/globals.css`.
- `packages/talent/src/index.css` imports `packages/talent/src/styles/globals.css`.
- `packages/performance/src/index.css` imports `packages/performance/src/styles/globals.css`.

Findings:

- Portal and Talent local globals still include `Georgia`.
- Performance local globals still include `Inter` and older teal values.
- These CSS files are used by standalone package entrypoints, but the integrated app uses `apps/rinjani/src/index.css`.

Interpretation:

- Do not treat package-local globals as the integrated source of truth.
- Do not delete immediately if standalone package previews are still useful.
- Mark them legacy and migrate or archive after confirming standalone package entrypoints are no longer needed.

### Generated/Figma import surfaces

The highest hardcoded-style residue appears in generated/imported files, especially:

- `packages/talent/src/imports/Table.tsx`
- `packages/portal/src/imports/HomeRevampDashboard.tsx`
- `packages/performance/src/imports/HomeRevampDashboard.tsx`
- Multiple `Frame*.tsx` imported surfaces in Portal and Performance.

Interpretation:

- These should not be mass-refactored in the design-system cleanup pass.
- Treat them as screen migration candidates, because generated imports often encode layout-specific styles and behavior.

### Documentation residue

Docs are now partially organized:

- Active design-system session: `docs/design-system-overhaul-2026-04-07`
- Active architecture docs: `docs/integrated-product-architecture`
- Completed historical plans: `docs/archive/completed-execplans`
- Design input packs: `docs/design-input-packs`
- Authentication docs: `docs/authentications`

Interpretation:

- Do not flatten docs again.
- Add a short status section in `docs/README.md` if future sessions need quick navigation.
- Archive only docs that are clearly completed and not referenced by current implementation.

## Cleanup Sequence

### Step 1 - Lock Active Source Of Truth

Status: should be done before further visual enhancement.

Actions:

- Keep `apps/rinjani/src/index.css` as the single integrated CSS entry.
- Keep `packages/shared-ui/src/theme.css` as the token source.
- Keep `packages/shared-ui/src` as the component source.
- Keep `packages/shell/src/app-shell.tsx` as the shell source.
- Ensure Tailwind scans `packages/shared-ui/src`, `packages/shell/src`, and active app/package source folders.

### Step 2 - Mark Legacy, Do Not Delete

Status: immediate cleanup documentation.

Actions:

- Mark `packages/*/src/components/ui` as legacy migration targets.
- Mark `packages/*/src/styles/globals.css` as standalone/legacy token copies.
- Avoid creating new imports from those locations.

### Step 3 - Migrate Talent Local UI Imports

Status: separate migration ExecPlan required.

Actions:

- Start with the most common and lowest-risk primitives: `cn`, `Button`, `Card`, `Badge`, `Input`, `Select`, `Progress`, `Table`, `Dialog`.
- Replace imports screen-by-screen, not globally.
- Validate each selected Talent route visually after migration.
- Keep domain-specific wrappers only when they encode real domain behavior.

### Step 4 - Validate Portal And Performance Local UI Deletion

Status: only after route smoke checks.

Actions:

- Confirm no hidden imports rely on `packages/portal/src/components/ui`.
- Confirm no hidden imports rely on `packages/performance/src/components/ui`.
- Temporarily move or rename in a controlled branch before deletion.
- Run `npm run build`.
- Smoke check Portal and Performance routes.

### Step 5 - Normalize Or Archive Package-local Globals

Status: after standalone entrypoint decision.

Actions:

- If standalone Portal/Talent/Performance apps are no longer needed, archive or delete their package-local CSS entries.
- If standalone previews are still needed, update their globals to import or mirror `packages/shared-ui/src/theme.css`.
- Remove `Georgia` and `Inter` from active operational UI token paths unless explicitly approved later.

### Step 6 - Generated Surface Migration

Status: later UI migration, not cleanup.

Actions:

- Pick a cluttered Talent/Admin module as the first validation loop.
- Rebuild the chosen screen using `@rinjani/shared-ui` primitives and the new AppShell.
- Use that result to decide whether the system is ready for broader migration.

## Safe Now

- Use `@rinjani/shared-ui` for all new component work.
- Use `@rinjani/shell` for all AppShell work.
- Keep the admin-only `/#/design-system` route as the live review surface.
- Keep the active design-system session folder as the current design-system documentation workspace.

## Not Safe Yet

- Do not delete `packages/talent/src/components/ui`.
- Do not mass-replace all Talent `components/ui` imports.
- Do not delete package-local globals until standalone package usage is confirmed.
- Do not mass-clean generated/imported Figma surfaces.
- Do not update `.stitch/DESIGN.md` while another agent is actively iterating Stitch unless that work is coordinated.

## Validation Checklist

- `npm run build` passes.
- `/#/design-system` renders with the integrated AppShell.
- Portal dashboard renders.
- Talent home renders.
- At least one Talent admin route renders.
- Performance dashboard renders.
- AppShell expanded and collapsed states are checked.
- No new imports from `packages/*/src/components/ui` are introduced in new work.
