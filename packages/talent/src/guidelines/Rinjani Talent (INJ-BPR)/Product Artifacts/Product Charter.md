# Rinjani Talent — Product Charter

---

## Overview

**Rinjani Talent** adalah modul Talent Management System dalam platform Rinjani ITMS untuk InJourney Group. Produk ini menyediakan solusi end-to-end untuk pengelolaan talenta internal, mulai dari aspirasi karir karyawan, klasifikasi talent, talent pool management, talent review, succession planning, hingga internal job tender.

---

## Brand Identity

### Archetype: The Hero

- **Brave, ambitious, responsible, protective**
- UI language must be *empowering*, clear, firm, yet hospitable
- Avoid passive language — always encourage action

### Philosophy: "Unity in Diversity, Legacy in Every Journey"

- System must feel seamless and cohesive
- Reflects integration of various BUMN entities under one umbrella
- Every user interaction should reinforce sense of belonging to something greater

### Differentiator: "Hangat namun Megah" (Warm yet Majestic)

**Warmth (Hangat):**

- Interface must not feel cold or rigid
- Use empathic, hospitality-driven microcopy
- Apply warm colors (Orange `#ff9220`) at key touchpoints

**Majesty & Legacy (Megah):**

- Use Supergrafis Kawung visual elements where appropriate
- High-quality cultural photography for premium feel
- Instill pride that users are part of "Legacy in Every Journey"
- Primary color (`#00495d`) conveys authority and trust

---

## Design Principles

1. **Empowering** — Use active voice, encourage action, make users feel capable
2. **Clear** — Avoid jargon, be direct, reduce cognitive load
3. **Warm** — Friendly but professional, hospitality-driven interactions
4. **Respectful** — Use proper Indonesian (Anda, not kamu), honor user's time
5. **Consistent** — Same patterns across all modules, predictable behavior
6. **Accessible** — Design for all users, follow accessibility guidelines

---

## Problem Statement

Grup InJourney menghadapi tantangan dalam pengelolaan talenta:

| No | Problem | Impact |
| --- | --- | --- |
| 1 | Data aspirasi karir karyawan tidak terkonsolidasi | Ketidaksesuaian antara kebutuhan organisasi dan ekspektasi karyawan |
| 2 | Tidak ada framework klasifikasi talent yang konsisten | Kesulitan identifikasi high potential vs solid contributor |
| 3 | Proses job tender internal masih manual | Waktu pengisian posisi vacant rata-rata 45-60 hari |
| 4 | Tidak ada visibilitas real-time terhadap talent pipeline | Succession planning reaktif, bukan proaktif |
| 5 | Evaluasi kandidat tidak berbasis data | Keputusan karir inkonsisten antar entitas |

---

## Solution

Rinjani Talent menyediakan platform terintegrasi yang:

1. **Mengkonsolidasi aspirasi karir** dari 4 sumber (Individual, Supervisor, Job Holder, Unit)
2. **Memetakan talent** ke dalam 9-box grid berdasarkan Performance & Potential
3. **Menghitung EQS (Employee Qualification Score)** untuk ranking kandidat objektif
4. **Memfasilitasi Internal Job Tender** dengan proses terstruktur dan transparan
5. **Mendukung Talent Committee** dalam pengambilan keputusan berbasis data

---

## Key Features

### My Talent Journey (Employee & Line Manager POV)

- **Career Aspiration** - Portal aspirasi karir dari 4 sumber: Individual, Supervisor, Job Holder, dan Unit
- **Development Plan (IDP)** - Personal IDP management, smart recommendations, progress tracking, dan Learning Wrapped
- **Job Tender Marketplace** - Explore dan apply lowongan internal dengan eligibility check dan proses bidding terstruktur
- **360 Assessment** - Penilaian multi-rater (self, atasan, rekan, bawahan) dengan kuesioner Likert scale
- **My Team** - Dashboard monitoring tim untuk Line Manager: action required, team profile, dan team insights

### Talent Management (HCBP & Talent Committee POV)

