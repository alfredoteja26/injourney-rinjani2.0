# Implement Authentication Login Redesign

This ExecPlan is a living document. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` up to date as work proceeds.

## Purpose / Big Picture

The login page should stop feeling like an imported mock and start behaving like a Rinjani Integrated authentication surface. After this change, a stakeholder can open `#/login`, see a design-system-compliant login screen, try normal login, see basic wrong-password and validation states, open a forgot-password flow, view registration guidance, use demo credentials, and continue to the existing Microsoft mock.

This is still prototype-level authentication. It should demonstrate common auth states without pretending that production-grade identity, email delivery, reset tokens, or Microsoft SSO have already been implemented.

## Context and Orientation

Relevant files:

- `docs/authentications/AUTHENTICATIONS.md` defines target authentication behavior and edge cases.
- `packages/portal/src/imports/SignIn.tsx` is the active login component rendered by the app route.
- `apps/rinjani/src/routes.tsx` passes `onLogin(email, role)` and `onMicrosoftLogin()` into `SignIn`.
- `packages/portal/src/lib/auth.ts` has mock users, but the active login component currently only checks non-empty email/password and assigns the Admin role from one specific email.
- `packages/shared-ui/src/theme.css` defines the Rinjani design tokens.
- `packages/shared-ui/src` provides primitives such as Button, Input, Card, Field, Dialog, Alert, and Separator.

Current repo state:

- The worktree is dirty and the current branch is `main`.
- Many existing changes are unrelated to this login task.
- The implementation should avoid committing or reverting unrelated changes.

Design references:

- The user-provided Stitch screenshot is a composition reference only.
- `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM_BLUEPRINT.md` and `DESIGN_SYSTEM.md` remain the source of truth for tokens, typography, brand assets, and component behavior.

## Scope and Approach

Replace the active `SignIn.tsx` implementation with a clean React component that preserves the existing prop API. The new component will use shared UI primitives and tokenized Tailwind classes instead of Figma-imported fixed positioning.

In scope:

- Responsive login layout.
- Brand header, language/help controls, form card, hero panel, demo credentials dialog, forgot-password dialog, registration guidance dialog, password reveal, form validation, generic invalid-credential error, simple temporary lockout after repeated attempts, and Microsoft login entry.
- Prototype-only mock handling for forgot password and registration guidance.
- Documentation updates to the ExecPlan.

Out of scope:

- Real backend authentication.
- Email delivery.
- Real reset tokens.
- Real Microsoft provider integration.
- Committing/pushing the entire dirty main branch.

Chosen approach:

- Keep route wiring unchanged and improve only the login surface.
- Do not introduce a new shared auth component yet because this is the first focused auth surface and still prototype-level.
- Use the existing prop shape so `routes.tsx` does not need churn.

## Milestones

### Milestone 1: Plan and isolate the work

Create this ExecPlan, record dirty-worktree constraints, and identify the active login entry point. Validation is a review of the relevant files and a clear implementation target.

### Milestone 2: Replace the login UI

Rewrite `packages/portal/src/imports/SignIn.tsx` as a tokenized, responsive component using shared primitives. Validation is TypeScript/build feedback and manual reading for design-system drift.

### Milestone 3: Add simple auth edge-case states

Add local validation, generic wrong-credential error, repeated-attempt cooldown, forgot-password confirmation, registration guidance, and demo credentials behavior. Validation is manual flow testing and build.

### Milestone 4: Verify and document outcome

Run `npm run build`, record any issues, and update the ExecPlan with outcomes.

## Validation

Run:

```powershell
npm run build
```

Manual checks:

- `#/login` loads.
- Empty fields do not submit.
- Invalid email format shows a field-level message.
- Wrong password shows a generic error.
- Repeated failures show a temporary cooldown.
- Demo credentials fill the form.
- Forgot-password flow shows generic confirmation.
- Registration guidance is accessible.
- Password reveal toggles.
- Microsoft login button still calls `onMicrosoftLogin`.
- Layout is usable at mobile and desktop widths.

## Progress

- [x] Created authentication specification in `docs/authentications/AUTHENTICATIONS.md`.
- [x] Confirmed active login entry point and dirty main branch state.
- [x] Created this ExecPlan.
- [x] Replaced `SignIn.tsx`.
- [x] Ran build validation.
- [x] Performed desktop browser screenshot check for `#/login`.
- [x] Applied follow-up visual adjustments for brand lockup, feature announcement, hero slideshow, glassmorphism, and stable footer/error layout.
- [x] Fixed the error-alert collision by replacing the absolute floating alert with a reserved in-card status row.
- [x] Added the gradient and Kawung background treatment using existing brand assets.
- [x] Recorded final outcomes.

