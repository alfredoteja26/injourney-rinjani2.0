# Design Input Pack: Rinjani Performance - My Team KPI Monitoring Dashboard & Verification

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

- **Problem:** Atasan langsung perlu memantau capaian KPI tim secara berkala, memverifikasi realisasi yang diajukan bawahan, dan memiliki dashboard yang membantu menjalankan seluruh proses bisnis monitoring KPI.
- **Target outcome:** Atasan dapat melihat dashboard performa tim (progress bulanan, status monitoring, backlog approval), memverifikasi realisasi bawahan beserta evidence, dan mengambil keputusan approval/reject/adjust secara efisien.
- **MVP scope:** Team dashboard (score overview, progress month-by-month, KPI plan progress), backlog monitoring approval queue, backlog realisasi submission queue, verify realisasi & evidence, approve/reject/adjust, request clarification, auto-approve timeout handling, batch approve, year-end assessment per subordinate.
- **Non-goals:** Planning approval & cascading (DIP 3), admin HQ configuration, KPI Tree, KPI Library governance, calibration.

---

## 2. Personas & access

| **Persona** | **Goals** | **Can** | **Cannot** |
| --- | --- | --- | --- |
| **Atasan Langsung** (primary) | Memantau performa tim secara real-time dan memverifikasi capaian bawahan tepat waktu | View team dashboard; view progress achievement month-by-month; view monitoring approval backlog; view realisasi submission backlog; verify realisasi & evidence; approve/reject/adjust realisasi; request clarification; batch approve; year-end assessment per subordinate; review adjustment requests | Input realisasi untuk bawahan; override score tanpa audit trail; configure monitoring schedule (admin); calibrate scores (HQ) |

---

## 3. Domain model (semantic)

**Same domain model as DIP 1 and DIP 2.** Key entities for this slice:

- **Employee** (with `directReports[]`)
- **KpiItem**, **KpiOwnership**, **KpiTarget**
- **KpiRealization** (with verification states: SUBMITTED, VERIFIED, REJECTED, ADJUSTED)
- **RealizationEvidence**
- **CheckInSchedule**
- **KpiScore**, **PortfolioScore** (for year-end assessment)

Additional derived entities for dashboard:

- **TeamMonitoringDashboard:** (derived) `totalSubordinates`, `subordinatesWithPendingRealization`, `subordinatesOnTrack`, `subordinatesAtRisk`, `subordinatesOverdue`, `averageTeamAchievement`, `monthlyProgressData[]`
- **MonitoringApprovalQueue:** (derived) list of KpiRealization with status SUBMITTED, grouped by subordinate
- **SubordinateMonitoringCard:** (derived) per subordinate: `employeeNumber`, `displayName`, `positionTitle`, `totalItems`, `itemsOnTrack`, `itemsAtRisk`, `itemsOverdue`, `latestCheckInStatus`, `pendingRealizationCount`, `averageAchievementPct`

---

## 4. Reference dataset

**Atasan:** Same as DIP 3 (Dimas Sayyid, 260101, VP HC Strategy)

**Performance Period:** PRD-2026, phase: MONITORING (Q1 completed, Q2 in progress)

**Team Monitoring Status (Q1 completed):**

- **Binavia (260102):** 4 Unit KPIs monitored; 3 verified, 1 pending Q2; avg achievement Q1: 94.2%; status: ON_TRACK
- **Fajar (260103):** 3 Unit KPIs monitored; 2 verified, 1 rejected (needs revision); avg achievement Q1: 78.5%; status: AT_RISK
- **Sinta (260104):** 2 Unit KPIs monitored; 1 verified, 1 overdue (not submitted); avg achievement Q1: 88.0%; status: OVERDUE

**Monthly Progress Data (Team Average):**

- Jan: 22%, Feb: 38%, Mar: 61% (Q1 cumulative trend)

**Pending Realization Submissions (Q2, for verification):**

- `REA-003` - Binavia, KPI-U-001 ("HC Analytics Dashboard Completion"), period: Q2, actualValue: 55, status: SUBMITTED, evidence: 2 files
- `REA-010` - Fajar, KPI-FN-002 ("Policy Review Completion"), period: Q1, actualValue: 60, status: SUBMITTED (resubmitted after rejection), evidence: 1 file, 1 link

**Rejected Realization (for context):**

- `REA-008` - Fajar, KPI-FN-002, period: Q1, actualValue: 55, status: REJECTED, rejectionNotes: "Evidence tidak mencukupi. Lampirkan dokumen policy review final."

**Year-End Assessment Data (sample for score review):**

