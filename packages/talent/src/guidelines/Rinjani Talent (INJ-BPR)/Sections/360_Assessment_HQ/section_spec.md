# 360 Assessment HQ Specification

## Overview

360 Assessment HQ is an administration tab within **Talent Headquarter** that enables HC Admins and Member Admins to manage the full lifecycle of 360-degree assessments. The tab consolidates cycle management, instrument/template creation, assessor assignment, completion monitoring, and analytics into a single administrative interface.

Key capabilities:

- Create and manage assessment cycles with configurable channels and weights
- Build assessment instruments with competency-mapped questions and Likert scales
- Manage assessor assignments (auto-generate from ReportingLine or manual override)
- Monitor completion rates across cycles in real-time
- View assessment analytics and reports
- Upload bulk assessment data and manage supervisor changes (Ganti Atasan)

---

## User Flows / Use Cases

### 1. View Assessment Cycle List

- **Actor:** HC Admin / Member Admin
- **Preconditions:** User has admin role; Talent Headquarter is accessible
- **Main Flow:**
    1. Admin navigates to Talent Headquarter > 360 Assessment tab
    2. System displays assessment cycles in tabbed view: Aktif, Dashboard, Arsip
    3. Aktif tab shows cycles with status active/configuring/assigning
    4. Dashboard tab shows cycles with status scoring/validated/published
    5. Arsip tab shows cycles with status closed/archived
    6. Each row shows: Judul, Peserta (count), Jenis, Pembuat, Status
    7. Admin can search by cycle name
- **Postconditions:** Admin sees all assessment cycles organized by lifecycle stage
- **Acceptance Criteria:**
    - Three sub-tabs correctly filter cycles by status groups
    - Cycle count shown per tab
    - Search works across all tabs
    - Empty state per tab when no cycles match

### 2. Create Assessment Cycle (3-Step Wizard)

- **Actor:** HC Admin / Member Admin
- **Preconditions:** At least one AssessmentInstrument exists
- **Main Flow:**
    1. Admin clicks "Buat Assessment"
    2. **Step 1: Informasi Assessment**
        - Admin fills: Judul, Pembuat (auto-filled), Jenis Assessment (behavioral/competency/custom), Tanggal Mulai, Tanggal Selesai, Hasil Valid Hingga (optional)
        - Admin configures evaluator channels: Atasan (count + bobot), Rekan Kerja (count + bobot), Bawahan (count + bobot), Diri Sendiri (count + bobot)
        - Total bobot must equal 100%
        - Admin selects assessor assignment method: Otomatis or Manual
        - Admin selects anonymity policy: Anonim or Teridentifikasi
    3. **Step 2: Penilaian (Select Instrument)**
        - Admin selects existing instrument or creates new one
        - System shows instrument preview with question count and scale info
    4. **Step 3: Pertanyaan (Review/Edit Questions)**
        - System displays all questions from selected instrument
        - Admin can add, edit, remove, reorder questions
        - Each question shows: Kompetensi, Perilaku Inti, Teks Pertanyaan, Bobot Soal
        - "Sama ratakan bobot" toggle available
        - Total bobot soal must equal 100%
    5. Admin clicks "Simpan" to create cycle in draft status
- **Postconditions:** AssessmentCycle created with status draft; AssessmentInstrument linked
- **Acceptance Criteria:**
    - Wizard enforces step-by-step progression (cannot skip steps)
    - Channel weight validation: total must equal 100%
    - Question weight validation: total must equal 100%
    - "Sama ratakan bobot" distributes weight equally across all questions
    - Back navigation preserves entered data
    - Draft cycle appears in Aktif tab

### 3. Manage Assessment Instruments/Templates

- **Actor:** HC Admin / Member Admin
- **Preconditions:** Admin has instrument management access
- **Main Flow:**
    1. Admin accesses instrument management (from cycle wizard Step 2 or standalone)
    2. System displays list of instruments with: Nama, Jenis, Jumlah Pertanyaan, Skala, Status Template
    3. Admin can create new instrument or duplicate existing template
    4. Instrument editor shows:
        - Basic info: Nama, Deskripsi, Jenis Assessment, Skala (jumlah titik, label min/max)
        - Question builder: Add question with Kompetensi mapping, Perilaku Inti, Teks, Bobot
        - Competency selector from master data
        - Auto-equalize weight toggle
    5. Admin saves instrument (can mark as template for reuse)
