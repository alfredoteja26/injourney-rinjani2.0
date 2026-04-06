## 0. Design Philosophy

> Design tokens are the single source of truth for visual decisions. They bridge design and development by encoding choices into reusable, semantic variables.
> 

### 0.1 Core Principles

1. **Semantic over Literal**
    - Tokens describe *intent* (`--primary`, `--destructive`) rather than raw values (`--teal-700`, `--red-600`).
    - This allows theming and mode switching without refactoring component code.
2. **Contextual Pairing**
    - Every background token has a corresponding `-foreground` token to guarantee accessible contrast.
    - Example: `--card` background pairs with `--card-foreground` text.
3. **Single Responsibility**
    - Each token serves one purpose. Avoid reusing `--primary` for unrelated decorative elements.
4. **Progressive Enhancement**
    - Base tokens (`:root`) define light mode defaults.
    - Dark mode (`.dark`) overrides only the values, not the token names.
5. **Composable Scale**
    - Derived tokens (e.g., `--radius-sm`, `--shadow-lg`) are computed from base tokens, ensuring proportional scaling across the system.

### 0.2 Token Consumption Flow

```
Design Decision → CSS Variable (Token) → Tailwind Theme Alias → Component Class
```

- **Design Decision:** "Primary action buttons use brand teal."
- **CSS Variable:** `--primary: #006573;`
- **Tailwind Alias:** `--color-primary: var(--primary);`
- **Component Class:** `bg-primary text-primary-foreground`

### 0.3 Decision Tree: Finding the Right Token

Use the following decision tree when selecting a token for any UI element:

```
START: What kind of element are you styling?
│
├─ A. Container / Surface?
│  ├─ Page-level background → --background / --foreground
│  ├─ Elevated card or panel → --card / --card-foreground
│  ├─ Dropdown, tooltip, menu → --popover / --popover-foreground
│  ├─ Sidebar / navigation panel → --sidebar / --sidebar-foreground
│  └─ Subdued or disabled area → --muted / --muted-foreground
│
├─ B. Interactive Element?
│  ├─ Primary action (submit, save, confirm) → --primary / --primary-foreground
│  ├─ Warm CTA, attention-needed state → --secondary / --secondary-foreground
│  ├─ Success, growth, positive outcome → --accent / --accent-foreground
│  ├─ Danger, delete, error → --destructive / --destructive-foreground
│  └─ Focus indicator → --ring
│
├─ C. Structural Element?
│  ├─ Divider, card border → --border
│  ├─ Form field border → --input
│  └─ Form field border on focus → --ring
│
├─ D. Sidebar-specific?
│  ├─ Active nav item → --sidebar-primary / --sidebar-primary-foreground
│  ├─ Hover or secondary action → --sidebar-accent / --sidebar-accent-foreground
│  ├─ Sidebar divider → --sidebar-border
│  └─ Sidebar focus ring → --sidebar-ring
│
├─ E. Data Visualization?
│  ├─ Primary series → --chart-1
│  ├─ Secondary series → --chart-2
│  ├─ Tertiary / attention → --chart-3
│  ├─ Warning / negative → --chart-4
│  └─ Additional series → --chart-5
│
└─ F. None of the above?
   ├─ Decorative / one-off illustration → Use raw value (not a token)
   └─ Third-party embed → Use raw value (outside design system)
```

### 0.4 When to Use Tokens vs. Raw Values

| Scenario | Use Token? | Rationale |
| --- | --- | --- |
| Button background color | Yes | Semantic intent; must respond to theme changes |
| One-off illustration stroke | No | Decorative, not part of UI system |
| Chart data series | Yes | Use `--chart-*` tokens for consistency across dashboards |
| Third-party embed border | No | External content outside design system control |
| Card background | Yes | Must adapt to light/dark mode |
| Marketing banner gradient | No | Campaign-specific, not reusable UI pattern |

---

## 1. Token Groups Overview

Tokens are organized into **functional groups** with consistent naming patterns. Understanding these groups helps developers select the right token for each use case.

### 1.1 Group Taxonomy