- Binavia: finalPI: 3.955, rating: Excellent, bersama_subtotal: 1.58, unit_subtotal: 2.375
- Fajar: finalPI: 3.12, rating: Successful, bersama_subtotal: 1.48, unit_subtotal: 1.64
- Sinta: finalPI: 3.45, rating: Successful, bersama_subtotal: 1.52, unit_subtotal: 1.93

---

## 5. Business processes & flows

### Team Dashboard - Overview & Monitoring

1. Atasan membuka My Team KPI -> sistem menampilkan Team Dashboard.
2. Dashboard menampilkan:
    - **Score Overview:** Average team PI, count of subordinates, on-track/at-risk/overdue breakdown.
    - **Progress Month-by-Month:** Bar/line chart showing team average achievement trend per month.
    - **KPI Plan Progress:** Overall completion rate of team's KPI realization submissions.
    - **Team Member Status Cards:** Per subordinate: name, position, avg achievement, pending count, risk indicator.
3. Atasan klik subordinate card -> drill down ke detail individual.

### Realization Verification

1. Atasan membuka Monitoring Approval Queue -> melihat daftar realisasi SUBMITTED.
2. Per submission: subordinate name, KPI title, period, actual value, target, achievement %, evidence count.
3. Atasan klik submission -> detail panel:
    - Actual value vs target with achievement % (live calculation).
    - Evidence viewer: preview files, open links.
    - Realization history: previous periods for comparison.
    - Notes from subordinate.
4. Atasan memilih aksi:
    - **Verify (Approve):** status -> VERIFIED; notification ke subordinate.
    - **Adjust & Approve:** Atasan mengubah actualValue dengan alasan -> status ADJUSTED; original value dan adjusted value both recorded.
    - **Reject:** Notes mandatory -> status REJECTED; subordinate bisa revise & resubmit.
    - **Request Clarification:** Notes mandatory -> subordinate merespons lalu resubmit.

**Variations:**

- Auto-approve timeout: jika atasan tidak merespons dalam X hari kerja (configurable via HQ), realisasi otomatis VERIFIED.
- Batch verify: atasan memilih beberapa submissions -> verify all.

### Year-End Assessment

1. Setelah year-end review phase, atasan membuka My Team KPI -> Year-End Assessment.
2. Per subordinate: score breakdown table (same as employee year-end view), comparative view across team.
3. Atasan mengisi assessment form: qualitative feedback, strengths, areas for improvement.
4. Submit assessment -> notification ke subordinate.

---

## 6. User stories

### US-MT-008 - View team monitoring dashboard

- **Story:** As an atasan, I want to see a dashboard of my team's KPI monitoring status so I can identify issues early.
- **Acceptance criteria:**
    - Dashboard header: team average PI (if calculated), total subordinates count.
    - Risk breakdown cards: ON_TRACK (green, count), AT_RISK (amber, count), OVERDUE (red, count).
    - Monthly progress chart: bar or line chart showing team average achievement per month (Jan-Dec).
    - KPI plan progress: stacked bar showing % of items with realization submitted vs pending per subordinate.
    - Subordinate cards: name, position, avg achievement %, pending realization count, risk badge, last check-in date.
    - Click card -> navigate to subordinate detail.
- **Touches:** Employee (read), KpiRealization (aggregate), KpiScore (read if available)
- **States:** No data yet (pre-monitoring) | Active monitoring | Year-end complete

### US-MT-009 - View monitoring approval backlog

- **Story:** As an atasan, I want to see all pending realization submissions so I can process verifications efficiently.
- **Acceptance criteria:**
    - Queue list: grouped by subordinate, sorted by submission date (oldest first).
    - Per item: subordinate name, KPI title, period, actual value, target, achievement %, evidence count, submission date, days pending.
    - Badge for items pending > 3 days ("Segera Review").
    - Filter by: subordinate, period, status (SUBMITTED only by default).
    - Count badge on tab/menu: total pending items.
- **Touches:** KpiRealization (read where status = SUBMITTED)

### US-MT-010 - Verify realisasi & evidence

- **Story:** As an atasan, I want to review a subordinate's realization submission with evidence so I can verify the achievement.
- **Acceptance criteria:**
    - Detail panel: KPI title, period, target, actual value, achievement % (with polarity-aware calculation).
    - Evidence viewer: file preview (images inline, PDF/Excel download), links clickable.
    - Subordinate's notes displayed.
    - Realization history for same KPI (previous periods) for trend comparison.
    - For progressive KPI: chart showing target vs actual per quarter.
- **Touches:** KpiRealization (read), RealizationEvidence (read), KpiTarget (read)

### US-MT-011 - Approve / reject / adjust realisasi

