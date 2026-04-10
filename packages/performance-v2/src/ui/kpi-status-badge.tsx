import { Badge, badgeVariants } from "@rinjani/shared-ui";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@rinjani/shared-ui";

function humanizeKpiStatusLabel(status: string): string {
  const spaced = status.replaceAll("_", " ").trim().toLowerCase();
  if (!spaced) {
    return status;
  }
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

const statusMap: Record<string, VariantProps<typeof badgeVariants>["variant"]> = {
  DRAFT: "neutral",
  ALLOCATED: "attention",
  WAITING_REVIEW: "neutral",
  WAITING_FOR_APPROVAL: "info",
  PENDING_CLARIFICATION: "warning",
  APPROVED: "success",
  APPROVED_ADJUSTED: "success",
  REJECTED: "destructive",
  VERIFIED: "success",
  SUBMITTED: "neutral",
  ADJUSTED: "warning",
};

export function KpiStatusBadge({ status, className }: { status: string; className?: string }) {
  const variant = statusMap[status] ?? "neutral";
  return (
    <Badge variant={variant} className={cn("font-normal", className)}>
      {humanizeKpiStatusLabel(status)}
    </Badge>
  );
}
