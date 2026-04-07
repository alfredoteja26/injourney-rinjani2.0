# Rinjani 2.0 Design System Blueprint

This blueprint captures the design-system direction, product-designer interview decisions, repo audit findings, and external best-practice references for the Rinjani Integrated prototype. It is the human-readable planning source that should be reviewed before updating `.stitch/DESIGN.md`, `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM.md`, or `docs/design-system-overhaul-2026-04-07/COMPONENT_LIBRARY.md`.

## 1. Blueprint Role

This document is not the final component API and not the Google Stitch / Google Stage prompt source. It is the decision blueprint that connects product intent, design-system strategy, and future implementation work.

Use this blueprint to derive:

- `.stitch/DESIGN.md` for Stitch/Stage-compatible AI generation.
- `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM.md` for the canonical human-readable foundation for this workstream.
- `docs/design-system-overhaul-2026-04-07/COMPONENT_LIBRARY.md` for component taxonomy, usage options, and migration strategy.
- A future `/#/design-system` preview route for designers, engineers, and internal stakeholders.

## 2. Interview Decisions

Baseline:

- Rinjani Talent remains the visual and interaction baseline.
- The work is enhancement and standardization, not a redesign.
- The product is an internal InJourney tailored application and prototype, not a public multi-tenant design system.
- The system should optimize for Rinjani Integrated needs only: Portal, Talent, and Performance.

Documentation sequence:

- Create this blueprint first.
- Review and conclude interview decisions before updating `.stitch/DESIGN.md`.
- Derive human-readable `DESIGN_SYSTEM.md` and `COMPONENT_LIBRARY.md` before updating `.stitch/DESIGN.md`.
- Derive `.stitch/DESIGN.md` after the human-readable docs are accepted.
- Write final design-system documentation in English only.

Component scope:

- Common UI primitives and categories should be planned now.
- Domain components are parking-lot items for a later phase.
- KPI cards, 9-box cells, employee profile variants, IDP badges, job application cards, talent review cards, and performance-specific components should be documented as future candidates only.
- The future base component library should start from a clean shared implementation, using Talent as the strongest visual and interaction reference rather than copying package-local components directly.

Governance:

- New pages, screens, components, and front-end outputs should follow the design-system governance.
- Hardcoded hex values, arbitrary radius/shadow classes, and inline styles should be exceptions, not normal implementation.
- Overrides are allowed only when explicitly requested or when a legacy/generated surface is being preserved.

Preview:

- The design-system library should eventually be exposed inside the app.
- A route such as `/#/design-system` can be added as a visible menu item for admin users only.
- The page should permanently stay admin-only and should not be available to normal users.
- The page should support product designers, engineers, and authorized internal stakeholders who need to preview system patterns.

Docs organization:

- Create an active docs index.
- Archive completed historical ExecPlans so the current work is easy to identify.
- Preserve historical documents instead of deleting them.
- Living artifacts should live in purpose-specific folders, such as the dated `design-system-overhaul-2026-04-07` session folder.
- Completed or historical documents that are no longer active working references should move into `docs/archive/`.

## 3. External Reference Synthesis

Design Systems Surf:

- Use a staged workflow: define, create, adopt, evolve.
- Categorize components by functional purpose so teams can reason about options, not just file names.
- Typography must be a system of rules, hierarchy, and behavior, not only a list of text styles.
- A component library should start with essential categories such as Actions, Feedback, Inputs, Navigation, and Status Indicators.

Figma variables and design-token references:

- Variables/tokens should encode decisions as reusable names rather than local one-off values.
- Token naming should distinguish raw values from semantic purpose.
- Figma variables are useful when the same value needs to stay synchronized across design and implementation.
- The Rinjani system should preserve the code source of truth while keeping a naming model that can map cleanly to Figma variables later.

The Design System Guide:

- Tokens should reduce hardcoded values and make the system consistent across files.
- Good names should be short, meaningful, easy to understand, modular, and consistent.
- Primitive/global tokens, alias/semantic tokens, and component-specific tokens solve different problems.
- Naming should be workshopped for the actual product context instead of copied blindly from another design system.

Josh Cusick's token and primitive guidance:

- Use layers: global primitives, theme/semantic tokens, and component tokens.
- Keep primitive palettes small enough to understand.
- Foreground, background, and outline tokens should be designed together to preserve contrast.
- Border-radius can stay simple with a small set of theme tokens.
- Shadow tokens are composite and should not be recreated ad hoc across components.
- Space tokens should be stable because too much theming of spacing can break layouts.
- Font tokens should start with essentials: family, size, line height, and weight.
- A design system should do less at the core: provide the smallest useful primitives and patterns, then let product-specific domains build on them later.

