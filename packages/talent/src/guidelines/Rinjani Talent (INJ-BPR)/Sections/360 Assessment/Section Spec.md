# 360 Assessment Specification

## Overview

360 Assessment enables employees to participate in multi-source performance assessments from two perspectives: as an **Assessee** (receiving feedback from multiple evaluator channels) and as an **Assessor** (providing feedback for colleagues). The section is located under **My Talent Journey** in the sidebar, consolidating both views under a single menu with tabbed navigation.

Key capabilities:

- View assessment results and scores as an assessee
- Fill assessment questionnaires as an assessor with auto-save
- Track assessment progress across multiple cycles
- View competency-based report breakdowns with behavior indicator details
- Access historical assessment records

---

## User Flows / Use Cases

### 1. View My Assessments (Assessee POV)

- **Actor:** Employee (Assessee)
- **Preconditions:** User is authenticated; at least one AssessmentCycle exists where user is an assessee
- **Main Flow:**
    1. User navigates to 360 Assessment section from sidebar
    2. System defaults to "Penilaian Saya" (My Assessment) tab
    3. System displays list of assessment cycles where user is an assessee
    4. Each row shows: Judul, Jenis Assessment, Status, Tanggal Mulai, Tanggal Akhir, Nilai
    5. User can filter by status (Aktif, Selesai, Ditutup)
    6. User clicks on a row to view assessment detail
- **Postconditions:** User sees all assessments where they are the subject of evaluation
- **Acceptance Criteria:**
    - List shows all AssessmentCycles where user appears as `assessee_id` in AssessorAssignment
    - Status badge correctly reflects cycle status using StatusBadge component
    - Nilai column shows `overall_score / overall_max_score` only when AssessmentResult.status = `published`
    - Nilai column displays "Menunggu Hasil" when result is not yet published
    - Empty state: "Belum ada penilaian 360 untuk Anda saat ini."

### 2. View Assessment Report Detail

- **Actor:** Employee (Assessee)
- **Preconditions:** AssessmentResult.status is `published` for this cycle + assessee combination
- **Main Flow:**
    1. User clicks on a completed assessment from My Assessment list
    2. System displays assessment detail header: cycle name, assessment type, period, overall score
    3. System displays competency breakdown section
    4. Each competency (e.g., AKHLAK: Adaptif, Kolaboratif, Amanah, Kompeten, Harmonis, Loyal) shows aggregated score
    5. Each competency expands to show Perilaku Inti sub-items with individual scores
    6. System displays channel breakdown (Superior, Peer, Subordinate, Self) with weighted scores
    7. User can navigate back to list
- **Postconditions:** User has detailed understanding of 360-degree feedback results
- **Acceptance Criteria:**
    - Overall score displayed prominently at top
    - Competency scores shown with visual progress indicators
    - Behavior indicator (Perilaku Inti) sub-items listed under each competency with individual scores
    - Channel breakdown visible with weight percentage and weighted score per channel
    - When `anonymity_policy = 'anonymous'`: individual assessor identities are never revealed; channel breakdown shows aggregated scores only
    - When `anonymity_policy = 'identified'`: channel labels shown but individual names still not displayed (aggregated per channel)
    - Score values formatted to 2 decimal places

### 3. View Assigned Assessments (Assessor POV)

- **Actor:** Employee (Assessor)
- **Preconditions:** User has AssessorAssignment records with status != `skipped`
- **Main Flow:**
    1. User navigates to 360 Assessment section
    2. User switches to "Penilaian yang Ditugaskan" (Assigned Assessment) tab
    3. System displays list of assessments where user is an assessor
    4. Each row shows: Judul, Jumlah Pertanyaan, Progress Pengisian (answered/total), Persentase, Jenis, Status, Tanggal
    5. User can filter by status (Belum Mulai, Sedang Mengisi, Selesai)
    6. User clicks "Isi Penilaian" to start or continue filling
- **Postconditions:** User sees all assessments they need to fill with progress tracking
- **Acceptance Criteria:**
    - List shows all AssessorAssignments where `assessor_id` = current user
    - Progress column shows `answered_count / total_questions` from AssessmentSubmission
    - Percentage calculated as `(answered_count / total_questions) * 100`
    - Completed assessments (100%) visually distinct with checkmark or green indicator
    - Overdue assessments (current date > cycle end_date AND status != `completed`) flagged with warning badge
    - "Isi Penilaian" button disabled when cycle is not `active` or deadline has passed
    - Empty state: "Tidak ada penilaian yang perlu Anda isi."

### 4. Fill Assessment Questionnaire

- **Actor:** Employee (Assessor)
- **Preconditions:**
    - AssessorAssignment.status is `notified` or `in_progress`
    - AssessmentCycle.status is `active`
    - Current date is between cycle `start_date` and `end_date`
