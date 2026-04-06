## Screen Design: My Team KPI (SEC-MT)

UI specifications untuk screens di **My Team KPI** section (Manager View).

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
| **User** | Dimas Sayyid (NIK: 260101) |
| **Position** | VP Human Capital Strategy |
| **Band Jabatan** | Utama |
| **Unit** | Direktorat Human Capital |
| **Company** | PT Aviasi Pariwisata Indonesia (Holding) |
| **Direct Reports** | 3 Group Heads |
| **Assessment Year** | 2026 |

### Team Members Under Supervision

| NIK | Nama | Position | Band | Status |
| --- | --- | --- | --- | --- |
| 260102 | Binavia Wardhani | GH HC Strategy | Madya | Active |
| 260103 | Fajar Nugraha | GH HC Operations | Madya | Active |
| 260104 | Sinta Maharani | GH HC Digital | Madya | Active |

---

## Phase 1: Planning (Goal Setting) - Manager View

### MT-SCR-01: Team Dashboard (Planning Phase)

### Layout

```jsx

```

┌─────────────────────────────────────────────────────────────────────────┐

│ 🏠 Rinjani > Performance > My Team KPI                       🔔  👤 DS │

├─────────────────────────────────────────────────────────────────────────┤

│                                                                         │

│  👥 My Team KPI 2026                                     [Year: 2026 ▼] │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ 📋 GOAL SETTING PERIOD                                             ││

│  │ Deadline: 28 Feb 2026                                              ││

│  │                                                                    ││

│  │ Team Progress: ██████████████░░░░░░ 67%                            ││

│  │ 2 of 3 team members completed goal setting                         ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐               │

│  │ 👥 Tim        │  │ ✅ Approved   │  │ ⏳ Pending    │               │

│  │               │  │               │  │               │               │

│  │    3          │  │    2          │  │    1          │               │

│  │    Members    │  │    Members    │  │    Approval   │               │

│  └───────────────┘  └───────────────┘  └───────────────┘               │

│                                                                         │

│  Approval Queue                                           [Filter ▼]   │

│  ─────────────────────────────────────────────────────────────────────  │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ ⚠️ 1 submission menunggu approval Anda                             ││

│  │                                                                     ││

│  │ ┌─────────────────────────────────────────────────────────────────┐ ││

│  │ │ 👤 Sinta Maharani                                              │ ││

│  │ │    GH HC Digital | Band Madya                                  │ ││

│  │ │    Submitted: 10 Feb 2026                                      │ ││

│  │ │    8 KPI | Total Weight: 100%                                  │ ││

│  │ │                                                                │ ││

│  │ │    [Review & Approve →]                                        │ ││

│  │ └─────────────────────────────────────────────────────────────────┘ ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Team Members Status                                                    │

│  ─────────────────────────────────────────────────────────────────────  │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Member              │ Band   │ Status      │ Progress │ Action     ││

│  ├─────────────────────────────────────────────────────────────────────┤│

│  │ 👤 Binavia Wardhani │ Madya  │ ✅ Approved │ 8/8 KPI  │ [View]     ││

│  │ 👤 Fajar Nugraha    │ Madya  │ ✅ Approved │ 8/8 KPI  │ [View]     ││

│  │ 👤 Sinta Maharani   │ Madya  │ ⏳ Pending  │ 8/8 KPI  │ [Review]   ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Quick Actions                                                          │

│  [📤 Cascade KPI ke Tim]  [📊 Lihat KPI Tree Tim]                      │

│                                                                         │

└─────────────────────────────────────────────────────────────────────────┘

```

```

---

## Phase 2: Monitoring (Check-In) - Manager View

### MT-SCR-04: Team Dashboard (Monitoring Phase)

### Layout

```jsx

```

┌─────────────────────────────────────────────────────────────────────────┐

│ 🏠 Rinjani > Performance > My Team KPI                       🔔  👤 DS │

├─────────────────────────────────────────────────────────────────────────┤

│                                                                         │

│  👥 My Team KPI 2026                                     [Year: 2026 ▼] │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  Assessment Timeline 2026                                               │

│  ●━━━━━━━━━●━━━━━━━━━○━━━━━━━━━○━━━━━━━━━○                              │

│  Goal      CI-1      CI-2      CI-3      YER                           │

│  ✓ Done    ✓ Done    Current   Upcoming  Upcoming                      │

│                                                                         │

│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐               │

│  │ 📊 Team Avg   │  │ ✅ CI-1 Done  │  │ ⏳ CI-2       │               │

│  │    PI Score   │  │               │  │    Pending    │               │

│  │               │  │               │  │               │               │

│  │    3.79       │  │    3/3        │  │    0/3        │               │

│  │    Excellent  │  │    Complete   │  │    Started    │               │

│  └───────────────┘  └───────────────┘  └───────────────┘               │

│                                                                         │

│  Team Performance Overview                                              │

│  ─────────────────────────────────────────────────────────────────────  │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Member              │ Band  │ PI Score │ PR Rating  │ Trend        ││

│  ├─────────────────────────────────────────────────────────────────────┤│

│  │ 🟢 Sinta Maharani   │ Madya │ 3.92     │ Excellent  │ ↗ +0.15      ││

│  │ 🟢 Binavia Wardhani │ Madya │ 3.79     │ Excellent  │ → +0.02      ││

│  │ 🟢 Fajar Nugraha    │ Madya │ 3.65     │ Excellent  │ ↗ +0.12      ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Team Average: 3.79 (Excellent)                                         │

│                                                                         │

│  Check-In 1 Summary                                        [View All]   │

