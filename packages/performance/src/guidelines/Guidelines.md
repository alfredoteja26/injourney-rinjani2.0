# Rinjani Performance — Design Guidelines

This document guides creation of distinctive, production-grade frontend interfaces for Rinjani Performance (INJ-BPR), InJourney's employee KPI management system. Implement real working code with exceptional attention to aesthetic details and creative choices.

---

## 1. Product Context

**Application**: Rinjani Performance
**Domain**: Human Capital Management — KPI & Performance Evaluation
**Users**: InJourney employees, managers, and HR administrators
**Modules**: My KPI, My Team KPI, KPI Library, KPI Tree, KPI Headquarter

**Core Problem**: Enable employees to track, cascade, and evaluate KPIs across organizational hierarchy with clarity and motivation.

---

## 2. Aesthetic Direction

### 2.1. Design Tone

**Primary Direction**: Corporate Refined with Data Clarity
- Clean, professional enterprise aesthetic
- High-density data visualization without clutter
- Subtle depth through layered cards and soft shadows
- Purposeful color coding for KPI states and ratings

**Differentiation**: The interface should feel like a premium productivity tool — not a generic dashboard. Every screen must answer: "What action should I take next?"

### 2.2. Anti-Patterns (Avoid)

NEVER use generic AI-generated aesthetics:
- Overused fonts: Inter, Roboto, Arial, system-ui
- Cliché colors: Purple gradients on white, generic blue (#007bff)
- Cookie-cutter dashboard layouts with identical card grids
- Decorative elements without functional purpose

---

## 3. Typography System

### 3.1. Font Stack

| Role | Font Family | Fallback |
|------|-------------|----------|
| Display/Headings | Plus Jakarta Sans | system-ui |
| Body/Data | DM Sans | system-ui |
| Monospace/Metrics | JetBrains Mono | monospace |

### 3.2. Type Scale

```

--text-xs: 0.75rem;    / *12px - Labels, captions* /

--text-sm: 0.875rem;   / *14px - Secondary text* /

--text-base: 1rem;     / *16px - Body text* /

--text-lg: 1.125rem;   / *18px - Subheadings* /

--text-xl: 1.25rem;    / *20px - Section titles* /

--text-2xl: 1.5rem;    / *24px - Page titles* /

--text-3xl: 1.875rem;  / *30px - Hero numbers* /

--text-4xl: 2.25rem;   / *36px - Dashboard metrics* /

```

### 3.3. Typography Rules

- KPI achievement numbers: Use `text-3xl` or `text-4xl` with `JetBrains Mono`
- Status labels: Use `text-xs` uppercase with letter-spacing `0.05em`
- Data tables: Use `text-sm` for density without sacrificing readability

---

## 4. Color System

### 4.1. Brand Palette

```

/ *Primary - InJourney Brand* /

--primary-50: #eff6ff;

--primary-100: #dbeafe;

--primary-500: #3b82f6;

--primary-600: #2563eb;

--primary-700: #1d4ed8;

--primary-900: #1e3a8a;

/ *Neutral - UI Foundation* /

--neutral-50: #fafafa;

--neutral-100: #f4f4f5;

--neutral-200: #e4e4e7;

--neutral-300: #d4d4d8;

--neutral-500: #71717a;

--neutral-700: #3f3f46;

--neutral-900: #18181b;

```

### 4.2. Semantic Colors

```

/ *KPI Rating Scale (1-5)* /

--rating-1: #ef4444;  / *Red - Very Poor* /

--rating-2: #f97316;  / *Orange - Below Target* /

--rating-3: #eab308;  / *Yellow - On Target* /

--rating-4: #22c55e;  / *Green - Above Target* /

--rating-5: #10b981;  / *Emerald - Exceptional* /

/ *KPI Type Badges* /

--kpi-strategic: #8b5cf6;   / *Purple* /

--kpi-operational: #06b6d4; / *Cyan* /

--kpi-individual: #f59e0b;  / *Amber* /

/ *Workflow Status* /

--status-draft: #71717a;

--status-pending: #f59e0b;

--status-approved: #22c55e;

--status-rejected: #ef4444;

```

### 4.3. Color Usage Rules

- Use `rating-*` tokens exclusively for KPI achievement visualization
- Apply `kpi-type-*` as badge backgrounds with white text
- Reserve `primary-600` for primary CTAs only
- Use `neutral-100` for card backgrounds, `neutral-50` for page backgrounds

---

## 5. Spatial Composition

### 5.1. Layout Grid

```

/ *Desktop (≥1280px)* /

--container-max: 1440px;

--sidebar-width: 280px;

--content-max: 1160px;

--grid-columns: 12;

--grid-gap: 24px;

/ *Tablet (768-1279px)* /

--grid-columns: 8;

--grid-gap: 20px;

/ *Mobile (<768px)* /

--grid-columns: 4;

--grid-gap: 16px;

```

### 5.2. Spacing Scale

```

--space-1: 0.25rem;  / *4px* /

--space-2: 0.5rem;   / *8px* /

--space-3: 0.75rem;  / *12px* /

--space-4: 1rem;     / *16px* /

--space-5: 1.25rem;  / *20px* /

--space-6: 1.5rem;   / *24px* /

--space-8: 2rem;     / *32px* /

--space-10: 2.5rem;  / *40px* /

--space-12: 3rem;    / *48px* /

```

### 5.3. Composition Rules

- Cards: Use `space-5` padding, `space-4` internal gaps
- Section spacing: `space-8` between major sections
- Data tables: `space-3` cell padding for density
- Use asymmetric layouts for dashboard — avoid uniform 3-column grids

---

## 6. Component Aesthetics

### 6.1. Cards & Surfaces

```

/ *Elevated Card* /

--card-bg: #ffffff;

--card-border: 1px solid var(--neutral-200);

--card-radius: 12px;

--card-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);

/ *Hover State* /

--card-shadow-hover: 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06);

```

### 6.2. KPI Score Display

KPI achievement scores are the hero element of this application:

```

/ *Score Circle* /

.kpi-score {

width: 120px;

height: 120px;

border-radius: 50%;

background: conic-gradient(

var(--rating-color) calc(var(--score) * 3.6deg),

var(--neutral-200) 0

);

display: flex;

align-items: center;

justify-content: center;

}

.kpi-score-value {

font-family: 'JetBrains Mono', monospace;

font-size: var(--text-3xl);

font-weight: 700;

}

```

### 6.3. Data Tables

```

/ *Table Header* /

--table-header-bg: var(--neutral-50);

--table-header-text: var(--neutral-700);

--table-header-weight: 600;

/ *Table Row* /

--table-row-hover: var(--primary-50);

--table-border: var(--neutral-200);

/ *Zebra Striping - Subtle* /

--table-row-alt: var(--neutral-50);

```

---

## 7. Motion & Interaction

### 7.1. Timing Functions

```

--ease-out: cubic-bezier(0.16, 1, 0.3, 1);

--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

--duration-fast: 150ms;

--duration-normal: 250ms;

--duration-slow: 400ms;

```

### 7.2. Key Animations

| Element | Trigger | Animation |
|---------|---------|-----------|
| Page load | Mount | Stagger cards fade-in + slide-up (50ms delay each) |
| KPI Score | View | Count-up animation from 0 to value |
| Progress Ring | View | Stroke-dasharray animation clockwise |
| Cards | Hover | Subtle lift (translateY -2px) + shadow increase |
| Buttons | Click | Scale down (0.97) then release |

### 7.3. Animation Code

```

@keyframes fadeInUp {

from {

opacity: 0;

transform: translateY(12px);

}

to {

opacity: 1;

transform: translateY(0);

}

}

.card {

animation: fadeInUp var(--duration-normal) var(--ease-out) forwards;

}

.card:nth-child(1) { animation-delay: 0ms; }

.card:nth-child(2) { animation-delay: 50ms; }

.card:nth-child(3) { animation-delay: 100ms; }

```

---

## 8. Iconography

### 8.1. Icon Library

Use **Lucide Icons** for consistency:
- Style: Outline (1.5px stroke)
- Size: 20px default, 16px compact, 24px prominent

### 8.2. KPI-Specific Icons

| Concept | Icon |
|---------|------|
| My KPI | `target` |
| Team KPI | `users` |
| KPI Library | `library` |
| KPI Tree | `git-branch` |
| Headquarter | `building-2` |
| Achievement | `trophy` |
| Progress | `trending-up` |
| Pending | `clock` |
| Approved | `check-circle` |

---

## 9. Responsive Behavior

### 9.1. Breakpoints

| Name | Width | Behavior |
|------|-------|----------|
| Desktop | ≥1280px | Full sidebar + multi-column layout |
| Tablet | 768-1279px | Collapsible sidebar + reduced columns |
| Mobile | <768px | Bottom navigation + single column stack |

### 9.2. Responsive Rules

- KPI cards: 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
- Data tables: Horizontal scroll on mobile with sticky first column
- Navigation: Sidebar (desktop) → Hamburger menu (tablet) → Bottom tabs (mobile)
- Score circles: Reduce from 120px to 80px on mobile

---

## 10. Accessibility Requirements

- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text
- Focus states: 2px solid `primary-500` outline with 2px offset
- Touch targets: Minimum 44x44px on mobile
- Color-blind safe: Pair rating colors with icons/patterns
- Screen reader: Include `aria-label` for all KPI scores

---

## 11. File References

Before designing each module, read these specification files:

| File | Purpose |
|------|---------|
| `Product_[Charter.md](http://Charter.md)` | Product vision and user personas |
| `Data_[Model.md](http://Model.md)` | Entity relationships and field definitions |
| `Design_[Tokens.md](http://Tokens.md)` | Complete token reference |
| `Shell_[Spec.md](http://Spec.md)` | Navigation and layout structure |
| `{Module}_-_Section_[Spec.md](http://Spec.md)` | Functional requirements per module |
| `{Module}_-_Sample_[Data.md](http://Data.md)` | Realistic data for mockups |
| `{Module}_-_Screen_[Design.md](http://Design.md)` | Wireframes and component placement |

---

## 12. Quality Checklist

Before completing any screen:

- [ ] Typography uses Plus Jakarta Sans / DM Sans (not Inter/Roboto)
- [ ] Colors use defined tokens (no hardcoded hex values)
- [ ] KPI scores use rating color scale correctly
- [ ] Cards have proper elevation and hover states
- [ ] Page load includes staggered animation
- [ ] Responsive variants exist for all breakpoints
- [ ] Accessibility requirements are met
- [ ] Design feels intentional — not generic AI output
```