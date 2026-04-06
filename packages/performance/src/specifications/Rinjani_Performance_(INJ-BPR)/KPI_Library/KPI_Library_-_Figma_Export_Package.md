## Figma Export Package: KPI Library (SEC-KL)

---

## 1. Component Library

### 1.1 Browse Components

| Component | Variants | Props |
| --- | --- | --- |
| `LibraryCard` | default, hover | title, type, function, usageCount |
| `SearchBar` | default, focused, with-results | value, placeholder, onSearch |
| `FilterChip` | default, selected | label, value, onSelect |
| `FilterDropdown` | closed, open | label, options, selected |

### 1.2 Detail Components

| Component | Variants | Props |
| --- | --- | --- |
| `AttributeRow` | default | label, value |
| `TagList` | default | tags[], variant |
| `UsageStats` | default | count, trend |
| `TypeBadge` | Bersama, Unit | type |

### 1.3 Form Components

| Component | Variants | Props |
| --- | --- | --- |
| `SubmissionForm` | default | fields, onSubmit |
| `PolaritySelector` | Higher, Lower | value, onChange |
| `FunctionCheckbox` | default | options, selected |

---

## 2. Screen Frames

| Frame ID | Screen | Size | Status |
| --- | --- | --- | --- |
| KL-FRM-01 | Library Browse Desktop | 1440x900 | Ready |
| KL-FRM-02 | Library Browse Mobile | 375x812 | Ready |
| KL-FRM-03 | Library Detail | 1440x900 | Ready |
| KL-FRM-04 | Submit KPI Form | 1440x1100 | Ready |
| KL-FRM-05 | My Submissions | 1440x800 | Ready |
| KL-FRM-06 | Admin Review Queue | 1440x900 | Ready |

---

## 3. Export Specifications

### Assets

- KPI type icons: Bersama, Unit variants
- Function icons: Operations, Finance, HR, IT, etc.
- Empty state illustrations

### Handoff Notes

- Infinite scroll for library list
- Search debounce 300ms
- Filter persistence in URL