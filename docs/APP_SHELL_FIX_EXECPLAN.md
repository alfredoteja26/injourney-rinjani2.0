# Fix Integrated App Shell Review Findings

This ExecPlan is a living document. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` up to date as work proceeds.

## Purpose / Big Picture

The integrated Rinjani prototype needs its global shell to feel like one joined product frame across Portal, Talent, Performance, and the Design System page. After this change, reviewers should see a seamless teal sidebar/navbar, a readable logo in expanded and collapsed states, unclipped sidebar profile and collapse controls, a readable demo role switcher, and a centered global command menu that can search modules, people, and policies.

## Context and Orientation

The canonical runtime shell lives in `packages/shell/src/app-shell.tsx`. The source design guidance is `docs/design-system-overhaul-2026-04-07/APP_SHELL_GUIDELINES.md` and `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM.md`. Shell ownership is documented in `docs/integrated-product-architecture/SHELL_OWNERSHIP.md`: package pages must not render their own app chrome inside the integrated host.

The current search panel in the shell is static. Shared command menu primitives already exist in `packages/shared-ui/src/command-menu.tsx`, and shared select primitives exist in `packages/shared-ui/src/select.tsx`. App routing and shell props are wired in `apps/rinjani/src/routes.tsx`. Sidebar modules are sourced from `apps/rinjani/src/manifests.ts`. Search data for people and policies will be seeded from existing prototype examples in the Portal search and HC Digi Policy code.

## Scope and Approach

The change will stay inside the integrated shell and app wiring:

- Add non-breaking shared search item types in `packages/shared-types/src/index.ts`.
- Extend `AppShell` with optional `globalSearchItems`.
- Update shell layout, logo treatment, popover layering, role switcher, and command menu behavior in `packages/shell/src/app-shell.tsx`.
- Add `apps/rinjani/src/search-data.ts` with prototype people and policy search items.
- Pass the search data from `apps/rinjani/src/routes.tsx`.
- Follow-up polish from screenshot review: make the sidebar scrollbar visually quiet, compose the expanded logo from a cropped mark plus separate text, remove the redundant topbar profile access, and replace the orange/single kawung treatment with repeated low-opacity red kawung pattern layers.
- Follow-up polish from user review: shorten the topbar search area by adding a greeting block, show the demo user's name/title instead of email/role in the sidebar footer, and use the same Dimas avatar asset as the Portal shell.
- Cross-module shell QA follow-up: normalize the shell-owned workspace corner so page backgrounds cannot erase the top-left curve, and make the gray kawung overlay use explicit colors instead of relying on Tailwind opacity utilities that may not be emitted.

No route restructuring, policy detail deep-linking, or new image asset generation is in scope.

## Milestones

### Milestone 1

Add the shared search data contract and app-level search seed data. Validation: TypeScript can import the new type and `routes.tsx` can pass the data into the shell.

### Milestone 2

Update the shell UI and interactions. Validation: the shell compiles with the command menu, role switcher, logo states, and unclipped popover/collapse button.

### Milestone 3

Run the production build and record any failures. Validation: `npm run build` completes or any blocker is documented.

## Validation

Run `npm run build`. Manually review `/#/`, `/#/talent`, `/#/performance/my-kpi`, and `/#/design-system` as Admin, checking expanded/collapsed logo states, the teal seam, collapse button visibility, sidebar profile popover visibility, readable role switcher, centered searchable command menu, and Admin/User route filtering.

## Progress

- [x] Read relevant shell, design-system, routing, shared UI, and search source files.
- [x] Created this ExecPlan before implementation edits.
- [x] Add shared search types and app search data.
- [x] Update shell UI and command menu behavior.
- [x] Run build validation.
- [x] Apply screenshot follow-up polish for sidebar scrollbar, logo composition, topbar profile redundancy, and red kawung background pattern.
- [x] Add topbar greeting, shorten search bar, and align sidebar profile content/avatar to the Portal demo user.
- [x] Audit why the workspace corner and kawung overlay were still inconsistent.
- [x] Patch the canonical shell frame to clip child page backgrounds and make the kawung overlay color explicit.

## Surprises & Discoveries

- The worktree already had many modified and untracked files before this implementation, including shell and app files. The implementation must preserve those changes and patch current file contents only.
- The repo has no standalone cropped Rinjani symbol asset. The collapsed logo will use CSS cropping against `rinjani-logo-transparent.png`.
- The default `npm` shim fails on this machine because `C:\Users\PC\AppData\Roaming\npm\node_modules\npm\bin\npm-cli.js` is missing. The direct `C:\Program Files\nodejs\npm.cmd` path works and was used for validation.
- The expanded logo also benefits from CSS cropping the existing bitmap: using the mark from the bitmap and rendering the wordmark as live text gives more control over text size and spacing without adding a new asset.
- The first red kawung pass was not visible enough because it depended on the external SVG's baked-in red stroke color plus opacity/blend mode. The asset path compiled, but the tile is thin stroked artwork and red-on-teal lost contrast. The more reliable implementation is to use the SVG as a mask and paint that mask with a low-opacity gray shell-controlled color.
- The Portal shell uses `7e7006a4927bcec25694136f88b3db870eacf73b.png` as Dimas's avatar. The integrated shell can reference that file with `new URL(..., import.meta.url)` instead of importing `figma:asset`.
- The inconsistent workspace curve is a shell-frame clipping issue, not a Survey-only issue. The shell frame had `rounded-tl-[28px]`, but because it did not hide descendant overflow, page-level `bg-background` wrappers could paint square corners over the rounded parent in some modules.
- The kawung overlay was technically wired to the SVG mask asset, but the gray color was expressed as Tailwind classes with non-standard opacity steps (`/18` and `/12`). If those classes are not emitted, the mask has no painted color and becomes invisible. Explicit inline RGBA colors are more reliable for this decorative layer.

## Decision Log

- Decision: Use CSS cropping for the collapsed sidebar mark instead of creating a new image asset.
  Rationale: This matches the user's assumption and avoids introducing a brand asset that has not been approved.
  Date/Author: 2026-04-07 / Codex

- Decision: Use shared UI command menu and select primitives in the shell.
  Rationale: They already exist in `@rinjani/shared-ui` and match the design-system component direction better than native controls.
  Date/Author: 2026-04-07 / Codex

- Decision: Remove the topbar profile button and keep profile access only in the sidebar footer.
  Rationale: The screenshot review identified duplicate profile access, and the shell already has a sidebar-anchored profile menu.
  Date/Author: 2026-04-07 / Codex

- Decision: Make the shell content frame clip descendants and use one `rounded-tl-[32px]` radius at the shell boundary.
  Rationale: The top-left curve is a shell signature and should not depend on each module's first child background or local page radius.
  Date/Author: 2026-04-07 / Codex

- Decision: Paint the kawung mask with inline low-opacity gray RGBA colors.
  Rationale: This avoids Tailwind opacity-generation gaps and keeps the pattern color controlled by the shell while still using the approved kawung tile shape.
  Date/Author: 2026-04-07 / Codex

## Outcomes & Retrospective

Implemented the shell fixes and search wiring. `& 'C:\Program Files\nodejs\npm.cmd' run build` completed successfully on 2026-04-07. Vite still reports the existing large chunk warning after minification.
