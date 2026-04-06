# Create Stitch DESIGN.md For Rinjani Integrated

This ExecPlan is a living document. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` up to date as work proceeds.

## Purpose / Big Picture

Create a `.stitch/DESIGN.md` file for the `integrated-rinjani` workspace so future Google Stitch generations inherit the current integrated product's visual language instead of drifting toward generic dashboards or the older separate prototype shells. After this work, Stitch should have one plain-language design-system source of truth for the integrated Rinjani product.

## Context and Orientation

- Target project: `integrated-rinjani/`
- Desired output: `integrated-rinjani/.stitch/DESIGN.md`
- The user explicitly asked to use the installed Stitch skills. The relevant workflow source is `/Users/alfredoteja/.codex/skills/design-md/SKILL.md`.
- There is no existing local `.stitch/DESIGN.md`.
- The strongest source-of-truth inputs are:
  - `integrated-rinjani/packages/shared-ui/src/theme.css`
  - `integrated-rinjani/packages/talent/src/guidelines/Rinjani Talent (INJ-BPR)/Product Artifacts/Design Tokens.md`
  - `integrated-rinjani/packages/talent/src/guidelines/Rinjani Talent (INJ-BPR)/Product Artifacts/Shell Spec.md`
  - `integrated-rinjani/packages/talent/src/guidelines/Rinjani Talent (INJ-BPR)/Product Artifacts/Product Charter.md`
  - `integrated-rinjani/docs/EXECPLAN.md`
  - `integrated-rinjani/packages/talent/src/guidelines/Rinjani Talent (INJ-BPR)/Sections/home/screen_design.md`
  - `integrated-rinjani/packages/shell/src/app-shell.tsx`
- The integrated app already standardized on a Talent-derived light shell with:
  - one visible shell at a time
  - header-owned platform switching
  - a teal navigation frame
  - white work surfaces with soft borders and low-contrast elevation

## Scope and Approach

This work will synthesize a Stitch-oriented `DESIGN.md` from the local codebase and product artifacts. It will describe atmosphere, palette, typography, component styling, layout principles, and generation rules in natural design language with exact hex values.

This work will not:
- create or sync a live Stitch project
- invent a new design direction that conflicts with the integrated shell
- document every component in the repository

The chosen approach is to prioritize the integrated app's current shared theme over any single legacy package, while still using Talent's design-token and brand-charter documents as the semantic baseline. That keeps the file aligned to the product direction that was already implemented in the integrated workspace.

## Milestones

### Milestone 1

Gather the current visual source of truth from the integrated app shell, shared theme, and Talent design artifacts. Validation is a coherent list of actual colors, type rules, spacing, and shell behavior.

### Milestone 2

Draft the Stitch-facing `DESIGN.md` in plain language with exact values and generation rules. Validation is that the file can be read as a standalone prompt foundation for future Stitch work.

### Milestone 3

Sanity-check the file against the integrated app direction and ensure it does not contain placeholders or unsupported assumptions. Validation is a final review of the created file.

## Validation

- Read the source artifacts listed in `Context and Orientation`.
- Confirm `integrated-rinjani/.stitch/DESIGN.md` exists.
- Re-read the created file and verify it reflects:
  - the shared light theme tokens
  - the Talent-derived shell structure
  - the integrated product rule that navigation chrome is owned by the shell, not page screens

## Progress

- [x] Reviewed the installed `design-md` Stitch skill.
- [x] Identified the integrated app's strongest design-system sources.
- [x] Created `integrated-rinjani/.stitch/DESIGN.md`.
- [x] Re-read the file for consistency with the integrated shell and token system.

## Surprises & Discoveries

- There is no local `.stitch/DESIGN.md` yet, so Stitch currently has no repo-native source of truth for the integrated workspace.
- The integrated app's real canonical theme now lives in `packages/shared-ui/src/theme.css`, not only in the original Talent package.
- Talent's brand language adds important qualitative constraints that do not appear in CSS alone, especially "warm yet majestic", formal Indonesian copy, and restrained premium visual cues.
- The best Stitch-oriented guidance is not the raw token inventory by itself; the integrated shell behavior and the home screen design spec were necessary to encode the "no duplicate shell chrome" rule and the expected dashboard information density.

## Decision Log

- Decision: Base the new `DESIGN.md` on the integrated shared theme plus Talent brand artifacts.
  Rationale: The integrated app already standardized on a Talent-derived shell, but the shared theme is the actual implementation source that future generations need to match.
  Date/Author: 2026-04-05 / Codex

- Decision: Create the output under `.stitch/DESIGN.md`.
  Rationale: That matches the Stitch skill convention and keeps the design-system source adjacent to the project rather than buried in general docs.
  Date/Author: 2026-04-05 / Codex

## Outcomes & Retrospective

Completed:

- Created `integrated-rinjani/.stitch/DESIGN.md` as a Stitch-facing source of truth for the integrated product.
- Grounded the file in the actual integrated implementation (`packages/shared-ui/src/theme.css`, `packages/shell/src/app-shell.tsx`) and in the Talent brand artifacts that define the intended product character.
- Added explicit generation guardrails so future Stitch page generations do not recreate the application shell or drift into generic dashboard styling.

Validation completed:

- Confirmed the file exists at `integrated-rinjani/.stitch/DESIGN.md`.
- Re-read the file after creation and verified that it reflects the integrated teal shell, white work surfaces, Talent-derived typography and token system, and the product's formal Indonesian enterprise tone.

Residual limitation:

- The file is derived from local project artifacts, not from a live Stitch project export, because Stitch MCP is not active in this Codex session.
