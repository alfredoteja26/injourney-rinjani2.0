# Rinjani Integrated

Rinjani Integrated is the consolidation workspace for the Rinjani 2.0 product experience. It brings three previously separate prototype streams into one browser app:

- Portal
- Talent
- Performance

The goal of this repository is not just to store shared code. It is the place where the integrated product is assembled, where shell ownership is normalized, and where reviewers can experience one cross-platform prototype instead of switching between disconnected apps.

## What This Repository Is

This repo is a front-end integration workspace for the InJourney Human Capital product suite. It combines copied source snapshots from the standalone Portal, Talent, and Performance prototypes into a single Vite + React application with:

- one login flow
- one host shell
- one platform switcher
- one current-platform sidebar
- one route tree

Today, the repository should be read as a product prototype and integration environment, not as a full production stack. The app includes mock session handling and locally seeded UI data so design, navigation, and module flows can be reviewed without backend dependencies.

## Product Scope

The integrated prototype currently organizes the product into three platforms.

### Portal

Portal is the entry hub. It covers employee-facing and admin-facing utilities such as dashboard access, profile pages, surveys, HC policy content, mail management, analytics, offboarding, and settings.

### Talent

Talent is the largest functional area in the integrated prototype. It covers talent journeys and talent management flows such as career aspiration, IDP, talent pool, succession planning, talent review, job tender, supervisor views, talent committee views, and 360 assessment, including several admin headquarters routes.

### Performance

Performance covers KPI planning and monitoring flows such as individual KPI, team KPI, KPI library, KPI tree, and headquarter dashboards.

## Why This Repository Exists

The standalone prototypes were useful for module-level exploration, but they created product-review problems:

- each module had its own shell assumptions
- navigation felt like switching between separate apps
- Talent routes and layouts conflicted with the integrated shell
- reviewers had to reconstruct the product story from multiple codebases

This repository solves that by making the integrated app the canonical review surface. The host app owns the shell and route composition, while the copied module packages provide page-level content.

## Current Architecture

At a high level, the repository is organized around one integrated app plus a small set of shared packages.

### Integrated App

`apps/rinjani` is the application entry point. It owns:

- Vite app bootstrapping
- route composition
- login and session bootstrapping
- platform and sidebar manifests
- integration wrappers for Portal, Talent, and Performance pages

### Shared Packages

- `packages/shared-types` defines shared contracts used across the integrated app and shell.
- `packages/shared-ui` contains shared UI exports and the canonical theme stylesheet.
- `packages/shell` contains the integrated host shell.

### Copied Source Packages

The repo also contains copied module source in:

- `packages/portal`
- `packages/talent`
- `packages/performance`

These directories are important, but they are not declared as root npm workspaces in the current setup. They act as integration-owned snapshots that the host app imports from directly. This is intentional: the integrated repository can patch and normalize module behavior without mutating the original standalone prototype repos.

## Navigation Model

The integrated product uses one shared shell with clearly separated responsibilities:

- The global header owns platform switching, global search, notifications, and user-role actions.
- The left sidebar shows only the modules for the active platform.
- Talent lives under a strict `/talent/*` subtree.
- Legacy Talent paths are preserved as redirects for compatibility while integration cleanup continues.

This matters because shell ownership is a core part of the repository. Package-level screens are not supposed to re-render their own app chrome once they are mounted inside the integrated host.

For the current navigation map, see:

- [`docs/INTEGRATED_SITEMAP.md`](./docs/INTEGRATED_SITEMAP.md)
- [`docs/SHELL_OWNERSHIP.md`](./docs/SHELL_OWNERSHIP.md)

## Repository Structure

```text
integrated-rinjani/
├── apps/
│   └── rinjani/               # Integrated Vite application
├── docs/                      # Architecture notes, exec plans, route docs
├── packages/
│   ├── portal/                # Copied Portal source snapshot
│   ├── performance/           # Copied Performance source snapshot
│   ├── shared-types/          # Shared contracts
│   ├── shared-ui/             # Shared theme and reusable UI exports
│   ├── shell/                 # Integrated host shell
│   └── talent/                # Copied Talent source snapshot
├── package.json               # Root workspace entry
└── tsconfig.base.json         # Shared TypeScript config
```

