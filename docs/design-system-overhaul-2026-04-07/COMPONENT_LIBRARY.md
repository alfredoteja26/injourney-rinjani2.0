# Rinjani 2.0 Component Library

This document defines the planned component-library taxonomy for Rinjani Integrated. It organizes UI by functional utility and user intent, not by package ownership or file names.

The future shared implementation should live in `packages/shared-ui`, but this document is documentation-first. It does not standardize domain components yet and does not require immediate runtime refactors.

## Current Implementation Status

Current stage:

- We are in **component library implementation: Phase 1-7 plus overlay foundation**, not yet in migration.
- `.stitch/DESIGN.md` is intentionally skipped for now because Stitch work is running elsewhere.
- The shared-ui foundation and first preview route are implemented and exported from `packages/shared-ui`.
- The `/#/design-system` page currently focuses on the component library. Additional tabs for typography, layout, naming conventions, semantics, primitives, and color theory are planned after the component-library pass is complete.

Implemented in `packages/shared-ui`:

- `cn` - `packages/shared-ui/src/utils.ts`
- `ActionChip` - `packages/shared-ui/src/action-chip.tsx`
- `Button` - `packages/shared-ui/src/button.tsx`
- `IconButton` - `packages/shared-ui/src/button.tsx`
- `ActionGroup` - `packages/shared-ui/src/button.tsx`
- `DropdownMenu` - `packages/shared-ui/src/dropdown-menu.tsx`
- `CommandMenu` - `packages/shared-ui/src/command-menu.tsx`
- `Badge` - `packages/shared-ui/src/badge.tsx`
- `Card` - `packages/shared-ui/src/card.tsx`
- `Field` - `packages/shared-ui/src/field.tsx`
- `FieldGroup` - `packages/shared-ui/src/field.tsx`
- `FieldLabel` - `packages/shared-ui/src/field.tsx`
- `FieldDescription` - `packages/shared-ui/src/field.tsx`
- `FieldError` - `packages/shared-ui/src/field.tsx`
- `Label` - `packages/shared-ui/src/label.tsx`
- `Input` - `packages/shared-ui/src/input.tsx`
- `SearchInput` - `packages/shared-ui/src/search-input.tsx`
- `Textarea` - `packages/shared-ui/src/textarea.tsx`
- `Select` - `packages/shared-ui/src/select.tsx`
- `Combobox` - `packages/shared-ui/src/combobox.tsx`
- `Checkbox` - `packages/shared-ui/src/checkbox.tsx`
- `RadioGroup` - `packages/shared-ui/src/radio-group.tsx`
- `Switch` - `packages/shared-ui/src/switch.tsx`
- `DateInput` - `packages/shared-ui/src/date-input.tsx`
- `Progress` - `packages/shared-ui/src/progress.tsx`
- `Alert` - `packages/shared-ui/src/alert.tsx`
- `Banner` - `packages/shared-ui/src/banner.tsx`
- `Toast` - `packages/shared-ui/src/toast.tsx`
- `Dialog` - `packages/shared-ui/src/dialog.tsx`
- `AlertDialog` - `packages/shared-ui/src/alert-dialog.tsx`
- `Sheet` - `packages/shared-ui/src/sheet.tsx`
- `Popover` - `packages/shared-ui/src/popover.tsx`
- `Tooltip` - `packages/shared-ui/src/tooltip.tsx`
- `EmptyState` - `packages/shared-ui/src/state.tsx`
- `ErrorState` - `packages/shared-ui/src/state.tsx`
- `Separator` - `packages/shared-ui/src/separator.tsx`
- `Skeleton` - `packages/shared-ui/src/skeleton.tsx`
- `Spinner` - `packages/shared-ui/src/spinner.tsx`
- `Tabs` - `packages/shared-ui/src/tabs.tsx`
- `Breadcrumb` - `packages/shared-ui/src/breadcrumb.tsx`
- `Pagination` - `packages/shared-ui/src/pagination.tsx`
- `Table` - `packages/shared-ui/src/table.tsx`
- `DataTable` - `packages/shared-ui/src/data-table.tsx`
- `DescriptionList` - `packages/shared-ui/src/description-list.tsx`
- `DetailPanel` - `packages/shared-ui/src/detail-panel.tsx`
- `List` - `packages/shared-ui/src/list.tsx`
- `ProfileSummary` - `packages/shared-ui/src/profile-summary.tsx`
- `EmployeeBriefCard` - `packages/shared-ui/src/employee-brief-card.tsx`
- `Accordion` - `packages/shared-ui/src/accordion.tsx`
- `LoadingState` - `packages/shared-ui/src/loading-state.tsx`
- `PageHeader` - `packages/shared-ui/src/page-layout.tsx`
- `SectionPanel` - `packages/shared-ui/src/page-layout.tsx`
- `StatCard` - `packages/shared-ui/src/page-layout.tsx`
- `StatCardGroup` - `packages/shared-ui/src/page-layout.tsx`
- `FilterRail` - `packages/shared-ui/src/page-layout.tsx`
- `StatusBadge` - `packages/shared-ui/src/page-layout.tsx`
- `StatusLabel` - `packages/shared-ui/src/status-label.tsx`
- `MetricCard` - `packages/shared-ui/src/analytics.tsx`
- `ChartContainer` - `packages/shared-ui/src/analytics.tsx`
- `BarChart` - `packages/shared-ui/src/analytics.tsx`
- `ProgressCluster` - `packages/shared-ui/src/analytics.tsx`
- `RankingList` - `packages/shared-ui/src/analytics.tsx`

Not implemented yet:

- None for the current base component-library backlog. Deferred items remain below as future scope.
- Admin-only `/#/design-system` preview route - `apps/rinjani/src/design-system-page.tsx`

Latest validation:

