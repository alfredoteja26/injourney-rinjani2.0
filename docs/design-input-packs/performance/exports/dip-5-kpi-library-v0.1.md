# Design Input Pack: Rinjani Performance - KPI Library

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

- **Problem:** InJourney Group memerlukan kamus KPI terstandarisasi agar definisi, formula, dan pengukuran KPI konsisten di seluruh entitas. Tanpa library, setiap unit membuat KPI sendiri dengan definisi yang tidak seragam.
- **Target outcome:** Satu katalog KPI standar yang bisa di-browse, dipakai langsung saat planning, dan dikelola melalui workflow validasi dan approval. Admin dapat memantau adoption rate dan usage analytics.
- **MVP scope:** Browse & search library, view item detail (termasuk cap type, locked attributes, usage stats), gunakan item dalam planning, submit item baru, validation queue, approval queue (configure cap, locked attrs, publish/deprecate), analytics dashboard.
- **Non-goals:** Integrasi dengan learning catalog, AI recommendation, automated formula validation.

---

## 2. Personas & access

| **Persona** | **Goals** | **Can** | **Cannot** |
| --- | --- | --- | --- |
| **Karyawan** (browse) | Menemukan KPI standar untuk planning | Browse, search, filter library; view item detail; use item in planning ("Gunakan Item Ini") | Submit item baru; validate; approve; view analytics; deprecate |
| **Atasan** (browse + submit) | Menemukan KPI untuk tim dan mengajukan item baru | Semua kemampuan Karyawan + submit new item proposal | Validate; approve; view admin analytics; deprecate |
| **Validator / HC Admin** (validate) | Memastikan item yang diajukan memenuhi standar kualitas | Review submitted items; accept/reject with notes; flag similar items | Publish item; configure locked attributes; deprecate; view full analytics |
| **Approver / PA HO** (approve + govern) | Menjaga kualitas dan konsistensi library secara keseluruhan | Review validated items; configure fixed weight, locked attributes, cap type; publish/reject; deprecate; view analytics dashboard | Input realisasi; manage KPI Tree; configure HQ periods |

---

## 3. Domain model (semantic)

- **KpiDictionaryItem:** `id`, `code` (unique, e.g. "HC-ANA-001"), `title`, `description`, `kpiType` (UNIT), `bscPerspective` (FINANCIAL|CUSTOMER|INTERNAL_PROCESS|LEARNING_GROWTH), `targetUnit`, `polarity` (POSITIVE|NEGATIVE|NEUTRAL), `monitoringPeriod` (QUARTERLY|SEMESTER|ANNUAL), `capType` (NO_CAP|CAPPED_100|CAPPED_120|CUSTOM), `customCapValue?`, `fixedWeight?` (preset weight, nullable), `formula?`, `evidenceRequirement?`, `lockedAttributes[]` (e.g. ["title","polarity","targetUnit"]), `applicableFunctions[]`, `applicableBandJabatan[]`, `status` (DRAFT|PENDING_VALIDATION|VALIDATED|PENDING_APPROVAL|PUBLISHED|DEPRECATED), `usageCount`, `submittedBy`, `validatedBy?`, `approvedBy?`, `sourceModule?` (DIRECT|MY_PERFORMANCE|MY_TEAM_PERFORMANCE|PERFORMANCE_TREE), `createdAt`, `publishedAt?`, `deprecatedAt?`
- **DictionaryValidationRecord:** `id`, `dictionaryItemId`, `validatorId`, `action` (ACCEPT|REJECT), `notes`, `similarItemWarning?` (list of similar item IDs), `createdAt`
- **DictionaryApprovalRecord:** `id`, `dictionaryItemId`, `approverId`, `action` (PUBLISH|REJECT|SEND_BACK_TO_VALIDATION), `notes`, `configuredLockedAttributes[]`, `configuredCapType?`, `configuredFixedWeight?`, `createdAt`
- **DictionaryUsageRecord:** `id`, `dictionaryItemId`, `kpiItemId`, `employeeNumber`, `year`, `status` (ACTIVE|HISTORICAL)

**Key relationships:**

- KpiDictionaryItem -> DictionaryValidationRecord (1:N)
- KpiDictionaryItem -> DictionaryApprovalRecord (1:N)
- KpiDictionaryItem -> DictionaryUsageRecord (1:N, tracks adoption)
- KpiDictionaryItem -> KpiItem (1:N, via dictionaryItemId on KpiItem)

---

## 4. Reference dataset

