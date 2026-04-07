# Design Input Pack: Rinjani Performance - KPI Headquarter

**Version:** 0.1  **Date:** 2026-04-07  **Owner:** Teja (Product Manager)

---

## 0. Instruction to prototyping tool

- Generate UI structure, components, and visual style using your best judgment and integrated design-system context.
- You MUST reflect the user stories, personas, domain entities, states, and acceptance criteria in this document.
- Use ONLY the reference dataset supplied below for realistic content; align labels and relationships to the domain model.
- Do not invent business metrics, KPIs, uptime/performance statistics, or fabricated company names not present in the sample data.
- Where information is missing, use the literal placeholder `[TBD]` instead of guessing.
- Language: UI labels in **Bahasa Indonesia**; technical identifiers in English.

---

## 1. Product intent

- **Problem:** HC Admin HO membutuhkan satu pusat konfigurasi global untuk mengelola seluruh parameter Performance Management System: periode penilaian, bobot KPI per band jabatan, rating scale, cohort definition, company tier, deadline management, adjustment governance, mutation policy, dan audit trail.
- **Target outcome:** Admin HC HO dapat mengkonfigurasi seluruh parameter sistem dari satu dashboard terpadu, memantau progress planning dan monitoring lintas company, mengelola adjustment requests, dan mengaudit seluruh perubahan konfigurasi.
- **MVP scope:** HQ dashboard (planning progress, heatmap, countdown, trend), period management (create/edit/open/close, monitoring schedule, deadline/penalty/extension), weight & rules configuration (per band jabatan/cohort, min/max item & weight, scoring cap global, category-based scoring), rating & calibration config (scale, PI range, fixed vs population-based, cohort definition & management, threshold simulation), company tier management, KPI Bersama management (central definition, bulk assign, target per tier), adjustment & governance (queue, SLA, force finalize, year close), monitoring analytics (coverage, heatmap, distribution, report builder), mutation & special rules (prorata, position correction, minimum duration, indisciplinary override), audit log.
- **Non-goals:** Employee self-service (My KPI), manager approval (My Team KPI), library governance (KPI Library), tree visualization (KPI Tree).

---

## 2. Personas & access

| **Persona** | **Goals** | **Can** | **Cannot** |
| --- | --- | --- | --- |
| **HC Admin HO** (primary, full access) | Mengelola seluruh konfigurasi PMS lintas company | All HQ features: period management, weight config, rating config, cohort management, tier management, KPI Bersama management, deadline config, adjustment queue, force finalize, year close, monitoring analytics, mutation policy, audit log | Input realisasi; approve employee planning; manage KPI Library items (separate module) |
| **HC Admin** (limited, own company scope) | Memantau progress dan mengelola konfigurasi untuk company sendiri | View HQ dashboard (own company); view weight config (read-only); manage adjustment requests (own company); view monitoring analytics (own company); view audit log (own company) | Create/edit periods; change global weight config; manage cohorts; manage tiers; force finalize; year close |

---

## 3. Domain model (semantic)

**Core entities for HQ configuration:**

