# Design System Overhaul Session - 2026-04-07

This folder contains the active planning and blueprint documents for the Rinjani 2.0 design-system overhaul session that started on 2026-04-07.

## Active Files

- `DESIGN_SYSTEM_OVERHAUL_EXECPLAN.md`: living execution plan for the overhaul.
- `DESIGN_SYSTEM_BLUEPRINT.md`: comprehensive blueprint capturing interview decisions, token strategy, component taxonomy, governance, and next-step documentation strategy.
- `DESIGN_CONSISTENCY_AUDIT.md`: current consistency audit carried into this design-system session as reference evidence.
- `DESIGN_SYSTEM.md`: English-only human-readable foundation for the Rinjani 2.0 design system.
- `COMPONENT_LIBRARY.md`: English-only component taxonomy, usage patterns, and future library backlog.
- `APP_SHELL_REDESIGN_PLAN.md`: focused implementation plan for restoring the Talent-derived shell visual direction.
- `APP_SHELL_GUIDELINES.md`: AppShell specifications, usage rules, brand asset guidance, and validation checklist.
- `DESIGN_SYSTEM_CLEANUP_PLAN.md`: cleanup and migration plan for removing token/component/documentation residue safely.
- `CANONICAL_REFERENCE_MAP.md`: explicit routing map for which design-system file is authoritative for each kind of task.

## Canonical Routing

This folder defines the canonical route for **repo-native implementation work**:

1. `DESIGN_SYSTEM_BLUEPRINT.md` for product decisions and unresolved design-direction choices.
2. `packages/shared-ui/src/theme.css` for runtime token truth.
3. `DESIGN_SYSTEM.md` for the human-readable system rules.
4. `COMPONENT_LIBRARY.md` for shared component usage, taxonomy, and API-level guidance.

This route applies to agents editing code, shared components, or runtime design rules in the repository.

Separate from that, the `.stitch/` folder supports the `Cursor -> Google Stage` prompt workflow. In that workflow, `.stitch/DESIGN.md` remains the prompt-facing brief and is not invalid just because it is not the repo-native implementation authority.

## Status

Current phase: wrap-up cleanup audit plus parallel AppShell/design enhancement work. `.stitch/DESIGN.md` remains non-canonical for repo-native implementation work, but still valid for the dedicated Stage prompt workflow.

Next outputs planned after documentation confirmation:

- Validate the AppShell implementation in `packages/shell/src/app-shell.tsx`
- Execute cleanup only after distinguishing legacy-but-active files from removable residue
- Foundation-tab expansion in `/#/design-system`
- `.stitch/DESIGN.md` updates after human docs and shell direction are accepted