**Published Library Items (sample catalog)**

- `DIC-001` - code: "FIN-REV-001", title: "Revenue Growth", kpiType: UNIT, bscPerspective: FINANCIAL, targetUnit: "%", polarity: POSITIVE, monitoringPeriod: ANNUAL, capType: NO_CAP, lockedAttributes: ["title","polarity","bscPerspective"], status: PUBLISHED, usageCount: 142
- `DIC-042` - code: "HC-ANA-001", title: "HC Analytics Dashboard Completion", kpiType: UNIT, bscPerspective: INTERNAL_PROCESS, targetUnit: "%", polarity: POSITIVE, monitoringPeriod: QUARTERLY, capType: CAPPED_100, fixedWeight: null, lockedAttributes: ["title","polarity","targetUnit"], status: PUBLISHED, usageCount: 38
- `DIC-078` - code: "HC-WFP-003", title: "Workforce Planning Accuracy", kpiType: UNIT, bscPerspective: INTERNAL_PROCESS, targetUnit: "%", polarity: POSITIVE, monitoringPeriod: SEMESTER, capType: NO_CAP, lockedAttributes: ["title"], status: PUBLISHED, usageCount: 25
- `DIC-103` - code: "OPS-SFT-001", title: "Zero Accident Rate", kpiType: UNIT, bscPerspective: INTERNAL_PROCESS, targetUnit: "Kejadian", polarity: NEGATIVE, monitoringPeriod: QUARTERLY, capType: CAPPED_100, fixedWeight: 10, lockedAttributes: ["title","polarity","targetUnit","capType"], status: PUBLISHED, usageCount: 89
- `DIC-150` - code: "CUS-SAT-002", title: "Net Promoter Score (NPS)", kpiType: UNIT, bscPerspective: CUSTOMER, targetUnit: "Skor", polarity: POSITIVE, monitoringPeriod: SEMESTER, capType: CAPPED_120, lockedAttributes: ["title","polarity"], status: PUBLISHED, usageCount: 56

**Pending Items (for validation/approval queues)**

- `DIC-201` - code: "HR-TRN-010", title: "Training Hours per Employee", kpiType: UNIT, bscPerspective: LEARNING_GROWTH, targetUnit: "Jam", polarity: POSITIVE, monitoringPeriod: ANNUAL, capType: NO_CAP, status: PENDING_VALIDATION, submittedBy: 260102 (Binavia), sourceModule: MY_PERFORMANCE
- `DIC-202` - code: "HR-ENG-005", title: "Employee Engagement Index", kpiType: UNIT, bscPerspective: LEARNING_GROWTH, targetUnit: "Skala 1-5", polarity: POSITIVE, monitoringPeriod: ANNUAL, capType: CAPPED_100, status: VALIDATED (pending approval), submittedBy: 260103 (Fajar)

**Deprecated Item**

- `DIC-099` - code: "OPS-OLD-001", title: "Manual Report Submission Rate", status: DEPRECATED, deprecatedAt: 2025-12-01, usageCount: 3 (historical)

**Analytics Summary**

- Total items: 156, Published: 148, Pending Validation: 4, Pending Approval: 2, Deprecated: 2
- Adoption rate: 78% (of employees using at least 1 library item)
- Top BSC: Internal Process (42%), Financial (28%), Customer (18%), Learning & Growth (12%)

---

## 5. Business processes & flows

### Browse & Use Library Item

1. User membuka KPI Library -> melihat catalog Published items.
2. User search (autocomplete, min 2 chars) atau filter (KPI type, BSC, function, band jabatan).
3. User toggle Card View / List View.
4. User klik item -> detail panel: definition, formula, unit, polarity, monitoring period, cap type, locked attributes indicator, usage stats, audit trail.
5. User klik "Gunakan Item Ini" -> redirect ke My KPI planning drawer dengan form ter-prefill (locked fields non-editable).

### Submit New Item

1. User (Karyawan/Atasan) klik "+Ajukan Item Baru" dari Library atau dari planning drawer (saat item tidak ditemukan).
2. Isi form: title, description, kpiType, bscPerspective, targetUnit, polarity, monitoringPeriod, capType, formula (optional), evidence requirement (optional), applicable functions, applicable band jabatan.
3. Submit -> status PENDING_VALIDATION; source module recorded.
4. Notification ke Validator.

### Validation Queue

