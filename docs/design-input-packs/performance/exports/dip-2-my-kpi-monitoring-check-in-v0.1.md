# Design Input Pack: Rinjani Performance - My KPI Monitoring & Check-In

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

- **Problem:** Setelah planning phase selesai, karyawan perlu mencatat realisasi KPI secara berkala, melampirkan bukti pencapaian, dan melihat progress check-in agar atasan dapat memverifikasi capaian.
- **Target outcome:** Karyawan dapat menyelesaikan siklus monitoring: melihat jadwal check-in, input realisasi per period, upload evidence, menulis progress notes, dan melihat riwayat serta score breakdown di akhir tahun.
- **MVP scope:** Check-in schedule view, input realisasi per period (quarterly/semester/annual), upload evidence (file dan link), progress notes, realization history, dan year-end score breakdown.
- **Non-goals:** Planning/goal setting (DIP 1), admin configuration, KPI Tree, calibration, atasan approval flow (DIP 4).

---

## 2. Personas & access

| **Persona** | **Goals** | **Can** | **Cannot** |
| --- | --- | --- | --- |
| **Karyawan** (primary) | Melaporkan capaian KPI tepat waktu dengan bukti yang memadai | Input realisasi; upload evidence; write progress notes; view check-in schedule; view realization history; view score breakdown; request extension | Approve own realisasi; modify approved KPI items; access monitoring analytics (admin); override deadline |

---

## 3. Domain model (semantic)

**Same domain model as DIP 1** (My KPI - Planning & Goal Setting). Additional entities for monitoring:

- **KpiRealization:** `id`, `kpiItemId`, `ownershipId`, `period` (Q1|Q2|Q3|Q4|S1|S2|ANNUAL), `actualValue`, `notes`, `status` (DRAFT|SUBMITTED|VERIFIED|REJECTED|ADJUSTED), `submittedAt`, `verifiedBy?`, `verifiedAt?`, `adjustedValue?`, `adjustmentNotes?`, `year`
- **RealizationEvidence:** `id`, `realizationId`, `type` (FILE|LINK), `fileName?`, `fileUrl?`, `linkUrl?`, `uploadedAt`
- **CheckInSchedule:** `id`, `performancePeriodId`, `period` (Q1|Q2|Q3|Q4|S1|S2), `windowStart`, `windowEnd`, `deadlineDate`, `status` (UPCOMING|OPEN|CLOSED|OVERDUE)
- **ExtensionRequest:** `id`, `performancePeriodId`, `requestedBy`, `reason`, `requestedDays`, `status` (PENDING|APPROVED|REJECTED), `reviewedBy?`, `newDeadline?`

**Scoring entities (for year-end view):**

- **KpiScore:** `id`, `kpiItemId`, `ownershipId`, `achievementPct`, `performanceIndex` (1-5), `weightedScore`, `capApplied` (bool), `scoringRuleVersion`, `year`
- **PortfolioScore:** `id`, `employeeNumber`, `year`, `bersama_subtotal`, `unit_subtotal`, `finalPI`, `finalAchievementPct`, `ratingLabel` (Unsuccessful|Partially Successful|Successful|Excellent|Outstanding)

**Key relationships:**

- KpiItem -> KpiRealization (1:N per period)
- KpiRealization -> RealizationEvidence (1:N)
- PerformancePeriod -> CheckInSchedule (1:N)
- KpiItem -> KpiScore (1:1 per year)
- Employee -> PortfolioScore (1:1 per year)

---

## 4. Reference dataset

**Employee:** Same as DIP 1 (Binavia Wardhani, 260102)

**Performance Period:** PRD-2026, phase: MONITORING (Q1 completed, Q2 in progress)

**Check-In Schedule:**

- Q1: windowStart: 2026-04-01, windowEnd: 2026-04-10, deadlineDate: 2026-04-10, status: CLOSED
- Q2: windowStart: 2026-07-01, windowEnd: 2026-07-10, deadlineDate: 2026-07-10, status: UPCOMING

**KPI Realizations (Q1 completed for Binavia):**

- `REA-001` - kpiItemId: KPI-U-001 ("HC Analytics Dashboard Completion"), period: Q1, actualValue: 28, status: VERIFIED, notes: "Dashboard phase 1 selesai, termasuk modul headcount dan turnover."
    - Evidence: FILE "Q1-Dashboard-Screenshot.png", LINK "https://analytics.injourney.id/q1-report"
