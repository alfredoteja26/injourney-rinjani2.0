# Rinjani Performance Prototype++ DIP Implementation

This ExecPlan is a living document. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` up to date as work proceeds.

## Purpose / Big Picture

The Performance module already has a high-fidelity React prototype, but the exported Performance Design Input Packs describe deeper workflows than the current static screens. After this change, a product reviewer can walk one connected prototype story across Karyawan, Atasan, HC Admin, and HC Admin HO personas: submit a KPI plan, review and verify it, submit and govern KPI Library items, inspect tree alignment, and see HQ policy and audit controls.

This is not a production backend implementation. It is a Prototype++ pass with typed in-memory state and workflow actions that make the UI behavior consistent and easier to replace with APIs later.

## Context and Orientation

Primary source material:

- `docs/design-input-packs/performance/exports/dip-1-my-kpi-planning-goal-setting-v0.1.md`
- `docs/design-input-packs/performance/exports/dip-2-my-kpi-monitoring-check-in-v0.1.md`
- `docs/design-input-packs/performance/exports/dip-3-my-team-kpi-planning-approval-cascading-v0.1.md`
- `docs/design-input-packs/performance/exports/dip-4-my-team-kpi-monitoring-dashboard-verification-v0.1.md`
- `docs/design-input-packs/performance/exports/dip-5-kpi-library-v0.1.md`
- `docs/design-input-packs/performance/exports/dip-6-kpi-tree-v0.1.md`
- `docs/design-input-packs/performance/exports/dip-7-kpi-headquarter-v0.1.md`
- `docs/design-input-packs/performance/GAP_REVIEW_2026-04-07.md`

Current implementation entry points:

- `packages/performance/src/App.tsx` mounts the Performance shell and switches between five modules.
- `packages/performance/src/components/performance/data.ts` contains the older static mock data, including the now-superseded Madya 45/55 weight split.
- `packages/performance/src/components/performance/**` contains existing page-level prototype screens.

Canonical policy decisions for this pass:

- The seven new DIP exports win over older section specs and current prototype data.
- Madya Struktural uses KPI Bersama 40% and KPI Unit 60%.
- Use typed in-memory state services and fixtures, not Supabase tables.
- Use Google Stitch only if a complex screen needs alternative visual exploration.

## Scope and Approach

Add a shared performance domain layer under `packages/performance/src/lib/performance/` with canonical types, fixtures, workflow actions, and a React provider. Keep existing visual screens where possible and layer in small Prototype++ panels and actions so the demo becomes connected without a full page rewrite.

The first implementation pass will favor observable end-to-end behavior over complete production-level CRUD depth. Workflow actions must update shared state and append audit entries, so reviewers can see the state transition chain instead of one-off local alerts.

Out of scope:

- Real database persistence.
- API route contracts.
- New Stitch-generated design variants unless a UI risk appears during implementation.

## Milestones

### Milestone 1: Foundation and ExecPlan

Create this living ExecPlan. Add a shared domain store with personas, canonical policies, KPI items, planning status, verification status, library submissions, tree warnings, HQ requests, and audit log. Wrap the Performance area in the shared provider and expose a persona switcher.

Validation: the app builds, the Performance screens render, and changing persona visibly updates prototype context.

### Milestone 2: Employee and Manager Workflow Spine

Connect My KPI and My Team pages to the shared store. Karyawan can submit planning and realization records; Atasan can approve, clarify, reject, cascade, verify, adjust, and batch-handle valid mock records. UI should show 40/60 validation, late-flag policy, direct-report cascading, and one-level approval behavior.

Validation: a reviewer can move the shared scenario from draft/submitted to approved/verified and see audit entries.

### Milestone 3: Governance Modules

Connect KPI Library, KPI Tree, and KPI Headquarter to the same shared state. Library submissions should run through validate/publish/deprecate states. Tree should show admin operations, lazy two-level policy, create-only bulk upload dry-run, warnings, and export behavior. HQ should show policy/config controls, adjustment SLA, force finalize, year close, scoring calculator, and audit log.

Validation: governance actions update state and create audit entries visible from the prototype panels.

### Milestone 4: Demo Hardening

Align copy with DIP terminology and remove obvious trust-breaking local alerts where the shared workflow can provide better feedback. Run `npm run build` from the repo root and manually walk the end-to-end demo.

Validation: build passes and the manual walkthrough covers Karyawan, Atasan, HC Admin, and HC Admin HO.

## Validation

- Run `npm run build` from `C:\Users\PC\Code Repository\injourney-rinjani2.0`.
- Manually verify:
  - Karyawan submits a KPI plan and sees 40/60 validation.
  - Atasan approves or clarifies the plan and verifies a realization with evidence.
  - Karyawan submits a library KPI request and HC Admin validates/publishes it.
  - KPI Tree displays alignment warnings, admin operation policy, and export behavior.
  - HC Admin HO reviews policy, scoring calculator, SLA requests, force finalize, year close, and audit entries.

## Progress

- Read imported DIP files and gap review.
- Confirm current prototype structure under `packages/performance`.
- Resolve canonical policy and Prototype++ implementation decisions.
- Create this ExecPlan.
- Add shared domain layer and provider.
- Wire shared state into Performance screens.
- Run build verification.
- Complete browser-based manual visual walkthrough.

## Surprises & Discoveries

- `rg` was unavailable in the sandbox with an access-denied error during planning, so PowerShell-native `Get-ChildItem` and `Select-String` were used for repo inspection.
- The existing `packages/performance/src/plan.md` marks the older prototype as complete; this pass is a new DIP-driven enhancement rather than a continuation of that completed plan.
- Plain `npm run build` resolves to a broken `C:\Users\PC\AppData\Roaming\npm\node_modules\npm\bin\npm-cli.js` path in this shell. Running the installed Node.js npm command directly works.

## Decision Log

- Decision: Treat the seven exported DIPs as canonical and update the Madya Struktural split to 40/60.
Rationale: The user selected the new DIPs as the policy source, and the gap review identifies 45/55 as legacy drift.
Date/Author: 2026-04-07 / Codex
- Decision: Implement typed in-memory mock services rather than Supabase-ready persistence.
Rationale: The requested target is Prototype++, and the goal is to demonstrate workflow coherence before backend design.
Date/Author: 2026-04-07 / Codex
- Decision: Use a persona switcher instead of separate routes for role behavior.
Rationale: It gives product reviewers a faster way to validate Karyawan, Atasan, HC Admin, and HC Admin HO affordances inside the current prototype shell.
Date/Author: 2026-04-07 / Codex

## Outcomes & Retrospective

Implemented the first Prototype++ pass: shared domain fixtures, typed mock workflow actions, persona switching, module workflow panels, canonical 40/60 Madya policy, and audit trail visibility. Build verification passed with `& 'C:\Program Files\nodejs\npm.cmd' run build`. A full browser-based visual walkthrough remains the main follow-up check.