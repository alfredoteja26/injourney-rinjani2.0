# My KPI Stitch Iteration 1 - Coverage vs Gap Note

**Status (2026-04-09):** Iterasi HTML/Stitch ini adalah arsip. Implementasi terkini My KPI mengacu pada `packages/performance-v2` dan [my-kpi-comprehensive-dip-plan.md](../../../plans/my-kpi-comprehensive-dip-plan.md) (Path B, change request, read-only submit, monitoring polish).

## Artifacts

- Screenshot: `.stitch/designs/my-kpi-iteration1-polished.png`
- HTML export: `.stitch/designs/my-kpi-iteration1-polished.html`
- Stitch project: `projects/4201029456809424526`
- Final polished screen id: `6f3569cd5c0240b8a1e676a1c379a350`

## Covered in Iteration 1

- Planning-first single screen for **My KPI / Rencana KPI 2026** in Bahasa Indonesia.
- Header context for persona + period + planning state (`PRD-2026`, `OPEN`).
- Portfolio control strip includes `Tabel`, `Daftar`, `Hierarki`, search, and status filter.
- Explicit 40/60 validation block:
  - KPI Bersama target/current/valid.
  - KPI Unit target/current/valid.
  - Submit readiness helper for formula-band compliance.
- KPI portfolio grouping:
  - KPI Bersama rendered as stronger read-only section (admin-owned context).
  - KPI Unit rendered as editable planning context.
- Item-level semantics shown per row:
  - status badge, source badge, polarity guidance, target, Bobot Item, Bobot Jenis, Kontribusi ke PI.
- Footer helper clarifies blocking rule for submit when allocations/targets are incomplete.

## Remaining Gaps for Next Iteration

- Add KPI creation entry flow is not implemented in-screen yet:
  - From Library (autocomplete + lock attributes),
  - Custom KPI form,
  - Copy dari Periode Sebelumnya.
- No in-screen target editor for fixed/progressive period details (Q1-Q4 or S1-S2 editing controls).
- No submit confirmation dialog state and no explicit transition mock for `WAITING_FOR_APPROVAL`.
- No full state variants for blocked/partially-valid/submitted read-only snapshots.
- Monitoring-specific DIP-2 elements are intentionally out of scope in this iteration.

## Recommendation for Iteration 2

Focus on **Add KPI flow** (Library + Custom + Copy Previous) as the next screen set, because it closes the largest planning P0 gaps while preserving this screen as the planning summary anchor.