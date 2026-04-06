# Design System: Rinjani Integrated
**Project Source:** Local `integrated-rinjani` codebase
**Stitch Project Status:** No Stitch project has been created yet for this workspace

## 1. Visual Theme & Atmosphere

Rinjani Integrated should feel like an executive-grade internal operating system for human capital, not a generic SaaS dashboard. The overall mood is calm, authoritative, and service-oriented: a deep institutional teal frame holds a bright white workspace, while warm orange accents and fresh green success cues prevent the product from feeling cold.

The visual character should follow the product charter language of "warm yet majestic." In practice, that means:

- Use a confident and trustworthy navigation shell in deep teal.
- Keep page surfaces bright, quiet, and uncluttered so dense HR information still feels manageable.
- Introduce warmth through selective orange highlights, attention states, and hospitality-driven supporting moments.
- Use green for progress, growth, approval, and positive development signals.
- Preserve a premium, modern Indonesian enterprise tone. The interface should feel polished and important, but never ceremonial or ornamental-heavy.

The design density is medium-high. Screens often contain multiple cards, filters, and data summaries, but the system should still breathe through clear grouping, generous white space between sections, and a strong hierarchy between shell chrome and page content.

The shell is a persistent product frame. Page-level Stitch generations should assume:

- the main application shell already exists
- the header already contains global search, platform switching, notifications, and profile/help actions
- the left sidebar already exists and owns navigation
- individual screens should focus on content regions, cards, tables, charts, forms, and module-specific actions

Do not generate a second sidebar or a second top-level application header inside page screens unless the prompt explicitly asks for a standalone marketing or auth page.

## 2. Color Palette & Roles

### Core surfaces

- Pure Executive White (`#FFFFFF`): the default page canvas, card surfaces, popovers, and primary work areas
- Ink Slate (`#101828`): the main body text color, metric text, and high-contrast headings on white surfaces
- Quiet Mist (`#F2F4F7`): muted backgrounds for subtle sections, disabled zones, inactive pills, and low-emphasis surfaces
- Soft Divider Gray (`#EAECF0`): card borders, panel outlines, table dividers, and structural separators
- Input Gray (`#D0D5DD`): form field borders and neutral control strokes
- Secondary Text Slate (`#475467`): supporting labels, helper text, captions, and less-prominent descriptions

### Brand and interaction colors

- Rinjani Authority Teal (`#006573`): primary actions, shell chrome, active navigation ownership, links, focus identity, hero accents, and primary chart series
- Warm Journey Orange (`#F47C20`): emphasis accents, secondary calls to action, sidebar attention states, highlighted tabs, badges that need attention, and warm interaction moments
- Growth Green (`#90BC40`): success states, completion, approvals, healthy progress, talent growth signals, and positive analytics
- Critical Action Red (`#BC2419`): destructive actions, error states, rejected statuses, critical alerts, and negative performance signals

### Data visualization palette

- Chart Primary Teal (`#006573`): default leading series and main KPI trend
- Chart Growth Green (`#90BC40`): positive comparison or secondary success series
- Chart Attention Orange (`#F47C20`): comparison series that needs emphasis
- Chart Alert Red (`#E63D2E`): warning and negative indicators
- Chart Supporting Teal (`#008A94`): tertiary or alternate teal series

### Shell-specific colors

- Shell Background Teal (`#006573`): the left rail and integrated navigation frame
- Shell Text White (`#FFFFFF`): navigation labels and shell text
- Shell Active Surface White (`#FFFFFF`): active current-page chips or selected shell surfaces when the design needs an inverted active state
- Shell Active Text Teal (`#006573`): text and icons on active white shell surfaces
- Shell Accent Orange (`#F47C20`): hover, selected emphasis, and active highlight moments in the Talent-derived sidebar pattern
- Shell Focus Green (`#90BC40`): keyboard focus and accessibility emphasis in shell contexts

### Color behavior rules

- Prefer teal for trust, structure, and the main call to action.
- Prefer orange for warmth, urgency, hover emphasis, or attention without signaling failure.
- Prefer green for progress, completion, and positive talent outcomes.
- Use red only for destructive or clearly negative meaning.
- Default content surfaces remain white. Do not flood content screens with heavy tinted backgrounds.

## 3. Typography Rules

### Type families

- Primary UI typeface: Plus Jakarta Sans
- Serif accent typeface: Georgia
- Monospace typeface: JetBrains Mono

Plus Jakarta Sans is the default typeface for nearly everything in the application. It should feel modern, approachable, and professional. The tone is enterprise-grade but not rigid.

### Heading system

- Large display headlines: 36px to 48px, bold, tighter tracking, reserved for hero metrics or top-level statements
- Page titles: 30px to 36px, bold, clear and compact, used for module-level titles
- Section headers: 20px to 24px, semibold, used for card groups and major content sections
- Subsection headers: 16px to 18px, semibold, used for card headers, panel titles, and form sections
- Small component titles: 14px to 16px, medium, used for compact list titles, table headers, or support labels

### Body system

- Primary body text: 16px, regular, 1.5 line height for descriptions and explanatory copy
- Default UI body text: 14px, regular, 1.5 line height for form labels, navigation labels, tables, and general interface text
- Small support text: 12px, regular, used for captions, metadata, helper text, and trend context
- Fine-print and tight labels: 11px, regular, used for small badges and compact metadata

### Metric styling

- Large KPI values: 24px to 32px, bold, high contrast
- Secondary metrics: 18px to 24px, semibold
- Small inline stats: 12px to 14px, medium

### Tracking and tone

