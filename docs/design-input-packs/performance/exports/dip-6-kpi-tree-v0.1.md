# Design Input Pack: Rinjani Performance - KPI Tree

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

- **Problem:** Organisasi membutuhkan visibility atas seluruh hierarki KPI dari level corporate/impact hingga individu, untuk memastikan alignment antar level, mendeteksi gap atau duplikasi, serta mengelola KPI Bersama dan bulk operations.
- **Target outcome:** Satu tampilan tree yang bisa di-browse berdasarkan organisasi atau hierarki KPI, dengan kemampuan admin untuk mengelola KPI Bersama, configure capping per item, bulk upload, link/unlink dictionary items, dan melihat cascade health analytics.
- **MVP scope:** Organization view (browse by company/region/unit), KPI hierarchy view (Impact->Output->KAI), position detail panel (portfolio, ownership, achievement, risk), admin management (KPI Bersama assignment, per-item capping, link/unlink dictionary, CRUD KPI items, bulk upload with dry run, change log), tree analytics (target setting progress, cascade health, alignment gaps, unallocated counts, ownership distribution), export for review forum.
- **Non-goals:** Employee self-service (My KPI handles that), approval workflows (My Team KPI handles that), period/weight configuration (HQ handles that), calibration.

---

## 2. Personas & access

| **Persona** | **Goals** | **Can** | **Cannot** |
| --- | --- | --- | --- |
| **HC Admin** (primary) | Mengelola alignment KPI dan master data KPI across organization | Browse full tree (own company scope); view position detail; manage KPI Bersama assignment; configure per-item capping; link/unlink dictionary; create/edit KPI items; bulk upload with dry run; view change log; view tree analytics; export tree | View other company trees (HC Admin HO scope); configure global HQ settings; approve employee planning |
| **HC Admin HO** (elevated) | Oversight seluruh hierarki KPI lintas company | Semua kemampuan HC Admin + browse all company trees; cross-company analytics | Approve employee planning; input realisasi |
| **Executive** (read-only) | Melihat KPI Bersama dan cascade alignment sampai level bawah | Browse tree (read-only); view position detail; view alignment warnings | Edit anything; manage items; bulk upload; export |
| **Atasan** (limited) | Melihat posisi dan KPI tim dalam konteks lebih luas | Browse tree (team scope); view position detail for subordinates | Edit items via tree; bulk upload; manage KPI Bersama |

---

## 3. Domain model (semantic)

**Same core model as previous DIPs.** Key entities for this slice:

- **Organization:** `id`, `name`, `type` (COMPANY|DIREKTORAT|DIVISI|UNIT), `parentOrgId?`, `tier` (1|2|3), `regionCode?`
- **Position:** `positionMasterId`, `positionMasterVariantId`, `title`, `organizationId`, `bandJabatan`, `jobType`, `incumbentEmployeeNumber?`, `incumbentName?`
- **KpiItem** (with parent-child hierarchy and ownership)
- **CascadeRelation** (direct/indirect, accumulation flag)
- **KpiOwnership** (Owner/Collaborator/Shared Owner per position)
- **KpiDictionaryItem** (linked via dictionaryItemId)
- **BulkUploadJob:** `id`, `uploadedBy`, `fileName`, `status` (VALIDATING|VALIDATION_COMPLETE|IMPORTING|COMPLETE|FAILED), `totalRows`, `validRows`, `errorRows`, `errorDetails[]`, `createdAt`, `completedAt?`
- **KpiChangeLog:** `id`, `kpiItemId?`, `positionId?`, `changeType` (ITEM_CREATED|ITEM_UPDATED|ITEM_DELETED|OWNERSHIP_CHANGED|WEIGHT_CHANGED|TARGET_CHANGED|CAP_CHANGED|DICTIONARY_LINKED|DICTIONARY_UNLINKED|BULK_UPLOADED), `changedBy`, `oldValue` (json), `newValue` (json), `createdAt`

**Tree-specific derived models:**

- **OrgTreeNode:** `organizationId`, `name`, `type`, `childNodes[]`, `positionCount`, `kpiCount`, `pendingApprovalCount`
- **PositionTreeNode:** `positionMasterVariantId`, `title`, `incumbentName?`, `kpiItems[]`, `ownershipSummary`, `achievementSummary`, `riskStatus` (ON_TRACK|AT_RISK|OVERDUE|NO_DATA)
- **AlignmentWarning:** `id`, `type` (ORPHAN_KPI|MISSING_PARENT|DUPLICATE_SUSPECTED|WEIGHT_MISMATCH|UNALLOCATED), `affectedItemId`, `affectedPositionId`, `description`

