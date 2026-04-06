# Rinjani Talent Design System Guidelines

This project uses the **Rinjani Talent Design System** for building Talent Management interfaces. Files in the `guidelines/` directory show how to use this design system.

---

## Component Usage Guidelines — READ THIS FIRST

**IMPORTANT:** Always prefer to use components defined in Shell Spec if they exist. Do not create custom components when standard ones are available.

**IMPORTANT:** Follow these steps IN ORDER before writing any code:

### Step 1: Read Product Artifacts (REQUIRED)

Read ALL files in the `guidelines/Rinjani Talent (INJ-BPR)/Product Artifacts/` folder:

```
Product Artifacts/
├── Design Tokens      → Colors, typography, spacing, effects
├── Shell Spec         → Layout, navigation, available components
├── Data Model         → Entity definitions for mock data generation
└── Product Charter    → Product vision & scope
```

Do NOT skip this step.

### Step 2: Check Section-Specific Artifacts (IF APPLICABLE)

If building a specific section, read the artifacts in:

```jsx
Sections/[Section Name]/
├── Section Spec       → Requirements & user flows for this screen
├── Sample Data        → Mock data specific to this screen
├── Screen Design      → UI specifications and wireframes
└── Figma Export Pkg   → Exported Figma assets
```

**Planning Requirement:** After reading, identify:

- Which screens need to be designed (from Section Spec user flows)
- UI layout and element specifications (from Screen Design)
- Data entities and fields required (from Sample Data)

### Step 3: Plan What Components You Need (REQUIRED)

Before writing code, list all components you will use.

**Planning Requirement:** Cross-reference these artifacts:

- **Shell Spec** → Available components (AppShell, Header, Sidebar, PageHeader, DataTable, Card, Badge, Toast, etc.)
- **Screen Design** → Specific component usage and placement per screen
- **Section Spec** → Functional requirements that determine component behavior

Create a component checklist before proceeding to implementation.

### Step 4: Read Component Guidelines BEFORE Using Components (REQUIRED)

BEFORE using ANY component, verify its props and usage patterns in the Shell Spec:

- Using AppShell? → Read Shell Spec section on layout FIRST
- Using DataTable? → Read Shell Spec section on data grids FIRST
- Using Badge? → Read Shell Spec section on status colors FIRST

DO NOT write code using a component until you have verified its specification.

### Step 5: Plan What Icons You Need (REQUIRED)

This project uses **Lucide React** for icons. Before using ANY icon:

1. Check if the icon exists in Lucide React
2. If it doesn't exist, pick a different icon and verify

Prefer outlined style icons for consistency.

### Step 6: Use Indonesian Context Mock Data (OPTIONAL)

If mock data is needed, follow these rules:

1. **Data Model Compliance:** All mock data MUST follow entity schemas in Product Artifacts → Data Model
2. **Sample Data Reference:** If the section has Sample Data artifact, use it as the primary source
3. **Indonesian Context:** Use realistic Indonesian context:
    - Names: "Budi Santoso", "Siti Rahayu", "Ahmad Wijaya"
    - Currency: "Rp 15.000.000" (dot as thousand separator)
    - Locations: Jakarta, Surabaya, Semarang, Makassar
    - Titles: "VP Human Capital", "Senior Manager", "Direktur"
    - BUMN terms: "Grade Jabatan", "Job Family", "Unit Kerja"
    - Talent terms: "EQS Score", "9-Box", "Succession", "Readiness"

---

## Folder Structure

```jsx
guidelines/
├── Guidelines (this file)
│
└── Rinjani Talent (INJ-BPR)/
    ├── Product Artifacts/
    │   ├── Data Model
    │   ├── Design Tokens
    │   ├── Product Charter
    │   └── Shell Spec
    │
    └── Sections/
        ├── Career Path/
        │   ├── Section Spec
        │   ├── Sample Data
        │   ├── Screen Design
        │   └── Figma Export Package
        │
        ├── Development Plan/
        │   ├── Section Spec
        │   ├── Sample Data
        │   ├── Screen Design
        │   └── Figma Export Package
        │
        ├── Job Tender Marketplace/
        │   ├── Section Spec
        │   ├── Sample Data
        │   ├── Screen Design
        │   └── Figma Export Package
        │
        ├── Talent Pool/
        │   ├── Section Spec
        │   ├── Sample Data
        │   ├── Screen Design
        │   └── Figma Export Package
        │
        ├── 9-Box Classification/
        │   ├── Section Spec
        │   ├── Sample Data
        │   ├── Screen Design
        │   └── Figma Export Package
        │
        ├── Talent Review/
        │   ├── Section Spec
        │   ├── Sample Data
        │   ├── Screen Design
        │   └── Figma Export Package
        │
        ├── Succession Planning/
        │   ├── Section Spec
        │   ├── Sample Data
        │   ├── Screen Design
        │   └── Figma Export Package
        │
        ├── Talent Headquarter/
        │   ├── Section Spec
        │   ├── Sample Data
        │   ├── Screen Design
        │   └── Figma Export Package
        │
        ├── IDP Headquarter/
        │   ├── Section Spec
        │   ├── Sample Data
        │   ├── Screen Design
        │   └── Figma Export Package
        │
        └── 360 Assessment/
            ├── Section Spec
            ├── Sample Data
            ├── Screen Design
            └── Figma Export Package
```

---

## Tech Stack

