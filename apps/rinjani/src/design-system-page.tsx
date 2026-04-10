import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ActionChip,
  ActionGroup,
  Alert,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDescription,
  AlertTitle,
  Badge,
  Banner,
  BannerContent,
  BannerDescription,
  BannerTitle,
  BarChart,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  Checkbox,
  Combobox,
  CommandMenuDialog,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuList,
  CommandMenuSeparator,
  CommandMenuShortcut,
  DataTable,
  type DataTableColumn,
  DateInput,
  DescriptionDetails,
  DescriptionList,
  DescriptionListItem,
  DescriptionTerm,
  DetailPanel,
  DetailPanelContent,
  DetailPanelDescription,
  DetailPanelFooter,
  DetailPanelHeader,
  DetailPanelTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmployeeBriefCard,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemContent,
  ListItemDescription,
  ListItemMeta,
  ListItemTitle,
  LoadingState,
  MetricCard,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ProfileSummary,
  Progress,
  ProgressCluster,
  RadioGroup,
  RankingList,
  RadioGroupItem,
  Separator,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SearchInput,
  Skeleton,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Spinner,
  StatusLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Toaster,
  toast,
  EmptyState,
  ErrorState,
} from "@rinjani/shared-ui";
import { AlertTriangle, Bell, CheckCircle2, Filter, Grid3X3, Info, Search, Settings, UserRound } from "lucide-react";

const implementedComponents = [
  { name: "cn", path: "packages/shared-ui/src/utils.ts", status: "Implemented", category: "Foundation" },
  { name: "Button", path: "packages/shared-ui/src/button.tsx", status: "Implemented", category: "Actions" },
  { name: "IconButton", path: "packages/shared-ui/src/button.tsx", status: "Implemented", category: "Actions" },
  { name: "ActionGroup", path: "packages/shared-ui/src/button.tsx", status: "Implemented", category: "Actions" },
  { name: "ActionChip", path: "packages/shared-ui/src/action-chip.tsx", status: "Implemented", category: "Actions" },
  { name: "DropdownMenu", path: "packages/shared-ui/src/dropdown-menu.tsx", status: "Implemented", category: "Actions" },
  { name: "CommandMenu", path: "packages/shared-ui/src/command-menu.tsx", status: "Implemented", category: "Actions" },
  { name: "Badge", path: "packages/shared-ui/src/badge.tsx", status: "Implemented", category: "Status Indicators" },
  { name: "Card", path: "packages/shared-ui/src/card.tsx", status: "Implemented", category: "Data Display" },
  { name: "Field", path: "packages/shared-ui/src/field.tsx", status: "Implemented", category: "Inputs" },
  { name: "Label", path: "packages/shared-ui/src/label.tsx", status: "Implemented", category: "Inputs" },
  { name: "Input", path: "packages/shared-ui/src/input.tsx", status: "Implemented", category: "Inputs" },
  { name: "SearchInput", path: "packages/shared-ui/src/search-input.tsx", status: "Implemented", category: "Inputs" },
  { name: "Textarea", path: "packages/shared-ui/src/textarea.tsx", status: "Implemented", category: "Inputs" },
  { name: "Select", path: "packages/shared-ui/src/select.tsx", status: "Implemented", category: "Inputs" },
  { name: "Combobox", path: "packages/shared-ui/src/combobox.tsx", status: "Implemented", category: "Inputs" },
  { name: "DateInput", path: "packages/shared-ui/src/date-input.tsx", status: "Implemented", category: "Inputs" },
  { name: "Checkbox", path: "packages/shared-ui/src/checkbox.tsx", status: "Implemented", category: "Inputs" },
  { name: "RadioGroup", path: "packages/shared-ui/src/radio-group.tsx", status: "Implemented", category: "Inputs" },
  { name: "Switch", path: "packages/shared-ui/src/switch.tsx", status: "Implemented", category: "Inputs" },
  { name: "Progress", path: "packages/shared-ui/src/progress.tsx", status: "Implemented", category: "Status Indicators" },
  { name: "Alert", path: "packages/shared-ui/src/alert.tsx", status: "Implemented", category: "Feedback" },
  { name: "Banner", path: "packages/shared-ui/src/banner.tsx", status: "Implemented", category: "Feedback" },
  { name: "Toast", path: "packages/shared-ui/src/toast.tsx", status: "Implemented", category: "Feedback" },
  { name: "Dialog", path: "packages/shared-ui/src/dialog.tsx", status: "Implemented", category: "Feedback" },
  { name: "AlertDialog", path: "packages/shared-ui/src/alert-dialog.tsx", status: "Implemented", category: "Feedback" },
  { name: "Sheet", path: "packages/shared-ui/src/sheet.tsx", status: "Implemented", category: "Feedback" },
  { name: "Popover", path: "packages/shared-ui/src/popover.tsx", status: "Implemented", category: "Feedback" },
  { name: "Tooltip", path: "packages/shared-ui/src/tooltip.tsx", status: "Implemented", category: "Feedback" },
  { name: "EmptyState", path: "packages/shared-ui/src/state.tsx", status: "Implemented", category: "Feedback" },
  { name: "ErrorState", path: "packages/shared-ui/src/state.tsx", status: "Implemented", category: "Feedback" },
  { name: "Separator", path: "packages/shared-ui/src/separator.tsx", status: "Implemented", category: "Foundation" },
  { name: "Skeleton", path: "packages/shared-ui/src/skeleton.tsx", status: "Implemented", category: "Status Indicators" },
  { name: "Spinner", path: "packages/shared-ui/src/spinner.tsx", status: "Implemented", category: "Status Indicators" },
  { name: "Tabs", path: "packages/shared-ui/src/tabs.tsx", status: "Implemented", category: "Navigation" },
  { name: "Breadcrumb", path: "packages/shared-ui/src/breadcrumb.tsx", status: "Implemented", category: "Navigation" },
  { name: "Pagination", path: "packages/shared-ui/src/pagination.tsx", status: "Implemented", category: "Navigation" },
  { name: "Table", path: "packages/shared-ui/src/table.tsx", status: "Implemented", category: "Data Display" },
  { name: "DataTable", path: "packages/shared-ui/src/data-table.tsx", status: "Implemented", category: "Data Display" },
  { name: "DescriptionList", path: "packages/shared-ui/src/description-list.tsx", status: "Implemented", category: "Data Display" },
  { name: "DetailPanel", path: "packages/shared-ui/src/detail-panel.tsx", status: "Implemented", category: "Data Display" },
  { name: "EmployeeBriefCard", path: "packages/shared-ui/src/employee-brief-card.tsx", status: "Implemented", category: "Data Display" },
  { name: "List", path: "packages/shared-ui/src/list.tsx", status: "Implemented", category: "Data Display" },
  { name: "ProfileSummary", path: "packages/shared-ui/src/profile-summary.tsx", status: "Implemented", category: "Data Display" },
  { name: "Accordion", path: "packages/shared-ui/src/accordion.tsx", status: "Implemented", category: "Data Display" },
  { name: "LoadingState", path: "packages/shared-ui/src/loading-state.tsx", status: "Implemented", category: "Status Indicators" },
  { name: "StatusLabel", path: "packages/shared-ui/src/status-label.tsx", status: "Implemented", category: "Status Indicators" },
  { name: "MetricCard", path: "packages/shared-ui/src/analytics.tsx", status: "Implemented", category: "Analytics" },
  { name: "ChartContainer", path: "packages/shared-ui/src/analytics.tsx", status: "Implemented", category: "Analytics" },
  { name: "BarChart", path: "packages/shared-ui/src/analytics.tsx", status: "Implemented", category: "Analytics" },
  { name: "ProgressCluster", path: "packages/shared-ui/src/analytics.tsx", status: "Implemented", category: "Analytics" },
  { name: "RankingList", path: "packages/shared-ui/src/analytics.tsx", status: "Implemented", category: "Analytics" },
];

