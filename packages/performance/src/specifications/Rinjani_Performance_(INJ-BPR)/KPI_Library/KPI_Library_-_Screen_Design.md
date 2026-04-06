## Screen Design: KPI Library (SEC-KL)

UI specifications untuk screens di **KPI Library** section.

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
| --color-rating-successful | #10B981 | On-track status, published KPIs |
| --color-rating-partial | #F59E0B | In review status |
| --color-rating-unsuccessful | #DC2626 | Rejected status |
| --color-kpi-bersama | #2563EB | KPI Bersama type badge |
| --color-kpi-unit | #059669 | KPI Unit type badge |
| --color-status-draft | #6B7280 | Draft status badge |

---

## Prototype Context

| Attribute | Value |
| --- | --- |
| **User Perspective** | Binavia Wardhani (NIK: 260102) |
| **Position** | Group Head HC Strategy |
| **Use Case** | Browsing KPI Library during Goal Setting |
| **Assessment Year** | 2026 |

---

## Screen 1: Library Browse (KL-SCR-01)

### Layout

```jsx

```

┌─────────────────────────────────────────────────────────────────────────┐

│ 🏠 Rinjani > Performance > KPI Library                       🔔  👤 BW │

├─────────────────────────────────────────────────────────────────────────┤

│                                                                         │

│  📚 KPI Library                                          [+ Submit KPI] │

│  Katalog KPI standar InJourney Group                                    │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  🔍 [Search KPI by keyword...                                    ] 🔎   │

│                                                                         │

│  Filters:                                                               │

│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌─────────────┐ │

│  │ Type:         │ │ Function:     │ │ Band:         │ │ Status:     │ │

│  │ [All      ▼]  │ │ [HC       ▼]  │ │ [Madya    ▼]  │ │ [Published▼]│ │

│  └───────────────┘ └───────────────┘ └───────────────┘ └─────────────┘ │

│                                                                         │

│  📊 Showing 24 of 156 KPIs                                 [Clear All]  │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  Popular KPIs in Human Capital                                          │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ 📊 Talent Pipeline Ratio                               [Unit] 🔥   ││

│  │    Rasio suksesor siap vs posisi kritikal                          ││

│  │    📈 Used by 89 employees | Recommended: 1:3                      ││

│  │    Tags: talent, succession, HR                       [View →]     ││

│  ├─────────────────────────────────────────────────────────────────────┤│

│  │ 📊 Employee Turnover Rate                              [Unit]      ││

│  │    Persentase karyawan yang keluar per tahun                       ││

│  │    📈 Used by 245 employees | Recommended: ≤8%                     ││

│  │    Tags: retention, HR                                [View →]     ││

│  ├─────────────────────────────────────────────────────────────────────┤│

│  │ 📊 Training Completion Rate                            [Unit]      ││

│  │    Persentase penyelesaian training wajib                          ││

│  │    📈 Used by 312 employees | Recommended: ≥95%                    ││

│  │    Tags: learning, development                        [View →]     ││

│  ├─────────────────────────────────────────────────────────────────────┤│

│  │ 📊 HC Strategy Document Completion                     [Unit]      ││

│  │    Persentase dokumen strategi HC yang selesai                     ││

│  │    📈 Used by 45 employees | Recommended: 100%                     ││

│  │    Tags: strategy, planning                           [View →]     ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  ─────────────────────────────────────────────────────────────────────  │

│  Pagination: ◀ 1 2 3 4 5 ... 12 ▶                                       │

│                                                                         │

└─────────────────────────────────────────────────────────────────────────┘

```

```

---

## Screen 2: KPI Detail (KL-SCR-02)

### Layout

```jsx

```

┌─────────────────────────────────────────────────────────────────────────┐

│ ← Kembali ke Library                                                    │

├─────────────────────────────────────────────────────────────────────────┤

│                                                                         │

│  📊 Talent Pipeline Ratio                                    [Unit]     │

│  Code: LIB-U-HC-003                                                     │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  Description                                                            │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Rasio antara jumlah kandidat suksesor yang siap dengan jumlah      ││

│  │ posisi kritikal (Key Strategic Position). Mengukur kesiapan        ││

│  │ organisasi dalam succession planning.                              ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  KPI Attributes                                                         │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Attribute             │ Value                                      ││

│  ├─────────────────────────────────────────────────────────────────────┤│

│  │ Recommended Target    │ 1:3 (suksesor : posisi)                    ││

│  │ Target Unit           │ Ratio                                      ││

│  │ Polarity              │ Higher is Better                           ││

│  │ Monitoring Period     │ Semester                                   ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Formula Pengukuran                                                     │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Jumlah suksesor siap (Readiness 1-2 tahun) / Jumlah posisi KSP    ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Applicable To                                                          │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Functions: Human Capital, Talent Management                        ││

│  │ Band Jabatan: Madya, Muda                                          ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Evidence Requirement                                                   │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ - Succession Planning Report                                       ││

│  │ - Talent Review Minutes                                            ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Usage Statistics                                                       │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ 📈 Currently used by 89 employees across InJourney Group           ││

│  │ ⭐ Rating: 4.5/5 based on 23 reviews                               ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  ─────────────────────────────────────────────────────────────────────  │

│  [✓ Use This KPI]                                                       │

│                                                                         │

└─────────────────────────────────────────────────────────────────────────┘

```

```

---

