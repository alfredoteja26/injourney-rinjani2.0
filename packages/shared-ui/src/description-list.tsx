import * as React from "react";

import { cn } from "./utils";

function DescriptionList({ className, ...props }: React.HTMLAttributes<HTMLDListElement>) {
  return <dl className={cn("grid gap-3", className)} data-slot="description-list" {...props} />;
}

function DescriptionListItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1 rounded-lg border border-border bg-card p-3 sm:grid-cols-[160px_1fr] sm:gap-4", className)} data-slot="description-list-item" {...props} />;
}

function DescriptionTerm({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <dt className={cn("text-xs font-semibold uppercase tracking-wide text-muted-foreground", className)} data-slot="description-term" {...props} />;
}

function DescriptionDetails({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <dd className={cn("text-sm font-medium text-foreground", className)} data-slot="description-details" {...props} />;
}

export { DescriptionDetails, DescriptionList, DescriptionListItem, DescriptionTerm };
