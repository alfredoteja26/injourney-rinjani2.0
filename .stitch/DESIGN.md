# Design System: InJourney Rinjani 2.0
**Project ID:** 4201029456809424526

## 1. Visual Theme & Atmosphere

Rinjani 2.0 is an internal InJourney human-capital operating system. It should feel calm, authoritative, precise, and service-oriented: a deep institutional teal product frame supports a bright white operational workspace, with warm orange accents and growth-green status signals to keep the product from feeling cold.

The design is an enhancement of the current Talent-derived Rinjani direction, not a redesign from scratch. The mood should be executive-grade and trustworthy, with enough density for HR operations, KPI review, employee data, and talent workflows. The interface should feel integrated across Portal, Talent, and Performance, not like separate module demos.

The InJourney brand book is a rationale and constraint layer, not an automatic visual override. Use the brand logic of care, trust, responsibility, warmth, and excellence, but do not turn operational screens into corporate collateral layouts. Decorative brand treatments such as supergraphics should be subtle and controlled.

For in-app screens, assume the global shell already exists unless the prompt explicitly asks for a full shell or authentication screen. Do not generate duplicate sidebars or duplicate application headers inside module content.

## 2. Color Palette & Roles

- **Rinjani Authority Teal (`#006573`)**: primary identity color, shell chrome, primary actions, active navigation ownership, focus rings, links, and leading chart series.
- **Warm Journey Orange (`#F47C20`)**: sidebar collapse affordance, warm emphasis, active attention, secondary action emphasis, highlighted chips, and hospitality-driven accent moments. Use this for attention that is not failure.
- **Growth Green (`#90BC40`)**: approvals, success, completion, talent growth, healthy progress, and positive analytics.
- **Critical Action Red (`#BC2419`)**: destructive actions, errors, rejected states, failed workflow states, and critical alerts only.
- **Executive White (`#FFFFFF`)**: main workspace, cards, popovers, dialog surfaces, and high-readability operational areas.
- **Ink Slate (`#101828`)**: primary text, dashboard metric text, headings, and high-contrast labels on white surfaces.
- **Secondary Slate (`#475467`)**: helper text, captions, supporting descriptions, metadata, and low-emphasis labels.
- **Quiet Mist (`#F2F4F7`)**: muted surfaces, inactive zones, empty-state backgrounds, and subtle section backgrounds.
- **Soft Divider Gray (`#EAECF0`)**: card borders, table dividers, panel outlines, and low-contrast separators.
- **Input Gray (`#D0D5DD`)**: input borders and neutral control strokes.
- **Chart Supporting Teal (`#008A94`)**: tertiary chart series and alternate teal accents.
- **Chart Alert Red (`#E63D2E`)**: warning or negative chart series where semantic red is required.
- **Success Green (`#10B981`)**: fine-grained success UI token for compact badges, progress, and positive inline states.
- **Warning Amber (`#F59E0B`)**: warning UI token for caution, pending, or needs-review states without destructive meaning.

Color behavior rules:

- Use teal for trust, structure, product ownership, and primary interaction.
- Use orange for warmth and non-destructive attention.
- Use green for positive movement, completion, approval, and growth.
- Use red only for destructive, rejected, error, or negative meaning.
- Keep content screens mostly white and neutral. Do not flood dashboards with tinted backgrounds.
- Do not use purple as a dominant product color.
- Do not replace these tokens with brand-book colors without product-designer confirmation.

## 3. Typography Rules

Primary UI typeface: **Plus Jakarta Sans**. Use it for headings, body copy, navigation, cards, forms, buttons, badges, tables, and dashboards.

Structured metadata typeface: **JetBrains Mono**. Use it only where monospace improves parsing, such as employee IDs, technical IDs, code-like references, or machine-readable metadata. Do not use monospace for component titles or general dashboard labels.

Serif typography is intentionally deferred. Do not use Georgia as a default UI token. Do not use Millionaire Script or decorative brand-book typefaces in operational product UI. If a future editorial or ceremonial surface needs a serif or display accent, it must be proposed as a separate reviewed token.

Type hierarchy:

- **Display / rare hero statements:** 48px, bold, compact line-height, tight tracking.
- **Page titles:** 30px, bold, clear and compact.
- **Section titles:** 24px, semibold, used for major content groups.
- **Card titles:** 20px, semibold, used for panels and dashboard cards.
- **Body copy:** 16px, regular, 1.5 line-height for readable descriptions.
- **UI default:** 14px, regular to medium, used for tables, controls, navigation labels, and compact descriptions.
- **Captions and metadata:** 12px, regular to medium, used for helper text, compact status, and secondary details.

Typography behavior:

- Use weight, spacing, and hierarchy before introducing another typeface.
- Keep large headings slightly tightened and deliberate.
- Use all-caps sparingly for compact metadata labels, with wider tracking only when it improves scanability.
- Use formal, product-grade Indonesian for generated product UI copy unless the prompt explicitly requests English.
- Keep documentation-oriented copy in English when generating design-system documentation screens.

