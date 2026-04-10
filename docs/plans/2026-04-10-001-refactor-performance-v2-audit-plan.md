---
title: Refactor: Audit Performance 2.0 feature coverage
type: refactor
status: active
date: 2026-04-10
---

# Refactor: Audit Performance 2.0 feature coverage

## Overview

Run a structured visual-inspection and code-review pass across the full `Performance 2.0` surface in `apps/rinjani` and `packages/performance-v2`, then compile findings before any fixes are attempted.

## Problem Frame

Recent work introduces a new shared layout pattern for several `Performance 2.0` screens, but the feature surface spans multiple routes, role gates, and package/app boundaries. A useful review needs explicit scope, feature-to-file traceability, and route coverage so findings can be prioritized without guessing what was or was not inspected.

## Requirements Trace

- R1. Cover every shipped `Performance 2.0` route and major feature area in the review scope.
- R2. Split the audit into code-quality and visual/layout-consistency passes.
- R3. Prioritize findings that can affect correctness, access control, navigation, state handling, or user-facing visual consistency.
- R4. Produce a single compiled findings report before any remediation work.

## Scope Boundaries

- No code fixes in this phase.
- No expansion of `Performance 2.0` functionality.
- No review of legacy `/performance` routes except where shared shell behavior affects `/performance-v2`.

## Context & Research

### Relevant Code and Patterns

- `apps/rinjani/src/routes.tsx` defines the `createHashRouter` tree and shell/header-accessory routing.
- `apps/rinjani/src/performance-pages-v2.tsx` is the app-to-package bridge and injects `PerformanceV2Provider`.
- `apps/rinjani/src/manifests.ts` defines platform/module metadata, labels, and route meta used by navigation.
- `packages/performance-v2/src/ui/performance-v2-page-frame.tsx` is the new page-frame/layout primitive.
- `packages/performance-v2/src/modules/**` holds the feature screens for My KPI, My Team KPI, KPI Library, KPI Tree, and KPI HQ.
- `apps/rinjani/src/test/render-performance-v2-screen.tsx` and `apps/rinjani/src/test/performance-v2-layout.test.tsx` provide current screen-level render coverage.

### Institutional Learnings

- `AGENTS.md` requires UI/layout work to prefer `packages/shared-ui/src/theme.css`, the design-system docs, and shared-ui primitives over ad hoc styling.

### External References

- None needed for this audit-first pass; the repo already contains the relevant design-system and feature-traceability material.

## Key Technical Decisions

- Review the app shell and the package screens together because navigation and role behavior cross the boundary.
- Treat route declarations, manifests, and shell toggles as first-class review surfaces, not just supporting glue.
- Use parallel subagent passes so code-quality, UI consistency, and feature-surface coverage can be checked independently before synthesis.

## Open Questions

### Resolved During Planning

- Which routes are in scope: all `/performance-v2/**` routes and shell accessories attached to those paths.
- What counts as visual inspection: layout/frame consistency, navigation/title alignment, and obvious route-level rendering regressions.

### Deferred to Implementation

- Whether any findings should be auto-fixed immediately after review.
- Whether browser-based inspection should run against a local dev server or remain code/static-analysis only for blocked routes.

## Implementation Units

- [ ] **Unit 1: Build route and feature inventory**

**Goal:** Establish the full review scope across routes, screens, and navigation labels.

**Requirements:** R1, R4

**Dependencies:** None

**Files:**
- Modify: `docs/plans/2026-04-10-001-refactor-performance-v2-audit-plan.md`
- Review: `apps/rinjani/src/routes.tsx`
- Review: `apps/rinjani/src/performance-pages-v2.tsx`
- Review: `apps/rinjani/src/manifests.ts`

**Approach:**
- Trace every `/performance-v2` route, redirect, and role gate.
- Map route entries to exported package screens and shell accessories.

**Patterns to follow:**
- Existing route/meta alignment in `apps/rinjani/src/routes.tsx` and `apps/rinjani/src/manifests.ts`

**Test scenarios:**
- Test expectation: none -- planning/review inventory only.

**Verification:**
- The audit has a complete route-to-screen matrix for `Performance 2.0`.

- [ ] **Unit 2: Run parallel code-review passes**

**Goal:** Inspect correctness, maintainability, test coverage, and standards compliance for the changed `Performance 2.0` surfaces.

**Requirements:** R2, R3, R4

**Dependencies:** Unit 1

**Files:**
- Review: `packages/performance-v2/src/modules/my-kpi/*.tsx`
- Review: `packages/performance-v2/src/modules/my-team-kpi/*.tsx`
- Review: `packages/performance-v2/src/modules/kpi-library/*.tsx`
- Review: `packages/performance-v2/src/modules/kpi-tree/KpiTreeScreen.tsx`
- Review: `packages/performance-v2/src/modules/kpi-headquarter/KpiHqScreen.tsx`
- Review: `packages/performance-v2/src/ui/performance-v2-page-frame.tsx`
- Test: `apps/rinjani/src/test/performance-v2-layout.test.tsx`

