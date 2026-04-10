# My KPI Redesign Implementation Plan

This ExecPlan is a living document. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` up to date as work proceeds.

## Purpose / Big Picture

The My KPI module should become a spec-native employee workspace, not a decorated version of the older static prototype. After this redesign, Binavia Wardhani can manage her 2026 KPI cycle from one coherent surface: review KPI Bersama and KPI Unit, switch between Table/List/Hierarchy portfolio views, add KPI Unit items from Library/Custom/Previous Period, edit targets and weights with live validation, submit the plan, complete check-ins with evidence, request deadline extensions, and read the year-end score breakdown.

This work matters because My KPI is the employee-facing core of the Performance product. If this module is shallow, the rest of the Performance ecosystem will look disconnected even if the design system is polished.

## Context and Orientation

Primary specifications:

- `docs/design-input-packs/performance/exports/dip-1-my-kpi-planning-goal-setting-v0.1.md`
- `docs/design-input-packs/performance/exports/dip-2-my-kpi-monitoring-check-in-v0.1.md`
- `docs/design-input-packs/performance/MY_KPI_SPEC_VS_PROTOTYPE_GAP_REVIEW_2026-04-07.md`

Active app integration:

- `apps/rinjani/src/routes.tsx` owns the hash routes used by the local app.
- `apps/rinjani/src/performance-pages.tsx` wraps Performance pages with `PerformancePrototypeProvider` and `PrototypePersonaBar`.
- The currently active My KPI routes are:
  - `#/performance/my-kpi`
  - `#/performance/my-kpi/planning`
  - `#/performance/my-kpi/goal-setting`
  - `#/performance/my-kpi/check-in`
  - `#/performance/my-kpi/evaluation`
  - `#/performance/my-kpi/year-end`

Current My KPI implementation:

- `packages/performance/src/components/performance/my-kpi/MyKPIDashboard.tsx`
- `packages/performance/src/components/performance/my-kpi/PlanningDashboard.tsx`
- `packages/performance/src/components/performance/my-kpi/GoalSettingForm.tsx`
- `packages/performance/src/components/performance/my-kpi/CheckInForm.tsx`
- `packages/performance/src/components/performance/my-kpi/EvaluationDashboard.tsx`
- `packages/performance/src/components/performance/my-kpi/YearEndAssessment.tsx`

Shared prototype domain:

- `packages/performance/src/lib/performance/types.ts`
- `packages/performance/src/lib/performance/fixtures.ts`
- `packages/performance/src/lib/performance/store.tsx`

Reusable UI foundations:

- `packages/shared-ui/src/button.tsx`
- `packages/shared-ui/src/badge.tsx`
- `packages/shared-ui/src/tabs.tsx`
- `packages/shared-ui/src/sheet.tsx`
- `packages/shared-ui/src/dialog.tsx`
- `packages/shared-ui/src/input.tsx`
- `packages/shared-ui/src/textarea.tsx`
- `packages/shared-ui/src/select.tsx`
- `packages/shared-ui/src/table.tsx`
- `packages/shared-ui/src/progress.tsx`
- `packages/shared-ui/src/toast.tsx`

Canonical product data from DIP 1 and DIP 2:

- Employee: Binavia Wardhani, employee number `260102`, Group Head HC Planning & Analytics, Band Madya, STRUKTURAL, reports to Dimas Sayyid `260101`.
- Period: 2026 planning open, `2026-01-15` to `2026-03-15`.
- Formula: Madya Struktural uses KPI Bersama `40%` and KPI Unit `60%`.
- KPI Bersama is read-only and admin-owned:
  - `KPI-B-001` Customer Satisfaction Index (CSI), fixed target `4.2`, unit `Skala 1-5`, weight `25%`.
  - `KPI-B-002` Revenue Growth, fixed target `12%`, unit `%`, weight `15%`.