---

## 4. Reference dataset

**Organization Hierarchy (InJourney sample)**

- InJourney Group (Holding) - Tier 1
    - Direktorat Human Capital
        - Divisi HC Strategy
            - VP HC Strategy - Dimas Sayyid (260101)
                - Group Head HC Planning - Binavia Wardhani (260102)
                - Group Head HC Policy - Fajar Nugraha (260103)
                - Group Head Org Development - Sinta Maharani (260104)
    - PT InJourney Airports (AP I) - Tier 1
    - PT InJourney Travel (ITDC) - Tier 2

**KPI Hierarchy (Impact -> Output -> Unit)**

- `KPI-IMP-001` "Corporate Revenue" (Impact, Holding) - target: 15T IDR
    - `KPI-VP-001` "Talent Acquisition Excellence" (Output, Dimas) - DIRECT cascade
        - `KPI-U-001` "HC Analytics Dashboard Completion" (Unit, Binavia) - INDIRECT cascade
    - `KPI-VP-010` "HC Policy Compliance Rate" (Output, Dimas) - DIRECT cascade
        - `KPI-U-004` (Binavia) - DIRECT, accumulation: false
        - `KPI-FN-001` "Policy Document Completion" (Fajar) - INDIRECT

**Alignment Warnings (sample)**

- ORPHAN_KPI: KPI-U-003 (Binavia, "Time-to-Fill") has no parent alignment
- UNALLOCATED: Position "Senior Officer 1 HC Planning" has 0 KPI items assigned

**Bulk Upload Job (sample)**

- `UPL-001` - fileName: "KPI_Batch_Q1_2026.xlsx", status: VALIDATION_COMPLETE, totalRows: 45, validRows: 42, errorRows: 3, errorDetails: [{row: 12, error: "Position ID not found"}, {row: 28, error: "Duplicate KPI title for same position"}, {row: 41, error: "Weight exceeds 40%"}]

**Tree Analytics Summary**

- Target setting progress: 78% positions complete
- Cascade health: 85% items have valid parent alignment
- Alignment gaps: 12 orphan KPIs, 5 unallocated positions
- Ownership distribution: 92% Owner, 5% Shared Owner, 3% Collaborator

---

## 5. Business processes & flows

### Browse Organization & KPI Hierarchy

1. Admin membuka KPI Tree -> default: Organization View.
2. Navigasi: Company -> Direktorat -> Divisi -> Unit -> Position.
3. Per node: position count, KPI count, pending approval count.
4. Toggle ke KPI Hierarchy View: Impact -> Output -> KAI tree structure.
5. Cascade indicators: DIRECT (solid line), INDIRECT (dashed line).
6. Alignment warnings: red badge on nodes with issues.
7. Drill down: click node -> expand children or open Position Detail Panel.

### Position Detail Panel

1. Click position node -> slide-over panel.
2. Content: position title, incumbent name, band jabatan, KPI portfolio (all items), ownership per item (Owner/Collaborator/Shared Owner), achievement indicators (if monitoring data available), risk status.
3. Actions (admin only): edit item, create new item, link/unlink dictionary.

### Manage KPI Bersama (Admin via Tree - per F-03 delta)

1. Admin navigates to position in tree.
2. "Kelola KPI Bersama" action -> shows KPI Bersama items assignable to this position.
3. Admin assigns/removes KPI Bersama items for this position variant.
4. Changes propagate: item appears/disappears in employee's portfolio (as read-only).

### Configure Per-Item Capping (via Tree - per F-06 delta)

1. Admin opens position detail -> selects KPI item.
2. "Atur Cap Realisasi" action -> configure capType for this specific item (overrides global default).
3. Options: NO_CAP, CAPPED_100, CAPPED_120, CUSTOM (input value).
4. Change logged in audit trail.
5. **Note:** This is typically done by KPI Dictionary creator, not admin HQ.

### Bulk Upload KPI

