## Shell Spec

Application shell structure untuk **Rinjani Performance** module.

---

## 1. Navigation Structure

### 1.1 Primary Navigation (Sidebar)

```
📈 Rinjani Performance
├── 👤 My KPI
│   ├── Dashboard
│   ├── Goal Setting
│   ├── Check-In
│   └── Year-End Review
├── 👥 My Team KPI
│   ├── Team Dashboard
│   ├── Team Goal Setting
│   ├── Team Check-In
│   ├── Team Year-End Review
│   └── Cascading
├── 📚 KPI Library
│   ├── Browse Library
│   └── My Submissions
├── 🌳 KPI Tree
│   └── Tree Visualization
└── 🏛️ KPI Headquarter (Admin)
    ├── Weight Configuration
    ├── Schedule Management
    ├── KPI Library Approval
    └── Reports
```

### 1.2 Navigation Access by Role

| **Menu** | **Karyawan** | **Atasan** | **HC Admin** | **HC Admin HO** |
| --- | --- | --- | --- | --- |
| My KPI | ✓ | ✓ | ✓ | ✓ |
| My Team KPI | - | ✓ | ✓ | ✓ |
| KPI Library | ✓ (Browse) | ✓ | ✓ (Full) | ✓ (Full) |
| KPI Tree | ✓ (Own) | ✓ (Team) | ✓ (Company) | ✓ (All) |
| KPI Headquarter | - | - | ✓ (Limited) | ✓ (Full) |

---

## 2. Layout Structure

### 2.1 Main Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Header (64px)                                               │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Logo │ Module Title │ Search │ Notifications │ Profile │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────┬───────────────────────────────────────────────────┤
│ Sidebar │ Content Area                                      │
│ (240px) │                                                   │
│         │ ┌───────────────────────────────────────────────┐ │
│ Nav     │ │ Page Header                                   │ │
│ Items   │ │ ┌───────────────────────────────────────────┐ │ │
│         │ │ │ Title │ Actions                           │ │ │
│         │ │ └───────────────────────────────────────────┘ │ │
│         │ ├───────────────────────────────────────────────┤ │
│         │ │ Page Content                                 │ │
│         │ │                                               │ │
│         │ │                                               │ │
│         │ └───────────────────────────────────────────────┘ │
└─────────┴───────────────────────────────────────────────────┘
```

### 2.2 Layout Dimensions

| **Element** | **Dimension** | **Behavior** |
| --- | --- | --- |
| Header | Height: 64px | Fixed |
| Sidebar | Width: 240px | Collapsible to 64px |
| Content Area | Max-width: 1280px | Centered with padding |
| Content Padding | 24px | All sides |

---

## 3. Page Templates

### 3.1 Dashboard Page

```
┌─────────────────────────────────────────────────────────────┐
│ Page Header: "My KPI Dashboard"                             │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────┬─────────────┬─────────────┬───────────────┐ │
│ │ Score Card  │ Score Card  │ Score Card  │ Score Card    │ │
│ │ PI Current  │ PR Current  │ Goal Status │ Check-In      │ │
│ └─────────────┴─────────────┴─────────────┴───────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────┬───────────────────────────┐ │
│ │ KPI Bersama Section         │ KPI Unit Section          │ │
│ │ ┌─────────────────────────┐ │ ┌─────────────────────────┐│ │
│ │ │ KPI Card 1              │ │ │ KPI Card 1              ││ │
│ │ ├─────────────────────────┤ │ ├─────────────────────────┤│ │
│ │ │ KPI Card 2              │ │ │ KPI Card 2              ││ │
│ │ └─────────────────────────┘ │ └─────────────────────────┘│ │
│ └─────────────────────────────┴───────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 List Page (KPI List, Library)

```
┌─────────────────────────────────────────────────────────────┐
│ Page Header: "KPI Library"              [+ Add KPI] [Filter]│
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Filter Bar: [Type ▼] [Status ▼] [Search...]             │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Table Header                                            │ │
│ │ Title │ Type │ Target │ Unit │ Status │ Actions         │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Row 1                                                   │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Row 2                                                   │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Row 3                                                   │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Pagination: [< Prev] [1] [2] [3] [Next >]                   │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Detail Page (KPI Detail, Check-In Form)

```
┌─────────────────────────────────────────────────────────────┐
│ Page Header: "KPI Detail"                     [Edit] [Back] │
├─────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Info Card                                             │   │
│ │ ┌─────────────┬─────────────────────────────────────┐ │   │
│ │ │ Label       │ Value                               │ │   │
│ │ ├─────────────┼─────────────────────────────────────┤ │   │
│ │ │ Title       │ Revenue Achievement                 │ │   │
│ │ │ Type        │ KPI Unit                            │ │   │
│ │ │ Target      │ 100%                                │ │   │
│ │ │ Realization │ 95%                                 │ │   │
│ │ │ Achievement │ 95%                                 │ │   │
│ │ └─────────────┴─────────────────────────────────────┘ │   │
│ └───────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────────────────┐   │
│ │ History / Timeline Section                            │   │
│ │ ┌───────────────────────────────────────────────────┐ │   │
│ │ │ Check-In 1 │ Check-In 2 │ Check-In 3              │ │   │
│ │ └───────────────────────────────────────────────────┘ │   │
│ └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Module Routes