- `npm install` completed after adding direct shared-ui Radix dependencies; npm still reports 3 existing vulnerabilities.
- `npm run build` passed after rerunning outside the sandbox because esbuild was blocked by `spawn EPERM` inside the sandbox.
- Build still reports the existing large chunk warning; this is not introduced by the component-library page.
- `npm run build` passed after adding the overlay/feedback batch; existing large chunk warning remains.
- `npm run build` passed after adding the navigation/data-display batch; existing large chunk warning remains.
- `npm run build` passed after adding `CommandMenu`, `DataTable`, and enhanced `Sheet` variants; existing large chunk warning remains.
- `npm run build` passed after adding analytics foundation components; existing large chunk warning remains.
- `npm run build` passed after compacting analytics spacing, removing `KpiSummary` from global scope, and adding interactive `BarChart`; existing large chunk warning remains.
- `npm run build` passed after adding `SearchInput`, `StatusLabel`, and `List`; existing large chunk warning remains.
- `npm install` completed after adding shared-ui `Accordion` and `Toast` dependencies; npm still reports 3 existing vulnerabilities.
- `npm run build` passed after adding `Combobox`, `Toast`, and `Accordion`; existing large chunk warning remains.
- `npm run build` passed after adding `DateInput` and `ProfileSummary`; existing large chunk warning remains.
- `npm run build` passed after standardizing badge/chip casing guidance, tightening table container rhythm, and adding `EmployeeBriefCard`; existing large chunk warning remains.
- Visual review is pending on the admin-only preview route: `/#/design-system`.

## 1. Library Principles

The component library should:

- Start from clean shared implementations.
- Use Talent as the strongest visual and interaction reference.
- Preserve useful Portal and Performance behavior only when it improves accessibility, resilience, or interaction quality.
- Use semantic tokens from the design system.
- Support Google Stitch/Stage prototyping and frontend code with the same taxonomy.
- Expose common implementation options so designers and AI tools can choose the right pattern for a flow.

The library should not:

- Copy every local `components/ui` file blindly.
- Promote domain-specific components into core scope too early.
- Add component tokens for every minor visual state.
- Recreate the integrated shell inside module pages.
- Replace current Rinjani visual direction with brand-book collateral styling.

## Component Usage Guidance

### Preview Layout Guidance

Use `grid` for page-level columns, responsive card groups, and category layouts. Use `flex flex-col` for component preview stacks where the title, description, and preview must remain visually attached.

For repeated preview examples, use a standard title-and-preview wrapper pattern:

```tsx
<ComponentPreviewBlock title="MetricCard" description="Single numeric signal with trend.">
  <MetricCard label="Readiness" value="72%" />
</ComponentPreviewBlock>
```

Avoid auto-row grid stacks for preview title + component pairs, because taller sibling columns can stretch rows and create large title-to-component gaps.

### Page Layout Variation Guidance

For operational product pages, do not force every module landing page into the same page shell and visual weight.

Use these variation labels as documentation-first layout contracts:

- `dashboard hub`
- `workspace explorer`
- `governance cockpit`

These are page-level composition patterns, not new shell chrome and not automatically shared library components yet.

#### Dashboard hub

Use when the page is a summary-and-action surface.

Expected behavior:

- broader enterprise frame
- stronger grouped cards and summary zones
- layered surfaces instead of one continuous white field
- suitable for manager and employee dashboard surfaces

#### Workspace explorer

Use when the page is a browse/search/filter/inspect workflow.

Expected behavior:

- strong top filter rail
- stable search and bounded filter widths
- clear tabs or sibling workspace navigation
- layered surfaces for browser cards, tables, and inspection panels

#### Governance cockpit

Use when the page is policy-heavy, audit-heavy, or table-heavy.

Expected behavior:

- lightest overall surface treatment of the approved variations
- widest table and governance regions
- strong top summary plus filtering behavior
- surface hierarchy preserved through borders and grouped sections

### Filter Rail And Toolbar Guidance

Repeated local search + filter rows across modules should follow one composition rule before they are considered for shared-component promotion.

Use when:

- a page combines `SearchInput`, `Select`, and small bounded controls near the top of a workspace
- the user needs local refinement before interacting with the main table or browser region

Rules:

- Search expands first.
- Bounded controls keep stable minimum widths.
- The rail should wrap gracefully before collapsing into a full one-column stack.
- Intro copy, title, or subtitle content should align to the top-left of the toolbar region.
- Do not visually bottom-align the copy block beside taller filter controls.

Promotion rule:

- Keep filter rails as page-level composition first.
- Promote a generic shared wrapper only after the pattern is clearly stable across modules and has a generic API.

Current shared implementation:

- `FilterRail` is now promoted into `packages/shared-ui/src/page-layout.tsx` for stable top-of-workspace search/filter/action rows.

### Shared Page Framing Components

The integrated Portal and Talent routes now use a small set of presentational-only wrappers to keep page framing consistent without changing domain APIs.

#### `PageHeader`

Use when:

- a page needs consistent title, eyebrow, supporting copy, badge, and action placement
- a route should opt into one of the approved page-level layout patterns: `dashboard`, `workspace`, or `governance`

Notes:

- Keep actions presentational-only.
- Do not pass domain logic into the shared component.

#### `SectionPanel`

Use when:

- a page needs a reusable bordered surface with optional title, description, and actions
- repeated module sections drift visually even though they share the same information hierarchy

Notes:

- `SectionPanel` is the default shared surface wrapper for grouped content blocks.

#### `StatCard` and `StatCardGroup`

Use when:

- a page needs a compact top summary strip
- multiple metrics should read as one group with shared density and spacing

Notes:

- Use semantic `tone` variants instead of hardcoded status colors.

#### `StatusBadge`

Use when:

- a domain screen needs a small semantic status label
- local modules currently use ad hoc badge colors for draft, pending, success, warning, or destructive states

Notes:

- Prefer `status` mapping first.
- Only override `variant` directly when the label is not a domain status string.

### Reusable Component Documentation Standard