- **Talent Pool** - Talent directory dengan EQS ranking, AI search, dan pool health analytics
- **Talent Classification (9-Box)** - Pemetaan talent ke 9-box grid (Performance × Potential) dengan calibration
- **Succession Planning** - Succession planning untuk Key Strategic Positions dengan HCBP shortlist dan TC approval
- **Talent Review** - Proses review career movement oleh Talent Committee berbasis trigger

### Administration (Admin HC POV)

- **Talent Headquarter** - Consolidated admin module: Talent Config, IDP Config, 360 Assessment, Reports & Analytics, Audit Log

---

## Product Roadmap

### My Talent Journey

#### Career Aspiration

- **Priority:** High
- **POV:** All Employees, Line Manager, KSP Holder, HCBP/Unit Head
- **Menu Structure:**
    - **My Aspiration** (Employee) - Submit aspirasi karir individual (max 6 posisi: 3 horizontal, 3 vertical)
    - **Recommendations for Me** (Employee) - Lihat rekomendasi dari Supervisor, Job Holder, Unit
    - **My Classification** (Employee) - Posisi 9-Box, EQS breakdown, status talent pool
    - **Team Aspiration** (Line Manager) - Submit aspirasi untuk bawahan dengan readiness assessment
    - **Job Holder Aspiration** (KSP Holder) - Rekomendasikan suksesor untuk posisi
    - **Unit Aspiration** (HCBP/Unit Head) - Ajukan kebutuhan talent unit
- **Dependencies:** Data Model foundation, Performance Module (for 9-Box)
- **Estimated Effort:** M

#### Development Plan (IDP)

- **Priority:** High
- **POV:** All Employees + Line Managers
- **Menu Structure:**
    - **My IDP** (Employee) — Personal IDP management
    - **My Team** (Manager) — Team IDP oversight, visible jika user = Line Manager
- **Employee Features (My IDP):**
    - IDP Dashboard & Gap Analysis
    - Smart Recommendations (berdasarkan gap analysis dan job family)
    - IDP Drafting **with Reason Tag** (Career Aspiration, Performance Improvement, Gap Fulfillment)
    - Course Catalog Browser (integrasi LMS)
    - Submission Workflow (approval ke atasan)
    - Progress Tracking (development hours, completion status)
    - **My Learning Wrapped** — Visual recap pencapaian pembelajaran di akhir periode
- **Manager Features (My Team):**
    - Team IDP Monitoring Dashboard — Status **Planning** (Draft, Submitted, Approved) dan **Execution** (Not Started, In Progress, Completed)
    - Position Selector — Untuk atasan dengan 2+ posisi (Definitif + PLH/Job Sharing)
    - IDP Approval Queue
    - **Assign IDP Item to Subordinate** — Atasan assign item dengan Reason Tag
    - **Learning Evaluation Form (Likert Scale)** — Wajib diisi saat Mid-Year untuk item yang completed
    - **Team Learning Wrapped** — Recap pencapaian tim
- **Timeline:** IDP Planning dimulai **setelah Performance Planning selesai** (trigger-based)
- **Access Exception:** Pekerja PGS wajib approve IDP bawahan jika definitif holder tidak tersedia
- **Dependencies:** Performance Module (trigger), LMS Catalog
- **Estimated Effort:** L

#### Job Tender Marketplace

- **Priority:** High
- **POV:** All Employees (Kandidat Internal)
- **Features:**
    - Explore Job — Katalog posisi tersedia dengan filter multi-dimensi
    - My Application — Dashboard tracking aplikasi kandidat
    - Saved Job — Shortlist posisi yang diminati
    - Apply Flow — Proses pendaftaran dengan eligibility check
- **Dependencies:** None (dapat standalone)
- **Estimated Effort:** L

#### 360 Assessment

- **Priority:** High
- **POV:** All Employees (Assessee & Assessor)
- **Menu Structure:**
    - **My Assessment** (Assessee) - Lihat hasil penilaian dan skor per kompetensi
    - **Assigned Assessment** (Assessor) - Isi kuesioner untuk rekan/atasan/bawahan
