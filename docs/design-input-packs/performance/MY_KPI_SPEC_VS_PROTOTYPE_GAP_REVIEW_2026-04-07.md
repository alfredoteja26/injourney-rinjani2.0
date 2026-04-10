# My KPI Spec vs Prototype Gap Review

Date: 2026-04-07  
Scope: My KPI planning and monitoring prototype vs DIP 1 and DIP 2.

## Sources Reviewed

- `docs/design-input-packs/performance/exports/dip-1-my-kpi-planning-goal-setting-v0.1.md`
- `docs/design-input-packs/performance/exports/dip-2-my-kpi-monitoring-check-in-v0.1.md`
- `apps/rinjani/src/performance-pages.tsx`
- `packages/performance/src/components/performance/my-kpi/MyKPIDashboard.tsx`
- `packages/performance/src/components/performance/my-kpi/PlanningDashboard.tsx`
- `packages/performance/src/components/performance/my-kpi/GoalSettingForm.tsx`
- `packages/performance/src/components/performance/my-kpi/CheckInForm.tsx`
- `packages/performance/src/components/performance/my-kpi/EvaluationDashboard.tsx`
- `packages/performance/src/components/performance/my-kpi/YearEndAssessment.tsx`
- `packages/performance/src/components/performance/data.ts`
- `packages/performance/src/lib/performance/*`

## Executive Summary

My KPI is present as a high-fidelity prototype, but it is not yet a meticulous DIP-complete prototype. It covers the broad phases and several visual surfaces: portfolio dashboard, planning dashboard, goal form, check-in form, evaluation dashboard, and year-end self assessment. The Prototype++ layer now adds shared state, 40/60 Madya policy, persona switching, workflow actions, and audit trail visibility.

The largest gaps are still in the actual My KPI screen design and form behavior. Key DIP requirements are currently represented as a workflow panel or static mock content rather than embedded, screen-native interactions. The biggest missing areas are portfolio view modes, library/custom/copy creation paths, real-time validation UX, locked dictionary attributes, progressive target editing, realization status/history, extension requests, and score breakdown details.

## Immediate Runtime Finding

- The active local route `#/performance/my-kpi` uses `apps/rinjani/src/performance-pages.tsx`, not the standalone `packages/performance/src/App.tsx` shell. The first Prototype++ provider was only added to the standalone shell, causing `usePerformancePrototype must be used inside PerformancePrototypeProvider`.
- Fix applied: `PageWrap` in `apps/rinjani/src/performance-pages.tsx` now wraps all Performance routes with `PerformancePrototypeProvider` and renders `PrototypePersonaBar`.

## Coverage Matrix