InJourney brand book:

- Treat the corporate brand book as a reasoning layer, not an automatic token override.
- Preserve the Hero archetype balance: ambition and excellence must be paired with care, trust, responsibility, and protection.
- Warm and cool brand color logic supports the current Rinjani direction: warm orange/red for warmth and attention, cool teal/green for trust, comfort, and growth.
- Inter is the corporate typeface reference, but it does not automatically replace the Talent-derived Plus Jakarta Sans product baseline.
- Millionaire Script is decorative collateral typography and should not be used in operational product UI.
- Supergraphics and collateral layout systems should not be applied to dense dashboards without product-designer confirmation.

## 4. Rinjani Design-System Principle

Rinjani should feel like an executive-grade internal human-capital operating system:

- Calm and authoritative, not generic SaaS.
- Warm and service-oriented, not cold enterprise software.
- Dense enough for HR operations, but still scannable.
- Formal Indonesian by default.
- Consistent shell ownership: the global app shell is not recreated by pages.
- Component standardization should reduce prototype drift without blocking product exploration.

Design direction remains:

- Deep institutional teal shell.
- White workspace surfaces.
- Warm orange as attention and hospitality accent.
- Green for progress, growth, approval, and positive status.
- Red for destructive or negative state only.
- Plus Jakarta Sans as the default UI typeface.
- JetBrains Mono for technical values, code-like metadata, and high-density numeric contexts.

Recommendation:

- Do not keep Georgia as a default or recommended enterprise UI token.
- Recommended direction: use Plus Jakarta Sans more deliberately for display moments through weight, size, tracking, and line-height rules before adding another family.
- Keep JetBrains Mono for technical values, code-like metadata, and high-density numeric contexts.
- Do not introduce a serif family in this phase.
- If an expressive accent is still needed later, evaluate it as a controlled optional display token, not as a default UI token.
- Do not add any replacement accent typeface until the designer approves the need and usage boundary.

## 5. Token Architecture

The future token model should use three layers.

### Primitive Tokens

Primitive tokens represent raw design choices. They should not be used directly in most components.

Recommended naming pattern:

```text
color.teal.600
color.orange.500
color.green.500
color.red.600
color.slate.900
space.4
radius.2
shadow.1
font.size.300
```

Rinjani primitive defaults:

- Teal family centered around `#006573`.
- Orange family centered around `#F47C20`.
- Green family centered around `#90BC40`.
- Red family centered around `#BC2419` and alert red variants.
- Neutral family based on `#101828`, `#475467`, `#EAECF0`, `#F2F4F7`, and `#FFFFFF`.
- Space scale based on 4px increments.
- Radius scale focused on 4px, 6px, 8px, 12px, and full.
- Shadow scale focused on restrained low-elevation surfaces.

### Semantic Tokens

Semantic tokens describe purpose and should be the normal layer for product UI.

Recommended naming pattern:

```text
color.background.canvas
color.background.surface
color.background.muted
color.foreground.primary
color.foreground.secondary
color.foreground.inverse
color.action.primary.background
color.action.primary.foreground
color.status.success.background
color.status.warning.foreground
color.outline.default
color.outline.focus
space.section
radius.control
radius.card
shadow.card
```

Rinjani semantic defaults:

- Canvas: white or quiet workspace background.
- Surface: card and popover white.
- Muted: low-emphasis background.
- Primary action: authority teal.
- Attention action: warm orange.
- Success: growth green.
- Destructive: critical red.
- Outline default: soft divider gray.
- Focus: authority teal or shell focus green depending on context.

### Component Tokens

Component tokens should exist only when a component needs a stable reusable contract beyond semantic defaults.

Recommended naming pattern:

```text
button.primary.background.default
button.primary.background.hover
button.primary.foreground.default
button.radius
badge.status.success.background
input.border.default
input.border.focus
card.shadow.default
shell.sidebar.background
```

Rules:

- Do not create component tokens for every possible class.
- Start with high-frequency components only: Button, Badge, Input, Card, Dialog/Sheet, Progress, Table, Tabs.
- Component tokens should point to semantic tokens whenever possible.
- Domain components should not get core tokens yet unless they are promoted into the shared library later.

## 6. Functional Component Taxonomy

Component documentation should organize by utility and user intent.

### Actions

Use for movement, decisions, commands, and workflow transitions.