## Development Model

### Workspace behavior

The root `package.json` currently exposes these workspaces:

- `apps/rinjani`
- `packages/shared-types`
- `packages/shared-ui`
- `packages/shell`

That means the integrated app and shared packages are managed as the active workspace surface. The copied Portal, Talent, and Performance packages still live in the repo and are imported by the app, but they are treated more like integration-owned source trees than independently managed workspace packages.

### Tooling

The integrated app currently uses:

- React 18
- React Router 7
- Vite 6
- TypeScript 5
- Tailwind CSS 4
- Radix UI primitives

## Running The Repository

### Prerequisites

- Node.js 20+ is the safest assumption for this toolchain
- npm

### Install dependencies

```bash
npm install
```

Run this from the repository root:

```bash
cd integrated-rinjani
npm install
```

### Start local development

```bash
npm run dev
```

This runs the integrated app workspace (`@rinjani/app`) through the root script.

If you want to run the app workspace directly:

```bash
npm run dev --workspace @rinjani/app
```

### Build the integrated app

```bash
npm run build
```

This runs the Vite production build for the integrated app workspace.

## Authentication And Demo Behavior

The current app is prototype-oriented. Authentication is mocked in the front end:

- session state is stored in `localStorage`
- the login flow can simulate either a regular sign-in or a Microsoft login path
- user role switching is supported inside the integrated shell
- notifications are currently seeded from local data in code

This makes the repository suitable for UI review, navigation review, and product walkthroughs without needing a connected backend.

## Route Behavior

The integrated app uses a hash router, not browser-history routing. This is a deliberate compatibility choice because some carried-over Portal interactions still rely on hash-based navigation.

Examples:

- `/#/` for Portal dashboard
- `/#/talent` for Talent home
- `/#/performance/my-kpi` for Performance

If you are adding or updating routes, prefer following the route ownership documented in the integrated app rather than the old standalone package assumptions.

## Documentation Worth Reading

This root README is the front door. The deeper architectural decisions live in the `docs/` folder.

- [`docs/EXECPLAN.md`](./docs/EXECPLAN.md)
  Explains the recent integrated shell and design-system unification work.

- [`docs/INTEGRATED_SITEMAP.md`](./docs/INTEGRATED_SITEMAP.md)
  Lists the current route tree and navigation ownership rules.

- [`docs/SHELL_OWNERSHIP.md`](./docs/SHELL_OWNERSHIP.md)
  Defines which layer is allowed to render shell chrome.

- [`docs/TALENT_ROUTE_NORMALIZATION.md`](./docs/TALENT_ROUTE_NORMALIZATION.md)
  Captures the normalization of Talent routes into the integrated structure.

- [`docs/DESIGN_CONSISTENCY_AUDIT.md`](./docs/DESIGN_CONSISTENCY_AUDIT.md)
  Records design-system consistency observations across the integrated product.

## Contribution Guidance

When you change this repository, treat the integrated shell as the product owner of app-level behavior.

- Do not reintroduce package-local shells inside the integrated app.
- Prefer updating the integrated route tree and manifests before adding ad hoc navigation.
- Treat `packages/portal`, `packages/talent`, and `packages/performance` as copied integration surfaces, not as untouched vendor directories.
- Preserve hash-router compatibility unless the host app deliberately migrates away from it.
- Keep product-facing documentation current when you make architecture or navigation changes.

## Current Limitations

The current repository is strong as an integrated product prototype, but it still has known limitations:

- authentication is mocked rather than backed by a real identity service
- notifications are hardcoded demo data
- copied module packages still contain legacy assumptions from their standalone origins
- some compatibility redirects exist because route normalization is still in progress
- bundle-size optimization is still a follow-up concern

Those limitations are expected for the current phase of the project. The value of the repository is that it makes cross-platform product review and integration work concrete and testable in one place.

## Summary

If you are new to this repository, the most important thing to understand is this:

Rinjani Integrated is the place where Portal, Talent, and Performance stop behaving like three separate prototypes and start behaving like one product.