- **Features:**
    - My Assessment Dashboard (assessment list, status, scores)
    - Assessment Report Detail (competency breakdown, behavior indicators)
    - Assigned Assessment List (progress tracking per questionnaire)
    - Fill Questionnaire (Likert scale, auto-save, progress bar)
    - Assessment History
- **Dependencies:** Competency Module (for competency mapping)
- **Estimated Effort:** M

#### My Team

- **Priority:** High
- **POV:** Line Manager
- **Menu Structure:**
    - **Dashboard** - Action required items dan backlog
    - **Team Profile** - Roster, 9-Box distribution, EQS summary
    - **Team Insights** - Analitik tim
- **Dependencies:** Career Aspiration, Talent Classification
- **Estimated Effort:** S

---

### Talent Management Modules

#### Talent Pool

- **Priority:** High
- **POV:** HR Manager, HC Admin
- **Features:**
    - Pool Dashboard & Statistics
    - Talent Distribution visualization
    - Talent List with Search & Filter
    - Talent Detail (Profile, Assessment History, Development Progress)
- **Dependencies:** Job Tender Marketplace (shared data model)
- **Estimated Effort:** L

#### Succession Planning *(Future)*

- **Priority:** Medium
- **POV:** HR Manager, Talent Committee
- **Features:**
    - Succession Dashboard (Critical Positions, Pipeline Health)
    - Position Detail with Successor Candidates
    - Readiness Levels tracking
    - Reports & Analytics
- **Dependencies:** Talent Pool
- **Estimated Effort:** L

#### Talent Classification (9-Box)

- **Priority:** High
- **POV:** HR Manager, HC Admin, Talent Committee
- **Features:**
    - 9-Box Grid View (Interactive)
    - Employee Placement with Drag & Drop
    - Classification Detail (Box Statistics, Employee List)
    - Calibration Session
- **Dependencies:** Talent Pool
- **Estimated Effort:** L

#### Talent Review

- **Priority:** High
- **POV:** HR Manager, HC Admin, Talent Committee
- **Features:**
    - Review Dashboard (Pending Reviews, Calendar)
    - Review Detail (Assessment Form, Rating, Feedback)
    - Review History
- **Dependencies:** 9-Box Classification
- **Estimated Effort:** M

---

### Administration Modules

#### Talent Headquarter

- **Priority:** High
- **POV:** Admin / HC Admin
- **Features:**
    - Dashboard (Organization Overview, Talent Metrics)
    - Configuration (Period Settings, Assessment Templates, Workflow Rules)
    - Reports & Analytics (Talent Reports, Succession Reports)
    - Audit Log
- **Dependencies:** All modules
- **Estimated Effort:** L

#### IDP Headquarter (IDP HQ)

- **Priority:** High
- **POV:** HC Admin / HC Manager
- **Features:**
    - **Cycle Management** — Konfigurasi periode IDP, trigger after Performance Planning
    - **Library Management** — Mapping kompetensi ke katalog kursus LMS
    - **Automated Reminders** — Notifikasi untuk pending submission dan approval
    - **Bulk Assign IDP** — Mass assignment by Cohort, Perusahaan, atau Job Family
    - **Custom Reason Tag Management** — Kelola custom tags untuk bulk assignment (contoh: "InJourney Society FIRST Class")
    - **Completion Analytics** — Dashboard completion rate per unit, periode, status
    - **Gap Analytics** — Top competency gaps dan most requested courses
- **Dependencies:** IDP Module, LMS Catalog
- **Estimated Effort:** M

#### 360 Assessment HQ