1. Admin klik "Upload KPI" -> download template (.xlsx).
2. Template columns: Position Master ID, KPI Title, KPI Type, Target, Target Unit, Polarity, Weight, Monitoring Period, Cap Type.
3. Admin fills template and uploads.
4. **Dry Run (validation):** system validates all rows: checks position ID exists, no duplicate titles per position, weight within limits, required fields present.
5. Validation result shown: valid rows (green), error rows (red with detail per row).
6. Admin reviews errors, fixes template if needed, re-uploads.
7. **Final Import:** admin confirms -> items created as ALLOCATED per position.
8. Upload job status tracked: VALIDATING -> VALIDATION_COMPLETE -> IMPORTING -> COMPLETE.

### Link / Unlink Dictionary Items

1. Admin opens position detail -> selects KPI item without dictionary link.
2. "Hubungkan ke Kamus KPI" -> search library -> select matching item.
3. Link created: locked attributes from dictionary applied; source updated to LIBRARY.
4. Unlink: "Putuskan Hubungan Kamus" -> item becomes CUSTOM; locked attributes released.

### Tree Analytics

1. Admin opens Analytics tab within KPI Tree.
2. Metrics: target setting progress (% positions complete), cascade health summary (% items with valid parent), alignment gap counts (orphans, unallocated), ownership distribution (pie/donut).
3. Drill-down: click metric -> filtered list of affected positions/items.

---

## 6. User stories

### US-KT-001 - Browse organization hierarchy

- **Story:** As an HC Admin, I want to browse the organization tree so I can navigate to specific positions and their KPIs.
- **Acceptance criteria:**
    - Tree view: expandable/collapsible nodes per org level.
    - Per node: name, type badge, position count, KPI count.
    - Filter by company, region, or unit.
    - Search position by name or employee name.
- **Touches:** Organization (read), Position (read)

### US-KT-002 - View KPI hierarchy

- **Story:** As an HC Admin, I want to see the KPI parent-child hierarchy so I can verify alignment from corporate to individual.
- **Acceptance criteria:**
    - Tree view: Impact -> Output -> KAI structure.
    - Lines: solid for DIRECT cascade, dashed for INDIRECT.
    - Per node: KPI title, owner name, achievement % (if available), risk badge.
    - Alignment warning badges on nodes with issues.
    - Drill down parent -> child with breadcrumb.
- **Touches:** KpiItem (read), CascadeRelation (read), AlignmentWarning (derived)

### US-KT-003 - View position detail

- **Story:** As an HC Admin, I want to see a position's complete KPI portfolio and ownership details.
- **Acceptance criteria:**
    - Slide-over panel: position title, incumbent, band jabatan, org unit.
    - KPI list: title, type, weight, target, status, ownership type badge (Owner/Collaborator/Shared Owner), achievement %, risk status.
    - Dictionary link indicator per item.
- **Touches:** Position (read), KpiItem (read), KpiOwnership (read)

### US-KT-004 - Manage KPI Bersama via Tree

- **Story:** As an HC Admin, I want to assign and remove KPI Bersama items for positions through the tree so I can manage corporate KPI distribution.
- **Acceptance criteria:**
    - "Kelola KPI Bersama" button on position detail.
    - Modal: list of available KPI Bersama items (from central definition) with assign/remove toggles.
    - Save -> items added/removed from position's portfolio as read-only.
    - Confirmation: "Tambahkan 2 KPI Bersama ke posisi Group Head HC Planning?"
- **Touches:** KpiItem (create/delete for position), KpiOwnership (create/delete)

### US-KT-005 - Configure per-item capping

- **Story:** As an HC Admin or dictionary creator, I want to configure the realization cap for a specific KPI item so operational KPIs are appropriately limited.
- **Acceptance criteria:**
    - "Atur Cap Realisasi" action on KPI item in position detail.
    - Options: NO_CAP ("Tanpa Batas"), CAPPED_100 ("Maks 100%"), CAPPED_120 ("Maks 120%"), CUSTOM (input: "Maks X%").
    - Current setting shown; change requires confirmation.
    - Change log entry created automatically.
    - Overrides global default from HQ; item-level cap takes precedence.
- **Touches:** KpiItem (update capType), KpiChangeLog (create)

### US-KT-006 - Bulk upload KPI