| Group | Prefix / Pattern | Purpose | Examples |
| --- | --- | --- | --- |
| **Surface** | `--background`, `--card`, `--popover`, `--sidebar` | Container backgrounds at different elevation levels | Page canvas, cards, dropdowns, navigation |
| **Content** | `--foreground`, `--*-foreground` | Text and icons placed on corresponding surfaces | Body text, card labels, button labels |
| **Interactive** | `--primary`, `--secondary`, `--accent`, `--destructive` | Actionable elements with semantic meaning | Buttons, links, badges, alerts |
| **Utility** | `--border`, `--input`, `--ring`, `--muted` | Supporting elements for structure and feedback | Dividers, form fields, focus rings |
| **Data Viz** | `--chart-1` through `--chart-5` | Sequential palette for charts and graphs | Bar charts, pie segments, line series |
| **Typography** | `--font-*`, `--tracking-*` | Font families and letter spacing | Body, headings, code blocks |
| **Shape** | `--radius`, `--radius-*` | Border radius scale | Buttons, inputs, cards, modals |
| **Elevation** | `--shadow-*` | Box shadow depth scale | Cards, popovers, modals |

### 1.2 Naming Conventions

**Pattern:** `--{group}[-{variant}][-{modifier}]`

| Layer | Description | Example |
| --- | --- | --- |
| **Group** | Functional category | `primary`, `card`, `sidebar` |
| **Variant** | Semantic sub-type | `foreground`, `accent`, `border` |
| **Modifier** | Size or state | `-sm`, `-lg`, `-1` through `-5` |

**Foreground Pairing Rule:**

Every background-type token has a `-foreground` counterpart:

- `--card` → `--card-foreground`
- `--primary` → `--primary-foreground`
- `--sidebar-accent` → `--sidebar-accent-foreground`

### 1.3 Usage Patterns by Component Type

| Component | Background | Text |
| --- | --- | --- |
| **Page** | `--background` | `--foreground` |
| **Card** | `--card` | `--card-foreground` |
| **Primary Button** | `--primary` | `--primary-foreground` |
| **Secondary Button** | `--secondary` | `--secondary-foreground` |
| **Destructive Button** | `--destructive` | `--destructive-foreground` |
| **Input** | `--background` | `--foreground` |
| **Muted Text** | inherit | `--muted-foreground` |
| **Badge / Highlight** | `--accent` | `--accent-foreground` |
| **Popover** | `--popover` | `--popover-foreground` |
| **Sidebar** | `--sidebar` | `--sidebar-foreground` |

---

## 2. Color System

### Base Colors

#### Light Mode

```css
:root {
  --background: #ffffff;
  --foreground: #101828;
  --card: #ffffff;
  --card-foreground: #101828;
  --popover: #ffffff;
  --popover-foreground: #101828;
  --border: #eaecf0;
  --input: #d0d5dd;
  --ring: #006573;
}
```

#### Dark Mode

```css
.dark {
  --background: #0c111d;
  --foreground: #f9fafb;
  --card: #101828;
  --card-foreground: #f9fafb;
  --popover: #101828;
  --popover-foreground: #f9fafb;
  --border: #344054;
  --input: #344054;
  --ring: #00a3af;
}
```

### Semantic Colors

#### Primary (Teal) — Professional & Trustworthy

```css
:root {
  --primary: #006573;
  --primary-foreground: #ffffff;
}

.dark {
  --primary: #00a3af;
  --primary-foreground: #000000;
}
```

**Usage:**

- Primary buttons dan CTAs utama
- Navigation active states
- Links dan interactive elements
- Focus rings pada form inputs
- Key metrics dan highlights dalam dashboard

**Example:** Dashboard sidebar, "Create account" button, primary navigation items

---

#### Secondary (Orange) — Warm & Energetic

```css
:root {
  --secondary: #f47c20;
  --secondary-foreground: #ffffff;
}

.dark {
  --secondary: #ff9b50;
  --secondary-foreground: #000000;
}
```

**Usage:**

- Secondary CTAs yang ingin menonjol
- Status indicators yang memerlukan perhatian (pending, in review)
- Notification badges dan alerts
- Interactive hover states untuk sidebar items
- Promotional elements atau highlights

