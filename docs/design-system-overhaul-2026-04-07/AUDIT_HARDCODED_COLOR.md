# Audit: hardcoded color literals (hex) in runtime UI code

**Date:** 2026-04-08  
**Scope:** `packages/**/*.ts`, `packages/**/*.tsx`, `apps/**/*.tsx` (excluding `node_modules`, build outputs).  
**Intent:** Track drift from the single source of truth (`packages/shared-ui/src/theme.css` + overhaul docs). Remediation is to prefer semantic Tailwind tokens (`text-foreground`, `border-border`, `bg-primary`, `text-secondary`, chart tokens where wired, etc.) or central CSS variables.

## Excluded by design (not drift)

| Location | Reason |
|----------|--------|
| `packages/shared-ui/src/theme.css` | Canonical token definitions |
| `packages/talent/src/styles/globals.css` | Package theme variables (should stay aligned with shared-ui over time) |
| `apps/rinjani/src/design-system-page.tsx` | Intentional swatch documentation showing token values |

## Completed in this pass

| Area | Change |
|------|--------|
| `packages/performance-v2` | `my-kpi-planning-hero.tsx`, `kpi-planning-detail-sheet.tsx` — raw hex in `className` replaced with semantic utilities (`border-border`, `text-foreground`, `text-muted-foreground`, `text-primary`, `bg-muted`, `bg-primary`, `text-primary-foreground`, `text-secondary`, `ring-primary/…`). **Grep:** no `#` hex remains under `performance-v2` in `.ts`/`.tsx`. |

## Representative hotspots (prioritize for next refactors)

These files contain hex (or inline chart colors) and are good candidates to map to `theme.css` / shared chart palette:

- `packages/shell/src/app-shell.tsx` — `text-[#53565a]`
- `packages/performance/src/components/performance/shared/PrototypeWorkflowPanel.tsx`, `PrototypePersonaBar.tsx` — prototype chrome `#00858a`
- `packages/talent/src/utils/eqsCalculation.ts` — band colors as inline `backgroundColor`
- `packages/talent/src/screens/IDP/*.tsx` — multiple `#00495d`, `#8BC34A`, badges/buttons
- `packages/talent/src/screens/EnterpriseArchitecture/EnterpriseArchitecturePage.tsx` — Recharts `fill`/`stroke`
- `packages/talent/src/screens/Epic4/TalentReviewPage.tsx` — inline `style` colors
- `packages/talent/src/components/ui/chart.tsx`, `packages/portal/src/components/ui/chart.tsx` — default chart colors

## Large generated / legacy surfaces (backlog)

Many matches live under **`packages/portal/src/imports/**`** and **`packages/performance/src/imports/**`** (Figma-style exports) and assorted portal components. Treat as **bulk migration** or regeneration against tokens rather than one-off edits.

## How to re-run

From repo root (with ripgrep installed):

```bash
rg "#[0-9a-fA-F]{3,8}\\b" packages apps --glob "*.tsx" --glob "*.ts" --glob "*.css" -l
```

Review hits in `theme.css` and docs-only pages separately. For chart libraries (Recharts, etc.), prefer CSS variables (`hsl(var(--chart-1))` or project conventions) once exposed on the chart wrapper.
