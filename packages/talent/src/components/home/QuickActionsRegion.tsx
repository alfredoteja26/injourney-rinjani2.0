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
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100"
    },
    {
      label: "Kelola IDP",
      href: "/talent/idp",
      icon: ClipboardList,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100"
    },
    {
      label: "Jelajahi Lowongan",
      href: "/talent/explore",
      icon: Briefcase,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {actions.map((action) => (
        <Link 
          key={action.href} 
          to={action.href}
          className="group block"
        >
          <Card className="h-full border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200 bg-card">
            <div className="p-4 flex flex-col items-center justify-center text-center gap-3 h-full">
              <div className={cn("p-3 rounded-full transition-transform group-hover:scale-110 duration-200", action.bgColor, action.color)}>
                <action.icon size={24} />
              </div>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {action.label}
              </span>
            </div>
          </Card>
        </Link>
      ))}

      {pendingAssessments > 0 && (
        <Link to="/talent/360-assessment/assigned" className="group block relative">
          <Card className="h-full border border-border hover:border-orange-300 hover:shadow-md transition-all duration-200 bg-card overflow-hidden">
            <div className="p-4 flex flex-col items-center justify-center text-center gap-3 h-full">
              <div className="p-3 rounded-full bg-orange-50 text-orange-600 transition-transform group-hover:scale-110 duration-200">
                <ClipboardCheck size={24} />
              </div>
              <span className="text-sm font-semibold text-foreground group-hover:text-orange-600 transition-colors">
                Isi Assessment
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm animate-pulse">
                {pendingAssessments}
              </span>
            </div>
          </Card>
        </Link>
      )}
    </div>
  );
}
