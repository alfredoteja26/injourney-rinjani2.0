import { Link } from "react-router";
import { Target, ClipboardList, Briefcase, ClipboardCheck } from "lucide-react";
import { Card } from "../ui/card";
import { homeData } from "../../data/homeData";
import { cn } from "../ui/utils";

export function QuickActionsRegion() {
  const { assessorAssignments } = homeData;
  const pendingAssessments = assessorAssignments.pending_count;

  const actions = [
    {
      label: "Ajukan Aspirasi",
      href: "/talent/career-aspiration",
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Kelola IDP",
      href: "/talent/idp",
      icon: ClipboardList,
      color: "text-success",
      bgColor: "bg-success-muted",
    },
    {
      label: "Jelajahi Lowongan",
      href: "/talent/explore",
      icon: Briefcase,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {actions.map((action) => (
        <Link 
          key={action.href} 
          to={action.href}
          className="group block"
        >
          <Card className="h-full rounded-[20px] border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
            <div className="flex h-full flex-col items-center justify-center gap-3 p-5 text-center">
              <div className={cn("rounded-2xl p-3 transition-transform duration-200 group-hover:scale-105", action.bgColor, action.color)}>
                <action.icon size={24} />
              </div>
              <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                {action.label}
              </span>
            </div>
          </Card>
        </Link>
      ))}

      {pendingAssessments > 0 && (
        <Link to="/talent/360-assessment/assigned" className="group block relative">
          <Card className="h-full overflow-hidden rounded-[20px] border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md">
            <div className="flex h-full flex-col items-center justify-center gap-3 p-5 text-center">
              <div className="rounded-2xl bg-warning-muted p-3 text-warning transition-transform duration-200 group-hover:scale-105">
                <ClipboardCheck size={24} />
              </div>
              <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-secondary">
                Isi Assessment
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white shadow-sm">
                {pendingAssessments}
              </span>
            </div>
          </Card>
        </Link>
      )}
    </div>
  );
}
