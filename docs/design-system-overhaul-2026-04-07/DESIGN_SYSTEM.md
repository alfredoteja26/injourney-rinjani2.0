# Rinjani 2.0 Design System

This document defines the human-readable design-system foundation for the Rinjani Integrated prototype. It is the detailed source for product designers, engineers, and AI-assisted prototyping work. The condensed Stitch/Stage guidance should be derived from this document after review, not the other way around.

## 1. System Role

Rinjani 2.0 is an internal InJourney human-capital product suite. It integrates Portal, Talent, and Performance into one browser-based prototype and should behave like one product, not three stitched-together module demos.

This design system exists to:

- Reduce component, token, and layout drift across Portal, Talent, and Performance.
- Preserve the current Talent-derived visual direction while making it easier to extend.
- Create a clean shared foundation for future component-library work.
- Give Google Stitch/Stage and code implementation the same design language.
- Make future screens easier to review, prototype, and migrate into production-quality shared components.

This is an enhancement and standardization effort. It is not a redesign from scratch.

## 2. Source Hierarchy

Use this order when design inputs conflict:

1. Product decisions captured in `DESIGN_SYSTEM_BLUEPRINT.md`.
2. Existing Rinjani Talent-derived implementation in `packages/shared-ui/src/theme.css` and the integrated shell.
3. This document and `COMPONENT_LIBRARY.md`.
4. InJourney brand book guidance as a rationale and constraint layer.
5. External design-system references used during planning.
6. Legacy Portal, Talent, and Performance local component variants.

The InJourney brand book must inform the reasoning behind the system, but it must not blindly override the current Rinjani product UI. Brand-book changes that would materially alter tokens, typography, layout, or component behavior require product-designer confirmation first.

## 3. Brand Interpretation

The InJourney brand book frames the company around a Hero archetype balanced by care, trust, responsibility, and excellence. It emphasizes unity in diversity, operational excellence, Indonesian hospitality, and a warm-cool palette inspired by Indonesia's natural and cultural landscape.

For Rinjani, this translates into:

- Authority without intimidation.
- Warmth without decorative excess.
- Trust, precision, and care in HR workflows.
- Operational clarity for dense employee, KPI, and talent data.
- A product interface that feels like an internal operating system, not a public marketing artifact.

Brand book guidance that should influence the product:

- Warm and cool colors should work together: teal/green for trust, growth, and comfort; orange/red for warmth and attention.
- The interface should feel trustworthy, sophisticated, dynamic, innovative, caring, and responsible.
- Logo use should preserve contrast, size, and placement rules when brand marks are used.
- Decorative brand treatments should stay outside core operational UI unless explicitly approved.

Brand book guidance that should not be copied directly into product UI without review:

- Collateral-style layouts such as posters, letterheads, social media templates, and stationery grids.
- Millionaire Script or other decorative typography.
- Full corporate brand color application if it reduces dashboard usability or accessibility.
- Heavy supergraphic treatments inside dense operational screens.

## 4. Visual Principle

Rinjani should feel like an executive-grade internal human-capital operating system:

- Calm and authoritative.
- Warm and service-oriented.
- Dense enough for HR operations, but still scannable.
- Precise in data-heavy areas.
- Integrated across Portal, Talent, and Performance.
- Anchored in InJourney brand logic without becoming a corporate collateral layout.

The current direction remains:

- Deep institutional teal shell.
- White workspace surfaces.
- Warm orange for attention and hospitality accent.
- Green for growth, progress, approval, and positive status.
- Red for destructive or negative meaning only.
- Plus Jakarta Sans as the primary UI typeface.
- JetBrains Mono for technical and structured numeric contexts.

## 5. Typography System

Typography is a behavior system, not just a list of font styles.

### Font Families

Primary UI family:

- Plus Jakarta Sans.
- Use for all default product UI, including headings, body copy, tables, forms, buttons, badges, navigation, and dashboard cards.

Numeric and data-heavy UI:

- Plus Jakarta Sans with tabular numeric styling where available.
- Use for KPI values, table numbers, metric summaries, progress percentages, and dashboard values.

Technical or structured metadata:

- JetBrains Mono.
- Use only when monospace improves parsing: IDs, code-like references, technical logs, structured metadata, or dense machine-readable values.

Serif and decorative typography:

- Do not use Georgia as a default or recommended UI token.
- Do not introduce a serif family in this phase.
- Do not use Millionaire Script in operational product UI.
- If an editorial or ceremonial surface later needs an accent typeface, propose a separate controlled display token and review it with the product designer first.

InJourney brand-book note:

- The corporate brand book uses Inter for corporate typography and Millionaire Script for decoration. Rinjani keeps Plus Jakarta Sans because it is already the Talent-derived product UI baseline. Inter remains brand context, not an automatic replacement.