Every reusable component should be documented with these minimum details before it is used for migration:

- Purpose: what problem the component solves.
- Use when: the situations where the component is the right choice.
- Avoid when: the situations where a different component or domain pattern is safer.
- Variants and states: visual variants, loading, disabled, empty, error, selected, or open states when relevant.
- Props/API: the stable public props and composition slots that consumers can rely on.
- Token usage: typography, color, radius, spacing, focus ring, and semantic status tokens used by the component.
- Accessibility: keyboard behavior, labels, focus management, dialog semantics, and color-not-only requirements.
- Preview coverage: the examples that should appear in `/#/design-system`.
- Migration guidance: how the component should replace package-local or generated UI safely.

Current status: the base component library has purpose, usage guidance, variants, preview coverage, implementation status, and file paths. The next documentation pass should make props/API and accessibility notes more explicit for each component before broad migration.

### `cn`

Use `cn` to merge conditional classes and Tailwind classes safely. Do not use manual template-string class merging when conditions are non-trivial.

```tsx
import { cn } from "@rinjani/shared-ui";

<div className={cn("rounded-lg border", isActive && "border-primary")} />
```

### `Button`

Use `Button` for commands, workflow movement, and primary/secondary actions.

Supported variants:

- `primary`: main action.
- `secondary`: warm emphasis or attention action.
- `destructive`: destructive or negative action.
- `outline`: secondary neutral action.
- `ghost`: low-emphasis action.
- `link`: inline text action.

Supported sizes:

- `sm`
- `md`
- `lg`
- `icon`

Example:

```tsx
import { Button } from "@rinjani/shared-ui";

<Button variant="primary">Save changes</Button>
<Button variant="outline">Cancel</Button>
<Button variant="destructive" loading>Delete</Button>
```

### `IconButton`

Use `IconButton` for compact actions where the icon has a clear accessible label. Always provide `aria-label`.

```tsx
import { IconButton } from "@rinjani/shared-ui";

<IconButton aria-label="Open filters" variant="outline">
  <FilterIcon />
</IconButton>
```

### `ActionGroup`

Use `ActionGroup` to group related actions in page headers, card headers, toolbars, and form footers.

```tsx
import { ActionGroup, Button } from "@rinjani/shared-ui";

<ActionGroup>
  <Button variant="outline">Cancel</Button>
  <Button>Submit</Button>
</ActionGroup>
```

### `ActionChip`

Use `ActionChip` for filter chips, compact command options, and selected/unselected prototype choices. It is intentionally larger than `Badge` because chips are interactive controls, while badges are compact status labels. Preserve authored casing by default; do not force uppercase unless the chip is acting as a deliberate metadata label.

Supported variants:

- `neutral`
- `selected`
- `attention`
- `destructive`

Supported sizes:

- `sm`
- `md`
- `lg`

```tsx
import { ActionChip } from "@rinjani/shared-ui";

<ActionChip>All employees</ActionChip>
<ActionChip variant="selected">Primary assignment</ActionChip>
<ActionChip variant="attention">Needs review</ActionChip>
```

### `Badge`

Use `Badge` for compact categorical state or short metadata state. Do not use color alone; badge text should carry the meaning. Preserve authored casing by default.

Supported variants:

- `neutral`
- `info`
- `success`
- `warning`
- `destructive`
- `attention`

```tsx
import { Badge } from "@rinjani/shared-ui";

<Badge variant="success">Approved</Badge>
<Badge variant="warning">Waiting review</Badge>
<Badge variant="info">Talent mobility</Badge>
<Badge variant="destructive">Rejected</Badge>
```

### `Card`

Use `Card` for grouped surfaces, dashboard summaries, and data sections. Prefer full composition instead of placing all content in one generic div.

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rinjani/shared-ui";

<Card>
  <CardHeader>
    <CardTitle>Talent Readiness</CardTitle>
    <CardDescription>Current readiness distribution.</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>
```

For large landing pages, `Card` should usually sit inside a documented page variation with a clear surface hierarchy. Avoid using one page-sized white `Card` as a substitute for layout structure.

### `Field`, `Label`, `Input`, `SearchInput`, and `Textarea`

Use `Field` composition for form controls. Use `aria-invalid` on the control when invalid and pair it with `FieldError`.

```tsx
import { Field, FieldDescription, FieldError, FieldLabel, Input } from "@rinjani/shared-ui";

<Field>
  <FieldLabel htmlFor="employee-name">Employee name</FieldLabel>
  <Input id="employee-name" placeholder="Enter employee name" />
  <FieldDescription>Use the official employee name.</FieldDescription>
</Field>

<Field>
  <FieldLabel htmlFor="reason">Reason</FieldLabel>
  <Textarea id="reason" aria-invalid placeholder="Add review notes" />
  <FieldError>This field is required.</FieldError>
</Field>
```

Use `SearchInput` for visible local search and filtering surfaces. Use `CommandMenu` for command-palette or global navigation behavior.

```tsx
import { SearchInput } from "@rinjani/shared-ui";

<SearchInput placeholder="Search employees, units, or readiness..." />
```

Use `Combobox` for longer option sets that need search or descriptions.

```tsx
import { Combobox } from "@rinjani/shared-ui";

<Combobox
  options={[{ value: "talent-committee", label: "Talent Committee", description: "Cross-unit review group" }]}
  value="talent-committee"
/>
```

Use `DateInput` for single-date capture. Do not promote date ranges or calendar scheduling behavior until the product need is explicit.

```tsx
import { DateInput } from "@rinjani/shared-ui";

