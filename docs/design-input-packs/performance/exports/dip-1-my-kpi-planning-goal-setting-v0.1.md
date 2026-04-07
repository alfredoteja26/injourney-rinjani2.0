# Design Input Pack: Rinjani Performance - My KPI Planning & Goal Setting

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

- **Problem:** Karyawan InJourney Group membutuhkan satu antarmuka terpusat untuk merencanakan KPI individu setiap tahun, termasuk menyusun item KPI, menetapkan target, mengatur bobot, dan mengajukan rencana ke atasan untuk persetujuan.
- **Target outcome:** Employee dapat menyelesaikan seluruh siklus Planning (Goal Setting) dalam satu modul: mulai dari melihat portfolio, menambah item KPI, mengatur target dan bobot, hingga submit untuk approval.
- **MVP scope:** Portfolio dashboard dengan 3 view modes, draft KPI dari Library atau custom, terima cascaded KPI, set target (fixed/progressive/quarterly), assign weight dengan real-time validation, dan submit planning.
- **Non-goals:** Monitoring/check-in (DIP terpisah), year-end review, admin configuration, KPI Tree visualization, calibration.

---

## 2. Personas & access

| **Persona** | **Goals** | **Can** | **Cannot** |
| --- | --- | --- | --- |
| **Karyawan** (primary) | Merencanakan KPI individu secara efisien dan submit tepat waktu | View portfolio; draft KPI (dari Library/custom); copy from previous; set target; assign weight; submit planning; request extension; submit change request (outside planning) | Approve own planning; modify KPI Bersama; access KPI Tree full; access HQ config |
| **Atasan Langsung** (secondary, read-only in this slice) | Melihat progres perencanaan bawahan | View subordinate portfolio status (via My Team KPI) | Edit subordinate KPI dari My KPI module (harus lewat My Team KPI) |

---

## 3. Domain model (semantic)

**Schema source:** INJ-BPR Data Model (Products Registry) + Enhancement Review Session 7 Apr 2026

- **Employee:** `employeeNumber` (6-digit), `displayName`, `positionTitle`, `organizationName`, `bandJabatan` (Utama|Madya|Muda|Pratama), `jobType` (STRUKTURAL|NON_STRUKTURAL), `positionMasterVariantId`, `directSupervisorId`
- **PerformancePeriod:** `id`, `year`, `phase` (PLANNING|MONITORING|YEAR_END), `status` (OPEN|CLOSED), `planningStartDate`, `planningEndDate`, `checkInSchedule[]`
- **KpiItem:** `id`, `code`, `title`, `description`, `kpiType` (BERSAMA|UNIT), `polarity` (POSITIVE|NEGATIVE|NEUTRAL), `targetType` (FIXED|PROGRESSIVE), `targetValue`, `targetUnit`, `monitoringPeriod` (QUARTERLY|SEMESTER|ANNUAL), `capType` (NO_CAP|CAPPED_100|CAPPED_120|CUSTOM), `customCapValue?`, `bscPerspective` (FINANCIAL|CUSTOMER|INTERNAL_PROCESS|LEARNING_GROWTH), `formula?`, `evidenceRequired` (bool), `categoryBasedScoring` (bool), `source` (LIBRARY|ADMIN_UPLOAD|CUSTOM|P_KPI), `dictionaryItemId?`, `parentKpiId?`, `createdAt`, `year`
- **KpiOwnership:** `id`, `kpiItemId`, `employeeNumber`, `positionMasterVariantId`, `ownershipType` (OWNER|COLLABORATOR|SHARED_OWNER), `weight`, `weightApprovalStatus` (DRAFT|SUBMITTED|APPROVED|REJECTED), `year`, `startDate`, `endDate`
- **KpiTarget:** `id`, `kpiItemId`, `period` (Q1|Q2|Q3|Q4|S1|S2|ANNUAL), `targetValue`, `year`
- **KpiItemApprovalStatus:** enum (DRAFT|ALLOCATED|WAITING_REVIEW|WAITING_FOR_APPROVAL|PENDING_CLARIFICATION|APPROVED|APPROVED_ADJUSTED|REJECTED)
- **CascadeRelation:** `id`, `parentKpiId`, `childKpiId`, `cascadeMethod` (DIRECT|INDIRECT), `accumulationEnabled` (bool)
- **BandKpiFormula:** `id`, `bandJabatan`, `kpiBersamaWeight` (%), `kpiUnitWeight` (%)
- **KpiDictionaryItem:** `id`, `code`, `title`, `description`, `kpiType`, `bscPerspective`, `targetUnit`, `polarity`, `monitoringPeriod`, `fixedWeight?`, `capType`, `lockedAttributes[]`, `status` (PUBLISHED|DEPRECATED)
- **KpiChangeRequest:** `id`, `kpiItemId`, `requestType` (CREATE|UPDATE|DELETE), `requestedBy`, `justification`, `oldValue` (json), `newValue` (json), `status` (PENDING|APPROVED|REJECTED|REVISION_REQUESTED), `reviewedBy?`, `reviewNotes?`, `createdAt`, `reviewedAt?`

