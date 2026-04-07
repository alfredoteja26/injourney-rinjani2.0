import * as React from "react";

import { cn } from "./utils";

function DetailPanel({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <aside className={cn("flex flex-col gap-4 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm", className)} data-slot="detail-panel" {...props} />;
}

function DetailPanelHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5", className)} data-slot="detail-panel-header" {...props} />;
}

function DetailPanelTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-semibold leading-tight text-foreground", className)} data-slot="detail-panel-title" {...props} />;
}

function DetailPanelDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-6 text-muted-foreground", className)} data-slot="detail-panel-description" {...props} />;
}

function DetailPanelContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-3", className)} data-slot="detail-panel-content" {...props} />;
}

function DetailPanelFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-wrap items-center gap-2 pt-2", className)} data-slot="detail-panel-footer" {...props} />;
}

export { DetailPanel, DetailPanelContent, DetailPanelDescription, DetailPanelFooter, DetailPanelHeader, DetailPanelTitle };
