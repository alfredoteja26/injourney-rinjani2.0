---
title: Standardize EQS formula across Rinjani Talent
type: implementation
status: active
date: 2026-04-14
---

# Standardize EQS formula across Rinjani Talent

## Overview

Align every active EQS calculation and EQS-backed display in `packages/talent` to one canonical sunrise formula derived from the repo's business documentation, especially `docs/Rinjani 2.0 Documentation/Sample-EQS-Calculation.md`.

## Problem Frame

The current codebase contains multiple EQS implementations and data shapes:

- a Talent-side EQS engine with partially aligned weights,
- a Career Path EQS engine that still uses proxy/demo scoring,
- active routes that display hardcoded or stale EQS mock data,
- older prototype screens that still depend on legacy EQS utilities.

This creates a product risk: users can see different EQS values or different scoring logic depending on which Rinjan Talent module they open, even for the same employee and target position.

## Canonical Inputs Consulted

- `docs/Rinjani 2.0 Documentation/Sample-EQS-Calculation.md`
- `docs/Rinjani 2.0 Documentation/Rinjani 2.0 Talent Business Process.md`
- `packages/talent/src/guidelines/Rinjani Talent (INJ-BPR)/Product Artifacts/Data Model.md`
- active EQS code in:
  - `packages/talent/src/lib/talent/eqsCalculation.ts`
  - `packages/talent/src/lib/career-path/eqsCalculation.ts`
  - `packages/talent/src/utils/eqsCalculation.ts`

## Canonical Formula To Implement

### EQS components

- `Kinerja`: 20%
- `Kompetensi / Job Fit`: 20%
- `Pengalaman`: 20%
- `Aspirasi Karir`: 10%
- `Pelatihan / IDP`: 20%
- `TES`: 10%

### Weighted performance

- `Y0`: 50%
- `Y-1`: 30%
- `Y-2`: 20%

Formula:

`Kinerja = (Y0 * 0.50) + (Y-1 * 0.30) + (Y-2 * 0.20)`

### Aspiration points

- `SELF`: 20
- `SUPERVISOR`: 20
- `JOB_HOLDER`: 30
- `UNIT`: 30

Rule:

- sum all applicable aspiration points for the target position
- cap at `100`

### TES

Formula:

- `TES = 50 - total_boundary_penalty + total_additional_points`
- boundary penalty capped to `50`
- additional points capped to `50`
- final TES clamped to `0..100`
- rounding follows sample output at final score presentation

### Eligibility gate

- workers under disciplinary sanction level `Sedang` or `Berat` are disqualified
- disqualified workers receive `N/A - Disqualified`; EQS is not computed

## Open Product Questions

The sample document is strong enough to lock formula weights, performance-year weighting, aspiration scoring, TES structure, and disqualification semantics. The following implementation details still need explicit product confirmation or a documented fallback rule before full rollout:

1. Exact algorithm for converting competency evidence into `Job Fit` raw score across production modules.
2. Exact algorithm for converting career history into `Pengalaman` raw score across production modules.
3. Exact algorithm for converting IDP/training evidence into `Pelatihan` raw score across production modules.
4. Canonical band labels and thresholds to use everywhere (`Highly Qualified`, `Qualified`, etc.) because current modules use different naming sets.
5. Exact disciplinary data mapping from current data models into severity buckets (`Ringan`, `Sedang`, `Berat`), since some code only stores `ACTIVE/NONE/RESOLVED`.

## Scope Boundaries

- Standardize active Talent app surfaces first.
- Update supporting mock data that powers active routes.
- Keep portal documentation or portal-only mock content out of the first implementation pass unless it directly blocks shared understanding.
- Do not redesign unrelated UI while standardizing EQS.

## Active Route Surfaces In Scope

- `/talent` (`packages/talent/src/screens/Home.tsx`)
- `/talent/career-aspiration` (`packages/talent/src/screens/CareerPath/CareerPathPage.tsx`)
- `/talent/talent-mapping` (`packages/talent/src/screens/Epic2/TalentMapping.tsx`)
- `/talent/succession-planning` (`packages/talent/src/screens/SuccessionPlanning/index.tsx`)

## Planned Architecture Direction

Create one repo-level EQS calculation authority that can support:

- employee + target-position specific EQS computation,
- explainable breakdown data for UI,
- consistent eligibility/disqualification handling,
- stable mock-data generation for prototype surfaces still backed by local data.

Other modules should consume this authority instead of maintaining separate scoring logic.

## Implementation Units

- [ ] **Unit 1: Define the sunrise EQS domain contract**

**Goal:** establish a single EQS calculation contract and type shape usable across Talent modules.

**Requirements:** canonical formula, explainable breakdown, eligibility gate

**Files:**
- Modify: `packages/talent/src/lib/talent/eqsCalculation.ts`
- Modify: `packages/talent/src/types/talent.ts`
- Review: `packages/talent/src/types/careerPath.ts`

