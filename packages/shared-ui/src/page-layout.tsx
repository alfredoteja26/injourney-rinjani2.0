import * as React from "react";

import { Badge } from "./badge";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { cn } from "./utils";

type PageLayoutVariant = "dashboard" | "workspace" | "governance";
type Tone = "neutral" | "info" | "success" | "warning" | "destructive";

const pageHeaderVariantClasses: Record<PageLayoutVariant, string> = {
  dashboard: "rounded-[28px] border border-border/80 bg-card px-6 py-6 shadow-sm",
  workspace: "rounded-[24px] border border-border/80 bg-card px-6 py-5 shadow-sm",
  governance: "rounded-[24px] border border-border/80 bg-card px-6 py-5 shadow-sm",
};

const statCardToneClasses: Record<Tone, string> = {
  neutral: "border-border bg-card",
  info: "border-primary/20 bg-primary/5",
  success: "border-success/20 bg-success-muted/70",
  warning: "border-warning/20 bg-warning-muted/85",
  destructive: "border-destructive/20 bg-destructive/5",
};

const statValueToneClasses: Record<Tone, string> = {
  neutral: "text-foreground",
  info: "text-primary",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
};

const statusBadgeMap: Record<string, "neutral" | "info" | "success" | "warning" | "destructive" | "attention"> = {
  active: "info",
  approved: "success",
  completed: "success",
  success: "success",
  pending: "warning",
  pending_approval: "warning",
  in_progress: "info",
  warning: "warning",
  draft: "neutral",
  neutral: "neutral",
  info: "info",
  destructive: "destructive",
  rejected: "destructive",
  revision_requested: "destructive",
  error: "destructive",
  attention: "attention",
};

type PageHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  variant?: PageLayoutVariant;
};

function PageHeader({
  className,
  title,
  description,
  eyebrow,
  actions,
  badge,
  variant = "workspace",
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", pageHeaderVariantClasses[variant], className)} {...props}>
      <div className="min-w-0 space-y-2">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</p> : null}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          {badge}
        </div>
        {description ? <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}

type SectionPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  contentClassName?: string;
};

function SectionPanel({ className, title, description, actions, contentClassName, children, ...props }: SectionPanelProps) {
  return (
    <Card className={cn("gap-0 rounded-[24px]", className)} {...props}>
      {title || description || actions ? (
        <CardHeader className="px-6 pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-1">
              {title ? <CardTitle className="text-xl font-semibold">{title}</CardTitle> : null}
              {description ? <CardDescription className="max-w-3xl">{description}</CardDescription> : null}
            </div>
            {actions ? <CardAction className="col-start-auto row-span-1 row-start-auto self-start justify-self-auto">{actions}</CardAction> : null}
          </div>
        </CardHeader>
      ) : null}
      <CardContent className={cn("px-6 pb-6", title || description || actions ? "pt-5" : "pt-6", contentClassName)}>{children}</CardContent>
    </Card>
  );
}

type StatCardProps = React.HTMLAttributes<HTMLDivElement> & {
  label: React.ReactNode;
  value: React.ReactNode;
  description?: React.ReactNode;
  supportingText?: React.ReactNode;
  icon?: React.ReactNode;
  tone?: Tone;
};

function StatCard({
  className,
  label,
  value,
  description,
  supportingText,
  icon,
  tone = "neutral",
  ...props
}: StatCardProps) {
  return (
    <div className={cn("rounded-[20px] border p-5 shadow-sm", statCardToneClasses[tone], className)} {...props}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <div className={cn("text-4xl font-bold tracking-tight tabular-nums", statValueToneClasses[tone])}>{value}</div>
          {description ? <p className="text-sm leading-6 text-foreground">{description}</p> : null}
        </div>
        {icon ? <div className={cn("shrink-0", statValueToneClasses[tone])}>{icon}</div> : null}
      </div>
      {supportingText ? <p className="mt-4 text-xs font-medium text-muted-foreground">{supportingText}</p> : null}
    </div>
  );
}

function StatCardGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4", className)} {...props} />;
}

type FilterRailProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actionsClassName?: string;
};

function FilterRail({ className, title, description, actionsClassName, children, ...props }: FilterRailProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-[24px] border border-border bg-card px-4 py-4 shadow-sm lg:flex-row lg:items-start lg:justify-between lg:px-5",
        className,
      )}
      {...props}
    >
      {title || description ? (
        <div className="min-w-0 lg:max-w-sm">
          {title ? <p className="text-sm font-semibold text-foreground">{title}</p> : null}
          {description ? <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p> : null}
        </div>
      ) : null}
      <div className={cn("flex flex-1 flex-wrap items-start gap-3", actionsClassName)}>{children}</div>
    </div>
  );
}

type StatusBadgeProps = React.ComponentPropsWithoutRef<typeof Badge> & {
  status?: string;
};

function StatusBadge({ status, variant, children, className, ...props }: StatusBadgeProps) {
  const resolvedVariant = variant ?? (status ? statusBadgeMap[status.toLowerCase()] ?? "neutral" : "neutral");
  const label = children ?? status;

  return (
    <Badge variant={resolvedVariant} className={cn("px-2.5 py-0.5 font-semibold", className)} {...props}>
      {label}
    </Badge>
  );
}

export { FilterRail, PageHeader, SectionPanel, StatCard, StatCardGroup, StatusBadge };
export type { FilterRailProps, PageHeaderProps, SectionPanelProps, StatCardProps, StatusBadgeProps };