### 4.1 My KPI (SEC-MK)

| **Route** | **Page** | **Description** |
| --- | --- | --- |
| `/my-kpi` | Dashboard | Overview skor dan KPI list |
| `/my-kpi/goal-setting` | Goal Setting | Penyusunan KPI |
| `/my-kpi/check-in` | Check-In List | Daftar check-in |
| `/my-kpi/check-in/:id` | Check-In Detail | Form check-in |
| `/my-kpi/year-end-review` | Year-End Review | Self assessment & hasil |

### 4.2 My Team KPI (SEC-MT)

| **Route** | **Page** | **Description** |
| --- | --- | --- |
| `/my-team-kpi` | Team Dashboard | Overview tim |
| `/my-team-kpi/member/:nik` | Member Detail | KPI detail bawahan |
| `/my-team-kpi/cascading` | Cascading | Penurunan KPI |
| `/my-team-kpi/approvals` | Approvals | Pending approvals |

### 4.3 KPI Library (SEC-KL)

| **Route** | **Page** | **Description** |
| --- | --- | --- |
| `/kpi-library` | Browse | Daftar KPI library |
| `/kpi-library/:id` | Detail | Detail KPI library |
| `/kpi-library/submit` | Submit | Submit KPI baru |

### 4.4 KPI Tree (SEC-KT)

| **Route** | **Page** | **Description** |
| --- | --- | --- |
| `/kpi-tree` | Tree View | Visualisasi hierarki |
| `/kpi-tree/:kpiId` | KPI Focus | Focus pada KPI tertentu |

### 4.5 KPI Headquarter (SEC-HQ)

| **Route** | **Page** | **Description** |
| --- | --- | --- |
| `/kpi-hq` | Dashboard | Admin dashboard |
| `/kpi-hq/weights` | Weight Config | Konfigurasi bobot per cohort |
| `/kpi-hq/schedules` | Schedules | Jadwal periode |
| `/kpi-hq/library-approval` | Library Approval | Approval KPI library |
| `/kpi-hq/reports` | Reports | Laporan kinerja |

---

## 5. Common Components

### 5.1 KPI Card

```
┌─────────────────────────────────────────────────────────────┐
│ [Type Badge: KPI Unit]                         [Status: ✓]  │
│                                                             │
│ Revenue Achievement Q4 2025                                 │
│                                                             │
│ Target: 100%    Realization: 95%    Achievement: 95%        │
│ ████████████████████░░░░                                    │
│                                                             │
│ Weight: 15%                         Score: 14.25            │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Score Summary Card

```
┌─────────────────────────────────────────────────────────────┐
│ Performance Index                                           │
│                                                             │
│              ┌─────┐                                        │
│              │ 3.5 │                                        │
│              └─────┘                                        │
│           Excellent                                         │
│                                                             │
│ KPI Bersama: 40% × 3.8 = 1.52                               │
│ KPI Unit:    60% × 3.3 = 1.98                               │
└─────────────────────────────────────────────────────────────┘
```

### 5.3 Timeline Component

```
┌─────────────────────────────────────────────────────────────┐
│ ● Goal Setting (Jan 2026)                    ✓ Completed    │
│ │                                                           │
│ ● Check-In 1 (Apr 2026)                      ✓ Completed    │
│ │                                                           │
│ ○ Check-In 2 (Jul 2026)                      ◐ In Progress  │
│ │                                                           │
│ ○ Check-In 3 (Oct 2026)                      ○ Upcoming     │
│ │                                                           │
│ ○ Year-End Review (Dec 2026)                 ○ Upcoming     │
└─────────────────────────────────────────────────────────────┘
```

---

## Source Reference

- [Portaverse PMS 2025 (PEL-004-PMS)](https://www.notion.so/Portaverse-PMS-2025-PEL-004-PMS-9a6ac6f8e2bd4d0dbef773776153efb2?pvs=21)
- [INJ-BPR - Product Charter](https://www.notion.so/INJ-BPR-Product-Charter-782cf51323224689a06cee4bb693fe99?pvs=21)