<DateInput defaultValue="2026-04-07" />
```

### `Select`, `Checkbox`, `RadioGroup`, and `Switch`

Use `Select` for bounded choices with a clear current value. Use `Checkbox` for independent boolean or multi-select decisions. Use `RadioGroup` when exactly one option must be selected. Use `Switch` only for immediate on/off settings, not for submitting form decisions later.

```tsx
import {
  Checkbox,
  Field,
  FieldDescription,
  FieldLabel,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@rinjani/shared-ui";

<Field>
  <FieldLabel>Employee segment</FieldLabel>
  <Select defaultValue="talent">
    <SelectTrigger aria-label="Employee segment">
      <SelectValue placeholder="Select segment" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="talent">Talent pool</SelectItem>
      <SelectItem value="successor">Successor candidate</SelectItem>
    </SelectContent>
  </Select>
  <FieldDescription>Use Select when options are bounded and not searchable.</FieldDescription>
</Field>

<label className="flex items-center gap-2">
  <Checkbox defaultChecked aria-label="Notify reviewer" />
  Notify reviewer when status changes
</label>

<RadioGroup defaultValue="structured">
  <label className="flex items-center gap-2">
    <RadioGroupItem value="structured" aria-label="Structured review" />
    Structured review
  </label>
  <label className="flex items-center gap-2">
    <RadioGroupItem value="freeform" aria-label="Freeform review" />
    Freeform review
  </label>
</RadioGroup>

<Switch defaultChecked aria-label="Enable admin-only review note" />
```

### `Progress`

Use `Progress` for completion against a target. Use semantic variants, not arbitrary colors.

Supported variants:

- `primary`
- `success`
- `warning`
- `destructive`

```tsx
import { Progress } from "@rinjani/shared-ui";

<Progress value={72} variant="success" aria-label="IDP completion progress" />
```

### `Alert`

Use `Alert` for inline section feedback. Use `Banner` later for page-level persistent messages.

Supported variants:

- `neutral`
- `info`
- `success`
- `warning`
- `destructive`

```tsx
import { Alert, AlertDescription, AlertTitle } from "@rinjani/shared-ui";

<Alert variant="warning">
  <AlertTitle>Review required</AlertTitle>
  <AlertDescription>Confirm the approval details before submitting.</AlertDescription>
</Alert>
```

### `Banner`

Use `Banner` for page-level or section-level conditions that should remain visible while the user works.

```tsx
import { Banner, BannerContent, BannerDescription, BannerTitle } from "@rinjani/shared-ui";

<Banner variant="info">
  <BannerContent>
    <BannerTitle>System review window</BannerTitle>
    <BannerDescription>Use Banner for persistent page-level messages.</BannerDescription>
  </BannerContent>
</Banner>
```

### `Dialog`, `AlertDialog`, `Sheet`, `Popover`, `Tooltip`, and `DropdownMenu`

Use overlays according to user intent:

- `Dialog`: short, focused task.
- `AlertDialog`: destructive or high-impact confirmation.
- `Sheet`: side inspection or edit panel that preserves page context.
- `Popover`: contextual details or compact controls.
- `Tooltip`: short non-critical helper text.
- `DropdownMenu`: secondary contextual actions.

```tsx
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@rinjani/shared-ui";

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Review employee profile</DialogTitle>
      <DialogDescription>Use Dialog for short focused tasks.</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

<Sheet>
  <SheetTrigger asChild>
    <Button variant="secondary">Open sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Employee brief profile</SheetTitle>
      <SheetDescription>Use Sheet for inspect/edit flows.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

`Sheet` now supports drawer-like variants:

- `side`: `right`, `left`, `top`, `bottom`.
- `presentation`: `edge` or `floating`.
- `overlay`: `dim`, `blur`, or `none`.

Use `floating` + `blur` for focused profile/detail inspection. Use `overlay="none"` only when a non-modal workflow is explicitly approved.

### `CommandMenu`

Use `CommandMenu` for navbar search and command-palette interactions. It should support grouped results, search, empty state, keyboard shortcuts, disabled items, and navigation actions.

```tsx
import { CommandMenuDialog, CommandMenuInput, CommandMenuItem, CommandMenuList } from "@rinjani/shared-ui";

<CommandMenuDialog>
  <CommandMenuInput placeholder="Search modules, people, or policies..." />
  <CommandMenuList>
    <CommandMenuItem>Talent Pool</CommandMenuItem>
  </CommandMenuList>
</CommandMenuDialog>
```

### `EmptyState` and `ErrorState`

Use `EmptyState` when no data exists or filters return no results. Use `ErrorState` when an operation fails and the user needs a recovery action.

```tsx
import { Button, EmptyState, ErrorState } from "@rinjani/shared-ui";

<EmptyState
  title="No employees found"
  description="Try adjusting filters or search keywords."
  action={<Button variant="outline">Reset filters</Button>}
/>

<ErrorState
  title="Failed to load KPI data"
  description="Retry the request before escalating this issue."
  action={<Button variant="destructive">Retry request</Button>}
/>
```

### `Separator`

Use `Separator` to divide related sections without creating custom border divs.

```tsx
import { Separator } from "@rinjani/shared-ui";

<Separator />
```

### `Skeleton` and `Spinner`

Use `Skeleton` for known loading layouts. Use `Spinner` for short inline waits or button-adjacent loading.

```tsx
import { Skeleton, Spinner } from "@rinjani/shared-ui";

<Skeleton className="h-4 w-64" />
<Spinner aria-label="Loading" />
```

### `Tabs`

Use `Tabs` for sibling views inside a module or for the design-system preview hub. Do not use tabs for primary app navigation that belongs in the shell.

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@rinjani/shared-ui";

<Tabs defaultValue="components">
  <TabsList>
    <TabsTrigger value="components">Components</TabsTrigger>
    <TabsTrigger value="tokens">Tokens</TabsTrigger>
  </TabsList>
  <TabsContent value="components">...</TabsContent>
  <TabsContent value="tokens">...</TabsContent>
</Tabs>
```

In workspace-heavy pages such as KPI Library or KPI Tree, tabs should read as local workspace navigation, not as a loose stack of sections beneath a generic page shell.

### `Breadcrumb` and `Pagination`

Use `Breadcrumb` for nested admin/detail page orientation. Use `Pagination` for table and list navigation when the full record set is split into pages.

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Pagination } from "@rinjani/shared-ui";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="#/">Portal</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Employee Profile</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

<Pagination>...</Pagination>
```

### `Table`, `DataTable`, `List`, `DescriptionList`, `DetailPanel`, and `LoadingState`

Use `Table` for basic dense comparable records. Use `DataTable` when the admin flow needs search, sorting, column visibility, pagination, and empty-state behavior. Use `List` for compact vertical records, notifications, or related items. Use `DescriptionList` for structured metadata. Use `DetailPanel` for inline selected-record inspection. Use `LoadingState` for panel or page loading copy, not for short inline waits.

Shared table rules:

- Use a contained rounded table wrapper rather than exposing loose rows directly against the page.
- Keep header-cell and body-cell horizontal padding aligned.
- Allow body rows to feel slightly taller than headers for easier scanning.
- Preserve authored casing in headers by default; do not force uppercase globally.

```tsx
import { DataTable, DetailPanel, DescriptionList, List, LoadingState, Table } from "@rinjani/shared-ui";

<Table>...</Table>
<DataTable columns={columns} data={rows} />
<List>...</List>
<DescriptionList>...</DescriptionList>
<DetailPanel>...</DetailPanel>
<LoadingState title="Loading employee data" />
```

The current preview covers base table, interactive DataTable, empty DataTable, and loading skeleton table states. The next table-state candidates are row selection, row actions, error state, filter chips, sticky header, and saved column preferences for admin-heavy screens.

Use `Accordion` for secondary detail that should not dominate the screen.

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@rinjani/shared-ui";

<Accordion type="single" collapsible>
  <AccordionItem value="policy">
    <AccordionTrigger>Review policy</AccordionTrigger>
    <AccordionContent>Supporting details...</AccordionContent>
  </AccordionItem>
</Accordion>
```

Use `ProfileSummary` for compact identity display. Keep it generic; employee-specific profile logic belongs in later domain components.

```tsx
import { ProfileSummary } from "@rinjani/shared-ui";

<ProfileSummary
  name="Binavia Utama"
  description="Senior Manager, Human Capital"
  initials="BU"
  metadata={<span>Employee ID: <span className="font-mono tabular-nums">24070418</span></span>}
  status="Active"
/>
```

ProfileSummary may show initials, an avatar icon, or a provided image node. Keep module-specific states such as Talent readiness outside the generic component unless the consuming screen explicitly owns that domain meaning.

Use `EmployeeBriefCard` when the screen needs assignment-aware employee identity, especially when the same employee may appear in a primary role plus one or more secondary assignments such as talent mobility or project assignment.

```tsx
import { EmployeeBriefCard } from "@rinjani/shared-ui";

<EmployeeBriefCard
  name="Binavia Utama"
  employeeId="24070418"
  title="Senior Manager, Human Capital Strategy"
  organization="Human Capital"
  location="Head Office"
  assignmentType="primary"
/>
```

`EmployeeBriefCard` is the preferred shared primitive for compact employee identity with assignment context. Keep `ProfileSummary` generic.

### `StatusLabel`

Use `StatusLabel` for text-first state in metadata rows and compact summaries. Use `Badge` when the state needs a contained pill shape.

```tsx
import { StatusLabel } from "@rinjani/shared-ui";

<StatusLabel variant="success">Approved</StatusLabel>
<StatusLabel variant="warning">Waiting review</StatusLabel>
<StatusLabel variant="destructive">Rejected</StatusLabel>
```

### `MetricCard`, `ChartContainer`, `BarChart`, `ProgressCluster`, and `RankingList`

Use these as generic analytics patterns for dashboard and admin surfaces. They should not encode domain-specific KPI rules yet; those belong to a later domain-component phase. `KpiSummary` is intentionally not a global component for now because it is a composition of metric cards rather than a primitive pattern.

```tsx
import { BarChart, ChartContainer, MetricCard, ProgressCluster, RankingList } from "@rinjani/shared-ui";

<MetricCard label="Readiness" value="72%" trend="+8%" trendTone="success" />
<ChartContainer title="Readiness distribution" legend={[{ label: "Ready now", value: "42%", tone: "success" }]}>
  <BarChart data={[{ label: "HC", value: 42, detail: "Human Capital readiness: 42%", tone: "success" }]} />
</ChartContainer>
<ProgressCluster items={[{ label: "Review completion", value: 72, variant: "success" }]} />
<RankingList items={[{ label: "Human Capital", value: "92%", tone: "success" }]} />
```

## 2. Component Categories

Use these top-level categories:

- Actions.
- Feedback.
- Inputs.
- Navigation.
- Status Indicators.
- Data Display.
- Analytics.
- Shell.
- Prototype Patterns.

Domain Components are documented as a parking lot only for the next phase.

## 3. Actions

Actions trigger movement, decisions, commands, or workflow transitions.


| Component    | Purpose                          | Initial variants                                      |
| ------------ | -------------------------------- | ----------------------------------------------------- |
| Button       | Primary action trigger           | Primary, secondary, destructive, outline, ghost, link |
| Icon Button  | Dense action trigger             | Default, subtle, destructive, disabled                |
| Link Action  | Navigation action inside content | Default, muted, external, back                        |
| Menu Item    | Dropdown or contextual action    | Default, active, destructive, disabled                |
| Action Chip  | Compact filter or command action | Default, selected, removable, disabled                |
| Action Group | Related command cluster          | Inline, toolbar, sticky footer                        |


Usage patterns:

- Use primary button for the most important action in a section.
- Use secondary orange only for warm emphasis or attention, not for every secondary action.
- Use destructive styling only for irreversible or negative actions.
- Use sticky footer actions for long forms and approvals.
- Use dropdown menus for secondary, contextual, or bulk actions.
- Use icon buttons only when icon meaning is clear or supported by accessible labels.

Required states:

- Default.
- Hover.
- Focus.
- Pressed or active when applicable.
- Disabled.
- Loading when actions trigger async work.

## 4. Feedback

Feedback tells users what happened, what is happening, or what needs attention.


| Component           | Purpose                        | Initial variants                      |
| ------------------- | ------------------------------ | ------------------------------------- |
| Alert               | Inline section feedback        | Info, success, warning, error         |
| Banner              | Page-level feedback            | Info, warning, critical, maintenance  |
| Toast               | Non-blocking confirmation      | Success, info, warning, error         |
| Validation Message  | Field or form feedback         | Error, helper, success                |
| Confirmation Dialog | High-impact confirmation       | Destructive, submit, approval         |
| Empty State         | Data absence and recovery      | First-use, no results, filtered empty |
| Error State         | Failed loading or blocked flow | Page, panel, inline                   |


Usage patterns:

- Use inline validation for field-level problems.
- Use banners for page-wide conditions.
- Use toasts for transient confirmations that do not block user flow.
- Use confirmation dialogs for destructive or irreversible actions.
- Use empty states with a next action when the user can recover.

Required states:

- Icon or status marker when helpful.
- Title.
- Description.
- Optional action.
- Keyboard-accessible dismissal when dismissible.

## 5. Inputs

Inputs collect or modify user-provided values.


| Component    | Purpose                    | Initial variants                          |
| ------------ | -------------------------- | ----------------------------------------- |
| Text Input   | Single-line text           | Default, error, disabled, read-only       |
| Textarea     | Multi-line text            | Default, error, disabled                  |
| Select       | Choice from options        | Single, grouped, disabled, error          |
| Combobox     | Searchable choice          | Single, multi, async future               |
| Checkbox     | Multi-choice boolean       | Default, checked, indeterminate, disabled |
| Radio Group  | Single choice              | Default, disabled, error                  |
| Switch       | Immediate on/off control   | Default, checked, disabled                |
| Date Input   | Date capture               | Single date, range future                 |
| Search Input | Query entry                | Global, local table, command entry        |
| OTP Input    | Segmented secure input     | Default, error, disabled                  |
| Form Field   | Label/helper/error wrapper | Required, optional, error                 |


Usage patterns:

- Use single-column forms for clarity and mobile safety.
- Use two-column forms only for short desktop metadata.
- Use inline edit for low-risk quick updates.
- Use modal forms for short scoped tasks.
- Use right-side panel forms when the user needs to keep list or page context visible.

Required behavior:

- Visible label.
- Helper text when needed.
- Error text when invalid.
- Required or optional indicator when the form mixes both.
- Focus state.
- Disabled and read-only distinction.

## 6. Navigation

Navigation orients users and moves them across modules or information hierarchy.


| Component             | Purpose                            | Initial variants              |
| --------------------- | ---------------------------------- | ----------------------------- |
| Sidebar Item          | Platform module navigation         | Default, active, disabled     |
| Platform Switcher     | Portal/Talent/Performance movement | Current platform, switch menu |
| Tabs                  | Sibling view navigation            | Default, underline, contained |
| Breadcrumbs           | Nested page orientation            | Default, truncated            |
| Pagination            | Table/list pagination              | Default, compact              |
| Back Link             | Return to previous context         | Default, with icon            |
| Command/Search Result | Intent-based navigation            | Page result, action result    |


Usage patterns:

- Use the integrated sidebar only at the shell level.
- Use tabs for sibling views inside one module.
- Use breadcrumbs for nested admin or detail pages.
- Use pagination for dense tables.
- Use command/search for discovery, not as a substitute for stable navigation.

Shell rule:

- Module pages must not render duplicate sidebars, duplicate headers, or standalone app chrome inside the integrated host shell.

## 7. Status Indicators

Status Indicators communicate state, progress, availability, or readiness.


| Component          | Purpose                   | Initial variants                                  |
| ------------------ | ------------------------- | ------------------------------------------------- |
| Badge              | Compact categorical state | Neutral, info, success, warning, error, attention |
| Status Label       | Text-first state          | Same as badge                                     |
| Progress Bar       | Completion against target | Default, success, warning, error                  |
| Skeleton           | Known-layout loading      | Text, card, table row                             |
| Loading Indicator  | Short wait state          | Inline, button, page                              |
| Empty State Marker | Visual absence cue        | No data, no results                               |
| Error State Marker | Visual failure cue        | Inline, panel, page                               |


Usage patterns:

- Use badge for compact categorical state.
- Use progress bar for completion against a target.
- Use skeleton when layout is known and loading is short.
- Use labeled states; color alone is not enough.
- Use red only for genuinely negative or destructive meaning.

Required behavior:

- Accessible label.
- Text meaning for status color.
- Consistent semantic color mapping.

## 8. Data Display

Data Display presents structured information for scanning and comparison.


| Component        | Purpose                    | Initial variants                            |
| ---------------- | -------------------------- | ------------------------------------------- |
| Card             | Surface grouping           | Default, elevated, interactive, selected    |
| Table            | Dense comparable records   | Default, sortable future, selectable future |
| List             | Vertical record summary    | Default, compact, interactive               |
| Description List | Object details             | One-column, two-column                      |
| Detail Panel     | Contextual inspection      | Inline panel, right-side panel              |
| Profile Summary  | Compact person information | Inline, card, popover trigger               |
| Metadata Row     | Small label/value group    | Default, compact                            |
| Accordion        | Progressive disclosure     | Default, nested future                      |


Usage patterns:

- Use tables for dense comparable records.
- Use cards for dashboard summaries and grouped overview content.
- Use description lists for employee or object detail.
- Use right-side detail panels when a user needs to inspect a record while preserving list context.
- Use accordions for secondary information that should not dominate the screen.

Required behavior:

- Clear hierarchy.
- Scannable labels.
- Consistent padding.
- No raw unstructured data walls.

## 9. Analytics

Analytics components present measurable progress, trend, distribution, or scoring.


| Component        | Purpose                   | Initial variants              |
| ---------------- | ------------------------- | ----------------------------- |
| Metric Card      | One important number      | Default, trend, comparison    |
| Chart Container  | Chart surface and heading | Line, bar, donut placeholder  |
| Score Card       | Score with context        | Numeric, rating, comparison   |
| KPI Summary      | KPI state summary         | Individual, team, unit future |
| Ranking List     | Ordered comparison        | Default, compact              |
| Progress Cluster | Related progress scan     | Horizontal, stacked           |


Usage patterns:

- Use metric cards for one dominant number and short context.
- Use charts only when comparison or trend matters.
- Use ranking lists when order matters more than exact plotting.
- Use progress clusters when several related completion states need to be scanned together.
- Keep chart color semantics aligned with the design-system color behavior.

Data-heavy typography:

- Use Plus Jakarta Sans with tabular numeric styling where available.
- Use JetBrains Mono only for structured technical metadata, not for every KPI number.
- Do not introduce serif typography for dashboard numbers.

## 10. Shell

Shell components preserve the persistent integrated product frame.


| Component            | Purpose                                           |
| -------------------- | ------------------------------------------------- |
| App Shell            | Global frame for the product                      |
| Header               | Search, platform switcher, notifications, profile |
| Sidebar              | Current-platform navigation                       |
| Platform Switcher    | Portal, Talent, Performance switching             |
| Global Search        | Cross-platform discovery placeholder              |
| Notification Trigger | User notifications                                |
| Profile Trigger      | User controls                                     |
| Role Switcher        | Prototype role switching                          |


Rules:

- Full shell is owned by `apps/rinjani` and `packages/shell`.
- Stitch/Stage in-app screens should usually be content-only.
- Module packages should not render their own app shell inside the integrated host.
- Any shell change affects product architecture and should reference `docs/integrated-product-architecture/`.
- Shell visual redesign is now a planned phase, but it should not begin until the approved manual Figma direction for navbar, sidebar, header, and platform switcher is reviewed.
- The shell implementation target is `packages/shell/src/app-shell.tsx`; content navigation already exists, but the visual treatment needs a separate review and implementation pass.

## 11. Prototype Patterns

Prototype Patterns document implementation options without forcing immediate component promotion.

Employee brief profile options:


| Pattern          | Use when                                                |
| ---------------- | ------------------------------------------------------- |
| Inline card      | The profile is part of the page scan                    |
| Modal            | The profile task is short and interruptive              |
| Right-side panel | Users need detail while preserving list context         |
| Popover          | The information is small, non-critical, and dismissible |
| Full detail page | The content is complex, shareable, or navigation-worthy |


KPI detail options:


| Pattern          | Use when                                              |
| ---------------- | ----------------------------------------------------- |
| Row expansion    | The table remains the main work surface               |
| Right-side panel | Users compare a KPI against the list                  |
| Modal            | The action is short and scoped                        |
| Full page        | The KPI has deep history, comments, or workflow steps |


Approval task options:


| Pattern             | Use when                              |
| ------------------- | ------------------------------------- |
| Compact card        | The task is part of a dashboard queue |
| Timeline            | History and sequence are important    |
| Confirmation dialog | The action is high impact             |
| Sticky workflow bar | Users work through a long review form |


## 12. Domain Component Parking Lot

These are future candidates only. Do not standardize or migrate them in this phase.

Performance and KPI:

- KPI card.
- KPI list item.
- KPI detail panel.
- KPI progress bar.
- KPI tree node.
- KPI rating badge.

Talent:

- 9-box cell.
- Talent classification badge.
- Talent pool candidate card.
- EQS score display.
- Talent review card.
- Committee decision card.
- Recommendation card.
- Proposal history card.

Employee and profile:

- Employee profile summary.
- Profile popover.
- Profile side panel.
- Profile detail view.

IDP:

- IDP status badge.
- IDP activity card.
- IDP timeline.
- IDP progress pattern.

Job tender:

- Position card.
- Application card.
- Application timeline.
- Job admin card.

Portal operations:

- Offboarding card.
- Onboarding checklist item.
- Survey card.
- Survey analytics block.
- Announcement card.
- Mail-management card.

Promotion rule:

- A domain component can move into shared library scope only after it appears across modules or becomes a stable product pattern with clear reuse.

## 13. Implementation Backlog

Suggested base component order:

1. Button and action patterns.
2. Badge and status indicators.
3. Form field, input, textarea, select, checkbox, radio, switch.
4. Card and surface primitives.
5. Dialog, sheet, popover, and panel patterns.
6. Table and data-display primitives.
7. Tabs, breadcrumbs, pagination, and navigation helpers.
8. Progress, skeleton, empty state, and error state.
9. Metric card and chart container.
10. Admin-only design-system preview route.

Migration rule:

- New work uses shared components first.
- Existing high-touch screens migrate after the preview route validates behavior and states.
- Generated/Figma import surfaces stay legacy unless explicitly selected for conversion.

## 14. Component Build Task List

Use this list as the coding backlog after the design-system docs are accepted. Stitch guidance is intentionally skipped until the parallel Stitch work is ready to be reconciled.

### Inventory And Setup

- Run shadcn project inventory and confirm aliases, Tailwind version, primitive base, and icon library.
- Compare Portal, Talent, and Performance `components/ui` copies.
- Confirm `packages/shared-ui` export structure.
- Decide per component whether the source is shadcn registry adaptation, Talent reference rebuild, or Rinjani-specific pattern.
- Define required states for each component before implementation.

### Foundation

- Theme tokens and CSS variables.
- `cn` utility export if needed.
- Shared focus-ring behavior.
- Tabular numeric typography guidance.
- Status color semantics.

### Actions

- `Button`.
- `IconButton`.
- `ButtonGroup` or `ActionGroup`.
- `ActionChip` - `packages/shared-ui/src/action-chip.tsx`.
- `DropdownMenu` - `packages/shared-ui/src/dropdown-menu.tsx`.

### Inputs And Forms

- `Field`.
- `Input`.
- `Textarea`.
- `Select` - `packages/shared-ui/src/select.tsx`.
- `Combobox` - `packages/shared-ui/src/combobox.tsx`.
- `Checkbox` - `packages/shared-ui/src/checkbox.tsx`.
- `RadioGroup` - `packages/shared-ui/src/radio-group.tsx`.
- `Switch` - `packages/shared-ui/src/switch.tsx`.
- `DateInput` - `packages/shared-ui/src/date-input.tsx`.
- `SearchInput` - `packages/shared-ui/src/search-input.tsx`.
- `InputOTP` if required by auth or verification flows.

### Feedback And Overlays

- `Alert` - `packages/shared-ui/src/alert.tsx`.
- `Banner` - `packages/shared-ui/src/banner.tsx`.
- `Toast` - `packages/shared-ui/src/toast.tsx`.
- `EmptyState` - `packages/shared-ui/src/state.tsx`.
- `ErrorState` - `packages/shared-ui/src/state.tsx`.
- `Dialog` - `packages/shared-ui/src/dialog.tsx`.
- `AlertDialog` - `packages/shared-ui/src/alert-dialog.tsx`.
- `Sheet` - `packages/shared-ui/src/sheet.tsx`.
- `Popover` - `packages/shared-ui/src/popover.tsx`.
- `Tooltip` - `packages/shared-ui/src/tooltip.tsx`.

### Navigation

- `Tabs` - `packages/shared-ui/src/tabs.tsx`.
- `Breadcrumb` - `packages/shared-ui/src/breadcrumb.tsx`.
- `Pagination` - `packages/shared-ui/src/pagination.tsx`.
- `NavigationMenu` or scoped navigation helper if needed.
- `Command` search/action pattern.

### Data Display

- `Card`.
- `Table` - `packages/shared-ui/src/table.tsx`.
- `DataTable` - `packages/shared-ui/src/data-table.tsx`.
- `List` - `packages/shared-ui/src/list.tsx`.
- `DescriptionList` - `packages/shared-ui/src/description-list.tsx`.
- `DetailPanel` - `packages/shared-ui/src/detail-panel.tsx`.
- `ProfileSummary` - `packages/shared-ui/src/profile-summary.tsx`.
- `Accordion` - `packages/shared-ui/src/accordion.tsx`.

### Status And Loading

- `Badge`.
- `StatusLabel` - `packages/shared-ui/src/status-label.tsx`.
- `Progress`.
- `Skeleton` - `packages/shared-ui/src/skeleton.tsx`.
- `Spinner` - `packages/shared-ui/src/spinner.tsx`.
- `LoadingState` - `packages/shared-ui/src/loading-state.tsx`.

### Analytics

- `MetricCard` - `packages/shared-ui/src/analytics.tsx`.
- `ChartContainer` - `packages/shared-ui/src/analytics.tsx`.
- `BarChart` - `packages/shared-ui/src/analytics.tsx`.
- `ProgressCluster` - `packages/shared-ui/src/analytics.tsx`.
- `RankingList` - `packages/shared-ui/src/analytics.tsx`.
- `KpiSummary` as a future composite pattern only, not a global component.

### Preview And QA

- Admin-only `/#/design-system` route.
- Foundation preview for typography, layout, naming conventions, semantics, primitives, and color theory.
- Component state previews.
- Prototype pattern previews.
- Domain parking-lot preview section.
- Build validation.
- Desktop and mobile visual inspection.
- Product-designer review: evaluate visual direction, density, hierarchy, component state coverage, and gaps before migration.

## Product-Designer Review Checklist

Use this checklist after the preview route exists:

- Review foundation previews: color, typography, spacing, radius, and elevation.
- Review Actions: button hierarchy, icon-only affordance, loading state, and destructive treatment.
- Review Inputs: label/helper/error behavior, focus state, disabled state, and form density.
- Review Feedback: alert hierarchy, confirmation patterns, empty state tone, and error recovery.
- Review Navigation: tabs, breadcrumbs, pagination, and whether shell ownership remains clear.
- Review Status Indicators: badge semantics, progress colors, loading states, and whether color meanings are intuitive.
- Review Data Display: card rhythm, table density, detail-panel options, and scanability.
- Review Analytics: metric-card hierarchy, chart-container framing, and numeric readability.
- Review Prototype Patterns: inline card, modal, right-side panel, popover, and full-page tradeoffs.
- Decide which components are approved for migration and which require another iteration.

### Migration Planning

- Identify new screens that should use shared components first.
- Identify high-touch HQ/admin screens for first migration.
- Exclude generated/Figma imports unless selected.
- Track remaining local component usage across Portal, Talent, and Performance.
- Create follow-up migration ExecPlan before refactoring existing screens.

## 15. Preview Route Requirements

Future route:

- `/#/design-system`

Access:

- Permanently admin-only.
- Normal users should not be able to access the route.

Preview content:

- Foundation: color, typography, spacing, radius, elevation.
- Actions: button variants and action groups.
- Feedback: alerts, banners, toasts, validation, confirmations.
- Inputs: fields, helper/error states, switches, selects.
- Navigation: tabs, breadcrumbs, pagination, shell examples.
- Status Indicators: badges, progress, skeleton, empty, error.
- Data Display: cards, table, list, detail panel.
- Analytics: metric cards, chart containers, progress clusters.
- Prototype Patterns: inline card, modal, right-side panel, popover, full detail page.
- Domain parking lot: clearly marked future candidates only.

Validation when implemented:

- Run `npm run build`.
- Visually inspect the route on desktop and mobile.
- Confirm shell remains single-owner.
- Confirm all examples use design-system tokens and shared components.

