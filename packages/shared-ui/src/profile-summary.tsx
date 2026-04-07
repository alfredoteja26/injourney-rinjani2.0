import * as React from "react";

import { Badge } from "./badge";
import { cn } from "./utils";

type ProfileSummaryProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  description?: React.ReactNode;
  metadata?: React.ReactNode;
  status?: React.ReactNode;
  initials?: string;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  size?: "sm" | "md";
};

function ProfileSummary({
  className,
  name,
  description,
  metadata,
  status,
  initials,
  avatar,
  action,
  size = "md",
  ...props
}: ProfileSummaryProps) {
  const avatarSize = size === "sm" ? "size-9 text-xs" : "size-11 text-sm";

  return (
    <div className={cn("flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card p-4", className)} data-slot="profile-summary" {...props}>
      <div className={cn("flex shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary", avatarSize)} data-slot="profile-summary-avatar">
        {avatar ?? initials ?? name.slice(0, 1)}
      </div>
      <div className="min-w-0 flex-1" data-slot="profile-summary-content">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <p className="truncate text-sm font-semibold text-foreground">{name}</p>
          {status ? <Badge variant="neutral">{status}</Badge> : null}
        </div>
        {description ? <p className="mt-1 truncate text-xs leading-5 text-muted-foreground">{description}</p> : null}
        {metadata ? <div className="mt-1 text-xs text-muted-foreground">{metadata}</div> : null}
      </div>
      {action ? <div className="shrink-0" data-slot="profile-summary-action">{action}</div> : null}
    </div>
  );
}

export { ProfileSummary };
export type { ProfileSummaryProps };
