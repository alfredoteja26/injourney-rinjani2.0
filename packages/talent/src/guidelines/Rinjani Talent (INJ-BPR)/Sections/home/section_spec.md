# Home Specification

## Overview

Home adalah landing page utama Rinjani Talent yang menyediakan personalized dashboard bagi setiap pengguna. Halaman ini mengagregasi informasi penting dari seluruh modul My Talent Journey — Career Aspiration, Development Plan (IDP), Job Tender Marketplace, dan 360 Assessment — ke dalam card-based layout yang ringkas dan actionable. Line Manager mendapat tambahan Team Summary preview dengan direct access ke My Team.

## User Flows / Use Cases

1. **View Personalized Dashboard**
    - Actor: All Employees
    - Preconditions: User authenticated, memiliki data Employee aktif di sistem
    - Main Flow:
        1. User membuka Rinjani Talent (landing page)
        2. Sistem menampilkan personalized greeting ("Selamat pagi/siang/sore, [Nama]") berdasarkan waktu lokal user
        3. Sistem menampilkan Career Status Card dengan informasi posisi definitif saat ini
        4. Sistem menampilkan My Classification Card, Aspiration Summary Card, IDP Progress Card, dan Job Applications Card
        5. Sistem menampilkan Period Alerts jika ada periode aktif atau deadline mendekati
        6. Sistem menampilkan Quick Actions bar untuk shortcut ke aksi utama
    - Postconditions: User memiliki gambaran lengkap status talent journey
    - Acceptance Criteria:
        - Greeting menyesuaikan waktu lokal (pagi: 00-11, siang: 11-15, sore: 15-18, malam: 18-24)
        - Semua card ter-render dalam waktu < 3 detik
        - Data pada card merefleksikan state terkini dari masing-masing modul
        - Card yang datanya belum tersedia menampilkan empty state informatif
2. **View Career Status**
    - Actor: All Employees
    - Preconditions: Employee memiliki posisi definitif aktif
    - Main Flow:
        1. Sistem menampilkan Career Status Card berisi: nama posisi, unit organisasi, band jabatan, grade jabatan, dan masa kerja di posisi saat ini
        2. User melihat ringkasan informasi karir
    - Postconditions: User mengetahui status posisi saat ini
    - Acceptance Criteria:
        - Menampilkan posisi definitif aktif (bukan PLH/penugasan sementara)
        - Masa kerja dihitung dari tanggal efektif posisi saat ini
        - Jika data posisi tidak tersedia, tampilkan empty state: "Data posisi belum tersedia"
3. **View My Classification (9-Box + EQS)**
    - Actor: All Employees
    - Preconditions: Employee memiliki EQS Score dan 9-Box classification untuk posisi definitif saat ini
    - Main Flow:
        1. Sistem menampilkan My Classification Card berisi:
            - Posisi 9-Box classification terkini (label cluster: High Potential, Promotable, Solid Contributor, Sleeping Tiger, Unfit)
            - Mini 9-Box grid visual dengan highlight pada posisi user
            - Total EQS Score (0-100) beserta EQS Band (Highly Qualified, Qualified, Needs Development, Not Recommended)
            - Breakdown 6 komponen EQS: Kinerja (20%), Kompetensi (20%), Pengalaman (20%), Aspirasi (10%), Pelatihan (20%), TES (10%) — masing-masing menampilkan weighted value
        2. User melihat posisi dan skor kualifikasi secara ringkas
        3. User dapat tap/click card untuk navigasi ke halaman My Classification (detail)
    - Postconditions: User memahami posisi talent classification dan breakdown EQS
    - Acceptance Criteria:
        - EQS Score yang ditampilkan adalah skor terhadap **posisi definitif yang sedang ditempati** (bukan posisi target lain)
        - 9-Box classification menggunakan data dari TalentPoolCandidate terkini (periode aktif)
        - Breakdown komponen EQS menampilkan 6 komponen lengkap dengan bobot dan weighted value
        - Jika belum ada data classification, tampilkan empty state: "Klasifikasi talent belum tersedia untuk periode ini"
        - EQS Band ditampilkan dengan color coding sesuai StatusBadge
4. **View Aspiration Summary**
    - Actor: All Employees
    - Preconditions: Employee memiliki data aspirasi karir (dari modul Career Aspiration)
    - Main Flow:
        1. Sistem menampilkan Aspiration Summary Card berisi:
            - Jumlah aspirasi aktif (dari 4 sumber: Individual, Supervisor, Job Holder, Unit)
            - Breakdown count per sumber aspirasi
            - Ringkasan aspirasi individual terbaru (posisi target + movement type: Horizontal/Vertical)
        2. User dapat tap/click card untuk navigasi ke Career Aspiration > My Aspiration
    - Postconditions: User mengetahui ringkasan aspirasi karir
    - Acceptance Criteria:
        - Count aspirasi dihitung dari semua sumber yang aktif
        - Aspirasi individual menampilkan max 3 posisi terbaru
        - Jika belum ada aspirasi, tampilkan empty state dengan CTA: "Ajukan Aspirasi Karir"