## Surprises & Discoveries

- The current `SignIn.tsx` is a Figma-imported component with fixed `1024px` layout, hardcoded colors, local field/modal patterns, and `figma:asset` imports.
- The current login logic does not actually validate credentials from `packages/portal/src/lib/auth.ts`; it treats any non-empty email/password as a successful login and assigns role from one specific email.
- The repo already has a dirty `main` branch, so committing everything first would risk bundling unrelated work.
- The default `npm run build` command resolves to a broken roaming npm path in this environment. Running the installed npm command directly with `C:\Program Files\nodejs\npm.cmd` works.
- Vite dev server startup needed unsandboxed process spawning for esbuild during the visual check. The temporary process was stopped after the screenshot.
- A taller hero can push the footer below the desktop viewport if the footer participates in normal document flow. For the desktop auth canvas, the footer is pinned to the bottom of the layout while mobile remains naturally scrollable.
- Inline error alerts changed the card height and pushed lower page content. The error alert is now positioned as a floating message above the card so failed login does not reflow the screen.
- The floating alert then collided with the subtitle because `absolute -top-16` positioned it in the same vertical area as the intro copy. The safer pattern is a reserved status row inside the card: it keeps the screen stable while preserving layout ownership.
- The repo already contains Kawung brand SVGs in `apps/rinjani/public/brand/kawung-factors`, so the background can use approved local assets instead of recreating a pattern in code or importing a new image.

## Decision Log

- Decision: Do not commit or push the dirty main branch before this login task.
  Rationale: The dirty worktree includes many unrelated changes. A broad commit would make the auth change hard to review and could accidentally publish unrelated work.
  Date/Author: 2026-04-07 / Codex

- Decision: Keep the existing `SignIn` prop API.
  Rationale: It avoids route churn and keeps the redesign focused on auth presentation and prototype states.
  Date/Author: 2026-04-07 / Codex

- Decision: Implement forgot-password and registration as prototype guidance dialogs, not real account creation or email reset.
  Rationale: The user asked for simple coverage of common states, while the app does not yet have backend identity or email delivery.
  Date/Author: 2026-04-07 / Codex

- Decision: Use local demo credential matching inside `SignIn.tsx` for this pass instead of wiring to `packages/portal/src/lib/auth.ts`.
  Rationale: The existing screen already used `dimas@injourney.co.id` and `binavia@injourney.co.id` demo credentials, while `lib/auth.ts` contains a different older mock set. Keeping the visible demo credentials preserves prototype continuity and avoids changing route/session contracts in the same pass.
  Date/Author: 2026-04-07 / Codex

- Decision: Use a SaaS-style availability announcement pill for the login feature message.
  Rationale: Product launch pages commonly pair a small availability/status tag with a short launch message and action cue; the Rinjani implementation applies that pattern to "Green Journey Performance 2.0 deployment" without adding a second marketing hero.
  Date/Author: 2026-04-07 / Codex

## Outcomes & Retrospective

Completed implementation:

- Replaced the Figma-imported login layout with a responsive design-system implementation.
- Added generic credential failure, invalid email, required-field validation, repeated-attempt cooldown, demo credential dialog, forgot-password dialog, registration guidance dialog, and password reveal.
- Enlarged the brand lockup, removed the extra separate `InJourney HCMS` header text, and added a feature availability announcement.
- Converted the right-side illustration into an auto-rotating slideshow with glassmorphism content treatment and manual previous/next controls.
- Updated the hero title to `Empowering Indonesia Hospitality`.
- Changed failed-login feedback to a reserved in-card status row so it no longer collides with the subtitle or dynamically changes the outer page layout.
- Added a teal/green/orange background gradient and subtle Kawung pattern layer using existing brand SVG assets.
- Preserved the existing `onLogin(email, role)` and `onMicrosoftLogin()` props, so route wiring did not change.
- Verified production build with `C:\Program Files\nodejs\npm.cmd run build`.
- Performed a desktop browser screenshot check at `1440 x 900`; the login page rendered with the tokenized form on the left and image-led hero on the right.

Remaining follow-up:

- Run a deeper manual interaction pass if this becomes a release candidate, especially mobile widths and mocked failure flows.
- Decide later whether to reconcile `packages/portal/src/lib/auth.ts` with the newer visible demo credentials.
