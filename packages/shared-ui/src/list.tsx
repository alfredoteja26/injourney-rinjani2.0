import * as React from "react";

import { cn } from "./utils";

function List({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("divide-y divide-border rounded-xl border border-border bg-card", className)} data-slot="list" {...props} />;
}

function ListItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("flex items-start gap-3 p-4", className)} data-slot="list-item" {...props} />;
}

function ListItemContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-w-0 flex-1", className)} data-slot="list-item-content" {...props} />;
}

function ListItemTitle({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("truncate text-sm font-semibold text-foreground", className)} data-slot="list-item-title" {...props} />;
}

function ListItemDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground", className)} data-slot="list-item-description" {...props} />;
}

function ListItemMeta({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("shrink-0 text-xs font-medium text-muted-foreground", className)} data-slot="list-item-meta" {...props} />;
}

export { List, ListItem, ListItemContent, ListItemDescription, ListItemMeta, ListItemTitle };
