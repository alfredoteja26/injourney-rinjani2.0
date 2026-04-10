# Performance 2.0 (`@performance-v2`)

React module for the Rinjani app, driven by **DIP-1–7** reference datasets under `docs/design-input-packs/performance/exports/`. **Do not import** runtime code from `packages/performance` (v1).

## App wiring

- Vite alias: `@performance-v2` → `packages/performance-v2/src` (see `apps/rinjani/vite.config.ts`).
- Routes: parallel tree under `/performance-v2/*` in `apps/rinjani/src/routes.tsx`.
- Shell: platform **Performance 2.0** and modules in `apps/rinjani/src/manifests.ts`.

## Codebase patterns reused

| Concern | Location |
|--------|----------|
| Session / role | `PerformanceV2Provider` receives `userRole` + optional `actingAsEmployeeNumber`; layout resolves NIK from email in `apps/rinjani/src/performance-pages-v2.tsx`. |
| Manifests / sidebar | `performance-v2` platform; modul memakai `routePath` prefix (mis. `/performance-v2/my-team-kpi`) agar sub-rute seperti `…/member/:id` tetap memetakan platform benar; `defaultChildRoute` untuk target klik sidebar (didukung `@rinjani/shell`). |
| UI primitives | `@rinjani/shared-ui` (Card, Table, Button, PageHeading, Tabs, …). |
| HR master | `import type { Employee, Position, … } from "@talent/types/talent"`; fixtures in `src/lib/fixtures/talent-master.ts`. |

## Layout

- `src/lib/domain` — DIP-aligned TypeScript types.
- `src/lib/hr` — DIP `employeeNumber` ↔ Talent `nik` mapping.
- `src/lib/fixtures` — joined KPI + Talent master data.
- `src/lib/store` — `PerformanceV2Provider`, in-memory reducer, audit log.
- `src/modules/*` — feature screens.
- `src/ui` — small shared widgets (badges, audit panel, persona bar).

## Traceability

See `docs/plans/performance-v2-dip-traceability.md`.
