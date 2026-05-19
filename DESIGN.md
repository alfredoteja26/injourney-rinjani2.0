# Rinjani Integrated DESIGN.md

This file is the local visual contract for Codex Image-to-Code and UI implementation in the active integrated Rinjani 2.0 app. It complements `AGENTS.md` and summarizes the rules Codex should apply before touching screens.

## Source of Truth

- Blueprint: `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM_BLUEPRINT.md`
- Runtime tokens: `packages/shared-ui/src/theme.css`
- Human-readable design system: `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM.md`
- Component taxonomy: `docs/design-system-overhaul-2026-04-07/COMPONENT_LIBRARY.md`
- Shared UI exports: `packages/shared-ui/src/index.ts`
- Shell ownership: `docs/integrated-product-architecture/SHELL_OWNERSHIP.md`
- Route tree: `docs/integrated-product-architecture/INTEGRATED_SITEMAP.md`

When this file and a deeper repo document disagree, follow the deeper design-system or architecture doc.

## Product Direction

Rinjani Integrated is an internal InJourney Human Capital prototype across Portal, Talent, and Performance. It should feel like an executive-grade human-capital operating system: calm, authoritative, warm, service-oriented, and operationally dense.

The work is enhancement and standardization, not generic redesign. Rinjani Talent remains the strongest visual and interaction baseline.

## Visual System

- Use Tailwind CSS v4 and semantic tokens from `packages/shared-ui/src/theme.css`.
- Use Plus Jakarta Sans as the product UI font.
- Use JetBrains Mono for technical values, codes, IDs, and dense numeric metadata.
- Use deep institutional teal for shell and primary authority.
- Use warm orange for attention and hospitality accent.
- Use green for progress, growth, approval, and positive status.
- Use red only for destructive, negative, rejected, or critical states.
- Keep white workspace surfaces and restrained borders/elevation.
- Do not introduce serif UI typography unless a future design-system decision explicitly approves it.

## Layout

- Preserve integrated shell ownership: `apps/rinjani/` and `packages/shell/` own the host shell.
- Package-level screens must not render duplicate sidebar/header chrome.
- Use hash routes intentionally, for example `/#/talent` and `/#/performance/my-kpi`.
- Screens should use stable operational regions: page header, summary, filters, main work surface, details panel, and action footer when needed.
- Tables, scorecards, talent grids, profile detail views, and KPI workflows should be dense but scannable.
- Do not convert table-driven or workflow-driven screens into marketing-style card grids.

## Components

- Prefer `@rinjani/shared-ui` primitives and patterns before one-off styling.
- Use Radix primitives and Lucide icons through existing repo conventions.
- Use semantic Tailwind classes such as `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-muted`, `text-success`, and `text-warning`.
- Avoid `text-[#...]`, `bg-[#...]`, `border-[#...]`, arbitrary radius, and inline styles in feature modules.
- Add or change design-system docs before changing design rules, component taxonomy, or runtime tokens.

## Image-to-Code Workflow

1. Read `AGENTS.md`, this file, and the relevant source-of-truth docs above.
2. Identify the target platform area: Portal, Talent, Performance, shared shell, or shared UI.
3. Analyze the reference image for intent: layout, regions, components, typography, density, tokens, states, and data patterns.
4. Map the image to current routes, package boundaries, shared primitives, and token roles before coding.
5. Implement the smallest coherent surface using repo-native components and semantic tokens.
6. Run browser verification or Playwright screenshot checks for meaningful visual changes.
7. Report files changed, checks run, visual gaps, and any intentional deviations.

## Interaction States

Operational screens should cover the states users naturally expect:

- selected platform, tab, filter, row, or profile
- hover, focus, active, disabled
- loading skeletons matched to layout geometry
- empty and no-result states
- inline error and validation states
- success, warning, destructive, pending, approved, and rejected states

Use motion only where it clarifies hierarchy or state. Respect reduced-motion preferences.

## Language and Data

- Product UI defaults to formal Bahasa Indonesia.
- Keep established product terms such as KPI, KAI, EQS, Talent, Performance, Dashboard, Output, Impact, Weight, Score, Achievement, and Review where already used.
- Use existing fixture/domain stores and shared types. Do not create parallel mock-data sources when a canonical fixture exists.

## Anti-Slop Rules

- No Stitch or Stage assumptions for repo-native implementation.
- No duplicate shell chrome in package screens.
- No raw hex colors when semantic tokens exist.
- No generic AI-dashboard purple/blue gradients, glassmorphism, or decorative orbs.
- No nested card soup.
- No unreadable labels, buttons, badges, charts, table text, or mobile layouts.
- No external UI library or DESIGN.md directory template copied directly into product code.