Examples:

- Button
- Icon button
- Link action
- Menu item
- Command palette item
- Filter chip when it changes a result set
- Step movement controls such as Next, Back, Submit, Approve, Reject, Save Draft

Pattern options:

- Inline action row for normal page actions.
- Sticky footer action bar for long forms and approvals.
- Dropdown action menu for secondary or bulk actions.
- Command action for search-driven navigation.

### Feedback

Use for messages about what happened, what is happening, or what needs attention.

Examples:

- Alert
- Toast
- Banner
- Inline validation message
- Confirmation dialog
- Empty-state guidance
- Error panel

Pattern options:

- Inline feedback for field or section issues.
- Banner for page-level status.
- Toast for non-blocking confirmation.
- Modal confirmation for destructive or high-impact actions.

### Inputs

Use for collecting or changing user data.

Examples:

- Text input
- Textarea
- Select or combobox-like select
- Checkbox
- Radio group
- Switch
- OTP input
- Date input
- Search input

Pattern options:

- Single-column forms for clarity and mobile safety.
- Two-column forms for short desktop metadata.
- Inline edit for low-risk fields.
- Modal form for short scoped edits.
- Right-side panel for contextual editing while preserving list context.

### Navigation

Use for orientation, movement between modules, and information hierarchy.

Examples:

- Integrated shell sidebar
- Header platform switcher
- Tabs
- Breadcrumbs
- Pagination
- Back link
- Search/command

Pattern options:

- Sidebar for platform module navigation.
- Header switcher for Portal, Talent, and Performance.
- Tabs for sibling views inside one module.
- Breadcrumbs for nested admin and detail pages.
- Pagination for large tables.

### Status Indicators

Use for state, progress, availability, and readiness.

Examples:

- Badge
- Status label
- Progress bar
- Loading skeleton
- Empty state
- Error state
- Completion marker

Pattern options:

- Badge for compact categorical state.
- Progress bar for target completion.
- Skeleton for known loading layout.
- Empty state with recovery action.
- Error state with next step.

### Data Display

Use for structured information and comparison.

Examples:

- Card
- Table
- List
- Description list
- Detail panel
- Profile summary
- Metadata row
- Accordion

Pattern options:

- Table for dense comparable records.
- Card grid for dashboard summaries.
- Description list for object details.
- Right-side detail panel for inspect-with-context flows.
- Accordion for secondary supporting information.

### Analytics

Use for measurable progress, trend, scoring, and comparison.

Examples:

- Metric card
- Chart
- Score card
- KPI summary
- Ranking list
- Progress cluster

Pattern options:

- Metric card for a single important number and context.
- Chart when trend or comparison matters.
- Ranking list when sequence matters more than exact plotting.
- Progress cluster when related completion states need to be scanned together.

### Shell

Use for the persistent integrated product frame.

Examples:

- App shell
- Sidebar
- Header
- Platform switcher
- Global search
- Notification trigger
- Profile trigger
- Role switcher

Rules:

- Full shell is owned by the integrated app.
- Stitch/Stage in-app screens should usually be content-only.
- Module pages must not generate duplicate sidebars or duplicate top-level headers.

### Prototype Patterns

Use for documenting implementation options that AI and designers can choose from.

Examples:

- Employee brief profile as inline card, modal, right-side panel, popover, or full detail page.
- KPI detail as table row expansion, side panel, modal, or full page.
- Approval task as compact card, timeline, modal confirmation, or sticky workflow.

Guidance:

- Inline card: use when the information belongs in the page scan.
- Modal: use when the task is short and interruptive.
- Right-side panel: use when users need context from the list or page behind it.
- Popover: use when information is small, non-critical, and dismissible.
- Full detail page: use when the content is complex, shareable, or part of navigation history.

## 7. Component Library Strategy

Build less at the core.

Core library v1 should focus on:

- Button and action patterns.
- Badge and status indicator patterns.
- Input and form field primitives.
- Card and surface patterns.
- Dialog, sheet, and panel patterns.
- Table and data display patterns.
- Tabs and navigation patterns.
- Progress and loading states.

Do not include domain components in v1 core.

Domain components stay as parking lot until the next phase:

- KPI card, KPI list item, KPI detail panel, KPI progress bar, KPI tree node.
- 9-box cell, talent classification badge, talent pool candidate card, EQS score display.
- Employee profile summary, profile popover, profile side panel, profile detail view.
- IDP badge, IDP activity card, IDP timeline, IDP progress pattern.
- Job tender position card, application card, application timeline.
- Talent review card, committee decision card, recommendation card, proposal history card.