- **Priority:** High
- **POV:** HC Admin / Member Admin
- **Consolidation:** Modul ini dikonsolidasi ke dalam **Talent Headquarter** sebagai sub-tab, bersama Talent Config (EQS/Pool/Succession) dan IDP Config
- **Features:**
    - Assessment Cycle Management (create, configure, activate, close)
    - Instrument & Template Management (question builder, competency mapping, Likert config)
    - Assessor Management (auto-assign, manual override with audit trail)
    - Completion Monitoring Dashboard (real-time compliance tracking)
    - Assessment Analytics (completion rates, score distributions per entity)
    - Upload Assessment (bulk import)
    - Ganti Atasan (Definitif/Lakhar) - Override superior assignment
- **Dependencies:** 360 Assessment Module, Competency Module
- **Estimated Effort:** M

<aside>
📌

**HQ Consolidation:** Talent Headquarter kini menjadi satu menu sidebar dengan sub-tabs: Talent Config | IDP Config | 360 Assessment | Reports & Analytics | Audit Log

</aside>

---

## RBAC & Permissions

| Role | Job Tender Marketplace | Talent Headquarter |
| --- | --- | --- |
| **Karyawan** | Explore, Apply, View Own | - |
| **HR Manager** | View All | Full Access |
| **Unit Owner** | View Unit | Create Position, Manage Applicants |
| **Approver** | - | Approve/Reject Positions |
| **HC Admin** | View All | Full Access, Settings, Reports |
| **Talent Committee** | - | View Reports, Analytics |

---

## Technical Integration

### Data Sources

- **DWH (Master Data Management)** — Employee master, Position master, Organization structure
- **HRIS Core** — Grade, Job Family, Tenure data
- **Performance Module** — Performance Rating history
- **Competency Module** — Job Fit Score, Assessment results

### APIs

- NIP Validation API (DWH)
- Notification Service
- Document Generation Service

---

## Source References

- **BRD:** Internal Job Tender Requirements
- **PRD:** InJourney Talent Management System (Classification, Pool, Review, Succession)
- **PRD:** Career Aspiration - InJourney ITMS
- **Design System:** Rinjani Talent Design System Guidelines (Figma Make)

---

---

## Sitemap Overview

<aside>
🗺️

**Rinjani Talent** terdiri dari 3 area utama berdasarkan Point of View (POV) pengguna:

1. **My Talent Journey** — Employee & Line Manager POV
2. **Talent Management** — HCBP & Talent Committee POV
3. **Administration** — Admin HC POV
</aside>

```jsx
RINJANI TALENT
├── 🚀 MY TALENT JOURNEY (Employee POV)
│   ├── 🏠 Home
│   │   ├── Career Status Card
│   │   ├── My Classification Card (9-Box + EQS)
│   │   ├── Aspiration Summary Card
│   │   ├── IDP Progress Card
│   │   ├── Job Applications Card
│   │   └── Period Alerts
│   │
│   ├── 🎯 Career Aspiration
│   │   ├── My Aspiration
│   │   ├── Recommendations for Me
│   │   ├── My Classification
│   │   ├── Team Aspiration (Line Manager)
│   │   ├── Job Holder Aspiration (KSP Holder)
│   │   └── Unit Aspiration (HCBP/Unit Head)
│   │
│   ├── 📋 Development Plan
│   │   ├── My IDP
│   │   ├── Team IDP (Line Manager)
│   │   └── Learning Wrapped
│   │
│   ├── 💼 Job Tender Marketplace
│   │   ├── Browse Jobs
│   │   ├── Job Details + Eligibility Check
│   │   ├── My Applications
│   │   └── Saved Jobs
│   │
│   ├── 📝 360 Assessment
│   │   ├── My Assessment (Assessee: scores, reports)
│   │   ├── Assigned Assessment (Assessor: fill questionnaire)
│   │   └── Assessment History
│   │
│   └── 👥 My Team (Line Manager only)
│       ├── Dashboard (Action Required + Backlog)
│       ├── Team Profile (Roster + 9-Box + EQS)
│       └── Team Insights
│
├── 📊 TALENT MANAGEMENT (HCBP & TC POV)
│   ├── 🎯 Talent Pool
│   │   ├── Pool Dashboard & Statistics
│   │   ├── Talent Directory (Browse + AI Search)
│   │   ├── Talent Detail (5-Tab Profile View)
│   │   └── Pool Health Analytics
│   │
│   ├── 📐 Talent Classification (9-Box)
│   │   ├── 9-Box Matrix View (Interactive)
│   │   ├── Cell Detail (Employee List per Box)
│   │   ├── Calibration Interface
│   │   ├── Manual Override + Justification
│   │   └── Classification History
│   │
│   ├── 🔄 Succession Planning
│   │   ├── Succession Board (Kanban)
│   │   ├── Position Detail + Shortlist Selection
│   │   ├── Profile Match-Up (Comparison View)
│   │   ├── TC Voting Interface
│   │   ├── Digital Signature (Berita Acara)
│   │   └── Employee Succession Status View
│   │
│   └── ⭐ Talent Review
│       ├── Review Dashboard (Pending + Calendar)
│       ├── Eligible Employee List
│       ├── Supervisor Proposal Form
│       ├── HC Recommendation Form
│       ├── TC Decision Interface
│       └── Review History
│
└── ⚙️ ADMINISTRATION (Admin HC POV)
    └── 🏛️ Talent Headquarter (Consolidated)
        ├── [Tab] Talent Config (EQS, Pool, Succession, TC)
        ├── [Tab] IDP Config (Cycle, Library, Reminders, Bulk Assign)
        ├── [Tab] 360 Assessment (Cycles, Templates, Assessor Mgmt)
        ├── [Tab] Reports & Analytics
        └── [Tab] Audit Log
```