### Type Scale

| Role | Size | Weight | Line Height | Usage |
| --- | ---: | ---: | ---: | --- |
| Display | 48px | 700 | 1.20-1.25 | Rare top-level hero statements or large auth headlines |
| Page title | 30px | 700 | 1.25-1.30 | Module and page titles |
| Section title | 24px | 600 | 1.30-1.35 | Major content sections and dashboard groups |
| Card title | 20px | 600 | 1.40-1.50 | Card headers and panel titles |
| Large body | 18px | 400-500 | 1.50 | Important descriptions or empty states |
| Body | 16px | 400 | 1.50 | Forms, paragraphs, readable interface copy |
| UI default | 14px | 400-500 | 1.40-1.50 | Tables, controls, compact descriptions |
| Caption | 12px | 400-500 | 1.40-1.50 | Helper text, metadata, badge text |

### Typography Rules

- Use tighter tracking for large headings, not decorative font changes.
- Use weight and spacing to create emphasis before adding another typeface.
- Keep table and KPI values readable; do not shrink data to force density.
- Use all-caps sparingly for compact metadata labels, with wider tracking when needed.
- UI copy in final docs is English, but product screens can use formal Indonesian when required by product direction.

## 6. Color System

### Current Core Tokens

| Role | Token | Value | Meaning |
| --- | --- | --- | --- |
| Background | `--background` | `#FFFFFF` | Default canvas and workspace |
| Foreground | `--foreground` | `#101828` | Primary text |
| Card | `--card` | `#FFFFFF` | Card and surface background |
| Primary | `--primary` | `#006573` | Authority teal, primary actions, shell identity |
| Secondary | `--secondary` | `#F47C20` | Warm orange, attention and hospitality accent |
| Accent | `--accent` | `#90BC40` | Growth green, success and progress |
| Destructive | `--destructive` | `#BC2419` | Error, destructive, rejected, negative |
| Muted | `--muted` | `#F2F4F7` | Low-emphasis background |
| Muted foreground | `--muted-foreground` | `#475467` | Secondary text |
| Border | `--border` | `#EAECF0` | Dividers and card outlines |
| Input | `--input` | `#D0D5DD` | Input borders |
| Ring | `--ring` | `#006573` | Focus ring |

### Brand Book Reference Palette

The InJourney brand book includes these relevant brand colors:

| Brand role | Value | Product interpretation |
| --- | --- | --- |
| Brand red | `#EE3E31` | Warm brand energy; do not use as generic destructive without contrast review |
| Brand teal | `#00A199` | Corporate teal; informs trust/comfort but does not replace Rinjani shell teal without approval |
| Brand green | `#82AB40` | Growth and comfort reference |
| Brand orange | `#F49220` | Warm hospitality reference |
| Brand black | `#000000` | Brand mark and high-contrast collateral use |
| Brand off-white | `#F4F4F4` | Neutral collateral background reference |
| Dark teal | `#094A40` | Potential deep brand anchor, not approved as shell replacement |

The current Rinjani palette is close to the brand-book logic but not identical. Keep the current Rinjani tokens unless a future visual review explicitly approves alignment changes.

### Color Behavior

- Teal means authority, structure, product ownership, and primary action.
- Orange means warmth, attention, active emphasis, and non-destructive urgency.
- Green means growth, success, approval, and positive progress.
- Red means destructive, error, rejected, and negative status.
- White and quiet neutral surfaces preserve data readability.

Do not:

- Use purple as a brand-dominant UI color.
- Use red for neutral attention when orange would work.
- Use green for generic decoration when it is not communicating success or progress.
- Flood dashboards with tinted backgrounds that reduce data clarity.
- Replace the current palette with brand-book colors without review.

## 7. Token Architecture

Use a layered token model.

### Primitive Tokens

Primitive tokens describe raw values. They should rarely be used directly in components.

Examples:

```text
color.teal.600
color.orange.500
color.green.500
color.red.600
color.neutral.900
space.4
radius.2
shadow.1
font.size.300
```

### Semantic Tokens

Semantic tokens describe purpose and should be the normal product UI layer.

Examples:

```text
color.background.canvas
color.background.surface
color.foreground.primary
color.foreground.secondary
color.action.primary.background
color.status.success.background
color.status.warning.foreground
color.outline.default
color.outline.focus
radius.control
radius.card
shadow.card
```

### Component Tokens

Component tokens are allowed when a component needs a stable reusable contract.

Examples:

```text
button.primary.background.default
button.primary.background.hover
badge.status.success.background
input.border.focus
card.shadow.default
shell.sidebar.background
```

Rules:

- Do not create component tokens for every class.
- Start with high-frequency components only.
- Component tokens should point to semantic tokens where possible.
- Domain components should not get core tokens until promoted into shared library scope.

