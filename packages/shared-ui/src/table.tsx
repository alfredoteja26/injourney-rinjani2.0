import * as React from "react";

import { cn } from "./utils";

function Table({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-auto" data-slot="table-container">
      <table className={cn("w-full caption-bottom text-sm", className)} data-slot="table" {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("border-b border-border bg-muted/70", className)} data-slot="table-header" {...props} />;
}

function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} data-slot="table-body" {...props} />;
}

function TableFooter({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tfoot className={cn("border-t border-border bg-muted font-medium", className)} data-slot="table-footer" {...props} />;
}

function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("border-b border-border transition-colors hover:bg-muted/40", className)} data-slot="table-row" {...props} />;
}

function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn("h-10 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground", className)} data-slot="table-head" {...props} />;
}

function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-4 py-3 align-middle text-foreground", className)} data-slot="table-cell" {...props} />;
}

function TableCaption({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return <caption className={cn("mt-4 text-sm text-muted-foreground", className)} data-slot="table-caption" {...props} />;
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
