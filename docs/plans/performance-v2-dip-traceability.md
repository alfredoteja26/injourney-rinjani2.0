# Performance 2.0 — DIP traceability


| DIP / area                  | Primary route(s)                                                                       | Components / modules                                                                                                                              | Fixture keys                                                                                                        |
| --------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| DIP-1 My KPI planning       | `/performance-v2/my-kpi`, `/performance-v2/my-kpi/planning`                            | `MyKpiDashboardScreen`, `MyKpiChangeRequestsPanel`, `MyKpiPlanningScreen` (Path B `WAITING_REVIEW`, submit read-only guards, `KpiPortfolioPanel`) | `KPI-B-*`, `KPI-U-*` (termasuk `KPI-U-002` `WAITING_REVIEW`), `PRD-2026`, `DIC-042`, `DIC-078`, `kpiChangeRequests` |
| DIP-2 Monitoring & year-end | `/performance-v2/my-kpi/check-in`, `/performance-v2/my-kpi/year-end`                   | `MyKpiCheckInScreen`, `MyKpiYearEndScreen`, `MyKpiChangeRequestsPanel`, `MyKpiPhaseMatrix` (countdown OPEN)                                       | `REA-001`…`REA-003`, `portfolioScores[]`, `checkInSchedules`                                                        |
| DIP-3 My Team planning      | `/performance-v2/my-team-kpi/planning`, `/performance-v2/my-team-kpi/member/:memberId` | `MyTeamPlanningScreen`, `MemberPortfolioScreen`                                                                                                   | `teamPlanningStatuses`, `260101`…`260104`, `KPI-VP-*`                                                               |
| DIP-4 My Team monitoring    | `/performance-v2/my-team-kpi/monitoring`                                               | `MyTeamMonitoringScreen`                                                                                                                          | (antrian verifikasi — simulasi audit)                                                                               |
| DIP-5 KPI Library           | `/performance-v2/kpi-library`, `…/submit`, `…/:kpiId`                                  | `KpiLibraryScreen`, `KpiLibrarySubmitScreen`, `KpiLibraryDetailScreen`                                                                            | `DIC-001`, `DIC-042`, `DIC-078`, `DIC-103`, `DIC-150`, `DIC-099`, `DIC-201`, `DIC-202`                              |
| DIP-6 KPI Tree              | `/performance-v2/kpi-tree`                                                             | `KpiTreeScreen`                                                                                                                                   | `alignmentWarnings`, `bulkUploadJobs`, hierarki org teks                                                            |
| DIP-7 KPI HQ                | `/performance-v2/kpi-headquarter`                                                      | `KpiHqScreen`                                                                                                                                     | `bandFormulas`, `kpiRuleConfig`, `hqAdjustments`, `cohorts`                                                         |


## HR mapping (Talent)

- DIP `employeeNumber` ↔ Talent `nik` (string), lihat `packages/performance-v2/src/lib/hr/dip-map.ts` dan `talent-master.ts` (`employee_id` stabil per contoh).

## Smoke checklist (build / manual)

1. **My KPI (landing Stitch)**: buka `/performance-v2/my-kpi` — kartu ringkas karyawan + tiga kartu bobot + grid status + portofolio detail (cari/filter) + footer aksi.
2. **Planning**: `/performance-v2/my-kpi/planning` — kartu bobot VALID + kamus + panel landing (slider bobot) + bar ajukan.
3. **Check-in**: `/performance-v2/my-kpi/check-in` — jadwal Q1/Q2 + countdown tenggat OPEN + mini-chart progresif + autosave catatan ±2s + permohonan perubahan KPI.
4. **Year-end**: NIK 260102 atau 260103 — `portfolioScores`; rumus US-MK-013 + umpan balik atasan (jika ada di fixture).
5. **My Team**: sebagai Admin (NIK 260101) — tiga kartu bawahan; approve Binavia jika bobot valid.

5b. **Portofolio anggota**: buka `/performance-v2/my-team-kpi/member/260102` — shell harus tetap di platform Performance 2.0 dengan modul **My Team KPI** ter-highlight (bukan Portal).
6. **Library**: tab Katalog + Antrian; detail `DIC-042`; publish demo untuk `VALIDATED` sebagai Admin.
7. **Tree / HQ**: peringatan alignment + formula band + ADJ-001.
8. **HQ route**: hanya `Admin` — `/performance-v2/kpi-headquarter`.