5. **View IDP Progress**
    - Actor: All Employees
    - Preconditions: Employee memiliki IDPRecord untuk periode aktif
    - Main Flow:
        1. Sistem menampilkan IDP Progress Card berisi:
            - Status IDP saat ini (Draft, Pending Approval, Approved, Revision Requested, Completed)
            - Progress bar: completed_hours / total_hours
            - Jumlah aktivitas per status (Not Started, In Progress, Completed)
            - Upcoming activity terdekat (berdasarkan target_date)
        2. User dapat tap/click card untuk navigasi ke Development Plan > My IDP
    - Postconditions: User mengetahui progress pengembangan
    - Acceptance Criteria:
        - Progress bar menampilkan persentase jam yang sudah dicapai vs total
        - Jika minimum development hours belum terpenuhi, tampilkan warning indicator
        - Jika tidak ada IDP untuk periode aktif, tampilkan empty state: "Belum ada rencana pengembangan untuk periode ini"
6. **View Job Applications**
    - Actor: All Employees
    - Preconditions: User pernah submit aplikasi di Job Tender Marketplace
    - Main Flow:
        1. Sistem menampilkan Job Applications Card berisi:
            - Jumlah aplikasi aktif (status selain accepted/rejected/withdrawn)
            - List aplikasi aktif masing-masing menampilkan: nama posisi, unit organisasi, movement type (Promosi/Rotasi), dan status terkini (Submitted, Screening, Shortlisted, Interview, Offered)
            - Tanggal submit untuk setiap aplikasi
        2. User dapat tap/click pada item aplikasi untuk navigasi ke detail aplikasi di Job Tender Marketplace > My Applications
        3. User dapat tap/click header card untuk navigasi ke halaman My Applications
    - Postconditions: User mengetahui status seluruh lamaran aktif
    - Acceptance Criteria:
        - Hanya menampilkan aplikasi aktif (exclude: accepted, rejected, withdrawn)
        - Setiap item aplikasi menampilkan posisi, organisasi, movement type, dan status
        - Status ditampilkan dengan StatusBadge (color-coded)
        - Jika tidak ada aplikasi aktif, tampilkan empty state: "Tidak ada lamaran aktif" dengan CTA "Jelajahi Lowongan"
7. **View Period Alerts**
    - Actor: All Employees
    - Preconditions: Terdapat periode aktif atau deadline mendekati pada modul My Talent Journey
    - Main Flow:
        1. Sistem menampilkan Period Alerts section berisi notifikasi terkait:
            - **Career Aspiration:** "Periode aspirasi karir [nama] sedang dibuka (deadline: [tanggal])"
            - **IDP:** "Deadline pengisian IDP [nama periode] dalam [X] hari", "IDP Anda memerlukan revisi"
            - **Job Tender:** "Lowongan baru tersedia di Job Tender Marketplace", "Deadline pendaftaran [posisi] dalam [X] hari"
            - **360 Assessment:** "Anda memiliki [X] assessment yang harus diisi", "Hasil assessment [nama siklus] sudah tersedia"
        2. Setiap alert memiliki action link yang mengarahkan ke modul terkait
        3. Alert yang sudah lewat deadline atau sudah di-dismiss tidak ditampilkan lagi
    - Postconditions: User aware terhadap semua action items dan deadline
    - Acceptance Criteria:
        - Alert diurutkan berdasarkan urgency (deadline terdekat di atas)
        - Alert menggunakan severity level: info (biru), warning (orange), urgent (merah)
        - Maksimal 5 alert ditampilkan; jika lebih, tampilkan "Lihat Semua" link
        - Alert memiliki icon sesuai modul sumber (Career: Target, IDP: ClipboardList, IJT: Briefcase, 360: ClipboardCheck)
8. **Use Quick Actions**
    - Actor: All Employees
    - Preconditions: User berada di halaman Home
    - Main Flow:
        1. Sistem menampilkan Quick Actions bar berisi shortcut buttons:
            - "Ajukan Aspirasi" → navigasi ke Career Aspiration > My Aspiration
            - "Kelola IDP" → navigasi ke Development Plan > My IDP
            - "Jelajahi Lowongan" → navigasi ke Job Tender Marketplace
            - "Isi Assessment" → navigasi ke 360 Assessment > Assigned Assessment (visible hanya jika ada assessment pending)
        2. User tap/click salah satu quick action
        3. Sistem navigasi ke halaman tujuan
    - Postconditions: User diarahkan ke modul yang dipilih
    - Acceptance Criteria:
        - Quick Actions ditampilkan sebagai icon + label buttons
        - "Isi Assessment" hanya muncul jika ada AssessorAssignment dengan status pending/notified/in_progress
        - Quick Actions responsive: horizontal scroll pada mobile
