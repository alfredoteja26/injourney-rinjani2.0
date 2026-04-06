## Figma Export Package: My Team KPI (SEC-MT)

---

## 1. Component Library

### 1.1 Team Components

| Component | Variants | Props |
| --- | --- | --- |
| `TeamMemberCard` | default, selected, warning | name, position, cohort, score, status |
| `TeamMemberList` | default | members[], onSelect |
| `TeamMetricCard` | default | label, value, trend |

### 1.2 Cascading Components

| Component | Variants | Props |
| --- | --- | --- |
| `CascadeSource` | default | kpiTitle, weight |
| `CascadeTarget` | unchecked, checked, disabled | memberName, weight |
| `WeightInput` | default, error | value, max, onChange |

### 1.3 Assessment Components

| Component | Variants | Props |
| --- | --- | --- |
| `AssessmentSummary` | default | bersamaScore, unitScore, totalPI |
| `SelfAssessmentView` | default, empty | rating, notes |
| `ManagerAssessmentForm` | default | rating, feedback, strengths, improvements |

---

## 2. Screen Frames

| Frame ID | Screen | Size | Status |
| --- | --- | --- | --- |
| MT-FRM-01 | Team Dashboard Desktop | 1440x900 | Ready |
| MT-FRM-02 | Team Dashboard Mobile | 375x812 | Ready |
| MT-FRM-03 | Team Member List | 1440x1000 | Ready |
| MT-FRM-04 | Cascading Form | 1440x900 | Ready |
| MT-FRM-05 | Approval Queue | 1440x800 | Ready |
| MT-FRM-06 | Manager Assessment | 1440x1200 | Ready |

---

## 3. Export Specifications

### Assets

- Team avatars: Placeholder set included
- Status icons: SVG, color-coded
- Charts: Completion bar components

### Handoff Notes

- Team hierarchy from position_assignment
- Real-time validation for weight distribution
- Approval workflow states