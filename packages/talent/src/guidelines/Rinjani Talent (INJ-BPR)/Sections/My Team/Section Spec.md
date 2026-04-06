# My Team Specification

## Overview

My Team adalah dashboard monitoring tim yang tersedia eksklusif untuk **Line Manager** di Rinjani Talent. Section ini memberikan visibilitas real-time terhadap status talent, action items yang memerlukan tindakan, profil tim, dan insight analitik. My Team bertindak sebagai **entry point dan summary** — aksi operasional (approval IDP, review aspirasi, dll.) tetap dilakukan di modul masing-masing melalui deep link.

Line Manager dengan assignment ganda dapat memilih konteks posisi melalui **Position Selector**: Posisi Definitif (primary), Project Assignment (secondary), atau Talent Mobility (secondary).

---

## User Flows / Use Cases

### UC-MT-001: Select Position Context

- **Actor:** Line Manager (dengan 2+ assignment)
- **Preconditions:** User memiliki lebih dari satu assignment aktif (Definitif + Project Assignment / Talent Mobility)
- **Main Flow:**
    1. User membuka My Team
    2. Sistem menampilkan Position Selector di atas konten utama
    3. Default selection: Posisi Definitif
    4. User dapat switch ke Project Assignment atau Talent Mobility
    5. Seluruh data di Dashboard, Team Profile, dan Team Insights berubah sesuai konteks posisi yang dipilih
- **Postconditions:** Semua data My Team menampilkan bawahan sesuai posisi yang dipilih
- **Acceptance Criteria:**
    - Default selalu Posisi Definitif saat pertama kali membuka
    - Badge label menunjukkan tipe assignment: "Definitif", "Project Assignment", atau "Talent Mobility"
    - Jumlah bawahan di-refresh saat switch posisi
    - Jika user hanya punya 1 assignment, Position Selector tidak ditampilkan

---

### UC-MT-002: View Action Required Dashboard

- **Actor:** Line Manager
- **Preconditions:** User memiliki bawahan langsung pada posisi yang dipilih
- **Main Flow:**
    1. User membuka My Team atau sudah di halaman Dashboard
    2. Sistem menampilkan summary cards untuk setiap kategori action item:
        - **IDP Pending Approval** — Jumlah IDP bawahan yang menunggu approval
        - **Aspiration Pending Review** — Jumlah aspirasi bawahan yang belum di-review (Team Aspiration)
        - **360 Assessment Pending** — Jumlah assessment yang harus diisi sebagai assessor untuk bawahan
        - **Team Members Flagged** — Jumlah bawahan dengan flag: at-risk, underperforming, atau needs attention
    3. User meng-klik salah satu summary card
    4. Sistem menampilkan list item detail di bawah cards
    5. User meng-klik item individual untuk navigasi ke modul terkait (deep link)
- **Postconditions:** User mengetahui semua pending actions dan dapat navigasi ke modul terkait
- **Acceptance Criteria:**
    - Summary cards menampilkan count aktif (0 jika tidak ada)
    - Cards dengan count > 0 memiliki visual emphasis
    - Klik card menampilkan detail list dengan nama bawahan, deskripsi singkat, dan tanggal
    - Klik item individual membuka modul terkait:
        - IDP → Development Plan / My Team (IDP approval queue)
        - Aspiration → Career Aspiration / Team Aspiration
        - 360 Assessment → 360 Assessment / Assigned Assessment
        - Flagged Members → Team Profile detail
    - Jika semua count = 0, tampilkan pesan "Tidak ada action item yang tertunda"

---

### UC-MT-003: View Action Backlog

- **Actor:** Line Manager
- **Preconditions:** User memiliki bawahan langsung
- **Main Flow:**
    1. User scroll ke bawah Dashboard melewati Action Required cards
    2. Sistem menampilkan Backlog — daftar kronologis semua action items yang belum diselesaikan
    3. Setiap item menampilkan: tipe action, nama bawahan, deskripsi, tanggal masuk, urgency indicator
    4. User dapat filter backlog berdasarkan tipe action (IDP, Aspiration, Assessment, Flag)
    5. User dapat sort berdasarkan tanggal (terlama/terbaru) atau urgency
- **Postconditions:** User memiliki visibilitas terhadap semua outstanding items
- **Acceptance Criteria:**
    - Backlog menampilkan semua item dari 4 kategori action
    - Item yang sudah melewati deadline ditandai dengan urgency indicator
    - Filter dan sort dapat dikombinasikan
    - Pagination diterapkan jika item > 10
    - Klik item membuka modul terkait (deep link)

---

### UC-MT-004: View Team Profile - Roster

- **Actor:** Line Manager
- **Preconditions:** User memiliki bawahan langsung pada posisi yang dipilih
- **Main Flow:**
    1. User navigasi ke tab Team Profile
    2. Sistem menampilkan roster bawahan langsung dalam bentuk tabel/list
    3. Setiap bawahan menampilkan: foto, nama, posisi, grade/band, 9-Box classification (terbaru), EQS score (posisi definitif bawahan), status talent pool
    4. User dapat search berdasarkan nama
    5. User dapat sort berdasarkan nama, grade, EQS score, atau 9-Box cluster
    6. User meng-klik bawahan untuk melihat detail profil
