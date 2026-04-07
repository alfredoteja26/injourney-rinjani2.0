import * as React from "react";

import { cn } from "./utils";

function Breadcrumb({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav aria-label="breadcrumb" className={cn("text-sm", className)} data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: React.OlHTMLAttributes<HTMLOListElement>) {
  return <ol className={cn("flex flex-wrap items-center gap-1.5 text-muted-foreground", className)} data-slot="breadcrumb-list" {...props} />;
}

function BreadcrumbItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} data-slot="breadcrumb-item" {...props} />;
}

function BreadcrumbLink({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn("transition-colors hover:text-foreground", className)} data-slot="breadcrumb-link" {...props} />;
}

function BreadcrumbPage({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span aria-current="page" className={cn("font-medium text-foreground", className)} data-slot="breadcrumb-page" {...props} />;
}

function BreadcrumbSeparator({ className, children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li aria-hidden="true" className={cn("text-muted-foreground/70", className)} data-slot="breadcrumb-separator" {...props}>
      {children ?? "/"}
    </li>
  );
}

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator };
