import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { homeData } from "../../data/homeData";
import { Link } from "react-router";
import { User, Users, Briefcase, Building } from "lucide-react";

export function AspirationSummaryCard() {
  const { careerAspirations } = homeData;

  if (careerAspirations.total_active === 0) {
    return (
      <Card className="shadow-sm border-border bg-card h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground">Aspirasi Karir</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48 text-center space-y-4">
          <p className="text-sm text-muted-foreground">Belum ada aspirasi karir yang diajukan</p>
          <Link to="/talent/career-aspiration" className="text-sm font-medium text-primary hover:underline">
            Ajukan Aspirasi Karir
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link to="/talent/career-aspiration" className="block h-full group">
      <Card className="shadow-sm border-border bg-card h-full group-hover:border-primary/50 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            Aspirasi Karir
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="flex items-center gap-6">
             <div>
                <div className="text-4xl font-bold text-foreground">{careerAspirations.total_active}</div>
                <div className="text-xs text-muted-foreground">Total Aspirasi</div>
             </div>
             
             <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium" title="Individual">
                   <User size={12} /> {careerAspirations.by_source.individual.count}
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-purple-50 border border-purple-100 text-purple-700 text-xs font-medium" title="Supervisor">
                   <Users size={12} /> {careerAspirations.by_source.supervisor.count}
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-amber-50 border border-amber-100 text-amber-700 text-xs font-medium" title="Job Holder">
                   <Briefcase size={12} /> {careerAspirations.by_source.job_holder.count}
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium" title="Unit">
                   <Building size={12} /> {careerAspirations.by_source.unit.count}
                </div>
             </div>
          </div>

          <div className="h-px bg-border w-full" />

          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Aspirasi Terbaru (Individual)</div>
            <div className="space-y-3">
               {careerAspirations.latest_individual.map((asp, idx) => (
                 <div key={idx} className="flex justify-between items-start gap-2">
                    <span className="text-sm font-medium text-foreground line-clamp-1 flex-1" title={asp.position_title}>
                      {asp.position_title}
                    </span>
                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5 shrink-0 bg-muted text-muted-foreground">
                      {asp.movement_type === "VERTICAL" ? "Vertikal" : "Horizontal"}
                    </Badge>
                 </div>
               ))}
            </div>
          </div>

        </CardContent>
      </Card>
    </Link>
  );
}