- **Postconditions:** User mengetahui komposisi tim dan status talent setiap anggota
- **Acceptance Criteria:**
    - Roster menampilkan semua bawahan langsung sesuai posisi yang dipilih di Position Selector
    - 9-Box tag menampilkan **hasil klasifikasi terbaru** (periode terakhir yang sudah published)
    - EQS score dan breakdown mengacu ke **posisi definitif dari bawahan** (bukan posisi target)
    - Jika bawahan belum memiliki klasifikasi 9-Box atau EQS, tampilkan "Belum tersedia"
    - Search bersifat real-time (filter saat mengetik)

---

### UC-MT-005: View Team Profile - 9-Box Distribution

- **Actor:** Line Manager
- **Preconditions:** User memiliki bawahan langsung; minimal 1 bawahan sudah terklasifikasi
- **Main Flow:**
    1. User berada di tab Team Profile
    2. Di atas roster, sistem menampilkan 9-Box grid mini dengan distribusi bawahan per cell
    3. Setiap cell menampilkan jumlah bawahan
    4. User meng-klik cell untuk filter roster hanya menampilkan bawahan di cell tersebut
    5. Sistem menampilkan label cluster: High Potential, Promotable, Solid Contributor, Sleeping Tiger, Unfit
- **Postconditions:** User memahami distribusi talent dalam timnya
- **Acceptance Criteria:**
    - Grid menampilkan 9 cell dengan count per cell
    - Cell mapping mengikuti standar 5-cluster: HP, Promotable, Solid Contributor, Sleeping Tiger, Unfit
    - Klik cell memfilter roster di bawahnya
    - Klik ulang cell yang sama menghapus filter
    - Bawahan tanpa klasifikasi tidak muncul di grid tetapi tetap muncul di roster

---

### UC-MT-006: View Team Profile - EQS Summary

- **Actor:** Line Manager
- **Preconditions:** User memiliki bawahan langsung; minimal 1 bawahan memiliki EQS score
- **Main Flow:**
    1. User berada di tab Team Profile
    2. Sistem menampilkan EQS summary section: distribusi bawahan per EQS band (Highly Qualified, Qualified, Needs Development, Not Recommended)
    3. Setiap band menampilkan count dan persentase dari total bawahan yang sudah memiliki EQS
    4. User meng-klik band untuk filter roster
- **Postconditions:** User memahami distribusi kualifikasi tim
- **Acceptance Criteria:**
    - EQS score yang ditampilkan adalah skor untuk **posisi definitif dari masing-masing bawahan**
    - Band boundaries: Highly Qualified ≥ 85, Qualified 70-84, Needs Development 50-69, Not Recommended < 50
    - Bawahan tanpa EQS score ditampilkan sebagai kategori terpisah "Belum Dihitung"
    - Filter dari 9-Box dan EQS band dapat aktif bersamaan (AND logic)

---

### UC-MT-007: View Subordinate Detail

- **Actor:** Line Manager
- **Preconditions:** Bawahan terdaftar di roster
- **Main Flow:**
    1. User meng-klik nama bawahan di roster
    2. Sistem menampilkan detail panel/page dengan:
        - **Profile Summary:** Nama, foto, posisi, grade/band, unit, hire date
        - **Talent Status:** 9-Box classification (terbaru), EQS score + 6 komponen breakdown (posisi definitif), talent pool status, risk profile
        - **Career Aspiration Summary:** Jumlah aspirasi individual + rekomendasi yang diterima. Link ke Career Aspiration
        - **IDP Progress:** Status IDP aktif (draft/pending/approved), completion rate, jam pengembangan. Link ke Development Plan
        - **360 Assessment:** Skor terbaru jika ada. Link ke 360 Assessment
        - **Job Applications:** Jumlah aplikasi aktif jika ada. Link ke Job Tender Marketplace
    3. Setiap section memiliki link "Lihat Detail" ke modul terkait
- **Postconditions:** User memiliki gambaran lengkap tentang status talent bawahan
- **Acceptance Criteria:**
    - EQS breakdown menampilkan 6 komponen: Kinerja, Kompetensi, Pengalaman, Aspirasi, Pelatihan, TES
    - Semua EQS data mengacu ke posisi definitif bawahan
    - Section yang belum memiliki data menampilkan empty state dengan pesan informatif
    - Deep link ke modul terkait berfungsi dan membawa context (employee ID)

---

### UC-MT-008: View Team Insights

- **Actor:** Line Manager
- **Preconditions:** User memiliki bawahan langsung
- **Main Flow:**
    1. User navigasi ke tab Team Insights
    2. Sistem menampilkan analytics summary:
        - **9-Box Distribution Trend** — Perbandingan distribusi 9-Box periode sekarang vs periode sebelumnya (jika ada)
        - **EQS Distribution** — Histogram/chart distribusi EQS score seluruh bawahan
        - **IDP Completion Rate** — Persentase bawahan yang sudah complete IDP vs total
        - **Aspiration Coverage** — Persentase bawahan yang sudah memiliki aspirasi (dari sumber manapun)
    3. Setiap metric menampilkan angka utama dan trend indicator (naik/turun/stabil)