- **PerformancePeriod:** `id`, `year`, `name`, `phase` (PLANNING|MONITORING|YEAR_END), `status` (DRAFT|OPEN|CLOSED), `planningStartDate`, `planningEndDate`, `monitoringSchedule[]`, `yearEndStartDate`, `yearEndEndDate`, `companyScope` (ALL|specific company IDs[]), `createdBy`, `createdAt`
- **BandKpiFormula:** `id`, `bandJabatan` (Utama|Madya|Muda|Pratama), `jobType` (STRUKTURAL|NON_STRUKTURAL), `kpiBersamaWeight` (%), `kpiUnitWeight` (%), `year`, `effectiveFrom`
- **KpiRuleConfig:** `id`, `year`, `minItemsPerType?`, `maxItemsPerType?`, `minWeightPerItem?`, `maxWeightPerItem?`, `globalCapType` (NO_CAP|CAPPED_100|CAPPED_110|CAPPED_120), `categoryBasedScoringEnabled` (bool)
- **RatingScaleConfig:** `id`, `year`, `scale[]` [{rating: 1, label: "Unsuccessful", piMin: 1.00, piMax: 1.49}, ...], `method` (FIXED_RANGE|POPULATION_BASED)
- **Cohort:** `id`, `name`, `description`, `attributes[]` (e.g. [{key: "bandJabatan", value: "Madya"}, {key: "jobFamily", value: "Finance"}]), `positionCount`, `employeeCount`, `createdBy`, `createdAt`
- **CohortAssignment:** `id`, `cohortId`, `positionMasterVariantId`, `assignmentType` (AUTO|MANUAL_OVERRIDE), `assignedBy?`
- **CohortThresholdConfig:** `id`, `cohortId`, `year`, `medianPI?`, `upperThreshold?`, `lowerThreshold?`, `method` (CALCULATED|MANUAL)
- **CompanyTier:** `id`, `tier` (1|2|3), `companyId`, `companyName`, `characteristics`
- **KpiBersamaCentralItem:** `id`, `kpiItemId`, `tierTargets[]` [{tierId, targetValue}], `year`
- **DeadlineConfig:** `id`, `performancePeriodId`, `phase`, `period?`, `deadlineDate`, `penaltyType` (NONE|LATE_FLAG|AUTO_ZERO), `extensionMaxDays`, `extensionMaxRequests`, `autoApproveTimeoutDays`
- **AdjustmentRequest:** `id`, `requestedBy`, `type` (KPI_CHANGE|WEIGHT_CHANGE|TARGET_CHANGE|ITEM_ADD|ITEM_REMOVE), `kpiItemId?`, `justification`, `oldValue` (json), `newValue` (json), `status` (PENDING|APPROVED|REJECTED|REVISION_REQUESTED), `reviewedBy?`, `reviewNotes?`, `slaDeadline`, `createdAt`, `reviewedAt?`
- **MutationScoringPolicy:** `id`, `year`, `proRataMethod` (WEIGHTED_AVERAGE|LONGEST_DURATION|MINIMUM_DURATION), `minimumDurationMonths`, `cutoffDay` (e.g. 15), `carryOverEnabled` (bool)
- **IndisciplinaryOverride:** `id`, `employeeNumber`, `year`, `overrideType` (EXCLUDE_FROM_POOL|CAP_RATING|CUSTOM), `reason`, `appliedBy`, `createdAt`
- **HqAuditLog:** `id`, `action` (CONFIG_CHANGED|PERIOD_OPENED|PERIOD_CLOSED|FORCE_FINALIZED|YEAR_CLOSED|OVERRIDE_APPLIED|ADJUSTMENT_REVIEWED), `entityType`, `entityId`, `changedBy`, `oldValue` (json), `newValue` (json), `createdAt`

---

## 4. Reference dataset

**Performance Period**

- `PRD-2026` - year: 2026, phase: MONITORING, status: OPEN, planningStart: 2026-01-15, planningEnd: 2026-03-15, companyScope: ALL

**Band KPI Formulas**

- Utama, STRUKTURAL: Bersama 40%, Unit 60%
- Madya, STRUKTURAL: Bersama 40%, Unit 60%
- Muda, STRUKTURAL: Bersama 30%, Unit 70%
- Pratama, STRUKTURAL: Bersama 20%, Unit 80%
- All bands, NON_STRUKTURAL: Bersama 0%, Unit 100%

**KPI Rule Config (2026)**

- minItemsPerType: 3 (per KPI type), maxItemsPerType: null (no limit), minWeightPerItem: 5%, maxWeightPerItem: 40%, globalCapType: CAPPED_110, categoryBasedScoringEnabled: true

**Rating Scale (2026)**

- 1: Unsuccessful (1.00-1.49), 2: Partially Successful (1.50-2.49), 3: Successful (2.50-3.49), 4: Excellent (3.50-4.49), 5: Outstanding (4.50-5.00)
- Method: FIXED_RANGE (with option to switch to POPULATION_BASED)

**Cohorts (sample)**

- `COH-001` - name: "BOD-5 Finance", attributes: [bandJabatan: Madya, jobFamily: Finance], positionCount: 24, employeeCount: 22
- `COH-002` - name: "BOD-5 Operations", attributes: [bandJabatan: Madya, jobFamily: Operations], positionCount: 38, employeeCount: 35
- `COH-003` - name: "BOD-6 General", attributes: [bandJabatan: Muda], positionCount: 120, employeeCount: 115

**Company Tiers**

- Tier 1: InJourney HO, PT AP I (CGK), PT AP I (DPS) - high volume, high visibility
- Tier 2: PT AP I (SUB), PT AP II regional airports - medium volume
- Tier 3: Regional airports, supporting entities - regional/supporting

**KPI Bersama Central Items (2026)**

