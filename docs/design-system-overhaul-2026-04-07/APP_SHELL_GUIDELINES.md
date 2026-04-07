# Rinjani 2.0 AppShell Guidelines

## Purpose

The AppShell is the global product frame for Rinjani 2.0. It owns the sidebar, top navbar, global search entry, platform switcher, notifications, help access, profile menu, and main content frame.

Module pages must not recreate this chrome. Portal, Talent, Performance, and the admin-only Design System page should render inside the same shell.

## Status

Current status: first runtime implementation pass. Runtime shell implementation now lives in `packages/shell/src/app-shell.tsx` and should continue to be validated visually across Portal, Talent, Performance, and the Design System page.

Primary reference: the original Talent shell in `packages/talent/src/components/shell`, especially `RinjaniSidebar.tsx`, `RinjaniHeader.tsx`, and `Layout.tsx`.

Secondary reference: Intent UI Sidebar docs for capabilities, not for direct implementation: [Intent UI Sidebar](https://intentui.com/docs/components/layouts/sidebar).

## Design Intent

The shell should feel like a restrained enterprise cockpit:

- Dark teal navigation rail.
- Primary teal command bar.
- White operational workspace.
- Warm orange accent for the sidebar collapse affordance and selected/attention moments.
- Subtle Rinjani supergraphic pattern used only as low-opacity atmospheric texture.
- Rounded transition between the shell chrome and the main workspace, especially the top-left content corner.

The shell should not look like a generic admin dashboard or a raw copy of a UI kit.

## Approved Brand Assets

Assets imported into the workspace:

| Asset | Path | Usage |
| --- | --- | --- |
| Transparent Rinjani logo | `apps/rinjani/public/brand/rinjani-logo-transparent.png` | Preferred shell logo, always placed on a light brand plate when used on teal/dark surfaces |
| White-background Rinjani HCMS logo | `apps/rinjani/public/brand/rinjani-hcms-logo-white-bg.png` | Documentation, light-background brand reference, fallback use |
| Rinjani supergraphic | `apps/rinjani/public/brand/rinjani-supergraphic.svg` | Master reference only; do not use directly as production sidebar texture |
| Kawung factor tile | `apps/rinjani/public/brand/kawung-factors/kawung-factor-09-tile.svg` | Current approved small repeated pattern tile reference |
| Warm kawung tile | `apps/rinjani/public/brand/kawung-factors/kawung-factor-09-tile-orange.svg` | Preferred production sidebar texture trial |
| Red kawung tile | `apps/rinjani/public/brand/kawung-factors/kawung-factor-09-tile-red.svg` | Accent/silhouette trial only; use sparingly |

Usage rules:

- Do not recolor, tint, or alter the logo asset.
- Use a light/frosted brand plate behind the transparent logo whenever the surrounding surface is teal or dark.
- Do not use the white-background logo directly on the teal sidebar unless it is intentionally framed in a light container.
- Use the supergraphic at low opacity only. It should add texture, not reduce navigation readability.
- Keep the master supergraphic as the source reference, but do not use it directly as the production sidebar texture.
- Use the clean Factor 09 extraction as the current approved kawung reference.
- Use the tile version as a repeated background pattern instead of placing one oversized vector behind the sidebar.
- Prefer masked or localized silhouette usage when a full repeated background competes with navigation readability.
- Prefer the warm orange kawung tile on teal sidebar surfaces because the original teal kawung disappears into the background.
- Use the red kawung tile only for subtle silhouette/accent trials, not as the default sidebar pattern.
- Do not crop the logo into unreadable fragments in expanded sidebar state.
- In collapsed sidebar state, icon-only logo usage is acceptable if it stays recognizable.

## Shell Composition

| Part | Responsibility |
| --- | --- |
| `AppShell` | Composes the global frame and provides shell presence context |
| `ShellSidebar` | Owns brand, navigation, collapse behavior, and profile trigger |
| `ShellTopbar` | Owns search, platform switcher, notifications, help, and profile controls |
| `ShellSearchButton` | Visual entry into global command/search behavior |
| `ShellPlatformSwitcher` | Lets users switch between accessible Rinjani platforms |
| `ShellNotifications` | Shows unread count and notification list |
| `ShellHelpMenu` | Shows guidebook/helpdesk/ITSM support entries when destinations exist |
| `ShellProfileMenu` | Shows profile summary, role context, and logout |
| `ShellContentFrame` | Owns the white workspace surface and rounded content corner |

The public `AppShellProps` should remain stable unless a migration plan explicitly approves a breaking change.

## Sidebar Specification

Recommended structure:

- Expanded width: around `250px`.
- Collapsed width: around `64px`.
- Background: semantic sidebar token, visually dark teal.
- Pattern: optional `rinjani-supergraphic.svg` as low-opacity texture.
- Header: Rinjani logo and short product name.
- Content: grouped navigation sections derived from `ModuleManifest`, not hardcoded Talent nav.
- Footer: profile trigger with avatar/initials and a profile menu.
- Collapse control: floating warm-orange circular button attached to the right sidebar edge.

Navigation item states:

| State | Guidance |
| --- | --- |
| Default | Low-emphasis text/icon with strong readability |
| Hover | Slightly brighter text and subtle surface |
| Active | Clear but not heavy; use subtle accent surface and orange/teal cue |
| Collapsed | Icon-only, with tooltip or accessible title |
| Disabled/hidden | Hidden when not allowed by role; disabled only when the destination is visible but unavailable |

Menu capabilities to support later:

- Section grouping.
- Docked/collapsed icon mode.
- Optional per-module badges for pending tasks or unread items.
- Optional nested disclosure groups for future admin-heavy sections.
- Optional per-item menu actions, but only when the module has real secondary actions.
- Persisted collapse state, ideally via local storage after the first visual pass.

## Top Navbar Specification

Recommended structure:

- Height: around `64px`.
- Background: primary teal.
- Left/content area: global search as the dominant affordance.
- Right cluster: platform switcher, notifications, help, role switcher if needed for prototype review, and profile menu.
- Search should eventually open `CommandMenu`, not behave as a passive input only.
- Logout should live inside the profile menu, not as a permanent top-level button.

Navbar corner rule:

- The main workspace must have a rounded top-left corner where it meets the sidebar/topbar.
- The corner is part of the shell signature and should be preserved across Portal, Talent, Performance, and Design System.
- Avoid straight-edge content frames unless explicitly approved for a full-screen workflow.

## Intent UI-Informed Enhancements

Intent UI's sidebar model suggests useful capabilities for Rinjani, but it should not be copied directly because it uses a different component stack.

Recommended to adopt conceptually:

- Collapsible modes: expanded and docked/icon-only.
- Tooltip behavior in docked mode.
- Sidebar sections with labels.
- Badges on items for pending module-specific counts.
- Header and footer slots.
- Optional disclosure groups for nested admin sections.
- Menu actions on individual sidebar items only when a module needs real secondary actions.
- Remembered sidebar state after visual direction is stable.

Recommended to defer:

- Fully hidden sidebar mode.
- Right-side sidebar.
- Arbitrary content inside sidebar, such as calendars or filters.
- Deep nested navigation until Rinjani has a validated need.

## Notification Badge Guidance

Module-level badges may be useful, but they should be introduced carefully:

- Use small numeric badges for actionable pending counts, not decorative popularity counts.
- Cap large counts, for example `99+`.
- Use badges only for modules where the user can resolve or inspect the count.
- Keep the global notification count in the topbar.
- Keep module-level count metadata in the module manifest or derived navigation state, not hardcoded inside shell UI.

## Implementation Rules

- Use `platforms` and `modules` props as source of truth.
- Use `visibleTo` and `hidden` to determine visible navigation.
- Preserve `useIntegratedShell()` behavior so embedded Talent pages do not render duplicate shells.
- Avoid `figma:asset` imports in shared shell code.
- Avoid raw hardcoded colors when equivalent tokens exist.
- Use shared-ui patterns where appropriate, but do not over-import heavy components into the shell if simple accessible markup is enough.
- Keep the shell compact enough for data-heavy HR screens.
- Preserve keyboard accessibility and focus-visible states.
- Ensure `packages/shell/src/**/*` is included in Tailwind source scanning. Shell-only classes are visual dependencies; if Tailwind does not scan the shell package, the shell can compile while rendering with missing widths, pattern backgrounds, spacing, and opacity utilities.
- Anchor popovers to the control that opens them. Sidebar profile access should render a sidebar-anchored menu; topbar profile access may render a separate topbar-anchored menu.

## Validation

After runtime implementation:

- Run `npm run build`.
- Open Portal, Talent, Performance, and `/#/design-system` as Admin.
- Check expanded sidebar.
- Check collapsed sidebar.
- Check active nav state.
- Check topbar search placement.
- Check platform switcher.
- Check notification count and popover.
- Check help menu behavior if implemented.
- Check profile menu and logout.
- Check workspace top-left radius.
- Check that normal user role cannot access the Design System page.
