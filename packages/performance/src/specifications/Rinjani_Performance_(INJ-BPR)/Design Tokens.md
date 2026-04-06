## Design Tokens

Visual foundation untuk **Rinjani Performance** module.

---

## 1. Color Palette

### 1.1 Primary Colors (InJourney Brand)

| **Token** | **Hex** | **Usage** |
| --- | --- | --- |
| `--color-primary-500` | #E31937 | Primary brand red (InJourney) |
| `--color-primary-600` | #C41530 | Primary hover state |
| `--color-primary-100` | #FCE8EB | Primary light background |

### 1.2 Secondary Colors

| **Token** | **Hex** | **Usage** |
| --- | --- | --- |
| `--color-secondary-500` | #1E3A5F | Navy blue (headers, navigation) |
| `--color-secondary-100` | #E8EDF2 | Light navy background |

### 1.3 Performance Rating Colors

| **Rating** | **Token** | **Hex** | **Label** |
| --- | --- | --- | --- |
| 1 | `--color-rating-unsuccessful` | #DC2626 | Unsuccessful (Red) |
| 2 | `--color-rating-partial` | #F59E0B | Partially Successful (Amber) |
| 3 | `--color-rating-successful` | #10B981 | Successful (Green) |
| 4 | `--color-rating-excellent` | #3B82F6 | Excellent (Blue) |
| 5 | `--color-rating-outstanding` | #8B5CF6 | Outstanding (Purple) |

### 1.4 KPI Type Colors

| **KPI Type** | **Token** | **Hex** |
| --- | --- | --- |
| KPI Bersama | `--color-kpi-bersama` | #2563EB |
| KPI Unit | `--color-kpi-unit` | #059669 |

### 1.5 Status Colors

| **Status** | **Token** | **Hex** |
| --- | --- | --- |
| Draft | `--color-status-draft` | #6B7280 |
| Waiting Approval | `--color-status-waiting` | #F59E0B |
| Approved | `--color-status-approved` | #10B981 |
| Rejected | `--color-status-rejected` | #EF4444 |

---

## 2. Typography

### 2.1 Font Family

| **Token** | **Value** | **Usage** |
| --- | --- | --- |
| `--font-primary` | 'Inter', sans-serif | Body text, UI elements |
| `--font-display` | 'Plus Jakarta Sans', sans-serif | Headings, titles |
| `--font-mono` | 'JetBrains Mono', monospace | Code, numbers |

### 2.2 Font Sizes

| **Token** | **Size** | **Line Height** | **Usage** |
| --- | --- | --- | --- |
| `--text-xs` | 12px | 16px | Labels, captions |
| `--text-sm` | 14px | 20px | Body small, table cells |
| `--text-base` | 16px | 24px | Body default |
| `--text-lg` | 18px | 28px | Subheadings |
| `--text-xl` | 20px | 28px | Card titles |
| `--text-2xl` | 24px | 32px | Section headings |
| `--text-3xl` | 30px | 36px | Page titles |

---

## 3. Spacing

| **Token** | **Value** | **Usage** |
| --- | --- | --- |
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Component internal |
| `--space-3` | 12px | Small gap |
| `--space-4` | 16px | Default gap |
| `--space-6` | 24px | Section spacing |
| `--space-8` | 32px | Large spacing |

---

## 4. Border Radius

| **Token** | **Value** | **Usage** |
| --- | --- | --- |
| `--radius-sm` | 4px | Buttons, inputs |
| `--radius-md` | 8px | Cards, modals |
| `--radius-lg` | 12px | Large containers |
| `--radius-full` | 9999px | Pills, avatars |

---

## 5. Shadows

| **Token** | **Value** | **Usage** |
| --- | --- | --- |
| `--shadow-sm` | 0 1px 2px rgba(0,0,0,0.05) | Subtle elevation |
| `--shadow-md` | 0 4px 6px rgba(0,0,0,0.1) | Cards, dropdowns |
| `--shadow-lg` | 0 10px 15px rgba(0,0,0,0.1) | Modals, popovers |

---

## 6. Component Tokens

### 6.1 KPI Card

| **Token** | **Value** |
| --- | --- |
| `--kpi-card-padding` | 16px |
| `--kpi-card-radius` | 8px |
| `--kpi-card-border` | 1px solid #E5E7EB |
| `--kpi-card-shadow` | var(--shadow-sm) |

### 6.2 Progress Bar

| **Token** | **Value** |
| --- | --- |
| `--progress-height` | 8px |
| `--progress-radius` | 4px |
| `--progress-bg` | #E5E7EB |

### 6.3 Score Badge

| **Token** | **Value** |
| --- | --- |
| `--badge-padding` | 4px 8px |
| `--badge-radius` | 4px |
| `--badge-font-size` | 12px |
| `--badge-font-weight` | 600 |

---

## 7. CSS Variables Export

```css
:root {
  /* Primary */
  --color-primary-500: #E31937;
  --color-primary-600: #C41530;
  --color-primary-100: #FCE8EB;
  
  /* Secondary */
  --color-secondary-500: #1E3A5F;
  --color-secondary-100: #E8EDF2;
  
  /* Rating Colors */
  --color-rating-unsuccessful: #DC2626;
  --color-rating-partial: #F59E0B;
  --color-rating-successful: #10B981;
  --color-rating-excellent: #3B82F6;
  --color-rating-outstanding: #8B5CF6;
  
  /* KPI Type Colors */
  --color-kpi-bersama: #2563EB;
  --color-kpi-unit: #059669;
  
  /* Typography */
  --font-primary: 'Inter', sans-serif;
  --font-display: 'Plus Jakarta Sans', sans-serif;
  
  /* Spacing */
  --space-4: 16px;
  --space-6: 24px;
  
  /* Radius */
  --radius-md: 8px;
}
```

---

## Source Reference

- InJourney Brand Guidelines
- [Portaverse PMS 2025 (PEL-004-PMS)](https://www.notion.so/Portaverse-PMS-2025-PEL-004-PMS-9a6ac6f8e2bd4d0dbef773776153efb2?pvs=21)