| DIP Requirement | Prototype Coverage | Gap / Risk | Priority |
|---|---:|---|---:|
| US-MK-001: KPI portfolio in one page | Partial | Dashboard shows KPI Bersama and KPI Unit sections, but not the required Table/List/Hierarchy view modes. Item cards do not consistently show source badge, polarity indicator, dual weight, PI contribution, empty/partial/submitted read-only states, or footer running totals in the native screen. | P0 |
| KPI Bersama read-only distinction | Partial | Planning view overlays read-only behavior; dashboard list still looks like normal KPI cards. Needs stronger locked/read-only visual language and copy. | P1 |
| 40/60 Madya Struktural weight policy | Mostly covered | Static summary data and Prototype++ state now use 40/60; Check-In and Year-End labels were corrected. Need full sweep in any remaining screenshots/mock specs and scoring formulas. | P0 |
| US-MK-002: Draft KPI from Library | Weak | KPI Library exists as a separate module, but My KPI goal-setting form does not have autocomplete, max 10 suggestions, "Lihat Semua di Kamus KPI", locked attribute indicators, dictionary item linkage, or native save-as-DRAFT behavior. | P0 |
| US-MK-003: Draft custom KPI | Partial | Goal form has basic title/description/weight/target/polarity/period/formula/evidence fields. Missing bscPerspective, targetType, evidenceRequired toggle, "search Library first" prompt, and explicit `source = CUSTOM` state. | P0 |
| US-MK-004: Copy KPI from previous period | Missing | No "Copy dari Periode Sebelumnya" entry point or previous-period selection list. No ALLOCATED copy state. | P1 |
| US-MK-005: Receive cascaded KPI | Partial | Planning screen shows a cascaded-from-Atasan banner and a parent KPI block in the form. Missing item-level ALLOCATED -> DRAFT transition when target is edited, cascade metadata, and clear handling for Path B WAITING_REVIEW responses. | P0 |
| US-MK-006: Set target | Partial | Goal form has one target field, but no target type selection for fixed/progressive/quarterly, no Q1-Q4/S1-S2 target editor, and no per-period target model display. | P0 |
| US-MK-007: Assign weight and validate | Partial | Prototype++ panel calculates 40/60 totals. Native planning form does not validate weight as the user types, block invalid submit in-screen, show min 5% item rule, or show "Bobot Item / Bobot Jenis / Kontribusi ke PI" per item. | P0 |
| US-MK-008: Submit planning | Partial | Prototype++ action updates shared mock status. Native submit button still navigates away and does not show a full blocked/submittable/submitted read-only state, manager destination, or item-level WAITING_FOR_APPROVAL state in the actual KPI list. | P0 |
| Planning phase closed behavior | Missing | No "Periode Planning Ditutup" banner or mutation blocking state. | P1 |
| KPI change request outside planning | Missing | No change request form, justification requirement, or PENDING -> APPROVED/REJECTED/REVISION_REQUESTED flow inside My KPI. | P2 |
| US-MK-009: Input realisasi | Partial | Check-In form supports input and notes. Missing live achievement % calculation, negative polarity hint, progressive-current-quarter target, save draft vs submitted state, rejected re-edit state, and read-only submitted state. | P0 |
| US-MK-010: Upload evidence | Partial | Upload area and one sample evidence chip exist. Missing file/link dual mode, multiple evidence management, upload date/type metadata, delete evidence, evidence-required blocking, and max size messaging enforcement beyond copy. | P0 |
| US-MK-011: Progress notes | Partial | Notes textarea exists. Missing auto-save draft behavior and persisted status feedback. | P1 |
| US-MK-012: Check-in schedule and status | Partial | Dashboard timeline exists. Missing calendar/window detail, open/closed/overdue statuses, extension request entry point, and per-period status from normalized schedule data. | P1 |
| US-MK-013: Score breakdown | Weak | Evaluation and year-end screens show summary scores and self assessment. Missing DIP-required score table per item with achievement %, PI, weight, weighted score, cap indicator, subtotal rows, final achievement %, and color-coded rating label. | P0 |
| US-MK-014: Request extension | Missing | Prototype++ fixture contains an extension request, but no My KPI UI form for reason, requested days, PENDING status, request tracking, or approved new deadline display. | P0 |
| Terminology | Partial | Some DIP terms are used. Remaining English/prototype terms include "Goal Setting", "Actual", "Upload Evidence", "Self Assessment", and "Achievement Summary". Need deliberate Indonesian/domain copy pass: "Rencana KPI", "Realisasi", "Bukti/Evidence", "Perpanjangan", "Atasan Langsung". | P1 |

## Recommended My KPI Redesign Checklist

- [ ] Replace the My KPI dashboard with a planning/monitoring mode that supports Table, List, and Hierarchy portfolio views.
- [ ] Add a native portfolio footer showing KPI Bersama total, KPI Unit total, validity, min 5% rule, and submit readiness.
- [ ] Update KPI cards/rows to show title, KPI type, Bobot Item, Bobot Jenis, PI contribution, target, status, source, polarity, cap, and read-only/locked state.
- [ ] Build the Add KPI flow with three tabs/actions: From Library, Custom, Copy from Previous.
- [ ] Build Library autocomplete inside My KPI with locked attributes and dictionary linkage.
- [ ] Expand the custom KPI form to include bscPerspective, target unit, polarity, monitoring period, target type, optional formula, and evidenceRequired.
- [ ] Add fixed/progressive/quarterly target editors with Q1-Q4 and S1-S2 variants.
- [ ] Implement native submit blocking for invalid weights, ALLOCATED without target, and closed planning phase.
- [ ] Add submitted read-only state and WAITING_FOR_APPROVAL/PENDING_CLARIFICATION item statuses.
- [ ] Add realization form states: DRAFT, SUBMITTED, VERIFIED, REJECTED, ADJUSTED.
- [ ] Add live achievement calculation and negative polarity guidance.
- [ ] Add evidence management for file and link evidence, including required-evidence blocking.
- [ ] Add extension request form and request status tracking in the check-in calendar/timeline.
- [ ] Add realization history tab per KPI with period, actual, target, achievement %, status, and evidence count.
- [ ] Add year-end score breakdown table with item rows, subtotal rows, final PI, final achievement %, rating label, cap-applied indicators.
- [ ] Run copy/terminology pass to align with DIP terms.

## Product Recommendation

Do not treat My KPI as "done" yet. Treat it as a scaffold with a working prototype shell and some useful component pieces. The next high-value design/implementation pass should focus entirely on making My KPI DIP-complete before moving deeper into the other modules, because My KPI is the employee-facing core workflow and will expose whether the shared domain model is correct.
