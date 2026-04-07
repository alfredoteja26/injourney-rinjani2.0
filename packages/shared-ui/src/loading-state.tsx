import * as React from "react";

import { Spinner } from "./spinner";
import { cn } from "./utils";

function LoadingState({
  className,
  title = "Loading data",
  description = "Please wait while the latest information is being prepared.",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
}) {
  return (
    <div className={cn("flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card p-6 text-center", className)} data-slot="loading-state" {...props}>
      <Spinner aria-label={title} />
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export { LoadingState };