const plannedComponents = [
];

const backlogComponents = [
];

const componentStates: Record<string, string> = {
  cn: "class merge utility",
  Button: "primary, secondary, outline, ghost, destructive, link, loading, disabled",
  IconButton: "icon, size variants, accessible label, disabled",
  ActionGroup: "inline, wrapped toolbar",
  ActionChip: "neutral, selected, attention, destructive, sm/md/lg",
  DropdownMenu: "group, separator, destructive item, disabled item, aligned content",
  CommandMenu: "dialog, grouped items, search, empty, shortcut, disabled item",
  Badge: "neutral, info, success, warning, destructive, attention",
  Card: "header, content, footer, action slot",
  Field: "label, helper, error",
  Label: "default, field label",
  Input: "default, placeholder, error, disabled",
  SearchInput: "icon, clear action, table search, global search visual",
  Textarea: "default, placeholder, error, disabled",
  Select: "single, placeholder, grouped-ready, disabled-ready",
  Checkbox: "checked, unchecked, disabled",
  RadioGroup: "single choice, disabled-ready",
  Switch: "checked, unchecked, disabled",
  Progress: "primary, success, warning, destructive",
  Alert: "neutral, info, success, warning, destructive",
  Banner: "neutral, info, success, warning, destructive",
  Dialog: "modal, header, footer, close action",
  AlertDialog: "destructive confirmation, cancel, action",
  Sheet: "right, left, top, bottom, floating, dim overlay, blur overlay, no overlay",
  Popover: "aligned contextual content",
  Tooltip: "short helper text",
  EmptyState: "title, description, action",
  ErrorState: "title, description, recovery action",
  Separator: "horizontal divider",
  Skeleton: "text/card/table placeholder",
  Spinner: "inline loading",
  Tabs: "list, trigger, content, disabled trigger",
  Breadcrumb: "link, separator, current page",
  Pagination: "previous, next, page link, ellipsis",
  Table: "basic, header, body, row, cell, loading skeleton, caption-ready",
  DataTable: "search, sort, column visibility, pagination, empty state; row selection and row actions future",
  DescriptionList: "term/detail metadata rows",
  DetailPanel: "header, content, footer, supporting panel",
  EmployeeBriefCard: "assignment-aware employee identity card with primary and secondary role contexts",
  LoadingState: "panel/page loading copy",
  Combobox: "searchable selection, descriptions, disabled option",
  DateInput: "single date, disabled-ready",
  Toast: "success, info, warning, error, loading, dismiss",
  List: "compact, interactive, metadata, action-ready",
  ProfileSummary: "avatar, initials, identity, metadata, status, action",
  Accordion: "single, multiple, collapsible, disabled item",
  StatusLabel: "neutral, info, success, warning, destructive, optional dot",
  MetricCard: "value, label, trend, comparison",
  ChartContainer: "title, legend, empty state",
  BarChart: "x-axis, y-axis, hover tooltip, animated hover bars",
  ProgressCluster: "grouped progress",
  RankingList: "ordered list, score, trend",
};

const componentInventory = [
  ...implementedComponents.map((component) => ({ ...component, states: componentStates[component.name] ?? "default", lastUpdated: "2026-04-07" })),
  ...backlogComponents.map((component) => ({ ...component, states: componentStates[component.name] ?? "TBD" })),
];

const componentSections = [
  { id: "implementation", label: "Implementation Status" },
  { id: "actions", label: "Actions & Status" },
  { id: "feedback", label: "Feedback States" },
  { id: "overlays", label: "Overlays & Menus" },
  { id: "inputs", label: "Inputs & Forms" },
  { id: "navigation", label: "Navigation & Loading" },
  { id: "data-display", label: "Data Display" },
  { id: "analytics", label: "Analytics" },
  { id: "next", label: "Next Components" },
] as const;

type ComponentSectionId = (typeof componentSections)[number]["id"];

const colorTokens = [
  { name: "Primary", token: "--primary", value: "#006573", usage: "Authority, primary actions, focus identity.", className: "bg-primary" },
  { name: "Secondary", token: "--secondary", value: "#F47C20", usage: "Warm emphasis and attention moments.", className: "bg-secondary" },
  { name: "Accent", token: "--accent", value: "#90BC40", usage: "Growth, success-adjacent emphasis, chart support.", className: "bg-accent" },
  { name: "Destructive", token: "--destructive", value: "#BC2419", usage: "Critical and destructive states.", className: "bg-destructive" },
  { name: "Muted", token: "--muted", value: "#F2F4F7", usage: "Subtle surfaces and quiet sections.", className: "bg-muted" },
  { name: "Border", token: "--border", value: "#EAECF0", usage: "Default dividers and contained surfaces.", className: "bg-border" },
  { name: "Success", token: "--success", value: "#10B981", usage: "Approved or successful state semantics.", className: "bg-success" },
  { name: "Warning", token: "--warning", value: "#F59E0B", usage: "Waiting, caution, or needs-attention state semantics.", className: "bg-warning" },
];

const typographyScale = [
  { role: "Display", className: "text-4xl font-bold tracking-tight", sample: "Talent readiness snapshot", note: "Major dashboard or landing headings." },
  { role: "Page title", className: "text-3xl font-bold tracking-tight", sample: "Rinjani 2.0 Design System", note: "Top-level page title." },
  { role: "Section title", className: "text-xl font-semibold", sample: "Component Library", note: "Major content section." },
  { role: "Card title", className: "text-base font-semibold", sample: "Implementation Status", note: "Card and panel title." },
  { role: "Body", className: "text-sm leading-6", sample: "Use semantic tokens and shared components for consistent Rinjani screens.", note: "Standard UI copy." },
  { role: "Metadata", className: "text-xs leading-5 text-muted-foreground", sample: "Updated 07 Apr 2026", note: "Supporting labels and helper text." },
  { role: "Numeric", className: "text-2xl font-bold tabular-nums", sample: "72%", note: "Dashboard numbers use Plus Jakarta Sans with tabular numerals." },
  { role: "Monospace metadata", className: "font-mono text-xs tracking-normal", sample: "EMP-2026-0407 / sync:ok", note: "JetBrains Mono is reserved for structured technical metadata, IDs, and code-like values." },
];

const layoutTokens = [
  { name: "Surface radius", value: "rounded-xl / rounded-2xl", usage: "Cards, panels, and preview surfaces. Global radius is now slightly softer." },
  { name: "Section gap", value: "gap-6", usage: "Primary vertical rhythm between major blocks." },
  { name: "Card padding", value: "p-5 / p-6", usage: "Contained surfaces and design-system documentation blocks." },
  { name: "Shell content max", value: "max-w-7xl", usage: "Admin/system pages that need wide but bounded content." },
  { name: "Focus ring", value: "ring-ring", usage: "Keyboard-visible focus affordance." },
  { name: "Elevation", value: "shadow-sm / shadow-md", usage: "Subtle enterprise depth, not floating decorative layers." },
];

