import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { cn } from "../ui/utils";
import { homeData } from "../../data/homeData";
import { Link } from "react-router";
import { CheckCircle2, PlayCircle, Circle, Calendar } from "lucide-react";
import { StatusBadge } from "@rinjani/shared-ui";

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
  
  return (
    <Link to="/talent/idp" className="block h-full group">
      <Card className="h-full border-border bg-card shadow-sm transition-colors group-hover:border-primary/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            Rencana Pengembangan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="flex justify-between items-start">
             <div>
                <StatusBadge status={idpRecord.status} className="mb-2">
                  {idpRecord.status_label}
                </StatusBadge>
                <div className="text-xs text-muted-foreground">{idpRecord.cycle_name}</div>
             </div>
             <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                   {idpRecord.completed_hours} <span className="text-sm font-normal text-muted-foreground">/ {idpRecord.total_hours} jam</span>
                </div>
             </div>
          </div>
          
          <div className="space-y-1">
             <Progress value={progressPercent} className="h-2 bg-muted" indicatorClassName="bg-success" />
             <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>{progressPercent.toFixed(0)}% Selesai</span>
                {idpRecord.completed_hours < idpRecord.min_development_hours && (
                   <span className="font-medium text-warning">Min. {idpRecord.min_development_hours} jam</span>
                )}
             </div>
          </div>

          <div className="flex justify-between gap-2 rounded-xl bg-muted/40 p-3">
             <div className="flex flex-col items-center flex-1">
                <div className="mb-1 flex items-center gap-1 text-success">
                   <CheckCircle2 size={14} />
                   <span className="font-bold">{idpRecord.activity_summary.completed}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">Selesai</span>
             </div>
             <div className="w-px bg-border h-8 self-center" />
             <div className="flex flex-col items-center flex-1">
                <div className="mb-1 flex items-center gap-1 text-primary">
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
                <div className="shrink-0 rounded-md bg-warning-muted p-2 text-warning">
                   <Calendar size={18} />
                </div>
                <div>
                   <div className="text-sm font-medium text-foreground line-clamp-1 mb-1">
                      {idpRecord.upcoming_activity.title}
                   </div>
                   <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{new Date(idpRecord.upcoming_activity.target_date).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}</span>
                      <Badge variant="outline" className="h-4 border-warning/20 bg-warning-muted px-1 text-[10px] text-warning">
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