- KPI Unit:
  - `KPI-U-001` HC Analytics Dashboard Completion, progressive quarterly targets `25/50/75/100`, weight `20%`, status `APPROVED`, source `LIBRARY`, dictionary `DIC-042`.
  - `KPI-U-002` Workforce Planning Accuracy, fixed target `90%`, weight `15%`, status `DRAFT`, source `LIBRARY`.
  - `KPI-U-003` Time-to-Fill Critical Positions, fixed target `45 Hari`, negative polarity, weight `15%`, status `DRAFT`, source `CUSTOM`.
  - `KPI-U-004` HC Policy Compliance Rate, fixed target `95%`, weight `10%`, status `ALLOCATED`, cascaded directly from Dimas, source `LIBRARY`.
- Monitoring samples:
  - `REA-001` for `KPI-U-001` Q1 actual `28`, verified, with file and link evidence.
  - `REA-002` for `KPI-U-003` Q1 actual `42`, verified, with file evidence.
  - `REA-003` for `KPI-U-001` Q2 actual `55`, draft.
- Year-end sample final PI is `3.955`, rating `Excellent`.

Resolved policy defaults:

- No maximum KPI Unit hard limit in MVP.
- Minimum item weight is `5%`.
- One portfolio per active position variant.
- Formula text appears only when available.
- No auto-zero in MVP; missed submissions are late-flagged.
- Only submitted realizations are manager-visible.
- KPI Bersama realization is admin-owned through HQ/Tree, not employee-owned from My KPI.
- No backdate except approved extension.
- Auto-approve timeout is `5` business days.

## Scope and Approach

This redesign should create a new My KPI v2 workspace first, then promote it to the main route after visual and behavior verification. The first route should be `#/performance/my-kpi-redesign` or `#/performance/my-kpi/v2`, while the old routes stay available as fallback during iteration. Once the v2 workspace satisfies the acceptance checklist, `#/performance/my-kpi` can be switched to render the redesigned workspace and the old screens can be retired later.

The new workspace should be built under a separate component folder, for example:

- `packages/performance/src/components/performance/my-kpi-redesign/MyKpiWorkspace.tsx`
- `packages/performance/src/components/performance/my-kpi-redesign/components/*`

The old `my-kpi` components should not be patched into a different shape unless doing so is clearly cheaper and safer than a v2 workspace. The existing components are useful as references for copy, tokens, and legacy behavior, but they do not match the DIP interaction model closely enough to be the main foundation.

The shared TypeScript domain should be extended rather than bypassed. Missing concepts such as dictionary linkage, target schedules, evidence-required flags, BSC perspective, copied-from metadata, cascaded parent metadata, check-in schedule windows, and portfolio view mode should be added to the domain layer so the UI does not become another static mock.

## Design Direction

The visual model is an operational KPI cockpit, not a marketing page and not a generic card dashboard. The screen should feel like a working HR system: calm, dense enough for business users, visually clear, and strongly structured.

Recommended layout:

- Top workspace header with employee, position, period, planning status, Atasan Langsung, and `40% / 60%` formula.
- Primary phase tabs: `Rencana KPI`, `Check-in`, `Riwayat Realisasi`, `Skor Akhir`.
- For `Rencana KPI`, use a two-column workspace on desktop:
  - Main canvas for Table/List/Hierarchy portfolio views.
  - Right validation rail for Bobot Jenis, Bobot Item, min `5%`, invalid items, submit readiness, and next action.
- For editing and creation, use right-side sheets/drawers instead of full page jumps:
  - Add KPI drawer with `Dari Library`, `Custom`, and `Copy Periode Sebelumnya`.
  - KPI detail drawer for target, weight, locked attributes, and cascade metadata.
  - Submit confirmation dialog when valid.
- For `Check-in`, use a schedule strip plus focused KPI realization drawers:
  - Period status cards for Q1/Q2/Q3/Year-End.
  - Realization form with target, actual, notes, evidence, and live achievement calculation.
  - Extension request dialog from overdue/closed windows.
