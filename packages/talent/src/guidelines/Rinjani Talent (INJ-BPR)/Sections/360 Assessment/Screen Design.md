## Context References (Global)

- Section Spec: [360 Assessment - Section Spec](https://www.notion.so/360-Assessment-Section-Spec-9fbc6fe77bdb41bb93e26333dd7b6a42?pvs=21)
- Data Model: [Rinjani Talent - Data Model](https://www.notion.so/Rinjani-Talent-Data-Model-c9438ffdd61f4dadb0cb9eb5fdde3175?pvs=21) (360 Assessment Module)
- Sample Data: [360 Assessment - Sample Data](https://www.notion.so/360-Assessment-Sample-Data-799ba7a5e0d143dd84fff608d9cb3493?pvs=21)
- Shell Spec: [Rinjani Talent - Shell Spec](https://www.notion.so/Rinjani-Talent-Shell-Spec-da91f1a79df8418c9f6e63e0194f2722?pvs=21)
- Design Tokens: [Rinjani Talent - Design Tokens](https://www.notion.so/Rinjani-Talent-Design-Tokens-8d0a1893bd79427d99128b2ae4d6087f?pvs=21)

---

## SCR-360-001: Assessment Landing (Tab Container)

### Context References

- Section Spec:
    - Requirements applied: Three-tab navigation (Penilaian Saya, Penilaian yang Ditugaskan, Riwayat); default active tab is Penilaian Saya; notification badge on sidebar
    - Constraints applied: Section-level tabs only; no app shell navigation chrome
    - View coverage: All UCs (container for UC-1 through UC-5)
- Data Model:
    - Entities used: AssessorAssignment (for badge count)
    - Fields used: AssessorAssignment.status, AssessorAssignment.assessor_id
- Sample Data:
    - Badge count derived from: ASG-012 (in_progress), ASG-013 (notified) = 2 pending for Siti as assessor

### 1) Screen Intent

- Primary user goal: Navigate between assessee view, assessor view, and history
- Success criteria: User can switch between tabs seamlessly; pending assessment count visible
- Key constraints: Default tab is "Penilaian Saya"; tab state persists during session

### 2) Layout Regions

- Header: Page title with breadcrumb
- Controls Area: Tab bar with 3 tabs
- Main Content: Dynamic content area based on selected tab

### 3) Component Tree

- Screen Container
    - Header Region
        - Breadcrumb: "Beranda / 360 Assessment"
        - Page Title: "360 Assessment"
        - Supporting Text: "Lihat hasil penilaian dan isi kuesioner yang ditugaskan kepada Anda"
    - Tab Bar Region
        - Tab 1: "Penilaian Saya" (default active)
        - Tab 2: "Penilaian yang Ditugaskan" + Badge (count of pending assignments)
        - Tab 3: "Riwayat"
    - Content Region
        - Renders SCR-360-002 (Tab 1), SCR-360-003 (Tab 2), or SCR-360-006 (Tab 3) based on active tab

### 4) Data Requirements

- AssessorAssignment: count where assessor_id = current_user AND status IN ('notified', 'in_progress') for badge

### 5) Interaction States

- Default: Tab 1 active, badge shows pending count (or hidden if 0)
- Loading: Tab bar visible, content area shows skeleton

### 6) Responsive Behavior

- Mobile (sm): Tabs rendered as scrollable horizontal bar
- Tablet (md): Tabs full width
- Desktop (lg+): Tabs left-aligned

---

## SCR-360-002: Penilaian Saya (My Assessment List)

### Context References

- Section Spec:
    - Requirements applied: List of assessment cycles where user is assessee; show Judul, Jenis, Status, Tanggal Mulai/Akhir, Nilai; filter by status; click to view detail
    - Constraints applied: Nilai only visible when AssessmentResult.status = published; show "Menunggu Hasil" otherwise
    - View coverage: UC-1 View My Assessments
- Data Model:
    - Entities used: AssessmentCycle, AssessorAssignment, AssessmentResult
    - Fields used: [AssessmentCycle.name](http://AssessmentCycle.name), assessment_type, status, start_date, end_date; AssessmentResult.overall_score, overall_max_score, status
    - Relationships: AssessorAssignment links user as assessee to cycle; AssessmentResult per cycle+assessee
- Sample Data:
    - Cycle names: "Penilaian Kinerja Berbasis Perilaku AKHLAK 2025", "Penilaian Kompetensi Manajerial Q1 2026"
    - Scores: 5.18/6.00 (published), "Menunggu Hasil" (pending)
    - Statuses: published, active
    - Copy grounded in sample data: yes

### 1) Screen Intent

- Primary user goal: Quickly see all 360 assessment cycles and their results
- Success criteria: User can identify completed assessments with scores and active assessments awaiting results
- Key constraints: Score only shown when result is published

### 2) Layout Regions

- Header: None (inherits from SCR-360-001)
- Controls Area: Status filter
- Main Content: Table of assessment cycles
- Primary Actions: None (read-only)

### 3) Component Tree

- Content Container
    - Controls Region
        - Filter: Status - type: select - options: Semua, Aktif, Selesai, Ditutup
    - Content Region
        - Content Presentation: Table (DataTable)
        - Table Columns
            - Column: Judul
                - Data Source: [AssessmentCycle.name](http://AssessmentCycle.name)
                - Format Rule: text, truncate at 60 chars
                - Null Handling: never null
            - Column: Jenis Assessment
                - Data Source: AssessmentCycle.assessment_type
                - Format Rule: badge (behavioral = "Perilaku", competency = "Kompetensi", custom = "Custom")
                - Null Handling: never null
            - Column: Status
                - Data Source: AssessmentCycle.status
                - Format Rule: StatusBadge
                - Null Handling: never null
            - Column: Tanggal Mulai
                - Data Source: AssessmentCycle.start_date
                - Format Rule: date (DD MMM YYYY)
                - Null Handling: never null
            - Column: Tanggal Akhir
                - Data Source: AssessmentCycle.end_date
                - Format Rule: date (DD MMM YYYY)
                - Null Handling: never null
            - Column: Nilai
                - Data Source: AssessmentResult.overall_score / AssessmentResult.overall_max_score
                - Format Rule: "X.XX / Y.YY" (2 decimal places) when result published
                - Null Handling: show "Menunggu Hasil" badge when result status != published
        - Item Actions
            - Action: View Detail - when: result status = published - result: navigate to SCR-360-005 (Report Detail)
            - Action: View Status - when: result status != published - result: show info tooltip "Hasil akan tersedia setelah periode penilaian selesai"
    - Footer Region
        - Pagination: page size 10
        - Summary: "Menampilkan X dari Y penilaian"

### 4) Data Requirements

**Entities Needed**

- AssessmentCycle
    - Required fields: id, name, assessment_type, status, start_date, end_date
    - Optional fields: description
    - Derived fields: none
- AssessmentResult
    - Required fields: overall_score, overall_max_score, status
    - Derived fields: display_score (formatted string or "Menunggu Hasil")

**Sorting / Filtering Requirements**

- Default sort: start_date descending (most recent first)
- Filter: Status -> mapped to AssessmentCycle.status (Aktif = active, Selesai = published/closed, Ditutup = archived)

### 5) Interaction States

- Default (Idle): Table populated with assessment cycles, most recent first
- Loading: Skeleton table rows (5 rows), filter disabled
- Empty:
    - Trigger condition: No AssessorAssignment records where user is assessee
    - Message: "Belum ada penilaian 360 untuk Anda saat ini."
    - Primary CTA: none
- Error:
    - Trigger condition: API failure
    - Message: "Gagal memuat data penilaian. Silakan coba lagi."
    - Recovery action: Retry button

### 6) Responsive Behavior

- Mobile (sm): Table collapses to card list showing Judul, Status, Nilai only
- Tablet (md): Full table, horizontal scroll if needed
- Desktop (lg+): Full table, all columns visible

### 7) Accessibility & Usability Notes

- Focus order: Status filter -> Table rows (top to bottom)
- Keyboard: Enter on row navigates to detail; Tab between rows
- Screen reader: Nilai column announces "Nilai: 5.18 dari 6.00" or "Menunggu Hasil"

---

## SCR-360-003: Penilaian yang Ditugaskan (Assigned Assessment List)

### Context References

- Section Spec:
    - Requirements applied: List assessments where user is assessor; show progress (answered/total), percentage, status; filter by status; "Isi Penilaian" CTA; overdue warning
    - Constraints applied: Button disabled when cycle not active or deadline passed
    - View coverage: UC-3 View Assigned Assessments
- Data Model:
    - Entities used: AssessorAssignment, AssessmentCycle, AssessmentSubmission, AssessmentInstrument
    - Fields used: [AssessmentCycle.name](http://AssessmentCycle.name), assessment_type, end_date; AssessmentSubmission.answered_count, total_questions, status; AssessorAssignment.status
- Sample Data:
    - Titles: "Penilaian Kompetensi Manajerial Q1 2026"
    - Progress: 5/8 (62.5%), 3/8 (37.5%)
    - Statuses: in_progress, notified
    - Copy grounded in sample data: yes

### 1) Screen Intent

- Primary user goal: See all pending assessments to fill and track progress
- Success criteria: User can identify which assessments need attention and resume filling
- Key constraints: Overdue assessments visually flagged; CTA disabled after deadline

### 2) Layout Regions

- Header: None (inherits from SCR-360-001)
- Controls Area: Status filter
- Main Content: Table of assigned assessments
- Primary Actions: "Isi Penilaian" per row

### 3) Component Tree

- Content Container
    - Controls Region
        - Filter: Status - type: select - options: Semua, Belum Mulai, Sedang Mengisi, Selesai
    - Content Region
        - Content Presentation: Table (DataTable)
        - Table Columns
            - Column: Judul
                - Data Source: [AssessmentCycle.name](http://AssessmentCycle.name)
                - Format Rule: text, truncate at 60 chars
                - Null Handling: never null
            - Column: Jenis
                - Data Source: AssessmentCycle.assessment_type
                - Format Rule: badge (behavioral = "Perilaku", competency = "Kompetensi")
                - Null Handling: never null
            - Column: Jumlah Pertanyaan
                - Data Source: [AssessmentSubmission.total](http://AssessmentSubmission.total)_questions
                - Format Rule: number
                - Null Handling: show "-"
            - Column: Progress Pengisian
                - Data Source: AssessmentSubmission.answered_count / total_questions
                - Format Rule: "X / Y" with progress bar
                - Null Handling: "0 / Y" for not_started
            - Column: Persentase
                - Data Source: derived (answered_count / total_questions * 100)
                - Format Rule: percentage with 0 decimal
                - Null Handling: "0%"
            - Column: Status
                - Data Source: AssessorAssignment.status
                - Format Rule: StatusBadge (notified = "Belum Mulai", in_progress = "Sedang Mengisi", completed = "Selesai")
                - Null Handling: never null
            - Column: Tanggal Akhir
                - Data Source: AssessmentCycle.end_date
                - Format Rule: date (DD MMM YYYY)
                - Null Handling: never null
                - [WARNING] If current_date > end_date AND status != completed: show warning icon + "Terlambat" badge
            - Column: Aksi
                - Data Source: derived from status + cycle.status + date
                - Format Rule: Button
                - States:
                    - status = notified/in_progress AND cycle = active AND current_date <= end_date: "Isi Penilaian" (enabled)
                    - status = notified/in_progress AND (cycle != active OR current_date > end_date): "Isi Penilaian" (disabled)
                    - status = completed: "Lihat" (secondary style)
    - Footer Region
        - Pagination: page size 10
        - Summary: "Menampilkan X dari Y penugasan"

### 4) Data Requirements

**Entities Needed**

- AssessorAssignment
    - Required fields: id, cycle_id, assessee_id, assessor_id, status
    - Derived fields: is_overdue (current_date > cycle.end_date AND status != completed)
- AssessmentCycle
    - Required fields: name, assessment_type, end_date, status
- AssessmentSubmission
    - Required fields: answered_count, total_questions, status
    - Derived fields: percentage (answered_count / total_questions * 100)

**Sorting / Filtering Requirements**

- Default sort: status priority (notified first, then in_progress, then completed), then end_date ascending
- Filter: Status -> AssessorAssignment.status

### 5) Interaction States

- Default (Idle): Table populated with assigned assessments, overdue items flagged
- Loading: Skeleton table rows (5 rows)
- Empty:
    - Trigger condition: No AssessorAssignment where assessor_id = current_user
    - Message: "Tidak ada penilaian yang perlu Anda isi."
    - Primary CTA: none
- Error:
    - Trigger condition: API failure
    - Message: "Gagal memuat data penugasan. Silakan coba lagi."
    - Recovery action: Retry button

### 6) Responsive Behavior

- Mobile (sm): Card list showing Judul, Progress bar, Status, Aksi button
- Tablet (md): Full table, horizontal scroll if needed
- Desktop (lg+): Full table, all columns visible

### 7) Accessibility & Usability Notes

- Focus order: Status filter -> Table rows -> Action buttons
- Keyboard: Enter on "Isi Penilaian" navigates to questionnaire
- Screen reader: Progress announced as "3 dari 8 pertanyaan dijawab, 37 persen"

---

## SCR-360-004: Isi Kuesioner (Fill Questionnaire)

### Context References

- Section Spec:
    - Requirements applied: Questions grouped by competency; Likert scale with min/max labels; auto-save every 30s; progress indicator; submit with confirmation; read-only after submit or deadline
    - Constraints applied: Submit disabled until all answered; immutable after submit; auto-save with visual indicator
    - View coverage: UC-4 Fill Assessment Questionnaire
- Data Model:
    - Entities used: AssessmentInstrument, InstrumentQuestion, AssessmentSubmission, SubmissionAnswer
    - Fields used: InstrumentQuestion.competency_name, behavior_indicator, question_text, question_order; AssessmentInstrument.scale_points, scale_min_label, scale_max_label
- Sample Data:
    - Competencies: Amanah, Kompeten, Harmonis, Loyal, Adaptif, Kolaboratif
    - Questions: "Yang bersangkutan selalu memenuhi janji dan komitmen..."
    - Scale: 1-6 (Sangat Tidak Setuju to Sangat Setuju)
    - Copy grounded in sample data: yes

### 1) Screen Intent

- Primary user goal: Complete assessment questionnaire for a colleague efficiently and accurately
- Success criteria: User answers all questions and successfully submits; partial progress saved automatically
- Key constraints: All questions must be answered before submit; answers immutable after submit

### 2) Layout Regions

- Header: Assessment title, assessee info (if identified), progress indicator
- Controls Area: None
- Main Content: Questionnaire form grouped by competency
- Secondary Panel: Question navigation sidebar (desktop)
- Primary Actions: Submit button
- Secondary Actions: Simpan & Keluar (save draft and exit)

### 3) Component Tree

- Screen Container
    - Header Region
        - Back Link: "Kembali ke Penilaian yang Ditugaskan"
        - Assessment Title: [AssessmentCycle.name](http://AssessmentCycle.name)
        - Assessment Type Badge: AssessmentCycle.assessment_type
        - Progress Bar: "X dari Y pertanyaan dijawab (Z%)"
        - Auto-save Indicator: "Tersimpan otomatis" (appears briefly after save, then fades)
    - Content Region
        - Content Presentation: Vertical form, grouped by competency
        - For each competency group:
            - Group Header
                - Competency Name: InstrumentQuestion.competency_name
                - Question Count: "X pertanyaan"
            - For each question in group:
                - Question Card
                    - Question Number: "Pertanyaan X dari Y"
                    - Behavior Indicator: InstrumentQuestion.behavior_indicator
                        - Format Rule: italic text, secondary color
                        - Null Handling: hide if null
                    - Question Text: InstrumentQuestion.question_text
                    - Likert Scale
                        - Scale Points: 1 to AssessmentInstrument.scale_points (rendered as horizontal radio group)
                        - Left Label: AssessmentInstrument.scale_min_label
                        - Right Label: AssessmentInstrument.scale_max_label
                        - Selected State: highlighted with primary color
                        - Unselected State: neutral border
                    - Comment Field (optional)
                        - Placeholder: "Tambahkan komentar (opsional)"
                        - Format Rule: textarea, max 500 chars, show count
    - Question Navigation Sidebar (desktop only)
        - Question list with numbered items
        - Visual indicator: answered (filled circle), unanswered (empty circle), current (highlighted)
        - Click to scroll to question
    - Footer Region (sticky)
        - Secondary Button: "Simpan & Keluar"
        - Primary Button: "Submit Penilaian"
            - Disabled state: when answered_count < total_questions
            - Tooltip when disabled: "Jawab semua pertanyaan untuk submit"

### 4) Data Requirements

**Entities Needed**

- AssessmentInstrument
    - Required fields: scale_points, scale_min_label, scale_max_label
- InstrumentQuestion
    - Required fields: id, competency_name, question_text, question_order, weight
    - Optional fields: behavior_indicator
- AssessmentSubmission
    - Required fields: id, answered_count, total_questions, status
- SubmissionAnswer
    - Required fields: question_id, score
    - Optional fields: comment

**Validation / Constraints**

- Required inputs: score for every question (1 to scale_points)
- Field rules: score must be integer within range; comment max 500 chars
- Error copy: "Pilih nilai untuk melanjutkan"

### 5) Interaction States

- Default (Idle): Questionnaire displayed with any previously saved answers pre-filled
- Loading: Skeleton form (3 question placeholders)
- Saving: Auto-save indicator appears "Menyimpan..." then "Tersimpan otomatis" for 2 seconds
- Submit Confirmation:
    - Trigger: User clicks "Submit Penilaian" with all questions answered
    - Dialog Title: "Submit Penilaian?"
    - Dialog Message: "Setelah disubmit, jawaban tidak dapat diubah. Lanjutkan?"
    - Actions: "Batal" (secondary) / "Ya, Submit" (primary)
- Success:
    - Message: "Penilaian berhasil disubmit"
    - Behavior: redirect to Assigned Assessment list
- Read-only Mode:
    - Trigger: submission.status = submitted OR current_date > cycle.end_date
    - Behavior: All inputs disabled; footer shows info banner instead of buttons
    - Banner (if submitted): "Penilaian ini sudah disubmit pada DD MMM YYYY"
    - Banner (if expired): "Periode pengisian telah berakhir"
- Error:
    - Trigger: Auto-save or submit failure
    - Message: "Gagal menyimpan jawaban. Silakan coba lagi."
    - Recovery action: Retry

### 6) Responsive Behavior

- Mobile (sm): Single column; Likert scale switches to vertical radio list; question nav sidebar hidden (replaced by floating progress indicator); sticky footer with buttons
- Tablet (md): Single column; Likert scale horizontal; question nav as collapsible panel
- Desktop (lg+): Two-column layout (main content + question nav sidebar)

### 7) Accessibility & Usability Notes

- Focus order: Back link -> Progress bar -> Question 1 Likert -> Comment -> Question 2 Likert -> ... -> Submit
- Keyboard: Arrow keys navigate within Likert scale; Tab moves to next question; Enter selects value
- Screen reader: Each question announced with "Pertanyaan X dari Y, Kompetensi: [name], [question text]"; Likert options announced with label + position
- [WARNING] Auto-save must not interfere with user interaction; save on blur or periodic timer, not on every keystroke

---

## SCR-360-005: Laporan Detail Penilaian (Assessment Report Detail)

### Context References

- Section Spec:
    - Requirements applied: Overall score; competency breakdown with behavior sub-items; channel breakdown with weights; anonymity enforcement; 2 decimal precision
    - Constraints applied: No individual assessor identity revealed when anonymous; channel breakdown shows aggregated scores
    - View coverage: UC-2 View Assessment Report Detail
- Data Model:
    - Entities used: AssessmentResult, AssessmentCycle
    - Fields used: AssessmentResult.overall_score, overall_max_score, competency_scores, channel_breakdown; [AssessmentCycle.name](http://AssessmentCycle.name), assessment_type, start_date, end_date, anonymity_policy
- Sample Data:
    - Overall score: 5.18 / 6.00
    - Competencies: Amanah (5.40), Kompeten (5.10), Harmonis (5.55), Loyal (5.25), Adaptif (4.65), Kolaboratif (5.30)
    - Channel weights: Superior 40%, Peer 30%, Subordinate 20%, Self 10%
    - Copy grounded in sample data: yes

### 1) Screen Intent

- Primary user goal: Understand detailed 360 feedback results across competencies and channels
- Success criteria: User can identify strongest and weakest competencies; understand how different channels rated them
- Key constraints: Anonymity must be preserved; scores formatted to 2 decimals

### 2) Layout Regions

- Header: Assessment title, period, overall score prominently displayed
- Controls Area: None
- Main Content: Competency breakdown + Channel breakdown
- Secondary Panel: None
- Primary Actions: None (read-only)
- Secondary Actions: Back to list

### 3) Component Tree

- Screen Container
    - Header Region
        - Back Link: "Kembali ke Penilaian Saya"
        - Assessment Title: [AssessmentCycle.name](http://AssessmentCycle.name)
        - Assessment Meta
            - Assessment Type Badge: AssessmentCycle.assessment_type
            - Period: "start_date - end_date" (DD MMM YYYY)
        - Overall Score Card
            - Score Display: "5.18 / 6.00" (large, prominent)
            - Score Label: "Nilai Keseluruhan"
    - Content Region
        - Section: Breakdown per Kompetensi
            - Section Title: "Breakdown per Kompetensi"
            - For each competency in AssessmentResult.competency_scores:
                - Competency Row
                    - Competency Name: competency_scores.competency_name
                    - Score: competency_scores.score / max_score
                    - Progress Bar: visual ratio of score/max_score
                    - Expandable: click to show behavior sub-items
                    - Behavior Sub-items (expanded)
                        - For each behavior_score:
                            - Behavior Indicator: behavior_scores.behavior_indicator
                            - Score: behavior_scores.score / max_score
                            - Mini Progress Bar
        - Section: Breakdown per Channel
            - Section Title: "Breakdown per Channel Evaluator"
            - Content Presentation: Table
            - Table Columns
                - Column: Channel
                    - Data Source: channel_[breakdown.channel](http://breakdown.channel)
                    - Format Rule: mapped label (superior = "Atasan", peer = "Rekan Kerja", subordinate = "Bawahan", self = "Diri Sendiri")
                - Column: Bobot
                    - Data Source: channel_breakdown.weight
                    - Format Rule: percentage ("40%")
                - Column: Nilai Mentah
                    - Data Source: channel_breakdown.raw_score
                    - Format Rule: 2 decimal places
                - Column: Nilai Tertimbang
                    - Data Source: channel_breakdown.weighted_score
                    - Format Rule: 2 decimal places
                - Column: Jumlah Penilai
                    - Data Source: channel_breakdown.assessor_count
                    - Format Rule: number
                - Column: Tingkat Penyelesaian
                    - Data Source: channel_breakdown.completion_rate
                    - Format Rule: percentage ("100%")

### 4) Data Requirements

**Entities Needed**

- AssessmentResult
    - Required fields: overall_score, overall_max_score, competency_scores, channel_breakdown, status
    - Derived fields: none
- AssessmentCycle
    - Required fields: name, assessment_type, start_date, end_date, anonymity_policy

### 5) Interaction States

- Default (Idle): Full report displayed with all competencies collapsed initially
- Loading: Skeleton for score card + 6 competency row placeholders
- Empty:
    - Trigger condition: Should not occur (screen only accessible when result is published)
    - [WARNING] If result status changes to non-published after navigation: show "Hasil penilaian belum tersedia" and redirect
- Error:
    - Trigger condition: API failure
    - Message: "Gagal memuat laporan penilaian. Silakan coba lagi."
    - Recovery action: Retry button

### 6) Responsive Behavior

- Mobile (sm): Overall score card full width; competency list as expandable cards; channel table scrollable horizontally
- Tablet (md): Two-column layout (score card + competency list side by side)
- Desktop (lg+): Full layout, channel table inline

### 7) Accessibility & Usability Notes

- Focus order: Back link -> Overall score -> Competency rows (expand/collapse) -> Channel table
- Keyboard: Enter/Space toggles competency expansion; Tab navigates between competencies
- Screen reader: Competency announced as "Amanah, nilai 5.40 dari 6.00"; expansion state announced

---

## SCR-360-006: Riwayat Penilaian (Assessment History)

### Context References

- Section Spec:
    - Requirements applied: Show historical assessments (both assessee and assessor); filter by year; read-only; sorted by date descending
    - View coverage: UC-5 View Assessment History
- Data Model:
    - Entities used: AssessmentCycle, AssessorAssignment, AssessmentResult
- Sample Data:
    - Archived cycle: "Penilaian Perilaku AKHLAK 2024" (CYC-003)
    - Historical score: 4.82 / 6.00
    - Copy grounded in sample data: yes

### 1) Screen Intent

- Primary user goal: Review past assessment records for personal development tracking
- Success criteria: User can find and view any historical assessment result
- Key constraints: All records read-only; both assessee and assessor records visible

### 2) Layout Regions

- Header: None (inherits from SCR-360-001)
- Controls Area: Year/period filter
- Main Content: Table of historical assessments

### 3) Component Tree

- Content Container
    - Controls Region
        - Filter: Tahun - type: select - options: derived from available years (e.g., 2026, 2025, 2024)
        - Filter: Peran - type: select - options: Semua, Sebagai Peserta, Sebagai Penilai
    - Content Region
        - Content Presentation: Table (DataTable)
        - Table Columns
            - Column: Judul
                - Data Source: [AssessmentCycle.name](http://AssessmentCycle.name)
                - Format Rule: text
            - Column: Peran
                - Data Source: derived (assessee or assessor based on assignment)
                - Format Rule: badge ("Peserta" or "Penilai")
            - Column: Jenis
                - Data Source: AssessmentCycle.assessment_type
                - Format Rule: badge
            - Column: Periode
                - Data Source: AssessmentCycle.start_date + end_date
                - Format Rule: "MMM YYYY - MMM YYYY"
            - Column: Nilai
                - Data Source: AssessmentResult.overall_score / overall_max_score (only for assessee role)
                - Format Rule: "X.XX / Y.YY" for assessee; "-" for assessor role
                - Null Handling: "-"
        - Item Actions
            - Action: "Lihat Detail" - when: role = assessee AND result published - result: navigate to SCR-360-005
            - Action: "Lihat Jawaban" - when: role = assessor AND submission submitted - result: navigate to SCR-360-004 (read-only mode)
    - Footer Region
        - Pagination: page size 10

### 4) Data Requirements

**Sorting / Filtering Requirements**

- Default sort: start_date descending
- Filter: Tahun -> year derived from AssessmentCycle.start_date
- Filter: Peran -> derived from AssessorAssignment (assessee_id or assessor_id = current_user)

### 5) Interaction States

- Default (Idle): Table showing historical records
- Loading: Skeleton table rows
- Empty:
    - Trigger condition: No closed/archived cycles involving user
    - Message: "Belum ada riwayat penilaian."
    - Primary CTA: none
- Error:
    - Message: "Gagal memuat riwayat. Silakan coba lagi."
    - Recovery action: Retry

### 6) Responsive Behavior

- Mobile (sm): Card list with Judul, Peran badge, Nilai
- Tablet/Desktop: Full table

---

## Screen Inventory Summary

| Screen ID | Screen Name | UC Coverage | Type |
| --- | --- | --- | --- |
| SCR-360-001 | Assessment Landing (Tab Container) | All UCs | Container |
| SCR-360-002 | Penilaian Saya (My Assessment List) | UC-1 | List |
| SCR-360-003 | Penilaian yang Ditugaskan (Assigned Assessment List) | UC-3 | List |
| SCR-360-004 | Isi Kuesioner (Fill Questionnaire) | UC-4 | Form |
| SCR-360-005 | Laporan Detail Penilaian (Report Detail) | UC-2 | Detail |
| SCR-360-006 | Riwayat Penilaian (Assessment History) | UC-5 | List |

---