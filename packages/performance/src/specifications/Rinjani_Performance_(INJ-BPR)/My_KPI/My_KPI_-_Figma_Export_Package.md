## Figma Export Package: My KPI (SEC-MK)

---

## 1. Component Library

### 1.1 Score Cards

| Component | Variants | Props |
| --- | --- | --- |
| `ScoreCard/Large` | default, highlighted | value, label, trend |
| `ScoreCard/Small` | default, muted | value, label |
| `RatingBadge` | Outstanding, Excellent, Successful, Partial, Unsuccessful | rating, label |

### 1.2 KPI List Items

| Component | Variants | Props |
| --- | --- | --- |
| `KPIListItem` | default, selected, disabled | title, weight, score, status |
| `KPIListItem/Expandable` | collapsed, expanded | title, weight, children |
| `ProgressBar/Score` | default | value, max, color |

### 1.3 Form Elements

| Component | Variants | Props |
| --- | --- | --- |
| `TextArea/Notes` | default, readonly, error | value, placeholder, rows |
| `DatePicker` | default, range | value, minDate, maxDate |
| `RatingSelector` | default, readonly | value, max, labels |

---

## 2. Screen Frames

| Frame ID | Screen | Size | Status |
| --- | --- | --- | --- |
| MK-FRM-01 | Dashboard Desktop | 1440x900 | Ready |
| MK-FRM-02 | Dashboard Mobile | 375x812 | Ready |
| MK-FRM-03 | Goal Setting | 1440x1200 | Ready |
| MK-FRM-04 | KPI Detail | 1440x900 | Ready |
| MK-FRM-05 | Check-In Form | 1440x1000 | Ready |
| MK-FRM-06 | Year-End Review | 1440x1100 | Ready |

---

## 3. Export Specifications

### Assets

- Icons: SVG format, 24x24px base
- Illustrations: PNG @2x, SVG
- Component states: All variants exported

### Handoff Notes

- Use Tailwind classes from Design Tokens
- Follow InJourney brand guidelines
- Responsive breakpoints: 375px, 768px, 1024px, 1440px