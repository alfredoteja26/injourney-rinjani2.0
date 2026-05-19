# Rinjani Integrated Agent Rules

This is the active implementation workspace for the integrated Rinjani 2.0 prototype.

@RTK.md

## 1. Commands

Run from `/Users/alfredoteja/Documents/Rinjani 2.0 Prototype/integrated-rinjani`.

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- App tests: `npm run test --workspace @rinjani/app`
- Direct app dev: `npm run dev --workspace @rinjani/app`

No root lint or typecheck script is currently declared. Use the closest app/workspace command and report gaps.

When shelling, prefer `rtk` wrappers where available. Repo hooks may deny raw Bash commands that have an `rtk` equivalent.

## 2. Project Stack

- Product: integrated InJourney Human Capital prototype.
- App: React 18, React Router 7, Vite 6, TypeScript 5.
- Styling: Tailwind CSS 4 with runtime tokens in shared UI.
- UI primitives: Radix UI, Lucide icons, shared `@rinjani/shared-ui`.
- Package manager: npm workspaces.

## 3. Repository Map

- `apps/rinjani/`: integrated app entry, route composition, login/session bootstrap.
- `packages/shell/`: integrated host shell.
- `packages/shared-ui/`: shared theme and reusable UI exports.
- `packages/shared-types/`: shared contracts.
- `packages/{portal,talent,performance,performance-v2}/`: integration-owned source snapshots imported by Vite aliases.
- `docs/integrated-product-architecture/`: route, navigation, and shell ownership rules.
- `docs/design-system-overhaul-2026-04-07/`: canonical design-system docs.
- `docs/design-input-packs/`: Notion/DIP export references.

## 4. Source of Truth

- Product and architecture overview: `README.md`.
- Current docs index: `docs/README.md`.
- Shell ownership: `docs/integrated-product-architecture/SHELL_OWNERSHIP.md`.
- Sitemap and route tree: `docs/integrated-product-architecture/INTEGRATED_SITEMAP.md`.
- Talent normalization: `docs/integrated-product-architecture/TALENT_ROUTE_NORMALIZATION.md`.
- Design system: `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM.md`.
- Component taxonomy: `docs/design-system-overhaul-2026-04-07/COMPONENT_LIBRARY.md`.
- Runtime tokens: `packages/shared-ui/src/theme.css`.

## 5. Repo-Specific Patterns

- The integrated app owns shell, route composition, login/session bootstrap, and platform switching.
- Talent routes live under `/talent/*`; keep legacy redirects compatible while cleanup continues.
- Use hash routes intentionally, such as `/#/talent` and `/#/performance/my-kpi`.
- Copied module packages are integration-owned source trees, not independently managed workspace packages.
- Performance v2 lives in `packages/performance-v2/` and uses its own domain store, fixture layer, and shared UI primitives.

## 6. UI Rules

- Source precedence for repo-native UI work:
  1. `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM_BLUEPRINT.md`
  2. `packages/shared-ui/src/theme.css`
  3. `DESIGN_SYSTEM.md` and `COMPONENT_LIBRARY.md`
  4. `@rinjani/shared-ui` primitives and patterns
  5. InJourney brand book as rationale only
- `.stitch/` files support Stage prompt work only; do not treat them as implementation authority.
- Use semantic Tailwind classes such as `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`, and `bg-muted`.
- Avoid ad hoc `text-[#...]`, `bg-[#...]`, and `border-[#...]` in app and package feature modules.
- Package-level screens should not render duplicate app chrome inside the integrated shell.

## 7. Testing and Verification

Before reporting completion, run the closest relevant checks:

- Build: `npm run build`
- App tests: `npm run test --workspace @rinjani/app`
- Visual QA: run `npm run dev` and inspect affected hash routes when UI changes are meaningful.

If a check cannot run, state why and what fallback was used.

## 8. Git and PR Workflow

- Keep shell/navigation changes separate from module-page changes when possible.
- Document affected area: Portal, Talent, Performance, shared shell, shared UI, or docs.
- PR notes should include user-visible behavior, validation, known gaps, and docs updated.

## 9. Boundaries

Always:

- Preserve integrated shell ownership unless the task explicitly changes it.
- Update design-system docs before changing design rules, component taxonomy, or runtime tokens.

Ask first:

- New dependencies.
- Changing route ownership or top-level navigation.
- Moving standalone prototype assumptions into integrated app architecture.
- Backend, auth, deployment, permissions, or secrets changes.

Never:

- Make `.stitch/` the repo-native implementation authority.
- Add duplicate sidebar/header chrome to package-level screens.
- Use raw hex colors in feature modules when semantic tokens exist.

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