9. **View Team Summary (Line Manager)**
    - Actor: Line Manager
    - Preconditions: User memiliki role Line Manager dengan bawahan langsung
    - Main Flow:
        1. Sistem mendeteksi bahwa user adalah Line Manager (berdasarkan ReportingLine)
        2. Sistem menampilkan Team Summary Card tambahan berisi:
            - Jumlah bawahan langsung
            - Distribusi 9-Box tim (mini heatmap atau count per cluster)
            - IDP team status summary: jumlah per status (Draft, Submitted, Approved, In Progress, Completed)
            - Action items count: jumlah approval pending (IDP, Aspiration, dll)
        3. Card memiliki "Lihat Tim Saya" button yang navigasi ke My Team
    - Postconditions: Line Manager memiliki overview status tim
    - Acceptance Criteria:
        - Team Summary Card hanya muncul untuk user dengan role Line Manager
        - Data tim dihitung dari bawahan langsung (level 1 ReportingLine)
        - Action items badge menampilkan jumlah total item yang memerlukan tindakan
        - "Lihat Tim Saya" button navigasi ke /my-team

## UI Requirements (Behavioral)

- **Layout:** Card-based grid layout — 2 kolom pada desktop, 1 kolom pada mobile
- **Greeting:** Personalized greeting bar di atas cards ("Selamat [waktu], [Nama]") dengan tanggal hari ini
- **Card Navigation:** Setiap card clickable sebagai link ke detail page masing-masing modul
- **Card Order (default):**
    1. Career Status Card (full width)
    2. My Classification Card | Aspiration Summary Card (2 kolom)
    3. IDP Progress Card | Job Applications Card (2 kolom)
    4. Team Summary Card (full width, Line Manager only)
    5. Period Alerts (full width)
    6. Quick Actions (full width, sticky bottom pada mobile)
- **Loading State:** Skeleton loading per card (cards load independently)
- **Error State:** Jika satu card gagal load, tampilkan error state pada card tersebut tanpa mempengaruhi card lain
- **Empty State:** Setiap card memiliki empty state spesifik dengan CTA yang relevan
- **Refresh:** Pull-to-refresh pada mobile, auto-refresh setiap 5 menit pada desktop
- **Period Alerts:** Dismissable oleh user, persisted via local storage

## Data Dependencies

- **Entities (from Data Model):**
    - `Employee` (External Reference) — nama, posisi, organisasi, grade, band, masa kerja
    - `EQSScore` — total_score, eqs_band, target_position_id (filtered to current definitive position)
    - `EQSComponent` — component_type, weight, raw_value, weighted_value (6 komponen per EQS)
    - `TalentPoolCandidate` — talent_cluster (9-Box classification), is_top_talent, period_id
    - `TalentPoolPeriod` — name, year, status (for active period)
    - `IDPRecord` — status, total_hours, completed_hours, cycle_id
    - `IDPActivity` — title, status, target_date (for upcoming activity)
    - `IDPCycle` — name, submission_deadline, status
    - `Application` — position_id, status, movement_type, submitted_at
    - `Position` — title, organization_id, grade_jabatan (for application detail)
    - `TenderPeriod` — name, start_date, end_date, status
    - `AssessorAssignment` — cycle_id, status (for pending assessment count)
    - `AssessmentCycle` — name, start_date, end_date, status
- **Relationships:**
    - Employee → EQSScore (filter: target_position_id = current definitive position, period = active)
    - EQSScore → EQSComponent (1:N, 6 komponen)
    - Employee → TalentPoolCandidate (filter: period = active)
    - Employee → IDPRecord (filter: cycle = active)
    - IDPRecord → IDPActivity (1:N)
    - Employee → Application (1:N, filter: active status)
    - Application → Position (N:1)
    - Employee → AssessorAssignment (filter: assessor_id = current user, status = pending/notified/in_progress)
- **External/Aggregated:**
    - ReportingLine data (untuk deteksi Line Manager role dan bawahan langsung)
    - Career Aspiration data (aggregated count per sumber)

## Out of Scope

- Kustomisasi layout atau urutan card oleh user
- Widget builder atau dashboard configurability
- Notifikasi push atau email (hanya in-app alert)
- Detailed analytics atau chart pada Home (tersedia di modul masing-masing)
- Team management actions (approve, reject) langsung dari Home — hanya preview dan navigasi
- Career Path atau roadmap visualization (tersedia di Career Aspiration > My Classification)
