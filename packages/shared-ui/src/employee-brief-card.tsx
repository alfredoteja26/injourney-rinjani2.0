import * as React from "react";

import { Badge } from "./badge";
import { cn } from "./utils";

type EmployeeAssignmentType = "primary" | "project-assignment" | "talent-mobility";

type EmployeeBriefCardProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  employeeId: React.ReactNode;
  title: React.ReactNode;
  organization: React.ReactNode;
  assignmentType?: EmployeeAssignmentType;
  assignmentLabel?: React.ReactNode;
  location?: React.ReactNode;
  avatar?: React.ReactNode;
  initials?: string;
  action?: React.ReactNode;
};

const assignmentBadgeMap: Record<EmployeeAssignmentType, { label: string; variant: "neutral" | "info" | "attention" }> = {
  primary: { label: "Primary", variant: "neutral" },
  "project-assignment": { label: "Project assignment", variant: "attention" },
  "talent-mobility": { label: "Talent mobility", variant: "info" },
};

function EmployeeBriefCard({
  className,
  name,
  employeeId,
  title,
  organization,
  assignmentType = "primary",
  assignmentLabel,
  location,
  avatar,
  initials,
  action,
  ...props
}: EmployeeBriefCardProps) {
  const assignment = assignmentBadgeMap[assignmentType];

  return (
    <div
      className={cn("flex min-w-0 items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm", className)}
      data-slot="employee-brief-card"
      {...props}
    >
      <div
        className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-semibold text-primary"
        data-slot="employee-brief-card-avatar"
      >
        {avatar ?? initials ?? name.slice(0, 1)}
      </div>
      <div className="min-w-0 flex-1 space-y-2" data-slot="employee-brief-card-content">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <p className="truncate text-sm font-semibold text-foreground">{name}</p>
          <Badge variant={assignment.variant}>{assignmentLabel ?? assignment.label}</Badge>
        </div>
        <div className="space-y-1">
          <p className="font-mono text-xs text-muted-foreground">{employeeId}</p>
          <p className="text-sm text-foreground">{title}</p>
          <p className="text-xs leading-5 text-muted-foreground">
            {organization}
            {location ? <span> · {location}</span> : null}
          </p>
        </div>
      </div>
      {action ? <div className="shrink-0" data-slot="employee-brief-card-action">{action}</div> : null}
    </div>
  );
}

export { EmployeeBriefCard };
export type { EmployeeAssignmentType, EmployeeBriefCardProps };
