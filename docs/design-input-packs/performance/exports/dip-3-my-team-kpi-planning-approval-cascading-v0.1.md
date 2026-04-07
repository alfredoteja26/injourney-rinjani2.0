# Design Input Pack: Rinjani Performance - My Team KPI Planning Approval & Cascading

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

- **Problem:** Atasan langsung perlu mereview dan menyetujui rencana KPI bawahan, menurunkan KPI (cascade) ke tim, dan memantau progres perencanaan keseluruhan bawahan selama planning phase.
- **Target outcome:** Atasan dapat menyelesaikan seluruh aktivitas planning manajerial: melihat progres planning bawahan, review portfolio bawahan, approve/reject/clarify, initiate goal setting (Path B), cascade KPI (direct/indirect), configure accumulation, dan batch approve.
- **MVP scope:** Planning progress overview bawahan, approval queue, review subordinate portfolio, approve/reject/clarify, initiate Path B goal setting, cascade KPI dengan direct/indirect method, set target per subordinate, configure accumulation flag, batch approve.
- **Non-goals:** Monitoring & verification (DIP 4), year-end assessment, admin HQ configuration, KPI Tree, KPI Library governance.

---

## 2. Personas & access

| **Persona** | **Goals** | **Can** | **Cannot** |
| --- | --- | --- | --- |
| **Atasan Langsung** (primary) | Memastikan seluruh bawahan memiliki rencana KPI yang aligned dan disetujui tepat waktu | View team planning progress; review subordinate portfolio; approve/reject/request clarification; initiate goal setting for subordinate (Path B); cascade KPI (direct/indirect); set target per subordinate; configure accumulation flag; batch approve | Edit subordinate KPI items langsung (hanya approve/reject); manage KPI Library; configure HQ settings; view KPI Tree full (admin scope) |
| **Karyawan** (secondary, responding) | Merespons review dan cascaded items dari atasan | Receive cascaded KPI; respond to WAITING_REVIEW items (revise or submit to approval) | Approve own items; cascade to others (kecuali jika juga atasan) |

---

## 3. Domain model (semantic)

**Same domain model as DIP 1** (My KPI - Planning & Goal Setting). Key entities for this slice:

- **Employee** (with team relationship: `directReports[]` via `directSupervisorId`)
- **KpiItem** (with `itemApprovalStatus` state machine)
- **KpiOwnership** (with `ownershipType` and `weightApprovalStatus`)
- **CascadeRelation** (with `cascadeMethod` and `accumulationEnabled`)
- **BandKpiFormula** (per subordinate's `bandJabatan`)
- **KpiDictionaryItem** (for cascade from library items)

Additional entity for team planning view:

- **TeamPlanningStatus:** (derived, not persisted) per subordinate: `employeeNumber`, `totalItems`, `itemsApproved`, `itemsDraft`, `itemsAllocated`, `totalWeightBersama`, `totalWeightUnit`, `weightValid` (bool), `portfolioStatus` (NOT_STARTED|IN_PROGRESS|SUBMITTED|APPROVED|PARTIAL_APPROVED)

---

## 4. Reference dataset

**Atasan (primary user for this slice)**

- `260101` - Dimas Sayyid, VP Human Capital Strategy, Band Utama, STRUKTURAL

**Direct Reports (3 Group Heads)**

- `260102` - Binavia Wardhani, Group Head HC Planning & Analytics, Band Madya, STRUKTURAL
    - Portfolio: 6 items (2 Bersama + 4 Unit), status: WAITING_FOR_APPROVAL, weightValid: true
- `260103` - Fajar Nugraha, Group Head HC Policy & Governance, Band Madya, STRUKTURAL
    - Portfolio: 5 items (2 Bersama + 3 Unit), status: IN_PROGRESS, weightValid: false (Unit total: 55%, should be 60%)
- `260104` - Sinta Maharani, Group Head Org Development, Band Madya, STRUKTURAL
    - Portfolio: 4 items (2 Bersama + 2 Unit), status: NOT_STARTED, weightValid: false

**Dimas's KPI Items (available for cascade)**

- `KPI-VP-001` - title: "Talent Acquisition Excellence", kpiType: UNIT, targetType: PROGRESSIVE, targetUnit: "%", polarity: POSITIVE, monitoringPeriod: QUARTERLY, weight: 20%
- `KPI-VP-010` - title: "HC Policy Compliance Rate", kpiType: UNIT, targetType: FIXED, targetValue: 95, targetUnit: "%", polarity: POSITIVE, monitoringPeriod: ANNUAL, weight: 15%

**Cascade Relations (existing)**

- `KPI-VP-010` -> `KPI-U-004` (Binavia), method: DIRECT, accumulation: false

**Pending Approval Items (Binavia's submission)**

- KPI-B-001: "Customer Satisfaction Index", status: WAITING_FOR_APPROVAL, weight: 25%
- KPI-B-002: "Revenue Growth", status: WAITING_FOR_APPROVAL, weight: 15%
- KPI-U-001: "HC Analytics Dashboard Completion", status: WAITING_FOR_APPROVAL, weight: 20%
- KPI-U-002: "Workforce Planning Accuracy", status: WAITING_FOR_APPROVAL, weight: 15%
- KPI-U-003: "Time-to-Fill Critical Positions", status: WAITING_FOR_APPROVAL, weight: 15%
- KPI-U-004: "HC Policy Compliance Rate", status: WAITING_FOR_APPROVAL, weight: 10%

---

## 5. Business processes & flows

### Planning Approval - Review & Approve

1. Atasan membuka My Team KPI -> melihat Planning Progress Overview.
2. Setiap bawahan ditampilkan sebagai card: nama, posisi, jumlah item, status portfolio, weight validity.
3. Atasan meng-klik bawahan yang status-nya SUBMITTED/WAITING_FOR_APPROVAL.
4. Sistem menampilkan portfolio bawahan: semua item KPI dengan detail (title, type, weight, target, source, status).
5. Atasan mereview dan memilih aksi:
    - **Approve:** Seluruh portfolio atau per item -> status APPROVED.
    - **Approve with Adjustment:** Atasan mengubah target/weight minor -> status APPROVED_ADJUSTED (perubahan tercatat di audit trail).
    - **Reject:** Wajib isi alasan -> status REJECTED; bawahan bisa revise & resubmit.
    - **Request Clarification:** Wajib isi pertanyaan -> status PENDING_CLARIFICATION; bawahan merespons lalu submit ulang.
6. Setelah approval, notification ke bawahan.

**Variations:**

- Batch approve: atasan memilih beberapa bawahan sekaligus -> approve all yang sudah valid.
- Jika weight tidak valid pada portfolio bawahan: approve diblokir; warning ditampilkan.

### Planning - Initiate Goal Setting for Subordinate (Path B)

1. Atasan membuka My Team KPI -> pilih bawahan.
2. Atasan klik "Susun KPI untuk Bawahan".
3. Atasan mengisi draft KPI items untuk bawahan (dari Library atau custom).
4. Submit -> item masuk ke portfolio bawahan dengan status WAITING_REVIEW.
5. Bawahan merespons:
    - **Kembali ke Draft (REVISE):** bawahan edit lalu submit sendiri.
    - **Submit ke Approval:** langsung ke WAITING_FOR_APPROVAL.

### KPI Cascading

1. Atasan membuka My Team KPI -> pilih KPI dari portfolio sendiri untuk di-cascade.
2. Pilih method:
    - **Direct Cascade:** Target dan unit sama dengan parent; unit locked.
    - **Indirect Cascade:** Kontribusi terkait tapi unit/judul boleh berbeda.
3. Pilih bawahan (satu atau beberapa).
4. Set target per bawahan (bisa berbeda antar bawahan).
5. Configure accumulation flag (hanya untuk direct cascade yang kompatibel).
6. Submit cascade -> item muncul di portfolio bawahan sebagai ALLOCATED.

**Variations:**

- Jika bawahan sudah mencapai max KPI items: warning muncul, cascade tidak dibuat.
- Accumulation hanya bisa diaktifkan jika unit parent dan child sama.
- Atasan bisa mengubah judul child item pada direct cascade (misal: "Region A", "Region B").

---

## 6. User stories

### US-MT-001 - View team planning progress

- **Story:** As an atasan, I want to see the planning progress of all my subordinates so I can identify who needs attention.
- **Acceptance criteria:**
    - Team overview: cards per subordinate showing name, position, band jabatan, portfolio status, item count, weight validity.
    - Status indicators: NOT_STARTED (gray), IN_PROGRESS (yellow), SUBMITTED (blue), APPROVED (green), PARTIAL_APPROVED (orange).
    - Weight validity badge: valid (green check) or invalid (red warning with detail: "Unit: 55%/60%").
    - Sort by: status (submitted first), name.
    - Filter by: status.
- **Touches:** Employee (read directReports), KpiOwnership (read), TeamPlanningStatus (derived)
- **States:** All subordinates not started | Mixed progress | All submitted | All approved

### US-MT-002 - Review subordinate portfolio

- **Story:** As an atasan, I want to review a subordinate's complete KPI portfolio so I can assess alignment and quality.
- **Acceptance criteria:**
    - Full portfolio view: all items grouped by KPI type (Bersama / Unit).
    - Per item: title, type badge, weight, target (with type: fixed/progressive), polarity, source badge, cascade badge (if applicable), status.
    - Running weight totals shown (same as employee view).
    - Dual weight display: item weight + type weight + PI contribution.
    - Side-by-side comparison with atasan's own KPI (for alignment check).
- **Touches:** KpiItem (read), KpiOwnership (read), CascadeRelation (read)

### US-MT-003 - Approve / reject / clarify

- **Story:** As an atasan, I want to approve, reject, or request clarification on my subordinate's KPI plan.
- **Acceptance criteria:**
    - **Approve:** Confirmation dialog -> status APPROVED; notification to subordinate.
    - **Approve with Adjustment:** Edit target/weight inline -> status APPROVED_ADJUSTED; changes logged in audit trail; notification with adjustment details.
    - **Reject:** Notes field mandatory (min 10 chars) -> status REJECTED; notification with rejection reason.
    - **Request Clarification:** Notes field mandatory -> status PENDING_CLARIFICATION; notification with question.
    - Approve blocked if subordinate's weight totals are invalid.
- **Touches:** KpiItem (update status), KpiOwnership (update weightApprovalStatus)
- **States:** Reviewable | Approved | Rejected | Pending Clarification

### US-MT-004 - Initiate goal setting for subordinate (Path B)

- **Story:** As an atasan, I want to draft KPI items for my subordinate so I can guide their planning.
- **Acceptance criteria:**
    - "Susun KPI untuk Bawahan" button on subordinate card.
    - Draft KPI form (same fields as employee draft): from Library, custom, or from atasan's own portfolio.
    - Multiple items can be drafted in sequence.
    - Submit -> items appear in subordinate's portfolio as WAITING_REVIEW.
    - Subordinate receives notification: "Atasan Anda telah menyusun rencana KPI untuk review Anda."
- **Touches:** KpiItem (create), KpiOwnership (create for subordinate)

### US-MT-005 - Cascade KPI to subordinates

- **Story:** As an atasan, I want to cascade my KPI items to subordinates so organizational goals are aligned.
- **Acceptance criteria:**
    - Select KPI from own portfolio -> "Cascade ke Bawahan" action.
    - Choose method: Direct (label: "Penurunan Langsung") or Indirect (label: "Penurunan Tidak Langsung").
    - Select subordinates (multi-select checkboxes).
    - Per subordinate: set target value (required).
    - For Direct cascade: unit field locked (same as parent); title editable (for context: "Region A").
    - For Indirect cascade: all fields editable.
    - Submit -> items created as ALLOCATED in each subordinate's portfolio.
    - Cascade badge and parent reference shown on child items.
- **Touches:** KpiItem (create children), CascadeRelation (create), KpiOwnership (create per subordinate)
- **States:** Selecting subordinates | Setting targets | Confirmed

### US-MT-006 - Configure accumulation flag

- **Story:** As an atasan, I want to configure whether child realizations accumulate to the parent KPI score.
- **Acceptance criteria:**
    - Toggle: "Akumulasi Realisasi dari Bawahan" (only for DIRECT cascade).
    - Disabled (with tooltip) for INDIRECT cascade.
    - Disabled if child unit differs from parent unit.
    - When enabled: parent realization = sum/average of child realizations (configurable).
    - Warning if some children have incompatible target types.
- **Touches:** CascadeRelation (update accumulationEnabled)

### US-MT-007 - Batch approve

- **Story:** As an atasan, I want to approve multiple subordinates' plans at once so I can process approvals efficiently.
- **Acceptance criteria:**
    - Checkbox selection on team overview cards.
    - "Approve Terpilih" button (enabled when >= 1 selected with valid weights and SUBMITTED status).
    - Confirmation dialog showing count: "Approve rencana KPI untuk 2 bawahan?"
    - Result summary: "2 berhasil, 0 gagal".
    - Subordinates with invalid weights excluded from batch selection (disabled checkbox with tooltip).
- **Touches:** KpiItem (batch update status), KpiOwnership (batch update)

---

## 7. Screen / flow coverage map

- **Team Planning Progress Overview** -> US-MT-001
- **Subordinate Portfolio Review** -> US-MT-002, US-MT-003
- **Approval Action Bar** -> US-MT-003, US-MT-007
- **Draft KPI for Subordinate Drawer** -> US-MT-004
- **Cascade KPI Drawer** -> US-MT-005, US-MT-006
- **Batch Approve Toolbar** -> US-MT-007

---

## 8. Content & terminology

Same as DIP 1, plus:

- **Preferred terms:** "Penurunan Langsung" (Direct Cascade), "Penurunan Tidak Langsung" (Indirect Cascade), "Akumulasi Realisasi" (Accumulation), "Susun KPI untuk Bawahan" (Path B initiation), "Approve Terpilih" (Batch Approve)
- **Forbidden terms:** "Cascading" di UI (gunakan "Penurunan KPI"); "Top-Down" (terlalu generik)

---

## 9. Open questions

- Apakah atasan bisa cascade KPI ke bawahan yang bukan direct report? (Sementara: hanya direct reports)
- Apakah atasan bisa melihat cascading tree multi-level di view ini? (Sementara: hanya 1 level; multi-level di KPI Tree)
- Apakah ada limit jumlah subordinate yang bisa di-batch approve sekaligus? (Sementara: tidak ada limit)
- Bagaimana handling jika atasan juga punya atasan (multi-level approval)? (Sementara: 1 level approval saja; second layer via HC Admin jika policy aktif)