# Create Rinjani 2.0 Socialization Video

This ExecPlan is a living document. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` up to date as work proceeds.

## Purpose / Big Picture

Create a short video-format socialization material for Rinjani 2.0 that explains the integrated product story to internal stakeholders. After this work, the team will have an editable Remotion source project and a rendered MP4 that introduces why Rinjani 2.0 exists, how Portal, Talent, and Performance fit together, and what business behaviors the prototype supports.

## Context and Orientation

The source of truth is the `integrated-rinjani` repository. The relevant product context comes from:

- `README.md`: Rinjani Integrated consolidates Portal, Talent, and Performance into one browser app and one review surface.
- `docs/integrated-product-architecture/INTEGRATED_SITEMAP.md`: current route and platform structure.
- `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM.md`: visual direction, brand interpretation, typography, and color behavior.
- `AGENTS.md`: use repo-native design system references and keep changes scoped.

The working tree already contains unrelated user changes. This deliverable will be isolated under `deliverables/rinjani-socialization-video/` and will not modify the app packages or root package files.

## Scope and Approach

The deliverable will be a Remotion video project with an MP4 output. The video will use programmatic motion graphics instead of screenshots from the app so it can communicate the socialization narrative clearly without depending on the current prototype runtime state or user credentials. The visual language will follow the approved Rinjani direction: deep institutional teal, white workspace surfaces, warm orange accent, growth green, precise data panels, and Plus Jakarta Sans-style UI typography.

The video will include:

- Opening statement for Rinjani 2.0 as the integrated Human Capital operating system.
- Before/after story: three separate prototype streams become one integrated review surface.
- Platform overview for Portal, Talent, and Performance.
- Role-based flow from employee self-service to leader and HQ governance.
- Closing adoption message for socialization.

The video will not change application code, product navigation, or canonical documentation beyond this deliverable plan.

## Milestones

### Milestone 1: Plan and storyboard

Create this ExecPlan and define the video structure from repository docs. Validation is a readable plan with source files named and a clear storyboard path.

### Milestone 2: Build Remotion deliverable

Create an isolated Remotion project under `deliverables/rinjani-socialization-video/`, including `package.json`, Remotion config, composition entry points, and reusable scene components. Validation is a Remotion bundle that can serve a preview and render at least one still frame.

### Milestone 3: Render the MP4

Install only local deliverable dependencies, render the socialization video to `dist/rinjani-2-socialization.mp4`, and keep the source editable. Validation is a successful render command and an existing non-empty MP4.

### Milestone 4: Playwright visual QA

Use the Playwright Interactive workflow through the Node REPL where available to inspect the Remotion preview. The QA inventory must cover the main claims, scene states, viewport fit, and visual defects such as clipping, weak contrast, overlap, and unreadable text.

## Validation

- `npm install` in `deliverables/rinjani-socialization-video`.
- `npm run render` creates `dist/rinjani-2-socialization.mp4`.
- `npm run still -- --frame=<frame>` or an equivalent Remotion still export creates visual evidence for representative frames.
- Playwright Interactive opens the Remotion preview or rendered frame surface and checks:
  - opening claim is legible,
  - Portal/Talent/Performance story is visible,
  - no important text is clipped,
  - no major overlap or contrast problem is visible,
  - the video project responds in a browser preview.

## Progress

- [x] Read repository-level guidance and product docs.
- [x] Identified `integrated-rinjani` as the right product source for the socialization video.
- [x] Created the deliverable directory and this ExecPlan.
- [x] Scaffold Remotion project files.
- [x] Implement storyboard composition.
- [x] Render MP4.
- [x] Run Playwright-based preview and visual QA.
- [x] Record final outcomes.

## Surprises & Discoveries

- The workspace root is not a git repository; the active integrated product is a nested git repository at `integrated-rinjani`.
- The integrated repository has existing unrelated modified and untracked files. The video deliverable must stay isolated.
- Remotion dependencies were installed inside the deliverable folder only, avoiding the root workspace package files.
- Remotion downloads its own Chrome Headless Shell on first still or video render. The first still command looked stalled until the browser download progress flushed on process exit.
- Persistent Node REPL Playwright import and setup were attempted. The REPL could not resolve the deliverable-local package from its outer workspace CWD, and after workaround import it hit a macOS Chromium launch permission failure. Terminal Playwright from the deliverable folder worked, so QA used a Playwright script while preserving the requested Playwright-based validation.

## Decision Log

- Decision: Build the material as an isolated Remotion deliverable under `deliverables/rinjani-socialization-video/`.
  Rationale: This avoids modifying root app packages or the existing dirty working tree while still keeping the deliverable close to the integrated product source.
  Date/Author: 2026-04-24 / Codex

- Decision: Use motion graphics and product narrative panels rather than live app screenshots.
  Rationale: A socialization material needs a clean stakeholder story and should not inherit any transient prototype runtime or auth state. The visuals can still reflect the documented Rinjani design system.
  Date/Author: 2026-04-24 / Codex

## Outcomes & Retrospective

- Created an editable Remotion video project at `deliverables/rinjani-socialization-video/`.
- Rendered the final MP4 at `deliverables/rinjani-socialization-video/dist/rinjani-2-socialization.mp4`.
- Exported representative review stills:
  - `dist/frame-opening.png`
  - `dist/frame-platforms.png`
  - `dist/frame-governance.png`
  - `dist/playwright-preview-playing.png`
- Validation completed:
  - `npx tsc --noEmit` reported no TypeScript errors.
  - `npm run render` rendered 1800 frames and encoded `dist/rinjani-2-socialization.mp4`.
  - `npx remotion compositions src/index.tsx` reported `RinjaniSocialization`, 1920x1080, 30 FPS, 1800 frames / 60 seconds.
  - `npm run qa:preview` opened Remotion Studio with Playwright, started playback via keyboard input, captured `dist/playwright-preview-playing.png`, and reported no document-level horizontal or vertical overflow at 1280x720.
- Visual review of the opening, platform, and governance stills found no obvious clipping, overlap, illegible text, or contrast failures.
