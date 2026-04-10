# Performance 2.0 Governance Expansion ExecPlan

This ExecPlan is a living document. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` current while implementation proceeds.

## Purpose / Big Picture

Expand the `Performance 2.0` prototype beyond `My KPI` into a resettable, reviewable governance demo across:

- `KPI Tree`
- `Kamus KPI`
- `KPI Headquarter`

The prototype must support realistic demo flows, differentiated mock data, and a single global reset that restores the full `performance-v2` state to the canonical fixture baseline.

## Primary References

- `docs/plans/performance-v2-dip-traceability.md`
- `docs/plans/rinjani-performance-stitch-master-tracker.md`
- `docs/design-input-packs/performance/exports/dip-5-kpi-library-v0.1.md`
- `docs/design-input-packs/performance/exports/dip-6-kpi-tree-v0.1.md`
- `docs/design-input-packs/performance/exports/dip-7-kpi-headquarter-v0.1.md`
- `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM_BLUEPRINT.md`
- `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM.md`
- `docs/design-system-overhaul-2026-04-07/COMPONENT_LIBRARY.md`
- `packages/shared-ui/src/theme.css`
- `.stitch/designs/kpi-library-*.html`
- `.stitch/designs/kpi-tree-*.html`
- `.stitch/designs/kpi-hq-*.html`

## Implementation Strategy

1. Save the current workspace state before implementation.
2. Establish the shared foundation:
   - richer governance domain types
   - differentiated fixtures
   - resettable demo state
   - common selectors/actions required by multiple modules
3. Implement governance modules in parallel with disjoint write scopes.
4. Integrate routes/query-state and align copy/visuals with Rinjani design system.
5. Run build and targeted demo walkthroughs.

## Baseline Save Strategy

Intended baseline save:

- snapshot branch + commit of the current dirty workspace

Current environment limitation:

- `.git` writes are blocked in the sandboxed execution environment, so branch/commit snapshotting could not be performed directly from this session

Fallback baseline artifacts created before implementation:

- `/tmp/injourney-rinjani2.0-baseline.patch`
- `/tmp/injourney-rinjani2.0-untracked.txt`
- `/tmp/injourney-rinjani2.0-untracked.tar.gz`

These artifacts preserve tracked modifications plus untracked files so the workspace can be reconstructed if needed.

## Workstreams

### Foundation

- Extend `packages/performance-v2/src/lib/domain/types.ts`
- Extend `packages/performance-v2/src/lib/fixtures/initial-state.ts`
- Add/reset shared governance state in store/reducer
- Expose global reset in `packages/performance-v2/src/ui/persona-context-bar.tsx`

### KPI Tree

- Organization view
- Hierarchy view
- Warning quality panel
- Position detail sheet
- Bulk upload dry-run
- Analytics

### Kamus KPI

- Catalog browser
- Detail panel
- Submission form
- Validation queue
- Approval/publish governance
- Deprecate flow
- Analytics

### KPI Headquarter

- Dashboard
- Periods
- Policies
- Adjustments
- Year close
- Analytics
- Audit

## Validation

- `npm run build`
- Manual walkthrough:
  - reset demo
  - inspect differentiated Dimas/Binavia/Fajar/Sinta states
  - KPI Tree drilldown and warning flow
  - Kamus KPI validation/publish/deprecate
  - KPI HQ dashboard/policy/adjustment/audit
- Confirm reset still restores the canonical fixture after module interactions

## Progress

- Verified current repo-native design-system authority and DIP source documents.
- Confirmed current `My Team KPI` duplication comes from cloned fixture data, not approval logic.
- Confirmed reset capability already exists in store but was not exposed in UI.
- Created fallback baseline artifacts in `/tmp` because `.git` writes are blocked in-session.
- Began foundation work: richer types, differentiated fixtures, reset UX.
- Pending: module parallelization, route integration, build verification.

## Surprises & Discoveries

- The workspace is already heavily modified across many packages, so preserving current state before implementation is mandatory.
- Current `performance-v2` traceability coverage overstates governance readiness; `KPI Tree`, `Kamus KPI`, and `KPI Headquarter` are still mostly thin/static relative to the DIPs.
- `globalCapType` already uses `CAPPED_110` in HQ data while tree/library cap semantics were narrower; governance types must accommodate that without drift.

## Decision Log

- Decision: keep Stage/Stitch outputs as visual reference only, not token authority.
  Rationale: repo-local design-system routing explicitly prioritizes blueprint + runtime tokens + shared-ui docs.
  Date/Author: 2026-04-10 / Codex

- Decision: implement a single global reset first, not per-module reset.
  Rationale: it directly matches the demo recovery requirement and keeps shared state coherent.
  Date/Author: 2026-04-10 / Codex

- Decision: differentiate the Dimas/Fajar/Sinta mock portfolios instead of keeping clone-based lists.
  Rationale: current clone fixtures reduce demo credibility and mask workflow states.
  Date/Author: 2026-04-10 / Codex

## Outcomes & Retrospective

In progress.
