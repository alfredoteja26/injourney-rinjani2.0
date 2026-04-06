## Screen Design: KPI Tree (SEC-KT)

UI specifications untuk screens di **KPI Tree** section.

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
| --color-status-pending | #6B7280 | Pending/No data status |

---

## Prototype Context

| Attribute | Value |
| --- | --- |
| **User Perspective** | Dimas Sayyid (NIK: 260101) |
| **Position** | VP Human Capital Strategy |
| **Band Jabatan** | Utama |
| **View Scope** | Team branch (3 direct reports) |
| **Assessment Year** | 2026 |
| **Current Phase** | Check-In 1 Completed |

---

## Screen 1: KPI Tree View (KT-SCR-01)

### Layout

```jsx

```

┌─────────────────────────────────────────────────────────────────────────┐

│ 🏠 Rinjani > Performance > KPI Tree                          🔔  👤 DS │

├─────────────────────────────────────────────────────────────────────────┤

│                                                                         │

│  🌳 KPI Tree 2026                                        [Year: 2026 ▼] │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  View: [My Team ▼]    Scope: [Full Tree ▼]    [🔍 Search KPI...]       │

│                                                                         │

│  Legend:                                                                │

│  🟢 On Track (≥3.50)  🟡 At Risk (2.50-3.49)  🔴 Behind (<2.50)  ⚪ N/A│

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │                                                                     ││

│  │  📊 EBITDA Group                                        🟢 3.84    ││

│  │  └─┬─ 📊 Human Capital Cost Efficiency                  🟢 3.75    ││

│  │    │   Owner: Herdy Harman (Dir. HR & Digital)                     ││

│  │    │                                                                ││

│  │    ├─── 📊 HC Strategy Excellence ◄─ YOU               🟢 3.82    ││

│  │    │    │   Owner: Dimas Sayyid (VP HC Strategy)                   ││

│  │    │    │   Weight: 25% | Target: 95%                              ││

│  │    │    │                                                          ││

│  │    │    ├─── 📊 HC Strategy Doc Completion              🟢 4.20    ││

│  │    │    │       Owner: Binavia Wardhani | Weight: 15%              ││

│  │    │    │                                                          ││

│  │    │    ├─── 📊 Talent Pipeline Ratio                   🟢 4.00    ││

│  │    │    │       Owner: Binavia Wardhani | Weight: 15%              ││

│  │    │    │                                                          ││

│  │    │    ├─── 📊 Organization Design Accuracy            🟢 3.60    ││

│  │    │    │       Owner: Binavia Wardhani | Weight: 10%              ││

│  │    │    │                                                          ││

│  │    │    ├─── 📊 Workforce Planning Accuracy             🟡 3.40    ││

│  │    │    │       Owner: Binavia Wardhani | Weight: 10%              ││

│  │    │    │                                                          ││

│  │    │    └─── 📊 HC Analytics Dashboard Adoption         🟡 3.20    ││

│  │    │            Owner: Binavia Wardhani | Weight: 5%               ││

│  │    │                                                                ││

│  │    ├─── 📊 HC Operations Excellence                     🟢 3.65    ││

│  │    │    │   Owner: Fajar Nugraha (GH HC Operations)                ││

│  │    │    │   Weight: 25%                                            ││

│  │    │    │                                                          ││

│  │    │    ├─── 📊 Time to Fill Position                   🟢 3.50    ││

│  │    │    ├─── 📊 Employee Turnover Rate                  🟢 3.80    ││

│  │    │    └─── 📊 HR Service Level Agreement              🟢 3.60    ││

│  │    │                                                                ││

│  │    └─── 📊 HC Digital Transformation                    🟢 3.92    ││

│  │         │   Owner: Sinta Maharani (GH HC Digital)                  ││

│  │         │   Weight: 25%                                            ││

│  │         │                                                          ││

│  │         ├─── 📊 HRIS System Uptime                      🟢 4.20    ││

│  │         ├─── 📊 Digital Adoption Rate                   🟢 3.80    ││

│  │         └─── 📊 Data Quality Index                      🟢 3.70    ││

│  │                                                                     ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  ─────────────────────────────────────────────────────────────────────  │

│  [Expand All]  [Collapse All]  [Focus Mode]  [📤 Export]               │

│                                                                         │

└─────────────────────────────────────────────────────────────────────────┘

```

```

---

## Screen 2: KPI Focus View (KT-SCR-02)

### Layout

```jsx

```

┌─────────────────────────────────────────────────────────────────────────┐

│ ← Kembali ke Tree View                                                  │

├─────────────────────────────────────────────────────────────────────────┤

│                                                                         │

│  🎯 Focus: HC Strategy Excellence                                       │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ 📊 HC Strategy Excellence                               🟢 3.82    ││

│  │    Owner: Dimas Sayyid (VP HC Strategy)                            ││

│  │    Target: 95% | Achievement: 91.2% | Weight in Parent: 25%        ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Parent KPI                                                             │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ 📊 Human Capital Cost Efficiency                        🟢 3.75    ││

│  │    Owner: Herdy Harman (Dir. HR & Digital)                         ││

│  │    Your contribution: 25% of parent weight                         ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Children KPIs (Cascaded to Team)                                       │

│  ─────────────────────────────────────────────────────────────────────  │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ KPI                          │ Owner           │ Weight │ Score    ││

│  ├─────────────────────────────────────────────────────────────────────┤│

│  │ 🟢 HC Strategy Doc Completion│ Binavia W.      │ 15%    │ 4.20     ││

│  │ 🟢 Talent Pipeline Ratio     │ Binavia W.      │ 15%    │ 4.00     ││