- **Postconditions:** User memiliki insight analitik tentang kondisi talent timnya
- **Acceptance Criteria:**
    - 9-Box trend hanya muncul jika ada data minimal 2 periode
    - EQS distribution mengacu ke posisi definitif masing-masing bawahan
    - IDP completion rate dihitung dari periode IDP aktif
    - Aspiration coverage menghitung bawahan yang memiliki minimal 1 aspirasi dari sumber manapun (individual, supervisor, job holder, unit)
    - Jika data insufficient untuk chart, tampilkan pesan "Data belum cukup untuk menampilkan trend"

---

### UC-MT-009: Empty State - No Subordinates

- **Actor:** Line Manager (tanpa bawahan di posisi yang dipilih)
- **Preconditions:** User teridentifikasi sebagai Line Manager tetapi tidak memiliki bawahan pada posisi yang dipilih di Position Selector
- **Main Flow:**
    1. User membuka My Team atau switch Position Selector
    2. Sistem menampilkan empty state: "Tidak ada bawahan langsung pada posisi ini"
    3. Jika user memiliki bawahan di posisi lain, sistem menyarankan switch posisi
- **Postconditions:** User memahami bahwa tidak ada data untuk ditampilkan
- **Acceptance Criteria:**
    - Empty state menampilkan pesan yang jelas dan tidak membingungkan
    - Jika bawahan tersedia di posisi lain, tampilkan suggestion "Coba pilih posisi lain"
    - Position Selector tetap dapat diakses

---

## UI Requirements (Behavioral)

- **Navigation:** My Team terdiri dari 3 sub-view: Dashboard, Team Profile, Team Insights. Navigasi menggunakan tab atau segmented control
- **Position Selector:** Ditampilkan di atas tab navigation; persist across tab switches; tidak ditampilkan jika hanya 1 assignment
- **Action Items:** Summary cards di Dashboard bersifat clickable dan expandable; deep link ke modul terkait
- **Backlog:** Sortable dan filterable; pagination untuk > 10 items
- **Roster:** Searchable, sortable table; klik row membuka detail panel
- **9-Box Grid:** Interactive mini grid; klik cell memfilter roster; visual count per cell
- **EQS Summary:** Band distribution bars; klik band memfilter roster; filter combinable dengan 9-Box
- **Subordinate Detail:** Panel/slide-over dengan section-based layout; setiap section memiliki deep link ke modul asli
- **Team Insights:** Read-only analytics; charts/visualizations; trend indicators
- **Data Freshness:** Semua data real-time dari API; 9-Box menggunakan klasifikasi terbaru (published); EQS mengacu posisi definitif bawahan
- **Responsive:** Dashboard cards stack vertikal di mobile; 9-Box grid tetap 3x3 dengan scroll horizontal jika perlu; roster switch ke card view di mobile

---

## Data Dependencies

### Entities (from Data Model)

- **Employee** — Bawahan langsung (filtered by reporting line + position context)
- **TalentPoolCandidate** — 9-Box classification, talent pool status, risk profile
- **EQSScore** — Total score dan band (filtered by target_position_id = posisi definitif bawahan)
- **EQSComponent** — 6 komponen breakdown per bawahan
- **IDPRecord** — Status IDP aktif, total/completed hours
- **IDPActivity** — Detail aktivitas IDP untuk completion tracking
- **CareerAspiration** — Aspirasi dari 4 sumber (individual, supervisor, job_holder, unit)
- **AssessorAssignment** — 360 Assessment assignments sebagai assessor
- **AssessmentResult** — Skor assessment terbaru per bawahan
- **Application** — Job tender applications per bawahan
- **TalentPoolPeriod** — Periode talent pool aktif (untuk 9-Box trend)

### Relationships

- Line Manager → Employee (1:N melalui ReportingLine, filtered by position context)
- Employee → TalentPoolCandidate (1:N per period)
- Employee → EQSScore (1:N, filtered by target_position_id = employee's definitive position)
- Employee → IDPRecord (1:N per cycle)
- Employee → CareerAspiration (sumber: individual, supervisor, job_holder, unit)
- Employee → AssessorAssignment (as assessee, untuk Line Manager sebagai assessor)
- Employee → Application (1:N, active applications)

### Position Context

- **Posisi Definitif** — Primary assignment; default selection
- **Project Assignment** — Secondary assignment; bawahan di project tertentu
- **Talent Mobility** — Secondary assignment; bawahan yang ditugaskan sementara

---

## Out of Scope

- IDP approval workflow (dilakukan di Development Plan / My Team sub-menu)
- Aspiration submission/editing (dilakukan di Career Aspiration / Team Aspiration)
- 360 Assessment questionnaire filling (dilakukan di 360 Assessment / Assigned Assessment)
- Team member performance data entry atau editing
- Cross-team comparison (hanya bawahan langsung)
- Batch actions pada multiple bawahan
- Notification management
- Export/download reports (Team Insights bersifat view-only)

---