- **Postconditions:** Instrument saved and available for cycle selection
- **Acceptance Criteria:**
    - Question builder supports drag-and-drop reordering
    - Competency dropdown populated from master competency data
    - Weight validation enforced (total 100%)
    - Template flag allows reuse across cycles
    - Instrument linked to cycle cannot be deleted (soft constraint)

### 4. Manage Assessor Assignments

- **Actor:** HC Admin / Member Admin
- **Preconditions:** Cycle exists with status configuring or assigning
- **Main Flow:**
    1. Admin opens cycle detail > Assessor Management section
    2. If assignment method is auto:
        - System generates assignments from ReportingLine (superior = level 1 manager, subordinates = direct reports, peers = random selection max 3)
        - Admin reviews generated assignments
    3. Admin can override any assignment:
        - Replace assessor (with justification)
        - Skip an assessor (with reason)
        - Add additional assessor
    4. Admin can filter by assessee, channel, or status
    5. Admin activates cycle to begin assessment period
- **Postconditions:** All AssessorAssignment records created; cycle status updated to active
- **Acceptance Criteria:**
    - Auto-assignment generates correct channel mappings from org structure
    - Peer selection uses deterministic random (max 3, seeded per cycle)
    - Override requires justification text
    - Override flag (is_override) set to true with override_by and override_reason
    - Bulk assignment view supports filtering and search
    - Warning shown if any assessee has incomplete channel coverage

### 5. Monitor Completion

- **Actor:** HC Admin / Member Admin
- **Preconditions:** Cycle is active
- **Main Flow:**
    1. Admin opens cycle detail > Completion Monitoring section
    2. System displays overall completion dashboard:
        - Total assessees, total assignments, completion percentage
        - Breakdown by channel (superior %, peer %, subordinate %, self %)
    3. Detailed list shows per-assessee completion status
    4. Admin can filter by: completion status (complete/incomplete), channel, organization
    5. Admin can send reminder notifications to incomplete assessors
    6. Admin can extend deadline or close cycle early
- **Postconditions:** Admin has visibility into assessment progress; reminders sent as needed
- **Acceptance Criteria:**
    - Completion percentages calculated in real-time
    - Per-channel breakdown accurate
    - Reminder sends notification to assessors with status notified/in_progress
    - Deadline extension updates cycle end_date
    - Early close triggers scoring process

### 6. Validate and Publish Results

- **Actor:** HC Admin / Member Admin
- **Preconditions:** Cycle status is scoring (calculation complete)
- **Main Flow:**
    1. Admin opens cycle detail > Results section
    2. System displays calculated results per assessee
    3. Admin reviews results: overall scores, competency breakdown, channel breakdown
    4. Admin can flag anomalies or outliers
    5. Admin validates results (cycle status -> validated)
    6. Admin publishes results (cycle status -> published, results visible to assessees)
- **Postconditions:** Results published and visible to end-users in My Assessment
- **Acceptance Criteria:**
    - Results list sortable by score, name, organization
    - Anomaly detection: flag if self-assessment score deviates significantly from others
    - Validation step required before publishing
    - Published results immediately visible in end-user section
    - Publish action is irreversible (confirmed via dialog)

### 7. Upload Assessment Data

- **Actor:** HC Admin
- **Preconditions:** Cycle exists; upload template available
- **Main Flow:**
    1. Admin clicks "Unggah Assessment" from cycle list header
    2. System provides download link for Excel/CSV template
    3. Admin uploads filled template
    4. System validates data: required fields, score ranges, employee IDs
    5. System shows validation summary with errors/warnings
    6. Admin confirms import
    7. System creates AssessmentSubmission and SubmissionAnswer records
- **Postconditions:** Bulk assessment data imported into cycle
- **Acceptance Criteria:**
    - Template includes column headers matching instrument questions
    - Validation catches: missing scores, out-of-range values, invalid employee IDs
    - Error rows highlighted with specific error messages
    - Successful import updates assignment status to completed
    - Partial import not allowed (all-or-nothing)