│  ─────────────────────────────────────────────────────────────────────  │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ 📅 Periode: 1-30 Apr 2026                                          ││

│  │                                                                     ││

│  │ ┌─────────────────────────────────────────────────────────────────┐ ││

│  │ │ 👤 Binavia Wardhani                               PI: 3.79     │ ││

│  │ │    Check-In: 15 Apr 2026                                       │ ││

│  │ │    Key Highlight: HC Strategy document completed ahead of time │ ││

│  │ │    Challenge: HC Analytics adoption below target               │ ││

│  │ │    Action Item: Additional training for 2 remaining units      │ ││

│  │ │    [View Detail]                                               │ ││

│  │ └─────────────────────────────────────────────────────────────────┘ ││

│  │                                                                     ││

│  │ ┌─────────────────────────────────────────────────────────────────┐ ││

│  │ │ 👤 Fajar Nugraha                                  PI: 3.65     │ ││

│  │ │    Check-In: 18 Apr 2026                                       │ ││

│  │ │    Key Highlight: Streamlined HC operations processes          │ ││

│  │ │    Challenge: Recruitment timeline delays                      │ ││

│  │ │    Action Item: Implement fast-track recruitment               │ ││

│  │ │    [View Detail]                                               │ ││

│  │ └─────────────────────────────────────────────────────────────────┘ ││

│  │                                                                     ││

│  │ ┌─────────────────────────────────────────────────────────────────┐ ││

│  │ │ 👤 Sinta Maharani                                 PI: 3.92     │ ││

│  │ │    Check-In: 20 Apr 2026                                       │ ││

│  │ │    Key Highlight: HRIS uptime exceeded target at 99.8%         │ ││

│  │ │    Challenge: Integration with legacy systems                  │ ││

│  │ │    Action Item: Prioritize API development                     │ ││

│  │ │    [View Detail]                                               │ ││

│  │ └─────────────────────────────────────────────────────────────────┘ ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Quick Actions                                                          │

│  [📊 Team KPI Tree]  [📈 Performance Comparison]  [📤 Export Report]   │

│                                                                         │

└─────────────────────────────────────────────────────────────────────────┘

```

```

---

## Phase 3: Evaluation (Year-End Review) - Manager View

### MT-SCR-07: Year-End Review - Manager Assessment

### Layout

```jsx

```

┌─────────────────────────────────────────────────────────────────────────┐

│ ← Kembali ke Team Dashboard                                             │

├─────────────────────────────────────────────────────────────────────────┤

│                                                                         │

│  📋 Year-End Review 2026 - Manager Assessment                           │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ 👤 Binavia Wardhani                                                ││

│  │    NIK: 260102 | GH HC Strategy | Band Madya                       ││

│                                                                         │

│  Final Performance Score (Auto-calculated)                              │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ KPI Bersama: 3.82 (45%)  │  KPI Unit: 3.90 (55%)  │  PI: 3.86      ││

│  │                                                                     ││

│  │ Score Range: Excellent (3.50 - 4.49)                               ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Employee Self Assessment                                               │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Self Rating: 5 - Outstanding                                       ││

│  │                                                                     ││

│  │ Key Achievements (Self-reported):                                  ││

│  │ 1. HC Strategy 2026-2028 completed and BOD approved                ││

│  │ 2. Talent Pipeline ratio achieved 1:3.5 (above target)             ││

│  │ 3. HC Analytics Dashboard launched with 85% adoption               ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Manager Assessment                                                     │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  Your Rating *                                                          │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ [ 1 ] [ 2 ] [ 3 ] [●4 ] [ 5 ]                                      ││

│  │  Uns   Part   Suc   Exc   Out                                      ││

│  │                                                                     ││

│  │ Selected: 4 - Excellent                                            ││

│  │ (Aligned with calculated PI of 3.86)                               ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Rating Justification *                                                 │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Binavia menunjukkan kinerja excellent sepanjang 2026. Pencapaian   ││

│  │ utama meliputi HC Strategy document dan Talent Pipeline.           ││

│  │ Rating 4 diberikan karena ada ruang improvement di area change     ││

│  │ management dan digital adoption.                                   ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  ─────────────────────────────────────────────────────────────────────  │

│  [Simpan Draft]                                 [Submit Assessment]     │

│                                                                         │

└─────────────────────────────────────────────────────────────────────────┘

```

```

---

## Component Specifications

### Team Member Card Component

```tsx
interface TeamMemberCard {
  nik: string;
  name: string;
  position: string;
  band_jabatan: string;
  pi_score?: number;
  pr_rating?: string;
  status: 'draft' | 'submitted' | 'approved' | 'completed';
  trend?: number;
  onClick: () => void;
}
```

### Check-In Summary Card Component

```tsx
interface CheckInSummaryCard {
  member_name: string;
  check_in_date: string;
  pi_score: number;
  key_highlight: string;
  challenge: string;
  action_item: string;
  onViewDetail: () => void;
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

- Section Spec: [My Team KPI - Section Spec](https://www.notion.so/My-Team-KPI-Section-Spec-5b130abc294345a69691a756f5fe8df7?pvs=21)
- Sample Data: [My Team KPI - Sample Data](https://www.notion.so/My-Team-KPI-Sample-Data-79a7bff48f8546a7835e93b2bf10084b?pvs=21)
- Data Model: [INJ-BPR - Data Model](https://www.notion.so/INJ-BPR-Data-Model-c2de659dc4a746559fcf43bbce4f76a7?pvs=21)
- Design Tokens: [INJ-BPR - Design Tokens](https://www.notion.so/INJ-BPR-Design-Tokens-dca6a38e25a84a4daaaa8d78550e3356?pvs=21)