- "Customer Satisfaction Index": Tier 1 target: 4.5, Tier 2: 4.2, Tier 3: 4.0
- "Revenue Growth": Tier 1 target: 15%, Tier 2: 12%, Tier 3: 8%

**Deadline Config**

- Planning: deadline 2026-03-15, penalty: LATE_FLAG, extensionMaxDays: 14, extensionMaxRequests: 2
- Monitoring Q1: deadline 2026-04-10, penalty: LATE_FLAG, autoApproveTimeoutDays: 5

**Adjustment Requests (pending)**

- `ADJ-001` - type: WEIGHT_CHANGE, requestedBy: 260102 (Binavia), justification: "Project prioritas baru dari Direksi", status: PENDING, slaDeadline: 2026-04-10

**Mutation Policy (2026)**

- proRataMethod: WEIGHTED_AVERAGE, minimumDurationMonths: 3, cutoffDay: 15, carryOverEnabled: true

**HQ Dashboard Metrics**

- Planning progress: 88% positions complete (company-wide)
- Companies: InJourney HO 95%, AP I CGK 92%, AP I DPS 85%, AP I SUB 78%, ITDC 72%
- Pending adjustment requests: 4
- Overdue items: 12

---

## 5. Business processes & flows

### HQ Dashboard

1. HC Admin HO opens KPI Headquarter -> dashboard loads.
2. Dashboard widgets:
    - **Planning Progress:** stacked bar per company (% positions with APPROVED portfolio).
    - **Heatmap:** color-coded matrix (companies x progress brackets).
    - **Countdown:** timer per company showing days until planning deadline.
    - **Trend Line:** daily progress rate.
3. Click any metric -> drill down to filtered company/position list.

### Period Management

1. HC Admin HO creates new assessment period: year, name, planning dates, monitoring schedule, year-end dates, company scope.
2. **Open Planning:** status -> OPEN; employees can start goal setting; notification broadcast.
3. **Close Planning:** status -> CLOSED; all mutations blocked; items APPROVED auto-confirmed; items without approval flagged.
4. **Configure Monitoring Schedule:** set check-in windows per frequency (quarterly, semester, annual) with deadlines.
5. **Deadline Management:** per phase, set deadline date, penalty type (NONE/LATE_FLAG/AUTO_ZERO), extension max days and max requests, auto-approve timeout days.
6. **Extension Request Approval:** review pending requests; approve (new deadline calculated) or reject.

### Weight & Rules Configuration

1. HC Admin HO opens Weight Config -> table: Band Jabatan x KPI Type Weight.
2. Edit weights per band (must sum to 100% per row).
3. Configure rules: min/max items per type, min/max weight per item.
4. Configure global scoring cap default.
5. Toggle category-based scoring availability.
6. Save -> effective for current year; audit log entry created.

### Rating & Calibration Configuration

1. Configure rating scale: edit labels and PI ranges per rating level.
2. Toggle method: FIXED_RANGE vs POPULATION_BASED.
3. **If POPULATION_BASED:** manage cohorts:
    - Create cohort: name, attribute combination (band jabatan, job family, department, etc.).
    - Assign positions to cohort (auto by attributes or manual override).
    - Configure threshold: median, upper, lower (calculated or manual).
    - **Threshold Simulation / Playground:** input hypothetical PI distribution -> see resulting classification per rating label -> adjust thresholds iteratively.
4. Save config -> effective for year-end rating calculation.

### Company Tier Management

1. Define tiers (1/2/3) with characteristics description.
2. Assign companies to tiers.
3. Set KPI Bersama target variation per tier (same KPI, different target values per tier).

### KPI Bersama Management

1. Define central KPI Bersama items (from KPI Library or custom).
2. Set targets per tier/entity.
3. Bulk assign to position variants across companies.
4. Items appear in employees' portfolios as read-only.

### Adjustment & Governance

1. Adjustment request queue: list from employees/managers requesting changes outside planning.
2. Per request: type, requester, justification, old vs new values, SLA deadline.
3. Actions: Approve (auto-apply) | Reject (notes mandatory) | Request Revision.
4. SLA breach monitoring: badge for requests approaching/exceeding SLA.
5. **Force Finalize:** admin force-closes pending items for selected positions/companies.
6. **Year Close:** final close of assessment year; all scores locked; no further changes allowed.

### Monitoring & Analytics