- For `Skor Akhir`, use a table-first score breakdown with subtotal rows, final PI, rating, cap indicators, and Atasan feedback.

The copy should prefer DIP terminology: `Rencana KPI`, `KPI Bersama`, `KPI Unit`, `Bobot Item`, `Bobot Jenis`, `Kontribusi ke PI`, `Atasan Langsung`, `Realisasi`, `Bukti`, `Perpanjangan`, and `Skor Akhir`.

## Screen and Component Map

### Route-Level Screens

- `MyKpiWorkspace`
  - The main v2 page shell. Owns current phase tab, selected KPI, open drawer/dialog state, and portfolio view mode.
- `PlanningPortfolioView`
  - The Rencana KPI screen. Contains mode switcher, action bar, KPI Bersama section, KPI Unit section, and validation rail.
- `MonitoringCheckInView`
  - The Check-in screen. Contains schedule strip, current period worklist, realization drawer entry points, evidence summary, and extension status.
- `RealizationHistoryView`
  - Historical period table/timeline per KPI with target, actual, achievement percentage, status, notes, and evidence count.
- `YearEndScoreView`
  - Final score breakdown table with item rows, cap-applied labels, subtotal rows for KPI Bersama and KPI Unit, final PI, rating, formula explanation, and Atasan feedback.

### Planning Components

- `MyKpiWorkspaceHeader`
  - Shows Binavia, role, organization, period, Atasan Langsung, position variant, formula `KPI Bersama 40% / KPI Unit 60%`.
- `PlanningStatusBanner`
  - Shows planning open/closed state, deadline, read-only submitted state, and whether mutation/change request rules apply.
- `PortfolioModeSwitcher`
  - Switches `Table`, `List`, and `Hierarchy` modes.
- `KpiPortfolioTable`
  - Table view. Columns: KPI, type, source, status, polarity, target, Bobot Item, Bobot Jenis, Kontribusi ke PI, cap, actions.
- `KpiPortfolioList`
  - Detail-friendly list cards for reviewing one KPI at a time without losing validation context.
- `KpiPortfolioHierarchy`
  - Parent/child view for KPI Bersama, cascaded KPI, and unit KPI relationships.
- `KpiItemIdentity`
  - Shared title/source/status/polarity/cap/locked badges.
- `WeightValidationRail`
  - Live totals, min item rule, invalid item list, submit readiness, and action buttons.
- `AddKpiDrawer`
  - Three tabs: `Dari Library`, `Custom`, `Copy Periode Sebelumnya`.
- `LibraryKpiPicker`
  - Autocomplete after 2 characters, max 10 suggestions, `Lihat Semua di Kamus KPI`, locked attributes, dictionary link.
- `CustomKpiForm`
  - Title, description, KPI type fixed to Unit, BSC perspective, target unit, polarity, monitoring period, target type, target value, optional formula, evidence required.
- `CopyPreviousKpiPicker`
  - Previous-period list that creates an `ALLOCATED` copy.
- `KpiTargetEditor`
  - Fixed, progressive Q1-Q4, and semester/year variants with validation.
- `KpiWeightEditor`
  - Bobot Item, Bobot Jenis contribution, PI contribution, min `5%` validation.
- `SubmitPlanningDialog`
  - Summary of valid/invalid state and confirmation that all items move to `WAITING_FOR_APPROVAL`.

### Monitoring Components

- `CheckInScheduleStrip`
  - Q1/Q2/Q3/Year-End status as `UPCOMING`, `OPEN`, `CLOSED`, `OVERDUE`, with countdown and extension affordance.
- `MonitoringWorklist`
  - KPI Unit items requiring current-period draft/submission; KPI Bersama shown as admin-owned/read-only.
- `RealizationDrawer`
  - Target, actual value, live achievement percentage, polarity hint, notes, save draft, submit.
- `EvidenceManager`
  - File and link evidence list with type/name/date, required-evidence blocking, max 10MB copy, and remove action.