- **Story:** As an HC Admin, I want to upload KPI items in bulk so I can efficiently distribute items from workshop results.
- **Acceptance criteria:**
    - Download template button (.xlsx).
    - Upload file -> automatic validation (dry run).
    - Validation result table: row number, status (valid/error), error message per row.
    - Summary: "42 valid, 3 errors. Perbaiki error sebelum import."
    - Fix & re-upload or proceed with valid rows only.
    - Final import confirmation -> items created as ALLOCATED.
    - Job status tracking: VALIDATING -> VALIDATION_COMPLETE -> IMPORTING -> COMPLETE/FAILED.
- **Touches:** BulkUploadJob (create/update), KpiItem (batch create), KpiOwnership (batch create)

### US-KT-007 - Link / unlink dictionary items

- **Story:** As an HC Admin, I want to link KPI items to the dictionary so standardized attributes are enforced.
- **Acceptance criteria:**
    - "Hubungkan ke Kamus KPI" on item without dictionary link.
    - Search library -> select matching item -> preview locked attributes that will apply.
    - Link confirmed -> locked attributes enforced; source updated to LIBRARY.
    - "Putuskan Hubungan Kamus" -> confirmation -> locked attributes released; source updated to CUSTOM.
    - Change log entry for both link and unlink.
- **Touches:** KpiItem (update dictionaryItemId, source), KpiChangeLog (create)

### US-KT-008 - View tree analytics

- **Story:** As an HC Admin, I want to see tree-level analytics so I can identify alignment issues and track coverage.
- **Acceptance criteria:**
    - Metrics cards: Target Setting Progress (%), Cascade Health (%), Alignment Gaps (count), Unallocated Positions (count).
    - Charts: ownership distribution (donut), alignment gap types (bar).
    - Drill-down: click metric -> filtered list.
    - Summary exportable as PDF/Excel.
- **Touches:** KpiItem (aggregate), CascadeRelation (aggregate), AlignmentWarning (aggregate)

### US-KT-009 - Export tree

- **Story:** As an HC Admin, I want to export the KPI tree so I can present it in review forums.
- **Acceptance criteria:**
    - Export formats: Excel (.xlsx) with hierarchy preserved, PDF summary.
    - Scope: current filtered view (by company/unit) or full tree.
    - Includes: position, KPI title, type, weight, target, owner, cascade method, achievement (if available).
- **Touches:** KpiItem (read), CascadeRelation (read), Position (read)

---

## 7. Screen / flow coverage map

- **Organization Tree View** -> US-KT-001
- **KPI Hierarchy Tree View** -> US-KT-002
- **Position Detail Panel** -> US-KT-003, US-KT-004, US-KT-005, US-KT-007
- **Manage KPI Bersama Modal** -> US-KT-004
- **Cap Configuration Dialog** -> US-KT-005
- **Bulk Upload Wizard (template + validation + import)** -> US-KT-006
- **Link/Unlink Dictionary Dialog** -> US-KT-007
- **Tree Analytics Dashboard** -> US-KT-008
- **Export Dialog** -> US-KT-009

---

## 8. Content & terminology

- **Preferred terms:** "Pohon KPI" (KPI Tree di UI), "Penurunan Langsung" / "Penurunan Tidak Langsung" (cascade types), "Kelola KPI Bersama" (manage assignment), "Atur Cap Realisasi" (configure capping), "Hubungkan ke Kamus" / "Putuskan Hubungan" (link/unlink), "Upload Massal" (bulk upload)
- **Alignment warning labels:** ORPHAN_KPI -> "KPI Tanpa Induk", MISSING_PARENT -> "Induk Tidak Ditemukan", DUPLICATE_SUSPECTED -> "Kemungkinan Duplikasi", WEIGHT_MISMATCH -> "Bobot Tidak Sesuai", UNALLOCATED -> "Belum Dialokasikan"
- **Risk labels:** Same as DIP 4

---

## 9. Open questions

- Apakah tree perlu mendukung drag-and-drop untuk reassign KPI antar position? (Sementara: tidak di MVP; gunakan manual assign)
- Berapa level kedalaman tree yang perlu di-render sekaligus? (Sementara: lazy load per 2 levels)
- Apakah export perlu include achievement data? (Sementara: ya, jika monitoring phase aktif)
- Apakah bulk upload mendukung update existing items atau hanya create? (Sementara: create only; update via individual edit)