# Integrated Shell Ownership

This file defines which layer is allowed to render shell chrome in the integrated application.

## Canonical shell

- The host shell in `packages/shell` is the only layer allowed to render:
- top header
- platform switcher
- global search entry
- notifications entry
- role/profile actions
- left sidebar

## Package behavior

- Package-level screens in `packages/portal`, `packages/talent`, and `packages/performance` must render content only when mounted inside the integrated app.
- Talent `Layout` and `AdminLayout` detect the integrated shell context and degrade to content wrappers instead of rendering the native Talent shell.
- No package-local page may assume it owns app-level navigation once mounted under the integrated host.

## Navigation responsibilities

- Platform switching is header-level navigation.
- Module switching is sidebar-level navigation.
- The sidebar is current-platform-only.
- Cross-platform movement must happen through the platform switcher or explicit links, not by rendering another platform shell inside the current page.

## Styling contract

- Shared shell styling comes from `packages/shared-ui/src/theme.css`.
- Package-level globals are not imported into the integrated host to avoid conflicting `:root` token definitions.
- Legacy token aliases remain available in the shared theme only as a compatibility bridge while copied prototype screens are normalized.
