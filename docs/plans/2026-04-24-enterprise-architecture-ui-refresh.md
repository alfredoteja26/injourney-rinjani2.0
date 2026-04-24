# Refresh Enterprise Architecture UI

This ExecPlan is a living document. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` up to date as work proceeds.

## Purpose / Big Picture

The Enterprise Architecture page exists today as a working cost model, but its presentation is closer to a raw calculator than an executive-ready Rinjani screen. This update keeps the same OPEX, CAPEX, scenario, entity, and hybrid-rule behavior while making the page easier for stakeholders to scan, explain, and operate during a review.

After the change, a user visiting `/talent/enterprise-architecture` should immediately understand the model scope, see the most important totals, adjust assumptions, and review financial projections in a calmer layout aligned with the Rinjani design system.

## Context and Orientation

The module is routed at `/talent/enterprise-architecture` from `apps/rinjani/src/routes.tsx` and exported through `apps/rinjani/src/talent-pages.tsx`. The implementation file is `packages/talent/src/screens/EnterpriseArchitecture/EnterpriseArchitecturePage.tsx`.

Project guidance in `integrated-rinjani/AGENTS.md` says UI changes should follow the design-system overhaul docs, runtime tokens in `packages/shared-ui/src/theme.css`, and shared UI primitives where possible. The relevant design direction is calm, authoritative, warm internal enterprise software with semantic Tailwind classes instead of ad hoc hardcoded colors.

The working tree already has unrelated modified and untracked files. This plan intentionally scopes changes to the Enterprise Architecture page and this plan document.

## Scope and Approach

This refresh will keep calculations and mock assumptions intact. It will update the visible UI in place by introducing a stronger page header, more useful summary cards, a compact model assumptions band, cleaner tab labels, more disciplined card and table styling, and chart colors based on theme tokens. It will also expose the existing module from the Portal sidebar so admin users can reach the model without switching into the Talent sidebar first.

The chosen path is a single-file page refresh. That keeps risk low because there is no new route, no new data path, and no cross-module design-system contract change. The implementation keeps the page on its existing local Talent UI components and improves composition, spacing, hierarchy, and semantic token usage directly in the page.

## Milestones

### Milestone 1

Create this plan and confirm the current module location, route, design-system constraints, and existing behavior. Validation is reading the route and page implementation before editing.

### Milestone 2

Patch `EnterpriseArchitecturePage.tsx` to improve the first viewport and main calculator flow while preserving state, handlers, data, and calculation formulas. Validation is TypeScript/build feedback plus visual review if a local app can be run.

### Milestone 3

Run the most relevant repository check, preferably `npm run build` from `integrated-rinjani`. If the build is blocked by unrelated existing work, record the failure clearly and isolate whether this page introduced any obvious errors. Confirm the Portal sidebar entry appears under Administration and opens `/talent/enterprise-architecture`.

## Validation

- Run `npm run build` from `integrated-rinjani`.
- If feasible, start the Vite dev server and inspect `/talent/enterprise-architecture` visually.
- Confirm the route remains `/talent/enterprise-architecture`.
- Confirm calculator interactions still update totals: entity strategy select, hybrid category rules, headcount inputs, and conservative/optimistic scenario toggle.

## Progress

- [x] Located Enterprise Architecture route and page implementation.
- [x] Read project-local UI/design-system guidance.
- [x] Created ExecPlan.
- [x] Patch the Enterprise Architecture page UI.
- [x] Run validation.
- [x] Record outcomes.

## Surprises & Discoveries

- The monorepo has many unrelated modified and untracked files before this work begins. This refresh must avoid touching those files.
- The page uses local Talent shadcn-style UI components, while newer Talent pages also consume shared layout primitives from `@rinjani/shared-ui`.
- The default `npm run build` and `npm run dev` commands fail in the current repo because esbuild is asked to transform dependency destructuring for the configured browser target. This appears before any Enterprise Architecture runtime check and also affects Radix/Floating UI dependencies.
- `npm exec vite -- build --target esnext` succeeds from `apps/rinjani`, which validates that the updated app can bundle when that existing target issue is bypassed.
- The built preview at `http://127.0.0.1:4174/#/talent/enterprise-architecture` renders the refreshed route after logging in through the demo sign-in flow.

## Decision Log

- Decision: Refresh the existing cost-model UI in place instead of changing the module concept.
  Rationale: The user confirmed updating the current UI, and the existing model behavior is already functional.
  Date/Author: 2026-04-24 / Codex

- Decision: Keep calculation formulas and default entity data unchanged.
  Rationale: The request is UI-focused; changing financial assumptions would silently alter product meaning.
  Date/Author: 2026-04-24 / Codex

- Decision: Keep local Talent UI primitives instead of importing shared page-layout primitives during this pass.
  Rationale: The page already used local card/table/tab/select primitives and a direct in-place refresh avoided wider package coupling while the monorepo has unrelated in-flight shared-ui changes.
  Date/Author: 2026-04-24 / Codex

## Outcomes & Retrospective

The Enterprise Architecture page now has an executive header, model scope chips, allocation/scenario summary, stronger KPI cards, cleaner tabs, improved table/card framing, and chart colors sourced from runtime theme variables. The OPEX, CAPEX, entity strategy, hybrid rule, and scenario calculations remain unchanged.

Validation results:

- `git diff --check -- packages/talent/src/screens/EnterpriseArchitecture/EnterpriseArchitecturePage.tsx docs/plans/2026-04-24-enterprise-architecture-ui-refresh.md` passed.
- `npm run build` from `integrated-rinjani` failed on the existing esbuild target/destructuring issue.
- `npm exec vite -- build --target esnext` from `apps/rinjani` passed.
- Playwright preview smoke test confirmed the Portal sidebar includes an Administration link for Enterprise Architecture, the link opens `/talent/enterprise-architecture`, the Financial Analysis tab opens, and the conservative/optimistic scenario toggle updates the executive snapshot.