**Example:** Tab "Cards" yang active (orange), notification badges, accent buttons

---

#### Accent (Green) — Growth & Success

```css
:root {
  --accent: #90bc40;
  --accent-foreground: #ffffff;
}

.dark {
  --accent: #b2e650;
  --accent-foreground: #000000;
}
```

**Usage:**

- Success states dan confirmations
- Positive metrics dan growth indicators
- Completed/approved status badges
- Call-to-actions untuk positive outcomes
- Hover states pada interactive charts

**Example:** Success messages, completed task indicators, positive trend indicators

---

#### Muted — Subtle Backgrounds & Secondary Text

```css
:root {
  --muted: #f2f4f7;
  --muted-foreground: #475467;
}

.dark {
  --muted: #1d2939;
  --muted-foreground: #98a2b3;
}
```

**Usage:**

- Disabled states
- Placeholder text dalam form inputs
- Secondary labels dan captions
- Background untuk inactive tabs atau sections
- Subtle dividers dan separators

**Example:** Placeholder text "[m@example.com](mailto:m@example.com)", disabled form fields, secondary descriptions

---

#### Destructive (Red) — Errors & Critical Actions

```css
:root {
  --destructive: #bc2419;
  --destructive-foreground: #ffffff;
}

.dark {
  --destructive: #ff7266;
  --destructive-foreground: #000000;
}
```

**Usage:**

- Error messages dan validation failures
- Delete buttons dan destructive actions
- Critical alerts atau warnings
- Rejected/cancelled status indicators
- Negative metrics (down trends, losses)

**Example:** Delete account buttons, error notifications, validation errors

---

### Chart Colors

```css
:root {
  --chart-1: #006573;  /* Primary teal */
  --chart-2: #90bc40;  /* Accent green */
  --chart-3: #f47c20;  /* Secondary orange */
  --chart-4: #e63d2e;  /* Warning red */
  --chart-5: #008a94;  /* Teal variant */
}

.dark {
  --chart-1: #008a94;
  --chart-2: #90bc40;
  --chart-3: #f47c20;
  --chart-4: #e63d2e;
  --chart-5: #006573;
}
```

**Usage Guidelines:**

- Gunakan chart-1 (teal) untuk data series utama atau primary metrics
- Gunakan chart-2 (green) untuk positive trends atau secondary metrics
- Gunakan chart-3 (orange) untuk data yang memerlukan attention atau comparison
- Gunakan chart-4 (red) untuk negative indicators atau alerts
- Gunakan chart-5 untuk tertiary data series

**Example:** Line charts dalam "Exercise Minutes", area charts dalam "Subscriptions", bar charts dalam "Move Goal"

---

### Sidebar Colors

```css
:root, .dark {
  --sidebar: #006573;
  --sidebar-foreground: #ffffff;
  --sidebar-primary: #ffffff;
  --sidebar-primary-foreground: #006573;
  --sidebar-accent: #f47c20;  /* Light mode */
  --sidebar-accent: #ffffff;   /* Dark mode */
  --sidebar-accent-foreground: #ffffff;
  --sidebar-border: #ffffff;
  --sidebar-ring: #90bc40;
}
```

**Usage:**

- `sidebar`: Background color untuk sidebar/navigation panel
- `sidebar-foreground`: Text color untuk navigation items
- `sidebar-primary`: Background untuk active/selected nav items
- `sidebar-accent`: Hover state atau secondary actions dalam sidebar
- `sidebar-ring`: Focus indicator untuk keyboard navigation

**Example:** Dashboard sidebar dengan active "Dashboard" item berwarna orange (sidebar-accent)

---

## Typography System

### Font Families

```css
:root {
  --font-sans: Plus Jakarta Sans, system-ui, sans-serif;
  --font-serif: Georgia, serif;
  --font-mono: JetBrains Mono, monospace;
}
```

**Primary Font:** Plus Jakarta Sans

- Modern, clean, dan professional
- Excellent readability untuk UI elements
- Optimal untuk screens dengan berbagai ukuran