---

## Access Matrix

| **Menu** | **Employee** | **Line Manager** | **KSP Holder** | **HCBP** | **Admin HC** |
| --- | --- | --- | --- | --- | --- |
| Home | ✅ | ✅ | ✅ | ✅ | ✅ |
| Career Aspiration | ✅ | ✅ | ✅ | ✅ | ✅ |
| › Team Aspiration | — | ✅ | — | — | — |
| › Job Holder Aspiration | — | ✅ | ✅ | — | — |
| › Unit Aspiration | — | — | — | ✅ | — |
| Development Plan | ✅ | ✅ | ✅ | ✅ | ✅ |
| › Team IDP | — | ✅ | — | — | — |
| Job Tender Marketplace | ✅ | ✅ | ✅ | ✅ | ✅ |
| My Team | — | ✅ | — | — | — |
| Talent Pool | — | — | — | ✅ | ✅ |
| Talent Classification | — | — | — | ✅ | ✅ |
| Succession Planning | — | — | — | ✅ | ✅ |
| Talent Review | — | — | — | ✅ | ✅ |
| Talent Headquarter | — | — | — | — | ✅ |
| IDP Headquarter | — | — | — | — | ✅ |

---

## Use Case Mapping

<aside>
📋

**Rinjani 2.0 (v1.1)** — Use cases telah dipetakan ulang berdasarkan hasil FGD dengan stakeholder. Berikut adalah pemetaan use cases per modul.

</aside>

### My Talent Journey — Employee POV

#### Career Aspiration

| **UC ID** | **Use Case** | **Description** | **Actor** |
| --- | --- | --- | --- |
| CA-01 | Submit Individual Aspiration | Karyawan mengajukan aspirasi karir (max 6 posisi: 3 horizontal, 3 vertical) | All Employees |
| CA-02 | View Recommendations | Melihat rekomendasi dari Supervisor, Job Holder, dan Unit | All Employees |
| CA-03 | View My Classification | Melihat posisi 9-Box, EQS breakdown, dan status talent pool | All Employees |
| CA-04 | Submit Team Aspiration | Atasan submit aspirasi untuk bawahan dengan readiness assessment | Line Manager |
| CA-05 | Submit Job Holder Aspiration | Pemegang jabatan merekomendasikan suksesor untuk posisinya | KSP Holder |
| CA-06 | Submit Unit Aspiration | HCBP/Unit Head mengajukan kebutuhan talent untuk unit | HCBP/Unit Head |

#### Development Plan (IDP)