## Screen 3: Submit New KPI (KL-SCR-03)

### Layout

```jsx

```

┌─────────────────────────────────────────────────────────────────────────┐

│ ← Kembali ke Library                                                    │

├─────────────────────────────────────────────────────────────────────────┤

│                                                                         │

│  📝 Submit New KPI to Library                                           │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  Judul KPI *                                                            │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Employee Experience Score                                          ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Deskripsi *                                                            │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Skor pengalaman karyawan yang diukur melalui survey komprehensif   ││

│  │ mencakup onboarding, development, recognition, dan work-life       ││

│  │ balance.                                                           ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Type *                                                                 │

│  (●) KPI Bersama  ( ) KPI Unit                                          │

│                                                                         │

│  ┌───────────────────────┐  ┌───────────────────────┐                   │

│  │ Recommended Target   *│  │ Target Unit*          │                   │

│  │ [4.2             ]    │  │ [Scale 1-5       ▼]   │                   │

│  └───────────────────────┘  └───────────────────────┘                   │

│                                                                         │

│  Polarity                            *Monitoring Period*                │

│  (●) Higher is Better                 [Semester              ▼]         │

│                                                                         │

│  Formula Pengukuran *                                                   │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Rata-rata skor dari 4 dimensi Employee Experience Survey           ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Applicable Functions *                                                 │

│  [x] Human Capital  [x] All Functions  [ ] Operations  [ ] Finance     │

│  Applicable Band Jabatan *                                              │

│  [ ] Utama  [x] Madya  [x] Muda  [x] Pratama A  [ ] Pratama B          │

│  Evidence Requirement                                                   │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Employee Experience Survey Report                                  ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  ─────────────────────────────────────────────────────────────────────  │

│  Submitter: Binavia Wardhani (GH HC Strategy)                           │

│                                                                         │

│  [Batalkan]                              [Simpan Draft] [Submit →]      │

│                                                                         │

└─────────────────────────────────────────────────────────────────────────┘

```

```

---

## Screen 4: Review Queue (KL-SCR-05)

### Layout

```jsx

```

┌─────────────────────────────────────────────────────────────────────────┐

│ 🏠 Rinjani > Performance > KPI Library > Review Queue       🔔  👤 ADM │

├─────────────────────────────────────────────────────────────────────────┤

│                                                                         │

│  📋 KPI Submission Review Queue                                         │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐               │

│  │ 📥 Pending    │  │ ✅ Approved   │  │ ❌ Rejected   │               │

│  │    Review     │  │    (MTD)      │  │    (MTD)      │               │

│  │               │  │               │  │               │               │

│  │    3          │  │    12         │  │    2          │               │

│  └───────────────┘  └───────────────┘  └───────────────┘               │

│                                                                         │

│  Pending Submissions                                     [Filter ▼]     │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ 📊 Employee Experience Score                           [Unit]      ││

│  │    Submitter: Binavia Wardhani (GH HC Strategy)                    ││

│  │    Submit Date: 7 Jan 2026 | Status: Submitted                     ││

│  │    [Review →]                                                      ││

│  ├─────────────────────────────────────────────────────────────────────┤│

│  │ 📊 HC Digital Transformation Readiness                 [Unit]      ││

│  │    Submitter: Sinta Maharani (GH HC Digital)                       ││

│  │    Submit Date: 5 Jan 2026 | Status: In Review                     ││

│  │    [Continue Review →]                                             ││

│  ├─────────────────────────────────────────────────────────────────────┤│

│  │ 📊 Learning Investment ROI                             [Unit]      ││

│  │    Submitter: Fajar Nugraha (GH HC Operations)                     ││

│  │    Submit Date: 6 Jan 2026 | Status: In Review                     ││

│  │    [Continue Review →]                                             ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

└─────────────────────────────────────────────────────────────────────────┘

```

```

---

## Component Specifications

### KPI Library Card Component

```tsx
interface KPILibraryCard {
  library_item_id: string;
  title: string;
  description: string;
  type: 'BERSAMA' | 'UNIT';
  usage_count: number;
  recommended_target: string;
  tags: string[];
  is_popular: boolean;
  onView: () => void;
}
```

### Filter Component

```tsx
interface KPILibraryFilter {
  type: 'BERSAMA' | 'UNIT' | 'ALL';
  function: string[];
  band_jabatan: string[];
  status: 'Published' | 'All';
  search_query: string;
}
```

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
| --- | --- | --- |
| Desktop | ≥1280px | Full layout, side panel overlay |
| Tablet | 768-1279px | 2-column cards, stacked filters |
| Mobile | <768px | Single column, collapsible filters |

---

## Source References

- Section Spec: [KPI Library - Section Spec](https://www.notion.so/KPI-Library-Section-Spec-ffe718953bb641178d05e1b72b6cd48d?pvs=21)
- Sample Data: [KPI Library - Sample Data](https://www.notion.so/KPI-Library-Sample-Data-ff34390f1f4248188b936ae8c097484e?pvs=21)
- Data Model: [INJ-BPR - Data Model](https://www.notion.so/INJ-BPR-Data-Model-c2de659dc4a746559fcf43bbce4f76a7?pvs=21)
- Design Tokens: [INJ-BPR - Design Tokens](https://www.notion.so/INJ-BPR-Design-Tokens-dca6a38e25a84a4daaaa8d78550e3356?pvs=21)