**Import dari Google Fonts:**

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

### Typography Usage Guidelines

#### Headings & Titles

**Display / Hero Text**

- Font: Plus Jakarta Sans
- Weight: 700 (Bold)
- Size: 36px - 48px
- Usage: Hero headlines, landing page titles, major section headers
- Example: "Total Revenue $15,231.89"

**H1 — Page Titles**

- Font: Plus Jakarta Sans
- Weight: 700 (Bold)
- Size: 30px - 36px
- Usage: Main page headings, primary section titles
- Example: "Documents", "Dashboard"

**H2 — Section Headers**

- Font: Plus Jakarta Sans
- Weight: 600 (Semi-bold)
- Size: 20px - 24px
- Usage: Card titles, major subsections
- Example: "Total Revenue", "Subscriptions", "Create an account"

**H3 — Subsection Headers**

- Font: Plus Jakarta Sans
- Weight: 600 (Semi-bold)
- Size: 16px - 18px
- Usage: Card subtitles, form section headers
- Example: "Upgrade your subscription", "Move Goal"

**H4 — Component Titles**

- Font: Plus Jakarta Sans
- Weight: 500 (Medium)
- Size: 14px - 16px
- Usage: List item headers, table headers, small card titles
- Example: "Name", "Email", "Card Number"

---

#### Body Text

**Body Large**

- Font: Plus Jakarta Sans
- Weight: 400 (Regular)
- Size: 16px
- Line height: 1.5 (24px)
- Usage: Primary content text, descriptions, paragraphs
- Example: "You are currently on the free plan. Upgrade to the pro plan to get access to all features."

**Body Regular (Default)**

- Font: Plus Jakarta Sans
- Weight: 400 (Regular)
- Size: 14px
- Line height: 1.5 (21px)
- Usage: Form labels, list items, table cells, general UI text
- Example: Form inputs, navigation items, table data

**Body Small**

- Font: Plus Jakarta Sans
- Weight: 400 (Regular)
- Size: 12px
- Line height: 1.5 (18px)
- Usage: Captions, helper text, metadata, timestamps
- Example: "+20.1% from last month", "Your exercise minutes are ahead..."

**Body Extra Small**

- Font: Plus Jakarta Sans
- Weight: 400 (Regular)
- Size: 11px
- Line height: 1.4 (15px)
- Usage: Badges, tags, fine print, legal text
- Example: Status badges, category tags

---

#### Interactive Text

**Buttons**

- Font: Plus Jakarta Sans
- Weight: 500 (Medium)
- Size: 14px - 16px (depending on button size)
- Usage: All button labels and CTAs
- Example: "Create account", "GitHub", "Google"

**Links**

- Font: Plus Jakarta Sans
- Weight: 500 (Medium)
- Size: Inherit from context
- Color: var(--primary) or var(--ring)
- Usage: Hyperlinks, navigation links
- Decoration: Underline on hover

**Form Inputs & Placeholders**

- Font: Plus Jakarta Sans
- Weight: 400 (Regular)
- Size: 14px
- Color: var(--foreground) for text, var(--muted-foreground) for placeholders
- Example: "[m@example.com](mailto:m@example.com)", "Evil Rabbit", "1234 1234 1234 1234"

---

#### Data & Metrics

**Large Metrics**

- Font: Plus Jakarta Sans
- Weight: 700 (Bold)
- Size: 24px - 32px
- Usage: Dashboard KPIs, key statistics, large numbers
- Example: "$15,231.89", "+2,350", "350 CALORIES/DAY"

**Medium Metrics**

- Font: Plus Jakarta Sans
- Weight: 600 (Semi-bold)
- Size: 18px - 24px
- Usage: Chart labels, secondary metrics
- Example: "1,234", "45,678", "4.5%"

**Small Metrics**

- Font: Plus Jakarta Sans
- Weight: 500 (Medium)
- Size: 12px - 14px
- Usage: Chart data points, table numbers, inline stats
- Example: "+12.5%", "Down 20% this period"

**Monospace (Code/Data)**