- `ExtensionRequestDialog`
  - Reason max 500 characters, requested days, pending state, approved new deadline, rejected original deadline.
- `ProgressNotesTimeline`
  - Historical notes and autosave indicator.

### Score Components

- `ScoreBreakdownTable`
  - DIP-required table: actual, target, achievement %, PI, weight, weighted score, cap, status.
- `KpiSubtotalRow`
  - KPI Bersama subtotal and KPI Unit subtotal.
- `FinalRatingPanel`
  - Final PI `3.955`, rating `Excellent`, formula explanation, Atasan feedback.

## Domain Model Changes

Extend `packages/performance/src/lib/performance/types.ts` and fixtures to avoid hardcoded UI-only data:

- Add `kpiCode`, `description`, `bscPerspective`, `dictionaryItemId`, `evidenceRequired`, `categoryBasedScoring`, `parentKpiId`, `cascadeType`, `cascadedFromEmployeeNumber`, `copiedFromYear`, and `isReadOnly` fields to KPI items or a related detail object.
- Add structured target data: fixed target, quarterly targets, semester targets, annual target.
- Add dictionary items with locked attributes and similarity metadata.
- Add planning portfolio status: draft, valid, invalid, submitted, waiting approval, clarification requested, approved, closed.
- Add check-in schedule data with period windows and status.
- Add actions for add-from-library, add-custom, copy-previous, update target, update weight, submit planning, save draft realization, submit realization, add/remove evidence, and request extension.
- Keep the 40/60 Madya policy and min `5%` item weight as shared validation rules, not UI-only calculations.

## Milestones

### Milestone 1: Spec Lock and v2 Shell

Create the new My KPI redesign component folder and route without replacing the old My KPI route. The new screen loads real DIP fixture data from the shared domain provider and renders the workspace header, phase tabs, and empty component slots.

Expected files:

- `packages/performance/src/components/performance/my-kpi-redesign/MyKpiWorkspace.tsx`
- `packages/performance/src/components/performance/my-kpi-redesign/components/*`
- `apps/rinjani/src/performance-pages.tsx`
- `apps/rinjani/src/routes.tsx`

Validation:

- Visiting the new route loads without provider errors.
- The header shows Binavia, 2026, Dimas, and `KPI Bersama 40% / KPI Unit 60%`.

### Milestone 2: Planning Portfolio

Build the Rencana KPI workspace with Table/List/Hierarchy view modes, KPI Bersama read-only state, KPI Unit editable state, status/source/polarity/cap badges, and the validation rail.

Validation:

- Switching Table/List/Hierarchy changes the portfolio presentation without losing state.
- Weight totals show `40%` KPI Bersama and `60%` KPI Unit.
- A KPI Unit item under `5%` or invalid total disables submit and explains why.

### Milestone 3: KPI Creation and Editing

Build the Add KPI and KPI Detail drawers. Support Library autocomplete, Custom form, Copy Previous, target editor, weight editor, locked dictionary attributes, and cascaded KPI metadata.

Validation:

- Searching at least 2 characters in Library returns suggestions and locked attributes.
- Custom KPI can be drafted with required fields.
- Copy Previous creates an `ALLOCATED` item.
- Editing a cascaded item target moves it from `ALLOCATED` to `DRAFT` while keeping cascade metadata.

### Milestone 4: Planning Submission

Wire submit readiness to domain validation. Add confirmation dialog and submitted read-only state.

Validation:

- Submit is blocked if any KPI Unit is invalid, any item weight is below `5%`, total KPI Unit weight is not `60%`, or required cascaded targets are not set.
- Valid submission moves relevant items to `WAITING_FOR_APPROVAL`.
- The portfolio becomes read-only after submission.

### Milestone 5: Monitoring Check-In

Build check-in schedule, current-period worklist, realization drawer, evidence manager, notes timeline, and extension request dialog.

Validation:

