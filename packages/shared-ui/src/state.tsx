import * as React from "react";

import { ActionGroup, Button } from "./button";
import { cn } from "./utils";

interface StateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function EmptyState({ className, title, description, action, ...props }: StateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 px-6 py-10 text-center", className)} data-slot="empty-state" {...props}>
      <div className="mb-4 size-10 rounded-full bg-background shadow-xs" aria-hidden="true" />
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p> : null}
      {action ? <ActionGroup className="mt-5 justify-center">{action}</ActionGroup> : null}
    </div>
  );
}

function ErrorState({ className, title, description, action, ...props }: StateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/10 px-6 py-10 text-center", className)} data-slot="error-state" {...props}>
      <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-xs" aria-hidden="true">
        !
      </div>
      <h3 className="text-base font-semibold text-destructive">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm leading-6 text-destructive/80">{description}</p> : null}
      {action ? <ActionGroup className="mt-5 justify-center">{action}</ActionGroup> : <Button variant="outline" className="mt-5">Retry</Button>}
    </div>
  );
}

export { EmptyState, ErrorState };