| **UC ID** | **Use Case** | **Description** | **Actor** |
| --- | --- | --- | --- |
| IDP-01 | Create IDP | Buat IDP dengan reason tag (Career Aspiration, Performance Improvement, Gap Fulfillment) | All Employees |
| IDP-02 | Browse Course Catalog | Browse kursus dari LMS dengan smart recommendations | All Employees |
| IDP-03 | Track Progress | Monitor development hours dan completion status | All Employees |
| IDP-04 | View Learning Wrapped | Visual recap pencapaian pembelajaran di akhir periode | All Employees |
| IDP-05 | Approve IDP | Line Manager approve/reject IDP bawahan | Line Manager |
| IDP-06 | Evaluate Learning | Mid-Year evaluation (Likert Scale) untuk item completed | Line Manager |
| IDP-07 | Assign IDP Item | Atasan assign item dengan Reason Tag ke bawahan | Line Manager |

#### Job Tender Marketplace

| **UC ID** | **Use Case** | **Description** | **Actor** |
| --- | --- | --- | --- |
| JT-01 | Browse Jobs | Explore posisi tersedia dengan filter (job family, grade, location, deadline) | All Employees |
| JT-02 | Check Eligibility | View eligibility status per posisi (criteria checklist) | All Employees |
| JT-03 | Apply Job | Submit aplikasi (max 3 aplikasi aktif) | All Employees |
| JT-04 | Track Application | Monitor status aplikasi (Applied → Shortlisted → Selected/Rejected) | All Employees |
| JT-05 | Save Job | Bookmark posisi yang diminati | All Employees |

---

### Talent Management — HCBP & TC POV

#### Talent Pool

| **UC ID** | **Use Case** | **Description** | **Output** |
| --- | --- | --- | --- |
| TP-01 | Browse Talent Directory | HCBP/Manager view kandidat dengan filter, tags, dan AI Search. Ranking by EQS. | Talent List |
| TP-02 | View Talent Profile | 5-tab detail view: Overview, Assessment, Development, History, Aspiration. Role-based access. | Profile View |
| TP-03 | Monitor Pool Health | Dashboard dengan metrics, 9-Box distribution, Risk Profile indicators, Top Talent count | Analytics |

<aside>
🏷️

**Tagging System (Rinjani 2.0 v1.1):**

- **9-Box Classification** — Hasil kalibrasi tahunan per Company × Band Jabatan
- **Top Talent** — Manual designation oleh HC (independen dari 9-Box)
- **Talent Review Proposed** — Auto-tag saat ada active proposal
- **HCBP Shortlisted** — Saat HCBP formally shortlist untuk posisi KSP
- **Risk Profile** — LOW 🟢 / MEDIUM 🟡 / HIGH 🔴 (informatif, bukan eligibility gate)
</aside>

#### Talent Classification (9-Box)

| **UC ID** | **Use Case** | **Description** | **Output** |
| --- | --- | --- | --- |
| TC-01 | View 9-Box Matrix | Interactive 9-Box grid dengan employee count per cell. Click cell untuk detail list. | Matrix View |
| TC-02 | Run Calibration | Jalankan kalkulasi 9-Box per cohort (Company × Band Jabatan) dengan relative threshold | Calibrated Placements |
| TC-03 | Calibrate Classification | TC kalibrasi hasil klasifikasi, dapat manual override dengan justification | Updated Classification |
| TC-04 | View History | Lihat riwayat pergerakan 9-Box employee dari waktu ke waktu | History Timeline |

<aside>
⚠️

**Catatan Penting:** Tag 9-Box Classification dan Tag Top Talent adalah **dua hal yang berbeda**. High Potential di 9-Box tidak otomatis menjadi Top Talent, dan sebaliknya Top Talent dapat berasal dari box manapun.

</aside>

#### Succession Planning

