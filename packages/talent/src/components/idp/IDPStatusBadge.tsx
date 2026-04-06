import { Badge } from "@/components/ui/badge";
import { cn } from "@/components/ui/utils";

export type IDPStatus = 'draft' | 'pending_approval' | 'approved' | 'revision_requested' | 'completed';

interface IDPStatusBadgeProps {
  status: IDPStatus;
  className?: string;
}

export function IDPStatusBadge({ status, className }: IDPStatusBadgeProps) {
  const styles: Record<IDPStatus, string> = {
    draft: "bg-slate-100 text-slate-700 border-slate-200",
    pending_approval: "bg-orange-100 text-orange-700 border-orange-200",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    revision_requested: "bg-orange-50 text-orange-700 border-orange-200",
    completed: "bg-blue-100 text-blue-700 border-blue-200"
  };

  const labels: Record<IDPStatus, string> = {
    draft: "Draft",
    pending_approval: "Pending Approval",
    approved: "Disetujui",
    revision_requested: "Perlu Revisi",
    completed: "Selesai"
  };

  return (
    <Badge variant="outline" className={cn("font-medium border whitespace-nowrap", styles[status], className)}>
      {labels[status]}
    </Badge>
  );
}
