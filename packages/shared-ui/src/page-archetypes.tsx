import * as React from "react";

import { cn } from "./utils";

type PageArchetypeVariant = "dashboard-hub" | "workspace-explorer" | "governance-cockpit" | "detail-workspace";
type PageArchetypeToolbarModel = "inline" | "side-rail" | "hybrid";
type PageArchetypeSectionTone = "default" | "muted" | "accent";

const frameClasses: Record<PageArchetypeVariant, string> = {
  "dashboard-hub": "border-primary/15 bg-gradient-to-br from-primary/5 via-background to-secondary/10",
  "workspace-explorer": "border-border/80 bg-gradient-to-br from-muted/50 via-background to-muted/20",
  "governance-cockpit": "border-primary/15 bg-gradient-to-b from-background via-background to-primary/5",
  "detail-workspace": "border-border/80 bg-gradient-to-br from-background via-background to-muted/35",
};

const canvasClasses: Record<PageArchetypeVariant, string> = {
  "dashboard-hub": "bg-background/95",
  "workspace-explorer": "bg-background/96",
  "governance-cockpit": "bg-background",
  "detail-workspace": "bg-background/97",
};

const sectionToneClasses: Record<PageArchetypeSectionTone, string> = {
  default: "border-border/80 bg-card",
  muted: "border-border/70 bg-muted/40",
  accent: "border-primary/15 bg-primary/5",
};

const toolbarModelClasses: Record<PageArchetypeToolbarModel, string> = {
  inline: "border-border/80 bg-background/95",
  "side-rail": "border-border/80 bg-muted/35",
  hybrid: "border-primary/15 bg-background/95 ring-1 ring-primary/10",
};

type PageArchetypePreviewFrameProps = React.HTMLAttributes<HTMLDivElement> & {
  variant: PageArchetypeVariant;
  label: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  headerMeta?: React.ReactNode;
  actions?: React.ReactNode;
};

function PageArchetypePreviewFrame({
  className,
  variant,
  label,
  title,
  description,
  headerMeta,
  actions,
  children,
  ...props
}: PageArchetypePreviewFrameProps) {
  return (
    <div className={cn("overflow-hidden rounded-[32px] border p-3 shadow-sm", frameClasses[variant], className)} {...props}>
      <div className="mb-3 flex items-center justify-between rounded-[22px] border border-border/70 bg-card/80 px-4 py-3 backdrop-blur">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
            {headerMeta}
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        {actions ? <div className="hidden shrink-0 items-center gap-2 lg:flex">{actions}</div> : null}
      </div>
      <div className={cn("rounded-[26px] border border-border/70 p-5 shadow-sm", canvasClasses[variant])}>{children}</div>
    </div>
  );
}

function PageArchetypeToolbar({
  className,
  model,
  title,
  description,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  model: PageArchetypeToolbarModel;
  title?: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-[22px] border px-4 py-4 shadow-sm lg:flex-row lg:items-start lg:justify-between",
        toolbarModelClasses[model],
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
      <div className="flex flex-1 flex-wrap items-start gap-3">{children}</div>
    </div>
  );
}

function PageArchetypeSidebar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <aside className={cn("rounded-[22px] border border-border/80 bg-card p-4 shadow-sm", className)} {...props}>
      {children}
    </aside>
  );
}

function PageArchetypeSection({
  className,
  tone = "default",
  title,
  description,
  actions,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  tone?: PageArchetypeSectionTone;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <section className={cn("rounded-[24px] border p-5 shadow-sm", sectionToneClasses[tone], className)} {...props}>
      {title || description || actions ? (
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            {title ? <p className="text-base font-semibold text-foreground">{title}</p> : null}
            {description ? <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p> : null}
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export {
  PageArchetypePreviewFrame,
  PageArchetypeSection,
  PageArchetypeSidebar,
  PageArchetypeToolbar,
};
export type {
  PageArchetypePreviewFrameProps,
  PageArchetypeSectionTone,
  PageArchetypeToolbarModel,
  PageArchetypeVariant,
};