│  │ 🟢 Org Design Accuracy       │ Binavia W.      │ 10%    │ 3.60     ││

│  │ 🟡 Workforce Planning Acc    │ Binavia W.      │ 10%    │ 3.40     ││

│  │ 🟡 HC Analytics Adoption     │ Binavia W.      │  5%    │ 3.20     ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  Contribution Analysis                                                  │

│  ─────────────────────────────────────────────────────────────────────  │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Total Cascaded Weight: 55% (of your 100%)                          ││

│  │                                                                     ││

│  │ Contribution Breakdown:                                            ││

│  │ ████████████████████████████████░░░░░░░░░░░░░░░ HC Strategy Doc    ││

│  │ █████████████████████████████░░░░░░░░░░░░░░░░░░ Talent Pipeline    ││

│  │ ██████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ Org Design         ││

│  │ █████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ Workforce Plan     ││

│  │ ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ HC Analytics       ││

│  │                                                                     ││

│  │ Calculated Team Score: 3.80                                        ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  [View KPI Detail]  [📊 Contribution Report]                            │

│                                                                         │

└─────────────────────────────────────────────────────────────────────────┘

```

```

---

## Screen 3: Tree Analysis (KT-SCR-03)

### Layout

```jsx

```

┌─────────────────────────────────────────────────────────────────────────┐

│ 🏠 Rinjani > Performance > KPI Tree > Analysis               🔔  👤 DS │

├─────────────────────────────────────────────────────────────────────────┤

│                                                                         │

│  📈 Tree Analysis - HC Strategy Branch                                  │

│  ─────────────────────────────────────────────────────────────────────  │

│                                                                         │

│  Team Performance Summary                                               │

│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐               │

│  │ 📊 Team Avg   │  │ 🟢 On Track   │  │ 🟡 At Risk    │               │

│  │    Score      │  │               │  │               │               │

│  │               │  │               │  │               │               │

│  │    3.79       │  │    13 KPIs    │  │    2 KPIs     │               │

│  │    Excellent  │  │    (87%)      │  │    (13%)      │               │

│  └───────────────┘  └───────────────┘  └───────────────┘               │

│                                                                         │

│  Team Member Comparison                                                 │

│  ─────────────────────────────────────────────────────────────────────  │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ Member              │ KPIs │ On Track │ At Risk │ Avg Score        ││

│  ├─────────────────────────────────────────────────────────────────────┤│

│  │ Sinta Maharani      │  5   │    5     │    0    │ 3.92 ████████░░  ││

│  │ Binavia Wardhani    │  5   │    3     │    2    │ 3.79 ████████░░  ││

│  │ Fajar Nugraha       │  5   │    5     │    0    │ 3.65 ███████░░░  ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  At-Risk KPIs (Requires Attention)                                      │

│  ─────────────────────────────────────────────────────────────────────  │

│  ┌─────────────────────────────────────────────────────────────────────┐│

│  │ ⚠️ Workforce Planning Accuracy                          🟡 3.40    ││

│  │    Owner: Binavia Wardhani | Target: 90% | Actual: 85%             ││

│  │    Recommendation: Accelerate workforce planning reviews           ││

│  ├─────────────────────────────────────────────────────────────────────┤│

│  │ ⚠️ HC Analytics Dashboard Adoption                      🟡 3.20    ││

│  │    Owner: Binavia Wardhani | Target: 80% | Actual: 70%             ││

│  │    Recommendation: Additional training sessions needed             ││

│  └─────────────────────────────────────────────────────────────────────┘│

│                                                                         │

│  [📤 Export Analysis Report]  [💬 Schedule Team Discussion]             │

│                                                                         │

└─────────────────────────────────────────────────────────────────────────┘

```

```

---

## Component Specifications

### Tree Node Component

```tsx
interface TreeNode {
  kpi_id: string;
  title: string;
  type: 'BERSAMA' | 'UNIT';
  level: number;
  owner: {
    nik: string;
    name: string;
    position: string;
  };
  target: number;
  achievement: number;
  score: number;
  weight_in_parent: number;
  status: 'on_track' | 'at_risk' | 'behind' | 'pending';
  is_current_user: boolean;
  children: TreeNode[];
  is_expanded: boolean;
  onToggle: () => void;
  onFocus: () => void;
}
```

### Tree Legend Component

```tsx
interface TreeLegend {
  statuses: {
    on_track: { color: string; threshold: string };
    at_risk: { color: string; threshold: string };
    behind: { color: string; threshold: string };
    pending: { color: string; label: string };
  };
}
```

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
| --- | --- | --- |
| Desktop | ≥1280px | Full tree layout, pan and zoom |
| Tablet | 768-1279px | Collapsible tree, horizontal scroll |
| Mobile | <768px | List view with depth indicators |

---

## Source References

- Section Spec: [KPI Tree - Section Spec](https://www.notion.so/KPI-Tree-Section-Spec-2d8197cdd9cc422591647a6581ce0840?pvs=21)
- Sample Data: [KPI Tree - Sample Data](https://www.notion.so/KPI-Tree-Sample-Data-6b7fa526e5354be897d58515f3615d4c?pvs=21)
- Data Model: [INJ-BPR - Data Model](https://www.notion.so/INJ-BPR-Data-Model-c2de659dc4a746559fcf43bbce4f76a7?pvs=21)
- Design Tokens: [INJ-BPR - Design Tokens](https://www.notion.so/INJ-BPR-Design-Tokens-dca6a38e25a84a4daaaa8d78550e3356?pvs=21)