- `REA-002` - kpiItemId: KPI-U-003 ("Time-to-Fill Critical Positions"), period: Q1, actualValue: 42, status: VERIFIED, notes: "3 posisi critical terisi rata-rata 42 hari."
    - Evidence: FILE "Recruitment-Tracker-Q1.xlsx"

**KPI Realizations (Q2 draft for Binavia):**

- `REA-003` - kpiItemId: KPI-U-001, period: Q2, actualValue: 55, status: DRAFT, notes: "In progress: modul compensation dan learning."

**Year-End Score Sample (for score breakdown view):**

- KPI-B-001 (CSI): achievement 97.6%, PI: 3.8, weight: 25%, weightedScore: 0.95, capApplied: true (CAPPED_100)
- KPI-B-002 (Revenue Growth): achievement 108.3%, PI: 4.2, weight: 15%, weightedScore: 0.63, capApplied: false
- KPI-U-001 (HC Analytics): achievement 100%, PI: 4.0, weight: 20%, weightedScore: 0.80, capApplied: true
- KPI-U-002 (Workforce Planning): achievement 94.4%, PI: 3.6, weight: 15%, weightedScore: 0.54
- KPI-U-003 (Time-to-Fill): achievement 106.7% (polarity NEGATIVE: 45/42=inverse), PI: 4.3, weight: 15%, weightedScore: 0.645
- KPI-U-004 (Policy Compliance): achievement 97.9%, PI: 3.9, weight: 10%, weightedScore: 0.39
- **Bersama subtotal:** 0.95 + 0.63 = 1.58
- **Unit subtotal:** 0.80 + 0.54 + 0.645 + 0.39 = 2.375
- **Final PI:** 1.58 + 2.375 = **3.955** -> Rating: **Excellent** (3.50-4.49)

---

## 5. Business processes & flows

### Monitoring - Input Realisasi

1. Sistem membuka check-in window sesuai jadwal (windowStart).
2. Karyawan membuka My KPI -> melihat banner "Check-In Q2 2026 Dibuka".
3. Karyawan memilih item KPI yang memiliki monitoring period aktif.
4. Karyawan mengisi:
    - **Actual value** (angka realisasi untuk period tersebut).
    - **Progress notes** (text, auto-save draft).
    - **Evidence** (upload file dan/atau paste link; multiple evidence per submission).
5. Karyawan save draft atau submit realisasi.
6. Setelah submit, status -> SUBMITTED; menunggu verifikasi atasan.

**Variations:**

- Jika evidence wajib (`evidenceRequired = true`) dan belum ada evidence: submit diblokir.
- Jika deadline terlewat: banner warning "Terlambat" muncul; submission masih diizinkan tetapi ditandai late.
- Jika deadline terlewat dan auto-zero policy aktif: sistem otomatis set actualValue = 0.
- Extension request: karyawan ajukan perpanjangan ke admin; jika approved, deadline bergeser.

### Monitoring - View History & Progress

1. Karyawan membuka item KPI -> tab "Realisasi".
2. Sistem menampilkan tabel realisasi per period: period, actualValue, target, achievement %, status, evidence count.
3. Untuk progressive KPI: chart trend (target vs actual per quarter).

### Year-End Review - View Score Breakdown

1. Setelah year-end review phase, karyawan membuka My KPI.
2. Sistem menampilkan:
    - Score per item: achievement %, PI (1-5), weighted score, cap applied indicator.
    - Subtotal per KPI type (Bersama / Unit).
    - Final PI dengan rating label.
    - Feedback dari atasan (jika ada).
3. Semua data read-only.

---

## 6. User stories

### US-MK-009 - Input realisasi

- **Story:** As a karyawan, I want to input my KPI realization for the current monitoring period so my progress is recorded.
- **Acceptance criteria:**
    - Realization form shows: current period, target value, input field for actual value, notes textarea (auto-save).
    - Polarity indicator shown: untuk NEGATIVE polarity, hint "Semakin rendah semakin baik".
    - Achievement % calculated live: actual/target * 100 (adjusted for polarity).
    - Save as DRAFT or Submit (-> SUBMITTED).
    - For progressive KPI: show target for current quarter specifically.
- **Touches:** KpiRealization (create/update), KpiItem (read target)
- **States:** Draft (editable) | Submitted (read-only, pending verification) | Verified | Rejected (re-editable)

### US-MK-010 - Upload evidence

