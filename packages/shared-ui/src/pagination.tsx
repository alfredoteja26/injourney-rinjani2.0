import * as React from "react";

import { Button } from "./button";
import { cn } from "./utils";

function Pagination({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav aria-label="pagination" className={cn("flex w-full justify-center", className)} data-slot="pagination" {...props} />;
}

function PaginationContent({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("flex flex-row items-center gap-1", className)} data-slot="pagination-content" {...props} />;
}

function PaginationItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  isActive?: boolean;
};

function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        isActive && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        className,
      )}
      data-slot="pagination-link"
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof Button>) {
  return <Button variant="outline" size="sm" className={cn("gap-1", className)} data-slot="pagination-previous" {...props} />;
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof Button>) {
  return <Button variant="outline" size="sm" className={cn("gap-1", className)} data-slot="pagination-next" {...props} />;
}

function PaginationEllipsis({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span aria-hidden="true" className={cn("flex size-9 items-center justify-center text-muted-foreground", className)} data-slot="pagination-ellipsis" {...props}>...</span>;
}

export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious };
