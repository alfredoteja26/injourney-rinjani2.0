# UI Alignment ExecPlan — Portal + Talent Integrated Routes

This ExecPlan is a living document. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` current as the work proceeds.

## Purpose / Big Picture

Bring the active integrated Rinjani Portal and Rinjani Talent routes into tighter visual alignment with the canonical design system without changing application behavior, routes, permissions, data contracts, or interaction logic.

The implementation should:

- standardize active visual patterns on top of `packages/shared-ui/src/theme.css`
- favor `@rinjani/shared-ui` over package-local UI variants where the migration is low-risk
- improve hierarchy, spacing, surface consistency, and token usage
- preserve existing user flows and mock-data driven screens

## Scope

Primary active routes in scope:

- Portal: `#/`, `#/my-profile`, `#/survey`, `#/survey/management`, `#/survey/analytics/:id`, `#/hc-policy`, `#/analytics`, `#/mail`, `#/offboarding`, `#/settings`
- Talent: `#/talent`, `#/talent/idp`, `#/talent/talent-review`, `#/talent/admin/idp`
- Talent pass 2: `#/talent/career-aspiration`, `#/talent/360-assessment`, `#/talent/talent-committee`, `#/talent/supervisor-portal` routed as **My Team**

Supporting scope:

- integrated shell visuals in `packages/shell`
- shared presentation components in `packages/shared-ui`
- package-local globals in `packages/portal` and `packages/talent`
- canonical docs if shared component usage guidance needs updating

## Implementation Strategy

1. Normalize design tokens and add missing shared presentational primitives.
2. Update integrated shell density, spacing, and surface hierarchy where that lifts all active routes.
3. Refactor the four Talent routes in scope to shared presentational patterns first.
4. Normalize Portal active screens through a mix of shared primitives, token cleanup, and generated-screen surface adjustments.
5. Build and visually verify the integrated app.
6. Run a second Talent pass for screens identified in screenshot review, and close the documented My Team gap by evolving the existing supervisor route.

## Progress

- [x] Repo audit completed for active integrated routes, shared theme, and shell.
- [x] Runtime screenshots captured for Portal dashboard, Talent home, Talent Review, and Talent Development HQ.
- [x] ExecPlan created and maintained during implementation.
- [x] Shared presentational primitives added to `packages/shared-ui`.
- [x] Package-local typography/token drift normalized.
- [x] Talent active routes aligned to shared patterns for `#/talent`, `#/talent/idp`, `#/talent/talent-review`, and `#/talent/admin/idp`.
- [x] Talent pass 2 completed for `#/talent/career-aspiration`, `#/talent/360-assessment`, `#/talent/talent-committee`, and `#/talent/supervisor-portal`.
- [x] Existing `#/talent/supervisor-portal` evolved into spec-backed `My Team` while preserving the route.
- [x] Portal dashboard support components normalized to canonical surfaces and token usage.
- [x] Docs updated for promoted shared page-framing components.
- [x] Workspace build completed after the second Talent pass.
- [ ] Screenshot regression capture completed.

## Surprises & Discoveries

- Portal dashboard and several Portal routes still depend on large generated `imports/*` surfaces, so Portal needs a lighter-touch normalization strategy in some places instead of full presentational rewrites.
- Talent already visually matches the target direction better than Portal, but several active screens still rely on package-local `components/ui` plus raw color classes and inline visual logic.
- The legacy `Supervisor Portal` route was not only visually outdated; it also masked a product gap because the documented `My Team` workspace had not actually been implemented yet.
- Package-local globals in both `packages/portal` and `packages/talent` still define `Georgia` as the serif alias and use a smaller base radius than canonical shared-ui tokens.
- The integrated shell is already the dominant product frame for active routes, so improving shell density and workspace framing gives cross-route visual benefit immediately.
- Shared `PageHeader`, `SectionPanel`, `StatCardGroup`, `FilterRail`, and `StatusBadge` cover more of the active-route drift than expected, so they are now promoted beyond documentation-only status.

## Decision Log

- Active integrated routes are the only required implementation target for this pass.
- Shared presentational wrappers are allowed as long as they stay presentational-only and do not introduce domain APIs.
- Talent is the safer first migration target; Portal will combine pattern migration with token/surface normalization around generated components.
- The existing `#/talent/supervisor-portal` route remains the public entry point, but its product identity is now `My Team` to match the charter and section spec without introducing route churn.
- Canonical docs remain `DESIGN_SYSTEM.md`, `COMPONENT_LIBRARY.md`, and `theme.css`; package-local globals must not become competing sources of truth.
- Portal route normalization is split into two layers for this pass: shell/global/token cleanup plus dashboard support component cleanup, while heavier generated screens remain on the lighter-touch path.

## Validation Plan

- Run `npm run build --workspace @rinjani/app`.
- Re-capture screenshots for the main routes in scope.
- Verify no behavior changes on:
  - navigation
  - buttons and links
  - modal triggers
  - route access and role switcher
  - search/filter controls on Talent pages

## Outcomes & Retrospective

Implemented:

- Added shared page-framing primitives in `packages/shared-ui`.
- Normalized package-local typography/radius drift in Portal and Talent globals.
- Refined shell framing, Talent Home, Development Plan, Talent Review, Talent Development HQ, and Portal dashboard support components.
- Standardized Career Aspiration, 360 Assessment, and Talent Committee to shared workspace/governance framing.
- Implemented spec-backed `My Team` on the existing supervisor route with assignment selector, action dashboard, team profile, and team insights backed by a local presentational data adapter.

Pending follow-up if a second pass is requested:

- deeper Portal route-by-route refactors for generated screens such as `MyProfile`, `Survey`, `Mail`, and `Offboarding`
- screenshot regression capture after the latest integrated build