## 8. Spacing, Radius, and Elevation

Spacing:

- Use a 4px base scale.
- Use 8px for tightly related items.
- Use 12px for compact control groups.
- Use 16px for card padding and common section gaps.
- Use 24px to 32px for major section spacing.
- Use 48px for large page-level breathing room.

Radius:

- 4px for tags, compact pills, and tiny chips.
- 6px for buttons and inputs.
- 8px for standard cards, popovers, and dropdowns.
- 12px for large panels, sheets, dialogs, and major containers.
- Full radius only for avatars and deliberately circular controls.

Elevation:

- Use quiet shadows with low opacity.
- Standard cards may use a subtle lift.
- Popovers, dropdowns, and dialogs may use stronger elevation.
- Do not create arbitrary shadow recipes in feature code.

## 9. Layout System

The integrated app owns the shell:

- Header.
- Platform switcher.
- Global search.
- Notifications.
- Profile and role controls.
- Current-platform sidebar.

Module pages should be content regions inside that shell.

Default content layout:

- Use a disciplined max-width enterprise frame.
- Use card-based grouping for dashboards and summaries.
- Use tables for dense comparable records.
- Use right-side panels when users need context from the list behind it.
- Collapse to a single-column hierarchy on smaller screens.

Grid versus flex rule:

- Use `grid` for true two-dimensional layout: page scaffolds, responsive columns, equal-width card groups, dashboards, and tables of preview categories.
- Use `flex flex-col` for one-dimensional vertical stacks where each title, description, and component preview must stay tightly paired.
- Do not use auto-row grid stacks for component preview title + component pairs unless equal-height stretching is explicitly desired.
- In multi-column preview pages, set grid parents to `items-start` when columns should keep their natural content height.
- Use a standard preview wrapper with explicit vertical gap for repeated preview blocks. This prevents taller sibling columns from stretching title-to-component spacing.

Stitch/Stage desktop viewport rule:

- Use 1920 x 1080 CSS px as the default desktop frame.
- Use 1440 x 900 only when explicitly requested.
- Do not generate oversized poster-like artboards for app screens.

## 10. Accessibility and Interaction

Minimum rules:

- Every interactive element must have a clear focus state.
- Focus uses teal by default.
- Destructive actions require clear copy and confirmation when irreversible.
- Status colors need text labels; color alone is not enough.
- Disabled states should be visually distinct but still readable.
- Inputs must show label, helper, required/optional, and error behavior when applicable.
- Tables need clear headers and scannable row separation.

Motion:

- Motion should clarify hierarchy or state transition.
- Use restrained transitions for hover, focus, panel entry, toast entry, and modal/sheet reveal.
- Do not use decorative motion that slows operational workflows.

## 11. Governance

Default rule:

- New pages, screens, components, and front-end outputs must use design-system tokens and shared component patterns.

Avoid:

- New hardcoded hex values.
- New inline visual styles.
- New arbitrary radius values.
- New arbitrary box-shadow values.
- New duplicated base components in Portal, Talent, or Performance.
- New module-local shell chrome.

Allowed exceptions:

- Legacy generated/Figma surfaces that are not part of the current migration.
- Explicit prototype overrides requested by the product designer.
- Temporary values that are converted into tokens before promotion.

Review checklist:

- Does this use semantic tokens rather than raw values?
- Does this duplicate an existing base component?
- Does this create a new visual behavior that belongs in the library?
- Does this preserve shell ownership?
- Does this work for dense data and keyboard users?
- Does this align with Talent-derived Rinjani direction?
- Does this avoid blind brand-book token replacement?

## 12. Implementation Strategy

The future component library should be built from a clean shared implementation in `packages/shared-ui`.

Use Talent as the strongest visual and interaction reference, but do not copy Talent components blindly. Review Portal and Performance variants only to preserve useful behavior, accessibility handling, or edge cases.

Recommended order:

1. Stabilize documentation and taxonomy.
2. Create shared base components in `packages/shared-ui`.
3. Create an admin-only design-system preview route.
4. Use the preview route for visual QA.
5. Migrate new work first.
6. Migrate high-touch existing screens after component behavior is stable.
7. Treat generated surfaces as legacy until explicitly converted.

## 13. Open Guardrails

Current decisions:

- No serif family is approved for this phase.
- Georgia should not be recommended for future operational UI.
- Millionaire Script should not be used in operational UI.
- Final docs for this workstream are English-only.
- The design-system preview route is permanently admin-only.

Still requiring future review:

- Whether to align any Rinjani color token more closely to brand-book values.
- Whether a future editorial surface needs a controlled display accent typeface.
- Which domain components graduate from parking lot into shared component scope.