| **UC ID** | **Use Case** | **Description** | **Output** |
| --- | --- | --- | --- |
| SP-01 | Monitor KSP Pipeline | Kanban view: Vacant → Vacant Soon → To Review → Filled. Filter by TC Tier. | Position Overview |
| SP-02 | View Candidate List | Default: All eligible ranked by EQS. Tags: Top Talent (priority), Talent Review Proposed, Risk Profile | Candidate Ranking |
| SP-03 | HCBP Shortlist | Formalize min 3 kandidat per posisi KSP. Override capability dengan justification. | Shortlisted Candidates |
| SP-04 | Profile Match-Up | Side-by-side comparison kandidat (EQS, Job Fit, Experience, Aspiration) | Comparison View |
| SP-05 | Select Successor | Pilih Primary / Secondary / Tertiary dengan Readiness Level (Ready Now, 1-2 Yr, 3+ Yr) | Succession Plan |
| SP-06 | TC Approval | Digital voting + signature untuk succession plan. Generate Berita Acara. | Approved Succession |

<aside>
📋

**Eligibility Suksesor (PD.INJ.03.01/06/2022/A.0003):**

1. Kinerja 3 tahun terakhir minimal On Target
2. Job Fit minimal 70%
3. EQS Target Position minimal 60
4. Masa kerja grade saat ini minimal 1 tahun
5. Tidak sedang menjalani hukuman disiplin
6. Riwayat Job Family match dengan posisi target
</aside>

#### Talent Review

| **UC ID** | **Use Case** | **Description** | **Output** |
| --- | --- | --- | --- |
| TR-01 | View Eligible Employees | Trigger-based list (tenure ≥3Y di posisi/grade, contract expiry, performance flag) | Eligible List |
| TR-02 | Submit Proposal | Supervisor submit proposal + pilih target position dari eligible positions ranked by EQS | Proposal + Target |
| TR-03 | HC Recommendation | HC review proposal, add rationale, confirm/adjust position recommendation | HC Recommendation |
| TR-04 | TC Decision | Talent Committee review dan approve career movement (separate TC dari Succession Planning TC) | Approved Movement |
| TR-05 | View Review History | Lihat riwayat review dan keputusan per employee | History Timeline |

<aside>
🎯

**Position Selection Logic (Rinjani 2.0 v1.1):**

Saat Supervisor submit proposal Promosi, sistem:

1. Filter posisi yang eligible (grade ±3, job family rules, in succession pipeline)
2. Rank posisi by employee's EQS untuk setiap posisi
3. Display ke Supervisor untuk dipilih
</aside>

---

### Administration — Admin HC POV

#### Talent Headquarter

| **UC ID** | **Use Case** | **Description** | **Actor** |
| --- | --- | --- | --- |
| THQ-01 | Configure Period | Set classification period, talent review schedule, aspiration window | Admin HC |
| THQ-02 | Manage Templates | Configure assessment templates, form templates | Admin HC |
| THQ-03 | Configure Workflows | Set approval workflows, TC tier mapping, eligibility thresholds | Admin HC |
| THQ-04 | View Reports | Generate talent reports, succession reports, movement analytics | Admin HC |
| THQ-05 | View Audit Log | Audit trail untuk semua perubahan klasifikasi, override, dan keputusan TC | Admin HC |

#### IDP Headquarter

| **UC ID** | **Use Case** | **Description** | **Actor** |
| --- | --- | --- | --- |
| IDPHQ-01 | Manage Cycle | Configure IDP period, trigger after Performance Planning | Admin HC |
| IDPHQ-02 | Manage Library | Map kompetensi ke katalog kursus LMS | Admin HC |
| IDPHQ-03 | Configure Reminders | Set automated notifications untuk pending submission dan approval | Admin HC |
| IDPHQ-04 | Bulk Assign IDP | Mass assignment by Cohort, Perusahaan, atau Job Family dengan custom Reason Tag | Admin HC |
| IDPHQ-05 | View Analytics | Completion rate per unit, top competency gaps, most requested courses | Admin HC |

---

## Integration Flow

