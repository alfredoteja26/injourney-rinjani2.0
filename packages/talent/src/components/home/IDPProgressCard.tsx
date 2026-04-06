import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { cn } from "../ui/utils";
import { homeData } from "../../data/homeData";
import { Link } from "react-router";
import { CheckCircle2, PlayCircle, Circle, Clock, Calendar } from "lucide-react";

export function IDPProgressCard() {
  const { idpRecord } = homeData;

  if (!idpRecord) {
    return (
      <Card className="shadow-sm border-border bg-card h-full">
        <CardHeader className="pb-3">
           <CardTitle className="text-base font-semibold text-foreground">Rencana Pengembangan</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48 text-center space-y-4">
          <p className="text-sm text-muted-foreground">Belum ada rencana pengembangan untuk periode ini</p>
          <Link to="/talent/idp" className="text-sm font-medium text-primary hover:underline">
            Buat IDP
          </Link>
        </CardContent>
      </Card>
    );
  }

  const progressPercent = (idpRecord.completed_hours / idpRecord.total_hours) * 100;
  
  const getStatusColor = (status: string) => {
     switch(status) {
         case "approved": return "bg-emerald-100 text-emerald-700 border-emerald-200";
         case "pending_approval": return "bg-amber-100 text-amber-700 border-amber-200";
         case "draft": return "bg-slate-100 text-slate-700 border-slate-200";
         default: return "bg-slate-100 text-slate-700 border-slate-200";
     }
  };

  return (
    <Link to="/talent/idp" className="block h-full group">
      <Card className="shadow-sm border-border bg-card h-full group-hover:border-primary/50 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            Rencana Pengembangan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="flex justify-between items-start">
             <div>
                <Badge variant="outline" className={cn("mb-2", getStatusColor(idpRecord.status))}>
                   {idpRecord.status_label}
                </Badge>
                <div className="text-xs text-muted-foreground">{idpRecord.cycle_name}</div>
             </div>
             <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                   {idpRecord.completed_hours} <span className="text-sm font-normal text-muted-foreground">/ {idpRecord.total_hours} jam</span>
                </div>
             </div>
          </div>
          
          <div className="space-y-1">
             <Progress value={progressPercent} className="h-2 bg-muted" indicatorClassName="bg-emerald-500" />
             <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>{progressPercent.toFixed(0)}% Selesai</span>
                {idpRecord.completed_hours < idpRecord.min_development_hours && (
                   <span className="text-amber-600 font-medium">Min. {idpRecord.min_development_hours} jam</span>
                )}
             </div>
          </div>

          <div className="flex justify-between gap-2 p-3 bg-muted/30 rounded-lg">
             <div className="flex flex-col items-center flex-1">
                <div className="flex items-center gap-1 text-emerald-600 mb-1">
                   <CheckCircle2 size={14} />
                   <span className="font-bold">{idpRecord.activity_summary.completed}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">Selesai</span>
             </div>
             <div className="w-px bg-border h-8 self-center" />
             <div className="flex flex-col items-center flex-1">
                <div className="flex items-center gap-1 text-blue-600 mb-1">
                   <PlayCircle size={14} />
                   <span className="font-bold">{idpRecord.activity_summary.in_progress}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">Berlangsung</span>
             </div>
             <div className="w-px bg-border h-8 self-center" />
             <div className="flex flex-col items-center flex-1">
                <div className="flex items-center gap-1 text-slate-500 mb-1">
                   <Circle size={14} />
                   <span className="font-bold">{idpRecord.activity_summary.not_started}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">Belum Mulai</span>
             </div>
          </div>

          <div className="h-px bg-border w-full" />
          
          <div>
             <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Aktivitas Terdekat</div>
             <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-50 rounded-md text-orange-600 shrink-0">
                   <Calendar size={18} />
                </div>
                <div>
                   <div className="text-sm font-medium text-foreground line-clamp-1 mb-1">
                      {idpRecord.upcoming_activity.title}
                   </div>
                   <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{new Date(idpRecord.upcoming_activity.target_date).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}</span>
                      <Badge variant="outline" className="h-4 px-1 text-[10px] bg-amber-50 text-amber-700 border-amber-200">
                         {idpRecord.upcoming_activity.priority_label}
                      </Badge>
                   </div>
                </div>
             </div>
          </div>

        </CardContent>
      </Card>
    </Link>
  );
}