- **Main Flow:**
    1. User clicks "Isi Penilaian" on an assigned assessment
    2. System loads questionnaire with questions from AssessmentInstrument
    3. Questions are grouped by competency with visual section headers
    4. Each question displays: competency name, behavior indicator, question text
    5. User selects Likert scale value (1 to `scale_points`) for each question
    6. Scale renders with `scale_min_label` on left and `scale_max_label` on right
    7. System auto-saves answers every 30 seconds while user is active
    8. Progress indicator updates in real-time showing answered vs total
    9. User can navigate between questions using prev/next or question sidebar
    10. When all questions answered, user clicks "Submit"
    11. System validates: all questions must have a response
    12. Confirmation dialog: "Setelah disubmit, jawaban tidak dapat diubah. Lanjutkan?"
    13. On confirm: system submits, updates AssessmentSubmission.status to `submitted`, AssessorAssignment.status to `completed`
- **Postconditions:** Assessment submission is finalized; answers are immutable
- **Acceptance Criteria:**
    - Likert scale rendered as horizontal radio buttons with min/max labels at endpoints
    - Auto-save persists partial answers via SubmissionAnswer records with `auto_saved_at` timestamp
    - On re-entry, previously saved answers are restored
    - Submit button disabled until all questions are answered (answered_count = total_questions)
    - Progress indicator: "X dari Y pertanyaan dijawab (Z%)"
    - After submit, questionnaire becomes read-only
    - If cycle `end_date` has passed, questionnaire displays read-only with message: "Periode pengisian telah berakhir"
    - First-time entry updates AssessorAssignment.status from `notified` to `in_progress`
    - Optional comment field per question (if enabled by instrument configuration)

### 5. View Assessment History

- **Actor:** Employee
- **Preconditions:** User has participated in at least one completed or archived assessment cycle
- **Main Flow:**
    1. User navigates to 360 Assessment > "Riwayat" (History) tab
    2. System displays historical assessments from closed/archived cycles
    3. Records show both assessee and assessor participation
    4. User can filter by year/period
    5. User clicks on a record to view read-only results or submission
- **Postconditions:** User can review past assessment participation
- **Acceptance Criteria:**
    - History shows assessments from cycles with status `closed` or `archived`
    - Both assessee records (with scores) and assessor records (submission summary) are visible
    - All records are read-only
    - Sorted by date descending (most recent first)
    - Empty state: "Belum ada riwayat penilaian."

---

## UI Requirements (Behavioral)

1. **Tab Navigation:** Three tabs at section level
    - "Penilaian Saya" (My Assessment) - default active tab
    - "Penilaian yang Ditugaskan" (Assigned Assessment)
    - "Riwayat" (History)
2. **Assessment List:** Uses DataTable component with sorting, filtering, and pagination
3. **Progress Tracking:** Assigned assessments show real-time progress bar with answered/total count and percentage
4. **Questionnaire Auto-save:** Auto-save triggers every 30 seconds; visual indicator "Tersimpan otomatis" shown briefly after each save
5. **Likert Scale Interaction:** Rendered as horizontal radio group with numbered scale points; `scale_min_label` and `scale_max_label` at endpoints; selected value highlighted with primary color
6. **Competency Grouping:** Questions in questionnaire grouped by competency with section header showing competency name; visual separator between groups
7. **Report Visualization:** Competency scores displayed with horizontal progress bars showing score/max_score ratio; behavior sub-items as indented list with individual scores
8. **Notification Badge:** Pending assigned assessments count reflected in sidebar navigation badge for 360 Assessment menu item
9. **Responsive:** Questionnaire must be mobile-friendly; Likert scale adapts to vertical layout on screens < 640px
10. **Confirmation Dialogs:** Submit confirmation follows standard pattern: clear question title, consequence explanation, Batal/Ya action buttons

---

## Data Dependencies

- **Entities:** AssessmentCycle, AssessmentInstrument, InstrumentQuestion, AssessorAssignment, AssessmentSubmission, SubmissionAnswer, AssessmentResult, AssessmentSettings
- **Relationships:**
    - AssessmentCycle uses one AssessmentInstrument (N:1)
    - AssessmentInstrument has many InstrumentQuestion (1:N)
    - AssessmentCycle generates many AssessorAssignment (1:N)
    - AssessorAssignment links Employee (assessee) to Employee (assessor)
    - AssessorAssignment produces one AssessmentSubmission (1:1)
    - AssessmentSubmission has many SubmissionAnswer (1:N)
    - SubmissionAnswer answers one InstrumentQuestion (N:1)
    - AssessmentCycle calculates many AssessmentResult (1:N, one per assessee)
    - InstrumentQuestion maps to Competency (N:1)
    - AssessmentSettings configures AssessmentCycle per tenant
- **External References:** Employee (from HRIS), Competency (from TMS module)

---

## Out of Scope

- Assessment cycle creation, configuration, and lifecycle management (360 Assessment HQ)
- Instrument/template creation and question builder (360 Assessment HQ)
- Assessor assignment management, auto-assignment logic, and override (360 Assessment HQ)
- Completion monitoring and analytics dashboard (360 Assessment HQ)
- Upload Assessment and Ganti Atasan features (360 Assessment HQ)
- Bulk operations on assessments
- Assessment result export/download to PDF or Excel (handled by HQ Reports & Analytics)
- Notification and reminder configuration (handled by AssessmentSettings in HQ)
- Assessment scoring/calculation logic execution (backend process triggered by HQ)

---