const layoutPatterns = [
  { name: "Page shell", usage: "One persistent integrated shell owns navbar/sidebar/header. Module pages render content only." },
  { name: "Content hierarchy", usage: "Use one page title, grouped sections, and explicit supporting panels for scanability." },
  { name: "Responsive grid", usage: "Prefer 1-column mobile, 2-column working layouts, and wide bounded content for admin/system pages." },
  { name: "Density modes", usage: "Use compact density for tables and metadata, but keep form/edit flows more breathable." },
  { name: "Inspection patterns", usage: "Use DetailPanel or Sheet before Modal when users need to preserve parent-page context." },
  { name: "State coverage", usage: "Every layout should define loading, empty, error, and overflow behavior before migration." },
];

const approvedKawungFactor = {
  name: "Factor 09",
  file: "kawung-factor-09-small-teal-left.svg",
  tile: "kawung-factor-09-tile.svg",
  warmTile: "kawung-factor-09-tile-orange.svg",
  alertTile: "kawung-factor-09-tile-red.svg",
  usage: "Clean small kawung motif for repeated sidebar texture and subtle silhouette fills.",
};

const employeeRows = [
  { id: "1", employee: "Binavia Utama", status: "Approved", readiness: "Ready now", score: 92, unit: "Human Capital" },
  { id: "2", employee: "Nadia Prameswari", status: "Waiting", readiness: "Ready soon", score: 81, unit: "Airport Services" },
  { id: "3", employee: "Raka Mahendra", status: "In review", readiness: "Monitor", score: 74, unit: "Commercial" },
  { id: "4", employee: "Dewi Maharani", status: "Approved", readiness: "Ready now", score: 88, unit: "Strategy" },
  { id: "5", employee: "Arman Laksana", status: "Rejected", readiness: "Needs support", score: 61, unit: "Operations" },
  { id: "6", employee: "Rania Salsabila", status: "Waiting", readiness: "Ready soon", score: 79, unit: "Finance" },
];

const employeeColumns: DataTableColumn[] = [
  { id: "employee", header: "Employee", accessorKey: "employee", enableSorting: true, enableHiding: false },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    enableSorting: true,
    cell: (value) => {
      const label = String(value);
      const variant = label === "Approved" ? "success" : label === "Waiting" ? "warning" : label === "Rejected" ? "destructive" : "info";
      return <Badge variant={variant}>{label}</Badge>;
    },
  },
  { id: "readiness", header: "Readiness", accessorKey: "readiness", enableSorting: true },
  { id: "unit", header: "Unit", accessorKey: "unit", enableSorting: true },
  { id: "score", header: "Score", accessorKey: "score", enableSorting: true, cell: (value) => <span className="tabular-nums">{String(value)}</span> },
];

const employeeBriefCards = [
  {
    name: "Binavia Utama",
    employeeId: "24070418",
    title: "Senior Manager, Human Capital Strategy",
    organization: "Human Capital",
    location: "Head Office",
    assignmentType: "primary" as const,
    initials: "BU",
  },
  {
    name: "Binavia Utama",
    employeeId: "24070418",
    title: "Transformation Program Lead",
    organization: "Talent Mobility Office",
    location: "Cross-functional assignment",
    assignmentType: "talent-mobility" as const,
    initials: "BU",
  },
  {
    name: "Dewi Maharani",
    employeeId: "19030177",
    title: "PMO Lead, Airport Service Blueprint",
    organization: "Project Assignment",
    location: "Airport Services",
    assignmentType: "project-assignment" as const,
    initials: "DM",
  },
];

const progressClusterItems = [
  { label: "Talent review completion", value: 72, description: "Committee review against current cycle", variant: "success" as const },
  { label: "IDP follow-up", value: 46, description: "Plans that already have measurable next action", variant: "warning" as const },
  { label: "Critical blocker closure", value: 18, description: "High-risk items that still need intervention", variant: "destructive" as const },
];

const rankingItems = [
  { label: "Human Capital", description: "Ready-now successors", value: "92%", tone: "success" as const },
  { label: "Airport Services", description: "Committee-approved readiness", value: "84%", tone: "success" as const },
  { label: "Operations", description: "Needs additional IDP follow-up", value: "61%", tone: "warning" as const },
];

const readinessChartData = [
  { label: "HC", value: 42, detail: "Human Capital readiness: 42%", tone: "success" as const },
  { label: "AS", value: 31, detail: "Airport Services readiness: 31%", tone: "warning" as const },
  { label: "OPS", value: 27, detail: "Operations readiness: 27%", tone: "destructive" as const },
  { label: "COM", value: 36, detail: "Commercial readiness: 36%", tone: "primary" as const },
  { label: "STR", value: 51, detail: "Strategy readiness: 51%", tone: "success" as const },
  { label: "FIN", value: 44, detail: "Finance readiness: 44%", tone: "primary" as const },
];

const reviewerOptions = [
  { value: "talent-committee", label: "Talent Committee", description: "Cross-unit talent review group" },
  { value: "hc-admin", label: "HC Admin", description: "Human Capital operational admin" },
  { value: "unit-leader", label: "Unit Leader", description: "Business unit approver" },
  { value: "archived", label: "Archived reviewer", description: "Disabled historical option", disabled: true },
];