1. Realization coverage per company (% items with submitted realization).
2. Portfolio status heatmap (companies x status brackets).
3. Score distribution charts (histogram by rating label, by company, by band).
4. Report builder: custom filters -> export as Excel/PDF.

### Mutation & Special Rules

1. Configure prorata scoring method: weighted average, longest duration, or minimum duration.
2. Set minimum duration months and cutoff day.
3. Enable/disable carry-over scoring.
4. **Position Correction:** admin handles name changes without substantive role change.
5. **Indisciplinary Override:** apply special treatment (exclude from pool, cap rating) with reason logged.

### Audit Log

1. View all HQ-level changes: config changes, period operations, overrides, adjustment decisions.
2. Per entry: action type, entity, changed by, old/new values, timestamp.
3. Filter by action type, date range, user.
4. Export audit log as Excel.

---

## 6. User stories

### US-HQ-001 - View HQ dashboard

- **Story:** As HC Admin HO, I want to see a system-wide dashboard so I can monitor planning and monitoring progress across all companies.
- **Acceptance criteria:**
    - Planning progress stacked bar per company.
    - Heatmap: companies x progress brackets (color-coded).
    - Countdown timers per company to deadline.
    - Daily progress trend line.
    - Click metric -> drill down.
    - Filter by year, phase.
- **Touches:** PerformancePeriod (read), KpiOwnership (aggregate), Organization (read)

### US-HQ-002 - Manage assessment periods

- **Story:** As HC Admin HO, I want to create and manage assessment periods so the performance cycle is properly scheduled.
- **Acceptance criteria:**
    - Create period: year, name, planning dates, company scope.
    - Open/close planning with confirmation dialog.
    - Configure monitoring schedule (check-in windows per frequency).
    - Period status visible: DRAFT, OPEN, CLOSED.
    - Notification sent on open/close.
- **Touches:** PerformancePeriod (CRUD), CheckInSchedule (CRUD)

### US-HQ-003 - Configure deadline & extension rules

- **Story:** As HC Admin HO, I want to configure deadlines and penalty rules so compliance is enforced.
- **Acceptance criteria:**
    - Per phase/period: set deadline date, penalty type (NONE/LATE_FLAG/AUTO_ZERO).
    - Extension config: max days (e.g. 14), max requests per employee (e.g. 2).
    - Auto-approve timeout: days before auto-verify (e.g. 5 business days).
    - Review and approve/reject extension requests.
- **Touches:** DeadlineConfig (CRUD), ExtensionRequest (read/update)

### US-HQ-004 - Configure weight per band jabatan

- **Story:** As HC Admin HO, I want to configure KPI type weights per band jabatan so the scoring formula is correct per level.
- **Acceptance criteria:**
    - Table: rows = Band Jabatan x Job Type, columns = KPI Bersama %, KPI Unit %, Total.
    - Edit inline; total must = 100% per row (validation).
    - Save -> audit log entry.
    - Effective for current year (historical configs preserved).
- **Touches:** BandKpiFormula (CRUD), HqAuditLog (create)

### US-HQ-005 - Configure item count & weight rules

- **Story:** As HC Admin HO, I want to set min/max rules for KPI items and weights so portfolios are balanced.
- **Acceptance criteria:**
    - Config fields: min items per type, max items per type, min weight per item (%), max weight per item (%).
    - Changes apply to validation rules in My KPI planning.
    - Save -> audit log entry.
- **Touches:** KpiRuleConfig (CRUD), HqAuditLog (create)

### US-HQ-006 - Configure global scoring cap

- **Story:** As HC Admin HO, I want to set a global default scoring cap so achievement limits are consistently applied.
- **Acceptance criteria:**
    - Options: NO_CAP, CAPPED_100, CAPPED_110, CAPPED_120.
    - Note: per-item override possible via KPI Tree (per F-06 delta).
    - Toggle category-based scoring availability.
    - Save -> audit log entry.
- **Touches:** KpiRuleConfig (update), HqAuditLog (create)

### US-HQ-007 - Configure rating scale & PI range

- **Story:** As HC Admin HO, I want to configure the rating scale so PI ranges and labels match organizational policy.
- **Acceptance criteria:**
    - Editable table: Rating (1-5), Label (text), PI Min, PI Max.
    - Ranges must be contiguous (no gaps) and cover 1.00-5.00.
    - Preview: sample PI values showing resulting rating.
    - Save -> audit log entry.
- **Touches:** RatingScaleConfig (CRUD), HqAuditLog (create)

### US-HQ-008 - Toggle fixed vs population-based rating

