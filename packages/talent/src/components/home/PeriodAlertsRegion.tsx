import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { homeData } from "../../data/homeData";
import { Link } from "react-router";
import { Target, ClipboardList, Briefcase, ClipboardCheck, X, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useState } from "react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";

export function PeriodAlertsRegion() {
  const { periodAlerts } = homeData;
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const visibleAlerts = periodAlerts.filter(alert => !dismissedIds.includes(alert.id));

  if (visibleAlerts.length === 0) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Target": return <Target size={18} />;
      case "ClipboardList": return <ClipboardList size={18} />;
      case "Briefcase": return <Briefcase size={18} />;
      case "ClipboardCheck": return <ClipboardCheck size={18} />;
      default: return <Info size={18} />;
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "urgent": return "bg-red-50 border-red-200 text-red-900 hover:bg-red-100";
      case "warning": return "bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100";
      case "info": return "bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100";
      default: return "bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100";
    }
  };

  const getSeverityIcon = (severity: string) => {
     switch (severity) {
        case "urgent": return <AlertCircle size={16} className="text-red-600" />;
        case "warning": return <AlertTriangle size={16} className="text-amber-600" />;
        default: return <Info size={16} className="text-blue-600" />;
     }
  };

  const handleDismiss = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissedIds([...dismissedIds, id]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
         <h3 className="text-lg font-semibold text-foreground">Pengingat</h3>
      </div>
      
      <div className="space-y-3">
        {visibleAlerts.slice(0, 5).map((alert) => (
          <Link to={alert.action_url} key={alert.id} className="block group relative">
            <div className={cn(
              "flex items-start gap-4 p-4 rounded-lg border transition-colors",
              getSeverityStyles(alert.severity)
            )}>
              <div className="shrink-0 mt-0.5">
                 {getSeverityIcon(alert.severity)}
              </div>
              
              <div className="flex-1 min-w-0">
                 <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{alert.title}</span>
                    {alert.days_remaining <= 3 && (
                       <span className="text-[10px] bg-red-600 text-white px-1.5 rounded-full font-bold animate-pulse">
                          Urgent
                       </span>
                    )}
                 </div>
                 <p className="text-sm opacity-90 line-clamp-1 mb-2">{alert.description}</p>
                 <div className="flex items-center gap-2 text-xs opacity-75">
                    <span className="flex items-center gap-1">
                       {getIcon(alert.icon)}
                       {alert.module === "idp" ? "Development Plan" : 
                        alert.module === "career_aspiration" ? "Career Aspiration" :
                        alert.module === "job_tender" ? "Job Tender" : "360 Assessment"}
                    </span>
                    <span>•</span>
                    <span>{alert.days_remaining} hari lagi</span>
                 </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0 opacity-50 hover:opacity-100 hover:bg-black/5 -mt-1 -mr-1 rounded-full"
                onClick={(e) => handleDismiss(e, alert.id)}
              >
                <X size={14} />
              </Button>
            </div>
          </Link>
        ))}
        
        {visibleAlerts.length > 5 && (
           <Button variant="link" className="w-full text-sm text-muted-foreground hover:text-primary">
              Lihat Semua ({visibleAlerts.length})
           </Button>
        )}
      </div>
    </div>
  );
}