```jsx
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          TALENT MANAGEMENT FLOW                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   TALENT POOL              TALENT              SUCCESSION        TALENT         │
│   (Discovery)              CLASSIFICATION      PLANNING          REVIEW         │
│                            (Assessment)        (Position-based)  (Employee)     │
│                                                                                 │
│   ┌─────────┐              ┌─────────┐         ┌─────────┐       ┌─────────┐   │
│   │All Talent│              │9-Box    │         │KSP      │       │Trigger: │   │
│   │Directory │              │Matrix   │         │Pipeline │       │Tenure≥3Y│   │
│   └────┬────┘              └────┬────┘         └────┬────┘       └────┬────┘   │
│        │                        │                   │                 │         │
│        │ ┌──────────────────────┤                   │                 │         │
│        │ │ Tag: 9-Box Class.    │                   │                 │         │
│        │ │ Tag: Top Talent      │                   │                 │         │
│        ▼ ▼  (SEPARATE tags)     │                   │                 │         │
│   ┌─────────────┐               │                   │                 │         │
│   │ Candidate   │◄──────────────┼───────────────────┤                 │         │
│   │ List        │   Default: All eligible by EQS   │                 │         │
│   │             │                                   │                 │         │
│   │ Tags:       │◄──────────────────────────────────┼─────────────────┤         │
│   │ • Top Talent│   Tag: "Talent Review Proposed"  │                 │         │
│   │ • 9-Box     │                                   │                 │         │
│   │ • TR Prop.  │                                   │                 │         │
│   │ • Risk Prof.│                                   │                 │         │
│   └─────────────┘                                   │                 │         │
│                                                     │                 │         │
│                                    ┌────────────────┘                 │         │
│                                    │                                  │         │
│                                    ▼                                  ▼         │
│                            ┌─────────────┐                    ┌─────────────┐   │
│                            │ HCBP        │                    │ Supervisor  │   │
│                            │ Shortlist   │                    │ Proposal    │   │
│                            │ (min 3)     │                    │ + Target    │   │
│                            └──────┬──────┘                    │ Position    │   │
│                                   │                           └──────┬──────┘   │
│                                   │                                  │          │
│                                   ▼                                  ▼          │
│                            ┌─────────────┐                    ┌─────────────┐   │
│                            │ Select      │                    │ HC          │   │
│                            │ Successor   │                    │ Recommend   │   │
│                            │ P/S/T       │                    └──────┬──────┘   │
│                            └──────┬──────┘                           │          │
│                                   │                                  │          │
│                                   ▼                                  ▼          │
│                            ┌─────────────┐                    ┌─────────────┐   │
│                            │ Succession  │                    │ Talent      │   │
│                            │ TC Approval │ ◄── SEPARATE TC ──►│ Review TC   │   │
│                            └─────────────┘                    └─────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Talent Committee Structure

| **Tier** | **Ketua** | **Anggota** | **Secretary** | **Scope (Band Target)** |
| --- | --- | --- | --- | --- |
| **Tier 1** | Direktur Utama INJ | BoD Terkait | GH HCBP INJ | BoD, BoD-1 (Grade 24-28) |
| **Tier 2** | Direktur HC | BoD Terkait | GH HCBP | BoD-2, BoD-3 (Grade 18-23) |
| **Tier 3** | Direktur Terkait / HCBP GH | GH HCBP & GH Terkait | DH HCBP | BoD-4 (Grade 07-17) |

### Movement Variations

| **Jenis Movement** | **Dasar Hukum** | **Keterangan** |
| --- | --- | --- |
| Mutasi Definitif | Surat Keputusan (SK) | Perpindahan permanen ke posisi baru |
| Talent Mobility | Surat Penugasan (SP) | Perpindahan sementara, tetap tercatat di unit asal |
| Joint TC | Joint Berita Acara | Talent mobility lintas entitas, melibatkan Host & Home Company |

---

## Next Steps

1. Define Data Model untuk entities Internal Job Tender
2. Define Design Tokens menggunakan existing Rinjani style guide
3. Define Shell Spec untuk navigation structure