**Approach:**
- Use targeted subagents for correctness, testing gaps, maintainability, and standards/pattern drift.
- Pay special attention to route wiring, role gates, demo-persona assumptions, and partial frame adoption.

**Execution note:** Execution target: external-delegate

**Patterns to follow:**
- `packages/shared-ui/src/theme.css`
- `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM.md`
- `docs/design-system-overhaul-2026-04-07/COMPONENT_LIBRARY.md`

**Test scenarios:**
- Happy path -- review covers all tracked `Performance 2.0` routes and the newly introduced shared page frame.
- Edge case -- review checks redirect behavior and role-gated access for `/performance-v2/kpi-headquarter`.
- Integration -- review checks shell/header accessories stay aligned with route segments and package screens.

**Verification:**
- Findings are grouped by severity and tied to concrete files or route surfaces.

- [ ] **Unit 3: Run visual and layout consistency inspection**

**Goal:** Evaluate page-frame consistency, section-band usage, headings, and route-level UX coherence across the feature set.

**Requirements:** R2, R3, R4

**Dependencies:** Unit 1

**Files:**
- Review: `packages/performance-v2/src/ui/performance-v2-page-frame.tsx`
- Review: `packages/shared-ui/src/page-heading.tsx`
- Review: `packages/shared-ui/src/theme.css`
- Review: `packages/performance-v2/src/modules/kpi-library/KpiLibraryScreen.tsx`
- Review: `packages/performance-v2/src/modules/kpi-tree/KpiTreeScreen.tsx`
- Review: `packages/performance-v2/src/modules/kpi-headquarter/KpiHqScreen.tsx`
- Review: `packages/performance-v2/src/modules/my-kpi/MyKpiDashboardScreen.tsx`
- Review: `packages/performance-v2/src/modules/my-team-kpi/MyTeamPlanningScreen.tsx`
- Review: `packages/performance-v2/src/modules/my-team-kpi/MyTeamMonitoringScreen.tsx`

**Approach:**
- Compare each reviewed screen against the new shared frame/band pattern and route metadata.
- Flag partial rollouts, inconsistent heading hierarchy, spacing drift, or shell/title mismatches.

**Execution note:** Execution target: external-delegate

**Patterns to follow:**
- `packages/performance-v2/src/ui/performance-v2-page-frame.tsx`
- `packages/shared-ui/src/page-heading.tsx`
- `packages/shared-ui/src/theme.css`

**Test scenarios:**
- Happy path -- visual pass covers dashboard, explorer, and governance layout variations.
- Edge case -- visual pass checks screens that still use the older layout model and identifies drift instead of assuming parity.

**Verification:**
- Each visual finding names the affected screen or route and the expected shared pattern it diverges from.

- [ ] **Unit 4: Compile findings-first report**

**Goal:** Merge route inventory, code-review output, and visual-inspection output into a single findings report.

**Requirements:** R4

**Dependencies:** Unit 2, Unit 3

**Files:**
- Modify: `docs/plans/2026-04-10-001-refactor-performance-v2-audit-plan.md`

**Approach:**
- De-duplicate overlapping findings across reviewer passes.
- Present findings ordered by severity, then note open questions and review gaps separately.

**Patterns to follow:**
- Review-first communication requested by the user.

**Test scenarios:**
- Test expectation: none -- reporting artifact only.

**Verification:**
- The final report can be used as the basis for a follow-up fix pass without re-scoping the audit.

## System-Wide Impact

- **Interaction graph:** Route metadata, shell header toggles, app-level role/session injection, and package-local screens all contribute to the final UX.
- **State lifecycle risks:** Provider-level persona assumptions or route redirects can hide screen-level issues during manual review if not considered explicitly.
- **API surface parity:** Navigation labels, breadcrumbs, and route segments should stay aligned across `routes.tsx`, `manifests.ts`, and screen headings.
- **Integration coverage:** Route redirects, Admin-only access, and shell accessories need review across file boundaries.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Visual inspection misses routes not obvious from the currently open files | Build route inventory first from router and manifests |
| Large screen files hide higher-severity issues during manual reading | Split review into targeted subagent passes by concern |
| Findings mix real regressions with prototype-only assumptions | Separate concrete defects from prototype caveats in the final synthesis |

## Documentation / Operational Notes

- This plan is the scope artifact for a findings-first audit pass.
- Any later remediation should reference the compiled findings and update this plan or a follow-up implementation plan as needed.

## Sources & References

- Related code: `apps/rinjani/src/routes.tsx`
- Related code: `apps/rinjani/src/performance-pages-v2.tsx`
- Related code: `apps/rinjani/src/manifests.ts`
- Related code: `packages/performance-v2/src/ui/performance-v2-page-frame.tsx`
- Related code: `docs/plans/performance-v2-dip-traceability.md`
