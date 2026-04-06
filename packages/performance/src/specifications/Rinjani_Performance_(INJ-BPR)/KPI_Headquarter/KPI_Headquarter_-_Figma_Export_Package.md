## Figma Export Package: KPI Headquarter (SEC-HQ)

---

## 1. Component Library

### 1.1 Dashboard Components

| Component | Variants | Props |
| --- | --- | --- |
| `AdminMetricCard` | default, warning | label, value, subtext |
| `PhaseProgressBar` | default | phase, percentage, status |
| `AlertItem` | warning, info | icon, message, action |
| `QuickActionButton` | default | icon, label, onClick |

### 1.2 Configuration Components

| Component | Variants | Props |
| --- | --- | --- |
| `WeightConfigRow` | default, editing | cohort, jobType, bersama, unit |
| `WeightInput` | default, error | value, max, onChange |
| `ValidationMessage` | success, error | message |
| `CompanySelector` | default | companies[], selected |

### 1.3 Schedule Components

| Component | Variants | Props |
| --- | --- | --- |
| `TimelineBar` | default | schedules[], year |
| `ScheduleCard` | default | type, startDate, endDate |
| `DateRangePicker` | default | start, end, onChange |

### 1.4 Report Components

| Component | Variants | Props |
| --- | --- | --- |
| `RatingDistributionChart` | bar, pie | data[] |
| `CompletionByCompanyChart` | default | data[] |
| `ExportButton` | Excel, PDF | type, onClick |

---

## 2. Screen Frames

| Frame ID | Screen | Size | Status |
| --- | --- | --- | --- |
| HQ-FRM-01 | HQ Dashboard Desktop | 1440x900 | Ready |
| HQ-FRM-02 | HQ Dashboard Mobile | 375x812 | Ready |
| HQ-FRM-03 | Weight Configuration | 1440x1000 | Ready |
| HQ-FRM-04 | Schedule Configuration | 1440x900 | Ready |
| HQ-FRM-05 | Reports & Analytics | 1440x1100 | Ready |
| HQ-FRM-06 | Completion Monitor | 1440x900 | Ready |

---

## 3. Export Specifications

### Assets

- Chart components: Recharts-compatible
- Admin icons: Settings, Calendar, Report, etc.
- Company logos: Placeholder set

### Handoff Notes

- Role-based visibility (HC Admin vs HC Admin HO)
- Multi-company selector for HO role
- Real-time validation on weight changes
- Export format templates