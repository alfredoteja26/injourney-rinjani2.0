# Document The Integrated Repository

This ExecPlan is a living document. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` up to date as work proceeds.

## Purpose / Big Picture

The newly published GitHub repository needs a root-level README that explains what Rinjani Integrated is, how the workspace is structured, how to run it locally, and what constraints a new contributor should understand before making changes. Without this document, the repo looks like a generic Vite monorepo and hides the product story: this is an integration workspace that combines Portal, Talent, and Performance into one prototype shell.

After this work, someone landing on the repository should be able to understand the product scope, the module boundaries, the current navigation model, the setup steps, and the limitations of the prototype without having to reverse-engineer the codebase.

## Context and Orientation

- The repository root is `integrated-rinjani/`.
- At planning time there was no root `README.md`, so this work adds the first repository landing document.
- The primary architectural references are:
  - `package.json`
  - `apps/rinjani/package.json`
  - `apps/rinjani/src/routes.tsx`
  - `apps/rinjani/src/manifests.ts`
  - `apps/rinjani/src/session.tsx`
  - `docs/EXECPLAN.md`
  - `docs/INTEGRATED_SITEMAP.md`
  - `docs/SHELL_OWNERSHIP.md`
- Supporting package-specific context also exists in:
  - `packages/talent/README.md`
  - `packages/portal/src/components/onboarding/README.md`
- Important repository facts gathered during orientation:
  - The root workspace only declares `apps/rinjani`, `packages/shared-types`, `packages/shared-ui`, and `packages/shell` as npm workspaces.
  - The integrated app also consumes copied source snapshots in `packages/portal`, `packages/talent`, and `packages/performance`.
  - The app uses `createHashRouter`, not browser history routing.
  - Authentication is currently a local mock session flow persisted to `localStorage`.
  - Navigation is organized as one shared shell with a header-owned platform switcher and a current-platform-only sidebar.

## Scope and Approach

This work will:
- create a root `README.md` aimed at GitHub readers and new contributors
- explain the repository as an integrated prototype, not as a production-ready backend system
- document architecture, package ownership, route model, setup, and known prototype behaviors
- link to deeper docs already present in `docs/`

This work will not:
- change runtime behavior
- add screenshots or generated diagrams
- rewrite package-level documentation

The chosen approach is to synthesize one comprehensive root README from the existing source-of-truth docs and live code entry points, rather than producing a short marketing summary. That keeps the document useful for product stakeholders and implementers.

## Milestones

### Milestone 1

Collect the product and architecture facts from the integrated app entry points and docs so the README reflects the current repository rather than the original standalone source repos.

Validation:
- Core product scope, route ownership, auth model, and workspace structure are documented in notes or the plan.

### Milestone 2

Write the root `README.md` with clear sections for overview, architecture, repo structure, local development, navigation, and current limitations.

Validation:
- The README stands on its own and links to deeper docs where appropriate.
- The setup instructions match the scripts and package layout actually present in the repo.

### Milestone 3

Review the markdown for completeness and consistency, then verify the repository status so the deliverable is easy to commit.

Validation:
- The markdown files exist and are readable.
- `git status --short` shows only the intended documentation changes plus any already-known local artifacts.

## Validation

- Read back the created `README.md`
- Read back the created `docs/REPOSITORY_README_EXECPLAN.md`
- `git status --short`

## Progress

- [x] Reviewed the global ExecPlan rules and confirmed this documentation task is non-trivial enough to require a plan.
- [x] Collected repository facts from the integrated app manifests, routes, session model, and architecture docs.
- [x] Drafted the new root README with product, architecture, setup, and limitation sections.
- [x] Re-read the markdown output and verified repository status.

## Surprises & Discoveries

- The root workspace does not register `packages/portal`, `packages/talent`, or `packages/performance` as npm workspaces even though the integrated app depends on their copied source. The README should explain that distinction so contributors do not assume a conventional monorepo layout.
- The integrated app is currently closer to a high-fidelity product prototype than a production application: authentication is mocked, notifications are seeded in code, and the Microsoft login route is simulated.
- The most important architecture docs already exist in `docs/`, so the root README should act as a front door and navigation aid rather than duplicating every detail.
- `git status --short` showed one unrelated untracked file in `.playwright-cli/` from the earlier GitHub browser automation step. It is not part of the README deliverable and should be treated separately from the documentation changes.

## Decision Log

- Decision: Create a comprehensive root README instead of a short landing-page summary.
  Rationale: The user explicitly asked for a document that helps people understand what the repository is all about, which requires architecture, workflow, and constraint context in addition to the product summary.
  Date/Author: 2026-04-06 / Codex

- Decision: Position the repository as an integrated prototype workspace.
  Rationale: That framing matches the codebase realities better than calling it a production app or a clean package monorepo.
  Date/Author: 2026-04-06 / Codex

## Outcomes & Retrospective

Current outcome:
- The repository now has a root README that explains what the integrated workspace is, how it is structured, how to run it, and what prototype constraints a contributor should understand up front.
- The README is intentionally positioned as a GitHub front door and points readers to deeper docs instead of trying to replace them.
- The supporting ExecPlan records the repository facts consulted, the scope of the documentation work, and the final validation state.

Validation results:
- `README.md` was re-read after authoring and corrected to use repo-relative links suitable for GitHub readers.
- `docs/REPOSITORY_README_EXECPLAN.md` was re-read and updated to reflect completion.
- `git status --short` shows the intended new documentation files plus one pre-existing, unrelated Playwright snapshot artifact.

Remaining follow-up outside this deliverable:
- Decide whether the `.playwright-cli/page-2026-04-06T07-37-39-692Z.yml` artifact should be deleted, ignored, or left untracked.