**Key relationships:**

- Employee -> KpiOwnership (1:N via employeeNumber)
- KpiItem -> KpiOwnership (1:N)
- KpiItem -> KpiTarget (1:N per period)
- KpiItem -> CascadeRelation (parent or child)
- KpiItem -> KpiDictionaryItem (optional, via dictionaryItemId)
- BandKpiFormula -> Employee (via bandJabatan)

---

## 4. Reference dataset

**Prototype Personas (from INJ-BPR Product Definition):**

**Employee (primary user for this slice)**

- `260102` - Binavia Wardhani, Group Head HC Planning & Analytics, Band Madya, STRUKTURAL, reports to Dimas Sayyid (260101)

**Performance Period**

- `PRD-2026` - year: 2026, phase: PLANNING, status: OPEN, planningStartDate: 2026-01-15, planningEndDate: 2026-03-15

**Band KPI Formula (for Binavia - Madya, Struktural)**

- bandJabatan: Madya, kpiBersamaWeight: 40%, kpiUnitWeight: 60%

**KPI Bersama Items (read-only for Binavia)**

- `KPI-B-001` - title: "Customer Satisfaction Index (CSI)", kpiType: BERSAMA, targetType: FIXED, targetValue: 4.2, targetUnit: "Skala 1-5", polarity: POSITIVE, monitoringPeriod: ANNUAL, capType: CAPPED_100, source: ADMIN_UPLOAD, weight: 25%
- `KPI-B-002` - title: "Revenue Growth", kpiType: BERSAMA, targetType: FIXED, targetValue: 12, targetUnit: "%", polarity: POSITIVE, monitoringPeriod: ANNUAL, capType: NO_CAP, source: ADMIN_UPLOAD, weight: 15%

