# Design System Canonical Reference Map

This document captures the X-ray result for design-system source routing in the Rinjani workspace. Its purpose is to remove ambiguity about which document or file should be consulted for each workflow.

## Finding Summary

The repository does not have one universal design-system source for every use case. It has two routes:

- a **repo-native implementation route** for coding and shared-system maintenance
- a **Stage prompt route** for `Cursor -> Google Stage`

The confusion came from treating these two routes as if they should collapse into one file tree.

## Route 1: Repo-Native Implementation

Use this route when an agent is editing code, tokens, shared components, or implementation-facing design rules in the repository.

Order:

1. `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM_BLUEPRINT.md`
Purpose: product decisions, unresolved design-direction choices, and governance intent.

2. `packages/shared-ui/src/theme.css`
Purpose: runtime token authority and semantic class contract.

3. `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM.md`
Purpose: human-readable foundation rules such as typography, color semantics, spacing, radius, layout, and interaction guardrails.

4. `docs/design-system-overhaul-2026-04-07/COMPONENT_LIBRARY.md`
Purpose: component taxonomy, usage guidance, implementation status, and component-level examples.

5. `packages/shared-ui/src/*`
Purpose: current shared implementation of approved primitives and patterns.

6. `.stitch/DESIGN.md`
Purpose: optional condensed generative reference only, not implementation authority.

## Route 2: Stage Prompt Workflow

Use this route when preparing or iterating prompts for Google Stage from Cursor.

Order:

1. `.stitch/DESIGN.md`
Purpose: prompt-facing condensed design brief for Stage.

2. `.stitch/next-prompt.md`
Purpose: reusable prompt scaffold for Stage generation rounds.

3. `.stitch/SITE.md` and other `.stitch/*`
Purpose: supporting generation context and output organization.

The Stage route is valid for prompt work even though it is not the repo-native implementation authority.

## Update Routing

When a task changes one of the following, update these files first:

- Repo-native design rule:
  `DESIGN_SYSTEM.md`

- Repo-native component usage guidance or a new shared component:
  `COMPONENT_LIBRARY.md`

- Runtime token or semantic color/spacing/radius contract:
  `packages/shared-ui/src/theme.css`

- Product-level design decision or unresolved direction:
  `DESIGN_SYSTEM_BLUEPRINT.md`

- Stage prompt brief:
  `.stitch/DESIGN.md`

- Stage prompt scaffold:
  `.stitch/next-prompt.md`

## Guardrail Outcome

After this X-ray:

- `AGENTS.md` now distinguishes repo-native implementation routing from the Stage prompt route.
- The overhaul `README.md` now explains that its canonical status applies to repo-native work, not all `.stitch` workflows.
- `.stitch/next-prompt.md` again points to `.stitch/DESIGN.md` for Stage prompting.
- The latest badge/chip/table guidance remains documented in the repo-native overhaul docs while the `.stitch` flow keeps its own prompt-facing brief.