## 4. Component Stylings

* **Buttons:** Primary buttons use Authority Teal (`#006573`) with white text. Secondary emphasis may use Journey Orange (`#F47C20`) when attention or warmth is needed. Destructive buttons use Critical Action Red (`#BC2419`) only for destructive actions. Buttons should feel compact, reliable, and enterprise-grade, with softly rounded corners and restrained shadows.

* **Action Chips and Badges:** Badges are compact status labels and should remain small. Action chips are larger interactive controls for filters, selected modules, and command options. Do not use Talent-only readiness language such as “Ready now” as a generic global badge example outside Talent-specific context.

* **Cards/Containers:** Cards use white surfaces, Ink Slate text, fine Soft Divider Gray (`#EAECF0`) borders, and whisper-soft diffused shadows. Standard cards should be gently rounded; larger panels, sheets, and dialogs may use more generous rounding. Avoid harsh outlines and heavy floating effects.

* **Inputs/Forms:** Inputs use white backgrounds, Input Gray (`#D0D5DD`) borders, clear visible labels, helper text, error states, and teal focus rings. Use field wrappers for label/helper/error composition. Search inputs should be visually strong enough to read as interactive, especially in the topbar.

* **Tables/Data Display:** Tables should prioritize readability and operational scanning. Use white surfaces, clear headers, soft row dividers, search/filter/sort/pagination states when needed, and column visibility for admin-heavy tables. Data tables should support empty, loading, and error states instead of showing blank surfaces.

* **Analytics:** Metric cards should be compact and avoid wasted whitespace. Bar charts are the current chart foundation: include x-axis labels, y-axis context, hover tooltip, and hover animation. Pie charts and deeper chart variants are deferred.

* **Overlays:** Use dialogs for short focused tasks, alert dialogs for high-impact confirmations, sheets/drawers for right-side inspection or edit workflows, popovers for compact contextual details, tooltips for short helper text, and dropdown menus for secondary contextual actions. Sheets may slide from the right with soft rounding and optional blurred overlay.

* **AppShell:** The shell uses a dark teal sidebar and teal topbar, a white workspace with a rounded top-left corner, a search-first navbar, platform switcher, notifications, help, and profile access. The Rinjani logo must not be recolored; place it on a light or frosted brand plate when used on teal/dark surfaces. Use the approved kawung factor as a small repeated warm tile or controlled silhouette, not as a full noisy wallpaper.

## 5. Layout Principles

The global shell owns navigation, search, platform switching, notifications, help, profile controls, and the persistent product frame. Module screens should render only content regions inside that shell unless a prompt explicitly asks for a standalone layout.

Desktop application screens should use disciplined enterprise density: a clear page header, well-grouped cards, data tables where comparison matters, and two-column dashboard sections where helpful. Use a bright operational workspace with enough spacing for scanability, but avoid excessive whitespace in metric and analytics components.

Spacing follows a 4px base rhythm:

- 8px for tightly related inline items.
- 12px for compact control groups.
- 16px for common card padding and component gaps.
- 24px to 32px for major section separation.
- 48px for large page-level breathing room.

Shape and elevation:

- Compact tags and small chips are lightly rounded.
- Buttons and inputs are softly rounded.
- Cards, popovers, and dropdowns are gently rounded.
- Large panels, sheets, dialogs, and major containers use more generous rounding.
- Avatars and circular icon controls may be fully rounded.
- Shadows should be quiet and diffused. Strongest elevation is reserved for popovers, dropdowns, dialogs, and sheets.

Grid versus flex:

- Use grid for true two-dimensional layouts: page columns, responsive card groups, category layouts, and dashboard arrangements.
- Use vertical flex stacks for title-description-preview blocks where the label and component must stay visually attached.
- Avoid grid auto-row stretching when preview labels should remain close to their component examples.

Browser-ready Stitch output:

- Include `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Do not lock `html` or `body` to fixed `1920px` by `1080px` dimensions.
- Use `min-height: 100dvh`, `width: 100%`, and natural page scroll.
- Use responsive flex/grid behavior and sensible desktop composition density.
- Use `box-sizing: border-box` globally.
- Use `object-fit: cover` for hero imagery with defined minimum heights rather than fixed artboard prison dimensions.
- Respect `prefers-reduced-motion` for decorative motion.

Stitch generation red flags:

- Do not generate duplicated application shells inside module pages.
- Do not create generic gray dashboards without the teal-orange-green semantic system.
- Do not overuse purple, neon gradients, heavy glassmorphism, or consumer-fintech aesthetics.
- Do not over-round every element into playful pills.
- Do not use decorative InJourney brand typography in operational screens.
- Do not use the full master supergraphic as a heavy background in dense product screens.
