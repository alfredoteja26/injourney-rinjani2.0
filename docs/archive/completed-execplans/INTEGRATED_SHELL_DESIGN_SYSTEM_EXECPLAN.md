# Unify The Integrated Rinjani Design System

This ExecPlan is a living document. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` up to date as work proceeds.

## Purpose / Big Picture

Rinjani already runs as one integrated prototype, but it still feels like three stitched products. The most visible failure is shell duplication: Talent routes can render a second sidebar/header inside the host shell, and the integrated host shell does not yet follow the Talent design system that the product team wants to standardize on.

After this phase, a reviewer should be able to start the integrated app, sign in once, and move across Portal, Talent, and Performance using one consistent Talent-derived shell. Talent routes should live under `/talent/*`, only one sidebar/header should be visible at a time, and the shared shell styling should use semantic tokens rather than hardcoded host colors.

## Context and Orientation

- Source snapshots live in:
  - `Rinjaniportal/`
  - `Rinjanitalent/`
  - `Rinjaniperformance20/`
- The integrated workspace lives in `integrated-rinjani/`.
- The copied source packages that the integrated app uses live in:
  - `integrated-rinjani/packages/portal/`
  - `integrated-rinjani/packages/talent/`
  - `integrated-rinjani/packages/performance/`
- Current host app and shell entry points:
  - `integrated-rinjani/apps/rinjani/src/routes.tsx`
  - `integrated-rinjani/packages/shell/src/app-shell.tsx`
  - `integrated-rinjani/apps/rinjani/src/manifests.ts`
- Talent shell and token references:
  - `integrated-rinjani/packages/talent/src/components/shell/Layout.tsx`
  - `integrated-rinjani/packages/talent/src/components/shell/AdminLayout.tsx`
  - `integrated-rinjani/packages/talent/src/components/shell/RinjaniSidebar.tsx`
  - `integrated-rinjani/packages/talent/src/components/shell/RinjaniHeader.tsx`
  - `integrated-rinjani/packages/talent/src/styles/globals.css`
  - `integrated-rinjani/packages/talent/src/guidelines/Rinjani Talent (INJ-BPR)/Product Artifacts/Design Tokens.md`
  - `integrated-rinjani/packages/talent/src/guidelines/Rinjani Talent (INJ-BPR)/Product Artifacts/Shell Spec.md`
- Key constraints discovered during planning:
  - The host shell currently hardcodes teal backgrounds instead of consuming semantic tokens.
  - Talent layout bridging only intercepts alias-based imports like `@/components/shell/Layout`.
  - Many Talent screens import `Layout` and `AdminLayout` through relative paths, which bypasses the bridge and re-render Talent’s native shell inside the host shell.
  - Talent routes are still mounted mostly at root-style paths such as `/career-aspiration`, `/idp`, and `/explore`, which conflicts with the approved `/talent/*` normalization target.
  - Portal hash navigation compatibility still matters, so the integrated app should keep the hash router.

## Scope and Approach

This implementation will:
- promote Talent’s light-mode token model into the shared design-system layer
- rebuild the host shell so it follows Talent shell structure and interaction patterns
- enforce one visible shell at a time by making the host shell the only shell owner
- normalize Talent entry and deep-link routes into `/talent/*`
- update module manifests and active-nav logic to match the normalized Talent subtree
- visually align Portal and Performance page chrome to the Talent-derived shell and token system
- produce updated documentation for design-system ownership, route normalization, and integrated sitemap behavior

This implementation will not:
- redesign backend/API boundaries
- rewrite every package-local screen into new shared components
- implement dark mode as a supported runtime feature in this phase
- mutate the original prototype folders outside `integrated-rinjani`

## Milestones

### Milestone 1

Install the shared design-system foundation. This means extending shared type contracts, moving Talent token semantics into the shared layer, and updating the integrated app stylesheet to consume those tokens as the canonical light theme.

Validation:
- Shared token/types compile.
- The host app stylesheet no longer depends on host-only hardcoded shell colors for the main shell surfaces.

### Milestone 2

Rebuild the integrated shell around Talent shell behavior. The result should be a header-level platform switcher, a current-platform-only sidebar, and Talent-style typography/spacing/interaction states across the shared frame.

Validation:
- One global shell renders after login.
- Platform switcher lives in the header.
- Sidebar shows only current-platform modules.

### Milestone 3

Normalize Talent into `/talent/*` and remove duplicate shell rendering at the source. The result should be Talent content pages running inside the host shell only, regardless of whether the original screen imported `Layout` via alias or relative path.

Validation:
- Talent entry and deep routes resolve under `/talent/*`.
- No Talent route renders a second sidebar or header.
- Existing Talent screen content remains functional inside the host shell.

### Milestone 4

Align Portal and Performance page chrome to the shared system and update docs. The result should be a visually consistent integrated product, plus an updated route normalization map and integrated sitemap documentation.

Validation:
- Portal and Performance pages visually match the shared shell language.
- `npm run build` succeeds.
- Manual checks confirm shell consistency and route behavior.

## Validation

- `npm run build`
- `npm run dev --workspace @rinjani/app -- --host 127.0.0.1`
- Manual checks:
  - login -> Portal dashboard in the unified shell
  - header platform switcher changes platforms without showing duplicate sidebars
  - Talent routes render under `/talent/*`
  - a Talent page that previously showed a duplicate sidebar now shows only the host shell
  - Performance routes still render in the unified shell without reintroducing their own shell
  - admin-only modules remain role-gated
  - Portal, Talent, and Performance page chrome all follow the shared light theme

## Progress

- [x] Re-reviewed the integrated workspace, Talent shell implementation, and Talent design-token documentation.
- [x] Confirmed the duplicate-sidebar bug source: relative `Layout` / `AdminLayout` imports inside Talent bypass the current bridge.
- [x] Confirmed the host shell still uses hardcoded colors and all-platform sidebar grouping that conflict with the approved shell model.
- [x] Extended shared types and shared design-system primitives for canonical shell metadata and tokens.
- [x] Rebuilt the host shell around Talent’s header/sidebar patterns.
- [x] Normalized Talent routes under `/talent/*` and removed duplicate shell rendering from relative layout imports.
- [x] Aligned the host shell and Performance route wrappers to the shared light theme.
- [x] Added documentation for shell ownership, Talent route normalization, design audit status, and the integrated sitemap.
- [x] Rebuilt the app successfully after the design-system, auth, and Portal context fixes.
- [x] Verified in-browser that `/#/talent` renders one host shell with one Talent sidebar and that the header platform switcher moves to Performance while the sidebar changes to Performance modules.

## Surprises & Discoveries

- The copied Portal, Talent, and Performance folders include their own `package.json` files, but the package names are not workspace-safe. The root workspace therefore still includes only the host and shared packages as workspaces.
- Hash routing remains the safest choice because some Portal widgets still navigate via `window.location.hash`.
- The current Talent bridge is only partial. Alias-based imports are intercepted, but many screens use relative imports such as `../../components/shell/Layout`, which bypass the bridge entirely and render a nested Talent shell.
- Talent’s `globals.css` already contains a usable semantic token layer for the light theme, including sidebar-specific tokens. The host shell simply is not consuming it yet.
- The current integrated manifest model treats Talent as a platform, but many Talent routes still live at root-level paths. This mismatch affects active-nav logic, platform awareness, and shell correctness at the same time.
- Removing package-level `globals.css` imports from the host app solved token conflicts, but it also exposed how many copied screens still depend on legacy alias variables such as `--color-text-heading`, `--color-success`, and the nine-box palette. The shared theme now carries those aliases as a compatibility bridge.
- The session restore flow had a real auth bug: `RequireAuth` redirected before `SessionProvider` rehydrated `localStorage`, so deep links and hard refreshes always fell back to `/login`. Synchronous session bootstrap was required to make route persistence behave correctly.
- The browser verification also exposed a Portal integration bug unrelated to the Talent shell refactor: the integrated dashboard was rendering `Frame` without `OnboardingProvider`, which caused repeated onboarding-context errors in the console.
- Live Talent home verification revealed a final group of root-level reminder/action links that still pointed to legacy Talent paths, even after the main route-tree normalization was finished.

## Decision Log

- Decision: Use copied source snapshots inside `integrated-rinjani/packages/*` instead of importing directly from the original folders.
  Rationale: This keeps the original three repos untouched while still allowing integration-specific patches.
  Date/Author: 2026-04-02 / Codex

- Decision: Use a hash router in the integrated app.
  Rationale: Portal shared widgets still navigate with `window.location.hash`, and hash routing preserves those flows while supporting one SPA.
  Date/Author: 2026-04-02 / Codex

- Decision: Reverse the earlier compatibility-first Talent path choice and normalize Talent under `/talent/*`.
  Rationale: The design-system phase needs platform-aware routing, current-platform-only navigation, and a single shell model. Keeping Talent at root-level paths would continue to blur shell ownership and active-nav behavior.
  Date/Author: 2026-04-02 / Codex

- Decision: Treat Talent as the canonical shell and token baseline for the integrated product.
  Rationale: The product direction explicitly identifies Talent as the most correct shell and design-system implementation. Rebuilding the host shell around Talent is cleaner than retheming the previous host shell.
  Date/Author: 2026-04-02 / Codex

- Decision: Implement a hybrid two-level navigation model with only one visible sidebar.
  Rationale: Platform switching belongs in the header, while the left sidebar should show only the active platform’s modules. This removes the current duplication and keeps cross-platform navigation clear.
  Date/Author: 2026-04-02 / Codex

- Decision: Keep legacy token aliases inside the shared theme during this phase.
  Rationale: The copied Portal, Talent, and Performance screens still reference older variable names. Preserving those aliases in one shared theme avoids reintroducing conflicting package globals while keeping the integrated UI visually stable.
  Date/Author: 2026-04-02 / Codex

- Decision: Restore session state synchronously from `localStorage`.
  Rationale: Deep links and reloads on protected routes must not bounce to `/login` when a valid local session already exists.
  Date/Author: 2026-04-02 / Codex

- Decision: Re-wrap the integrated Portal dashboard with `OnboardingProvider`.
  Rationale: The copied Portal dashboard frame relies on onboarding context; keeping that provider preserves prototype behavior and removes avoidable runtime errors.
  Date/Author: 2026-04-02 / Codex

## Outcomes & Retrospective

What landed in this phase:
- The integrated app now uses a Talent-derived shared shell with one visible sidebar and a header-owned platform switcher.
- Shared shell/token metadata was added to the shared type contracts.
- A shared theme contract now defines the canonical light-theme tokens and compatibility aliases consumed by Portal, Talent, and Performance.
- Talent now mounts under `/talent/*` with legacy redirects preserved for compatibility.
- Talent `Layout` and `AdminLayout` now become content wrappers when rendered inside the integrated host, eliminating the duplicate-sidebar bug at the source instead of only via import alias interception.
- Performance route wrappers were aligned to the shared card/container language.
- Portal dashboard context parity was restored by reintroducing `OnboardingProvider` in the integrated route layer.
- Session bootstrap now survives reloads and deep links on authenticated routes.

Validation completed:
- `npm run build` succeeds from `integrated-rinjani/`.
- Browser verification reached the live app through the mock Microsoft login flow.
- `/#/talent` was verified to render one host shell with one Talent sidebar.
- The header platform switcher was verified to move from Talent to Performance, and the left navigation changed to Performance modules instead of rendering a second shell.

Residual follow-up items outside the core shell goal:
- The build still emits a large-bundle warning; code-splitting remains a follow-up optimization.
- The integrated UI still contains copied page-level styles that are visually closer to their source prototypes than to fully normalized shared components.
- The browser console still reports a missing `favicon.ico`; that is cosmetic and not part of this phase.
