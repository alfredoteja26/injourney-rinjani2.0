# Rinjani 2.0 AppShell Redesign Plan

## Purpose

This plan defines the next shell work before touching runtime shell code. The AppShell should reuse the original Talent shell as the visual reference while preserving the integrated Rinjani system behavior that already connects Portal, Talent, Performance, and the admin-only Design System route.

This is not a page-layout redesign. The current content layout direction from the new design-system preview is acceptable. The focus is only the global product frame: sidebar, top navbar, search, platform switcher, notifications, help, profile menu, collapse behavior, and content container ownership.

## Sources Reviewed

- Current integrated shell: `packages/shell/src/app-shell.tsx`
- Original Talent wrapper: `packages/talent/src/components/shell/Layout.tsx`
- Original Talent sidebar: `packages/talent/src/components/shell/RinjaniSidebar.tsx`
- Original Talent header: `packages/talent/src/components/shell/RinjaniHeader.tsx`
- Original Talent popups: `PlatformPopup.tsx`, `NotificationPopup.tsx`, `ProfilePopup.tsx`, `FaqPopup.tsx`
- Talent shell specification: `packages/talent/src/guidelines/Rinjani Talent (INJ-BPR)/Product Artifacts/Shell Spec.md`
- Current design-system foundation: `DESIGN_SYSTEM.md` and `COMPONENT_LIBRARY.md`
- Intent UI Sidebar reference: https://intentui.com/docs/components/layouts/sidebar

## Related Documentation

- AppShell utilization and implementation guideline: `docs/design-system-overhaul-2026-04-07/APP_SHELL_GUIDELINES.md`
- Imported shell brand assets:
  - `apps/rinjani/public/brand/rinjani-logo-transparent.png`
  - `apps/rinjani/public/brand/rinjani-hcms-logo-white-bg.png`
  - `apps/rinjani/public/brand/rinjani-supergraphic.svg`

## Visual Thesis

The AppShell should feel like a restrained enterprise cockpit: dark teal navigation rail, primary teal command bar, white operational workspace, warm orange accent only for shell affordances, and soft rounded surfaces where popups or workspace panels need separation.

## What Carries Over From Talent

- Collapsible dark teal sidebar with expanded and compact states.
- Sidebar width direction: approximately `250px` expanded and `64px` compact, instead of the current heavier `320px` expanded shell.
- Floating orange collapse control attached to the sidebar edge.
- Rinjani brand block at the top of the sidebar.
- Grouped navigation sections with icon, label, and short description.
- Active navigation state using subtle teal/accent highlight rather than a heavy filled block.
- Fixed bottom profile trigger inside the sidebar.
- Top navbar height around `64px`.
- Top navbar search as a central command/search affordance.
- Top navbar icon actions for platform switcher, notifications, and help/FAQ.
- Popover/dropdown surfaces for platform switcher, notification list, help menu, and profile details.
- Rounded workspace corner where the white content frame meets the teal shell chrome.

## What Must Not Carry Over Blindly

- Hardcoded Talent-only navigation groups. The integrated shell must continue to derive navigation from `platforms` and `modules`.
- `figma:asset/...` imports. Shared package code should not depend on Figma pseudo-imports or hashed generated assets.
- Inline background-image styles for the sidebar pattern unless we promote a tokenized asset or CSS-only pattern.
- Talent-only user names, roles, and profile pictures as hardcoded data.
- Domain-specific labels such as Talent readiness states in the global shell.
- Duplicate module-level shell wrappers. The global integrated shell remains the single owner of app chrome.

## Component Decomposition

The current `AppShell` is monolithic. The next implementation should split it into internal shell components while keeping the public `AppShellProps` stable.

Recommended internal components:

| Component | Responsibility |
| --- | --- |
| `AppShell` | Owns context, route-derived state, shell layout, and composition |
| `ShellSidebar` | Renders sidebar frame, brand block, collapse button, grouped navigation, and profile trigger |
| `ShellBrand` | Renders Rinjani mark/text in expanded and compact modes |
| `ShellNavGroup` | Renders one navigation group title and item list |
| `ShellNavItem` | Renders active/default/collapsed nav item states |
| `ShellProfileTrigger` | Renders bottom profile button and initials/avatar surface |
| `ShellTopbar` | Renders search area and right action cluster |
| `ShellSearchButton` | Opens command/search interaction; initially can remain a visual trigger if command routing is deferred |
| `ShellPlatformSwitcher` | Uses visible platform data to switch between Portal, Talent, Performance, and Design System if allowed |
| `ShellNotifications` | Shows notification count and a structured notification popover |
| `ShellHelpMenu` | Shows guidebook/helpdesk/ITSM-style support links when product routes are available |
| `ShellRoleControl` | Keeps Admin/User role switching for prototype review, but should be visually secondary |
| `ShellProfileMenu` | Shows user identity, email, role, and logout action |
| `ShellContentFrame` | Owns the white workspace surface around `children` |

## Design Rules

- Sidebar uses dark teal system tokens, not generated one-off teal classes.
- Sidebar expanded width should be closer to the Talent reference (`250px`) to reduce wasted horizontal space.
- Sidebar compact width should stay close to `64px` for icon-only navigation.
- Header should prioritize search and utility actions over duplicating page title. Page title belongs to page content or shell context, not both.
- Search should visually match the Talent header search, but should eventually open the shared `CommandMenu`.
- Platform switcher should use the current `visiblePlatforms` data, not a hardcoded Talent-era app grid.
- Notifications should use current `notifications` prop and show unread count.
- Help/FAQ should be a first-class shell action only if we can provide stable destinations or clear placeholder behavior.
- Role switcher can remain in prototype/admin mode, but it should not dominate the header.
- Profile menu should replace the current visible `Logout` button. Logout belongs inside the profile menu.
- Content frame should remain a white workspace with rounded top-left corner if it still improves visual separation.
- Do not add domain-specific content to the shell.

Intent UI-informed capabilities to consider:

- Docked/collapsed icon mode with tooltips.
- Sidebar sections and separators.
- Per-module badges for actionable counts.
- Optional nested disclosure groups for admin-heavy sections.
- Item-level menu actions only when the module has real secondary actions.
- Remembered sidebar state after the first visual pass.

## Interaction Rules

- Sidebar collapse must preserve route state and active item state.
- Platform switcher must close after navigation.
- Popovers should close when an item is selected.
- Command search should not be implemented as plain text input long-term; it should open command/search behavior.
- Notification and profile menus must remain keyboard reachable.
- Header action buttons should have accessible labels.
- Mobile behavior needs a later pass; for this phase, preserve desktop behavior first and avoid making mobile worse.

## Implementation Sequence

1. Refactor `packages/shell/src/app-shell.tsx` into internal component functions without changing the public `AppShellProps`.
2. Reduce shell sidebar width from the current heavy integrated width to Talent-like dimensions.
3. Restyle sidebar navigation to match Talent’s active/hover rhythm while using integrated `modules` data.
4. Restyle topbar around a search-first command area and icon action cluster.
5. Move logout into a profile menu surface instead of a top-level header button.
6. Add help/FAQ shell action if placeholder destinations are acceptable; otherwise document it as a planned shell slot.
7. Keep design-system route visible only for Admin.
8. Run `npm run build`.
9. Visually inspect Portal, Talent, Performance, and `/#/design-system` inside the updated shell.

## Validation Checklist

- The shell still renders Portal, Talent, Performance, and Design System routes.
- Sidebar collapse works in expanded and compact mode.
- Active nav item still follows `location.pathname`.
- Platform switcher still navigates to the selected platform default route.
- Notification count still reflects unread notifications.
- Role switching still works for prototype review.
- Logout still calls `onLogout`.
- No module page renders a duplicate shell inside the integrated host shell.
- No `.stitch/DESIGN.md` changes are made during this shell pass.

## Product Review Questions

- Should the global search immediately open the shared `CommandMenu`, or should this pass keep it as a styled search trigger only?
- Should Help/FAQ be included now as a visible shell action, or deferred until routes/links are approved?
- Should the sidebar use a CSS-only subtle pattern, or stay flat teal until a stable approved pattern asset is promoted?
- Should the topbar continue showing the current module/platform title, or should that context move entirely into page content?