- **Story:** As HC Admin HO, I want to choose between fixed range and population-based rating so calibration matches our approach.
- **Acceptance criteria:**
    - Toggle: FIXED_RANGE (default) | POPULATION_BASED.
    - If POPULATION_BASED: cohort management section becomes active.
    - Warning: "Mengubah metode rating akan mempengaruhi kalkulasi tahun ini."
    - Save -> audit log entry.
- **Touches:** RatingScaleConfig (update method), HqAuditLog (create)

### US-HQ-009 - Create & manage cohorts

- **Story:** As HC Admin HO, I want to define cohorts based on position attributes so population-based rating has the right comparison groups.
- **Acceptance criteria:**
    - Create cohort: name, description, attribute combination (multi-select: band jabatan, job family, department, region).
    - Auto-assign positions matching attributes; show count.
    - Manual override: admin can add/remove specific positions.
    - View cohort members list with position and incumbent details.
    - Edit/delete cohort (with impact warning if positions assigned).
- **Touches:** Cohort (CRUD), CohortAssignment (CRUD)

### US-HQ-010 - Cohort threshold simulation

- **Story:** As HC Admin HO, I want to simulate cohort thresholds so I can see the impact before finalizing the rating method.
- **Acceptance criteria:**
    - Playground interface: select cohort, input hypothetical PI distribution (or use real data if available).
    - System calculates: median, upper threshold, lower threshold.
    - Visual: distribution chart with threshold lines; count per rating label.
    - Adjust thresholds via slider or input -> recalculate live.
    - Save as config or discard.
- **Touches:** CohortThresholdConfig (CRUD), Cohort (read)

### US-HQ-011 - Manage company tiers

- **Story:** As HC Admin HO, I want to define company tiers so KPI Bersama targets can vary by tier.
- **Acceptance criteria:**
    - Define tiers: Tier 1/2/3 with description.
    - Assign companies to tiers (drag or select).
    - View company list per tier.
- **Touches:** CompanyTier (CRUD)

### US-HQ-012 - Manage KPI Bersama & bulk assign

- **Story:** As HC Admin HO, I want to define central KPI Bersama items and assign them across companies so corporate KPIs are consistently deployed.
- **Acceptance criteria:**
    - Define central items (from Library or custom).
    - Set target per tier: table [KPI x Tier] with target values.
    - Bulk assign to position variants: select positions by company/band -> assign.
    - Items appear in employees' portfolios as read-only KPI Bersama.
    - Confirmation: "Assign 2 KPI Bersama ke 450 posisi di Tier 1?"
- **Touches:** KpiBersamaCentralItem (CRUD), KpiItem (batch create), KpiOwnership (batch create)

### US-HQ-013 - Review adjustment requests

- **Story:** As HC Admin HO, I want to review adjustment requests so legitimate changes are processed within SLA.
- **Acceptance criteria:**
    - Queue: list grouped by type, sorted by SLA deadline (nearest first).
    - Per request: requester, type, KPI title, justification, old vs new values, SLA badge.
    - Actions: Approve (auto-apply) | Reject (notes mandatory) | Request Revision.
    - SLA breach: amber (approaching) and red (breached) badges.
    - Audit trail entry for each decision.
- **Touches:** AdjustmentRequest (read/update), HqAuditLog (create)

### US-HQ-014 - Force finalize & year close

- **Story:** As HC Admin HO, I want to force-finalize pending items and close the assessment year so scores are locked.
- **Acceptance criteria:**
    - **Force Finalize:** select company/scope -> force approve all pending items -> confirmation with impact count.
    - **Year Close:** final close for entire year -> all scores locked, no further changes -> confirmation: "Tutup tahun penilaian 2026? Aksi ini tidak dapat dibatalkan."
    - Both actions logged in audit trail.
- **Touches:** KpiItem (batch update), PerformancePeriod (update), HqAuditLog (create)

### US-HQ-015 - View monitoring analytics

- **Story:** As HC Admin HO, I want to see monitoring analytics so I can track realization coverage and score distribution.
- **Acceptance criteria:**
    - Realization coverage per company (% items submitted).
    - Portfolio status heatmap (companies x status).
    - Score distribution charts: histogram by rating, by company, by band jabatan.
    - Report builder: custom filters, export as Excel/PDF.
- **Touches:** KpiRealization (aggregate), PortfolioScore (aggregate)

### US-HQ-016 - Configure mutation & prorata policy