- **Story:** As a karyawan, I want to attach evidence to my realization so my supervisor can verify my achievement.
- **Acceptance criteria:**
    - Support file upload (images, PDF, Excel, max 10MB per file).
    - Support link paste (URL, validated format).
    - Multiple evidence per realization (no hard limit in MVP; suggest max 5).
    - Evidence list displayed with type icon, name/URL, upload date.
    - If `evidenceRequired = true` and no evidence attached: submit blocked with message "Bukti wajib dilampirkan untuk item ini."
- **Touches:** RealizationEvidence (create/delete), KpiRealization (read)

### US-MK-011 - Progress notes

- **Story:** As a karyawan, I want to write progress notes during check-in so my supervisor understands the context of my achievement.
- **Acceptance criteria:**
    - Textarea with auto-save (debounce 2s).
    - Character limit: 2000 chars with counter.
    - Notes persisted per realization (not per item globally).
    - View historical notes from previous periods in timeline format.
- **Touches:** KpiRealization (update notes)

### US-MK-012 - Check-in schedule & status

- **Story:** As a karyawan, I want to see my check-in schedule so I know when to submit realizations.
- **Acceptance criteria:**
    - Calendar/timeline view showing all check-in windows for the year.
    - Status per period: UPCOMING (gray), OPEN (blue), CLOSED (green), OVERDUE (red).
    - Current period highlighted.
    - Countdown to deadline shown for OPEN period.
    - "Ajukan Perpanjangan" button for extension request.
- **Touches:** CheckInSchedule (read), ExtensionRequest (create)

### US-MK-013 - View score breakdown

- **Story:** As a karyawan, I want to see my final performance score breakdown so I understand how my PI was calculated.
- **Acceptance criteria:**
    - Score table per item: title, achievement %, PI (1-5), weight, weighted score, cap indicator.
    - Subtotal rows: KPI Bersama subtotal, KPI Unit subtotal.
    - Final row: Final PI, Final Achievement %, Rating Label with color badge.
    - Scoring formula explained: "PI = Sum(Item PI x Bobot Item) per Jenis KPI, lalu Sum(Jenis PI x Bobot Jenis)"
    - Calculation example inline with actual numbers from portfolio.
    - If cap applied: tooltip "Capaian dibatasi maksimal 100% sesuai konfigurasi."
    - Atasan feedback section (if available): text block with atasan name and date.
- **Touches:** KpiScore (read), PortfolioScore (read)
- **States:** Score available (post year-end) | Score not yet calculated (pre year-end)

### US-MK-014 - Request extension

- **Story:** As a karyawan, I want to request a deadline extension when I cannot submit realization on time.
- **Acceptance criteria:**
    - Form: reason (required, max 500 chars), requested additional days (number).
    - Submit -> status PENDING.
    - Track request status in Performance Calendar.
    - If APPROVED: new deadline shown; submission re-enabled.
    - If REJECTED: original deadline applies; submission marked late.
- **Touches:** ExtensionRequest (create/read)

---

## 7. Screen / flow coverage map

- **KPI Portfolio Dashboard (Monitoring mode)** -> US-MK-009, US-MK-012
- **Realization Input Drawer** -> US-MK-009, US-MK-010, US-MK-011
- **Evidence Upload Component** -> US-MK-010
- **Check-In Schedule / Performance Calendar** -> US-MK-012, US-MK-014
- **Realization History Tab (per item)** -> US-MK-009 (view history)
- **Year-End Score Breakdown View** -> US-MK-013
- **Extension Request Form** -> US-MK-014

---

## 8. Content & terminology

Same as DIP 1, plus:

- **Preferred terms:** "Realisasi" (bukan "Actuals" atau "Achievement Input"), "Bukti" atau "Evidence" (keduanya boleh), "Check-In" (bukan "Review" di context monitoring), "Perpanjangan" (bukan "Extension" di UI)
- **Score labels:** Unsuccessful (1.00-1.49), Partially Successful (1.50-2.49), Successful (2.50-3.49), Excellent (3.50-4.49), Outstanding (4.50-5.00)

---

## 9. Open questions

- Apakah auto-zero policy aktif di MVP? (Sementara: tidak; realisasi yang terlewat tetap bisa disubmit dengan flag late)
- Apakah atasan bisa melihat draft realisasi sebelum submit? (Sementara: tidak; hanya SUBMITTED ke atas yang visible)
- Bagaimana handling realisasi untuk KPI Bersama? (Sementara: KPI Bersama realisasi di-input oleh admin via KPI Tree/HQ, bukan oleh karyawan)
- Apakah perlu fitur backdate realisasi? (Sementara: tidak di MVP; extend via extension request saja)