- Default body tracking is slightly tightened rather than neutral
- Large headings should feel compact and deliberate, not airy
- All-caps labels may use slightly wider tracking for category chips and metadata

### Copy and language behavior

- Use formal Indonesian for product copy unless a prompt explicitly requests English
- Address users with "Anda", not casual second-person language
- Tone should be direct, respectful, and action-oriented
- Avoid passive or vague labels; interface copy should encourage clear next steps

## 4. Component Stylings

### Buttons

- Primary buttons use Authority Teal (`#006573`) with white text
- Secondary or warm-emphasis buttons may use Journey Orange (`#F47C20`) with white text
- Button corners are softly rounded rather than pill-like: typically 6px radius
- Standard button weight is medium
- Primary and secondary buttons may carry a light, low-contrast shadow, but they should still feel restrained and businesslike
- Outline buttons use transparent or white backgrounds with a soft gray border and dark text

Buttons should feel reliable and crisp, not playful or inflated. Keep vertical padding compact and business-oriented.

### Cards and containers

- Standard cards use white backgrounds with Ink Slate text
- Border treatment is subtle: a fine soft-gray edge rather than heavy outlines
- Standard cards use 8px corner radius
- Large summary containers and modal-like surfaces may expand to 12px corner radius
- Card shadows are soft and diffused, never harsh. The visual effect should be a quiet lift from the page rather than a floating neon panel.
- Typical card padding is 16px, with 24px to 32px reserved for larger sections

Cards are the dominant information pattern. Stitch generations should prefer card-based grids for dashboards, summaries, and module overviews.

### Inputs and forms

- Inputs use white or card-like backgrounds with dark text
- Border color is Input Gray (`#D0D5DD`) by default
- Focus uses teal ring behavior to make interaction obvious without feeling aggressive
- Input corners are softly rounded at about 6px
- Placeholder text uses Secondary Text Slate (`#475467`) or a lighter muted equivalent
- Form layouts should use consistent vertical spacing and clear section grouping

### Sidebar and shell navigation

- The shell uses a saturated teal navigation background with white text
- Active navigation states can appear in one of two approved patterns:
  - white active chip with teal text for a strong selected state
  - orange-tinted emphasis state for attention and active module highlights in Talent-derived navigation
- Sidebar groups should be separated by subtle spacing and low-contrast dividers, not heavy borders
- Sidebar interactions should feel premium and calm; use soft hover states and restrained shadows

### Header and global controls

- The integrated header uses teal with translucent white overlays for search and action buttons
- Search fields in the header should feel embedded into the shell, not detached cards
- Platform switching, notifications, and help/profile actions use compact square or rounded-square icon buttons with subtle glass-like white overlays

### Tables, metrics, and analytics

- Tables should stay on white surfaces with soft separators
- KPI cards should emphasize one dominant number, one concise label, and one small supporting trend or explanation
- Charts should default to teal, then green, then orange, then red according to semantic meaning
- Avoid over-decorated chart treatments; the product should feel precise and operational

## 5. Layout Principles

### Shell ownership

- The application shell owns the global frame: sidebar, header, platform switcher, search, notifications, and user controls
- Module screens should not regenerate that shell
- Individual Stitch screens should be composed as content regions within the shell

### Page composition

- Default pattern: card-based layouts inside a white workspace
- Common dashboard rhythm: one or two dominant cards at the top, followed by balanced two-column or mixed-width content sections
- On desktop, a two-column grid is preferred for paired summary cards
- On mobile, collapse to a single column without changing the information hierarchy

### Width and spacing

- Content should feel centered and disciplined, similar to a `max-w-7xl` enterprise dashboard frame
- Use a 4px spacing base
- Common useful spacing steps:
  - 8px for tight related items
  - 12px for small form and control gaps
  - 16px for card padding and compact section spacing
  - 24px to 32px for major section separation
  - 48px for page-level breathing room

### Shape system

- Small tags and compact pills: 4px radius
- Buttons and inputs: 6px radius
- Standard cards and dropdowns: 8px radius
- Large containers and modal shells: 12px radius
- Circular avatars and icon chips may use fully rounded shapes

### Elevation

- Default depth is soft and quiet
- Standard cards and panels use low-opacity shadows with small vertical offset
- Sticky headers or elevated summary bars can step up one level, but the interface should never feel like stacked floating glass everywhere
- Reserve the strongest elevation only for popovers, dropdowns, and urgent overlays

### Information-density rules

- This is a high-value enterprise product, so information density is allowed
- Density must come from structured grouping, not from shrinking everything
- Prefer clear sections, labeled cards, and obvious action zones over raw wall-of-data presentations
- Use whitespace to separate responsibilities: status, analysis, action, and supporting context

## 6. Stitch Generation Rules

- Generate integrated HR product screens, not generic startup dashboards
- Keep the visual language consistent with a teal shell, white content surfaces, orange warmth, and green success
- Prefer card-based content composition with precise labels and restrained shadows
- Assume the shell already exists unless the prompt explicitly asks for a full-shell mock
- Use formal Indonesian UI copy by default
- For dashboard screens, prioritize quick comprehension in under 30 seconds
- For talent-management screens, balance operational precision with a hospitable tone
- When in doubt, choose enterprise clarity over novelty

## 7. Visual Red Flags To Avoid

- Do not use purple as the dominant brand color
- Do not use oversized glassmorphism, neon gradients, or consumer-fintech styling
- Do not generate duplicated sidebars, duplicated headers, or nested application shells
- Do not use generic monochrome gray dashboards without the teal-orange-green semantic system
- Do not over-round everything into soft consumer pills
- Do not make the interface feel playful, whimsical, or startup-casual