- **Story:** As HC Admin HO, I want to configure mutation handling rules so transferred employees are scored fairly.
- **Acceptance criteria:**
    - Prorata method: WEIGHTED_AVERAGE | LONGEST_DURATION | MINIMUM_DURATION.
    - Minimum duration months (e.g. 3).
    - Cutoff day (e.g. 15th of month).
    - Carry-over toggle.
    - Position correction rules: admin can flag name-only changes.
    - Save -> audit log entry.
- **Touches:** MutationScoringPolicy (CRUD), HqAuditLog (create)

### US-HQ-017 - Apply indisciplinary override

- **Story:** As HC Admin HO, I want to apply special treatment for employees with disciplinary issues so they are handled per policy.
- **Acceptance criteria:**
    - Search employee -> select.
    - Override type: EXCLUDE_FROM_POOL, CAP_RATING (select max rating), CUSTOM (text).
    - Reason mandatory.
    - Save -> override applied; audit log entry.
    - View list of active overrides; revoke if needed.
- **Touches:** IndisciplinaryOverride (CRUD), HqAuditLog (create)

### US-HQ-018 - View & export audit log

- **Story:** As HC Admin HO, I want to view and export the audit log so all configuration changes are traceable.
- **Acceptance criteria:**
    - Table: timestamp, action type, entity, changed by, old value, new value.
    - Filter by: action type, date range, user.
    - Sort by timestamp (newest first by default).
    - Export as Excel.
    - Detail drawer: full old/new values comparison.
- **Touches:** HqAuditLog (read)

### US-HQ-019 - Manage scoring calculation examples

- **Story:** As HC Admin HO, I want the system to display scoring calculation examples so stakeholders understand how PI is computed.
- **Acceptance criteria:**
    - Scoring formula documentation page within HQ.
    - Interactive example: input sample weights and scores -> see PI calculation step by step.
    - Layered scoring explained: per item -> per category -> final (per F-07 review decision).
    - Example scenarios: Struktural (40/60 split), Non-Struktural (0/100), with cap applied, with progressive target.
    - Exportable as PDF for stakeholder communication.
- **Touches:** BandKpiFormula (read), KpiRuleConfig (read), RatingScaleConfig (read)

---

## 7. Screen / flow coverage map

- **HQ Dashboard** -> US-HQ-001
- **Period Management** -> US-HQ-002, US-HQ-003
- **Weight & Rules Config** -> US-HQ-004, US-HQ-005, US-HQ-006
- **Rating Config** -> US-HQ-007, US-HQ-008
- **Cohort Management** -> US-HQ-009, US-HQ-010
- **Company Tier Management** -> US-HQ-011
- **KPI Bersama Management** -> US-HQ-012
- **Adjustment Queue** -> US-HQ-013
- **Force Finalize & Year Close** -> US-HQ-014
- **Monitoring Analytics** -> US-HQ-015
- **Mutation & Special Rules** -> US-HQ-016, US-HQ-017
- **Audit Log** -> US-HQ-018
- **Scoring Calculator / Documentation** -> US-HQ-019

---

## 8. Content & terminology

- **Preferred terms:** "Markas KPI" (KPI Headquarter di UI), "Periode Penilaian" (assessment period), "Bobot per Band" (weight per band), "Cohort" (retained as-is, no translation - per domain term), "Tingkat Perusahaan" (company tier), "Prorata" (retained), "Finalisasi Paksa" (force finalize), "Tutup Tahun" (year close)
- **Band labels:** Utama, Madya, Muda, Pratama
- **Cap labels:** Same as DIP 5
- **Rating labels:** Same as DIP 2
- **Cohort definition example labels:** "BOD-5 Finance" = Band Madya + Job Family Finance

---

## 9. Open questions

- Apakah cohort definition perlu mendukung lebih dari 2 atribut kombinasi? (Sementara: ya, up to 4 atribut)
- Apakah threshold simulation perlu menggunakan data real-time atau hanya hypothetical input? (Sementara: keduanya; real-time jika data monitoring tersedia)
- Apakah force finalize perlu second approval (e.g. dari Direksi)? (Sementara: tidak; HC Admin HO cukup)
- Apakah indisciplinary override bisa berlaku multi-year? (Sementara: per year; harus di-reapply setiap tahun)
- Apakah scoring calculator interaktif perlu di-embed di HQ atau cukup sebagai halaman referensi? (Sementara: embed di HQ sebagai tab tersendiri)