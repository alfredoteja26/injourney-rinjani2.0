# Rinjani Performance: DIP-to-Product Gap Review

Date: 2026-04-07  
Scope: 7 Notion DIPs (Performance) vs current `packages/performance` implementation vs existing section specs/prototype docs.

## Sources reviewed
- DIP exports in `docs/design-input-packs/performance/exports/`
- Current app wiring and module routing in `packages/performance/src/App.tsx`
- Current module implementation in `packages/performance/src/components/performance/**`
- Existing section specs in `packages/performance/src/specifications/Rinjani_Performance_(INJ-BPR)/`

## Executive summary
- Navigation-level module coverage exists for all major areas (My KPI, My Team KPI, Library, Tree, HQ).
- Functional coverage is mostly prototype/demo state with static mock data and local UI flows.
- Largest gaps are governance workflows (approval queues, SLA/audit, batch operations), lifecycle integrity (state machines and validations), and HQ-grade configuration depth.
- There are requirement inconsistencies between new DIP documents and current prototype specs, especially weight formulas and policy assumptions.

## Export status
- 7 DIP files exported into `docs/design-input-packs/performance/exports/`.
- Notion links are embedded per file for traceability.

## Documentation quality review (DIP content)
### Formatting observations
- Overall sectioning is consistent and follows DIP structure (0..9).
- Terminology blocks are strong and actionable.
- Most datasets are realistic, but some sections are dense enough to benefit from normalized enums/tables in future revisions.

### Content consistency risks
1. Weight formula conflict:
   - DIP planning references often assume 40/60 for Struktural (including Madya in several places).
   - Existing section spec and current prototype data still use Madya 45/55.
2. Governance ownership boundaries vary:
   - Some DIP parts place capping/override responsibilities in different modules (HQ vs Tree vs Dictionary governance).
3. Policy defaults differ between specs:
   - Auto-approve timeout, extension behavior, and evidence rules differ by document and are not yet consolidated into a single source-of-truth policy table.

## Comprehensive gap matrix
### DIP 1 (My KPI Planning & Goal Setting)
- Current state: Partially represented UI flow exists (`MyKPIDashboard`, `PlanningDashboard`, `GoalSettingForm`) but primarily mock-driven.
- Major gaps:
  - No persisted state machine for DRAFT/ALLOCATED/WAITING_FOR_APPROVAL/APPROVED paths.
  - No enforceable weight-rule engine connected to role/band policy.
  - No manager review roundtrip or revision history model.
  - No real library linkage (locked attributes/dictionary references).

### DIP 2 (My KPI Monitoring & Check-In)
- Current state: Check-in and year-end views exist visually.
- Major gaps:
  - Realization submissions, evidence lifecycle, and approval states are not backed by workflow/state services.
  - Extension request lifecycle and SLA handling are not implemented.
  - Year-end score breakdown is not calculation-driven from normalized realization records.
  - Late/timeout policy behavior is not operational.

### DIP 3 (My Team KPI Planning Approval & Cascading)
- Current state: Team planning dashboard and cascade view are present.
- Major gaps:
  - No robust approval queue/workflow actions (approve with adjustment, clarify, reject with policy checks).
  - Cascading rule enforcement (direct/indirect constraints, accumulation compatibility, child unit constraints) is incomplete.
  - Batch approval constraints and per-subordinate validation are not production-grade.
  - No audit trail for manager decisions.

### DIP 4 (My Team KPI Monitoring Dashboard & Verification)
- Current state: Team monitoring and member detail surfaces exist.
- Major gaps:
  - No submission queue with SLA aging and action-level tracking.
  - No evidence verification workflow with adjusted-value audit recording.
  - Auto-approve timeout and pre-timeout alerts are not implemented.
  - Year-end assessment comparative workflow is limited.

### DIP 5 (KPI Library)
- Current state: Browse/search/detail/submit UI exists.
- Major gaps:
  - No validation queue and approval queue workflow with role-segmented actions.
  - No governance operations (publish, reject, send-back, deprecate with impact control).
  - No analytics dashboard from usage/approval telemetry.
  - Submission form triggers local alert rather than integrated request lifecycle.

### DIP 6 (KPI Tree)
- Current state: Tree visualization and node detail are present from static hierarchy data.
- Major gaps:
  - Missing org-tree + hierarchy dual-mode governance depth.
  - No admin operations for KPI Bersama assignment, cap configuration, dictionary link/unlink with audit logging.
  - No bulk upload dry-run/import pipeline.
  - No alignment warning engine and drilldown workflow.

### DIP 7 (KPI Headquarter)
- Current state: HQ dashboard with Weight Config and Schedule Config entry points exists.
- Major gaps:
  - Missing broad HQ controls (cohorts, thresholds simulation, tier management, force finalize, year close, mutation policy, overrides, full audit center).
  - Current dashboard uses summary widgets but lacks policy lifecycle controls and governed approvals.
  - Cross-company monitoring and report builder depth is not yet implemented.

## Prototype-to-product drift
- Existing in-repo specs model richer governance than current implementation in several areas, but new DIPs further expand scope.
- Current codebase is primarily UI prototype behavior with static datasets (`components/performance/data.ts`).
- New DIPs should be treated as target-state requirement baseline; existing section specs need reconciliation into a single canonical policy set before backend/state implementation.

## High-priority gaps (P0)
1. Canonical policy alignment:
   - Finalize one source for band weights, check-in policy, approval SLA, cap defaults, and exception rules.
2. Shared workflow engine:
   - Standard state machine for planning, monitoring, verification, and adjustment requests.
3. Governance trails:
   - Mandatory audit log patterns for approve/reject/adjust, cap changes, bulk ops, and HQ config.
4. Library and HQ operational readiness:
   - Validation/approval queues and HQ control center must move from demo UI to role-enforced workflows.

## Recommended implementation sequence
1. Resolve requirements contradictions (DIP vs legacy section specs) into one canonical policy document.
2. Implement core domain state model + workflow services (planning/monitoring/approval).
3. Integrate My KPI + My Team KPI with real workflow APIs and audit events.
4. Implement KPI Library governance queues and publish/deprecate lifecycle.
5. Implement KPI Tree admin operations + alignment warnings + bulk upload.
6. Expand KPI Headquarter into full policy/configuration governance center.

## Key evidence references
- App module routing: `packages/performance/src/App.tsx`
- Static prototype data and policy mismatch signals: `packages/performance/src/components/performance/data.ts`
- My KPI prototype flow: `packages/performance/src/components/performance/my-kpi/MyKPIDashboard.tsx`
- Team planning/monitoring prototypes: `packages/performance/src/components/performance/my-team-kpi/`
- Library prototype scope: `packages/performance/src/components/performance/kpi-library/`
- Tree prototype scope: `packages/performance/src/components/performance/kpi-tree/KPITreeView.tsx`
- HQ prototype scope: `packages/performance/src/components/performance/kpi-headquarter/HQDashboard.tsx`