export function DesignSystemPage() {
  const [activeComponentSection, setActiveComponentSection] = useState<ComponentSectionId>("implementation");

  return (
    <main className="min-h-full bg-background px-6 py-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Admin-only design system</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Rinjani 2.0 Design System</h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                This admin-only hub previews the design-system foundations and shared-ui components implemented so far. Use it to review
                tokens, typography, layout behavior, component density, and state coverage before migration.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          <FoundationSwatch label="Authority Teal" value="#006573" className="bg-primary" />
          <FoundationSwatch label="Journey Orange" value="#F47C20" className="bg-secondary" />
          <FoundationSwatch label="Growth Green" value="#90BC40" className="bg-accent" />
          <FoundationSwatch label="Critical Red" value="#BC2419" className="bg-destructive" />
        </section>

        <Tabs defaultValue="components" className="flex flex-col gap-6">
          <Toaster />
          <TabsList className="w-fit">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="mt-0">
            <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
              <Card className="h-fit xl:sticky xl:top-6">
                <CardHeader>
                  <CardTitle>Component Categories</CardTitle>
                  <CardDescription>Select a category to keep this preview focused.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  {componentSections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveComponentSection(section.id)}
                      className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                        activeComponentSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </CardContent>
              </Card>

              <div className="flex min-w-0 flex-col gap-6">
        {activeComponentSection === "implementation" ? (
        <section className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Status</CardTitle>
              <CardDescription>Shared-ui component inventory, implementation state, source path, and basic version-tracking date.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Component</th>
                      <th className="px-4 py-3 font-semibold">Category</th>
                      <th className="px-4 py-3 font-semibold">Available states / variants</th>
                      <th className="px-4 py-3 font-semibold">Path</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Last updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {componentInventory.map((component) => (
                      <tr key={component.name} className="bg-card">
                        <td className="px-4 py-3 font-medium text-foreground">{component.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{component.category}</td>
                        <td className="px-4 py-3 text-muted-foreground">{component.states}</td>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{component.path}</td>
                        <td className="px-4 py-3">
                          <Badge variant={component.status === "Implemented" ? "success" : "neutral"}>{component.status}</Badge>
                        </td>
                        <td className="px-4 py-3 text-xs tabular-nums text-muted-foreground">{component.lastUpdated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
        ) : null}

        {activeComponentSection === "actions" ? (
        <section className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Button, IconButton, and ActionGroup variants.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ComponentPreviewTitle title="Button" description="Primary command variants." />
              <ActionGroup>
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </ActionGroup>
              <ComponentPreviewTitle title="IconButton and loading Button" description="Compact commands and async action state." />
              <ActionGroup>
                <Button loading>Loading</Button>
                <Button variant="link">Link action</Button>
                <IconButton aria-label="Search" variant="outline">
                  <Search />
                </IconButton>
                <IconButton aria-label="Open filters" variant="secondary">
                  <Filter />
                </IconButton>
                <IconButton aria-label="Settings" variant="ghost">
                  <Settings />
                </IconButton>
              </ActionGroup>
              <ComponentPreviewTitle title="ActionChip" description="Larger interactive chip for filters and compact commands." />
              <div className="flex flex-wrap gap-2">
                <ActionChip>All employees</ActionChip>
                <ActionChip variant="selected">Selected module</ActionChip>
                <ActionChip variant="attention">Needs review</ActionChip>
                <ActionChip variant="destructive">Blocked</ActionChip>
                <ActionChip size="lg">Project assignment</ActionChip>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                <span className="font-semibold text-foreground">Chip guidance:</span> use `Badge` for non-interactive status or metadata, and use `ActionChip`
                for selectable filters or compact commands. Both preserve normal casing by default; reserve all-caps for deliberate metadata labels only.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Indicators</CardTitle>
              <CardDescription>Badge and Progress semantic variants.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <ComponentPreviewTitle title="Badge" description="Compact non-interactive status labels." />
              <ActionGroup>
                <Badge>Draft</Badge>
                <Badge variant="info">In review</Badge>
                <Badge variant="success">Approved</Badge>
                <Badge variant="warning">Waiting</Badge>
                <Badge variant="attention">Needs action</Badge>
                <Badge variant="destructive">Rejected</Badge>
              </ActionGroup>
              <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
                Badge labels should follow authored casing such as `Primary`, `Talent mobility`, or `Project assignment`. Do not force uppercase unless the screen is explicitly using a metadata label treatment.
              </div>
              <ComponentPreviewTitle title="StatusLabel" description="Text-first status indicator for metadata rows and compact summaries." />
              <div className="grid gap-3 rounded-lg border border-border p-4 sm:grid-cols-2">
                <StatusLabel variant="neutral">Draft</StatusLabel>
                <StatusLabel variant="info">In review</StatusLabel>
                <StatusLabel variant="success">Approved</StatusLabel>
                <StatusLabel variant="warning">Waiting review</StatusLabel>
                <StatusLabel variant="destructive">Rejected</StatusLabel>
                <StatusLabel variant="success" showDot={false}>Approved without dot</StatusLabel>
              </div>
              <ComponentPreviewTitle title="Progress" description="Completion against a target with semantic variants." />
              <div className="flex flex-col gap-4">
                <ProgressExample label="Primary progress" value={52} />
                <ProgressExample label="Success progress" value={78} variant="success" />
                <ProgressExample label="Warning progress" value={38} variant="warning" />
                <ProgressExample label="Destructive progress" value={18} variant="destructive" />
              </div>
            </CardContent>
          </Card>
        </section>
        ) : null}

        {activeComponentSection === "feedback" ? (
        <section className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
              <CardDescription>Banner, Alert, EmptyState, ErrorState, Spinner, and Skeleton.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ComponentPreviewTitle title="Banner" description="Persistent page-level or section-level message." />
              <Banner variant="info">
                <Info className="mt-0.5 size-4 shrink-0" />
                <BannerContent>
                  <BannerTitle>System review window</BannerTitle>
                  <BannerDescription>Use Banner for page-level conditions that should stay visible while users work.</BannerDescription>
                </BannerContent>
              </Banner>
              <ComponentPreviewTitle title="Alert" description="Inline feedback for local section state." />
              <Alert variant="info">
                <Info />
                <AlertTitle>Component library note</AlertTitle>
                <AlertDescription>These examples use shared-ui components and semantic tokens.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <CheckCircle2 />
                <AlertTitle>Build passed</AlertTitle>
                <AlertDescription>The current component batch compiles in the integrated app.</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTriangle />
                <AlertTitle>Review required</AlertTitle>
                <AlertDescription>Visual approval is still needed before migrating existing screens.</AlertDescription>
              </Alert>
              <ComponentPreviewTitle title="Toast" description="Temporary feedback after user action." />
              <ActionGroup>
                <Button
                  variant="outline"
                  onClick={() => toast.success("Profile review saved", { description: "The update is now visible in the admin queue." })}
                >
                  Success toast
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.error("Sync failed", { description: "Retry the request before escalating this issue." })}
                >
                  Error toast
                </Button>
              </ActionGroup>
              <ComponentPreviewTitle title="Spinner" description="Short inline loading indicator." />
              <div className="flex items-center gap-3 rounded-lg border border-border p-4 text-sm text-muted-foreground">
                <Spinner />
                Loading example with shared spinner
              </div>
              <ComponentPreviewTitle title="Skeleton" description="Known loading layout placeholder." />
              <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Empty And Error States</CardTitle>
              <CardDescription>Recovery-oriented states for dashboard and table flows.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ComponentPreviewTitle title="EmptyState" description="No data, no result, or first-use state with recovery action." />
              <EmptyState
                title="No employees found"
                description="Try adjusting the filters or search query before creating a new record."
                action={<Button variant="outline">Reset filters</Button>}
              />
              <Separator />
              <ComponentPreviewTitle title="ErrorState" description="Failed loading or blocked flow with recovery action." />
              <ErrorState
                title="Failed to load KPI data"
                description="The data request did not complete. Retry before escalating this issue."
                action={<Button variant="destructive">Retry request</Button>}
              />
            </CardContent>
          </Card>
        </section>
        ) : null}

        {activeComponentSection === "overlays" ? (
        <section className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Overlays And Menus</CardTitle>
              <CardDescription>Dialog, AlertDialog, Sheet, Popover, Tooltip, and DropdownMenu.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <ComponentPreviewTitle title="Dialog" description="Short focused task without leaving the page." />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Review employee profile</DialogTitle>
                    <DialogDescription>Use Dialog for short, focused tasks that do not need a persistent side panel.</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save review</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <ComponentPreviewTitle title="AlertDialog" description="High-impact or destructive confirmation." />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Open alert</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reject this request?</AlertDialogTitle>
                    <AlertDialogDescription>This action should only be used for high-impact confirmations.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Reject request</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <ComponentPreviewTitle title="Sheet" description="Right-side inspect or edit panel that preserves page context." />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary">Open sheet</Button>
                </SheetTrigger>
                <SheetContent presentation="floating" overlay="blur">
                  <SheetHeader>
                    <SheetTitle>Employee brief profile</SheetTitle>
                    <SheetDescription>Floating drawer with right-slide animation, rounded corners, and blurred overlay.</SheetDescription>
                  </SheetHeader>
                  <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
                    Right-side panel example for profile details, review notes, or approval metadata.
                  </div>
                  <SheetFooter>
                    <Button variant="outline">Close</Button>
                    <Button>Apply changes</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <Sheet modal={false}>
                <SheetTrigger asChild>
                  <Button variant="outline">Non-modal drawer</Button>
                </SheetTrigger>
                <SheetContent presentation="floating" overlay="none">
                  <SheetHeader>
                    <SheetTitle>Non-modal drawer</SheetTitle>
                    <SheetDescription>Use this when the parent page should remain visually stable and interactive strategy is approved.</SheetDescription>
                  </SheetHeader>
                  <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
                    Non-modal drawer preview without overlay.
                  </div>
                </SheetContent>
              </Sheet>

              <ComponentPreviewTitle title="Popover" description="Small contextual details or compact controls." />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <p className="text-sm font-semibold text-foreground">Popover guidance</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Use Popover for small contextual controls or supporting details.</p>
                </PopoverContent>
              </Popover>

              <ComponentPreviewTitle title="DropdownMenu" description="Secondary contextual actions." />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">More actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Review actions</DropdownMenuLabel>
                  <DropdownMenuItem>Open details</DropdownMenuItem>
                  <DropdownMenuItem>Assign reviewer</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem destructive>Reject request</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ComponentPreviewTitle title="CommandMenu" description="Search-driven command palette for top-navbar search interactions." />
              <CommandMenuDialog
                trigger={
                  <DialogTrigger asChild>
                    <Button className="w-fit" variant="outline">Open command menu</Button>
                  </DialogTrigger>
                }
              >
                <CommandMenuInput placeholder="Search modules, people, or policies..." />
                <CommandMenuList>
                  <CommandMenuEmpty>No command found.</CommandMenuEmpty>
                  <CommandMenuGroup heading="Navigation">
                    <CommandMenuItem>
                      Talent Pool
                      <CommandMenuShortcut>Ctrl+T</CommandMenuShortcut>
                    </CommandMenuItem>
                    <CommandMenuItem>
                      KPI Headquarter
                      <CommandMenuShortcut>Ctrl+K</CommandMenuShortcut>
                    </CommandMenuItem>
                  </CommandMenuGroup>
                  <CommandMenuSeparator />
                  <CommandMenuGroup heading="People">
                    <CommandMenuItem>Open Binavia Utama profile</CommandMenuItem>
                    <CommandMenuItem>Open Nadia Prameswari profile</CommandMenuItem>
                  </CommandMenuGroup>
                </CommandMenuList>
              </CommandMenuDialog>

              <ComponentPreviewTitle title="Tooltip" description="Short non-critical helper text." />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <IconButton aria-label="Tooltip example" variant="ghost">
                      <Info />
                    </IconButton>
                  </TooltipTrigger>
                  <TooltipContent>Tooltip is for short non-critical helper text.</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overlay Usage Rules</CardTitle>
              <CardDescription>Quick decision guide for choosing the right overlay pattern.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-muted-foreground">
              <p><span className="font-semibold text-foreground">Dialog:</span> focused short task or confirmation flow.</p>
              <p><span className="font-semibold text-foreground">AlertDialog:</span> destructive or high-impact confirmation only.</p>
              <p><span className="font-semibold text-foreground">Sheet:</span> side inspection/edit panel that preserves page context.</p>
              <p><span className="font-semibold text-foreground">Popover:</span> contextual details or compact controls.</p>
              <p><span className="font-semibold text-foreground">Tooltip:</span> short, non-critical helper text.</p>
              <p><span className="font-semibold text-foreground">DropdownMenu:</span> secondary contextual actions, not primary page navigation.</p>
            </CardContent>
          </Card>
        </section>
        ) : null}

        {activeComponentSection === "inputs" ? (
        <section className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Inputs And Fields</CardTitle>
              <CardDescription>Field composition with label, helper, error, Input, and Textarea.</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <ComponentPreviewTitle title="Input" description="Single-line text entry." />
                  <FieldLabel htmlFor="employee-name">Employee name</FieldLabel>
                  <Input id="employee-name" placeholder="Enter employee name" />
                  <FieldDescription>Use the official employee name from HR records.</FieldDescription>
                </Field>
                <Field>
                  <ComponentPreviewTitle title="SearchInput" description="Search entry for tables, local filters, and global search surfaces." />
                  <FieldLabel htmlFor="employee-search">Search employees</FieldLabel>
                  <SearchInput id="employee-search" defaultValue="talent" placeholder="Search by employee, unit, or readiness..." onClear={() => undefined} />
                  <FieldDescription>Use CommandMenu for global command behavior; use SearchInput for visible local filtering.</FieldDescription>
                </Field>
                <Field>
                  <ComponentPreviewTitle title="Select" description="Bounded choice with one current value." />
                  <FieldLabel>Employee segment</FieldLabel>
                  <Select defaultValue="talent">
                    <SelectTrigger aria-label="Employee segment">
                      <SelectValue placeholder="Select segment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="talent">Talent pool</SelectItem>
                      <SelectItem value="successor">Successor candidate</SelectItem>
                      <SelectItem value="review">Under review</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>Use Select for bounded choices with a clear current value.</FieldDescription>
                </Field>
                <Field>
                  <ComponentPreviewTitle title="Combobox" description="Searchable selection for longer option sets." />
                  <FieldLabel>Reviewer group</FieldLabel>
                  <Combobox options={reviewerOptions} value="talent-committee" placeholder="Select reviewer group" />
                  <FieldDescription>Use Combobox when options need search, descriptions, or async-ready behavior.</FieldDescription>
                </Field>
                <Field>
                  <ComponentPreviewTitle title="DateInput" description="Single date capture with the shared input rhythm." />
                  <FieldLabel htmlFor="review-date">Review date</FieldLabel>
                  <DateInput id="review-date" defaultValue="2026-04-07" />
                  <FieldDescription>Use DateInput for single-date capture. Range selection is intentionally deferred.</FieldDescription>
                </Field>
                <Field>
                  <ComponentPreviewTitle title="Textarea" description="Multi-line freeform text entry." />
                  <FieldLabel htmlFor="review-note">Review note</FieldLabel>
                  <Textarea id="review-note" placeholder="Add short review notes" />
                </Field>
                <Field>
                  <ComponentPreviewTitle title="Checkbox, Switch, and RadioGroup" description="Boolean, immediate setting, and single-choice patterns." />
                  <FieldLabel>Review policy</FieldLabel>
                  <div className="grid gap-3 rounded-lg border border-border p-3">
                    <label className="flex items-center gap-2 text-sm text-foreground">
                      <Checkbox defaultChecked aria-label="Notify reviewer" />
                      Notify reviewer when status changes
                    </label>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-foreground">Enable admin-only review note</span>
                      <Switch defaultChecked aria-label="Enable admin-only review note" />
                    </div>
                    <RadioGroup defaultValue="structured">
                      <label className="flex items-center gap-2 text-sm text-foreground">
                        <RadioGroupItem value="structured" aria-label="Structured review" />
                        Structured review
                      </label>
                      <label className="flex items-center gap-2 text-sm text-foreground">
                        <RadioGroupItem value="freeform" aria-label="Freeform review" />
                        Freeform review
                      </label>
                    </RadioGroup>
                  </div>
                </Field>
                <Field>
                  <ComponentPreviewTitle title="Input error state" description="Invalid control paired with helper error copy." />
                  <FieldLabel htmlFor="required-note">Required note</FieldLabel>
                  <Input id="required-note" aria-invalid placeholder="Missing approval reason" />
                  <FieldError>This field is required before submitting the approval.</FieldError>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </section>
        ) : null}

        {activeComponentSection === "navigation" ? (
        <section className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
              <CardDescription>Breadcrumb and Pagination for nested pages and record lists.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <ComponentPreviewTitle title="Breadcrumb" description="Nested admin/detail page orientation." />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#/">Portal</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#/talent">Talent</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Employee Profile</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <ComponentPreviewTitle title="Pagination" description="Table and list pagination controls." />
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious>Previous</PaginationPrevious>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#/design-system" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#/design-system">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext>Next</PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status And Loading</CardTitle>
              <CardDescription>LoadingState for page or panel loading, separate from inline Spinner.</CardDescription>
            </CardHeader>
            <CardContent>
              <ComponentPreviewTitle title="LoadingState" description="Panel or page-level loading state with copy." />
              <LoadingState title="Loading employee data" description="Preparing the latest employee profile and review metadata." />
            </CardContent>
          </Card>
        </section>
        ) : null}

        {activeComponentSection === "data-display" ? (
        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Data Display</CardTitle>
              <CardDescription>Base table for dense comparable records with standardized radius and cell padding.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <ComponentPreviewTitle title="Table" description="Dense comparable records when the screen does not need advanced table behavior." />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Readiness</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Binavia Utama</TableCell>
                    <TableCell><Badge variant="success">Approved</Badge></TableCell>
                    <TableCell>Ready now</TableCell>
                    <TableCell className="text-right tabular-nums">92</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Nadia Prameswari</TableCell>
                    <TableCell><Badge variant="warning">Waiting</Badge></TableCell>
                    <TableCell>Ready soon</TableCell>
                    <TableCell className="text-right tabular-nums">81</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Raka Mahendra</TableCell>
                    <TableCell><Badge variant="info">In review</Badge></TableCell>
                    <TableCell>Monitor</TableCell>
                    <TableCell className="text-right tabular-nums">74</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <ComponentPreviewTitle title="DataTable" description="Search, sortable columns, column visibility, pagination, and empty state." />
              <DataTable columns={employeeColumns} data={employeeRows} searchPlaceholder="Search employees, units, or readiness..." pageSize={3} />
              <ComponentPreviewBlock title="DataTable empty state" description="No-result state after filters, search, or an empty dataset.">
                <DataTable columns={employeeColumns} data={[]} searchPlaceholder="Search empty dataset..." pageSize={3} />
              </ComponentPreviewBlock>
              <ComponentPreviewBlock title="Table loading skeleton" description="Known-layout loading state before dense records are available.">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Readiness</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="ml-auto h-4 w-10" /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ComponentPreviewBlock>
              <ComponentPreviewBlock title="List" description="Compact record list for small groups, notifications, or related items.">
                <List>
                  <ListItem>
                    <ListItemContent>
                      <ListItemTitle>Talent committee meeting</ListItemTitle>
                      <ListItemDescription>Prepare successor readiness summary for the upcoming review cycle.</ListItemDescription>
                    </ListItemContent>
                    <ListItemMeta>Today</ListItemMeta>
                  </ListItem>
                  <ListItem>
                    <ListItemContent>
                      <ListItemTitle>IDP follow-up</ListItemTitle>
                      <ListItemDescription>Three plans need additional reviewer notes before approval.</ListItemDescription>
                    </ListItemContent>
                    <ListItemMeta>3 items</ListItemMeta>
                  </ListItem>
                  <ListItem>
                    <ListItemContent>
                      <ListItemTitle>Profile update</ListItemTitle>
                      <ListItemDescription>New employee metadata is ready to sync into Talent.</ListItemDescription>
                    </ListItemContent>
                    <ListItemMeta>Sync</ListItemMeta>
                  </ListItem>
                </List>
              </ComponentPreviewBlock>
              <ComponentPreviewBlock title="ProfileSummary" description="Generic identity summary for a person or actor, without domain-specific profile behavior.">
                <ProfileSummary
                  name="Binavia Utama"
                  description="Senior Manager, Human Capital"
                  initials="BU"
                  avatar={<UserRound className="size-5" aria-hidden="true" />}
                  metadata={<span>Employee ID: <span className="font-mono tabular-nums">24070418</span></span>}
                  status="Active"
                  action={<Button size="sm" variant="outline">Open</Button>}
                />
                <ProfileSummary
                  name="Nadia Prameswari"
                  description="Airport Services reviewer"
                  initials="NP"
                  metadata={<span>Last synced: today</span>}
                  status="In review"
                  size="sm"
                />
              </ComponentPreviewBlock>
              <ComponentPreviewBlock
                title="EmployeeBriefCard"
                description="Assignment-aware employee card for primary position, talent mobility, and project assignment."
              >
                <div className="grid gap-3">
                  {employeeBriefCards.map((employee) => (
                    <EmployeeBriefCard
                      key={`${employee.employeeId}-${employee.assignmentType}`}
                      name={employee.name}
                      employeeId={employee.employeeId}
                      title={employee.title}
                      organization={employee.organization}
                      location={employee.location}
                      assignmentType={employee.assignmentType}
                      initials={employee.initials}
                      action={<Button size="sm" variant="outline">Open</Button>}
                    />
                  ))}
                </div>
              </ComponentPreviewBlock>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <DetailPanel>
              <DetailPanelHeader>
                <ComponentPreviewTitle title="DetailPanel" description="Inline inspection panel for selected record metadata." />
                <DetailPanelTitle>Selected employee</DetailPanelTitle>
                <DetailPanelDescription>Use DetailPanel when a selected row needs supporting metadata without opening a modal.</DetailPanelDescription>
              </DetailPanelHeader>
              <DetailPanelContent>
                <ComponentPreviewTitle title="DescriptionList" description="Structured metadata pairs." />
                <DescriptionList>
                  <DescriptionListItem>
                    <DescriptionTerm>Role</DescriptionTerm>
                    <DescriptionDetails>Senior Manager, Human Capital</DescriptionDetails>
                  </DescriptionListItem>
                  <DescriptionListItem>
                    <DescriptionTerm>Readiness</DescriptionTerm>
                    <DescriptionDetails>Ready now</DescriptionDetails>
                  </DescriptionListItem>
                  <DescriptionListItem>
                    <DescriptionTerm>Reviewer</DescriptionTerm>
                    <DescriptionDetails>Talent Committee</DescriptionDetails>
                  </DescriptionListItem>
                </DescriptionList>
              </DetailPanelContent>
              <DetailPanelFooter>
                <Button variant="outline">View profile</Button>
                <Button>Open review</Button>
              </DetailPanelFooter>
            </DetailPanel>

            <Card>
              <CardHeader>
                <CardTitle>Disclosure</CardTitle>
                <CardDescription>Accordion for secondary details inside dense pages.</CardDescription>
              </CardHeader>
              <CardContent>
                <ComponentPreviewBlock title="Accordion" description="Collapsible content for secondary information that should not dominate the page.">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="policy">
                      <AccordionTrigger>Review policy</AccordionTrigger>
                      <AccordionContent>Use Accordion for secondary explanations, supporting requirements, or optional details.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="history">
                      <AccordionTrigger>Approval history</AccordionTrigger>
                      <AccordionContent>Keep the summary visible and hide lower-priority detail until requested.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="disabled" disabled>
                      <AccordionTrigger>Archived detail</AccordionTrigger>
                      <AccordionContent>Disabled content should remain readable but unavailable.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </ComponentPreviewBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Table State Recommendations</CardTitle>
                <CardDescription>States to keep visible before real table migrations begin.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Previewed now:</span> base table, searchable and sortable
                  DataTable, column visibility, pagination, empty state, and loading skeleton.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Standard spacing:</span> header cells and row cells now share the same horizontal inset, while
                  body rows get slightly taller vertical padding to improve scanning against the table outline.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Next table states:</span> row selection, row actions, error
                  state, filter chips, sticky header, and saved column preferences for admin-heavy screens.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        ) : null}

        {activeComponentSection === "analytics" ? (
        <section className="grid content-start gap-6">
          <section className="grid items-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col gap-5">
              <ComponentPreviewBlock title="MetricCard" description="Single numeric signal with trend and supporting text.">
              <MetricCard
                label="Leadership pipeline"
                value="68%"
                trend="+12%"
                trendTone="success"
                description="Ready-now and ready-soon employees across mapped critical roles."
                supportingValue="Compared with previous cycle"
              />
              </ComponentPreviewBlock>

              <ComponentPreviewBlock title="ProgressCluster" description="Grouped completion states that should be compared together.">
              <ProgressCluster items={progressClusterItems} />
              </ComponentPreviewBlock>
            </div>

            <div className="flex flex-col gap-5">
              <ComponentPreviewBlock title="ChartContainer" description="Chart shell with title, description, legend, and empty-state support.">
              <ChartContainer
                title="Readiness distribution"
                description="Use this wrapper around chart implementations so chart metadata and empty states stay consistent."
                legend={[
                  { label: "Ready now", value: "42%", tone: "success" },
                  { label: "Ready soon", value: "31%", tone: "warning" },
                  { label: "Needs support", value: "27%", tone: "destructive" },
                ]}
              >
                <BarChart data={readinessChartData} yAxisLabel="Readiness %" xAxisLabel="Unit" />
              </ChartContainer>
              </ComponentPreviewBlock>

              <ComponentPreviewBlock title="RankingList" description="Ordered comparison display for segments, units, or cohorts.">
              <RankingList items={rankingItems} />
              </ComponentPreviewBlock>
            </div>
          </section>
        </section>
        ) : null}

        {activeComponentSection === "next" ? (
        <section className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Next Components</CardTitle>
              <CardDescription>Planned components for the next implementation batches.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {plannedComponents.map((component) => (
                  <ActionChip key={component} type="button">
                    {component}
                  </ActionChip>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                These components are not implemented yet. They should be added after reviewing this first batch and confirming whether
                the visual density, token usage, and interaction states are acceptable.
              </p>
            </CardContent>
          </Card>
        </section>
        ) : null}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tokens" className="mt-0 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Assets</CardTitle>
                <CardDescription>Approved Rinjani logo and supergraphic assets imported for shell review.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="text-sm font-semibold text-foreground">Transparent logo</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">Preferred shell logo for teal or dark surfaces.</p>
                    <div className="mt-4 rounded-xl bg-primary p-5">
                      <img src="/brand/rinjani-logo-transparent.png" alt="Rinjani InJourney HCMS transparent logo" className="h-20 w-auto object-contain" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="text-sm font-semibold text-foreground">White-background logo</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">Use as a light-background reference or framed fallback.</p>
                    <div className="mt-4 rounded-xl border border-border bg-white p-5">
                      <img src="/brand/rinjani-hcms-logo-white-bg.png" alt="Rinjani InJourney HCMS logo with white background" className="h-20 w-auto object-contain" />
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-border bg-primary">
                  <div className="relative min-h-[320px] p-6">
                    <img src="/brand/rinjani-supergraphic.svg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-screen" />
                    <div className="relative flex h-full min-h-[272px] flex-col justify-between">
                      <div>
                        <p className="text-sm font-semibold text-primary-foreground">Rinjani supergraphic</p>
                        <p className="mt-2 max-w-md text-sm leading-6 text-primary-foreground/75">
                          Use as low-opacity shell texture only. Navigation readability stays more important than decoration.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-4 text-sm text-primary-foreground/85 backdrop-blur">
                        Candidate use: sidebar texture, empty editorial area, or brand documentation preview. Avoid using it behind dense table content.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kawung Factor Extraction</CardTitle>
                <CardDescription>
                  Current approved clean extraction reference. Warm recolors are used for shell texture so the motif does not disappear into the teal sidebar.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <div className="flex h-56 items-center justify-center bg-primary p-6">
                    <img
                      src={`/brand/kawung-factors/${approvedKawungFactor.file}`}
                      alt={`${approvedKawungFactor.name} kawung factor`}
                      className="h-full w-full object-contain opacity-80 mix-blend-screen"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-foreground">{approvedKawungFactor.name}</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{approvedKawungFactor.usage}</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-border bg-primary">
                  <div
                    className="h-full min-h-[18rem] p-6"
                    style={{
                      backgroundImage: `url(/brand/kawung-factors/${approvedKawungFactor.warmTile})`,
                      backgroundRepeat: "repeat",
                      backgroundSize: "72px 72px",
                    }}
                  >
                    <div className="flex h-full min-h-[15rem] flex-col justify-between rounded-2xl bg-primary/70 p-5 text-primary-foreground backdrop-blur-[1px]">
                      <div>
                        <p className="text-sm font-semibold">Warm repeated tile preview</p>
                        <p className="mt-2 max-w-lg text-sm leading-6 text-primary-foreground/75">
                          The kawung factor should act as a small repeated texture, not as one oversized decorative asset.
                        </p>
                      </div>
                      <p className="text-xs leading-5 text-primary-foreground/65">Recommended starting size: 56-88px tile, low opacity, masked or contained inside selected shell surfaces.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sidebar Kawung Trials</CardTitle>
                <CardDescription>Controlled texture candidates for collapsed and expanded shell states.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-3">
                <div className="overflow-hidden rounded-2xl border border-border bg-primary">
                  <div
                    className="relative h-80 w-20"
                    style={{
                      backgroundImage: `url(/brand/kawung-factors/${approvedKawungFactor.warmTile})`,
                      backgroundRepeat: "repeat",
                      backgroundSize: "56px 56px",
                    }}
                  >
                    <div className="absolute inset-0 bg-primary/82" />
                    <div className="relative flex h-full flex-col items-center justify-between p-3">
                      <img src="/brand/rinjani-logo-transparent.png" alt="Rinjani logo collapsed preview" className="h-9 w-9 object-contain" />
                      <div className="flex flex-col gap-4 text-primary-foreground/70">
                        <Grid3X3 className="size-5" />
                        <Search className="size-5" />
                        <Bell className="size-5" />
                      </div>
                      <div className="size-8 rounded-full bg-white/15" />
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-border bg-primary">
                  <div
                    className="relative h-80 p-4"
                    style={{
                      backgroundImage: `url(/brand/kawung-factors/${approvedKawungFactor.warmTile})`,
                      backgroundRepeat: "repeat",
                      backgroundSize: "72px 72px",
                    }}
                  >
                    <div className="absolute inset-y-0 left-0 w-28 bg-primary/50" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/88 to-primary/96" />
                    <div className="relative flex h-full flex-col justify-between">
                      <img src="/brand/rinjani-logo-transparent.png" alt="Rinjani logo expanded preview" className="h-12 w-auto object-contain object-left" />
                      <div className="grid gap-2">
                        {["Home", "Career Aspiration", "Development Plan", "Talent Pool"].map((item, index) => (
                          <div key={item} className={`rounded-xl px-3 py-2 text-sm ${index === 0 ? "bg-white/12 text-primary-foreground" : "text-primary-foreground/72"}`}>
                            {item}
                          </div>
                        ))}
                      </div>
                      <div className="rounded-xl bg-white/10 p-3 text-xs text-primary-foreground/75">Profile trigger</div>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-border bg-primary">
                  <div className="relative h-80 p-4">
                    <div
                      aria-hidden="true"
                      className="absolute -right-16 top-8 size-64 rounded-full opacity-35 mix-blend-screen"
                      style={{
                        backgroundImage: `url(/brand/kawung-factors/${approvedKawungFactor.alertTile})`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "64px 64px",
                      }}
                    />
                    <div className="relative flex h-full flex-col justify-between">
                      <p className="text-sm font-semibold text-primary-foreground">Silhouette texture</p>
                      <p className="max-w-[14rem] text-xs leading-5 text-primary-foreground/75">
                        Better when the shell needs a controlled brand accent instead of a full patterned background.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Color Token Map</CardTitle>
                  <CardDescription>Core semantic tokens currently exposed through `packages/shared-ui/src/theme.css`.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {colorTokens.map((token) => (
                    <TokenRow key={token.token} {...token} />
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Token Usage Rules</CardTitle>
                  <CardDescription>How these tokens should be used in new shared components and screens.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm leading-6 text-muted-foreground">
                  <p><span className="font-semibold text-foreground">Use semantic tokens first.</span> Components should use `bg-primary`, `text-muted-foreground`, `border-border`, `ring-ring`, `text-destructive`, `text-success`, and `text-warning` instead of raw hex values.</p>
                  <p><span className="font-semibold text-foreground">Brand book is a guardrail.</span> InJourney color logic informs the system, but brand collateral colors should not override Rinjani UI tokens without explicit approval.</p>
                  <p><span className="font-semibold text-foreground">Status meaning must stay stable.</span> Success means approved/completed, warning means waiting/caution, destructive means critical/rejected.</p>
                  <p><span className="font-semibold text-foreground">Domain colors stay controlled.</span> KPI, 9-box, and other HR-domain colors should remain documented as future domain patterns until migration starts.</p>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="typography" className="mt-0 flex flex-col gap-6">
            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Typography System</CardTitle>
                  <CardDescription>Rinjani uses Plus Jakarta Sans for product UI; serif usage remains deferred.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {typographyScale.map((item) => (
                    <TypographySpec key={item.role} {...item} />
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Typeface Policy</CardTitle>
                  <CardDescription>Current font decisions for product and data-heavy screens.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm leading-6 text-muted-foreground">
                  <p><span className="font-semibold text-foreground">Primary UI:</span> Plus Jakarta Sans via the design-system sans token.</p>
                  <p><span className="font-semibold text-foreground">Component preview labels:</span> same sans token, not JetBrains Mono. They now use normal capitalization to avoid an overly technical look.</p>
                  <p><span className="font-semibold text-foreground">Numeric UI:</span> Plus Jakarta Sans with `tabular-nums` for dashboard values and comparable numbers.</p>
                  <p><span className="font-semibold text-foreground">Monospace:</span> JetBrains Mono only for structured technical metadata or code-like values, not regular component titles.</p>
                  <p><span className="font-semibold text-foreground">Serif:</span> deferred. No Georgia or other serif token should be used in operational product UI during this phase.</p>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="layout" className="mt-0 flex flex-col gap-6">
            <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Layout Primitives</CardTitle>
                  <CardDescription>Spacing, radius, elevation, density, and responsive structure used by the current preview.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {layoutTokens.map((item) => (
                    <LayoutTokenRow key={item.name} {...item} />
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Layout Preview</CardTitle>
                  <CardDescription>Example rhythm for admin pages and design-system documentation pages.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-4 rounded-xl border border-border bg-muted/40 p-4 lg:grid-cols-[1fr_280px]">
                    <div className="grid gap-4">
                      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                        <p className="text-base font-semibold text-foreground">Primary content surface</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">Use this rhythm for working pages with dense HR data and clear section hierarchy.</p>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <MetricPreview label="Readiness" value="72%" />
                        <MetricPreview label="Approved" value="184" />
                        <MetricPreview label="Pending" value="29" />
                      </div>
                    </div>
                    <DetailPanel>
                      <DetailPanelHeader>
                        <DetailPanelTitle>Supporting panel</DetailPanelTitle>
                        <DetailPanelDescription>Secondary details should support scanability, not compete with the main surface.</DetailPanelDescription>
                      </DetailPanelHeader>
                    </DetailPanel>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">Shell/navbar/sidebar visual redesign is intentionally separate and will use the approved manual Figma direction before implementation.</p>
                </CardContent>
              </Card>
            </section>

            <Card>
              <CardHeader>
                <CardTitle>Layout Coverage Model</CardTitle>
                <CardDescription>Additional layout rules based on the design-system references and Rinjani integrated-product needs.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                {layoutPatterns.map((item) => (
                  <LayoutTokenRow key={item.name} {...item} value="rule" />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

function FoundationSwatch({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className={`h-20 rounded-lg ${className}`} />
        <p className="mt-4 text-sm font-semibold text-foreground">{label}</p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}

function TokenRow({
  name,
  token,
  value,
  usage,
  className,
}: {
  name: string;
  token: string;
  value: string;
  usage: string;
  className: string;
}) {
  return (
    <div className="grid gap-3 rounded-lg border border-border p-3 sm:grid-cols-[56px_1fr]">
      <div className={`h-12 rounded-md border border-border ${className}`} />
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <Badge variant="neutral">{token}</Badge>
          <span className="text-xs tabular-nums text-muted-foreground">{value}</span>
        </div>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{usage}</p>
      </div>
    </div>
  );
}

function MetricPreview({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/50 p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold tabular-nums text-foreground">{value}</p>
    </div>
  );
}

function ComponentPreviewTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className="w-full">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
    </div>
  );
}

function ComponentPreviewBlock({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <ComponentPreviewTitle title={title} description={description} />
      {children}
    </div>
  );
}

function TypographySpec({ role, className, sample, note }: { role: string; className: string; sample: string; note: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold text-foreground">{role}</p>
        <Badge variant="neutral">{className}</Badge>
      </div>
      <p className={className}>{sample}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{note}</p>
    </div>
  );
}

function LayoutTokenRow({ name, value, usage }: { name: string; value: string; usage: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold text-foreground">{name}</p>
        <Badge variant="neutral">{value}</Badge>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{usage}</p>
    </div>
  );
}

function ProgressExample({
  label,
  value,
  variant,
}: {
  label: string;
  value: number;
  variant?: "primary" | "success" | "warning" | "destructive";
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="tabular-nums text-muted-foreground">{value}%</span>
      </div>
      <Progress value={value} variant={variant} aria-label={label} />
    </div>
  );
}