- **Story:** As an atasan, I want to approve, reject, or adjust a subordinate's realization so their score is accurately recorded.
- **Acceptance criteria:**
    - **Verify (Approve):** One-click with confirmation -> status VERIFIED.
    - **Adjust & Approve:** Edit actual value inline + mandatory adjustment notes -> status ADJUSTED; both original and adjusted values recorded; audit trail entry created.
    - **Reject:** Notes mandatory (min 10 chars) -> status REJECTED; subordinate notified with reason and can resubmit.
    - **Request Clarification:** Notes mandatory -> subordinate responds then resubmits.
    - Toast notifications for each action.
- **Touches:** KpiRealization (update status, adjustedValue, adjustmentNotes)
- **States:** Pending verification | Verified | Adjusted | Rejected | Clarification requested

### US-MT-012 - Batch verify submissions

- **Story:** As an atasan, I want to verify multiple realization submissions at once so I save time on routine approvals.
- **Acceptance criteria:**
    - Checkbox selection on queue items.
    - "Verifikasi Terpilih" button (enabled when >= 1 selected).
    - Confirmation dialog: "Verifikasi realisasi untuk X item dari Y bawahan?"
    - Result summary: "X berhasil, Y gagal".
    - Items with missing evidence excluded if evidence is required.
- **Touches:** KpiRealization (batch update)

### US-MT-013 - Auto-approve timeout handling

- **Story:** As an atasan, I want to be notified before realization auto-approves so I don't miss the review window.
- **Acceptance criteria:**
    - Warning badge on items approaching auto-approve deadline (H-3, H-1).
    - Tooltip: "Item ini akan otomatis diverifikasi pada [date] jika tidak ada aksi."
    - After auto-approve: status VERIFIED with note "Otomatis diverifikasi (timeout)".
    - Dashboard shows count of auto-approved items separately.
- **Touches:** KpiRealization (read/auto-update), CheckInSchedule (read deadline)

### US-MT-014 - Year-end assessment per subordinate

- **Story:** As an atasan, I want to review each subordinate's final score and provide assessment feedback.
- **Acceptance criteria:**
    - Score breakdown table per subordinate (same format as employee score view from DIP 2).
    - Comparative summary: table showing all subordinates' final PI, rating, and rank.
    - Assessment form per subordinate: qualitative feedback textarea (required), strengths (optional), improvement areas (optional).
    - Submit assessment -> notification to subordinate.
    - View submitted assessments in read-only mode after submission.
- **Touches:** PortfolioScore (read), KpiScore (read)

### US-MT-015 - Review subordinate adjustment requests

- **Story:** As an atasan, I want to review my subordinate's KPI change requests so legitimate adjustments are processed.
- **Acceptance criteria:**
    - Adjustment queue: list of KpiChangeRequest from subordinates with status PENDING.
    - Per request: subordinate name, KPI title, request type (CREATE/UPDATE/DELETE), justification, old vs new values.
    - Actions: Approve (auto-apply) | Reject (notes mandatory) | Request Revision.
    - Audit trail entry for each decision.
- **Touches:** KpiChangeRequest (read/update)

---

## 7. Screen / flow coverage map

- **Team Monitoring Dashboard** -> US-MT-008
- **Monitoring Approval Queue** -> US-MT-009, US-MT-012, US-MT-013
- **Realization Detail Panel** -> US-MT-010, US-MT-011
- **Evidence Viewer Component** -> US-MT-010
- **Batch Verify Toolbar** -> US-MT-012
- **Year-End Assessment View** -> US-MT-014
- **Adjustment Request Queue** -> US-MT-015

---

## 8. Content & terminology

Same as DIP 1 and DIP 3, plus:

- **Preferred terms:** "Verifikasi" (bukan "Approve Realisasi"), "Penyesuaian" (untuk Adjust & Approve), "Verifikasi Terpilih" (Batch Verify), "Penilaian Akhir Tahun" (Year-End Assessment), "Permintaan Perubahan" (Change/Adjustment Request)
- **Risk labels:** ON_TRACK -> "Sesuai Target" (green), AT_RISK -> "Perlu Perhatian" (amber), OVERDUE -> "Terlambat" (red)
- **Score labels:** Same as DIP 2

---

## 9. Open questions

- Berapa hari default untuk auto-approve timeout? (Sementara: 5 hari kerja, configurable via HQ)
- Apakah atasan bisa melihat draft realisasi bawahan sebelum submit? (Sementara: tidak, hanya SUBMITTED yang visible)
- Apakah comparative view year-end menampilkan ranking eksplisit? (Sementara: ya, sorted by PI descending, tapi tanpa label "ranking" eksplisit)
- Apakah adjustment request memerlukan second-level approval dari HC Admin? (Sementara: hanya jika di luar planning phase; selama monitoring, atasan cukup)