# Worker Profile Rollout

This ExecPlan is a living document. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` up to date as work proceeds.

## Purpose / Big Picture

Rinjani currently exposes employee information in multiple shapes: Portal has `My Profile` and a public employee profile, Talent has several candidate/detail panels, and Performance keeps team and KPI context in separate fixtures. After this change, the integrated app will have one canonical `WorkerProfile` contract and one shared profile experience that powers self profile, admin employee access, and talent profile entry points. Admins will also get an employee directory, and profile exports will be generated from the same filtered payload so sensitive sections do not leak.

## Context and Orientation

The integrated host app lives in `apps/rinjani`. It already composes source packages directly via Vite aliases:

- `@portal` -> `packages/portal/src`
- `@talent` -> `packages/talent/src`
- `@performance-v2` -> `packages/performance-v2/src`

Relevant current implementation points:

- Portal routes and wrappers:
  - `apps/rinjani/src/routes.tsx`
  - `apps/rinjani/src/portal-pages.tsx`
- Existing profile UI/data:
  - `packages/portal/src/components/MyProfile.tsx`
  - `packages/portal/src/components/PublicProfileView.tsx`
  - `packages/portal/src/lib/employee-profiles.ts`
- Talent detail/profile-adjacent surfaces:
  - `packages/talent/src/pages/SupervisorPortal.tsx`
  - `packages/talent/src/pages/TalentCommitteePortal.tsx`
  - `packages/talent/src/screens/TalentPool/index.tsx`
  - `packages/talent/src/screens/TalentPool/TalentProfileDetail.tsx`
  - `packages/talent/src/screens/SuccessionPlanning/*`
  - `packages/talent/src/data/mockMyTeamData.ts`
  - `packages/talent/src/data/mockTalentPoolData.ts`
- Performance summary sources:
  - `packages/performance-v2/src/lib/fixtures/initial-state.ts`
  - `packages/performance-v2/src/lib/fixtures/talent-master.ts`

Testing is available through Vitest in `apps/rinjani`, with current tests under `apps/rinjani/src/test`.

There is no existing PDF/XLSX export dependency in the workspace package manifests or lockfile, so v1 export must be implemented with internal client-side generators rather than a new backend or a heavy third-party runtime.

## Scope and Approach

This rollout will stay inside the integrated app and avoid rewriting the large legacy Portal `MyProfile` screen in place. Instead, the app will introduce a new integration-layer `WorkerProfile` module under `apps/rinjani/src/worker-profile`, then repoint Portal and Talent entry points to that shared module.

The chosen approach:

1. Create a canonical profile contract and policy layer in the host app.
2. Aggregate existing demo data from Portal, Talent, and Performance into a single filtered view model.
3. Render one shared profile shell that can be used as a full page or an embedded panel.
4. Add a Portal admin directory and stable employee-id-based deep links.
5. Generate PDF and XLSX files client-side from the filtered export payload.

Out of scope for this implementation:

- Rebuilding every legacy talent detail screen to match the new component in full.
- Introducing backend persistence, real auth scopes, or server-side export jobs.
- Replacing all legacy email-based deep links immediately; compatibility routes can remain.

## Milestones

### Milestone 1

Define the canonical `WorkerProfile` types, aggregation logic, access policy, and export payload rules. Add tests first for visibility, section filtering, and access-context behavior. At the end of this milestone, the repo has a trustworthy source of profile truth with red/green evidence.

Expected files:

- Create `apps/rinjani/src/worker-profile/*`
- Create tests under `apps/rinjani/src/test/*`

Validation:

- Run focused Vitest coverage for the new profile policy/aggregation tests.

Observable result:

- A target employee and viewer context produce a stable filtered profile object and export configuration.

### Milestone 2

Build the shared profile UI shell and replace Portal `My Profile` plus employee profile access with that canonical view. Add a new Portal admin employee directory that links into the stable worker profile route.

Expected files:

- Modify `apps/rinjani/src/routes.tsx`
- Modify `apps/rinjani/src/portal-pages.tsx`
- Modify `apps/rinjani/src/manifests.ts`
- Create `apps/rinjani/src/worker-profile/*` UI components

Validation:

- Run focused Vitest tests for Portal route rendering and directory/profile states.
- Build the host app.

Observable result:

- Users can open self profile and admins can search/browse employees into the same canonical profile page.

### Milestone 3

Wire Talent entry points to the canonical profile experience. Replace the most visible scattered profile surfaces with a shared profile page/panel flow and preserve context-specific deep links.

Expected files:

- Modify `packages/talent/src/pages/SupervisorPortal.tsx`
- Modify `packages/talent/src/screens/TalentPool/index.tsx`
- Modify `packages/talent/src/pages/TalentCommitteePortal.tsx`
- Modify the most relevant Succession screen(s) that expose candidate access

Validation:

- Run focused tests for new links/panel rendering where practical.
- Build the host app.

Observable result:

- My Team, Talent Pool, Succession, and Talent Committee all open the same profile model rather than bespoke summary panels.

### Milestone 4

Add profile export controls with preset + custom-light selection, then generate filtered `PDF` and `XLSX` downloads client-side from the canonical payload.

Expected files:

- Create export helpers inside `apps/rinjani/src/worker-profile/export/*`
- Add export UI into the profile shell

Validation:

- Run focused tests for export filtering and file-generation signatures.
- Build the host app.

Observable result:

- The profile page/panel offers preset-driven PDF/XLSX downloads whose contents respect selected sections and access policy.

## Validation

- `npm test --workspace @rinjani/app -- worker-profile`
- `npm test --workspace @rinjani/app -- profile`
- `npm test --workspace @rinjani/app`
- `npm run build --workspace @rinjani/app`

Manual checks:

- Open self profile from `#/my-profile`
- Open employee directory as admin and filter/search employees
- Open worker profile from a Talent entry point
- Export a filtered profile as PDF and XLSX

## Progress

- [x] Reviewed current Portal, Talent, Performance, route, and test structure.
- [x] Wrote the integrated Worker Profile access-policy reference that preserves the existing 4-tier edit policy and extends view/export policy.
- [x] Write and verify failing tests for canonical profile aggregation and policy.
- [x] Implement integration-layer WorkerProfile contract and aggregation.
- [x] Build shared WorkerProfile UI shell.
- [x] Wire Portal self profile, admin directory, and stable profile route.
- [x] Wire Talent entry points to canonical profile access.
- [x] Implement client-side PDF/XLSX export.
- [x] Run verification commands and capture outcomes.

## Surprises & Discoveries

- The workspace root is not the git root; the active repository for this implementation is `integrated-rinjani`.
- Portal, Talent, and Performance source packages are not built as independent workspace packages for the host app. The integration layer can safely live under `apps/rinjani/src` and import all of them through aliases.
- There is no existing export dependency for PDF/XLSX generation in the integrated workspace, so file generation must be implemented internally or by adding dependencies later.
- The existing employee-profile docs are strong on edit tiers but not on a unified view-policy matrix. A dedicated architecture doc was needed before implementation to avoid mixing `read-only`, `visible`, and `exportable` decisions.
- Talent entry points do not share one employee identifier source. `My Team`, `Talent Pool`, `Succession`, Portal, and Performance fixtures use different employee-id shapes, so the canonical model had to absorb additional fixture sources before deep links were safe to enable.
- Returning users to the originating Talent screen is simplest via query-string contract (`context` + `from`) on the canonical worker-profile route instead of duplicating profile routes under each platform shell.
- Client-side export is practical in this prototype, but adding `pdf-lib` and `xlsx` increases the already-large main bundle. The build still passes, but chunk-size warnings are more pronounced after export support was added.

## Decision Log

- Decision: Implement the canonical profile module in `apps/rinjani/src/worker-profile` instead of introducing a new shared package.
  Rationale: The work is integration-specific, consumes multiple package aliases, and should not force package-level build or dependency churn for a prototype.
  Date/Author: 2026-04-17 / Codex

- Decision: Replace Portal profile entry points with the new canonical view rather than extending the large legacy `packages/portal/src/components/MyProfile.tsx` in place.
  Rationale: The old component is large and self-contained; wrapping it would make the new access policy and export flow harder to centralize.
  Date/Author: 2026-04-17 / Codex

- Decision: Preserve the existing 4-tier edit model as the source of truth and introduce a separate integrated view/export policy document instead of redefining tiers.
  Rationale: The PRD already defines the edit policy adequately; the missing piece for the rollout is consistent role/context-based visibility and export filtering.
  Date/Author: 2026-04-19 / Codex

- Decision: Use one canonical `/worker-profile/:employeeId` route with query-driven context (`context`, `from`) instead of cloning route trees under Talent.
  Rationale: This keeps filtering logic centralized while still letting Talent-originated links preserve the right viewer context and return path.
  Date/Author: 2026-04-19 / Codex

- Decision: Extend the canonical aggregation layer to read Talent Pool and Succession fixtures directly.
  Rationale: Those modules use employee ids that do not exist in the original Portal/My Team/Performance fixture set, so linking to the canonical profile would otherwise land on empty fallback records.
  Date/Author: 2026-04-19 / Codex

- Decision: Implement export v1 with client-side `pdf-lib` and `xlsx` generation.
  Rationale: The integrated prototype has no export backend or prior file-generation runtime, and the roadmap explicitly requires downloadable PDF/XLSX output from the canonical filtered payload now.
  Date/Author: 2026-04-19 / Codex

## Outcomes & Retrospective

The canonical `WorkerProfile` model, integrated access-policy doc, Portal consumer routes, admin employee directory, Talent entry points, and export v1 are now wired and verified. The app builds successfully, and focused Vitest coverage now includes routing-contract behavior, Talent Pool and Succession fixture hydration, plus real `PDF` and `XLSX` generation checks.

Remaining work is now mostly refinement: better code-splitting around the heavier export libraries, richer export customization if needed, and any UX polish around context restoration. The biggest structural risk discovered during implementation was fragmented employee identifiers across fixtures; that is now mitigated in the integration layer, but future data unification should replace those fixture-specific adapters.