- Q1 verified and Q2 draft samples appear from DIP 2.
- Actual input shows live achievement percentage and polarity guidance.
- Required evidence blocks submit until evidence exists.
- Extension request creates a `PENDING` request and shows it in the schedule.

### Milestone 6: Score Breakdown and Polish

Build the final score table and polish the workspace with terminology, empty states, disabled states, overflow checks, and responsive behavior.

Validation:

- Score table shows item rows, subtotal rows, final PI `3.955`, rating `Excellent`, and cap indicators.
- Copy uses DIP terminology consistently.
- The v2 route is visually reviewed in browser and can replace `#/performance/my-kpi` if accepted.

## Validation

Automated:

- Run `& 'C:\Program Files\nodejs\npm.cmd' run build` from the repository root.
- Run `git diff --check`.

Manual browser verification:

- Open the new v2 My KPI route.
- Verify the route has no provider or runtime errors.
- Verify Table/List/Hierarchy planning modes.
- Verify Library, Custom, and Copy Previous creation flows.
- Verify target and weight validation with min `5%` and 40/60 policy.
- Verify submit blocked and submit success states.
- Verify Check-in realization, evidence, notes, and extension request flows.
- Verify Year-End score breakdown.
- Verify mobile-ish and desktop widths do not overflow key text or buttons.

## Progress

- [x] Read DIP 1 My KPI Planning / Goal Setting.
- [x] Read DIP 2 My KPI Monitoring / Check-in.
- [x] Reviewed the prior My KPI gap review.
- [x] Confirmed the active app uses `apps/rinjani/src/routes.tsx` and `apps/rinjani/src/performance-pages.tsx`.
- [x] Confirmed current My KPI implementation is six legacy screens under `packages/performance/src/components/performance/my-kpi`.
- [x] Confirmed shared UI components are available for tabs, sheets, dialogs, tables, forms, and toast.
- [ ] Implement Milestone 1 v2 shell and route.
- [ ] Implement Milestone 2 planning portfolio.
- [ ] Implement Milestone 3 creation/editing drawers.
- [ ] Implement Milestone 4 planning submission.
- [ ] Implement Milestone 5 monitoring check-in.
- [ ] Implement Milestone 6 score breakdown and polish.

## Surprises & Discoveries

- The local `rg` command failed with `Access is denied`, so repo discovery used PowerShell commands instead.
- The active local app route is the Rinjani app shell under `apps/rinjani`, not the standalone package shell under `packages/performance/src/App.tsx`.
- The old My KPI screens are phase-specific and mostly static. They are a poor fit for the DIP-required single portfolio workspace with three view modes and drawer-based creation/editing flows.
- There is no repository-local `PLANS.md` found under the project root, so the global `C:\Users\PC\.codex\PLANS.md` ExecPlan rules apply.

## Decision Log

- Decision: Build a new My KPI v2 workspace instead of reshaping the legacy screens in place.
  Rationale: The legacy screens are useful references but do not match the DIP interaction model. A v2 route lets us iterate without breaking the existing demo.
  Date/Author: 2026-04-07 / Codex

- Decision: Keep the old My KPI routes available until the v2 workspace passes visual and workflow verification.
  Rationale: The user is not yet confident the prototype is complete, so replacing the current route before verification would increase risk.
  Date/Author: 2026-04-07 / Codex

- Decision: Extend the shared performance domain layer rather than create component-local mock data.
  Rationale: My KPI must eventually connect to My Team and governance workflows; a new local mock path would repeat the earlier static-prototype problem.
  Date/Author: 2026-04-07 / Codex

## Outcomes & Retrospective

Planning checkpoint, 2026-04-07:

- The My KPI redesign is now scoped as a fresh v2 workspace with concrete screens, components, data model additions, milestones, and validation checks.
- No v2 code has been implemented yet in this plan checkpoint.
- The next implementation step is Milestone 1: create the v2 shell and route, then verify it loads in the active Rinjani app.