**Approach:**
- align weights to the sample document
- add performance-year weighted logic
- add aspiration point mapping `20/20/30/30`
- add TES helper structure
- normalize breakdown payload so consumer modules can render one consistent shape

- [ ] **Unit 2: Replace Career Path proxy scoring**

**Goal:** remove mock/proxy EQS logic from Career Path and route it to the canonical engine or a thin adapter over it.

**Requirements:** same EQS results for the same employee and target position across modules

**Files:**
- Modify: `packages/talent/src/lib/career-path/eqsCalculation.ts`
- Modify: `packages/talent/src/screens/CareerPath/JobHolderAspiration/JobHolderAspirationView.tsx`
- Modify: `packages/talent/src/screens/CareerPath/UnitAspiration/TalentRequestModal.tsx`
- Modify: `packages/talent/src/screens/CareerPath/SupervisorAspiration/AssignAspirationModal.tsx`
- Modify: `packages/talent/src/screens/CareerPath/IndividualAspiration/IndividualAspirationView.tsx`
- Modify: supporting Career Path EQS display components as needed

**Approach:**
- remove grade/name/status proxy formulas
- adapt current Career Path data into canonical EQS input shape
- preserve existing UI layout while fixing scoring source

- [ ] **Unit 3: Standardize active mock-backed route data**

**Goal:** make active demo/prototype routes consume the same EQS assumptions.

**Files:**
- Modify: `packages/talent/src/data/homeData.ts`
- Modify: `packages/talent/src/data/mockTalentPoolData.ts`
- Modify: `packages/talent/src/lib/talent/mockData.ts`
- Modify: `packages/talent/src/data/mockTalentData.ts`
- Modify: `packages/talent/src/utils/eqsCalculation.ts`
- Modify: any route-local `mockData.ts` file that exposes EQS directly

**Approach:**
- fix weight drift, especially `training` and missing `TES`
- either adapt legacy utilities to canonical logic or reduce them to wrapper/compatibility helpers
- update active route mock records so displayed EQS and breakdowns match the same assumptions

- [ ] **Unit 4: Standardize consumer thresholds and labels**

**Goal:** ensure every EQS display uses the same band thresholds, labels, and ineligible rendering.

**Files:**
- Modify: EQS display components under `packages/talent/src/components` and `packages/talent/src/screens/**`

**Approach:**
- centralize band threshold helper(s)
- replace module-local label/color logic where it diverges
- ensure disqualified employees render as unavailable instead of fake numeric scores

- [ ] **Unit 5: Verification**

**Goal:** verify that equivalent employee/position inputs produce the same EQS result everywhere.

**Verification targets:**
- Home card data
- Career Path ranking and breakdown modal
- Talent Mapping score usage
- Succession Planning score usage
- any mock recalculation flow tied to EQS refresh

## Parallelization Plan For Sub-Agents

Use disjoint write scopes to avoid merge conflict:

1. Worker A: canonical engine + shared types
2. Worker B: Career Path adapters and screens
3. Worker C: active mock data and legacy utility cleanup
4. Worker D: UI consumers, labels, thresholds, and verification pass

Critical-path rule:

- Worker A lands first or exposes a stable contract first.
- Workers B/C/D rebase on that contract rather than inventing their own EQS shape.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Sample document does not fully define raw scoring for Job Fit, Experience, or IDP | pause those exact rules for product confirmation before locking them into the canonical engine |
| Active route data models differ between Talent and Career Path | define a thin adapter layer instead of duplicating formula logic |
| Legacy prototype routes still depend on old EQS utility assumptions | either wrap the canonical engine or explicitly isolate legacy-only usage until migrated |
| Disciplinary severity is under-modeled in current types | add explicit mapping function and keep unresolved data cases visible |

## Progress

- [x] Initial repo audit completed
- [x] Canonical sample document identified and reviewed
- [x] Active route surfaces using inconsistent EQS logic identified
- [ ] Product confirmation of unresolved raw-scoring details
- [ ] Canonical engine implementation
- [ ] Career Path migration
- [ ] Active mock-data migration
- [ ] Verification pass

## Surprises & Discoveries

- The repo already had broad agreement on the six EQS components, but not on their exact implementation details.
- The largest active inconsistency is not only weight drift; Career Path currently uses proxy/demo scoring instead of business EQS logic.
- Some active routes still rely on route-local or legacy mock EQS values, which means standardization must include data fixtures, not just calculation helpers.

## Decision Log

- 2026-04-14: Treat `Sample-EQS-Calculation.md` as the sunrise calculation authority for this workstream.
- 2026-04-14: Prioritize active Talent routes before portal-only documentation or passive mock content.
- 2026-04-14: Do not implement guessed raw scoring logic for Job Fit, Experience, or IDP if the document does not define it deterministically enough.

## Outcomes & Retrospective

To be updated during implementation.