1. Validator (HC Admin) membuka Validation Queue -> melihat items PENDING_VALIDATION.
2. Per item: review details, check similar items warning (system flags items with similar titles).
3. Aksi:
    - **Accept:** status -> VALIDATED -> masuk Approval Queue.
    - **Reject:** notes mandatory -> status DRAFT (submitter can revise); notification ke submitter.
4. SLA monitoring: items pending > 5 days flagged.

### Approval Queue & Publish

1. Approver (PA HO) membuka Approval Queue -> melihat items VALIDATED.
2. Per item: review details + validation history.
3. Approver configures:
    - Fixed Weight (optional preset).
    - Locked Attributes (toggle per attribute: title, polarity, targetUnit, capType, etc.).
    - Cap Type (final confirmation).
4. Aksi:
    - **Publish:** status -> PUBLISHED; available in library catalog.
    - **Reject:** notes mandatory -> notification ke submitter.
    - **Send back to Validation:** notes mandatory -> status PENDING_VALIDATION.

### Deprecate Item

1. PA HO selects published item -> "Nonaktifkan Item".
2. Confirmation: "Item ini digunakan oleh X pekerja. Nonaktifkan?"
3. Status -> DEPRECATED; hidden from browse (existing usages unaffected).

### Analytics Dashboard

1. PA HO membuka Analytics tab -> melihat:
    - Metrics: total, published, pending, deprecated, usage count, adoption rate.
    - Charts: status distribution (donut), submission trend by month (bar), usage by BSC (bar), usage by company (horizontal bar).
    - Top 10 most-used items (table).

---

## 6. User stories

### US-KL-001 - Browse & search library

- **Story:** As a karyawan, I want to browse and search the KPI library so I can find standardized KPI items for my planning.
- **Acceptance criteria:**
    - Default view: Published items only (DEPRECATED hidden per business rule).
    - Search: real-time autocomplete (min 2 chars, max 10 suggestions, case-insensitive, debounce 300ms).
    - Filters combinable (AND logic): KPI type, BSC perspective, applicable function, applicable band jabatan.
    - Card View: grid (3-col desktop), showing code, title, BSC badge, usage count, polarity icon.
    - List View: table, full-width, sortable columns.
    - View toggle with preference persistence.
    - Pagination: 20/50/100 per page.
- **Touches:** KpiDictionaryItem (read where status = PUBLISHED)

### US-KL-002 - View item detail

- **Story:** As a karyawan, I want to see complete details of a library item so I can decide if it fits my KPI needs.
- **Acceptance criteria:**
    - Detail panel (slide-over or page): title, code, description, kpiType, bscPerspective, targetUnit, polarity, monitoringPeriod, formula, capType (with label: "Tanpa Batas" / "Maks 100%" / "Maks 120%" / "Kustom: X%"), locked attributes (lock/unlock icons per attribute), evidence requirement, usage statistics (total users, active this year), metadata (created, published, last updated).
    - Locked attributes visually marked: lock icon + tooltip "Atribut ini tidak dapat diubah saat digunakan."
- **Touches:** KpiDictionaryItem (read), DictionaryUsageRecord (aggregate)

### US-KL-003 - Use item in planning

- **Story:** As a karyawan, I want to use a library item directly in my KPI planning so I save time on data entry.
- **Acceptance criteria:**
    - "Gunakan Item Ini" button on detail panel.
    - Redirect to My KPI planning drawer; form prefilled with library item data.
    - Locked attributes: field disabled + lock icon; unlocked attributes: editable (target, weight).
    - dictionaryItemId linked on created KpiItem; source = LIBRARY.
- **Touches:** KpiDictionaryItem (read), KpiItem (create via My KPI)

### US-KL-004 - Submit new item

- **Story:** As a karyawan or atasan, I want to propose a new KPI item to the library when nothing suitable exists.
- **Acceptance criteria:**
    - Form fields: title (required, unique check async on blur), description (required, max 2000 chars), kpiType (UNIT only), bscPerspective (required), targetUnit (required), polarity (required), monitoringPeriod (required), capType (required), formula (optional), evidence requirement (optional, max 500 chars), applicable functions (min 1), applicable band jabatan (min 1).
    - Entry points: Library page ("+Ajukan Item Baru"), My KPI planning drawer ("Ajukan KPI Baru ke Kamus"), My Team KPI, Performance Tree.
    - Source module auto-tagged based on entry point.
    - Submit -> status PENDING_VALIDATION; toast: "Item KPI berhasil diajukan untuk review."
- **Touches:** KpiDictionaryItem (create)

### US-KL-005 - Validate submitted item

