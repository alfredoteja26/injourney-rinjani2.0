## Screen Design: My KPI (SEC-MK)

**Module Code:** SEC-MK

**Parent Product:** Rinjani Performance (INJ-BPR)

---

## Design Token References

<aside>
🎨

**Design Tokens v1.0 Alignment**

This screen design references tokens from [INJ-BPR - Design Tokens](https://www.notion.so/INJ-BPR-Design-Tokens-dca6a38e25a84a4daaaa8d78550e3356?pvs=21).

- **Typography**: Plus Jakarta Sans (headings), Inter (body)
- **Primary Color**: `#E31937` (--color-primary-500, InJourney Red)
- **Secondary Color**: `#1E3A5F` (--color-secondary-500, Navy)
</aside>

### Color Token Reference

| Token | Hex | Usage |
| --- | --- | --- |
| --color-primary-500 | #E31937 | Primary buttons, links, active states |
| --color-primary-100 | #FCE8EB | Primary element backgrounds |
| --color-rating-successful | #10B981 | On-track status (PI ≥3.50) |
| --color-rating-partial | #F59E0B | At-risk status (PI 2.50-3.49) |
| --color-rating-unsuccessful | #DC2626 | Behind status (PI <2.50) |
| --color-kpi-bersama | #2563EB | KPI Bersama badge |
| --color-kpi-unit | #059669 | KPI Unit badge |
| --color-status-draft | #6B7280 | Draft status badge |

---

## Prototype Context

| Attribute | Value |
| --- | --- |
| **User** | Binavia Wardhani (NIK: 260102) |
| **Position** | Group Head Human Capital Strategy |
| **Band Jabatan** | Madya |
| **Unit** | Direktorat Human Capital |
| **Company** | PT Aviasi Pariwisata Indonesia (Holding) |
| **Assessment Year** | 2026 |
| **Current Phase** | Check-In 1 Completed, Approaching Check-In 2 |

---

## Phase 1: Planning (Goal Setting)

### MK-SCR-01: My KPI Dashboard (Planning Phase)

### Layout

```jsx

```

┌─────────────────────────────────────────────────────────────────────────┐

│ 🏠 Rinjani > Performance > My KPI                            🔔  👤 BW   │

├─────────────────────────────────────────────────────────────────────────┤

│                                                                         │

│  📊 My KPI 2026                                          [Year: 2026 ▼] │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ 📋 GOAL SETTING IN PROGRESS                                          ││

│  │ Deadline: 28 Feb 2026 (21 days remaining)                            ││

│  │ Progress: ████████████░░░░░░░░ 65%                                   ││

│  │                                                                       ││

│  │ [Continue Goal Setting →]                                            ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  ┌──────────────────────┐  ┌──────────────────────┐                    │

│  │ 📊 Total KPI          │  │ ⚖️ Weight Status      │                    │

│  │                       │  │                       │                    │

│  │    8 / 8              │  │   100% ✓              │                    │

│  │    KPI Drafted        │  │   Balanced            │                    │

│  └──────────────────────┘  └──────────────────────┘                    │

│                                                                         │

│  Cascaded from Atasan: Dimas Sayyid (VP HC Strategy)                    │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  KPI BERSAMA (45% dari total bobot)                     [Cascaded 🔒]    │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ #  │ KPI                              │ Bobot │ Target │ Status     ││

│  ├─────────────────────────────────────────────────────────────────────┤│

│  │ 1  │ EBITDA Group                     │ 15%   │ 2.5T   │ ✓ Set      ││

│  │ 2  │ Customer Satisfaction Index      │ 15%   │ 4.5    │ ✓ Set      ││

│  │ 3  │ Human Capital Effectiveness Idx  │ 15%   │ 85%    │ ✓ Set      ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  KPI UNIT (55% dari total bobot)                        [+ Tambah KPI]   │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ #  │ KPI                              │ Bobot │ Target │ Status     ││

│  ├─────────────────────────────────────────────────────────────────────┤│

│  │ 4  │ HC Strategy Document Completion  │ 15%   │ 100%   │ ✓ Set      ││

│  │ 5  │ Talent Pipeline Ratio            │ 15%   │ 1:3    │ ✓ Set      ││

│  │ 6  │ Organization Design Accuracy     │ 10%   │ 95%    │ ⚠ Draft    ││

│  │ 7  │ Workforce Planning Accuracy      │ 10%   │ 90%    │ ⚠ Draft    ││

│  │ 8  │ HC Analytics Dashboard Adoption  │ 5%    │ 80%    │ ⚠ Draft    ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  ─────────────────────────────────────────────────────────────────────  │

│  [Submit untuk Approval]                                                │

│                                                                         │

└─────────────────────────────────────────────────────────────────────────┘

```

```

### MK-SCR-02: Goal Setting Form

### Layout

```jsx

```

┌─────────────────────────────────────────────────────────────────────────┐

│ ← Kembali ke My KPI                                                     │

├─────────────────────────────────────────────────────────────────────────┤

│                                                                         │

│  ✏️ Edit KPI Unit                                                        │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  Judul KPI *                                                            │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Organization Design Accuracy                                         ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Deskripsi *                                                            │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Persentase akurasi struktur organisasi yang didesain sesuai dengan  ││

│  │ kebutuhan bisnis dan best practice organization design.             ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  ┌─────────────────────┐  ┌─────────────────────┐                      │

│  │ Bobot              *│  │ Target*             │                      │

│  │ [10] %              │  │ [95] %              │                      │

│  └─────────────────────┘  └─────────────────────┘                      │

│                                                                         │

│  Polaritas                            *Periode Monitoring*              │

│  (●) Higher is Better                  [Semester ▼]                     │

│  ( ) Lower is Better                                                   │

│                                                                         │

│  Formula Pengukuran *                                                   │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ (Jumlah unit dengan struktur sesuai / Total unit yang direview)     ││

│  │ × 100%                                                              │

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Sumber Data / Evidence *                                               │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Organization Structure Review Report, OD Assessment Document         │

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Parent KPI (Cascading Source)                                          │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ 📊 HC Strategy Excellence (VP HC Strategy) - 25%                     │

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  ─────────────────────────────────────────────────────────────────────  │

│  [Batalkan]                                      [Simpan sebagai Draft] │

│                                                                         │

└─────────────────────────────────────────────────────────────────────────┘

```

```

---

## Phase 2: Monitoring (Check-In)

### MK-SCR-04: My KPI Dashboard (Monitoring Phase - After Check-In 1)

### Layout

```jsx

```

┌─────────────────────────────────────────────────────────────────────────┐

│ 🏠 Rinjani > Performance > My KPI                            🔔  👤 BW   │

├─────────────────────────────────────────────────────────────────────────┤

│                                                                         │

│  📊 My KPI 2026                                          [Year: 2026 ▼] │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐            │

│  │ 📈 PI Score     │  │ ⭐ PR Rating    │  │ 📅 Next Action  │            │

│  │                 │  │                │  │                 │            │

│  │   3.79          │  │  Excellent     │  │ Check-In 2      │            │

│  │   Current       │  │  (Sementara)   │  │ 1-31 Jul 2026   │            │

│  └────────────────┘  └────────────────┘  └────────────────┘            │

│                                                                         │

│  Assessment Timeline 2026                                               │

│  ─────────────────────────────────────────────────────────────────────  │

│  ●━━━━━━━━━●━━━━━━━━━○━━━━━━━━━○━━━━━━━━━○                              │

│  Goal      CI-1      CI-2      CI-3      YER                            │

│  ✓ Done    ✓ Done    Upcoming  Upcoming  Upcoming                       │

│                                                                         │

│  KPI BERSAMA (45%)                         Score: 3.75    [Expand ▼]     │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ KPI                           │ Bobot │ Target │ Actual │ Score     ││

│  ├─────────────────────────────────────────────────────────────────────┤│

│  │ 🟢 EBITDA Group                │ 15%   │ 2.5T   │ 2.4T   │ 3.8       ││

│  │ 🟢 Customer Satisfaction Idx   │ 15%   │ 4.5    │ 4.4    │ 3.9       ││

│  │ 🟡 HC Effectiveness Index      │ 15%   │ 85%    │ 80%    │ 3.5       ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  KPI UNIT (55%)                            Score: 3.82    [Expand ▼]     │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ KPI                           │ Bobot │ Target │ Actual │ Score     ││

│  ├─────────────────────────────────────────────────────────────────────┤│

│  │ 🟢 HC Strategy Doc Completion  │ 15%   │ 100%   │ 100%   │ 4.2       ││

│  │ 🟢 Talent Pipeline Ratio       │ 15%   │ 1:3    │ 1:3.2  │ 4.0       ││

│  │ 🟢 Org Design Accuracy         │ 10%   │ 95%    │ 92%    │ 3.6       ││

│  │ 🟡 Workforce Planning Acc      │ 10%   │ 90%    │ 85%    │ 3.4       ││

│  │ 🟡 HC Analytics Adoption       │ 5%    │ 80%    │ 70%    │ 3.2       ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Check-In History                                                       │

│  ─────────────────────────────────────────────────────────────────────  │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ ✅ Check-In 1 (Q1)  │ 15 Apr 2026 │ PI: 3.79 │ [Lihat Detail]        ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

└─────────────────────────────────────────────────────────────────────────┘

```

```

### MK-SCR-05: Check-In Form (Employee Side)

### Layout

```jsx

```

┌─────────────────────────────────────────────────────────────────────────┐

│ ← Kembali ke My KPI                                                     │

├─────────────────────────────────────────────────────────────────────────┤

│                                                                         │

│  📝 Check-In 1 - Q1 2026                                                │

│  Periode: 1 Apr - 30 Apr 2026                                           │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  Tanggal Diskusi dengan Atasan *                                        │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ 📅 15 April 2026                                                    ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  KPI Achievement Summary (Auto-calculated)                              │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ KPI Bersama: 3.75 (45%)  │  KPI Unit: 3.82 (55%)  │  PI: 3.79       │

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Update Realisasi per KPI                                               │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  ▼ HC Strategy Document Completion (Target: 100%)                       │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Realisasi Q1: [100] %                                               ││

│  │                                                                     │

│  │ Catatan Pencapaian:                                                 ││

│  │ ┌─────────────────────────────────────────────────────────────────┐ ││

│  │ │ Telah menyelesaikan dokumen HC Strategy 2026-2028 termasuk:     │ ││

│  │ │ - Workforce Planning Framework                                  │ ││

│  │ │ - Talent Acquisition Strategy                                   │ ││

│  │ │ - Employee Engagement Roadmap                                    │ ││

│  │ └─────────────────────────────────────────────────────────────────┘ ││

│  │                                                                     │

│  │ Upload Evidence: [📎 HC_Strategy_2026.pdf] [+ Tambah File]          ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  ▼ HC Analytics Dashboard Adoption (Target: 80%)                        │

│  ┌─────────────────────────────────────────────────────────────────────┐

│  │ Realisasi Q1: [70] %                                                │

│  │                                                                     │

│  │ Catatan Pencapaian:                                                 │

│  │ ┌─────────────────────────────────────────────────────────────────┐ │

│  │ │ Dashboard sudah live, adoption rate masih 70% karena:           │ │

│  │ │ - Training baru mencakup 3 dari 5 unit                          │ │

│  │ │ - Beberapa fitur masih dalam pengembangan                       │ │

│  │ └─────────────────────────────────────────────────────────────────┘ │

│  │                                                                     │

│  │ Kendala yang Dihadapi:                                              │

│  │ ┌─────────────────────────────────────────────────────────────────┐ │

│  │ │ - Keterlambatan development dari vendor                         │ │

│  │ │ - User resistance di beberapa unit                              │ │

│  │ └─────────────────────────────────────────────────────────────────┘ │

│  │                                                                     │

│  │ Upload Evidence: [📎 Dashboard_Report_Q1.xlsx]                      │

│  └─────────────────────────────────────────────────────────────────────┘

│                                                                         │

│  Ringkasan Diskusi Check-In                                             │

│  ─────────────────────────────────────────────────────────────────────  │

│  ┌─────────────────────────────────────────────────────────────────────┐

│  │ Diskusi dengan Pak Dimas pada 15 April 2026:                        │

│  │ - Overall progress on track, terutama untuk strategic documents     │

│  │ - Perlu akselerasi HC Analytics adoption dengan tambahan training   │

│  │ - Action item: Jadwalkan training tambahan untuk 2 unit tersisa     │

│  └─────────────────────────────────────────────────────────────────────┘

│                                                                         │

│  ─────────────────────────────────────────────────────────────────────  │

│  [Simpan Draft]                                    [Submit Check-In]     │

│                                                                         │

└─────────────────────────────────────────────────────────────────────────┘

```

```

---

## Phase 3: Evaluation (Year-End Review)

### MK-SCR-07: Year-End Self Assessment

### Layout

```jsx

```

┌─────────────────────────────────────────────────────────────────────────┐

│ ← Kembali ke My KPI                                                     │

├─────────────────────────────────────────────────────────────────────────┤

│                                                                         │

│  📋 Year-End Self Assessment 2026                                       │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  Final Performance Score (Auto-calculated)                              │

│  ┌─────────────────────────────────────────────────────────────────────┐

│  │ KPI Bersama: 3.82 (45%)  │  KPI Unit: 3.90 (55%)  │  PI: 3.86       │

│  │ Projected Rating: Excellent (3.50 - 4.49)                           │

│  └─────────────────────────────────────────────────────────────────────┘

│                                                                         │

│  Self Assessment Rating *                                               │

│  ┌─────────────────────────────────────────────────────────────────────┐

│  │ Pilih rating yang menurut Anda paling sesuai:                       │

│  │                                                                     │

│  │ [ ] 1 - Unsuccessful        [ ] 4 - Excellent                       │

│  │ [ ] 2 - Partially Successful [●] 5 - Outstanding                    │

│  │ [ ] 3 - Successful                                                  │

│  │                                                                     │

│  │ Selected: 5 - Outstanding                                           │

│  └─────────────────────────────────────────────────────────────────────┘

│                                                                         │

│  Self Assessment Narrative                                              │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  Pencapaian Utama Tahun Ini: *                                          │

│  ┌─────────────────────────────────────────────────────────────────────┐

│  │ 1. HC Strategy 2026-2028 selesai dan approved BOD                   │

│  │ 2. Talent Pipeline ratio mencapai 1:3.5 (above target 1:3)          │

│  │ 3. HC Analytics Dashboard launch dengan 85% adoption                │

│  │ 4. Berkontribusi pada pencapaian EBITDA Group melalui efisiensi     │

│  │    workforce yang menghasilkan cost saving Rp 2.5M                  │

│  └─────────────────────────────────────────────────────────────────────┘

│                                                                         │

│  ─────────────────────────────────────────────────────────────────────  │

│  [Simpan Draft]                               [Submit Self Assessment]  │

│                                                                         │

└─────────────────────────────────────────────────────────────────────────┘

```

```

---

## Component Specifications

### Status Indicators

| Status | Icon | Color | PI Range |
| --- | --- | --- | --- |
| On Track | 🟢 | Green (#10B981) | ≥ 3.50 |
| At Risk | 🟡 | Yellow (#F59E0B) | 2.50 - 3.49 |
| Behind | 🔴 | Red (#EF4444) | < 2.50 |
| Pending | ⚪ | Gray (#6B7280) | No data |

### Score Card Component

```tsx
interface ScoreCard {
  label: string;
  value: string | number;
  subtitle?: string;
  variant: 'primary' | 'secondary' | 'success' | 'warning';
}
```

### KPI List Item Component

```tsx
interface KPIListItem {
  kpi_id: string;
  title: string;
  type: 'BERSAMA' | 'UNIT';
  weight: number;
  target: string;
  actual?: string;
  score?: number;
  status: 'draft' | 'submitted' | 'approved' | 'locked';
  is_cascaded: boolean;
  onClick: () => void;
}
```

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
| --- | --- | --- |
| Desktop | ≥1280px | Full layout, side panel overlay |
| Tablet | 768-1279px | 2-column cards, stacked summary |
| Mobile | <768px | Single column, full-screen panel |

---

## Source References

- Section Spec: [My KPI - Section Spec](https://www.notion.so/My-KPI-Section-Spec-9eacff1fd6c540ddb2263b2bb4a721c9?pvs=21)
- Sample Data: [My KPI - Sample Data](https://www.notion.so/My-KPI-Sample-Data-00e38b3d59b14822adc482dce6d3c4b3?pvs=21)
- Data Model: [INJ-BPR - Data Model](https://www.notion.so/INJ-BPR-Data-Model-c2de659dc4a746559fcf43bbce4f76a7?pvs=21)
- Design Tokens: [INJ-BPR - Design Tokens](https://www.notion.so/INJ-BPR-Design-Tokens-dca6a38e25a84a4daaaa8d78550e3356?pvs=21)