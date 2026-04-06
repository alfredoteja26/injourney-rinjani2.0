## Figma Export Package: KPI Tree (SEC-KT)

---

## 1. Component Library

### 1.1 Tree Components

| Component | Variants | Props |
| --- | --- | --- |
| `TreeNode` | root, branch, leaf | kpi, level, isExpanded, status |
| `TreeConnector` | vertical, horizontal, corner | level |
| `TreeContainer` | default | nodes[], onNodeClick |
| `ExpandToggle` | expanded, collapsed | onClick |

### 1.2 Status Indicators

| Component | Variants | Props |
| --- | --- | --- |
| `StatusDot` | onTrack, atRisk, behind, pending | status |
| `AchievementBadge` | default | percentage, status |
| `LegendBar` | default | items[] |

### 1.3 Focus Components

| Component | Variants | Props |
| --- | --- | --- |
| `FocusHeader` | default | kpi, achievement |
| `ParentCard` | default | kpi, status |
| `ChildrenList` | default | children[] |
| `ContributionChart` | default | data[] |

---

## 2. Screen Frames

| Frame ID | Screen | Size | Status |
| --- | --- | --- | --- |
| KT-FRM-01 | Tree View Desktop | 1440x900 | Ready |
| KT-FRM-02 | Tree View Mobile | 375x812 | Ready |
| KT-FRM-03 | KPI Focus View | 1440x900 | Ready |
| KT-FRM-04 | Full Company Tree | 1920x1200 | Ready |

---

## 3. Export Specifications

### Assets

- Tree connector lines: SVG
- Status colors: Per Design Tokens
- Expand/collapse icons: SVG 16x16

### Handoff Notes

- Tree virtualization for large datasets
- Smooth expand/collapse animations
- Pan and zoom for full tree view
- Color-blind accessible status indicators