**KPI Unit Items (Binavia's portfolio)**

- `KPI-U-001` - title: "HC Analytics Dashboard Completion", kpiType: UNIT, targetType: PROGRESSIVE, targetUnit: "%", polarity: POSITIVE, monitoringPeriod: QUARTERLY, capType: CAPPED_100, source: LIBRARY, dictionaryItemId: DIC-042, weight: 20%, status: APPROVED
    - Targets: Q1: 25, Q2: 50, Q3: 75, Q4: 100
- `KPI-U-002` - title: "Workforce Planning Accuracy", kpiType: UNIT, targetType: FIXED, targetValue: 90, targetUnit: "%", polarity: POSITIVE, monitoringPeriod: SEMESTER, capType: NO_CAP, source: LIBRARY, weight: 15%, status: DRAFT
- `KPI-U-003` - title: "Time-to-Fill Critical Positions", kpiType: UNIT, targetType: FIXED, targetValue: 45, targetUnit: "Hari", polarity: NEGATIVE, monitoringPeriod: QUARTERLY, capType: CAPPED_100, source: CUSTOM, weight: 15%, status: DRAFT
- `KPI-U-004` - title: "HC Policy Compliance Rate", kpiType: UNIT, targetType: FIXED, targetValue: 95, targetUnit: "%", polarity: POSITIVE, monitoringPeriod: ANNUAL, capType: CAPPED_100, source: LIBRARY, weight: 10%, status: ALLOCATED (cascaded from Dimas, DIRECT cascade, accumulation: false)

**Cascade Relation**

- parentKpiId: `KPI-VP-010` (Dimas's "Policy Compliance Rate"), childKpiId: `KPI-U-004`, cascadeMethod: DIRECT, accumulationEnabled: false

**KPI Dictionary Items (for Library browse)**

- `DIC-042` - code: "HC-ANA-001", title: "HC Analytics Dashboard Completion", kpiType: UNIT, bscPerspective: INTERNAL_PROCESS, targetUnit: "%", polarity: POSITIVE, monitoringPeriod: QUARTERLY, capType: CAPPED_100, lockedAttributes: ["title","polarity","targetUnit"], status: PUBLISHED
- `DIC-078` - code: "HC-WFP-003", title: "Workforce Planning Accuracy", kpiType: UNIT, bscPerspective: INTERNAL_PROCESS, targetUnit: "%", polarity: POSITIVE, monitoringPeriod: SEMESTER, capType: NO_CAP, status: PUBLISHED

---

## 5. Business processes & flows

### Goal Setting - Employee Path (Path A)

1. Karyawan membuka My KPI saat planning phase OPEN.
2. Sistem menampilkan KPI Portfolio Dashboard dengan item existing:
    - KPI Bersama (read-only, sudah di-assign admin).
    - KPI Unit yang sudah ada (cascaded atau dari periode sebelumnya).
3. Karyawan memilih cara menambah KPI Unit baru:
    - **Dari Library:** Browse/search KPI Dictionary -> pilih item -> form ter-prefill dengan locked attributes -> isi target dan bobot.
    - **Custom:** Isi form manual (title, description, target, polarity, dll) -> submit.
    - **Copy from Previous:** Pilih item dari periode sebelumnya -> copy sebagai ALLOCATED -> edit target.
4. Untuk setiap item, karyawan mengisi:
    - Target value (fixed atau progressive per Q1-Q4/S1-S2).
    - Bobot item (real-time validation: total bobot per KPI type harus = 100%).
5. Karyawan melihat ringkasan portfolio:
    - Running total bobot KPI Bersama: harus tepat 40% (Struktural) atau 0% (Non-Struktural).
    - Running total bobot KPI Unit: harus tepat 60% (Struktural) atau 100% (Non-Struktural).
6. Karyawan submit planning -> status berubah ke WAITING_FOR_APPROVAL.

**Variations:**

- Item cascaded dari atasan masuk sebagai ALLOCATED; karyawan edit target -> status berubah ke DRAFT.
- Jika bobot total tidak valid (tidak = 100% per type), submit diblokir dengan pesan validasi.
- Jika planning phase CLOSED, semua mutation ditolak; banner "Periode Planning Ditutup" muncul.

### Goal Setting - Atasan-Initiated (Path B)

1. Atasan submit draft KPI untuk bawahan via My Team KPI.
2. Item masuk ke portfolio bawahan dengan status WAITING_REVIEW.
3. Bawahan merespons:
    - **Kembali ke Draft (REVISE):** item kembali DRAFT, bawahan edit lalu submit.
    - **Submit ke Approval (SUBMIT_FOR_APPROVAL):** item langsung ke WAITING_FOR_APPROVAL.

### KPI Change Request (Outside Planning Phase)

1. Karyawan ingin mengubah KPI di luar planning phase.
2. Submit Change Request dengan justification wajib.
3. Status: PENDING -> Admin review -> APPROVED (auto-apply) | REJECTED | REVISION_REQUESTED.

---

## 6. User stories

### US-MK-001 - View KPI portfolio

- **Story:** As a karyawan, I want to see my complete KPI portfolio in one page so I can understand my performance commitments.
- **Acceptance criteria:**
    - Portfolio displays all KPI items for current period grouped by type (Bersama / Unit).
    - Three view modes available: Table, List, Hierarchy.
    - Each item shows: title, kpiType badge, weight (item weight + type weight), target, status badge, source badge, polarity indicator.
    - KPI Bersama items are visually distinct (read-only indicator).
    - Running total bobot per type displayed at footer (real-time).
    - Dual display: PI contribution (weight x type weight) shown per item.
- **Touches:** KpiItem (read), KpiOwnership (read), BandKpiFormula (read)
- **States:** Empty portfolio (first time) | Partially filled | Complete (all weights valid) | Submitted (read-only)

### US-MK-002 - Draft KPI from Library

- **Story:** As a karyawan, I want to select a KPI from the dictionary library so I can use a standardized definition.
- **Acceptance criteria:**
    - Autocomplete search (min 2 chars, max 10 suggestions, case-insensitive).
    - "Lihat Semua di Kamus KPI" link opens full library modal.
    - Selected item prefills form; locked attributes show lock icon and cannot be edited.
    - Unlocked attributes (target, weight) remain editable.
    - Saved as DRAFT with `source = LIBRARY` and `dictionaryItemId` linked.
- **Touches:** KpiDictionaryItem (read), KpiItem (create), KpiOwnership (create)

### US-MK-003 - Draft custom KPI

- **Story:** As a karyawan, I want to create a custom KPI item when nothing suitable exists in the library.
- **Acceptance criteria:**
    - Full form: title, description, kpiType (Unit only), bscPerspective, targetUnit, polarity, monitoringPeriod, targetType, targetValue, formula (optional), evidenceRequired toggle.
    - System prompts to search Library first before allowing custom.
    - Saved as DRAFT with `source = CUSTOM`.
- **Touches:** KpiItem (create), KpiOwnership (create)

### US-MK-004 - Copy KPI from previous period

- **Story:** As a karyawan, I want to copy KPI items from last year so I don't have to recreate recurring items.
- **Acceptance criteria:**
    - "Copy dari Periode Sebelumnya" shows list of previous period items.
    - Selected items copied as ALLOCATED; user can edit target before submitting.
    - Original source preserved (LIBRARY link maintained if applicable).
- **Touches:** KpiItem (read previous, create current), KpiOwnership (create)

### US-MK-005 - Receive cascaded KPI

- **Story:** As a karyawan, I want to see KPI items cascaded from my supervisor so I can review and set my targets.
- **Acceptance criteria:**
    - Cascaded items appear in portfolio with cascade badge (DIRECT/INDIRECT).
    - Shows parent KPI title and supervisor name as source.
    - Item arrives as ALLOCATED; editing target transitions to DRAFT.
    - For DIRECT cascade: unit locked (same as parent).
    - For INDIRECT cascade: unit flexible.
- **Touches:** KpiItem (read), CascadeRelation (read), KpiOwnership (update)
- **States:** ALLOCATED (no target yet) | DRAFT (target edited)

### US-MK-006 - Set target

- **Story:** As a karyawan, I want to set targets for my KPI items with appropriate granularity.
- **Acceptance criteria:**
    - **Fixed target:** single value for entire period.
    - **Progressive target:** values per monitoring period (Q1, Q2, Q3, Q4 for quarterly; S1, S2 for semester).
    - Polarity indicator clearly shown: "Higher is Better" (POSITIVE), "Lower is Better" (NEGATIVE), "On Target" (NEUTRAL).
    - Target validation: numeric, required, unit label shown.
- **Touches:** KpiItem (update targetType, targetValue), KpiTarget (create/update per period)

### US-MK-007 - Assign weight & validate

- **Story:** As a karyawan, I want to assign weights to my KPI items and see real-time validation so my portfolio is balanced.
- **Acceptance criteria:**
    - Weight input per item (0-100%, validated).
    - Real-time running total per KPI type (Bersama / Unit) displayed prominently.
    - Validation rule: total Bersama weights must equal BandKpiFormula.kpiBersamaWeight; total Unit weights must equal BandKpiFormula.kpiUnitWeight.
    - If total invalid: warning badge shown; submit button disabled.
    - If total valid: success indicator; submit button enabled.
    - Dual weight display per item: "Bobot Item: 25% | Bobot Jenis: 60% (Unit) | Kontribusi ke PI: 15%"
- **Touches:** KpiOwnership (update weight), BandKpiFormula (read)

### US-MK-008 - Submit planning

- **Story:** As a karyawan, I want to submit my KPI plan for approval so my supervisor can review it.
- **Acceptance criteria:**
    - Submit blocked if: any item still ALLOCATED (no target), or total weight invalid.
    - Confirmation dialog: "Apakah Anda yakin ingin mengajukan rencana KPI untuk review?"
    - On submit: all items' approval status -> WAITING_FOR_APPROVAL.
    - Success toast: "Rencana KPI berhasil diajukan untuk review."
    - Portfolio becomes read-only until atasan responds.
- **Touches:** KpiItem (update status), KpiOwnership (update weightApprovalStatus)
- **States:** Submittable | Blocked (invalid weights) | Submitted (read-only)

---

## 7. Screen / flow coverage map

- **KPI Portfolio Dashboard** -> US-MK-001
- **Draft KPI Drawer (Library mode)** -> US-MK-002
- **Draft KPI Drawer (Custom mode)** -> US-MK-003
- **Copy from Previous Period Modal** -> US-MK-004
- **Cascaded KPI Detail Panel** -> US-MK-005
- **Target Setting Form (within drawer)** -> US-MK-006
- **Weight Assignment Footer** -> US-MK-007
- **Submit Confirmation Dialog** -> US-MK-008

---

## 8. Content & terminology

- **Preferred terms:** "KPI Bersama" (bukan "KPI Korporat" atau "Shared KPI"), "KPI Unit" (bukan "KPI Individu" atau "Personal KPI"), "Bobot Item" dan "Bobot Jenis" (dual weight), "Rencana KPI" (bukan "Goal Setting Form"), "Atasan Langsung" (bukan "Manager" atau "Supervisor")
- **Forbidden terms:** "KPI Impact", "KPI Output", "KAI" (terminologi Portaverse/Pelindo, jangan dipakai di konteks InJourney)
- **Locale:** Bahasa Indonesia untuk UI labels; angka format Indonesia (titik sebagai ribuan, koma sebagai desimal) kecuali untuk persentase.
- **Date format:** DD MMM YYYY (contoh: 15 Jan 2026)

---

## 9. Open questions

- Apakah ada batasan maksimum jumlah KPI Unit per karyawan? (Sementara: tidak ada hard limit di MVP)
- Apakah weight minimum per item diterapkan? (Referensi: PLN-032, min 5% jika policy aktif - confirm with admin config)
- Bagaimana handling jika karyawan memiliki multiple positions (dual assignment)? (Sementara: satu portfolio per position variant aktif)
- Apakah formula text harus ditampilkan di planning view? (Sementara: optional, tampilkan jika ada)