## Context References (Global)

- Section Spec: [360 Assessment HQ - Section Spec](https://www.notion.so/360-Assessment-HQ-Section-Spec-5e1f559fc7b140ec81671058b7da27e1?pvs=21)
- Data Model: [Rinjani Talent - Data Model](https://www.notion.so/Rinjani-Talent-Data-Model-c9438ffdd61f4dadb0cb9eb5fdde3175?pvs=21) (360 Assessment Module)
- Sample Data: [360 Assessment HQ - Sample Data](https://www.notion.so/360-Assessment-HQ-Sample-Data-c61ef69ef71648d6b5465fa60216eef8?pvs=21)
- Shell Spec: [Rinjani Talent - Shell Spec](https://www.notion.so/Rinjani-Talent-Shell-Spec-da91f1a79df8418c9f6e63e0194f2722?pvs=21)
- Design Tokens: [Rinjani Talent - Design Tokens](https://www.notion.so/Rinjani-Talent-Design-Tokens-8d0a1893bd79427d99128b2ae4d6087f?pvs=21)

---

## SCR-360HQ-001: Assessment Cycle List

### Context References

- Section Spec:
    - Requirements applied: Tabbed cycle list (Aktif/Dashboard/Arsip); search by name; columns: Judul, Peserta, Jenis, Pembuat, Status; header actions: Buat Assessment, Unggah Assessment, Ganti Atasan
    - View coverage: UC-1 View Assessment Cycle List
- Data Model:
    - Entities used: AssessmentCycle
    - Fields used: name, total_assessee, assessment_type, created_by, status
- Sample Data:
    - Cycle names: "Penilaian Kinerja Berbasis Perilaku HEROES 2025" (published), "Penilaian Kompetensi Manajerial Q1 2026" (active), "Penilaian Perilaku HEROES Pilot Batch" (draft)
    - Peserta counts: 245, 48, 12
    - Copy grounded in sample data: yes

### 1) Screen Intent

- Primary user goal: Manage all assessment cycles across lifecycle stages
- Success criteria: Admin can quickly find cycles by status and take actions
- Key constraints: Tab within Talent Headquarter (not standalone page)

### 2) Layout Regions

- Header: Section title with primary action buttons
- Controls Area: Sub-tabs (Aktif/Dashboard/Arsip) + search
- Main Content: Table of assessment cycles
- Primary Actions: Buat Assessment, Unggah Assessment, Ganti Atasan

### 3) Component Tree

- Tab Content Container (within Talent Headquarter > 360 Assessment tab)
    - Header Region
        - Section Title: "360 Assessment"
        - Action Buttons (right-aligned)
            - Primary Button: "Buat Assessment" -> opens SCR-360HQ-002 wizard
            - Secondary Button: "Unggah Assessment" -> opens SCR-360HQ-006 upload dialog
            - Secondary Button: "Ganti Atasan" -> opens SCR-360HQ-007 dialog
    - Controls Region
        - Sub-tab Bar
            - Tab: "Aktif" + count badge (cycles with status: draft, configuring, assigning, active)
            - Tab: "Dashboard" + count badge (cycles with status: scoring, validated, published)
            - Tab: "Arsip" + count badge (cycles with status: closed, archived)
        - Search Input: placeholder "Cari siklus penilaian..."
    - Content Region
        - Content Presentation: Table (DataTable)
        - Table Columns
            - Column: Judul
                - Data Source: [AssessmentCycle.name](http://AssessmentCycle.name)
                - Format Rule: text, clickable (navigates to cycle detail)
                - Null Handling: never null
            - Column: Peserta
                - Data Source: [AssessmentCycle.total](http://AssessmentCycle.total)_assessee
                - Format Rule: number + "orang" suffix
                - Null Handling: "0 orang"
            - Column: Jenis
                - Data Source: AssessmentCycle.assessment_type
                - Format Rule: badge (behavioral = "Perilaku", competency = "Kompetensi", custom = "Custom")
            - Column: Pembuat
                - Data Source: AssessmentCycle.created_by -> [Employee.name](http://Employee.name)
                - Format Rule: text
            - Column: Status
                - Data Source: AssessmentCycle.status
                - Format Rule: StatusBadge
            - Column: Aksi
                - Data Source: derived from status
                - States:
                    - draft: "Edit" + "Hapus"
                    - configuring/assigning: "Kelola"
                    - active: "Monitor"
                    - scoring/validated: "Review Hasil"
                    - published: "Lihat Hasil"
                    - closed/archived: "Lihat"
    - Footer Region
        - Pagination: page size 10
        - Summary: "Menampilkan X dari Y siklus"

### 4) Data Requirements

- AssessmentCycle: all cycles for current tenant, grouped by status for tab filtering
- Default sort: updated_at descending per tab
- Search: fuzzy match on [AssessmentCycle.name](http://AssessmentCycle.name)

### 5) Interaction States

- Default: Aktif tab active, table populated
- Loading: Skeleton table rows (5)
- Empty (per tab):
    - Aktif: "Belum ada siklus penilaian aktif. Klik 'Buat Assessment' untuk memulai."
    - Dashboard: "Belum ada siklus yang sedang dalam proses review."
    - Arsip: "Belum ada siklus yang diarsipkan."
- Error: "Gagal memuat data siklus. Silakan coba lagi."

### 6) Responsive Behavior

- Mobile (sm): Not primary target; card layout fallback
- Tablet (md): Full table with horizontal scroll
- Desktop (lg+): Full table, all columns visible

---

## SCR-360HQ-002: Buat Assessment Wizard (3-Step)

### Context References

- Section Spec:
    - Requirements applied: 3-step wizard (Informasi Assessment -> Penilaian -> Pertanyaan); channel config with weight validation (total 100%); assignment method and anonymity selection; instrument selection; question review with weight equalization
    - View coverage: UC-2 Create Assessment Cycle
- Sample Data:
    - Channel config example: Superior 40%, Peer 30%, Subordinate 20%, Self 10%
    - Instruments: "HEROES Behavioral Assessment v2" (7 questions, 6-point scale)
    - Copy grounded in sample data: yes

### 1) Screen Intent

- Primary user goal: Create a new assessment cycle with all required configuration
- Success criteria: Cycle created in draft status with valid configuration
- Key constraints: Step-by-step; cannot skip; weight validations enforced

### 2) Layout Regions

- Header: Wizard title + step indicator
- Main Content: Step-specific form content
- Footer: Navigation buttons (Kembali/Lanjutkan/Simpan)

### 3) Component Tree

- Wizard Container (full-page or large modal)
    - Header Region
        - Wizard Title: "Buat Assessment Baru"
        - Step Indicator: 3 steps with labels
            - Step 1: "Informasi Assessment" (active/completed/upcoming)
            - Step 2: "Penilaian"
            - Step 3: "Pertanyaan"
    - Content Region
        - **Step 1: Informasi Assessment**
            - Form Fields
                - Field: Judul Assessment
                    - Type: Input text
                    - Required: yes
                    - Placeholder: "Contoh: Penilaian Perilaku HEROES 2026"
                - Field: Pembuat
                    - Type: Input text (auto-filled, read-only)
                    - Value: current admin name
                - Field: Jenis Assessment
                    - Type: Select
                    - Options: Perilaku (behavioral), Kompetensi (competency), Custom (custom)
                    - Required: yes
                - Field: Tanggal Mulai
                    - Type: DatePicker
                    - Required: yes
                    - Validation: must be future date
                - Field: Tanggal Selesai
                    - Type: DatePicker
                    - Required: yes
                    - Validation: must be after start date
                - Field: Hasil Valid Hingga
                    - Type: DatePicker
                    - Required: no
                    - Null Handling: leave empty
                - Section: Konfigurasi Channel Evaluator
                    - Channel Row: Atasan
                        - Enabled: Checkbox (default: checked)
                        - Jumlah Evaluator: Number input (default: 1, fixed for superior)
                        - Bobot Penilaian: Number input with % suffix
                    - Channel Row: Rekan Kerja
                        - Enabled: Checkbox
                        - Jumlah Evaluator: Number input (max: 3)
                        - Bobot Penilaian: Number input with % suffix
                    - Channel Row: Bawahan
                        - Enabled: Checkbox
                        - Jumlah Evaluator: Label "Semua bawahan langsung"
                        - Bobot Penilaian: Number input with % suffix
                    - Channel Row: Diri Sendiri
                        - Enabled: Checkbox
                        - Jumlah Evaluator: Label "1" (fixed)
                        - Bobot Penilaian: Number input with % suffix
                    - Validation Summary: "Total Bobot: X%" (must equal 100%)
                    - [WARNING] If total != 100%: inline error "Total bobot harus 100%"
                - Field: Metode Penetapan Assessor
                    - Type: RadioGroup
                    - Options: Otomatis (auto), Manual (manual)
                - Field: Kebijakan Anonimitas
                    - Type: RadioGroup
                    - Options: Anonim (anonymous), Teridentifikasi (identified)
        - **Step 2: Penilaian (Select Instrument)**
            - Instrument List
                - Content Presentation: Card list of available instruments
                - Each card shows:
                    - Instrument Name: [AssessmentInstrument.name](http://AssessmentInstrument.name)
                    - Type Badge: assessment_type
                    - Question Count: total_questions + " pertanyaan"
                    - Scale Info: scale_points + "-point (" + scale_min_label + " - " + scale_max_label + ")"
                    - Template Badge: "Template" if is_template = true
                    - Select Radio: single selection
                - Secondary Action: "Buat Instrumen Baru" link -> opens instrument editor
            - Selected Instrument Preview
                - Shows summary of selected instrument details
        - **Step 3: Pertanyaan (Review/Edit Questions)**
            - Question List (from selected instrument)
                - For each question:
                    - Question Row (draggable for reorder)
                        - Drag Handle: reorder icon
                        - Question Number: auto-numbered
                        - Kompetensi: Select dropdown (from master competency data)
                        - Perilaku Inti: Input text
                        - Teks Pertanyaan: Textarea
                        - Bobot Soal: Number input with % suffix
                        - Actions: Edit (inline), Delete (with confirmation)
            - Controls
                - "Tambah Pertanyaan" button
                - Toggle: "Sama ratakan bobot" (auto-distributes 100% equally)
                - Validation Summary: "Total Bobot Soal: X%" (must equal 100%)
    - Footer Region (sticky)
        - Step 1: "Batal" (secondary) / "Lanjutkan" (primary, disabled if validation fails)
        - Step 2: "Kembali" (secondary) / "Lanjutkan" (primary, disabled if no instrument selected)
        - Step 3: "Kembali" (secondary) / "Simpan" (primary, disabled if weight != 100%)

### 4) Data Requirements

**Validation / Constraints**

- Step 1: Judul required; dates valid; channel weights sum to 100%
- Step 2: One instrument must be selected
- Step 3: Question weights sum to 100%; at least 1 question exists

### 5) Interaction States

- Default: Step 1 active, form empty
- Loading: Instrument list loading in Step 2
- Validation Error: Inline field errors; weight total highlighted in red if != 100%
- Save Success: "Siklus penilaian berhasil dibuat" toast; redirect to cycle list
- Save Error: "Gagal menyimpan. Silakan coba lagi."

### 6) Responsive Behavior

- Mobile (sm): Single column form; step indicator condensed
- Tablet (md): Single column; channel config as stacked cards
- Desktop (lg+): Form with comfortable spacing; channel config as inline table

---

## SCR-360HQ-003: Cycle Detail - Assessor Management

### Context References

- Section Spec:
    - Requirements applied: View/manage assessor assignments; filter by assessee/channel/status; override with justification; activate cycle
    - View coverage: UC-4 Manage Assessor Assignments
- Sample Data:
    - Assignments: ASG-020 (notified, no override), ASG-022 (completed, override), ASG-023 (skipped, override)

### 1) Screen Intent

- Primary user goal: Review and manage assessor-assessee assignments before and during cycle
- Success criteria: All assignments correctly mapped; overrides documented

### 2) Layout Regions

- Header: Cycle name + status + back navigation
- Controls Area: Filters (assessee, channel, status) + search
- Main Content: Assignment table
- Primary Actions: "Aktifkan Siklus" (when status = assigning)

### 3) Component Tree

- Screen Container
    - Header Region
        - Back Link: "Kembali ke Daftar Siklus"
        - Cycle Title: [AssessmentCycle.name](http://AssessmentCycle.name)
        - Status Badge: AssessmentCycle.status
        - Primary Button: "Aktifkan Siklus" (visible when status = configuring/assigning)
            - Confirmation: "Siklus akan diaktifkan dan assessor akan menerima notifikasi. Lanjutkan?"
    - Tab Bar (Cycle Detail sub-navigation)
        - Tab: "Penetapan Assessor" (active)
        - Tab: "Monitoring Penyelesaian" (-> SCR-360HQ-004)
        - Tab: "Hasil Penilaian" (-> SCR-360HQ-005)
    - Controls Region
        - Search: "Cari peserta..."
        - Filter: Channel - type: select - options: Semua, Atasan, Rekan Kerja, Bawahan, Diri Sendiri
        - Filter: Status - type: select - options: Semua, Pending, Notified, In Progress, Completed, Skipped
        - Filter: Override - type: select - options: Semua, Override Saja, Tanpa Override
    - Content Region
        - Content Presentation: Table (DataTable)
        - Table Columns
            - Column: Peserta (Assessee)
                - Data Source: assessee_name + assessee_position
                - Format Rule: name bold, position as subtitle
            - Column: Unit
                - Data Source: assessee_org
            - Column: Penilai (Assessor)
                - Data Source: assessor_name
            - Column: Channel
                - Data Source: channel
                - Format Rule: badge (Atasan/Rekan Kerja/Bawahan/Diri Sendiri)
            - Column: Status
                - Data Source: status
                - Format Rule: StatusBadge
            - Column: Override
                - Data Source: is_override
                - Format Rule: "Ya" badge (warning color) if true; "-" if false
                - Tooltip: override_reason when is_override = true
            - Column: Aksi
                - "Ganti Penilai" button (opens override dialog)
                - "Lewati" button (marks as skipped, requires reason)
    - Footer Region
        - Pagination: page size 25
        - Summary: "Menampilkan X dari Y penetapan"

### 4) Data Requirements

- AssessorAssignment: all assignments for selected cycle with joined employee data
- Default sort: assessee_name ascending, then channel order (superior, peer, subordinate, self)

### 5) Interaction States

- Default: Table populated with all assignments
- Loading: Skeleton rows
- Override Dialog:
    - Title: "Ganti Penilai"
    - Fields: Penilai Baru (employee search), Alasan (required textarea)
    - Actions: "Batal" / "Simpan Perubahan"
- Skip Dialog:
    - Title: "Lewati Penilai"
    - Fields: Alasan (required textarea)
    - Actions: "Batal" / "Ya, Lewati"
- Activate Confirmation:
    - Title: "Aktifkan Siklus Penilaian?"
    - Message: "Semua assessor yang sudah ditetapkan akan menerima notifikasi. Pastikan penetapan sudah benar."
    - [WARNING] Show warning count if any assessee has incomplete channel coverage
    - Actions: "Batal" / "Ya, Aktifkan"
- Empty: "Belum ada penetapan assessor. Jalankan auto-assign atau tambahkan secara manual."

---

## SCR-360HQ-004: Cycle Detail - Completion Monitoring

### Context References

- Section Spec:
    - Requirements applied: Overall completion dashboard; channel breakdown; per-assessee status; send reminders; extend deadline; close early
    - View coverage: UC-5 Monitor Completion
- Sample Data:
    - Overall: 89/312 completed (28.5%)
    - Channel rates: Superior 25%, Peer 26.4%, Subordinate 20.8%, Self 50%
    - Org breakdown: SDM highest (45%), Perencanaan lowest (18%)
    - Incomplete assessors: Bambang (5 pending), Agus (3), Maya (2)

### 1) Screen Intent

- Primary user goal: Monitor real-time assessment completion and take action on lagging areas
- Success criteria: Admin can identify incomplete areas and send targeted reminders

### 2) Layout Regions

- Header: Inherited from cycle detail
- Main Content: Dashboard cards + detailed assessee list
- Primary Actions: Kirim Pengingat, Perpanjang Deadline, Tutup Siklus

### 3) Component Tree

- Content Container (within Cycle Detail > Monitoring tab)
    - Dashboard Summary Cards (grid)
        - Card: Total Peserta
            - Value: "48 orang"
        - Card: Total Penugasan
            - Value: "312 penugasan"
        - Card: Penyelesaian Keseluruhan
            - Value: "28.5%" with progress bar
            - Supporting: "89 dari 312 selesai"
        - Card: Sisa Waktu
            - Value: derived from end_date - now
            - Format Rule: "X hari lagi" or "Terlambat X hari"
    - Section: Breakdown per Channel
        - Content Presentation: Horizontal bar chart or progress bars
        - For each channel:
            - Channel label + progress bar + "X/Y (Z%)"
    - Section: Breakdown per Unit Organisasi
        - Content Presentation: Table
        - Columns: Unit, Jumlah Peserta, Tingkat Penyelesaian (with progress bar)
    - Section: Assessor Belum Selesai
        - Content Presentation: Table
        - Columns: Nama Penilai, Jabatan, Channel, Jumlah Belum Selesai
        - Row Action: Checkbox for selection (bulk reminder)
        - Bulk Action: "Kirim Pengingat ke X Orang" (appears when rows selected)
    - Action Bar
        - Button: "Perpanjang Deadline" -> date picker dialog
        - Button: "Tutup Siklus Lebih Awal" -> confirmation dialog
            - Warning: "Assessor yang belum selesai akan dihitung sebagai tidak mengisi. Lanjutkan?"

### 4) Data Requirements

- completionSummary: derived aggregation per cycle
- AssessorAssignment: filtered by status for incomplete list
- Default sort (incomplete list): pending_count descending

### 5) Interaction States

- Default: Dashboard populated with real-time data
- Loading: Skeleton cards + skeleton tables
- Reminder Success: "Pengingat berhasil dikirim ke X assessor"
- Deadline Extended: "Deadline diperpanjang hingga DD MMM YYYY"
- Close Confirmation: dialog with warning
- Empty: "Belum ada data penyelesaian. Siklus belum aktif."

---

## SCR-360HQ-005: Cycle Detail - Hasil Penilaian (Results)

### Context References

- Section Spec:
    - Requirements applied: Results per assessee; sort by score/name/org; anomaly detection; validate then publish
    - View coverage: UC-6 Validate and Publish Results
- Sample Data:
    - Results: Bambang 5.61 (normal), Dewi 4.95 (anomaly, deviation 0.82), Hendra 3.85 (anomaly, deviation 1.45)
    - Score distribution: min 3.22, max 5.78, mean 4.89
    - Competency averages: Adaptif lowest (4.52), Harmonis highest (5.28)

### 1) Screen Intent

- Primary user goal: Review, validate, and publish assessment results
- Success criteria: Admin can identify anomalies, validate data integrity, and publish to end-users

### 2) Layout Regions

- Header: Inherited from cycle detail
- Main Content: Score distribution summary + results table
- Primary Actions: Validasi Hasil, Publikasikan Hasil

### 3) Component Tree

- Content Container (within Cycle Detail > Hasil tab)
    - Summary Section
        - Score Distribution Card
            - Min: score_distribution.min
            - Max: score_distribution.max
            - Rata-rata: score_distribution.mean
            - Median: score_distribution.median
        - Competency Averages
            - Content Presentation: Horizontal bars per competency
            - For each competency: name + avg_score bar + value
    - Results Table
        - Content Presentation: Table (DataTable)
        - Table Columns
            - Column: Nama Peserta
                - Data Source: assessee_name
                - Format Rule: text, clickable -> detail view
            - Column: Jabatan
                - Data Source: assessee_position
            - Column: Unit
                - Data Source: assessee_org
            - Column: Nilai
                - Data Source: overall_score / overall_max_score
                - Format Rule: "X.XX / Y.YY"
            - Column: Deviasi Self
                - Data Source: self_score_deviation
                - Format Rule: 2 decimal; warning color if > 0.5
            - Column: Anomali
                - Data Source: anomaly_flag
                - Format Rule: warning icon if true; "-" if false
            - Column: Status
                - Data Source: status
                - Format Rule: StatusBadge
    - Action Bar
        - Button: "Validasi Hasil" (visible when cycle status = scoring)
            - Confirmation: "Hasil penilaian akan divalidasi. Lanjutkan?"
            - Result: cycle status -> validated
        - Button: "Publikasikan Hasil" (visible when cycle status = validated)
            - Confirmation: "Hasil akan dipublikasikan dan dapat dilihat oleh seluruh peserta. Tindakan ini tidak dapat dibatalkan. Lanjutkan?"
            - Result: cycle status -> published
    - Footer Region
        - Pagination: page size 25

### 4) Data Requirements

- assessmentResults_adminView: all results for selected cycle
- Default sort: overall_score descending
- Filter: anomaly_flag, organization

### 5) Interaction States

- Default: Table populated with results
- Loading: Skeleton
- Validate Success: "Hasil berhasil divalidasi"
- Publish Success: "Hasil berhasil dipublikasikan. Peserta dapat melihat hasil penilaian mereka."
- [WARNING] Anomaly rows: highlighted with warning background
- Empty: "Hasil penilaian belum tersedia. Kalkulasi akan berjalan setelah siklus ditutup."

---

## SCR-360HQ-006: Upload Assessment (Dialog)

### Context References

- Section Spec:
    - Requirements applied: Download template; upload file; validate; show errors/warnings; confirm import
    - View coverage: UC-7 Upload Assessment Data
- Sample Data:
    - Upload result: 50 rows, 47 valid, 3 errors (invalid NIK, out-of-range, empty)
    - 1 warning (existing submission overwrite)

### 1) Screen Intent

- Primary user goal: Bulk import assessment data from spreadsheet
- Success criteria: Valid data imported; errors clearly identified

### 3) Component Tree

- Dialog (size: xl)
    - Dialog Title: "Unggah Assessment"
    - Step 1: Upload
        - Select: Pilih Siklus (dropdown of active cycles)
        - Link: "Unduh Template" -> downloads Excel template
        - File Upload Zone: drag-and-drop or click to select (.xlsx, .csv)
        - Button: "Validasi" (disabled until file selected)
    - Step 2: Validation Result
        - Summary Cards
            - Total Baris: [uploadValidationSample.total](http://uploadValidationSample.total)_rows
            - Valid: uploadValidationSample.valid_rows (green)
            - Error: uploadValidationSample.error_rows (red)
        - Error Table (if errors > 0)
            - Columns: Baris, Kolom, Nilai, Pesan Error
            - Each row from errors array
        - Warning Table (if warnings > 0)
            - Columns: Baris, Kolom, Nilai, Peringatan
            - Each row from warnings array
        - [WARNING] If error_rows > 0: "Perbaiki error sebelum import. Import parsial tidak diizinkan."
    - Footer
        - "Batal" (secondary)
        - "Import Data" (primary, disabled if error_rows > 0)

### 5) Interaction States

- Default: Step 1 visible
- Validating: Spinner on validate button
- Validation Complete: Step 2 visible with results
- Import Success: "Data berhasil diimpor. X submission dibuat." -> close dialog
- Import Error: "Gagal mengimpor data. Silakan coba lagi."

---

## SCR-360HQ-007: Ganti Atasan (Dialog)

### Context References

- Section Spec:
    - Requirements applied: Search assessee; show current superior; select new; provide reason; confirmation
    - View coverage: UC-8 Ganti Atasan
- Sample Data:
    - Hendra Wijaya: current superior Diana Permata (skipped) -> new Rudi Santoso (Acting VP)
    - Reason: "Diana Permata mutasi ke anak perusahaan per 1 Feb 2026"

### 3) Component Tree

- Dialog (size: lg)
    - Dialog Title: "Ganti Atasan"
    - Select: Pilih Siklus (dropdown of active cycles)
    - Search: "Cari peserta..." (by name or NIK)
    - Selected Assessee Card (after search)
        - Name: assessee_name
        - Position: assessee_position
        - Current Superior: current_[superior.name](http://superior.name) + " (" + current_superior.position + ")"
        - Current Status: assignment_status badge
    - Field: Atasan Baru
        - Type: Employee search (searchable select)
        - Required: yes
    - Field: Alasan Perubahan
        - Type: Textarea
        - Required: yes
        - Placeholder: "Jelaskan alasan penggantian atasan..."
    - Footer
        - "Batal" (secondary)
        - "Ganti Atasan" (primary, confirmation dialog)
            - Confirmation: "Atasan untuk [assessee_name] akan diganti dari [old] menjadi [new]. Submission sebelumnya (jika ada) akan dibatalkan. Lanjutkan?"

### 5) Interaction States

- Default: Cycle selected, search empty
- Searching: Loading spinner in search
- Selected: Assessee card visible with current superior info
- Success: "Atasan berhasil diganti" -> close dialog
- Error: "Gagal mengganti atasan. Silakan coba lagi."

---

## Screen Inventory Summary

| Screen ID | Screen Name | UC Coverage | Type |
| --- | --- | --- | --- |
| SCR-360HQ-001 | Assessment Cycle List | UC-1 | List |
| SCR-360HQ-002 | Buat Assessment Wizard (3-Step) | UC-2, UC-3 | Wizard/Form |
| SCR-360HQ-003 | Cycle Detail - Assessor Management | UC-4 | Detail/Table |
| SCR-360HQ-004 | Cycle Detail - Completion Monitoring | UC-5 | Dashboard |
| SCR-360HQ-005 | Cycle Detail - Hasil Penilaian | UC-6 | Detail/Table |
| SCR-360HQ-006 | Upload Assessment (Dialog) | UC-7 | Dialog |
| SCR-360HQ-007 | Ganti Atasan (Dialog) | UC-8 | Dialog |

---

## Source References