Future migration strategy:

- Establish canonical common components in `packages/shared-ui`.
- Build the canonical base components from a clean shared implementation.
- Use Talent as the strongest visual and interaction reference while designing the clean shared components.
- Review Portal and Performance variants only to avoid losing useful behavior, accessibility handling, or edge cases.
- Migrate new work first, then high-touch existing screens.
- Treat generated/Figma import surfaces as legacy unless they are actively being converted.

## 8. Style Governance

Default rule:

- All new pages, screens, components, and front-end outputs should use system tokens and shared component patterns.

Avoid:

- New hardcoded hex values.
- New inline styles for visual styling.
- New arbitrary radius values unless a token does not exist and the design decision is documented.
- New arbitrary box-shadow values.
- New module-local shell patterns.
- New duplicated base UI primitives inside Portal, Talent, or Performance.

Allowed exceptions:

- Legacy generated/Figma imports that are not part of the current refactor.
- Temporary prototype-only work if explicitly requested.
- One-off values that are converted into tokens or documented before promotion.

Governance recommendation:

- Add a design-system review checklist before migrating components.
- When introducing a visual value, ask whether it is primitive, semantic, component-specific, or a one-off exception.
- New shared components should include default, hover, focus, disabled, loading, error, and empty states when applicable.

## 9. Documentation Architecture

Current active docs:

- `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM_OVERHAUL_EXECPLAN.md`
- `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM_BLUEPRINT.md`
- `docs/design-system-overhaul-2026-04-07/DESIGN_CONSISTENCY_AUDIT.md`
- `docs/integrated-product-architecture/INTEGRATED_SITEMAP.md`
- `docs/integrated-product-architecture/SHELL_OWNERSHIP.md`
- `docs/integrated-product-architecture/TALENT_ROUTE_NORMALIZATION.md`

Planned design-system docs:

- `.stitch/DESIGN.md`: concise AI-generation source for Stitch/Stage.
- `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM.md`: canonical human-readable design-system foundation for this workstream.
- `docs/design-system-overhaul-2026-04-07/COMPONENT_LIBRARY.md`: component categories, pattern options, and migration guidance for this workstream.
- Final docs should be written in English only.

Historical docs:

- Completed historical ExecPlans should live under `docs/archive/completed-execplans/`.
- Historical docs should not be deleted because they explain why earlier decisions were made.
- Historical non-ExecPlan docs may also be archived once they are no longer active living references.

Recommended docs workflow:

- Keep `docs/README.md` as the active documentation index.
- Keep one current ExecPlan per active initiative.
- Archive completed ExecPlans after the implementation and retrospective are complete.
- Group active living documents by purpose and date when a workstream is expected to be revisited.

## 10. Future Design-System Preview

The design-system preview should be visible inside the app because it will help product designers, engineers, and internal stakeholders understand what is available.

Recommended route:

- `/#/design-system`

Recommended access:

- Add as an admin-visible menu item.
- Keep the route admin-only permanently; normal users should not be able to access it.

Recommended content:

- Foundation: color, typography, spacing, radius, elevation.
- Actions: button variants and command/action patterns.
- Inputs: field states and form examples.
- Feedback: alerts, banners, toasts, confirmation examples.
- Navigation: tabs, breadcrumbs, pagination, shell examples.
- Status Indicators: badge, progress, skeleton, empty state, error state.
- Data Display: cards, table, list, detail panel.
- Analytics: metric card, chart placeholder, progress cluster.
- Prototype Patterns: inline card, modal, right-side panel, popover, full detail page.
- Domain parking lot: clearly marked future candidates only.

## 11. Open Decisions For Final Design-System Docs

These decisions should be finalized before editing `.stitch/DESIGN.md`:

- Serif usage is deferred. No serif family is approved for this phase; rely on Plus Jakarta Sans and JetBrains Mono as documented in `DESIGN_SYSTEM.md`.
- The exact archive boundary for older non-ExecPlan references should be revisited after final docs exist; living references should stay in purpose-specific folders, while historical references can move to `docs/archive/`.

## 12. Immediate Next Step

Review this blueprint first. After it is accepted:

1. Review `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM.md`.
2. Review `docs/design-system-overhaul-2026-04-07/COMPONENT_LIBRARY.md`.
3. Update `.stitch/DESIGN.md` with concise Stitch/Stage-compatible rules after the human-readable docs are accepted.
4. Plan the `/#/design-system` preview route as a later implementation phase.