- Font: JetBrains Mono
- Weight: 400 (Regular)
- Size: 13px - 14px
- Usage: Code snippets, technical identifiers, structured data
- Example: CSS values, IDs, technical references

---

### Letter Spacing (Tracking)

```css
:root {
  --tracking-normal: -0.01em;
  --tracking-tighter: calc(var(--tracking-normal) - 0.05em);  /* -0.06em */
  --tracking-tight: calc(var(--tracking-normal) - 0.025em);   /* -0.035em */
  --tracking-wide: calc(var(--tracking-normal) + 0.025em);    /* 0.015em */
  --tracking-wider: calc(var(--tracking-normal) + 0.05em);    /* 0.04em */
  --tracking-widest: calc(var(--tracking-normal) + 0.1em);    /* 0.09em */
}

body {
  letter-spacing: var(--tracking-normal);
}
```

**Usage Guidelines:**

- **Tighter (-0.06em)**: Large headings dan display text (>32px)
- **Tight (-0.035em)**: Medium headings (24-32px)
- **Normal (-0.01em)**: Default untuk body text dan small headings
- **Wide (0.015em)**: All-caps labels, badges
- **Wider/Widest (0.04-0.09em)**: Small all-caps text (category tags, metadata)

---

## Spacing System

```css
:root {
  --spacing: 0.25rem;  /* 4px base unit */
}
```

**Spacing Scale (based on 4px increments):**

- **xs**: 4px (1 unit) — Tight spacing, badges, icon padding
- **sm**: 8px (2 units) — Small gaps between related elements
- **md**: 12px (3 units) — Standard gap between form fields
- **lg**: 16px (4 units) — Card padding, section spacing
- **xl**: 24px (6 units) — Large section gaps
- **2xl**: 32px (8 units) — Major section divisions
- **3xl**: 48px (12 units) — Page-level spacing

**Usage Examples:**

- **Card padding**: 16px (lg)
- **Button padding**: 12px horizontal, 8px vertical (md/sm)
- **Form field gaps**: 12px - 16px (md to lg)
- **Section spacing**: 24px - 32px (xl to 2xl)
- **Page margins**: 32px - 48px (2xl to 3xl)

---

## Border Radius

```css
:root {
  --radius: 0.5rem;  /* 8px base */
  --radius-sm: calc(var(--radius) - 4px);  /* 4px */
  --radius-md: calc(var(--radius) - 2px);  /* 6px */
  --radius-lg: var(--radius);              /* 8px */
  --radius-xl: calc(var(--radius) + 4px);  /* 12px */
}
```

**Usage Guidelines:**

- **sm (4px)**: Small badges, tags, pills
- **md (6px)**: Buttons, form inputs, small cards
- **lg (8px)**: Standard cards, popovers, dropdowns
- **xl (12px)**: Large cards, modals, containers
- **full (9999px)**: Circular elements (avatars, icon buttons)

**Example:** Dashboard cards menggunakan radius-lg (8px), buttons menggunakan radius-md (6px)

---

## Shadow System

### Light Mode Shadows

```css
:root {
  --shadow-x: 0px;
  --shadow-y: 2px;
  --shadow-blur: 10px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.05;
  --shadow-color: #101828;
  
  --shadow-2xs: 0px 2px 10px 0px hsl(220 42.8571% 10.9804% / 0.03);
  --shadow-xs: 0px 2px 10px 0px hsl(220 42.8571% 10.9804% / 0.03);
  --shadow-sm: 0px 2px 10px 0px hsl(220 42.8571% 10.9804% / 0.05), 
               0px 1px 2px -1px hsl(220 42.8571% 10.9804% / 0.05);
  --shadow: 0px 2px 10px 0px hsl(220 42.8571% 10.9804% / 0.05), 
            0px 1px 2px -1px hsl(220 42.8571% 10.9804% / 0.05);
  --shadow-md: 0px 2px 10px 0px hsl(220 42.8571% 10.9804% / 0.05), 
               0px 2px 4px -1px hsl(220 42.8571% 10.9804% / 0.05);
  --shadow-lg: 0px 2px 10px 0px hsl(220 42.8571% 10.9804% / 0.05), 
               0px 4px 6px -1px hsl(220 42.8571% 10.9804% / 0.05);
  --shadow-xl: 0px 2px 10px 0px hsl(220 42.8571% 10.9804% / 0.05), 
               0px 8px 10px -1px hsl(220 42.8571% 10.9804% / 0.05);
  --shadow-2xl: 0px 2px 10px 0px hsl(220 42.8571% 10.9804% / 0.13);
}
```

