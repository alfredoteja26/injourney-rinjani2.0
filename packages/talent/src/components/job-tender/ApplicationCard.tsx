import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/job-tender";
import { StatusBadge } from "./StatusBadge";
import { MapPin, Building2, ChevronRight, Calendar } from "lucide-react";
import { cn } from "@/components/ui/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface ApplicationCardProps {
  application: Application;
  onViewDetail: (id: string) => void;
  className?: string;
}

export function ApplicationCard({ application, onViewDetail, className }: ApplicationCardProps) {
  // Timeline steps
  const steps = [
    { id: 'submitted', label: 'Submit' },
    { id: 'screening', label: 'Screen' },
    { id: 'shortlisted', label: 'Shortlist' },
    { id: 'interview', label: 'Interview' },
    { id: 'offered', label: 'Offer' }
  ];

  // Helper to determine step status
  const getStepStatus = (stepId: string) => {
    const statusOrder = ['submitted', 'screening', 'shortlisted', 'interview', 'offered', 'accepted'];
    const currentStatusIndex = statusOrder.indexOf(application.status);
    const stepIndex = statusOrder.indexOf(stepId);
    
    if (application.status === 'rejected' || application.status === 'withdrawn') {
       // Handle terminal states differently if needed, for now just show completed up to screening usually
       if (stepId === 'submitted') return 'completed';
       return 'pending';
    }

    if (currentStatusIndex >= stepIndex) return 'completed';
    return 'pending';
  };

  return (
    <Card className={cn("hover:shadow-sm transition-all duration-200 border-stone-200", className)}>
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <StatusBadge status={application.status} type="application" />
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Applied: {format(new Date(application.submittedAt), "d MMM yyyy", { locale: id })}
              </span>
            </div>
            <h3 className="font-semibold text-lg text-stone-900 line-clamp-1">
              {application.positionTitle}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500">
               {/* Note: In a real app we might need to fetch position details to get this info if not in Application object */}
               <span className="flex items-center gap-1">
                 <Building2 className="w-3.5 h-3.5" />
                 Human Capital Division
               </span>
               <span className="flex items-center gap-1">
                 <MapPin className="w-3.5 h-3.5" />
                 Jakarta
               </span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:text-primary-hover hover:bg-primary-50 self-start shrink-0"
            onClick={() => onViewDetail(application.id)}
          >
            View Detail <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Mini Timeline */}
        <div className="relative px-2">
          {/* Line */}
          <div className="absolute top-2.5 left-0 w-full h-0.5 bg-stone-100 -z-0" />
          
          <div className="flex justify-between relative z-10">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300",
                    status === 'completed' 
                      ? "bg-primary border-primary" 
                      : "bg-white border-stone-200"
                  )}>
                    {status === 'completed' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className={cn(
                    "text-xs font-medium",
                    status === 'completed' ? "text-primary" : "text-stone-400"
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