- **Story:** As a validator (HC Admin), I want to review submitted items to ensure they meet quality standards before approval.
- **Acceptance criteria:**
    - Validation Queue tabs: Semua, Menunggu Validasi, Tervalidasi, Ditolak.
    - Per item: title, submitter name, source module badge, submission date, SLA status.
    - Similar items warning: system shows items with >70% title similarity (if any).
    - Accept: status -> VALIDATED; reject: notes mandatory, status -> DRAFT, notification to submitter.
    - SLA badge: items > 5 days pending flagged "Segera Review".
- **Touches:** KpiDictionaryItem (update status), DictionaryValidationRecord (create)

### US-KL-006 - Approve & publish item

- **Story:** As an approver (PA HO), I want to review validated items, configure governance settings, and publish them to the library.
- **Acceptance criteria:**
    - Approval Queue tabs: Semua, Menunggu Persetujuan, Disetujui, Ditolak.
    - Per item: full detail + validation history (validator name, action, notes, date).
    - Configuration panel: Fixed Weight toggle + input, Locked Attributes toggles per attribute (title, polarity, targetUnit, bscPerspective, monitoringPeriod, capType), Cap Type confirmation.
    - Publish: status -> PUBLISHED; toast "Item berhasil dipublikasikan ke Kamus KPI."
    - Reject: notes mandatory; Send back to Validation: notes mandatory.
- **Touches:** KpiDictionaryItem (update), DictionaryApprovalRecord (create)

### US-KL-007 - Deprecate item

- **Story:** As a PA HO, I want to deprecate an outdated library item so it no longer appears in the catalog.
- **Acceptance criteria:**
    - "Nonaktifkan" action on published item detail.
    - Confirmation dialog showing current usage count: "Item ini digunakan oleh X pekerja aktif. Nonaktifkan?"
    - Status -> DEPRECATED; hidden from browse; existing KPI items using this dictionary reference are unaffected.
    - Toast: "Item berhasil dinonaktifkan."
- **Touches:** KpiDictionaryItem (update status, deprecatedAt)

### US-KL-008 - View analytics dashboard

- **Story:** As a PA HO, I want to see library usage analytics so I can assess adoption and identify gaps.
- **Acceptance criteria:**
    - Metrics cards: Total Items, Published, Pending, Deprecated, Total Usage Count, Adoption Rate (%).
    - Charts: Status distribution (donut), Submission trend by month (bar), Usage by BSC perspective (bar), Usage by company (horizontal bar).
    - Top 10 most-used items (table: rank, code, title, usage count, BSC).
    - Active vs historical usage split.
    - Validation and approval SLA aging view (items pending > threshold).
- **Touches:** KpiDictionaryItem (aggregate), DictionaryUsageRecord (aggregate)

---

## 7. Screen / flow coverage map

- **Library Browser (Card/List)** -> US-KL-001
- **Item Detail Panel** -> US-KL-002, US-KL-003
- **Submit New Item Form** -> US-KL-004
- **Validation Queue** -> US-KL-005
- **Approval Queue + Config Panel** -> US-KL-006
- **Deprecate Confirmation Dialog** -> US-KL-007
- **Analytics Dashboard** -> US-KL-008

---

## 8. Content & terminology

- **Preferred terms:** "Kamus KPI" (bukan "KPI Library" di UI), "Ajukan Item Baru" (submit), "Nonaktifkan" (deprecate), "Atribut Terkunci" (locked attributes), "Bobot Tetap" (fixed weight)
- **Cap Type labels:** NO_CAP -> "Tanpa Batas", CAPPED_100 -> "Maks 100%", CAPPED_120 -> "Maks 120%", CUSTOM -> "Kustom: X%"
- **Source module badges:** DIRECT -> "Langsung", MY_PERFORMANCE -> "My KPI", MY_TEAM_PERFORMANCE -> "My Team KPI", PERFORMANCE_TREE -> "KPI Tree"
- **SLA label:** > 5 days -> "Segera Review" (amber badge)

---

## 9. Open questions

- Apakah karyawan bisa submit item baru, atau hanya atasan ke atas? (Sementara: karyawan dan atasan bisa submit)
- Apakah similar item check otomatis atau manual? (Sementara: otomatis dengan title similarity > 70%)
- Berapa SLA hari untuk validation dan approval? (Sementara: 5 hari kerja masing-masing)
- Apakah deprecated items bisa di-reactivate? (Sementara: tidak di MVP; buat item baru)