### 8. Ganti Atasan (Change Superior)

- **Actor:** HC Admin / Member Admin
- **Preconditions:** Active cycle with assessor assignments
- **Main Flow:**
    1. Admin clicks "Ganti Atasan" from cycle list header
    2. Admin searches for assessee by name/NIK
    3. System shows current superior assignment
    4. Admin selects new superior from employee list
    5. Admin provides reason for change
    6. System updates AssessorAssignment: replaces superior assessor, sets is_override = true
- **Postconditions:** Superior assessor updated for selected assessee
- **Acceptance Criteria:**
    - Only superior channel assignments can be changed via this flow
    - Previous submission (if any) from old superior is voided
    - New assignment status set to notified
    - Change logged in audit trail
    - Confirmation dialog before applying change

### 9. View Assessment Analytics

- **Actor:** HC Admin / Member Admin
- **Preconditions:** At least one cycle with published results
- **Main Flow:**
    1. Admin navigates to Reports & Analytics tab > 360 Assessment Reports
    2. System displays analytics dashboard:
        - Score distribution across organization
        - Competency heatmap (average scores per competency)
        - Completion rate trends across cycles
        - Channel comparison (how channels rate differently)
    3. Admin can filter by: cycle, organization, grade band
    4. Admin can export reports to Excel/PDF
- **Postconditions:** Admin has organizational insights from 360 assessment data
- **Acceptance Criteria:**
    - Analytics aggregate data across assessees (no individual identification)
    - Filters apply to all visualizations simultaneously
    - Export includes filtered data with chart snapshots
    - Minimum 5 assessees required for aggregation (privacy threshold)

---

## UI Requirements (Behavioral)

1. **Tab Placement:** 360 Assessment is a tab within Talent Headquarter, alongside Talent Config, IDP Config, Reports & Analytics, and Audit Log
2. **Sub-tabs for Cycle List:** Three sub-tabs (Aktif, Dashboard, Arsip) to organize cycles by lifecycle
3. **3-Step Wizard:** Create/edit cycle uses a step-by-step wizard with clear step indicators and back/next navigation
4. **Question Builder:** Drag-and-drop reordering; inline editing; competency dropdown; weight auto-equalization toggle
5. **Completion Dashboard:** Real-time progress bars per channel; filterable assessee list with status indicators
6. **Bulk Actions:** "Kirim Pengingat" (send reminder) available as bulk action for incomplete assessors
7. **Confirmation Dialogs:** Publish results, close cycle early, and ganti atasan require explicit confirmation
8. **Audit Trail:** All administrative actions (override, publish, upload, ganti atasan) logged
9. **Empty States:**
    - Cycle list: "Belum ada siklus penilaian. Buat siklus baru untuk memulai."
    - Instrument list: "Belum ada instrumen penilaian."
    - Completion monitoring: "Belum ada data penyelesaian."
10. **Responsive:** Admin screens optimized for desktop; wizard adapts to tablet

---

## Data Dependencies

- **Entities:** AssessmentCycle, AssessmentInstrument, InstrumentQuestion, AssessorAssignment, AssessmentSubmission, SubmissionAnswer, AssessmentResult, AssessmentSettings
- **Relationships:**
    - AssessmentCycle manages lifecycle of all related entities
    - AssessmentInstrument contains InstrumentQuestion (1:N)
    - AssessmentCycle generates AssessorAssignment (1:N)
    - AssessorAssignment produces AssessmentSubmission (1:1)
    - AssessmentSubmission has SubmissionAnswer (1:N)
    - AssessmentCycle calculates AssessmentResult (1:N)
    - AssessmentSettings configures default behavior per tenant
- **External References:** Employee (HRIS), Organization (HRIS), ReportingLine (HRIS), Competency (TMS)

---

## Out of Scope

- End-user assessment views (My Assessment, Assigned Assessment) - handled by 360 Assessment section
- Questionnaire filling by assessors - handled by 360 Assessment section
- Report viewing by assessees - handled by 360 Assessment section
- Talent Pool and Succession integration with 360 results
- Notification template configuration (handled by global AssessmentSettings)
- EQS score integration with 360 assessment results

---