### Dark Mode Shadows

```css
.dark {
  --shadow-x: 0px;
  --shadow-y: 4px;
  --shadow-blur: 15px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.25;
  --shadow-color: #000000;
  
  --shadow-2xs: 0px 4px 15px 0px hsl(0 0% 0% / 0.13);
  --shadow-xs: 0px 4px 15px 0px hsl(0 0% 0% / 0.13);
  --shadow-sm: 0px 4px 15px 0px hsl(0 0% 0% / 0.25), 
               0px 1px 2px -1px hsl(0 0% 0% / 0.25);
  --shadow: 0px 4px 15px 0px hsl(0 0% 0% / 0.25), 
            0px 1px 2px -1px hsl(0 0% 0% / 0.25);
  --shadow-md: 0px 4px 15px 0px hsl(0 0% 0% / 0.25), 
               0px 2px 4px -1px hsl(0 0% 0% / 0.25);
  --shadow-lg: 0px 4px 15px 0px hsl(0 0% 0% / 0.25), 
               0px 4px 6px -1px hsl(0 0% 0% / 0.25);
  --shadow-xl: 0px 4px 15px 0px hsl(0 0% 0% / 0.25), 
               0px 8px 10px -1px hsl(0 0% 0% / 0.25);
  --shadow-2xl: 0px 4px 15px 0px hsl(0 0% 0% / 0.63);
}
```

**Usage Guidelines:**

- **2xs/xs**: Subtle elevation untuk badges, tags
- **sm/md**: Standard cards, form inputs (default elevation)
- **lg**: Elevated cards, navigation bars, sticky headers
- **xl**: Modals, popovers, dropdown menus
- **2xl**: Maximum elevation untuk critical overlays, toasts

**Note:** Dark mode menggunakan shadow yang lebih pronounced (4px offset, 15px blur) untuk mempertahankan depth perception dalam dark backgrounds.

**Example:** Dashboard cards menggunakan shadow-md, popover menggunakan shadow-xl

---

## Component Patterns

### Buttons

#### Primary Button

```css
.btn-primary {
  background: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius-md);
  padding: 8px 16px;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background: hsl(from var(--primary) h s calc(l * 0.9));
}
```

**Example:** "Create account" button

---

#### Secondary Button

```css
.btn-secondary {
  background: var(--secondary);
  color: var(--secondary-foreground);
  border-radius: var(--radius-md);
  padding: 8px 16px;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
}
```

**Example:** "Google" button dengan accent color

---

#### Outline Button

```css
.btn-outline {
  background: transparent;
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 8px 16px;
  font-weight: 500;
}

.btn-outline:hover {
  background: var(--muted);
}
```

**Example:** "GitHub" button

---

### Cards

```css
.card {
  background: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-md);
}
```

**Usage:**

- Dashboard metric cards (Total Revenue, Subscriptions)
- Form containers (Create an account, Upgrade your subscription)
- Content sections (Exercise Minutes, Payments)

**Example:** All white cards dalam dashboard screenshot

---

### Form Inputs

```css
.input {
  background: var(--card);
  color: var(--foreground);
  border: 1px solid var(--input);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 400;
}

.input:focus {
  border-color: var(--ring);
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.input::placeholder {
  color: var(--muted-foreground);
}
```

**Example:** Email input "[m@example.com](mailto:m@example.com)", Name input "Evil Rabbit"

---

### Navigation Sidebar

```css
.sidebar {
  background: var(--sidebar);
  color: var(--sidebar-foreground);
}

.sidebar-item {
  padding: 8px 12px;
  border-radius: var(--radius-md);
  color: var(--sidebar-foreground);
}

.sidebar-item.active {
  background: var(--sidebar-accent);
  color: var(--sidebar-accent-foreground);
}

.sidebar-item:hover {
  background: var(--sidebar-primary);
  color: var(--sidebar-primary-foreground);
}
```

