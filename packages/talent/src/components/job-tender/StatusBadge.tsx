import { Badge } from "@/components/ui/badge";
import { cn } from "@/components/ui/utils";
import { PositionStatus, ApplicationStatus } from "@/types/job-tender";
import { CheckCircle2, Clock, XCircle, FileText, Search, UserCheck, Calendar, Check, Send } from "lucide-react";

interface StatusBadgeProps {
  status: PositionStatus | ApplicationStatus | string;
  type?: 'position' | 'application';
  className?: string;
}

export function StatusBadge({ status, type = 'position', className }: StatusBadgeProps) {
  let variantClass = "bg-gray-100 text-gray-800 border-gray-200";
  let Icon = Clock;
  let label = status;

  if (type === 'position') {
    switch (status) {
      case 'open':
        variantClass = "bg-green-100 text-green-800 border-green-200";
        Icon = CheckCircle2;
        label = "Open";
        break;
      case 'closed':
        variantClass = "bg-gray-100 text-gray-800 border-gray-200";
        Icon = XCircle;
        label = "Closed";
        break;
      case 'pending_approval':
        variantClass = "bg-yellow-100 text-yellow-800 border-yellow-200";
        Icon = Clock;
        label = "Pending Approval";
        break;
      case 'draft':
        variantClass = "bg-stone-100 text-stone-800 border-stone-200";
        Icon = FileText;
        label = "Draft";
        break;
      case 'cancelled':
        variantClass = "bg-red-100 text-red-800 border-red-200";
        Icon = XCircle;
        label = "Cancelled";
        break;
    }
  } else {
    // Application status
    switch (status) {
      case 'submitted':
        variantClass = "bg-blue-100 text-blue-800 border-blue-200";
        Icon = Send;
        label = "Submitted";
        break;
      case 'screening':
        variantClass = "bg-purple-100 text-purple-800 border-purple-200";
        Icon = Search;
        label = "Screening";
        break;
      case 'shortlisted':
        variantClass = "bg-teal-100 text-teal-800 border-teal-200";
        Icon = CheckCircle2;
        label = "Shortlisted";
        break;
      case 'interview':
        variantClass = "bg-orange-100 text-orange-800 border-orange-200";
        Icon = Calendar;
        label = "Interview";
        break;
      case 'offered':
        variantClass = "bg-green-100 text-green-800 border-green-200";
        Icon = CheckCircle2; // Or a specific offer icon
        label = "Offered";
        break;
      case 'accepted':
        variantClass = "bg-green-100 text-green-800 border-green-200";
        Icon = Check;
        label = "Accepted";
        break;
      case 'rejected':
        variantClass = "bg-red-100 text-red-800 border-red-200";
        Icon = XCircle;
        label = "Rejected";
        break;
      case 'withdrawn':
        variantClass = "bg-stone-100 text-stone-800 border-stone-200";
        Icon = XCircle;
        label = "Withdrawn";
        break;
    }
  }

  return (
    <Badge variant="outline" className={cn("gap-1.5 font-medium border", variantClass, className)}>
      <Icon className="w-3.5 h-3.5" />
      <span className="capitalize">{label}</span>
    </Badge>
  );
}