| Category | Technology | Notes |
| --- | --- | --- |
| Framework | React (Next.js App Router) | Use App Router conventions |
| Styling | Tailwind CSS v4 | Follow design token mappings |
| Icons | Lucide React | Prefer outlined style |
| Charts | Recharts | For dashboards and analytics |
| Tables | TanStack Table | For data grids with sorting/filtering |
| Forms | React Hook Form + Zod | For validation |

---

## Design Tokens (Required Reading)

Before implementing any UI, follow these steps to understand the design tokens:

1. **Read Design Tokens artifact:** `Product Artifacts/Design Tokens`
2. **Understand token categories:**
    - Colors (background, foreground, primary, secondary, muted, accent, destructive, border, ring, chart-1 to chart-5)
    - Typography (font-sans, font-mono)
    - Spacing (4px base unit)
    - Effects (radius-sm/md/lg/xl, shadow-2xs through shadow-2xl)
3. **Apply semantic usage:** Tokens describe intent, not raw values
4. **Follow foreground pairing:** Every background token has a `-foreground` counterpart
- Link to page: [Rinjani Talent - Design Tokens](https://www.notion.so/Rinjani-Talent-Design-Tokens-8d0a1893bd79427d99128b2ae4d6087f?pvs=21)

---

## Layout Structure

Every page MUST use AppShell wrapper:

```jsx
┌─────────────────────────────────────────────────────────────┐
│ Header (sticky, user profile, notifications, search)        │
├──────────┬──────────────────────────────────────────────────┤
│ Sidebar  │ Main Content                                     │
│ (240px)  │ (scrollable, --background)                       │
│ collapse │                                                  │
│ to 64px  │ ┌─────────────────────────────────────────────┐  │
│          │ │ Breadcrumb                                  │  │
│          │ │ Page Title + Subtitle                       │  │
│          │ │ Content Card (--card, shadow-md)            │  │
│          │ └─────────────────────────────────────────────┘  │
└──────────┴──────────────────────────────────────────────────┘
```

**Key Constraints:**

- Content Width: `max-w-[1280px] mx-auto`
- Sidebar: 240px expanded, 64px collapsed
- Content padding: `space-6` (24px)
- Background: `--background` (light) / `--background` (dark mode auto-switches)

---

## UI/UX Standards

### Language

**Primary Language:** Bahasa Indonesia

**English Exceptions:**

- Talent Terminology: EQS Score, 9-Box, Succession, Readiness, Job Fit, Top Talent
- Technical Terms: Dashboard, Filter, Toggle, Tab, Screening, Shortlist
- Common Business: Job Tender, Internal Mobility, Career Path, Development Plan

### Module Subtitles

| Module | Subtitle |  |
| --- | --- | --- |
| **Career Path** | *"Rencanakan perjalanan karirmu"* |  |
| **Development Plan** | *"Kembangkan potensi terbaikmu"* |  |
| **Job Tender Marketplace** | *"Temukan peluang karir internal"* |  |
| **Talent Pool** | *"Kelola dan identifikasi talenta"* |  |
| **Succession Planning** | *"Siapkan pemimpin masa depan"* |  |
| **9-Box Classification** | *"Petakan potensi dan kinerja"* |  |
| **Talent Review** | *"Evaluasi dan kembangkan talenta"* |  |
| **Talent Headquarter** | *"Kelola seluruh aspek talenta"* |  |
| **IDP Headquarter** | *"Atur program pengembangan karyawan"* |  |
| **360 Assessment** | *"Evaluasi menyeluruh kinerja talenta"* |  |

**Display:** `text-base`, `text-muted-foreground`, `italic` - below page title

### Approval Semantics

| Action | Label | Color | Icon |
| --- | --- | --- | --- |
| **Approve** | "Terima" | `emerald-600` bg, white text | ✓ |
| **Reject** | "Tolak" | `destructive` bg, white text | ✕ |

**Rules:**

- Never use "Setuju"/"Tidak Setuju" for approval flows
- Always pair with confirmation dialog for destructive actions
- Reject requires mandatory reason field

---

## Tailwind CSS v4 Integration

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);

  --tracking-tighter: calc(var(--tracking-normal) - 0.05em);
  --tracking-tight: calc(var(--tracking-normal) - 0.025em);
  --tracking-normal: var(--tracking-normal);
  --tracking-wide: calc(var(--tracking-normal) + 0.025em);
  --tracking-wider: calc(var(--tracking-normal) + 0.05em);
  --tracking-widest: calc(var(--tracking-normal) + 0.1em);
}
```

**Usage dengan Tailwind Classes:**

```html
<!-- Primary button -->
<button class="bg-primary text-primary-foreground rounded-md px-4 py-2">
  Click me
</button>

<!-- Card -->
<div class="bg-card border border-border rounded-lg p-4 shadow-md">
  Card content
</div>

<!-- Input -->
<input class="bg-card border border-input rounded-md px-3 py-2 focus:ring-ring" />
```

---

## Important Notes

- Design tokens are defined in Product Artifacts → Design Tokens
- Layout and components are defined in Product Artifacts → Shell Spec
- Entity schemas are defined in Product Artifacts → Data Model
- Section-specific mock data is in each section's Sample Data file
- Dark mode is supported - tokens auto-switch via `.dark` class
- Do NOT use generic AI-generated aesthetics - follow the brand identity strictly

---

 Some of the base components you are using may have styling(eg. gap/typography) baked in as defaults.
So make sure you explicitly set any styling information from the guidelines in the generated react to override the defaults.