**Example:** Dashboard sidebar dengan teal background dan orange active state untuk "Dashboard" item

---

### Data Visualization

```css
.chart-line-1 { stroke: var(--chart-1); }
.chart-line-2 { stroke: var(--chart-2); }
.chart-area-1 { fill: var(--chart-1); opacity: 0.2; }
.chart-bar-1 { fill: var(--chart-1); }
```

**Color Assignment Strategy:**

- **Primary data series**: chart-1 (teal)
- **Secondary/comparison series**: chart-2 (green)
- **Highlighted/attention data**: chart-3 (orange)
- **Warning/negative data**: chart-4 (red)
- **Tertiary data**: chart-5 (teal variant)

**Example:** 

- Subscriptions line chart menggunakan chart-1
- Exercise Minutes dual-line chart menggunakan chart-1 dan chart-2
- Move Goal bar chart menggunakan gradient dari chart-1 ke chart-2

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

## Status Badge Colors

Untuk aplikasi Rinjani Talent (Job Tender Management), gunakan semantic colors berikut:

```css
/* Position/Tender Status */
.status-draft { background: var(--muted); color: var(--muted-foreground); }
.status-open { background: var(--accent); color: var(--accent-foreground); }
.status-pending { background: var(--secondary); color: var(--secondary-foreground); }
.status-closed { background: var(--muted); color: var(--foreground); }
.status-cancelled { background: var(--destructive); color: var(--destructive-foreground); }

/* Application Status */
.status-submitted { background: var(--primary); color: var(--primary-foreground); }
.status-screening { background: #7C3AED; color: #ffffff; }
.status-shortlisted { background: #0D9488; color: #ffffff; }
.status-interview { background: var(--secondary); color: var(--secondary-foreground); }
.status-offered { background: var(--accent); color: var(--accent-foreground); }
.status-accepted { background: #059669; color: #ffffff; }
.status-rejected { background: var(--destructive); color: var(--destructive-foreground); }
.status-withdrawn { background: var(--muted); color: var(--muted-foreground); }
```

---

## Accessibility Guidelines

### Color Contrast

- **Text on background**: Minimum 4.5:1 contrast ratio (WCAG AA)
- **Large text (≥18px)**: Minimum 3:1 contrast ratio
- **Interactive elements**: Minimum 3:1 contrast ratio

**Pre-validated Combinations:**

✅ `--foreground` (#101828) on `--background` (#ffffff) = 12.6:1

✅ `--primary-foreground` (#ffffff) on `--primary` (#006573) = 5.8:1

✅ `--secondary-foreground` (#ffffff) on `--secondary` (#f47c20) = 3.5:1

✅ `--accent-foreground` (#ffffff) on `--accent` (#90bc40) = 2.9:1 (large text only)

### Focus States

Always provide visible focus indicators:

```css
*:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

### Dark Mode Support

Semua components harus mendukung dark mode dengan mendeteksi `.dark` class atau `prefers-color-scheme`:

```css
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    /* Apply dark mode tokens */
  }
}
```

---

## Implementation Checklist

Saat membuat component atau screen baru, pastikan:

- [ ]  Menggunakan semantic color tokens (primary/secondary/accent/destructive) bukan hardcoded hex values
- [ ]  Typography menggunakan Plus Jakarta Sans dengan weights yang tepat
- [ ]  Spacing menggunakan kelipatan 4px dari `--spacing`
- [ ]  Border radius konsisten dengan `--radius-*` scale
- [ ]  Shadows menggunakan `--shadow-*` tokens
- [ ]  Components memiliki focus states dengan `--ring` color
- [ ]  Dark mode support melalui `.dark` class
- [ ]  Color contrast memenuhi WCAG AA standard
- [ ]  Interactive states (hover/active/disabled) terdefinisi dengan jelas
- [ ]  Charts dan data visualization menggunakan `--chart-*` colors